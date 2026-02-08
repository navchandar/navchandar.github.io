const fs = require("fs");
const path = require("path");
const https = require("https");

// 🔧 Configuration
const username = "navchandar";
const mainRepo = `${username}.github.io`;
const targetRepo = "lab";
const perPage = 100;
const userAgentHeader = { headers: { "User-Agent": "node.js" } };

const repoStatsPath = path.join(__dirname, "../src/data/repoStats.json");
const sitemapPath = path.join(__dirname, "../public/sitemap.xml");

// 🎨 Logging Helpers
const Log = {
  info: (msg) => console.log(`\x1b[36mℹ\x1b[0m ${msg}`),
  success: (msg) => console.log(`\x1b[32m✅ ${msg}\x1b[0m`),
  warn: (msg) => console.warn(`\x1b[33m⚠️ ${msg}\x1b[0m`),
  error: (msg, err) => console.error(`\x1b[31m❌ ${msg}\x1b[0m`, err || ""),
  progress: (current, total, name) =>
    console.log(
      `\x1b[90m[${current}/${total}]\x1b[0m Processing: \x1b[35m${name}\x1b[0m`,
    ),
};

// 🌐 Generic HTTPS Helper
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, userAgentHeader, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode === 200) {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(new Error("JSON Parse failed"));
            }
          } else if (res.statusCode === 403) {
            reject(new Error("GitHub API Rate limit exceeded."));
          } else if (res.statusCode === 404) {
            resolve(null); // Not found is sometimes expected
          } else {
            reject(new Error(`Request failed with status ${res.statusCode}`));
          }
        });
      })
      .on("error", (err) => reject(err));
  });
}

// 📦 Fetch all repositories
async function fetchAllRepos() {
  let allRepos = [];
  let page = 1;
  Log.info(`Starting repository fetch for user: ${username}`);

  while (true) {
    try {
      const url = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;
      const repos = await makeRequest(url);

      if (!repos || repos.length === 0) break;
      allRepos = allRepos.concat(repos);
      Log.info(`Fetched page ${page} (${repos.length} repos)`);
      page++;
    } catch (err) {
      Log.error("Failed to fetch repositories list", err.message);
      throw err;
    }
  }
  return allRepos;
}

// 🕒 Get last modified date via Commits API
async function fetchLastCommitDate(repoName, filePath = "") {
  const url = `https://api.github.com/repos/${username}/${repoName}/commits?per_page=1${filePath ? `&path=${filePath}` : ""}`;
  try {
    const commits = await makeRequest(url);
    if (commits && Array.isArray(commits) && commits.length > 0) {
      return commits[0].commit.committer.date;
    }
    return null;
  } catch (err) {
    Log.warn(
      `Could not fetch date for ${repoName}${filePath ? "/" + filePath : ""}: ${err.message}`,
    );
    return null;
  }
}

// ⭐ Save repo stats
async function saveRepoStats(repos) {
  try {
    const repoStats = {};
    repos.forEach((repo) => {
      repoStats[repo.full_name] = {
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
      };
    });

    fs.mkdirSync(path.dirname(repoStatsPath), { recursive: true });
    fs.writeFileSync(repoStatsPath, JSON.stringify(repoStats, null, 4));
    Log.success(
      `Saved stats for ${repos.length} repositories to ${repoStatsPath}`,
    );
  } catch (err) {
    Log.error("Failed to save repo stats file", err.message);
  }
}

// 🗺️ Generate sitemap
async function generateSitemap(repos) {
  const sitemapUrls = [];
  let processedCount = 0;

  Log.info("Generating sitemap entries...");

  await Promise.all(
    repos.map(async (repo) => {
      const repoName = repo.name;
      const isMainRepo = repoName === mainRepo;

      try {
        if (!repo.has_pages && !isMainRepo) return;

        processedCount++;
        Log.progress(
          processedCount,
          repos.filter((r) => r.has_pages || r.name === mainRepo).length,
          repoName,
        );

        const repoLastmod = await fetchLastCommitDate(repoName);
        const repoLoc = isMainRepo
          ? `https://${username}.github.io/`
          : `https://${username}.github.io/${repoName}/`;

        sitemapUrls.push({
          loc: repoLoc,
          lastmod: repoLastmod,
          priority: isMainRepo ? "1.0" : "0.8",
        });

        // Sub-folder processing for 'lab' repo
        if (repoName === targetRepo) {
          Log.info(`Scanning internal folders for: ${targetRepo}`);
          const contents = await makeRequest(
            `https://api.github.com/repos/${username}/${repoName}/contents/`,
          );

          if (Array.isArray(contents)) {
            const folders = contents.filter((item) => item.type === "dir");

            for (const folder of folders) {
              try {
                const lastmod = await fetchLastCommitDate(
                  repoName,
                  `${folder.name}/index.html`,
                );
                if (lastmod) {
                  sitemapUrls.push({
                    loc: `https://${username}.github.io/${repoName}/${folder.name}/`,
                    lastmod,
                    priority: "0.75",
                  });
                }
              } catch (folderErr) {
                Log.warn(
                  `Skipping folder ${folder.name} in ${targetRepo}: ${folderErr.message}`,
                );
              }
            }
          }
        }
      } catch (repoErr) {
        Log.error(`Error processing repo ${repoName}`, repoErr.message);
      }
    }),
  );

  try {
    const sitemapContent = generateSitemapXml(sitemapUrls);
    Log.info(sitemapContent);
    fs.mkdirSync(path.dirname(sitemapPath), { recursive: true });
    fs.writeFileSync(sitemapPath, sitemapContent);
    Log.success(`Sitemap created with ${sitemapUrls.length} total URLs.`);
  } catch (err) {
    Log.error("Failed to write sitemap file", err.message);
  }
}

// 🧱 XML Formatters
function formatUrlEntry({ loc, lastmod, priority }) {
  const dateStr = lastmod
    ? `\n    <lastmod>${lastmod.split("T")[0]}</lastmod>`
    : "";
  return `  <url>
    <loc>${loc}</loc>${dateStr}
    <priority>${priority}</priority>
  </url>`;
}

function generateSitemapXml(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(formatUrlEntry).join("\n")}
</urlset>`;
}

// 🚀 Execute
async function run() {
  const startTime = Date.now();
  try {
    const repos = await fetchAllRepos();
    await saveRepoStats(repos);
    await generateSitemap(repos);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    Log.success(`All tasks completed successfully in ${duration}s!`);
  } catch (err) {
    Log.error("Script execution halted due to critical error:", err.message);
    process.exit(1);
  }
}

run();
