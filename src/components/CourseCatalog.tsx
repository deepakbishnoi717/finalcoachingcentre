import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Download, BookOpen, Clock, Users, Flame, Star, Compass, Award } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  duration: string;
  target: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  badge?: string;
  features: string[];
}

interface CourseCatalogProps {
  onProspectusClick: (courseName: string) => void;
  onToast: (text: string) => void;
}

export default function CourseCatalog({ onProspectusClick, onToast }: CourseCatalogProps) {
  const courses: Course[] = [
    {
      id: 'jee',
      name: 'IIT-JEE Elite Achievers Course',
      duration: '2 Years Integrated',
      target: 'Classes XI ~ XII & Equivalent',
      desc: 'Master the entire syllabus of JEE Mains & Advanced with high-quality concept clearance, critical worksheets, and rank-boosting mock test analysis.',
      icon: Award,
      color: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
      badge: 'Highly Popular',
      features: ['Daily Live & Interactive Classes', 'Personal IITian Doubt Assistant', 'Official CBT Simulator Exams', 'Adaptive Modules & Workbooks']
    },
    {
      id: 'neet',
      name: 'NEET Medical Premier Batch',
      duration: '2 Years Intensive',
      target: 'Classes XI ~ XII Medical Aspirants',
      desc: 'Rigorous conceptual drilldown of Physics, Chemistry, and intensive NCERT-centric Biology. Perfecting speed-depth ratios for top medical ranks.',
      icon: Flame,
      color: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      badge: 'Admissions Open',
      features: ['Specially Curated NCERT-Pedia', 'Weekly 720-marks real mocks', 'Interactive Biology 3D diagrams', 'Fast-track Doubt clearing panel']
    },
    {
      id: 'foundation',
      name: 'Olympiads & Foundation Track',
      duration: '1-3 Years Integrated',
      target: 'Classes VIII, IX & X Students',
      desc: 'Early advantage platform bridging school curriculum with advanced competitive concepts. Cultivates scientific temper, logic, and analytical excellence.',
      icon: Compass,
      color: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
      badge: 'Nurture Batch',
      features: ['Pre-RMO, NSEJS and NTSE focus', 'Advanced Math & Mental Ability', 'Interactive Virtual Lab Access', 'Bi-weekly descriptive reviews']
    },
    {
      id: 'droppers',
      name: 'Ultimate Droppers Grid',
      duration: '1 Year Fasttrack',
      target: 'Class XII Qualified (Repeaters)',
      desc: 'High-frequency revisions, target mock tests, and rigorous mental coaching. Tailored for passionate repeaters seeking massive score increments.',
      icon: Star,
      color: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
      badge: 'Rank Booster',
      features: ['High-yield micro-schedule mapping', 'Rank Booster specialized DPPs', 'Targeted doubt-remedial clinics', 'Weekly full syllabus exams']
    }
  ];

  return (
    <div className="w-full relative z-10 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {courses.map((course, idx) => {
          const IconComponent = course.icon;
          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -3 }}
              className="bg-[#0f1926]/90 border border-slate-800 rounded-lg overflow-hidden p-5 flex flex-col justify-between hover:border-slate-700 transition-all relative group select-none"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded ${course.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  {course.badge && (
                    <span className="text-[9px] uppercase tracking-widest font-bold bg-slate-950/85 text-cyan-400 border border-slate-800 px-2 py-0.5 rounded">
                      {course.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base md:text-lg font-black text-slate-100 mb-2 leading-tight">
                  {course.name}
                </h3>

                <div className="flex flex-wrap gap-2 text-[10px] font-mono mb-3 pb-3 border-b border-slate-800/60">
                  <span className="flex items-center gap-1.5 bg-slate-950/50 px-2 py-0.5 rounded border border-slate-800 text-slate-400">
                    <Clock className="w-3 h-3 text-cyan-400" /> {course.duration.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-950/50 px-2 py-0.5 rounded border border-slate-800 text-slate-400">
                    <Users className="w-3 h-3 text-emerald-400" /> {course.target.toUpperCase()}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {course.desc}
                </p>

                <div className="space-y-1.5 mb-5">
                  {course.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-semibold text-slate-300">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-slate-800/60">
                <button
                  onClick={() => onProspectusClick(course.name)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-cyan-500 hover:bg-cyan-600 active:scale-98 text-slate-950 text-xs font-black rounded transition-all cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                >
                  <Download className="w-3.5 h-3.5" /> DOWNLOAD FILE
                </button>
                
                <button
                  onClick={() => onToast('Enrollment request triggered! Form focused.')}
                  className="px-3 py-2.5 bg-slate-950/80 hover:bg-[#111e2f] hover:border-slate-600 text-slate-300 text-xs font-bold rounded transition-colors cursor-pointer border border-slate-800 shrink-0"
                >
                  QUICK_LINK
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
