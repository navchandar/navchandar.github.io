const fs = require("fs");
const path = require("path");
const https = require("https");

const username = "navchandar";
const perPage = 100;

function fetchAllRepos(page = 1, allRepos = []) {
  const url = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;
  const options = {
    headers: {
      "User-Agent": "node.js",
    },
  };

  return new Promise((resolve, reject) => {
    https
      .get(url, options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", async () => {
          try {
            const repos = JSON.parse(data);
            if (repos.length === 0) return resolve(allRepos);
            const combined = allRepos.concat(repos);
            resolve(await fetchAllRepos(page + 1, combined));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", reject);
  });
}

async function fetchStats() {
  try {
    const repos = await fetchAllRepos();
    const results = {};

    for (const repo of repos) {
      results[repo.full_name] = {
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
      };
    }

    const outputDir = path.join(__dirname, "../src/data");
    const outputPath = path.join(outputDir, "repoStats.json");

    console.log(results);
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 4));

    console.log(`✅ Fetched ${repos.length} repos`);
    console.log(`✅ GitHub repo stats saved to ${outputPath}`);
  } catch (err) {
    console.error("❌ Error fetching repo stats:", err.message);
  }
}

fetchStats();
