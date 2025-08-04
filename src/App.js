import React, { useEffect, useRef } from "react";

import "./App.css";
import { Header, Subtitle } from "./components/Header";
import Footer from "./components/Footer";
import WorkHistory from "./components/WorkHistory";
import Projects from "./components/Projects";

// A custom hook to handle the parallax and scroll effects
const useParallaxEffect = (progressBarRef) => {
  useEffect(() => {
    // Determine the scroll handling method once on mount
    const isFixedBackgroundSupported =
      window.CSS && window.CSS.supports("background-attachment", "fixed");

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      // Update the progress bar
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${scrollPercent}%`;
      }

      // Apply the parallax effect only if fixed background is not supported
      if (!isFixedBackgroundSupported) {
        // Use a multiplier to control the parallax speed
        const parallaxSpeed = 0.5; // Adjust this value to change the effect
        document.body.style.setProperty(
          "--background-offset",
          `${-scrollTop * parallaxSpeed}px`
        );
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
