import React, { useEffect, useRef, useState } from "react";
import { Cpu, CheckCircle2, ChevronRight, Compass, Shield, Terminal, ArrowDownCircle } from "lucide-react";
import { TECHNICAL_SKILLS, SkillPoint } from "../data";

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSkillIdx, setActiveSkillIdx] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const elementTop = rect.top;

      // Calculate how far down the section the user has scrolled
      // 0 means section just entered viewport top, 1 means section bottom is at viewport top
      const windowHeight = window.innerHeight;
      const totalScrollableDist = sectionHeight - windowHeight + 150;

      const relativeTop = -elementTop;

      let progress = 0;
      if (relativeTop > 0 && totalScrollableDist > 0) {
        progress = Math.min(relativeTop / totalScrollableDist, 1);
      } else if (relativeTop > totalScrollableDist) {
        progress = 1;
      }

      setScrollProgress(progress);

      // Map progress to active indices
      const idx = Math.min(
        Math.floor(progress * TECHNICAL_SKILLS.length),
        TECHNICAL_SKILLS.length - 1
      );
      setActiveSkillIdx(Math.max(0, idx));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once at start
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative py-16 md:py-24 border-t border-neutral-150 dark:border-neutral-900/60 transition-colors"
    >
      <div className="absolute inset-0 bg-dot-cyber opacity-35 pointer-events-none" />

      {/* Global Section Header */}
      <div className="flex flex-col mb-12 relative z-10" id="skills_title_block">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            04 / Technical Codex
          </h2>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">
          Technical Skills &amp; Capabilities
        </h3>
      </div>

      {/* Split grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 w-full items-start">

        {/* Left COLUMN: Sticky loading bar container */}
        <div className="lg:col-span-4 sticky top-28 h-[400px] flex flex-col justify-between p-6 rounded-3xl bg-zinc-900/5 dark:bg-zinc-900/40 border border-neutral-200/50 dark:border-neutral-800/80 backdrop-blur-md self-start" id="skills_sticky_loader_bar">

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-emerald-500 font-bold tracking-widest flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 animate-spin" /> STICKY TELEMETRY
            </span>
            <h4 className="font-display font-black text-sm text-neutral-800 dark:text-white uppercase">
              Progress Locks
            </h4>
          </div>

          {/* The physics-glowing vertical loading bar representation */}
          <div className="flex-1 my-6 flex items-center gap-5 justify-center relative">
            <span className="absolute left-6 top-0 bottom-0 w-[4px] bg-neutral-200 dark:bg-zinc-800 rounded-full" />

            {/* Scroll Link Interactive Loading Line */}
            <span
              className="absolute left-6 top-0 w-[4px] bg-gradient-to-b from-emerald-500 via-teal-400 to-sky-400 rounded-full shadow-[0_0_15px_#10b981] transition-all duration-150"
              style={{ height: `${scrollProgress * 100}%` }}
            />

            {/* Small floating HUD values listed next to the sticky line */}
            <div className="flex flex-col justify-between h-full w-full pl-10 py-1 font-mono text-[10px]">
              {TECHNICAL_SKILLS.map((sk, idx) => (
                <div
                  key={sk.id}
                  className={`flex items-center gap-2 transition-all duration-300 ${activeSkillIdx >= idx ? "text-emerald-501 font-black translate-x-1" : "text-neutral-400"
                    }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${activeSkillIdx >= idx ? "bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"}`} />
                  <span>C_0{sk.id} :</span>
                  <span className="truncate max-w-[120px]">{sk.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overall Percentage Console readout */}
          <div className="flex justify-between items-end border-t border-neutral-100 dark:border-neutral-850 pt-4">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-neutral-400">TOTAL SCROLLING CHARGE</span>
              <span className="font-display font-extrabold text-lg text-emerald-500 animate-pulse">
                {Math.round(scrollProgress * 100)} %
              </span>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[9px] font-mono text-neutral-400">CAPABILITIES</span>
              <span className="font-mono text-xs font-bold text-neutral-700 dark:text-neutral-300">
                {activeSkillIdx + 1} / {TECHNICAL_SKILLS.length} LOADED
              </span>
            </div>
          </div>

        </div>

        {/* Right COLUMN: Scrolling Skills Points list */}
        <div className="lg:col-span-8 flex flex-col gap-6" id="skills_cards_stack">
          {TECHNICAL_SKILLS.map((skill, idx) => {
            const isCurrentlyActive = activeSkillIdx === idx;
            return (
              <div
                key={skill.id}
                id={`skill_card_node_${skill.id}`}
                className={`group rounded-3xl p-6 bg-white/40 dark:bg-zinc-900/35 border transition-all duration-500 shadow-sm animate-cyber-float-shake hover:scale-[1.01] ${isCurrentlyActive
                  ? "border-emerald-500/50 glow-border-green dark:bg-zinc-950/60"
                  : "border-neutral-200/70 dark:border-neutral-802/80 hover:border-emerald-400/20"
                  }`}
              >

                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-900">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 flex shrink-0 items-center justify-center rounded-xl border transition-colors ${isCurrentlyActive
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/25"
                      : "bg-neutral-100 text-neutral-500 border-neutral-200 dark:bg-zinc-800 dark:text-neutral-400 dark:border-neutral-700"
                      }`}>
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-extrabold text-neutral-800 dark:text-white">
                        {skill.title}
                      </h4>
                      <span className="text-[9px] font-mono text-neutral-450 tracking-wider">
                        TELEMETRY CLASS NODE // 0{skill.id}
                      </span>
                    </div>
                  </div>

                  {/* Skills ratings indicator */}
                  <div className="flex justify-between md:flex-col items-end shrink-0 select-none">
                    <span className="text-xs font-mono font-black text-neutral-800 dark:text-neutral-200">
                      SYS RATING: {skill.percentage}%
                    </span>
                    <div className="w-24 h-1.5 bg-neutral-150 dark:bg-zinc-800 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${isCurrentlyActive ? "bg-emerald-500" : "bg-neutral-450 dark:bg-neutral-600"
                          }`}
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-450 leading-relaxed font-sans">
                  {skill.description}
                </p>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
