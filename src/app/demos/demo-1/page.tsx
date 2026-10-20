"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sun, BrainCircuit, Sparkles, 
  ShieldCheck, Zap, ArrowRight, Command, 
  Layers, Fingerprint, Search
} from 'lucide-react';

// --- Types & Constants ---
const FEATURES = [
  {
    title: "Neural Memory",
    desc: "Scriven indexes every thought, link, and document you interact with.",
    icon: <BrainCircuit className="text-purple-500" />,
    size: "md:col-span-2",
    color: "bg-purple-500/5"
  },
  {
    title: "Instant Search",
    desc: "Command + K to recall anything from your past 5 years.",
    icon: <Search className="text-blue-500" />,
    size: "md:col-span-1",
    color: "bg-blue-500/5"
  },
  {
    title: "Zero-Knowledge",
    desc: "Your data is encrypted. Even we can't read it.",
    icon: <ShieldCheck className="text-emerald-500" />,
    size: "md:col-span-1",
    color: "bg-emerald-500/5"
  },
  {
    title: "Personal Logic",
    desc: "An AI that learns your specific writing style and decision-making logic to draft perfect responses.",
    icon: <Fingerprint className="text-orange-500" />,
    size: "md:col-span-2",
    color: "bg-orange-500/5"
  }
];

export default function ScrivenDemo() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`${isDark ? 'dark' : ''} selection:bg-purple-500 selection:text-white`}>
      <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#080808] text-slate-900 dark:text-slate-100 transition-colors duration-700 font-sans">
        
        {/* --- NAVIGATION --- */}
        <nav className="fixed top-0 w-full z-50 border-b border-slate-200/50 dark:border-white/5 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
                <Command size={18} className="text-white dark:text-black" />
              </div>
              <span className="font-bold tracking-tighter text-xl">SCRIVEN</span>
            </div>

            <div className="flex items-center gap-6">
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-white/5 hover:scale-110 active:scale-95 transition-all"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-600" />}
              </button>
              <button className="hidden md:block px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-bold rounded-full hover:opacity-80 transition-opacity">
                Join Waitlist
              </button>
            </div>
          </div>
        </nav>

        {/* --- HERO SECTION --- */}
        <section className="relative pt-44 pb-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 mb-10 shadow-sm"
            >
              <Sparkles size={12} /> The Future of Thought
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-[110px] font-bold tracking-tighter leading-[0.85] mb-10 italic"
            >
              Your Mind, <br />
              <span className="text-slate-300 dark:text-zinc-800 not-italic">Synchronized.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-2xl text-slate-500 dark:text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Scriven Labs is a personal intelligence layer that lives across your devices, learning your context to amplify your output.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="group flex items-center gap-3 px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold text-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all">
                Get Early Access <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* --- BENTO GRID SECTION --- */}
        <section className="max-w-7xl mx-auto px-6 py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {FEATURES.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${f.size} group p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 bg-white dark:bg-[#0F0F0F] hover:border-purple-500/50 transition-all shadow-sm flex flex-col justify-between overflow-hidden relative`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${f.color} blur-[60px] rounded-full group-hover:scale-150 transition-transform`} />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-8">
                    {f.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-4 tracking-tight">{f.title}</h3>
                  <p className="text-slate-500 dark:text-zinc-500 leading-relaxed text-lg font-medium">
                    {f.desc}
                  </p>
                </div>
                
                <div className="mt-12 flex items-center gap-2 text-sm font-bold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}

            {/* Interactive "Live UI" Card */}
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="md:col-span-3 mt-6 p-1 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 rounded-[3rem]"
            >
              <div className="bg-white dark:bg-[#080808] rounded-[2.9rem] p-12 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-md">
                  <h2 className="text-4xl font-bold mb-6">Designed to be <br/> invisible.</h2>
                  <p className="text-slate-500 dark:text-zinc-400 mb-8 font-medium">
                    Scriven stays out of your way until you need it. A simple command brings your entire digital knowledge base to your fingertips.
                  </p>
                  <div className="flex gap-4">
                     <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-black bg-slate-200 dark:bg-zinc-800" />
                        ))}
                     </div>
                     <p className="text-sm self-center font-bold text-slate-400">Joined by 2k+ designers</p>
                  </div>
                </div>
                
                {/* Simulated Command Interface */}
                <div className="w-full max-w-md p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-2xl">
                  <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-white/10 mb-3">
                    <Search size={18} className="text-slate-400" />
                    <span className="text-sm text-slate-400">Summarize my last meeting with...</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-purple-500/10 rounded-lg text-xs font-medium text-purple-600">Product Strategy - March 12</div>
                    <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-lg text-xs font-medium">Design Feedback Hub</div>
                    <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-lg text-xs font-medium">Marketing Q3 Roadmap</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="py-20 border-t border-slate-200 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-sm font-bold text-slate-400">© 2024 SCRIVEN LABS INC.</div>
            <div className="flex gap-8 text-sm font-bold text-slate-500">
              <a href="#" className="hover:text-black dark:hover:text-white">Twitter</a>
              <a href="#" className="hover:text-black dark:hover:text-white">Github</a>
              <a href="#" className="hover:text-black dark:hover:text-white">Privacy</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
