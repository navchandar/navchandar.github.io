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

// 📦 Fetch all repositories
function fetchAllRepos(page = 1, allRepos = []) {
  const url = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;
  console.log(url);
  return new Promise((resolve, reject) => {
    https
      .get(url, userAgentHeader, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", async () => {
          try {
            const repos = JSON.parse(data);
            if (repos.length === 0) return resolve(allRepos);
            resolve(await fetchAllRepos(page + 1, allRepos.concat(repos)));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", reject);
  });
}

// 🌐 Check if GitHub Pages exists
function checkGitHubPages(repoName) {
  const url = `https://${username}.github.io/${repoName}/`;
  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        resolve(res.statusCode === 200);
      })
      .on("error", () => resolve(false));
  });
}

// 📁 Get contents of a repo's root
function fetchRepoRootContents(repoName) {
  const url = `https://api.github.com/repos/${username}/${repoName}/contents/`;
  console.log(url);
  return new Promise((resolve, reject) => {
    https
      .get(url, userAgentHeader, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const contents = JSON.parse(data);
            resolve(contents);
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", reject);
  });
}

// 🔍 Check if folder has index.html
function checkFolderForIndexHtml(repoName, folderName) {
  const url = `https://api.github.com/repos/${username}/${repoName}/contents/${folderName}/index.html`;
  console.log(url);
  return new Promise((resolve) => {
    https
      .get(url, userAgentHeader, (res) => {
        resolve(res.statusCode === 200);
      })
      .on("error", () => resolve(false));
  });
}

// 🕒 Get last modified date of gh-pages branch
function fetchGhPagesUpdatedAt(repoName) {
  const url = `https://api.github.com/repos/${username}/${repoName}/branches/gh-pages`;
  console.log(url);
  return new Promise((resolve) => {
    https
      .get(url, userAgentHeader, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const branchInfo = JSON.parse(data);
            const lastModified = branchInfo?.commit?.commit?.committer?.date;
            resolve(lastModified || null);
          } catch {
            resolve(null);
          }
        });
      })
      .on("error", () => resolve(null));
  });
}

// ⭐ Save repo stats
async function saveRepoStats(repos) {
  try {
    const repoStats = {};
    for (const repo of repos) {
      const fullName = repo.full_name;
      repoStats[fullName] = {
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
      };
    }

    fs.mkdirSync(path.dirname(repoStatsPath), { recursive: true });
    fs.writeFileSync(repoStatsPath, JSON.stringify(repoStats, null, 4));
    console.log(JSON.stringify(repoStats, null, 4));
    console.log(`✅ GitHub repo stats saved to ${repoStatsPath}`);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

// 🗺️ Generate sitemap
async function generateSitemap(repos) {
  const seenUrls = new Set();
  const sitemapUrls = [];

  function addUniqueURL(urlObj) {
    if (!seenUrls.has(urlObj.loc)) {
      seenUrls.add(urlObj.loc);
      sitemapUrls.push(urlObj);
    }
  }

  for (const repo of repos) {
    const repoName = repo.name;
    const isMainRepo = repoName === mainRepo;
    const hasPages = isMainRepo || (await checkGitHubPages(repoName));
    if (!hasPages) continue;

    const repoLastmod = await fetchGhPagesUpdatedAt(repoName);
    const repoLoc = isMainRepo
      ? `https://${username}.github.io/`
      : `https://${username}.github.io/${repoName}/`;
    const repoPriority = isMainRepo ? "1.0" : "0.8";

    addUniqueURL({
      loc: repoLoc,
      lastmod: repoLastmod,
      priority: repoPriority,
    });

    // Special handling for targetRepo
    if (repoName === targetRepo) {
      const rootContents = await fetchRepoRootContents(repoName);
      const folders = rootContents.filter((item) => item.type === "dir");

      for (const folder of folders) {
        const indexUrl = `https://api.github.com/repos/${username}/${repoName}/contents/${folder.name}/index.html`;

        const lastmod = await new Promise((resolve) => {
          https
            .get(indexUrl, userAgentHeader, (res) => {
              let data = "";
              res.on("data", (chunk) => (data += chunk));
              res.on("end", () => {
                try {
                  const fileInfo = JSON.parse(data);
                  resolve(
                    fileInfo?.git_url ? fileInfo?.last_modified || null : null
                  );
                } catch {
                  resolve(null);
                }
              });
            })
            .on("error", () => resolve(null));
        });

        if (lastmod) {
          const folderLoc = `https://${username}.github.io/${repoName}/${folder.name}/`;
          addUniqueURL({ loc: folderLoc, lastmod, priority: "0.75" });
        }
      }
    }
  }

  const sitemapContent = generateSitemapXml(sitemapUrls);
  console.log(sitemapUrls);
  console.log(sitemapContent);
  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log(`✅ sitemap.xml created with ${sitemapUrls.length} entries`);
}

// 🧱 Sitemap formatting helpers
function formatLastMod(lastmod) {
  if (!lastmod) return "";
  const date = new Date(lastmod).toISOString().split("T")[0];
  return `    <lastmod>${date}</lastmod>\n`;
}

function formatUrlEntry({ loc, lastmod, priority }) {
  return `  <url>
    <loc>${loc}</loc>
${formatLastMod(lastmod)}    <priority>${priority}</priority>
  </url>`;
}

function generateSitemapXml(urls) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const footer = `</urlset>`;
  const entries = urls.map(formatUrlEntry).join("\n");
  return `${header}\n${entries}\n${footer}`;
}

// 🚀 Main function
async function run() {
  try {
    const repos = await fetchAllRepos();
    await saveRepoStats(repos);
    await generateSitemap(repos);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

run();
