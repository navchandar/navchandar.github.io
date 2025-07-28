import React from 'react';
import './Projects.css';

let repoStats = {};
try {
    repoStats = require('../data/repoStats.json');
} catch (err) {
    console.warn('⚠️ repoStats.json not found, using empty data.');
}



const projects = [
    {
        title: 'Look Like Scanned',
        description: 'Python based CLI tool to turn any image/ PDF into a “scanned” format',
        link: 'https://navchandar.github.io/look-like-scanned/',
        repo: 'navchandar/look-like-scanned',
    },
    {
        title: 'Civic Media Scout',
        description: 'Web app to curate publicly available contact information from official government websites',
        link: 'https://navchandar.github.io/civic-media-scout/',
        repo: 'navchandar/civic-media-scout',
    },
    {
        title: 'Random Name Generator',
        description: 'Python data provider module. Useful for testing with random data',
        link: 'https://navchandar.github.io/Python-Random-Name-Generator/',
        repo: 'navchandar/Python-Random-Name-Generator',
    },
    {
        title: 'Naukri Updater',
        description: 'Automatically update your Naukri profiles daily using Selenium based script',
        link: 'https://github.com/navchandar/Naukri/?tab=readme-ov-file#daily-naukri-update/',
        repo: 'navchandar/Naukri',
    },
    {
        title: 'Laboratory',
        description: 'Multiple creative experiments and interactive web apps for fun and learning',
        link: 'https://navchandar.github.io/lab/',
        repo: 'navchandar/lab',
    },
];


function Projects() {
    return (
        <div className="projects">
            <h3>My Featured Projects</h3>
            <div className="project-list">
                {projects.map((project, index) => {
                    const stats = repoStats[project.repo] || { stars: '-', forks: '-' };
                    return (
                        <div className="project-card" key={index}>
                            <h4>
                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                    {project.title}
                                </a>
                            </h4>
                            <p>{project.description}</p>
                            <div className="repo-stats">
                                <span className="badge stars" title={`GitHub Stars: ${stats.stars}`}>⭐ {stats.stars}</span>
                                <span className="badge forks" title={`GitHub Forks: ${stats.forks}`}>⑂ {stats.forks}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


export default Projects;
