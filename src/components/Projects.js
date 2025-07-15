import React from 'react';
import './Projects.css';

const projects = [
  {
    title: 'Naukri',
    description: 'Selenium Automation script that updates your Naukri profile Daily.',
    link: 'https://github.com/navchandar/Naukri',
  },
  {
    title: 'Look Like Scanned',
    description: 'Python based CLI tool that lets you make digital documents look like they were scanned.',
    link: 'https://navchandar.github.io/look-like-scanned/',
  },
  {
    title: 'Civic Media Scout',
    description: 'A civic-tech initiative focused on compiling and curating publicly available official government contact information.',
    link: 'https://navchandar.github.io/civic-media-scout/',
  },
  {
    title: 'Random Name Generator',
    description: 'Python data provider module - Useful for testing Name/Address fields with random data.',
    link: 'https://github.com/navchandar/Python-Random-Name-Generator',
  },
];

function Projects() {
  return (
    <div className="projects">
      <h2>My Projects</h2>
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
