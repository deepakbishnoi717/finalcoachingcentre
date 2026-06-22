import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Sparkles, HelpCircle, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';

interface AICounselorProps {
  onToast: (text: string) => void;
  isOpenExternal?: boolean;
  onRequestCloseExternal?: () => void;
}

export default function AICounselor({ onToast, isOpenExternal = false, onRequestCloseExternal }: AICounselorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'assistant',
      text: "Hello! I am your **Vanguard Academy AI Academic Advisor**. 🎓\n\nHow can I help you today? Ask me anything about our:\n- **IIT-JEE** / **NEET** Elite coaching\n- **Weekly Mock Exams** & interactive studies\n- **Scholarships** and hybrid batch timings!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Synchronize with external open triggers
  useEffect(() => {
    if (isOpenExternal) {
      setIsOpen(true);
    }
  }, [isOpenExternal]);

  // Handle auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const toggleChat = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (!nextState && onRequestCloseExternal) {
      onRequestCloseExternal();
    }
  };

  const recommendedPrompts = [
    "Tell me about JEE course fees & schedule",
    "What is the hybrid mock exam setup?",
    "How does personal mentorship work?",
    "Do you have droppers batch?"
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-10) // Send trailing conversation context
        })
      });

      if (!response.ok) {
        throw new Error("Chat api failed");
      }

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: data.text || "I was unable to structure an assessment. Please rephrase or register via the form for active callbacks.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      
      // Smart offline fallback
      setTimeout(() => {
        const fallbackMsg: ChatMessage = {
          id: Math.random().toString(),
          sender: 'assistant',
          text: `**Counselor Live Bot**:\n\nThank you for asking about this! **Vanguard Academy** runs elite hybrid classrooms for IIT-JEE/NEET aspirants. To get customized scholarship plans, please fill out the **Direct Enrollment Form** on our home screen.\n\nOur counseling representative will callback within 15 minutes!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, fallbackMsg]);
      }, 800);
      
    } finally {
      setIsLoading(false);
    }
  };

  // Convert markdown-style bold and bullet highlights in response text
  const renderMessageContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      let formattedLine = line;
      
      // Simple custom markdown highlights
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="font-extrabold text-cyan-400">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ') || line.trim().match(/^\d+\.\s/);
      
      return (
        <p key={i} className={`text-xs leading-relaxed mb-1 ${isBullet ? 'pl-2 border-l border-cyan-500/30' : ''}`}>
          {parts.length > 0 ? parts : formattedLine}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-[#0b1625] border border-slate-800 rounded-lg w-[340px] md:w-[390px] h-[520px] shadow-2xl flex flex-col overflow-hidden relative text-left"
          >
            {/* Header */}
            <div className="bg-[#0c1b30] p-3.5 flex items-center justify-between text-white border-b border-slate-800 relative">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
                </div>
                <div>
                  <div className="font-bold text-xs flex items-center gap-1.5 leading-none text-slate-100">
                    AI DESK COUNSELOR <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono font-bold tracking-widest leading-none mt-1 inline-block">VANGUARD SECURE INTEL</span>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-[#08101a] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start gap-2 max-w-[88%]">
                    {msg.sender === 'assistant' && (
                      <div className="w-6 h-6 rounded bg-slate-950 border border-slate-800/80 flex items-center justify-center p-1 shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                    )}
                    <div
                      className={`p-2.5 rounded text-xs shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-cyan-500 text-slate-950 font-semibold rounded-tr-none'
                          : 'bg-[#121c2a] border border-slate-800 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      {renderMessageContent(msg.text)}
                      <div className={`text-[8px] mt-1 font-mono text-right ${msg.sender === 'user' ? 'text-slate-900/60' : 'text-slate-500'}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2 max-w-[80%]">
                    <div className="w-6 h-6 rounded bg-slate-950 border border-slate-800/80 flex items-center justify-center p-1 shrink-0 mt-0.5 animate-pulse">
                      <Bot className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div className="p-2.5 bg-[#121c2a] border border-slate-800 rounded rounded-tl-none flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                      <span className="text-[10px] text-slate-400 font-mono font-bold tracking-wider">THINKING_SYSTEM...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Recommended quick questions */}
            {messages.length === 1 && !isLoading && (
              <div className="px-3.5 py-2 bg-slate-950 border-t border-slate-800">
                <div className="text-[8px] font-mono font-black text-slate-500 mb-1.5 uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" /> SUGGESTED COMMANDS:
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                  {recommendedPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-[10px] font-semibold text-slate-300 hover:text-cyan-400 bg-[#121f31] hover:bg-[#152e50] border border-slate-800 hover:border-cyan-500/40 rounded px-2 py-0.5 text-left transition-all cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-2.5 border-t border-slate-850 bg-[#0b1625] flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage(inputText);
                }}
                disabled={isLoading}
                placeholder="Ask our AI Counselor..."
                className="flex-1 bg-slate-950/80 text-slate-200 text-xs pl-3 pr-2 py-2 rounded border border-slate-800 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={isLoading || !inputText.trim()}
                className="p-2.5 rounded bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 transition-colors cursor-pointer text-slate-950"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 bg-cyan-500 hover:bg-cyan-600 text-slate-950 shadow-xl rounded-full flex items-center justify-center border border-cyan-400/40 cursor-pointer relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-5 h-5 font-black" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageSquare className="w-5 h-5 font-black" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 border border-slate-950 rounded-full flex items-center justify-center text-[7px] font-extrabold text-white animate-bounce">
                1
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
