const fs = require('fs');
const https = require('https');

const projects = [
    'navchandar/look-like-scanned',
    'navchandar/civic-media-scout',
    'navchandar/Python-Random-Name-Generator',
    'navchandar/Naukri',
    'navchandar/lab',
];

function fetchRepoData(repo) {
    const url = `https://api.github.com/repos/${repo}`;
    const options = {
        headers: {
            'User-Agent': 'node.js',
        },
    };

    return new Promise((resolve, reject) => {
        https.get(url, options, (res) => {
            let data = '';

            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({
                        stars: json.stargazers_count || 0,
                        forks: json.forks_count || 0,
                    });
                } catch (err) {
                    reject(err);
                }
            });
        }).on('error', reject);
    });
}

async function fetchStats() {
    const results = {};

    for (const repo of projects) {
        try {
            results[repo] = await fetchRepoData(repo);
        } catch (err) {
            console.error(`❌ Failed to fetch ${repo}:`, err.message);
            results[repo] = { stars: 0, forks: 0 };
        }
    }

    const json = JSON.stringify(results, null, 4);
    fs.writeFileSync('src/data/repoStats.json', json);
    console.log('✅ GitHub repo stats saved to src/data/repoStats.json');
}

fetchStats();
