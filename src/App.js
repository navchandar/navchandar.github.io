import React, { useEffect, useRef } from "react";

import "./App.css";
import { Header, Subtitle } from "./components/Header";
import Footer from "./components/Footer";
import WorkHistory from "./components/WorkHistory";
import Projects from "./components/Projects";

// A custom hook to scroll effects
const useProgressBar = (progressBarRef) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      // update progress bar percent
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${scrollPercent}%`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [progressBarRef]);
};

function App() {
  const progressBarRef = useRef(null);
  // Use the custom hook to encapsulate the scroll logic
  updateProgressBar(progressBarRef);

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
