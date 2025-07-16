const fs = require('fs');
const fetch = require('node-fetch');

const projects = [
  'navchandar/look-like-scanned',
  'navchandar/civic-media-scout',
  'navchandar/Python-Random-Name-Generator',
  'navchandar/Naukri',
  'navchandar/lab',
];

async function fetchStats() {
  const results = {};

  for (const repo of projects) {
    const res = await fetch(`https://api.github.com/repos/${repo}`);
    const data = await res.json();
    results[repo] = {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
    };
  }

  results = JSON.stringify(results, null, 4)
  console.log(results);
  fs.writeFileSync('src/data/repoStats.json', results);
  console.log('✅ GitHub repo stats saved to src/data/repoStats.json');

}

fetchStats();
