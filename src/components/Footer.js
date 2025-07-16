import React from "react";
import './Footer.css'

const Footer = () => {
  return (
    <div id="footer">
      <div className="social-links">
        <a href="https://www.linkedin.com/in/naveenchandar/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
          <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M150 5 L75 200 L225 200 Z" />
          </svg>
        </a>

        <a href="https://github.com/navchandar/" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
          <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M150 5 L75 200 L225 200 Z" />
          </svg>
        </a>

        <a href="https://bsky.app/profile/navchandar.bsky.social/" target="_blank" rel="noopener noreferrer" aria-label="Bluesky Profile">
          <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M150 5 L75 200 L225 200 Z" />
          </svg>
        </a>

        <a href="https://stackoverflow.com/users/7964299/naveen?tab=profile/" target="_blank" rel="noopener noreferrer" aria-label="Stack Overflow Profile">
          <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M150 5 L75 200 L225 200 Z" />
          </svg>
        </a>
      </div>

      <i>
        <p>Copyright © {new Date().getFullYear()} All Rights Reserved</p>
      </i>
    </div>
  );
}

export default Footer