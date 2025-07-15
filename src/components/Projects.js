import React from 'react';
import './Projects.css';

const projects = [
  {
    title: 'Daily Naukri Update',
    description: 'Auto-refresh your Naukri profile daily using Selenium',
    link: 'https://github.com/navchandar/Naukri/',
  },
  {
    title: 'Look Like Scanned',
    description: 'Python based CLI to turn any image/ PDF into a “scanned” version',
    link: 'https://navchandar.github.io/look-like-scanned/',
  },
  {
    title: 'Civic Media Scout',
    description: 'A Crowdsourcing official contacts for a more connected democracy',
    link: 'https://navchandar.github.io/civic-media-scout/',
  },
  {
    title: 'Random Name Generator',
    description: 'Python data provider module. Test with random data',
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
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
