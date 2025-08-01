import React, { useEffect } from "react";

import "./App.css";
import { Header, Subtitle } from "./components/Header";
import Footer from "./components/Footer";
import WorkHistory from "./components/WorkHistory";
import Projects from "./components/Projects";

function handleScrollEffects() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  // display scroll progress in the UI top element
  const progressBar = document.getElementById("ProgressBar");
  if (progressBar) {
    progressBar.style.width = `${scrollPercent}%`;
  }

  // increase blur as user scrolls below and decrease when scrolling up
  const glassContainer = document.querySelector(".glass-container");
  if (glassContainer) {
    const blurValue = 1 + (scrollPercent / 100) * 5;
    glassContainer.style.backdropFilter = `blur(${blurValue}px)`;
    glassContainer.style.webkitBackdropFilter = `blur(${blurValue}px)`;
  }
}

function App() {
  useEffect(() => {
    let ticking = false;

    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScrollEffects();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <div className="App fade-in glass-container">
      <div className="progress-bar" id="ProgressBar"></div>

      <Header />
      <Subtitle />

      <WorkHistory />
      <Projects />

      <Footer />
    </div>
  );
}

export default App;
