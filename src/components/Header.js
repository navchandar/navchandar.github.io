import React from "react";
import Logo from './images/logo.png'
import './Header.css'


export const Header = () => (
  <div id="header">
    <img id="about" alt="Headshot of Naveen Chandar" src={Logo} />
    <h1 id="title">Naveen Chandar</h1>
  </div>
);


export const Subtitle = () => {
  return <section>
    <div className="subtitle">
      <h2 className="subheading">Quality Assurance Engineer</h2>
      <h2 className="subheading">Automation Consultant</h2>
    </div>
    <div className="subtitle">
      <h2 className="subheading">Software Developer</h2>
      <h2 className="subheading">DevOps Specialist</h2>
      <h2 className="subheading">Test Architect</h2>
    </div>
  </section>

};

