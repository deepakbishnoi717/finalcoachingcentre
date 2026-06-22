import React from 'react';
import { motion } from 'motion/react';
import { Award, Users, ThumbsUp, GraduationCap } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    {
      icon: Award,
      value: '17+ Years',
      label: 'Coaching Legacy',
      color: 'text-cyan-400',
      barColor: 'bg-cyan-500',
      percent: 'w-11/12',
      trend: '+17 Yrs',
    },
    {
      icon: Users,
      value: '5,000+',
      label: 'Qualified Students',
      color: 'text-emerald-400',
      barColor: 'bg-emerald-500',
      percent: 'w-4/5',
      trend: 'ACTIVE',
    },
    {
      icon: ThumbsUp,
      value: 'Top Tier',
      label: 'IIT-JEE & NEET AIRs',
      color: 'text-amber-400',
      barColor: 'bg-amber-400',
      percent: 'w-3/4',
      trend: 'EXCELLENT',
    },
    {
      icon: GraduationCap,
      value: 'PhD & IIT',
      label: 'Faculty Mentor Crew',
      color: 'text-indigo-400',
      barColor: 'bg-indigo-500',
      percent: 'w-[90%]',
      trend: 'ONLINE',
    },
  ];

  return (
    <div className="w-full relative z-10 font-sans">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-[#0f1926]/90 border border-slate-800 p-4 rounded-lg flex flex-col justify-between hover:border-slate-700 transition-colors hover:bg-[#111e2f] select-none"
            >
              <div className="flex items-center justify-between pointer-events-none mb-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                  {stat.label}
                </span>
                <IconComponent className="w-3.5 h-3.5 text-slate-500" />
              </div>
              
              <div className="flex items-end justify-between mt-1">
                <div className={`text-2xl md:text-3xl font-mono font-bold tracking-tight ${stat.color}`}>
                  {stat.value}
                </div>
                <div className={`text-[10px] ${stat.color} font-mono font-extrabold tracking-wider bg-slate-800/40 px-1.5 py-0.5 rounded border border-slate-800`}>
                  {stat.trend}
                </div>
              </div>
              
              <div className="w-full h-1 bg-slate-850 mt-3 rounded-full overflow-hidden">
                <div className={`h-full ${stat.barColor} ${stat.percent}`} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

