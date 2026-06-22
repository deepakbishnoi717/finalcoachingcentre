import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, LineChart, Sparkles, MonitorPlay, CheckCircle2, TrendingUp, Calendar, Heart } from 'lucide-react';

export default function BentoFeatures() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-6 gap-4 w-full"
    >
      {/* 1. Smart Study Material - Span 3 */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, transition: { duration: 0.15 } }}
        className="md:col-span-3 bg-[#0f1926]/90 p-5 rounded-lg border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between overflow-hidden relative group"
      >
        <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all pointer-events-none" />
        <div>
          <div className="inline-flex p-2 bg-cyan-500/10 text-cyan-400 rounded border border-cyan-550/20 mb-4 items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span className="text-[9px] font-mono font-bold tracking-widest uppercase">MODULE_PACKS</span>
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-1.5 flex items-center gap-2">
            Smart Study Material
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Eliminate cognitive fatigue with structured modules, color-coded summaries, master formula guides, and adaptive Daily Practice Problems (DPPs).
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-1.5 pt-3 border-t border-slate-800/60">
          {['Curated Topic booklets', 'Formulas & Cheat-Sheets', 'AI-Powered DPPs', 'Step-by-step Video Keys'].map((feat, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] font-semibold text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 2. Weekly Mock Tests - Span 3 */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, transition: { duration: 0.15 } }}
        className="md:col-span-3 bg-[#0f1926]/90 p-5 rounded-lg border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between overflow-hidden relative group"
      >
        <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        <div>
          <div className="inline-flex p-2 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 mb-4 items-center gap-1.5">
            <LineChart className="w-4 h-4" />
            <span className="text-[9px] font-mono font-bold tracking-widest uppercase">COMPUTER_MOCKS</span>
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-1.5">
            Weekly Mock Tests
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Assess preparation under strict, official CBT formats (JEE/NEET UI clone). Instantly trigger statistical dashboards on weak themes.
          </p>
        </div>

        {/* Mini Chart Mockup */}
        <div className="bg-slate-950/80 p-3 rounded border border-slate-800/80 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono font-extrabold text-slate-500">
            <span>WEEKLY METRIC INSIGHTS</span>
            <span className="text-emerald-400 flex items-center gap-0.5 font-bold">
              <TrendingUp className="w-3 h-3" /> +12.4% BOOST
            </span>
          </div>
          <div className="flex items-end gap-1.5 h-12 pt-1">
            {[35, 45, 40, 60, 52, 75, 92].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className={`w-full rounded-t-xs transition-all duration-500 ${
                    i === 6 ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'bg-slate-800'
                  }`}
                  style={{ height: `${height}%` }}
                />
                <span className="text-[8px] font-mono text-slate-600">M{i+1}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3. Personal Mentorship - Span 2 */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, transition: { duration: 0.15 } }}
        className="md:col-span-2 bg-[#0f1926]/90 p-5 rounded-lg border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between overflow-hidden relative group"
      >
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        <div>
          <div className="inline-flex p-2 bg-amber-500/10 text-amber-400 rounded border border-amber-500/20 mb-4 items-center gap-1.5">
            <Heart className="w-4 h-4" />
            <span className="text-[9px] font-mono font-bold tracking-widest uppercase">MENTOR_LIVE</span>
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-1.5">
            1:1 Personal Mentorship
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Get matched with experienced seniors who cracked competitive exams. Receive tailored strategies for focus timelines.
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 bg-amber-500/10 p-2.5 rounded border border-amber-500/20">
          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
            Doubt-Solving Live 14h/day
          </span>
        </div>
      </motion.div>

      {/* 4. Online/Offline Batches - Span 4 */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, transition: { duration: 0.15 } }}
        className="md:col-span-4 bg-[#0f1926]/90 p-5 rounded-lg border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between overflow-hidden relative group"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
          <div className="flex-1">
            <div className="inline-flex p-2 bg-indigo-500/10 text-indigo-400 rounded border border-indigo-500/20 mb-4 items-center gap-1.5">
              <MonitorPlay className="w-4 h-4" />
              <span className="text-[9px] font-mono font-bold tracking-widest uppercase">PLATFORM_HYBRID</span>
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-1.5">
              Hybrid Class Batches
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Switch effortlessly. Attend physical interactive classes at our smart campus or view pristine dual-camera ultra-HD live broadcasts from home.
            </p>
          </div>
          
          <div className="w-full md:w-48 shrink-0 bg-slate-950/80 border border-slate-800 shadow-inner rounded p-3 flex flex-col gap-2">
            <div className="text-[9px] font-mono font-black text-slate-500 flex items-center gap-1.5 uppercase">
              <Calendar className="w-3 h-3 text-indigo-400" /> TIMETABLE INDEX
            </div>
            <div className="space-y-1.5">
              <div className="p-1.5 bg-[#12223c]/40 rounded border border-indigo-900/30 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-300">Physics Advanced</span>
                <span className="text-[9px] font-mono text-indigo-400 bg-indigo-950/80 px-1.5 py-0.5 rounded border border-indigo-900/40">14:00</span>
              </div>
              <div className="p-1.5 bg-[#12223c]/40 rounded border border-indigo-900/30 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-300">Chemistry Organic</span>
                <span className="text-[9px] font-mono text-indigo-400 bg-indigo-950/80 px-1.5 py-0.5 rounded border border-indigo-900/40">16:00</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
