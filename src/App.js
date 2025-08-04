import React, { useEffect, useRef } from "react";

import "./App.css";
import { Header, Subtitle } from "./components/Header";
import Footer from "./components/Footer";
import WorkHistory from "./components/WorkHistory";
import Projects from "./components/Projects";

// A custom hook to handle the parallax and scroll effects
const useParallaxEffect = (progressBarRef) => {
  useEffect(() => {
    let lastScrollTop = window.scrollY;
    let currentOffset = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollDirection = scrollTop > lastScrollTop ? "down" : "up";
      lastScrollTop = scrollTop;

      // Update progress bar
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${scrollPercent}%`;
      }

      // Parallax effect: move background opposite to scroll direction
      const movement = 2; // pixels per scroll event
      currentOffset += scrollDirection === "down" ? -movement : movement;

      // Clamp the offset to avoid extreme shifts
      const maxOffset = 100;
      const minOffset = -100;
      currentOffset = Math.max(minOffset, Math.min(maxOffset, currentOffset));

      document.body.style.setProperty(
        "--background-offset",
        `${currentOffset}px`
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [progressBarRef]);
};

function App() {
  const progressBarRef = useRef(null);
  // Use the custom hook to encapsulate the scroll logic
  useParallaxEffect(progressBarRef);

  return (
    <div className="App fade-in glass-container">
      <div className="progress-bar" ref={progressBarRef}></div>

      <Header />
      <Subtitle />

      <WorkHistory />
      <Projects />

      <Footer />
    </div>
  );
}

export default App;
