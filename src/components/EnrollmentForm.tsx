import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Phone, BookOpen, Send, CheckCircle, AlertTriangle, Cpu, HelpCircle } from 'lucide-react';
import { StudentEnrollment } from '../types';

interface EnrollmentFormProps {
  onSuccess: (data: StudentEnrollment) => void;
  onToast: (text: string) => void;
}

export default function EnrollmentForm({ onSuccess, onToast }: EnrollmentFormProps) {
  const [studentName, setStudentName] = useState('');
  const [parentNumber, setParentNumber] = useState('');
  const [interestedCourse, setInterestedCourse] = useState('IIT-JEE Elite Achievers Course');
  const [isLoading, setIsLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState<any | null>(null);
  const [customWebhookUrl, setCustomWebhookUrl] = useState('');

  useEffect(() => {
    // Load custom webhook URL from localStorage if any
    const savedUrl = localStorage.getItem('vanguard_custom_webhook');
    if (savedUrl) {
      setCustomWebhookUrl(savedUrl);
    }
  }, []);

  const coursesList = [
    'IIT-JEE Elite Achievers Course',
    'NEET Medical Premier Batch',
    'Olympiads & Foundation Track',
    'Ultimate Droppers Grid'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentName.trim()) {
      onToast('Please enter the student\'s name.');
      return;
    }
    if (!parentNumber.trim()) {
      onToast('Please enter parents WhatsApp contact number.');
      return;
    }

    setIsLoading(true);
    setSubmitResult(null);

    try {
      const response = await fetch('/api/enroll-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName,
          parentNumber,
          interestedCourse,
          source: 'Admissions Panel Form',
          customWebhookUrl
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enrollment request');
      }

      const data = await response.json();
      setSubmitResult(data);
      onToast('Registered successfully! n8n webhooks triggered.');

      // Notify parent app of new enrollment success
      onSuccess({
        id: Math.random().toString(36).substring(2, 9),
        studentName,
        parentNumber,
        interestedCourse,
        timestamp: new Date().toLocaleString(),
        status: 'success'
      });

      // Clear form on success
      setStudentName('');
      setParentNumber('');
      
    } catch (err: any) {
      console.error(err);
      onToast('Webhook delivery issues. Local enrollment synced.');
      onSuccess({
        id: Math.random().toString(36).substring(2, 9),
        studentName,
        parentNumber,
        interestedCourse,
        timestamp: new Date().toLocaleString(),
        status: 'failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full relative z-10 bg-[#0f1926]/90 border border-slate-800 rounded-lg p-5 font-sans select-none text-left">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/60">
        <div>
          <h3 className="text-base lg:text-lg font-black text-slate-100 tracking-tight">
            Direct Enrollment Desk
          </h3>
          <p className="text-[10px] text-slate-400 mt-0.5 font-mono font-bold tracking-widest uppercase">
            SECURE ADMISSION • AUTOMATED COMMAND
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded text-[10px] font-mono font-bold shrink-0">
          <Cpu className="w-3.5 h-3.5 animate-spin-slow" /> n8n Linked
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-4 leading-relaxed">
        Submitting instantly triggers a dual-webhook mapping to n8n workflow for <strong className="text-cyan-400">Instant WhatsApp routing</strong> and <strong className="text-emerald-400">Google Sheet roster sync</strong>.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Student Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Priyanshu Bishnoi"
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 pl-9 pr-3 py-2.5 rounded text-xs font-semibold text-slate-100 transition-all outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Parent Contact (WhatsApp Number)
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="tel"
              value={parentNumber}
              onChange={(e) => setParentNumber(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 pl-9 pr-3 py-2.5 rounded text-xs font-semibold text-slate-100 transition-all outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Interested Course / Stream
          </label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <select
              value={interestedCourse}
              onChange={(e) => setInterestedCourse(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 pl-9 pr-8 py-2.5 rounded text-xs font-semibold text-slate-100 transition-all outline-none appearance-none cursor-pointer"
            >
              {coursesList.map((course, idx) => (
                <option key={idx} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l border-slate-805 pl-2">
              <BookOpen className="w-3 h-3 text-slate-500" />
            </div>
          </div>
        </div>

        {customWebhookUrl ? (
          <div className="bg-emerald-500/5 border border-emerald-500/15 p-2.5 rounded flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0 animate-pulse" />
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-mono font-bold text-emerald-400 tracking-wider">
                ACTIVE CUSTOM ENDPOINT
              </p>
              <p className="text-[10px] text-slate-400 truncate mt-0.5 max-w-full">
                {customWebhookUrl}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-amber-500/5 border border-amber-500/15 p-2.5 rounded flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0 animate-pulse" />
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-mono font-bold text-amber-400 tracking-wider">
                LOCAL SIMULATED ENDPOINT
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                No custom n8n webhook saved yet. We will log the payload locally. Customize in **Developers &gt; Webhooks**.
              </p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-500 hover:bg-cyan-600 active:scale-98 text-slate-950 text-xs font-black rounded transition-all cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.15)]"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>TRANSMITTING ADMISSION DATA...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" /> RUN ADMISSION FLOW
            </>
          )}
        </button>
      </form>

      <AnimatePresence>
        {submitResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-3 bg-slate-950/80 border border-slate-800 rounded space-y-2 overflow-hidden"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> WEBHOOK_OUTPUT_STREAM
            </div>
            <div className="text-[10px] font-mono whitespace-pre-wrap text-slate-300 leading-relaxed max-h-36 overflow-y-auto">
              {JSON.stringify(submitResult, null, 2)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
