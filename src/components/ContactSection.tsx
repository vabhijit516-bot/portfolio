import React, { useState } from "react";
import { Mail, Phone, MapPin, LinkedinIcon, GithubIcon, Send, AlertTriangle, CheckCircle, Loader } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // clear error/success states on typing
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, description } = formData;

    // ============ FRONTEND VALIDATION ============
    if (!name.trim()) {
      setErrorMsg("Validation Failed: Please submit your Name. It cannot be empty.");
      return;
    }
    if (!email.trim()) {
      setErrorMsg("Validation Failed: Please submit your Email. It cannot be empty.");
      return;
    }

    // Name contains numbers validation
    const hasNumbers = /[0-9]/.test(name);
    if (hasNumbers) {
      setErrorMsg("Validation Failed: The name should not contain any numbers.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Validation Failed: Please enter a valid email address.");
      return;
    }

    if (!description.trim()) {
      setErrorMsg("Validation Failed: Please enter your project description.");
      return;
    }

    if (description.trim().length < 10) {
      setErrorMsg("Validation Failed: Description must be at least 10 characters.");
      return;
    }

    // ============ SEND TO BACKEND ============
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          description: description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // ============ SUCCESS ============
      setSuccessMsg("Your message has been sent successfully! We'll get back to you soon.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        description: "",
      });

      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMsg("");
      }, 5000);

    } catch (error) {
      console.error("Submission error:", error);
      setErrorMsg(
        error instanceof Error
          ? error.message
          : "An error occurred while sending your message. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 border-t border-neutral-150 dark:border-neutral-900/60 transition-colors">
      <div className="absolute inset-0 bg-dot-cyber opacity-35 pointer-events-none" />

      {/* Background glow overlay */}
      <div className="absolute right-[10%] bottom-[10%] -z-10 h-64 w-64 rounded-full bg-red-500/10 blur-[90px]" />

      {/* Section Header */}
      <div className="flex flex-col mb-12 relative z-10" id="contact_title_block">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-600 dark:text-red-400">
            05 / Communication Nodes
          </h2>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">
          Contact Terminal
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10 w-full animate-cyber-float-shake">

        {/* Left column: Physical Details and Social networks links */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="p-6 md:p-8 rounded-3xl bg-zinc-900/5 dark:bg-zinc-900/40 border border-neutral-200/60 dark:border-neutral-800/80 backdrop-blur-md flex flex-col justify-between gap-6 h-full">

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono text-red-600 font-black tracking-widest">TRANSMISSION DIRECTORY</span>
              <h4 className="font-display font-black text-lg text-neutral-800 dark:text-white uppercase">
                Access Channels
              </h4>
            </div>

            {/* Direct Channels */}
            <div className="flex flex-col gap-4 font-mono text-xs" id="contact_channels_list">

              {/* Location Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-zinc-950/45 border border-neutral-100 dark:border-neutral-900 shadow-sm">
                <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-neutral-400 uppercase font-bold">Location</span>
                  <span className="text-neutral-700 dark:text-neutral-200 font-bold">Chennai, Tamil Nadu</span>
                </div>
              </div>

              {/* Email Card */}
              <a
                href="mailto:vabi3388@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-zinc-950/45 border border-neutral-100 dark:border-neutral-900 shadow-sm hover:border-red-500/20 transition-all group"
              >
                <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-neutral-400 uppercase font-bold">Secure Mail</span>
                  <span className="text-neutral-700 dark:text-neutral-200 font-bold break-all group-hover:text-red-500 transition-colors">vabi3388@gmail.com</span>
                </div>
              </a>

              {/* Phone Card */}
              <a
                href="tel:9840549063"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-zinc-950/45 border border-neutral-100 dark:border-neutral-900 shadow-sm hover:border-red-500/20 transition-all group"
              >
                <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
                  <Phone className="h-4.5 w-4.5 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-neutral-400 uppercase font-bold">Secure Line</span>
                  <span className="text-neutral-700 dark:text-neutral-200 font-bold group-hover:text-red-500 transition-colors">+91 9840549063</span>
                </div>
              </a>

            </div>

            {/* Social Anchor Links Row */}
            <div className="flex items-center gap-3 pt-4 border-t border-neutral-150 dark:border-neutral-850" id="socials_row">
              <a
                href="https://www.linkedin.com/in/abhijit-v-3a05a9359/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3B2DD8%2FuGKR0CJcrECHXTpSg%3D%3D"
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-mono text-xs font-bold transition-all shadow-md shadow-blue-500/20 active:scale-95 group"
              >
                <LinkedinIcon className="h-4 w-4" />
                LINKEDIN
              </a>

              <a
                href="https://github.com/vabi3388-ai"
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 font-mono text-xs font-bold transition-all shadow-md active:scale-95 group"
              >
                <GithubIcon className="h-4 w-4" />
                GITHUB
              </a>
            </div>

          </div>
        </div>

        {/* Right column: Interactive Contact Form (glowing red) */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          <div
            id="contact_form_glowing_card"
            className="p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900/35 backdrop-blur-md flex flex-col gap-5 border border-red-500/20 glow-border-red shadow-lg text-xs"
          >
            <div>
              <span className="text-[9px] font-mono font-bold text-red-500 tracking-wider block mb-1">
                SECURE INTERACTION INTERFACE
              </span>
              <h4 className="font-display text-lg font-black text-neutral-800 dark:text-white uppercase leading-tight">
                lets get into contact in any project required
              </h4>
            </div>

            {/* Form Validators Output alerts */}
            {errorMsg && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 animate-shake">
                <AlertTriangle className="h-5.5 w-5.5 text-red-500 shrink-0" />
                <span className="font-mono text-[11px] font-bold leading-normal">{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-500 dark:text-emerald-400 animate-fadeIn">
                <CheckCircle className="h-5.5 w-5.5 text-emerald-500 shrink-0" />
                <span className="font-display text-[11px] font-extrabold leading-normal uppercase tracking-wider">{successMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 font-mono text-[11px]">

              <div className="flex flex-col gap-2">
                <label className="text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider">
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="contact_input_name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Insert name (characters only, no numbers)..."
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-zinc-950/50 border border-neutral-200 dark:border-neutral-800/80 text-neutral-800 dark:text-white focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/50 transition-all font-sans text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider">
                  Contact Electronic Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="contact_input_email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Insert email (e.g. user@domain.com)..."
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-zinc-950/50 border border-neutral-200 dark:border-neutral-800/80 text-neutral-800 dark:text-white focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/50 transition-all font-sans text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider">
                  Project Description / Narrative
                </label>
                <textarea
                  name="description"
                  id="contact_textarea_desc"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  disabled={isLoading}
                  placeholder="Detail the project requirement scope, stack rules, or timeline benchmarks..."
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-zinc-950/50 border border-neutral-200 dark:border-neutral-800/80 text-neutral-800 dark:text-white focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/50 transition-all font-sans text-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-500/50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-red-500/10 transition-all hover:scale-[1.01] active:scale-95 group focus:outline-none focus:ring-2 focus:ring-red-500/55 uppercase tracking-widest text-xs"
              >
                {isLoading ? (
                  <>
                    <Loader className="h-3.5 w-3.5 animate-spin" />
                    TRANSMITTING...
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    INITIATE TRANSMISSION
                  </>
                )}
              </button>
            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
