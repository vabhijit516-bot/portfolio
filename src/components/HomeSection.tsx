import React from "react";
import { Zap, Download, ArrowUpRight, FolderGit2, Briefcase, Cpu, Mail, User2 } from "lucide-react";
import { RESUME_TEXT } from "../data";

interface HomeSectionProps {
    onNavClick: (sec: string) => void;
}

export default function HomeSection({ onNavClick }: HomeSectionProps) {
    // Triggers a native document download of Abhijit's PDF resume
    const handleDownloadResume = () => {
        const element = document.createElement("a");
        element.href = "/assets/resume.pdf";
        element.download = "Abhijit_V_Resume.pdf";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <section id="home" className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 md:py-16 transition-colors">
            <div className="absolute inset-0 bg-dot-cyber pointer-events-none opacity-60" />

            {/* Curved background glowing shapes */}
            <div className="absolute right-1/4 top-1/4 -z-10 h-64 w-64 rounded-full bg-sky-500/10 blur-[90px] dark:bg-sky-500/5" />
            <div className="absolute left-1/4 bottom-1/4 -z-10 h-64 w-64 rounded-full bg-rose-500/10 blur-[90px] dark:bg-rose-500/5" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 w-full">

                {/* Left Side: Curved Welcome Greeting Card */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                    <div
                        id="home_greeting_card"
                        className="animate-cyber-float-shake transition-all duration-500 bg-white/40 dark:bg-zinc-900/45 p-6 md:p-8 rounded-[2.5rem] rounded-tr-none border border-neutral-200/80 dark:border-neutral-800/80 backdrop-blur-md shadow-lg shadow-neutral-100/40 dark:shadow-none hover:shadow-xl hover:shadow-sky-500/10 hover:border-sky-500/40 dark:hover:border-sky-500/35 flex flex-col gap-5"
                    >
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-400/20">
                                <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-ping" />
                                SYSTEM INITIALIZED
                            </span>
                            <span className="text-xs font-mono text-neutral-400">BUILD V2.6</span>
                        </div>

                        <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
                            Hi I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500 hover:scale-105 transition-transform duration-300">Abhijit</span> a Full stack developer who is currently developing and designing
                        </h1>

                        <div className="h-px bg-gradient-to-r from-sky-500/25 via-neutral-200 dark:via-neutral-800 to-transparent my-1" />

                        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans max-w-xl">
                            Equipped with a solid foundation in System AI and Machine Learning. Passionate about structuring live applications that scale cleanly, blending deep logic with exquisite design.
                        </p>

                        <div className="flex flex-wrap gap-3 mt-2">
                            <button
                                id="btn_view_projects_home"
                                onClick={() => onNavClick("projects")}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-zinc-950 transition-all shadow-md group border border-transparent dark:border-neutral-200"
                            >
                                Launch Work
                                <ArrowUpRight className="h-4 w-4 text-sky-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                            <button
                                id="btn_contact_me_home"
                                onClick={() => onNavClick("contact")}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border border-neutral-305 hover:bg-neutral-50 dark:border-neutral-805 dark:hover:bg-zinc-900 text-neutral-700 dark:text-neutral-300 transition-all glow-border-blue"
                            >
                                Get in Touch
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Glowing Resume Storage Container */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                    <div
                        id="home_resume_box"
                        className="relative overflow-hidden group rounded-3xl rounded-bl-none p-6 md:p-8 bg-white/50 dark:bg-zinc-900/60 backdrop-blur-md glow-border-red flex flex-col gap-5 shadow-lg border border-red-500/20"
                    >
                        {/* Pulsing Red Core Glow Indicator on corner */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full" id="red_indicator_container">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                            </span>
                            <span className="text-[10px] font-mono font-bold text-red-500 tracking-wider">RESUME FEED ACTIVE</span>
                        </div>

                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-500/10 border border-red-500/25 text-red-500">
                            <Download className="h-5 w-5 animate-pulse" />
                        </div>

                        <div>
                            <h3 className="font-display text-lg font-bold text-neutral-800 dark:text-white mb-1.5 flex items-center gap-2">
                                Abhijit V. Resume
                            </h3>
                            <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 line-clamp-2">
                                Bachelor&apos;s in Computer Science Engineering (AI/ML) | Sairam Engineering College
                            </p>
                        </div>

                        {/* Quick Preview list of resume */}

                        {/* Pulsing Red Core Glow Indicator on corner */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full" id="red_indicator_container">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                            </span>
                            <span className="text-[10px] font-mono font-bold text-red-500 tracking-wider">RESUME FEED ACTIVE</span>
                        </div>

                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-500/10 border border-red-500/25 text-red-500">
                            <Download className="h-5 w-5 animate-pulse" />
                        </div>

                        <div>
                            <h3 className="font-display text-lg font-bold text-neutral-800 dark:text-white mb-1.5 flex items-center gap-2">
                                Abhijit V. Resume
                            </h3>
                            <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 line-clamp-2">
                                Bachelor&apos;s in Computer Science Engineering (AI/ML) | Sairam Engineering College
                            </p>
                        </div>

                        {/* Quick Preview list of resume */}
                        <div className="rounded-xl bg-white/50 dark:bg-zinc-950/55 p-4 border border-neutral-200/50 dark:border-neutral-800/80 flex flex-col gap-2 shadow-inner">
                            <div className="flex justify-between items-center text-[11px] font-mono border-b border-neutral-100 dark:border-neutral-900 pb-1.5">
                                <span className="text-neutral-400">DOMAIN:</span>
                                <span className="text-neutral-700 dark:text-neutral-300 font-semibold">Web / Full Stack Developer</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-mono border-b border-neutral-100 dark:border-neutral-900 pb-1.5">
                                <span className="text-neutral-400">CREDENTIAL:</span>
                                <span className="text-neutral-700 dark:text-neutral-300">B.E CSE (AI/ML)</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-mono">
                                <span className="text-neutral-400">LOCATION:</span>
                                <span className="text-neutral-700 dark:text-neutral-300">Chennai, TN</span>
                            </div>
                        </div>

                        <button
                            id="resume_download_btn"
                            onClick={handleDownloadResume}
                            className="mt-2 w-full flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white font-mono text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-red-500/10 transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none focus:ring-2 focus:ring-red-500/55"
                        >
                            <Download className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
                            DOWNLOAD FULL RESUME (.PDF)
                        </button>

                        <span className="text-[10px] font-mono text-center text-neutral-400">
                            Easily accessible for structural applications & HR onboarding.
                        </span>
                    </div>
                </div>

            </div>

            {/* PORTFOLIO OVERVIEW PANEL (Satisfies "All page details overview of all pages") */}
            <div className="mt-16 relative w-full" id="home_overview_dash">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-neutral-200 dark:to-neutral-805" />
                    <h2 className="font-display text-xs font-mono font-bold uppercase text-neutral-400 dark:text-neutral-500 tracking-[0.25em] flex items-center gap-2 text-center">
                        <Zap className="h-3.5 w-3.5 text-sky-500" /> Web Terminal Chapters
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-neutral-200 dark:to-neutral-805" />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                        { id: "about", title: "About Me", subtitle: "Education & Internships", icon: User2, color: "hover:border-sky-500 group-hover:text-sky-500" },
                        { id: "projects", title: "My Projects", subtitle: "Code Video Feeds", icon: FolderGit2, color: "hover:border-fuchsia-500 group-hover:text-fuchsia-500" },
                        { id: "experience", title: "My Experience", subtitle: "Timeline Milestones", icon: Briefcase, color: "hover:border-amber-500 group-hover:text-amber-500" },
                        { id: "skills", title: "Technical Skills", subtitle: "Development Stack", icon: Cpu, color: "hover:border-emerald-500 group-hover:text-emerald-500" },
                        { id: "contact", title: "Contact", subtitle: "Get In Touch", icon: Mail, color: "hover:border-red-500 group-hover:text-red-500" }
                    ].map((ch) => (
                        <div
                            key={ch.id}
                            onClick={() => onNavClick(ch.id)}
                            className="group cursor-pointer rounded-2xl p-4 bg-white/40 hover:bg-white/80 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/60 border border-neutral-150 hover:border-sky-505 dark:border-neutral-850 dark:hover:border-sky-505/50 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md animate-shake-hover"
                            id={`overview_card_${ch.id}`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="p-2 rounded-xl bg-neutral-100 dark:bg-zinc-800/80 text-neutral-500 dark:text-neutral-400 group-hover:bg-sky-500/10 group-hover:text-sky-500 transition-colors">
                                    <ch.icon className="h-4.5 w-4.5" />
                                </div>
                                <ArrowUpRight className="h-3.5 w-3.5 text-neutral-300 dark:text-neutral-600 group-hover:text-sky-500 transition-colors" />
                            </div>
                            <h4 className="font-display text-sm font-bold text-neutral-800 dark:text-white leading-tight mb-1 group-hover:text-sky-500 transition-colors">
                                {ch.title}
                            </h4>
                            <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                                {ch.subtitle}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
