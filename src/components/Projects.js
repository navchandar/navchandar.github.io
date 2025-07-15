import React from 'react';
import './Projects.css';

const projects = [
    {
        title: 'Naukri Updater',
        description: 'Automatically update your Naukri profiles daily using Selenium based script',
        link: 'https://github.com/navchandar/Naukri/',
    },
    {
        title: 'Look Like Scanned',
        description: 'Python based CLI tool to turn any image/ PDF into a “scanned” format',
        link: 'https://navchandar.github.io/look-like-scanned/',
    },
    {
        title: 'Civic Media Scout',
        description: 'Curating publicly available contact information from official government websites',
        link: 'https://navchandar.github.io/civic-media-scout/',
    },
    {
        title: 'Random Name Generator',
        description: 'Python data provider module. Useful for testing with random data',
        link: 'https://github.com/navchandar/Python-Random-Name-Generator/',
    },
];


function Projects() {
    return (
        <div className="projects">
            <h3>My Projects</h3>
            <div className="project-list">
                {projects.map((project, index) => (
                    <div className="project-card" key={index}>
                        <h3>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a>
                        </h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects;
