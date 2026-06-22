import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  LogOut,
  Hash,
  ChevronDown,
  ChevronRight,
  Inbox,
  Calendar as CalendarIcon,
  Activity,
  CreditCard,
  Globe,
  Terminal,
  Blocks,
  PanelLeftClose,
  PanelLeftOpen,
  Command,
  X,
  Sparkles,
  Download,
  Phone,
  Send,
  Cpu,
  Bookmark,
  Bell,
  Sliders,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  MapPin,
  Clock,
  BookOpen,
  Award,
  ChevronLeft,
  Calendar
} from 'lucide-react';

// Custom component imports
import StatsBar from './components/StatsBar';
import BentoFeatures from './components/BentoFeatures';
import CourseCatalog from './components/CourseCatalog';
import EnrollmentForm from './components/EnrollmentForm';
import AICounselor from './components/AICounselor';
import { StudentEnrollment, WebhookConfig } from './types';
import { SidebarNav } from './components/ui/dashboard-sidebar';

// Toast Notification Type
interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

export default function App() {
  // Sidebar states
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeId, setActiveId] = useState('home');
  const [activeWorkspace, setActiveWorkspace] = useState('Vanguard Academy');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // AI Counselor chat open state
  const [isAICounselorOpen, setIsAICounselorOpen] = useState(false);

  // Webhook and Enrollment data states
  const [enrollments, setEnrollments] = useState<StudentEnrollment[]>([
    {
      id: 'e1',
      studentName: 'Amit Bishnoi',
      parentNumber: '+91 94145 22002',
      interestedCourse: 'IIT-JEE Elite Achievers Course',
      timestamp: '2026-06-21 14:32:10',
      status: 'success'
    },
    {
      id: 'e2',
      studentName: 'Sneha Sharma',
      parentNumber: '+91 98290 12345',
      interestedCourse: 'NEET Medical Premier Batch',
      timestamp: '2026-06-22 09:15:43',
      status: 'success'
    },
  ]);

  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookHistory, setWebhookHistory] = useState<any[]>([]);

  // Toast State
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Finance Calculator state
  const [boardPercentage, setBoardPercentage] = useState(85);
  const [selectedFeeCourse, setSelectedFeeCourse] = useState('IIT-JEE Elite Achievers Course');

  // Load configuration from local storage
  useEffect(() => {
    const savedUrl = localStorage.getItem('vanguard_custom_webhook');
    if (savedUrl) {
      setWebhookUrl(savedUrl);
    }
    
    const savedHistory = localStorage.getItem('vanguard_webhook_history');
    if (savedHistory) {
      try {
        setWebhookHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const triggerToast = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const handleNonfunctionalClick = (actionName: string) => {
    triggerToast(`System setup by Deepak Bishnoi. "${actionName}" mock simulation active.`, 'warning');
  };

  // Safe manual prospect download & webhook trigger
  const handleProspectusDownload = async (courseName: string) => {
    triggerToast(`Building customized prospectus PDF for ${courseName}...`, 'info');
    
    try {
      const response = await fetch('/api/enroll-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentName: 'Anonymous Prospectus Downloader',
          parentNumber: 'Inquiry',
          interestedCourse: courseName,
          source: 'Prospectus Download CTA',
          customWebhookUrl: webhookUrl
        })
      });

      if (response.ok) {
        const resData = await response.json();
        // Log to webhook history
        const logItem = {
          id: Math.random().toString(36).substring(2, 9),
          timestamp: new Date().toLocaleString(),
          event: `PDF Prospectus Download - ${courseName}`,
          payload: resData.receivedData,
          apiResponse: resData.automationMapping,
          success: true
        };
        const updatedHistory = [logItem, ...webhookHistory].slice(0, 50);
        setWebhookHistory(updatedHistory);
        localStorage.setItem('vanguard_webhook_history', JSON.stringify(updatedHistory));

        triggerToast(`Success! Prospectus n8n WhatsApp flow scheduled & simulated.`, 'success');
        
        // Open PDF mockup in new window (simulated)
        const dummyPdfContent = `Vanguard Academy - ${courseName} Prospectus\n\n- 17+ Years of Academic Superiority\n- Top Rankers trained under stellar PhD/IITian Faculty\n- Robust CBT simulated material\n- Individual Doubt mentors\n\nRegister via our enrollment table for fee discounts.`;
        const blob = new Blob([dummyPdfContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${courseName.toLowerCase().replace(/\s+/g, '_')}_prospectus.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        throw new Error('Prospectus webhook delivery failed');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Local prospectus saved. Webhook delivery issues.', 'info');
    }
  };

  // Add new enrollment
  const handleEnrollmentSuccess = (newEnrollment: StudentEnrollment) => {
    setEnrollments(prev => [newEnrollment, ...prev]);
    
    // Add items to webhook logs
    const logItem = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleString(),
      event: `Student Admissions Webhook - ${newEnrollment.studentName}`,
      payload: {
        studentName: newEnrollment.studentName,
        parentNumber: newEnrollment.parentNumber,
        interestedCourse: newEnrollment.interestedCourse
      },
      apiResponse: {
        sheetsStatus: "Roster appended successfully",
        whatsappStatus: "Instant welcome notification dispatched via n8n"
      },
      success: newEnrollment.status === 'success'
    };
    const updatedHistory = [logItem, ...webhookHistory].slice(0, 50);
    setWebhookHistory(updatedHistory);
    localStorage.setItem('vanguard_webhook_history', JSON.stringify(updatedHistory));
  };

  // Save n8n Webhook URL
  const saveWebhookUrl = (url: string) => {
    setWebhookUrl(url);
    localStorage.setItem('vanguard_custom_webhook', url);
    triggerToast('n8n Webhook Endpoint configured and active!', 'success');
  };

  const clearWebhookLogs = () => {
    setWebhookHistory([]);
    localStorage.removeItem('vanguard_webhook_history');
    triggerToast('Webhook transaction logs cleared.', 'info');
  };

  // Calculate scholarship dynamic prices
  const calculateFees = () => {
    let basePrice = 120000; // standard 1 year fee
    if (selectedFeeCourse === 'Olympiads & Foundation Track') basePrice = 65000;
    if (selectedFeeCourse === 'Ultimate Droppers Grid') basePrice = 95000;
    
    // Scholarships based on board percentage
    let discount = 0;
    if (boardPercentage >= 95) discount = 50; // 50% discount
    else if (boardPercentage >= 90) discount = 30; // 30% discount
    else if (boardPercentage >= 80) discount = 15; // 15% discount
    else if (boardPercentage >= 70) discount = 5;

    const discountAmount = (basePrice * discount) / 100;
    const finalFee = basePrice - discountAmount;

    return {
      basePrice,
      discount,
      discountAmount,
      finalFee
    };
  };

  // Filter list of searches
  const handleSearchShortcut = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsSearchOpen(prev => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleSearchShortcut);
    return () => window.removeEventListener('keydown', handleSearchShortcut);
  }, []);

  const handleSelectTab = (id: string) => {
    if (id === 'search') {
      setIsSearchOpen(true);
      return;
    }
    setActiveId(id);
  };

  // Simple clean mock calendar dates
  const calendarItems = [
    { date: 23, title: 'JEE Advanced Full Syllabus Mock 1', type: 'mock', time: '09:00 - 12:00' },
    { date: 24, title: '1-on-1 Parent Mentor Sync Slot', type: 'mentorship', time: '16:00 - 18:00' },
    { date: 26, title: 'NEET Speed-Drill & Botany Assessment', type: 'mock', time: '14:00 - 17:00' },
    { date: 28, title: 'NTSE Stage-1 Mental Ability Prep Seminar', type: 'seminar', time: '10:00 - 12:30' },
    { date: 30, title: 'Organic Chemistry Weekly Remedy Clinic', type: 'clinic', time: '15:00 - 16:30' }
  ];

  return (
    <div className="flex h-screen bg-[#060b13] overflow-hidden text-slate-200 font-sans antialiased selection:bg-cyan-500/20 selection:text-white">
      
      {/* Toast Overlay */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] flex flex-col gap-2 w-full max-w-sm pointer-events-none px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-3 rounded border pointer-events-auto shadow-2xl flex items-center gap-3 w-full border-slate-850
                ${toast.type === 'success' 
                  ? 'bg-[#0f241a] text-emerald-400 border-emerald-500/25' 
                  : toast.type === 'warning'
                  ? 'bg-[#241a0f] text-amber-400 border-amber-500/25'
                  : 'bg-[#081525] text-cyan-400 border-cyan-500/25'
                }`}
            >
              <div className="flex-1 text-xs font-semibold">
                {toast.message}
              </div>
              <button
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="p-0.5 rounded hover:bg-white/10 text-current transition-colors text-xs cursor-pointer"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Primary Sidebar Layout */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="h-full shrink-0 border-r border-slate-800 bg-[#08101a] flex flex-col z-40 overflow-hidden"
          >
            <SidebarNav
              className="w-[260px] border-none bg-transparent"
              activeId={activeId}
              onSelect={handleSelectTab}
              activeWorkspace={activeWorkspace}
              onWorkspaceSelect={setActiveWorkspace}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        
        {/* Top Header Bar */}
        <header className="h-12 border-b border-slate-800 bg-[#08101a] flex items-center px-4 justify-between z-30 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 px-1.5 rounded border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Toggle Sidebar"
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-3.5 h-3.5" strokeWidth={2} />
              ) : (
                <PanelLeftOpen className="w-3.5 h-3.5" strokeWidth={2} />
              )}
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono font-bold uppercase tracking-wider">
              <span className="truncate">{activeWorkspace}</span>
              <span className="text-slate-700">/</span>
              <span className="text-cyan-400 truncate">
                {activeId === 'home' ? 'Admissions Board' : activeId}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick search button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="items-center gap-2 px-2.5 py-1 rounded border border-slate-800 bg-slate-950 hover:bg-slate-900 text-[11px] text-slate-400 font-semibold cursor-pointer hidden md:flex transition-all"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Search hub...</span>
              <kbd className="text-[9px] bg-[#12223c] border border-cyan-500/20 text-cyan-400 px-1 py-0.2 rounded font-mono">⌘K</kbd>
            </button>

            {/* Quick Notification Bell */}
            <div className="relative">
              <button
                onClick={() => handleSelectTab('inbox')}
                className="p-1.5 rounded border border-slate-800 bg-slate-950 text-slate-400 hover:text-white transition-colors cursor-pointer relative"
              >
                <Bell className="w-3.5 h-3.5" strokeWidth={2} />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </button>
            </div>

            {/* User Badge */}
            <div 
              onClick={() => handleSelectTab('settings')}
              className="flex items-center gap-2 px-2 py-1 rounded border border-slate-800 bg-slate-950 hover:bg-slate-900 cursor-pointer transition-colors"
            >
              <span className="text-xs font-mono font-bold text-slate-400 hidden sm:inline">Deepak Bishnoi</span>
              <div className="w-5.5 h-5.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-extrabold text-[10px] shadow-sm">
                DB
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Inner Container Pages */}
        <main className="flex-1 overflow-y-auto w-full relative bg-[#060b13] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: HOME (Elite Landing Page) */}
            {activeId === 'home' && (
              <motion.div
                key="home-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-12 pb-16 px-4 md:px-8 xl:px-12 pt-8 w-full max-w-7xl mx-auto"
              >
                {/* 1. Hero banner section with sleek entrance */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#0b1625] rounded border border-slate-800 p-6 md:p-10 text-slate-200 shadow-2xl relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                >
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="lg:col-span-8 space-y-4 relative z-10 text-left">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-500/20 rounded text-[10px] font-mono font-bold tracking-widest uppercase">
                      <Sparkles className="w-3 h-3 text-cyan-400" /> SYSTEM ADMISSIONS ONLINE
                    </div>
                    
                    <h1 className="text-2xl md:text-4xl xl:text-5xl font-black tracking-tight leading-tight text-white font-sans">
                      Vanguard Academy<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-450 to-blue-400">
                        Where Excellence Meets Ambition
                      </span>
                    </h1>
                    
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-2xl font-medium">
                      Specialized coaching for <strong className="text-cyan-400 font-bold">IIT-JEE (Mains &amp; Advanced)</strong>, <strong className="text-cyan-400 font-bold">NEET Medical</strong>, and <strong className="text-cyan-400 font-bold">Olympiads / NTSE Foundation</strong> streams. Empowering students for over 17 years.
                    </p>
                    
                    <div className="flex flex-wrap gap-3 pt-1">
                      <a
                        href="#enroll-form"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById('enroll-form')?.scrollIntoView({ behavior: 'smooth' });
                          triggerToast('Scrolling down to Direct Enrollment Form...', 'info');
                        }}
                        className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 text-xs font-bold rounded cursor-pointer flex items-center gap-1.5 transition-colors"
                      >
                        Enroll Now
                      </a>
                      <button
                        onClick={() => {
                          setIsAICounselorOpen(true);
                          triggerToast('AI Admissions Advisor initialized! Ask me questions below.', 'info');
                        }}
                        className="px-4 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded cursor-pointer flex items-center gap-1.5 transition-colors"
                      >
                        Talk to AI Assistant
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-4 relative flex justify-center">
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded w-full max-w-[270px] space-y-3 shadow-xl relative z-10">
                      <h4 className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">NEXT CBT MOCK EXAM</h4>
                      <div className="p-2.5 bg-cyan-950/25 border border-cyan-500/20 rounded">
                        <p className="text-xs font-bold text-cyan-400 font-mono">National Rank Booster (AIR-1)</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">PHYSICS_ELECTROSTATICS</p>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2 leading-none">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" /> Scheduled: T-24H_DISPATCH
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 2. Sleek 4-Column Stats Bar */}
                <StatsBar />

                {/* 3. Bento Features Grid */}
                <div>
                  <div className="mb-6 text-center lg:text-left">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                      Vanguard Academic Pillars
                    </h2>
                    <p className="text-sm text-slate-400 font-semibold mt-1">
                      THE FOUR FUNDAMENTALS THAT DRIVE ACADEMIC GLORY
                    </p>
                  </div>
                  <BentoFeatures />
                </div>

                {/* 4. Course Catalog */}
                <div>
                  <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="text-left">
                      <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                        Our Course Offerings
                      </h2>
                      <p className="text-sm text-slate-400 font-semibold mt-1">
                        TAILORED CURRICULUM BUILT BY ELITE NATION-WIDE FACULTIES
                      </p>
                    </div>
                  </div>
                  <CourseCatalog onProspectusClick={handleProspectusDownload} onToast={triggerToast} />
                </div>

                {/* 5. Direct Enrollment Form */}
                <div id="enroll-form" className="scroll-mt-18">
                  <div className="mb-6 text-left">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                      Enrollment &amp; Roster Sync Desk
                    </h2>
                    <p className="text-sm text-slate-400 font-semibold mt-1">
                      INSTANT PROCESSING MAPPED TO N8N BACKENDS
                    </p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8">
                      <EnrollmentForm onSuccess={handleEnrollmentSuccess} onToast={triggerToast} />
                    </div>
                    
                    <div className="lg:col-span-4 bg-[#0b1625] border border-slate-800 rounded p-5 text-slate-400 text-xs space-y-5 shadow-xl">
                      <h4 className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">Automation Telemetry</h4>
                      
                      <div className="space-y-3.5">
                        <div className="flex items-start gap-2.5">
                          <div className="w-7 h-7 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center justify-center shrink-0">
                            <CheckCircle className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="font-bold text-xs text-slate-200">WhatsApp Welcome Trigger</p>
                            <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Dispatches instant message to parent number containing course keys and counselor schedule.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-7 h-7 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 flex items-center justify-center shrink-0">
                            <Cpu className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="font-bold text-xs text-slate-200">Google Sheets roster Sync</p>
                            <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Appends name, phone, chosen core &amp; registration index in real-time for faculty review.</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3.5 border-t border-slate-800">
                        <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">
                          Recent Submissions
                        </p>
                        <div className="space-y-1.5 mt-2.5">
                          {enrollments.slice(0, 3).map((item, idx) => (
                            <div key={item.id || idx} className="p-2 bg-slate-950 border border-slate-850 rounded text-[11px] flex justify-between items-center">
                              <div>
                                <span className="font-bold text-slate-300 block leading-tight">{item.studentName}</span>
                                <span className="text-[9px] text-slate-500 font-mono mt-0.5 block leading-none">{item.interestedCourse.split(' ')[0]} ...</span>
                              </div>
                              <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded">
                                OK
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: INBOX */}
            {activeId === 'inbox' && (
              <motion.div
                key="inbox-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 md:p-6 w-full max-w-4xl mx-auto space-y-5 text-left"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-100 font-sans uppercase tracking-tight">Admissions &amp; Ranker Inbox</h2>
                  <p className="text-[10px] text-slate-500 font-mono font-bold tracking-wider mt-0.5 uppercase">SYSTEM COMMUNICATIONS &amp; DISPATCH QUEUES</p>
                </div>

                <div className="space-y-3.5">
                  {/* Custom Welcome Message relative to newly registered names! */}
                  {enrollments.length > 2 && (
                    <motion.div
                      initial={{ scale: 0.98, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-[#0b1c30] border border-cyan-500/20 rounded p-4 relative overflow-hidden"
                    >
                      <span className="absolute top-3 right-3 bg-cyan-900/30 text-cyan-400 border border-cyan-500/25 text-[8px] font-mono font-bold px-1.5 py-0.2 rounded uppercase tracking-wider">Admissions Actioned</span>
                      <h3 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                        🌟 Welcome, {enrollments[0].studentName}! Academic onboarding scheduled.
                      </h3>
                      <p className="text-[10px] text-slate-400 font-mono mt-1">Recipient Number: {enrollments[0].parentNumber} | Registered Path: {enrollments[0].interestedCourse}</p>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        We have successfully dispatched your payload to the configured webhook endpoint. Parent welcome packets and calendar invitations are locked. Academic clinics begin next Monday!
                      </p>
                    </motion.div>
                  )}

                  <div className="bg-[#0b1625] border border-slate-800 rounded p-4.5 flex flex-col md:flex-row gap-3.5 items-start relative group">
                    <div className="p-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap justify-between">
                        <span className="text-xs font-bold text-slate-200">National Scholarship Exam (V-NET) Guidelines</span>
                        <span className="text-[8px] font-mono bg-red-500/15 text-red-400 border border-red-500/25 px-1.5 py-0.2 rounded uppercase tracking-widest">CRITICAL</span>
                      </div>
                      <p className="text-[9px] text-slate-500 font-mono leading-none">Date Dispatched: June 22, 2026</p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        The Vanguard National Eligibility Test (V-NET) results are finalized. Over 450 students registered via direct desks qualified for fee waivers of up to 50%. Check the fees calculator on the **Finance** tab to test your own score bracket discount.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#0b1625] border border-slate-800 rounded p-4.5 flex flex-col md:flex-row gap-3.5 items-start relative group">
                    <div className="p-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded shrink-0">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap justify-between">
                        <span className="text-xs font-bold text-slate-200">Dual WhatsApp &amp; Sheets Webhook Deployments Active</span>
                        <span className="text-[8px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-1.5 py-0.2 rounded uppercase tracking-widest">SYSTEM OK</span>
                      </div>
                      <p className="text-[9px] text-slate-500 font-mono leading-none">Date Dispatched: June 20, 2026</p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Both enrollment forms and prospectus downloads are hard-mapped to trigger automated CRM webhooks. Go to **Developers &gt; Webhooks** to test custom webhook integrations that hook directly into your own dashboard instance.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 3: ANALYTICS */}
            {activeId === 'analytics' && (
              <motion.div
                key="analytics-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 md:p-6 w-full max-w-4xl mx-auto space-y-5 text-left"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-100 uppercase tracking-tight">Performance Analytics</h2>
                  <p className="text-[10px] text-slate-500 font-mono font-bold tracking-wider mt-0.5 uppercase">MONITOR STUDENT PROGRESS AND MOCK EXAM OUTCOME METRICS</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#0b1625] border border-slate-800 p-4 rounded space-y-1.5 shadow-xl">
                    <span className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider block">Average JEE Score Boost</span>
                    <h3 className="text-2xl font-black text-emerald-450 font-mono flex items-center gap-1.5">
                      +145 <span className="text-[10px] font-bold text-slate-500 select-none font-sans uppercase">Mains Scale</span>
                    </h3>
                    <p className="text-[10px] text-slate-400 leading-normal">Based on trailing computer-based tests comparison between Module 1 &amp; Module 5.</p>
                  </div>

                  <div className="bg-[#0b1625] border border-slate-800 p-4 rounded space-y-1.5 shadow-xl">
                    <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider block">NEET Accuracy Trend</span>
                    <h3 className="text-2xl font-black text-cyan-400 font-mono flex items-center gap-1.5">
                      92.4% <span className="text-[10px] font-bold text-slate-500 select-none font-sans uppercase">Avg Biology</span>
                    </h3>
                    <p className="text-[10px] text-slate-400 leading-normal">High accuracy achieved using targeted botany and biological classification NCERT drills.</p>
                  </div>

                  <div className="bg-[#0b1625] border border-slate-800 p-4 rounded space-y-1.5 shadow-xl">
                    <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Success Ratio</span>
                    <h3 className="text-2xl font-black text-cyan-400 font-mono">
                      84.1%
                    </h3>
                    <p className="text-[10px] text-slate-400 leading-normal font-sans">Over 84% of dropper cohort achieved substantial rank improvements in JEE/NEET exams.</p>
                  </div>
                </div>

                {/* Sub-functional button warning */}
                <div className="bg-[#0b1625] border border-slate-800 p-5 rounded space-y-2.5">
                  <h4 className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Interactive Statistical Planner</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Compare historical performance metrics across different student streams, years, and centers. Modify parameter weights below.
                  </p>
                  
                  <div className="flex gap-2.5 pt-1">
                    <button
                      onClick={() => handleNonfunctionalClick('Export CSV Report')}
                      className="px-3.5 py-2 text-xs font-bold bg-[#12223c] text-cyan-400 border border-cyan-500/20 rounded hover:bg-[#12223c]/80 cursor-pointer"
                    >
                      Export CSV Report
                    </button>
                    <button
                      onClick={() => handleNonfunctionalClick('Sync Raw API Scores')}
                      className="px-3.5 py-2 text-xs font-bold bg-slate-950 border border-slate-800 text-slate-400 rounded cursor-pointer"
                    >
                      Sync Raw API Scores
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 4: CALENDAR */}
            {activeId === 'calendar' && (
              <motion.div
                key="calendar-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 md:p-6 w-full max-w-4xl mx-auto space-y-5 text-left"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-100 uppercase tracking-tight">Academic Calendar</h2>
                  <p className="text-[10px] text-slate-500 font-mono font-bold tracking-wider mt-0.5 uppercase">UPCOMING ASSESSMENTS, MOCK EXAMS AND DOUBT SYNCS</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Interactive mock grid */}
                  <div className="lg:col-span-2 bg-[#0b1625] border border-slate-800 p-5 rounded shadow-xl">
                    <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-slate-850 text-xs font-bold text-slate-350">
                      <span className="font-mono">JUNE 2026</span>
                      <div className="flex gap-1">
                        <button onClick={() => triggerToast('Previous Month active', 'info')} className="p-1 border border-slate-800 rounded bg-slate-950 text-slate-400 hover:text-white cursor-pointer select-none leading-none">◀</button>
                        <button onClick={() => triggerToast('Next Month active', 'info')} className="p-1 border border-slate-800 rounded bg-slate-950 text-slate-400 hover:text-white cursor-pointer select-none leading-none">▶</button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-500 border-b border-slate-850 pb-2 mb-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i} className="py-1 text-slate-500 font-mono">{d}</div>)}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono">
                      {/* Blank days */}
                      {Array.from({ length: 1 }).map((_, i) => <div key={`empty-${i}`} />)}
                      {/* Days in June */}
                      {Array.from({ length: 30 }).map((_, i) => {
                        const day = i + 1;
                        const hasEvent = calendarItems.some(item => item.date === day);
                        return (
                          <div
                            key={day}
                            onClick={() => {
                              if (hasEvent) {
                                const ev = calendarItems.find(item => item.date === day);
                                if (ev) triggerToast(`${ev.title} [${ev.time}]`, 'success');
                              } else {
                                handleNonfunctionalClick(`Schedule Custom Slot Class for June ${day}`);
                              }
                            }}
                            className={`py-1.5 rounded cursor-pointer font-bold relative transition-all flex flex-col items-center justify-center h-8 w-8 mx-auto
                              ${day === 22 
                                ? 'bg-cyan-500 text-slate-950 font-black shadow-md' 
                                : hasEvent 
                                ? 'border border-cyan-500/20 bg-cyan-500/10 text-cyan-400' 
                                : 'hover:bg-slate-900 border border-transparent text-slate-400 hover:text-slate-200'
                              }`}
                          >
                            <span>{day}</span>
                            {hasEvent && <span className="absolute bottom-0.5 w-1 h-1 bg-cyan-400 rounded-full" />}
                            {day === 22 && <span className="absolute -top-1 -right-1 bg-cyan-400 text-slate-950 px-1 py-0.2 rounded text-[6px] font-mono leading-none uppercase">now</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-[#0b1625] border border-slate-800 p-5 rounded space-y-3 shadow-xl">
                    <h3 className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">TIMETABLE HIGHLIGHTS</h3>
                    
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden">
                      {calendarItems.map((item, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-950 border border-slate-850 rounded space-y-1 hover:border-cyan-500/25 transition-colors">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[8px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-1 py-0.2 rounded">
                              JUN {item.date}
                            </span>
                            <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                              {item.type}
                            </span>
                          </div>
                          <p className="text-[11px] font-bold text-slate-200 leading-snug">{item.title}</p>
                          <p className="text-[9px] text-slate-500 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-600" /> {item.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 5: PROJECTS (Active Batches) */}
            {(activeId === 'projects' || activeId === 'p-active' || activeId === 'p-archived') && (
              <motion.div
                key="projects-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 md:p-6 w-full max-w-4xl mx-auto space-y-5 text-left"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-100 uppercase tracking-tight">Active Classroom Batches</h2>
                  <p className="text-[10px] text-slate-500 font-mono font-bold tracking-wider mt-0.5 uppercase">CURRICULA SCHEDULING, SYLLABUS INDEX AND WORK SHEETS</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Topic Card */}
                  <div className="bg-[#0b1625] border border-slate-800 p-5 rounded space-y-3 shadow-xl">
                    <span className="inline-block text-[9px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded uppercase">IIT-JEE Physics Core</span>
                    <h3 className="text-sm font-bold text-slate-150 mt-1">Electrostatics &amp; Gauss Law (Elite Class XI-XII)</h3>
                    <p className="text-[10px] font-mono text-slate-500">Instructors: IIT Delhi Grad Faculty Panel</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Detailed formulas, electric potential calculations, field vectors under irregular bodies, and core PYQs mappings relative to JEE last decade databases.
                    </p>
                    <div className="pt-1.5 flex gap-2">
                      <button onClick={() => triggerToast('Physics sheet downloaded', 'success')} className="px-3 py-1.5 text-[10px] font-bold bg-[#12223c] text-cyan-400 border border-cyan-500/20 rounded hover:bg-[#12223c]/80 flex items-center gap-1 cursor-pointer">
                        <Download className="w-3 h-3" /> Handouts PDF
                      </button>
                      <button onClick={() => handleNonfunctionalClick('Launch JEE Interactive Board')} className="px-3 py-1.5 text-[10px] font-bold bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 rounded cursor-pointer">
                        Sync Video
                      </button>
                    </div>
                  </div>

                  {/* Chemistry Card */}
                  <div className="bg-[#0b1625] border border-slate-800 p-5 rounded space-y-3 shadow-xl">
                    <span className="inline-block text-[9px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded uppercase font-bold">NEET Biology Core</span>
                    <h3 className="text-sm font-bold text-slate-150 mt-1">Syllabus: Animal Kingdom &amp; Genetics Mapping</h3>
                    <p className="text-[10px] font-mono text-slate-500">Instructors: MD &amp; AIIMS Alumni Faculty Panel</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Detailed taxonomic classifications, NCERT core conceptual summaries, mock exam biological classifications, and mental mapping diagrams.
                    </p>
                    <div className="pt-1.5 flex gap-2">
                      <button onClick={() => triggerToast('Biology booklet downloaded', 'success')} className="px-3 py-1.5 text-[10px] font-bold bg-[#12223c] text-cyan-400 border border-cyan-500/20 rounded hover:bg-[#12223c]/80 flex items-center gap-1 cursor-pointer">
                        <Download className="w-3 h-3" /> Booklets PDF
                      </button>
                      <button onClick={() => handleNonfunctionalClick('Launch Biology 3D Lab')} className="px-3 py-1.5 text-[10px] font-bold bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 rounded cursor-pointer">
                        3D Virtual Atlas
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 6: TEAM */}
            {(activeId === 'team' || activeId === 't-design' || activeId === 't-eng' || activeId === 't-product') && (
              <motion.div
                key="team-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 md:p-6 w-full max-w-4xl mx-auto space-y-5 text-left"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-100 uppercase tracking-tight">Our Faculty Team</h2>
                  <p className="text-[10px] text-slate-500 font-mono font-bold tracking-wider mt-0.5 uppercase">MEET THE TEACHERS WHO TRAIN THE NATIONAL TOPPERS</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Faculty member 1 */}
                  <div className="bg-[#0b1625] border border-slate-800 p-5 rounded text-center space-y-3 shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=260&auto=format&fit=crop" 
                      alt="Physics HOD" 
                      className="w-16 h-16 rounded object-cover mx-auto border border-cyan-500/20 shadow-md referrer-policy='no-referrer'" 
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-100 leading-tight">Dr. Shreya Bishnoi</h3>
                      <p className="text-[9px] text-cyan-400 font-mono font-bold uppercase mt-1 tracking-widest">PHYSICS HEAD (Ph.D., IIT-B)</p>
                    </div>
                    <p className="text-xs text-slate-400">12+ years teaching JEE Mains/Advanced prep. Former researcher with 30+ publications.</p>
                    <button 
                      onClick={() => handleNonfunctionalClick('Book session with Dr. Shreya')} 
                      className="text-[10px] px-2.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 rounded cursor-pointer font-semibold leading-none"
                    >
                      Inquire Mentorship
                    </button>
                  </div>

                  {/* Faculty member 2 */}
                  <div className="bg-[#0b1625] border border-slate-800 p-5 rounded text-center space-y-3 shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=260&auto=format&fit=crop" 
                      alt="Organic Chem HOD" 
                      className="w-16 h-16 rounded object-cover mx-auto border border-cyan-500/20 shadow-md referrer-policy='no-referrer'" 
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-100 leading-tight">Prof. Rahul Verma</h3>
                      <p className="text-[9px] text-cyan-400 font-mono font-bold uppercase mt-1 tracking-widest">ORGANIC CHEMISTRY (IIT KGP)</p>
                    </div>
                    <p className="text-xs text-slate-400">15+ years training national double-digit ranks. Author of master chemistry guides.</p>
                    <button 
                      onClick={() => handleNonfunctionalClick('Book session with Prof. Rahul')} 
                      className="text-[10px] px-2.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 rounded cursor-pointer font-semibold leading-none"
                    >
                      Inquire Mentorship
                    </button>
                  </div>

                  {/* Faculty member 3 */}
                  <div className="bg-[#0b1625] border border-slate-800 p-5 rounded text-center space-y-3 shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=260&auto=format&fit=crop" 
                      alt="Biology HOD" 
                      className="w-16 h-16 rounded object-cover mx-auto border border-cyan-500/20 shadow-md referrer-policy='no-referrer'" 
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-100 leading-tight">Dr. Ananya Iyer</h3>
                      <p className="text-[9px] text-cyan-400 font-mono font-bold uppercase mt-1 tracking-widest">BIOLOGY HEAD (AIIMS)</p>
                    </div>
                    <p className="text-xs text-slate-400">Expert in botanical classification and human anatomy diagnostics. 8+ years NEET coaching.</p>
                    <button 
                      onClick={() => handleNonfunctionalClick('Book session with Dr. Ananya')} 
                      className="text-[10px] px-2.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 rounded cursor-pointer font-semibold leading-none"
                    >
                      Inquire Mentorship
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 7: CUSTOMERS / STUDENTS */}
            {(activeId === 'customers' || activeId === 'c-enterprise' || activeId === 'c-smb') && (
              <motion.div
                key="customers-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 md:p-6 w-full max-w-4xl mx-auto space-y-5 text-left"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-100 uppercase tracking-tight">Active Student Directories</h2>
                  <p className="text-[10px] text-slate-500 font-mono font-bold tracking-wider mt-0.5 uppercase">MANAGE ACTIVE ENROLLMENTS AND REGISTERED PARENT DESKS</p>
                </div>

                <div className="bg-[#0b1625] border border-slate-800 rounded overflow-hidden shadow-xl">
                  <div className="p-3 border-b border-slate-850 font-mono font-bold bg-[#060b13] flex justify-between items-center text-[9px] text-slate-500 tracking-wider">
                    <span>STUDENT NAME &amp; COURSE</span>
                    <span>CONTACT &amp; ENROLL DATE</span>
                  </div>
                  <div className="divide-y divide-slate-850">
                    {enrollments.map((student, idx) => (
                      <div key={student.id || idx} className="p-3.5 flex justify-between items-center text-xs">
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-slate-200">{student.studentName}</h4>
                          <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded inline-block uppercase">
                            {student.interestedCourse}
                          </span>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-[11px] font-mono font-bold text-slate-400">{student.parentNumber}</p>
                          <p className="text-[9px] font-mono text-slate-500">{student.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 8: FINANCE SCHOLARSHIPS */}
            {activeId === 'finance' && (
              <motion.div
                key="finance-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 md:p-6 w-full max-w-4xl mx-auto space-y-5 text-left"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-100 uppercase tracking-tight">Fee Structure &amp; scholarship calculator</h2>
                  <p className="text-[10px] text-slate-500 font-mono font-bold tracking-wider mt-0.5 uppercase">ELEGANT DISCOUNTS INTEGRATED WITH STUDENT SCORE BRACKETS</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  
                  {/* Calculator Form */}
                  <div className="bg-[#0b1625] border border-slate-800 p-5 rounded space-y-4 shadow-xl">
                    <h3 className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider pb-2 border-b border-slate-850">
                      CALCULATE YOUR TIERS
                    </h3>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                        CHOOSE DESIRED STREAM BATCH
                      </label>
                      <select
                        value={selectedFeeCourse}
                        onChange={(e) => setSelectedFeeCourse(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 px-3 py-2 rounded text-xs font-mono outline-none text-slate-300"
                      >
                        <option value="IIT-JEE Elite Achievers Course">IIT-JEE Elite Achievers Course</option>
                        <option value="NEET Medical Premier Batch">NEET Medical Premier Batch</option>
                        <option value="Olympiads & Foundation Track font-sans">Olympiads &amp; Foundation Track</option>
                        <option value="Ultimate Droppers Grid">Ultimate Droppers Grid</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[9px] font-mono font-bold text-slate-500 uppercase">
                        <span>Board Percent Score</span>
                        <span className="text-cyan-400">{boardPercentage}%</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={boardPercentage}
                        onChange={(e) => setBoardPercentage(Number(e.target.value))}
                        className="w-full h-1 bg-slate-950 rounded cursor-pointer accent-cyan-500"
                      />
                      <div className="flex justify-between text-[8px] font-mono text-slate-500">
                        <span>MIN SCORE: 50%</span>
                        <span>FULL WAIVER: 100%</span>
                      </div>
                    </div>
                  </div>

                  {/* Calculations breakdown */}
                  {(() => {
                    const calcResult = calculateFees();
                    return (
                      <div className="bg-[#0b1625] border border-slate-850 p-5 rounded text-white space-y-5 relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-550/5 rounded-full blur-2xl font-mono" />
                        
                        <h4 className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400">FEES SUMMARY (Annual Taught)</h4>
                        
                        <div className="space-y-2 font-mono">
                          <div className="flex justify-between text-[11px] py-1 border-b border-slate-850">
                            <span className="text-slate-500">Course Base Fee</span>
                            <span className="font-bold text-slate-300">₹{calcResult.basePrice.toLocaleString()} / year</span>
                          </div>
                          
                          <div className="flex justify-between text-[11px] py-1 border-b border-slate-850">
                            <span className="text-slate-500">Eligible Waiver</span>
                            <span className="text-cyan-400 font-bold">{calcResult.discount}% Waiver</span>
                          </div>

                          <div className="flex justify-between text-[11px] py-1 border-b border-slate-850">
                            <span className="text-slate-500">Waiver Savings</span>
                            <span className="text-emerald-450 font-bold">- ₹{calcResult.discountAmount.toLocaleString()}</span>
                          </div>

                          <div className="flex justify-between text-xs font-black pt-3 text-slate-200">
                            <span className="font-sans uppercase tracking-tight text-[11px] text-slate-400">NET ADJUSTED FEES</span>
                            <span className="text-cyan-400 text-sm font-black">₹{calcResult.finalFee.toLocaleString()} / year</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            document.getElementById('enroll-form')?.scrollIntoView({ behavior: 'smooth' });
                            triggerToast(`Calculator initialized. Enrollment form open.`, 'success');
                          }}
                          className="w-full py-2.5 bg-cyan-500 text-slate-950 text-xs font-mono font-bold rounded uppercase tracking-wider block text-center cursor-pointer select-none"
                        >
                          Claim Scholarship Wave
                        </button>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            )}

            {/* VIEW 9: DEVELOPER WEBHOOK CONFIG & INSPECTOR */}
            {(activeId === 'api' || activeId === 'webhooks') && (
              <motion.div
                key="webhook-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 md:p-6 w-full max-w-4xl mx-auto space-y-5 text-left"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-100 uppercase tracking-tight">Webhook Integrations &amp; Telemetry</h2>
                  <p className="text-[10px] text-slate-500 font-mono font-bold tracking-wider mt-0.5 uppercase">CONNECT VANGUARD FORMS AND CTAs TO N8N ENDPOINTS REAL-TIME</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Form & Config */}
                  <div className="lg:col-span-5 bg-[#0b1625] border border-slate-800 p-5 rounded space-y-4 shadow-xl">
                    <h3 className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider pb-2 border-b border-slate-850">
                      N8N WEBHOOK TARGET ENDPOINT
                    </h3>
                    
                    <p className="text-xs text-slate-450 leading-relaxed">
                      Entering an active webhook URL (e.g. from n8n / Zapier) allows the Vanguard enrollment forms and download CTAs to dispatch real-time JSON payloads containing names, courses, and timetables.
                    </p>

                    <div className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-slate-500 uppercase">TARGET POST WEBHOOK URL</label>
                        <input
                          type="url"
                          value={webhookUrl}
                          onChange={(e) => setWebhookUrl(e.target.value)}
                          placeholder="https://n8n.myinstance.com/webhook/..."
                          className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded text-xs font-mono text-slate-200 outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => saveWebhookUrl(webhookUrl)}
                          className="px-3.5 py-1.5 bg-cyan-500 text-slate-950 text-[10px] font-mono font-bold rounded cursor-pointer leading-none uppercase"
                        >
                          Activate
                        </button>
                        
                        <button
                          onClick={() => {
                            setWebhookUrl('');
                            localStorage.removeItem('vanguard_custom_webhook');
                            triggerToast('Standard simulated local endpoint enabled.', 'info');
                          }}
                          className="px-3.5 py-1.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 text-[10px] font-mono font-bold rounded cursor-pointer leading-none uppercase"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Inspector telemetries */}
                  <div className="lg:col-span-7 bg-[#0b1625] border border-slate-800 p-5 rounded space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-850 leading-none">
                      <h3 className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                        LIVE WEBHOOK TRANSACTION LOGS
                      </h3>
                      <button
                        onClick={clearWebhookLogs}
                        className="text-[9px] font-mono text-slate-500 hover:text-cyan-400 underline cursor-pointer"
                      >
                        Clear logs
                      </button>
                    </div>

                    <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden">
                      {webhookHistory.length === 0 ? (
                        <div className="py-12 text-center text-slate-500">
                          <Terminal className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                          <p className="text-[11px] font-mono font-bold">No transactions found</p>
                          <p className="text-[9px] font-mono text-slate-500 mt-0.5">Submit registration forms to dispatch telemetry streams</p>
                        </div>
                      ) : (
                        webhookHistory.map((log) => (
                          <div key={log.id} className="p-3 bg-slate-950 border border-slate-850 rounded space-y-2">
                            <div className="flex justify-between items-center text-[9px] font-mono">
                              <span className="font-bold text-cyan-400 uppercase tracking-wider">{log.event}</span>
                              <span className="text-slate-500">{log.timestamp}</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 text-[9px] font-mono whitespace-pre bg-[#040810] p-2 rounded border border-slate-850">
                              <div>
                                <span className="text-cyan-400 text-[8px] font-bold block uppercase mb-1 tracking-wider">Payload Sent:</span>
                                {JSON.stringify(log.payload, null, 1)}
                              </div>
                              <div>
                                <span className="text-slate-400 text-[8px] font-bold block uppercase mb-1 tracking-wider">Triggers:</span>
                                {JSON.stringify(log.apiResponse, null, 1)}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 10: SETTINGS */}
            {activeId === 'settings' && (
              <motion.div
                key="settings-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 md:p-6 w-full max-w-4xl mx-auto space-y-5 text-left"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-100 uppercase tracking-tight">Academy Settings</h2>
                  <p className="text-[10px] text-slate-500 font-mono font-bold tracking-wider mt-0.5 uppercase">CONFIGURE SYSTEM PROFILE INFORMATION AND INTEGRATIONS</p>
                </div>

                <div className="bg-[#0b1625] border border-slate-800 p-5 rounded space-y-5 shadow-xl">
                  
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-mono font-bold border-b border-slate-850 pb-2 text-slate-400 uppercase tracking-wider">ADMINISTRATOR PROFILE</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">Admin Full Name</label>
                        <input type="text" readOnly value="Deepak Bishnoi" className="w-full bg-slate-950 border border-slate-850 text-xs font-mono p-2.5 rounded outline-none cursor-not-allowed text-slate-400" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">Primary Institute Title</label>
                        <input type="text" readOnly value="Vanguard Academy coaching institute" className="w-full bg-slate-950 border border-slate-850 text-xs font-mono p-2.5 rounded outline-none cursor-not-allowed text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <h4 className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">CREDENTIAL TOGGLES</h4>
                    <button 
                      onClick={() => handleNonfunctionalClick('Update Password Credentials')} 
                      className="px-3 py-1.5 bg-cyan-500 text-slate-950 text-[10px] font-mono font-bold rounded cursor-pointer leading-none uppercase"
                    >
                      Update Password Credentials
                    </button>
                    <p className="text-[9px] font-mono text-slate-500">All non-functional parameters are safely locked. System setup by Deepak Bishnoi.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* fallback view */}
            {['search', 'home', 'inbox', 'analytics', 'calendar', 'projects', 'p-active', 'p-archived', 'team', 't-design', 't-eng', 't-product', 'customers', 'c-enterprise', 'c-smb', 'finance', 'api', 'webhooks', 'settings'].indexOf(activeId) === -1 && (
              <div className="p-10 text-center text-slate-500">
                <Sliders className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <h3 className="text-xs font-mono font-bold uppercase text-slate-300">Module Simulator Ready</h3>
                <p className="text-[10px] font-mono text-slate-500 mt-1 max-w-xs mx-auto">This module of Vanguard Academy admissions dashboard is ready for developer custom codes.</p>
                <button
                  onClick={() => handleNonfunctionalClick(activeId)}
                  className="mt-3.5 px-3 py-1.5 bg-cyan-500 text-slate-950 text-[10px] font-mono font-bold rounded cursor-pointer leading-none uppercase"
                >
                  Sync System Trigger
                </button>
              </div>
            )}

          </AnimatePresence>
        </main>

        {/* Floating Academic AI Counselor Advisor */}
        <AICounselor
          onToast={triggerToast}
          isOpenExternal={isAICounselorOpen}
          onRequestCloseExternal={() => setIsAICounselorOpen(false)}
        />

        {/* Global Search Interface Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <div className="absolute inset-0 z-50 flex items-start justify-center pt-[15vh] bg-background/40 backdrop-blur-sm px-4">
              <div className="absolute inset-0" onClick={() => setIsSearchOpen(false)} />
              <div className="relative w-full max-w-xl bg-white dark:bg-[#0b1421] border border-slate-100 dark:border-slate-800/80 rounded-[20px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center px-4 border-b border-slate-100 dark:border-slate-800/80">
                  <Search className="w-[18px] h-[18px] text-slate-400 mr-3 shrink-0" strokeWidth={1.5} />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent py-4 outline-none text-[14px] text-slate-800 dark:text-white placeholder:text-slate-400"
                    placeholder="Search courses, folders, faculty, or webhooks..."
                  />
                  <kbd
                    onClick={() => setIsSearchOpen(false)}
                    className="hidden sm:inline-flex items-center justify-center h-5 px-1.5 ml-2 text-[10px] font-medium font-mono text-slate-400 bg-slate-50 dark:bg-slate-900 border border-slate-250/20 rounded-[4px] cursor-pointer hover:bg-slate-100"
                  >
                    ESC
                  </kbd>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-3 p-1 rounded-md text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                  >
                    <X className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  </button>
                </div>

                <div className="p-4 max-h-96 overflow-y-auto">
                  {searchQuery.trim() === '' ? (
                    <div className="p-6 text-center text-slate-500">
                      <Command className="w-6 h-6 text-slate-300 mx-auto mb-2" strokeWidth={1.5} />
                      <p className="text-[13px] font-bold">Type a query above to search...</p>
                      <p className="text-[10px] text-slate-400 mt-1">Try "JEE", "admission", "Dr. Shreya", "webhook URL"</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {[
                        { title: 'IIT-JEE Elite Achievers Course', view: 'home', category: 'Course' },
                        { title: 'NEET Medical Premier Batch', view: 'home', category: 'Course' },
                        { title: 'Dr. Shreya Bishnoi - Physics Head', view: 'team', category: 'Faculty' },
                        { title: 'Webhook Logs & Telemetry Desk', view: 'webhooks', category: 'Integration' },
                        { title: 'Direct Admissions Application Form', view: 'home', category: 'Admission' },
                        { title: 'Course Fee Scholarship Tiers', view: 'finance', category: 'Finance' },
                        { title: 'Admissions and System Inbox Announcements', view: 'inbox', category: 'Portal' }
                      ]
                        .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setActiveId(item.view);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                              triggerToast(`Navigated to: ${item.title}`, 'success');
                            }}
                            className="p-3 hover:bg-slate-50 dark:hover:bg-slate-900/60 rounded-xl cursor-pointer flex justify-between items-center transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                          >
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{item.title}</span>
                            <span className="text-[9px] bg-indigo-50 dark:bg-indigo-950 font-bold px-2 py-0.5 rounded text-indigo-500 uppercase">
                              {item.category}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
