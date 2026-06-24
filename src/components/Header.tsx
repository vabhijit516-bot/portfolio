import React from "react";
import { Zap, Sun, Moon, Menu, X } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeSection: string;
  onNavClick: (sec: string) => void;
}

export default function Header({
  darkMode,
  setDarkMode,
  activeSection,
  onNavClick,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "My Experience", id: "experience" },
    { label: "Technical Skills", id: "skills" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/50 bg-white/75 backdrop-blur-xl dark:border-neutral-800/50 dark:bg-zinc-950/75 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Curved Logo with Lightning Symbol */}
        <div
          onClick={() => onNavClick("home")}
          className="group flex cursor-pointer items-center gap-2.5 rounded-l-2xl rounded-r-none border border-sky-400/40 p-2.5 px-4 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-sky-500 hover:shadow-cyan-500/10 hover:shadow-md dark:border-sky-500/30 glow-border-blue"
          id="nav_logo_container"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500 transition-colors duration-300 group-hover:bg-amber-500/15 group-hover:text-amber-500">
            <Zap className="h-5 w-5 fill-current animate-pulse rotate-12" id="nav_zap_icon" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-neutral-800 dark:text-neutral-100 group-hover:text-sky-500 transition-colors duration-200">
            Abhijit<span className="text-sky-500 group-hover:text-amber-500">.V</span>
          </span>
        </div>

        {/* Desktop Nav Items */}
        {/* eslint-disable jsx-a11y/no-duplicate-id */}
        <nav className="hidden md:flex items-center gap-1.5" id="desktop_nav_bar">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav_btn_${item.id}`}
              onClick={() => onNavClick(item.id)}
              className={`relative rounded-lg px-4 py-2 font-display text-sm font-medium tracking-wide transition-all duration-300 ${activeSection === item.id
                ? "bg-sky-500/10 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.15)] shadow-inner"
                : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900/60 dark:hover:text-neutral-100"
                }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-1.5 left-1/2 h-0.5 w-1.5 -translate-x-1/2 rounded-full bg-sky-500" />
              )}
            </button>
          ))}
        </nav>

        {/* Action button and Theme toggle */}
        <div className="flex items-center gap-3">
          {/* Theme switch button */}
          <button
            id="theme_toggle_btn"
            onClick={() => setDarkMode(!darkMode)}
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200/70 bg-neutral-50 shadow-sm transition-all duration-300 hover:rotate-12 hover:border-sky-400 dark:border-neutral-800 dark:bg-zinc-900 dark:hover:border-sky-500 glow-border-blue"
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <Moon className="h-5 w-5 text-indigo-600 transition-transform group-hover:scale-110" />
            ) : (
              <Sun className="h-5 w-5 text-amber-400 transition-transform group-hover:scale-110" />
            )}
          </button>

          {/* Mobile responsive toggle */}
          <button
            id="mobile_menu_toggle_btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-600 shadow-sm transition-all hover:bg-neutral-100 md:hidden dark:border-neutral-800 dark:bg-zinc-900 dark:text-neutral-400 dark:hover:bg-neutral-850"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-neutral-150 bg-white px-4 py-3 shadow-lg md:hidden dark:border-neutral-850 dark:bg-zinc-950 transition-all duration-300 animate-fadeIn" id="mobile_dropdown_nav">
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile_nav_btn_${item.id}`}
                onClick={() => {
                  onNavClick(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full rounded-lg px-4 py-2.5 text-left font-display text-sm font-medium transition-all ${activeSection === item.id
                  ? "bg-sky-500/10 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400"
                  : "text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-900"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
