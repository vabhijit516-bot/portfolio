import React from "react";
import { Award, ShieldCheck, MapPin, Calendar, Clock, Sparkles } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 md:py-24 border-t border-neutral-100 dark:border-neutral-900/60 transition-colors">
      <div className="absolute inset-0 bg-grid-cyber opacity-30 pointer-events-none" />

      {/* Title */}
      <div className="flex flex-col mb-12 relative z-10" id="about_title_container">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
            01 / Identity Core
          </h2>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">
          About Me &amp; Internships
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10 w-full">

        {/* Left Column: Digital Pasted Offer Letter Mockup */}
        <div className="lg:col-span-6 flex flex-col justify-start">
          <div
            id="offer_letter_pasted_box"
            className="group relative overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-zinc-900 dark:to-zinc-950 p-[1px] rounded-3xl glow-border-blue h-full"
          >
            {/* The actual letter borders */}
            <div className="bg-white dark:bg-zinc-950/95 p-6 md:p-8 rounded-[23px] h-full flex flex-col gap-5 justify-between relative">

              {/* Retro/Cyber Holographic Stamp */}
              <div className="absolute right-6 top-6 flex flex-col items-center justify-center border-2 border-dashed border-sky-400/35 bg-sky-500/5 rotate-12 rounded-full h-24 w-24 p-1 animate-pulse" id="holographic_stamp">
                <ShieldCheck className="h-8 w-8 text-sky-501" />
                <span className="text-[7px] font-mono font-black text-sky-500 text-center tracking-normal mt-0.5">NEPTUNE VERIFIED</span>
              </div>

              {/* Offer Letter Header */}
              <div className="flex flex-col gap-1 border-b border-neutral-100 dark:border-neutral-900 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-indigo-500" />
                  <span className="font-display font-extrabold text-sm tracking-widest text-indigo-900 dark:text-indigo-400">CODE NEPTUNE INT.</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">OFFICIAL APPOINTMENT LETTER // REG-10928</span>
              </div>

              {/* Content body of the letter */}
              <div className="flex flex-col gap-4 font-mono text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed py-2">
                <div className="flex justify-between text-[11px] text-neutral-400 border-b border-neutral-100/40 dark:border-neutral-900/40 pb-1">
                  <span>DATE: JUNE 15, 2026</span>
                  <span>CHENNAI, INDIA</span>
                </div>

                <div>
                  <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-1">TO WHOM IT MAY CONCERN</span>
                  <p>
                    This is to verify that <span className="font-bold text-neutral-800 dark:text-neutral-200">ABHIJIT V</span>, student of Sairam institutions, has successfully completed a professional developer internship at Code Neptune systems.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px] bg-neutral-50 dark:bg-zinc-900/60 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800/80">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-neutral-400">ROLE:</span>
                    <span className="text-neutral-700 dark:text-neutral-300 font-bold">Front-End Developer Intern</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-neutral-400">DURATION:</span>
                    <span className="text-neutral-700 dark:text-neutral-300 font-bold">15 Active Working Days</span>
                  </div>
                </div>

                <p className="text-[11px]">
                  During this practical internship frame, the applicant engaged deeply in building structural code layouts, prototyping UI workflows and testing local integration sequences.
                </p>
              </div>

              {/* Letter Footer */}
              <div className="flex justify-between items-end border-t border-neutral-100 dark:border-neutral-900 pt-4 mt-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-400 uppercase">OFFICIAL SEAL</span>
                  <span className="text-xs font-display font-semibold text-neutral-800 dark:text-zinc-200">CODE NEPTUNE HQ</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-neutral-400 uppercase">SIGNATURE</span>
                  <span className="text-xs font-mono font-bold italic text-sky-500">AUTHORIZED SYSTEM SEC.</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Moving Animations Message Container & Background details */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-6">

          {/* Sairam academic status block */}
          <div className="p-5 overflow-hidden rounded-2xl border border-neutral-200/65 dark:border-neutral-800 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-md flex items-start gap-4 shadow-sm" id="sairam_status_block">
            <div className="h-11 w-11 shrink-0 flex items-center justify-center bg-indigo-550/10 text-indigo-500 rounded-xl border border-indigo-500/20">
              <Award className="h-5.5 w-5.5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-indigo-500 dark:text-indigo-400 uppercase font-black tracking-wider">ACADEMIC SHELL</span>
              <h4 className="font-display font-black text-sm text-neutral-800 dark:text-white leading-tight mt-0.5 mb-1">
                Sri Sairam Engineering College
              </h4>
              <p className="text-xs font-sans text-neutral-500 dark:text-neutral-400 leading-normal">
                Department of Computer Science Engineering (AI/ML) – B.E - [2025-2029].
              </p>
            </div>
          </div>

          {/* Core About Speech Box with flowing moving transition */}
          <div
            id="about_narrative_box"
            className="animate-cyber-float-shake flex-1 bg-white dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800/80 p-6 md:p-8 rounded-[2rem] rounded-bl-none shadow-md hover:shadow-cyan-500/5 transition-all duration-500 flex flex-col justify-between gap-6"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800/60">
              <span className="font-mono text-xs text-sky-500 tracking-wider flex items-center gap-1.5 font-bold">
                <Sparkles className="h-4 w-4 text-sky-502 shrink-0" /> MISSION OBJECTIVE
              </span>
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                <span className="h-2 w-2 rounded-full bg-indigo-400" />
              </div>
            </div>

            <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans first-letter:text-3xl first-letter:font-extrabold first-letter:text-sky-500 first-letter:mr-2">
              I&apos;m a student of Sairam institutions who is now striving to learn more about developing and its components. an intern who worked in Code Neptune for 15 working days which gave a huge experience in developing and using the integrated things in the progress of developing a application and its working progress step by step which is a hands on experience for this field
            </p>

            <div className="flex flex-wrap gap-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/60">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                <Calendar className="h-4 w-4 text-sky-500" /> 15 Working Days
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                <Clock className="h-4 w-4 text-sky-500" /> Hands-on experience
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                <MapPin className="h-4 w-4 text-sky-500" /> Live Integration
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
