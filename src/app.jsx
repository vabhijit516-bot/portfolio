import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  const [darkMode, setDarkMode] = useState(true); // defaulting to a jaw-dropping dark space aesthetic
  const [activeSection, setActiveSection] = useState("home");

  // Sync dark mode class on HTML body tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Setup Scroll spy intersection observer loop
  useEffect(() => {
    const sections = ["home", "about", "projects", "experience", "skills", "contact"];
    const observers = [];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // triggers when section dominates vertical space
      threshold: 0,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Soft smooth coordinate scroll trigger
  const handleNavigationClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-neutral-800 dark:text-zinc-100 transition-colors duration-500 font-sans">

      {/* Background Graphic Grid */}
      <div className="fixed inset-0 pointer-events-none -z-50 bg-white dark:bg-zinc-950 transition-colors duration-500">
        <div className="absolute inset-0 bg-grid-cyber opacity-100" />
        <div className="absolute inset-0 bg-dot-cyber opacity-80" />
      </div>

      {/* Header Panel */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeSection={activeSection}
        onNavClick={handleNavigationClick}
      />

      {/* Main Core Sections Container */}
      <main className="flex-grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full transition-all duration-300">
        <HomeSection onNavClick={handleNavigationClick} />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Footer Panel */}
      <Footer onNavClick={handleNavigationClick} activeSection={activeSection} />

    </div>
  );
}
