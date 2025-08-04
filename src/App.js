import React, { useEffect, useRef } from "react";

import "./App.css";
import { Header, Subtitle } from "./components/Header";
import Footer from "./components/Footer";
import WorkHistory from "./components/WorkHistory";
import Projects from "./components/Projects";

// A custom hook to handle the parallax and scroll effects
const useParallaxEffect = (progressBarRef) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      // Update progress bar
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${scrollPercent}%`;
      }

      // Apply parallax effect
      const parallaxSpeed = 0.75;
      document.body.style.setProperty(
        "--background-offset",
        `${-scrollTop * parallaxSpeed}px`
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
