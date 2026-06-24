import React from "react";
import { FolderGit2, Play, Pause, AlertCircle, ExternalLink, Zap } from "lucide-react";
import { PROJECTS_DATA, Project } from "../data";

export default function ProjectsSection() {
  // Safe handler to track video error fallbacks dynamically
  const [videoSources, setVideoSources] = React.useState<Record<number, string>>(() => {
    const initial: Record<number, string> = {};
    PROJECTS_DATA.forEach((p) => {
      initial[p.id] = p.videoSrc;
    });
    return initial;
  });

  const handleVideoError = (id: number, fallback: string) => {
    setVideoSources((prev) => {
      if (prev[id] !== fallback) {
        return {
          ...prev,
          [id]: fallback,
        };
      }
      return prev;
    });
  };

  return (
    <section id="projects" className="relative py-16 md:py-24 border-t border-neutral-150 dark:border-neutral-900/60 transition-colors">
      <div className="absolute inset-0 bg-dot-cyber opacity-35 pointer-events-none" />

      {/* Header section marker */}
      <div className="flex flex-col mb-8 relative z-10" id="projects_title_block">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-600 dark:text-fuchsia-400">
            02 / Code Ledger
          </h2>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">
          Projects I Have Worked On
        </h3>
      </div>

      {/* Required Highlighted Statement Box */}
      <div
        id="projects_highlight_statement"
        className="mb-12 relative overflow-hidden backdrop-blur-md rounded-2xl p-5 md:p-6 bg-gradient-to-r from-fuchsia-500/10 via-indigo-500/5 to-transparent border border-fuchsia-400/20 shadow-sm animate-shake-hover"
      >
        <span className="absolute -right-6 -bottom-6 text-fuchsia-500/10 dark:text-fuchsia-500/5 font-black text-8xl pointer-events-none uppercase font-display">
          HTML React
        </span>
        <div className="flex items-start gap-4 relative z-10">
          <div className="h-10 w-10 flex shrink-0 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-400/20">
            <FolderGit2 className="h-5.5 w-5.5" />
          </div>
          <div>
            <h4 className="text-[10px] font-mono text-fuchsia-600 dark:text-fuchsia-450 uppercase font-black tracking-widest mb-1">
              INSTRUCTOR FEEDBACK LEDGER KEYS
            </h4>
            <p className="font-sans text-sm md:text-base font-semibold text-neutral-700 dark:text-neutral-200 leading-relaxed italic">
              &ldquo;these are some of the projects I have developed using my intern experience by only using html and CSS and react&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Vertical Stacking / Line-by-line Order */}
      <div className="flex flex-col gap-10 relative z-10" id="projects_stack_loop">
        {PROJECTS_DATA.map((project, idx) => {
          const currentSrc = videoSources[project.id];
          return (
            <div
              key={project.id}
              id={`project_card_${project.id}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 bg-white/40 dark:bg-zinc-900/35 border border-neutral-2rem/70 dark:border-neutral-802/80 rounded-3xl hover:border-fuchsia-500/40 dark:hover:border-fuchsia-500/30 transition-all duration-500 shadow-sm hover:shadow-lg hover:shadow-fuchsia-500/5"
            >

              {/* Left Screen: The Video Frame (glowing border) */}
              <div
                id={`project_video_container_${project.id}`}
                className="lg:col-span-5 relative w-full aspect-video rounded-2xl overflow-hidden bg-black/90 glow-border-fuchsia border border-neutral-200 dark:border-neutral-800"
              >
                <video
                  id={`video_player_${project.id}`}
                  className="w-full h-full object-cover rounded-2xl"
                  controls
                  muted
                  playsInline
                  autoPlay
                  loop
                  key={currentSrc} // forces reload if error-fallback switches source
                  src={currentSrc}
                  onError={() => handleVideoError(project.id, project.fallbackVideoSrc)}
                >
                  Your browser does not support HTML5 video playback.
                </video>

                {/* Cyber HUD video indicator */}
                <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/75 px-2.5 py-1 rounded-md text-[9px] font-mono font-bold tracking-widest text-fuchsia-400 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500 animate-ping" />
                  FEED 0{project.id}
                </span>

                <span className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/75 px-1.5 py-0.5 rounded text-[8px] font-mono text-neutral-400">
                  AUTO CORES READY
                </span>
              </div>

              {/* Right Side: Text Description Core */}
              <div className="lg:col-span-7 flex flex-col justify-center gap-4 pl-0 lg:pl-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-xl font-extrabold text-neutral-800 dark:text-white leading-tight mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-fuchsia-600 dark:text-fuchsia-400 font-semibold uppercase tracking-wider">
                      {project.subtitle}
                    </p>
                  </div>
                  <span className="font-mono text-sm text-neutral-350 dark:text-neutral-700 font-extrabold select-none">
                    // 0{project.id}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans bg-neutral-50 dark:bg-zinc-950/40 p-4 rounded-xl border border-neutral-100 dark:border-neutral-900">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-mono uppercase bg-neutral-100 text-neutral-600 dark:bg-zinc-800/80 dark:text-neutral-300 px-3 py-1 rounded-md border border-neutral-200/50 dark:border-neutral-700/50"
                    >
                      {t}
                    </span>
                  ))}

                  {project.id === 3 && (
                    <span
                      className="text-[9px] font-mono uppercase bg-rose-500/10 text-rose-500 px-2.5 py-1 rounded-md border border-rose-500/20 animate-pulse tracking-wide"
                    >
                      CURRENT GENERATION
                    </span>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
