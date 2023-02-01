import React from "react";
import Logo from './images/logo.png'
import './Header.css'

const Header = () => {
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

export default Header
