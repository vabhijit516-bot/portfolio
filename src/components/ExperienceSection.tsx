import React, { useEffect, useRef, useState } from "react";
import { Briefcase, Check, Milestone, Compass } from "lucide-react";
import { EXPERIENCE_POINTS, ExperiencePoint } from "../data";

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const elementTop = rect.top;
      const windowHeight = window.innerHeight;

      // Track active node based on middle of viewport overlaps
      const cards = containerRef.current.querySelectorAll(".experience-card");
      let currentActiveIdx = 0;
      let minDistance = Infinity;

      cards.forEach((card, idx) => {
        const cardRect = card.getBoundingClientRect();
        // Distance of the center of card from center of screen
        const distance = Math.abs(cardRect.top + cardRect.height / 2 - windowHeight / 2);
        if (distance < minDistance) {
          minDistance = distance;
          currentActiveIdx = idx;
        }
      });

      setActiveIdx(currentActiveIdx);

      // Determine absolute scroll progress for the vertical bar
      const totalScrollableDist = sectionHeight - windowHeight + 100;
      const relativeTop = -elementTop;
      let progress = 0;
      if (relativeTop > 0 && totalScrollableDist > 0) {
        progress = Math.min(relativeTop / totalScrollableDist, 1);
      } else if (relativeTop > totalScrollableDist) {
        progress = 1;
      }
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once at start
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToCard = (id: number) => {
    const el = document.getElementById(`xp-card-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-16 md:py-24 border-t border-neutral-150 dark:border-neutral-900/60 transition-colors"
    >
      <div className="absolute inset-0 bg-dot-cyber opacity-35 pointer-events-none" />

      {/* Title block */}
      <div className="flex flex-col mb-12 relative z-10" id="experience_title_block">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            03 / Chrono-milestones
          </h2>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">
          My Experience Timeline
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10 w-full">

        {/* Left Column: STICKY Interactive Telemetry Dashboard */}
        <div className="lg:col-span-5 sticky top-28 flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-zinc-900/5 dark:bg-zinc-900/40 border border-neutral-200/55 dark:border-neutral-800/80 backdrop-blur-md self-start min-h-[460px] shadow-sm" id="experience_sticky_panel">

          <div className="flex flex-col gap-5">
            {/* Header / Intro */}
            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-105 dark:border-neutral-850">
              <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <Briefcase className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="font-mono text-[10px] font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase">
                  EXPERIENCE MATRIX
                </h4>
                <span className="text-[9px] font-mono text-neutral-400 uppercase block tracking-wider mt-0.5">
                  STICKY ACTIVE MONITOR
                </span>
              </div>
            </div>

            <p className="font-sans text-xs md:text-sm leading-relaxed font-semibold text-neutral-700 dark:text-neutral-300">
              &ldquo;I have experience in working on live websites along with its structure and working these are the things i learnt in the following year&rdquo;
            </p>
          </div>

          {/* Dynamic tracking vertical pipeline */}
          <div className="flex-1 my-6 flex items-center gap-4 py-2 relative">
            <span className="absolute left-6 top-0 bottom-0 w-[4px] bg-neutral-200 dark:bg-zinc-800 rounded-full" />

            {/* Scroll Progress-linked Fill Line */}
            <span
              className="absolute left-6 top-0 w-[4px] bg-gradient-to-b from-amber-500 via-yellow-405 to-orange-405 rounded-full shadow-[0_0_15px_#f59e0b] transition-all duration-150"
              style={{ height: `${scrollProgress * 100}%` }}
            />

            {/* Clickable Node Telemetry Menu items */}
            <div className="flex flex-col justify-between h-full w-full pl-12 py-1 font-mono text-[10px]">
              {EXPERIENCE_POINTS.map((pt, idx) => {
                const isActiveOrPrev = activeIdx >= idx;
                const isCurrent = activeIdx === idx;
                return (
                  <button
                    key={pt.id}
                    onClick={() => scrollToCard(pt.id)}
                    className={`flex items-center gap-2.5 transition-all duration-300 text-left outline-none hover:translate-x-1 ${isCurrent
                        ? "text-amber-501 font-black translate-x-1"
                        : isActiveOrPrev
                          ? "text-neutral-700 dark:text-neutral-300"
                          : "text-neutral-400 dark:text-neutral-500"
                      }`}
                  >
                    <span className={`h-2.5 w-2.5 rounded-full transition-all duration-300 border ${isCurrent
                        ? "bg-amber-500 border-amber-400 shadow-[0_0_8px_#f59e0b] scale-125"
                        : isActiveOrPrev
                          ? "bg-amber-500/40 border-amber-500/40"
                          : "bg-neutral-300 dark:bg-neutral-700 border-transparent"
                      }`} />
                    <span className="text-[9px] font-bold text-neutral-403">0{pt.id} :</span>
                    <span className="truncate max-w-[150px]">{pt.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Forecasted Node Details Readout */}
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-950/45 border border-neutral-100 dark:border-neutral-900 flex flex-col gap-2 shadow-inner">
            <span className="text-[9px] font-mono text-neutral-400 tracking-widest uppercase">
              // TELEMETRY FEED : NODE_0{EXPERIENCE_POINTS[activeIdx].id}
            </span>
            <div className="animate-fadeIn">
              <h5 className="font-display font-black text-xs text-neutral-800 dark:text-amber-500 uppercase flex items-center gap-1.5">
                <Milestone className="h-3 w-3 text-amber-500" />
                {EXPERIENCE_POINTS[activeIdx].title}
              </h5>
              <p className="text-[11px] text-neutral-550 dark:text-neutral-400 font-sans leading-relaxed mt-1">
                {EXPERIENCE_POINTS[activeIdx].description}
              </p>
            </div>
          </div>

          {/* Scrolling Charge Percentage Console readout */}
          <div className="flex justify-between items-end border-t border-neutral-100 dark:border-neutral-850 pt-3 mt-3">
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-neutral-400">CHRONO ROTATION LEVEL</span>
              <span className="font-display font-extrabold text-sm text-amber-500 animate-pulse">
                {Math.round(scrollProgress * 100)} %
              </span>
            </div>

            <span className="text-[10px] font-mono text-neutral-400 italic">
              *Scroll to navigate nodes
            </span>
          </div>

        </div>

        {/* Right Column: Scrolling Card Nodes representing Experiences */}
        <div className="lg:col-span-7 flex flex-col gap-10" id="experience_scroll_cards">
          {EXPERIENCE_POINTS.map((point, idx) => {
            const isCurrentlyActive = activeIdx === idx;
            return (
              <div
                key={point.id}
                id={`xp-card-${point.id}`}
                className={`experience-card group rounded-3xl p-6 md:p-8 bg-white/40 dark:bg-zinc-900/30 border transition-all duration-500 shadow-sm hover:scale-[1.015] ${isCurrentlyActive
                    ? "glow-border-amber border-amber-500/50 dark:bg-zinc-950/50"
                    : "border-neutral-200/70 dark:border-neutral-802/80 hover:border-amber-500/20"
                  }`}
              >

                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-900">
                  <div className="flex items-center gap-3">
                    <div className={`h-11 w-11 flex shrink-0 items-center justify-center rounded-xl border transition-colors ${isCurrentlyActive
                        ? "bg-amber-500/15 text-amber-500 border-amber-500/25 shadow-[0_0_10px_rgba(245,158,11,0.15)]"
                        : "bg-neutral-100 text-neutral-500 border-neutral-200 dark:bg-zinc-800 dark:text-neutral-400 dark:border-neutral-750"
                      }`}>
                      <span className="font-mono text-xs font-black">C_0{point.id}</span>
                    </div>
                    <div>
                      <h4 className={`font-display text-base md:text-lg font-black transition-colors ${isCurrentlyActive ? "text-amber-500" : "text-neutral-800 dark:text-white"
                        }`}>
                        {point.title}
                      </h4>
                      <span className="text-[10px] font-mono text-neutral-450 tracking-wider uppercase block">
                        INTEGRATION NODE CAPABILITY
                      </span>
                    </div>
                  </div>

                  {/* Skills ratings indicator */}
                  <div className="flex justify-between md:flex-col items-end shrink-0 select-none">
                    <span className="text-xs font-mono font-black text-neutral-800 dark:text-neutral-200">
                      RATING: {point.percentage}%
                    </span>
                    <div className="w-24 h-1.5 bg-neutral-150 dark:bg-zinc-800 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${isCurrentlyActive ? "bg-amber-500" : "bg-neutral-400 dark:bg-neutral-600"
                          }`}
                        style={{ width: isCurrentlyActive ? `${point.percentage}%` : "10%" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-9">
                    <p className="text-sm text-neutral-605 dark:text-neutral-400 leading-relaxed font-sans">
                      {point.description}
                    </p>
                  </div>

                  {/* Circular progress loader that fills on forecast */}
                  <div className="md:col-span-3 flex justify-center md:justify-end">
                    <div className="relative h-14 w-14">
                      <svg className="h-full w-full -rotate-90">
                        <circle
                          className="text-neutral-200 dark:text-neutral-800"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="transparent"
                          r="20"
                          cx="28"
                          cy="28"
                        />
                        <circle
                          className={`transition-all duration-1000 ${isCurrentlyActive
                              ? "text-amber-500 drop-shadow-[0_0_4px_#f59e0b]"
                              : "text-neutral-400 dark:text-neutral-605"
                            }`}
                          strokeWidth="3.5"
                          strokeDasharray={2 * Math.PI * 20}
                          // Only animate to full value when highlighted (forecasted)
                          strokeDashoffset={2 * Math.PI * 20 * (1 - (isCurrentlyActive ? point.percentage : 10) / 100)}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="20"
                          cx="28"
                          cy="28"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-black text-neutral-800 dark:text-neutral-200">
                        {isCurrentlyActive ? `${point.percentage}%` : "10%"}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
