import React from "react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import UploadSection from "./components/UploadSection";
import Background3D from "./components/Background3D";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Background3D />
      
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <UploadSection />
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Blockchain Digital Evidence Forensics. Tamper Detection Network.
      </footer>
    </div>
  );
}

export default App;
