import React, { useEffect } from "react";

import "./App.css";
import { Header, Subtitle } from "./components/Header";
import Footer from "./components/Footer";
import WorkHistory from "./components/WorkHistory";
import Projects from "./components/Projects";

function App() {
  useEffect(() => {
    let ticking = false;

    const updateProgressBar = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      const progressBar = document.getElementById("ProgressBar");
      if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`;
      }
      ticking = false;
    };

    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgressBar);
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
