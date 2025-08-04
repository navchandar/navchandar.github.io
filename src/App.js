import React, { useEffect } from "react";

import "./App.css";
import { Header, Subtitle } from "./components/Header";
import Footer from "./components/Footer";
import WorkHistory from "./components/WorkHistory";
import Projects from "./components/Projects";

let lastScrollTop = 0;
let currentOffset = 0;

function handleScrollEffects() {
  const scrollTop = window.scrollY;
  const scrollDirection = scrollTop > lastScrollTop ? "down" : "up";
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  // display scroll progress in the UI top element
  const progressBar = document.getElementById("ProgressBar");
  if (progressBar) {
    progressBar.style.width = `${scrollPercent}%`;
  }

  // Adjust background position based on scroll direction
  const movement = 3; // pixels per scroll event
  currentOffset += scrollDirection === "down" ? -movement : movement;

  // Limit the offset range
  const maxOffset = 100;
  const minOffset = -100;
  currentOffset = Math.max(minOffset, Math.min(maxOffset, currentOffset));

  document.body.style.backgroundPosition = `center ${currentOffset}px`;
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
