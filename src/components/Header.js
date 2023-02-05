import React from "react";
import Logo from './images/logo.png'
import './Header.css'

export const Header = () => {
  return React.createElement('div',
    { 'id': 'header' },

    React.createElement('img', {
      id: 'about',
      alt: 'Headshot of Naveen chandar',
      src: Logo
    }),

    React.createElement('h1', {id: 'title'}, 'Naveen chandar')
  )
}

export const Subtitle = () => {
  return <section>
    <div class="subtitle">
      <h2 class="subheading">Quality Assurance Engineer</h2>
    </div>
    <div class="subtitle">
      <h2 class="subheading">Automation Consultant</h2>
      <h2 class="subheading">Senior Test Engineer</h2>
    </div>
    <div class="subtitle">
      <h2 class="subheading">Software Developer</h2>
      <h2 class="subheading">DevOps Specialist</h2>
      <h2 class="subheading">Test Architect</h2>
    </div>
  </section>

};

