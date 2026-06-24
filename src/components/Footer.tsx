import React from "react";
import { Zap, ArrowUp } from "lucide-react";

interface FooterProps {
  onNavClick: (sec: string) => void;
  activeSection: string;
}

export default function Footer({ onNavClick, activeSection }: FooterProps) {
  const footerNavItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "My Experience", id: "experience" },
    { label: "Technical Skills", id: "skills" },
    { label: "Contact", id: "contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-neutral-50 border-t border-neutral-200/60 py-12 dark:bg-zinc-950 dark:border-neutral-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8">

        {/* Upper Row: Brand info and duplicate Nav links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-200/50 dark:border-neutral-900/50">

          {/* Logo */}
          <div
            onClick={() => onNavClick("home")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500 group-hover:bg-amber-500/15 group-hover:text-amber-500 transition-colors">
              <Zap className="h-4.5 w-4.5 fill-current rotate-12" />
            </div>
            <span className="font-display font-black text-base dark:text-white group-hover:text-sky-550 transition-colors">
              Abhijit V. Portfolio
            </span>
          </div>

          {/* Footer duplicated Nav Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2 md:mt-0" id="footer_nav_links">
            {footerNavItems.map((item) => (
              <button
                key={item.id}
                id={`footer_nav_link_${item.id}`}
                onClick={() => onNavClick(item.id)}
                className={`text-xs font-mono font-bold uppercase tracking-wider transition-colors hover:text-sky-500 ${activeSection === item.id
                    ? "text-sky-500"
                    : "text-neutral-505 dark:text-neutral-500"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

        </div>

        {/* Bottom Row: Copyright message and scroll-to-top trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-neutral-400 dark:text-neutral-500">

          {/* Copyright mark */}
          <div className="flex items-center gap-1.5" id="copyright_box">
            <span>&copy; 2026 Abhijit. All rights reserved.</span>
            <span className="h-1 w-1 bg-neutral-300 dark:bg-neutral-800 rounded-full" />
            <span>Chennai, India.</span>
          </div>

          <div className="flex items-center gap-4">
            <span>BUILT WITH REACT, HTML, CSS &amp; TAILWIND</span>

            <button
              id="back_to_top_btn"
              onClick={scrollToTop}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm border border-neutral-200 hover:border-sky-500 dark:bg-zinc-900 dark:border-neutral-850 dark:hover:border-sky-500 text-neutral-500 dark:text-neutral-400 hover:text-sky-500 transition-all active:scale-90"
              aria-label="Back to Top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
