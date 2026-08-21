import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  ChevronRight, 
  Layers, 
  FileText, 
  Briefcase,
  CheckCircle2,
  Trash2,
  Download,
  Plus,
  Compass,
  Code2,
  MessageSquare,
  Search,
  BookOpen,
  Map,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Cpu,
  RefreshCw,
  Zap,
  Info,
  Maximize2
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { CopilotMessage, TalentProfile, JobOpportunity } from '../types';
import { AppRoute } from './AppLayout';

interface CareerCopilotViewProps {
  messages: CopilotMessage[];
  onSendMessage: (text: string) => void;
  currentProfile: TalentProfile;
  onNavigate: (route: AppRoute) => void;
  opportunities?: JobOpportunity[];
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
}

export const CareerCopilotView: React.FC<CareerCopilotViewProps> = ({
  messages,
  onSendMessage,
  currentProfile,
  onNavigate,
  opportunities = []
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showContextDrawer, setShowContextDrawer] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState('session-1');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Suggested Prompts explicitly required by user:
  const suggestedPrompts = [
    'Which jobs am I most suitable for?',
    'What skills am I missing for an AI Engineer role?',
    'How can I improve my resume?',
    'Why was I rejected for this role?',
    'What should I learn next?',
    'Find opportunities matching my profile.'
  ];

  // Chat Sessions History Sidebar
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: 'session-1',
      title: 'Current Career Guidance',
      timestamp: 'Active Now',
      preview: 'AI Engineer opportunity matches & skill gaps'
    },
    {
      id: 'session-2',
      title: 'Microsoft Copilot Interview Prep',
      timestamp: '2 hours ago',
      preview: 'RAG architecture and low-latency inference'
    },
    {
      id: 'session-3',
      title: 'AWS & Docker Roadmap Strategy',
      timestamp: 'Yesterday',
      preview: '4-Week sprint to 100% role qualification'
    },
    {
      id: 'session-4',
      title: 'DeepMind C++ & Vision Review',
      timestamp: '3 days ago',
      preview: 'SIMD object detection pipeline discussion'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isTyping) return;

    setInputText('');
    soundFx.playSuccess();
    setIsTyping(true);

    // Call upstream handler
    onSendMessage(text);

    // Turn off typing indicator once response arrives
    setTimeout(() => {
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    soundFx.playBlip(1200);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNewChat = () => {
    soundFx.playSwitch();
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: 'New Conversation',
      timestamp: 'Just now',
      preview: 'Fresh career advising thread'
    };
    setChatSessions([newSession, ...chatSessions]);
    setActiveSessionId(newSession.id);
  };

  const handleExportChat = () => {
    soundFx.playSuccess();
    const chatText = messages.map(m => `[${m.sender.toUpperCase()} - ${m.timestamp}]:\n${m.text}\n`).join('\n---\n\n');
    const blob = new Blob([chatText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillSync_Copilot_Chat_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-130px)] flex flex-col space-y-4 pb-2">
      
      {/* 1. TOP HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 sm:p-6 rounded-3xl glass-panel border border-sky-400/25 bg-gradient-to-r from-sky-500/[0.08] via-indigo-500/[0.05] to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl shrink-0"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shadow-lg shadow-sky-500/10">
              <Bot className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                SkillSync Career Copilot
                <span className="px-2.5 py-0.5 text-[10px] rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
                  Live Agent
                </span>
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            Ask anything about your career, skills, resume, or opportunities.
          </p>
        </div>

        {/* Top Context Indicator Button */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => {
              soundFx.playBlip(900);
              setShowContextDrawer(!showContextDrawer);
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-white/10 text-xs font-semibold text-sky-300 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Active AI Context ({currentProfile.fullName})</span>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showContextDrawer ? 'rotate-90' : ''}`} />
          </button>

          <button
            onClick={handleExportChat}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Export Conversation as Markdown"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* 2. MAIN CHAT CONTAINER (SIDEBAR + CONVERSATION AREA) */}
      <div className="flex-1 flex gap-4 min-h-0 relative">
        
        {/* Left Sessions Sidebar (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col w-64 rounded-3xl glass-panel border border-white/[0.08] p-4 space-y-3 shrink-0 shadow-xl">
          <button
            onClick={handleNewChat}
            className="w-full py-2.5 px-3 rounded-2xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-sky-300 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Conversation</span>
          </button>

          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 pt-1">
            Recent Threads
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {chatSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => {
                  soundFx.playBlip(900);
                  setActiveSessionId(session.id);
                }}
                className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer space-y-1 ${
                  activeSessionId === session.id
                    ? 'bg-slate-900 border border-sky-400/30 shadow-md'
                    : 'bg-white/[0.02] hover:bg-white/[0.05] border border-transparent text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate max-w-[130px]">
                    {session.title}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">
                    {session.timestamp}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate">
                  {session.preview}
                </p>
              </button>
            ))}
          </div>

          {/* Sidebar Ingested Vectors Summary */}
          <div className="p-3 rounded-2xl bg-slate-950/90 border border-white/[0.06] text-[11px] space-y-1.5">
            <span className="text-sky-400 font-bold block">Ingested Knowledge:</span>
            <div className="text-slate-400 text-[10px] space-y-1">
              <div>✓ Candidate Profile & NIT GPA 3.91</div>
              <div>✓ 18 Verified Resume Skills</div>
              <div>✓ 14 Matched Roles (Top: 92%)</div>
              <div>✓ 4-Week Learning Roadmap</div>
            </div>
          </div>
        </div>

        {/* Center: Interactive ChatGPT-Style Chat View */}
        <div className="flex-1 flex flex-col justify-between rounded-3xl glass-panel border border-white/[0.08] p-4 sm:p-6 shadow-2xl relative min-w-0 bg-gradient-to-b from-slate-950/60 to-slate-950/90">
          
          {/* Active Context Bar Drawer (Slide down when toggled) */}
          <AnimatePresence>
            {showContextDrawer && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-4 rounded-2xl bg-slate-950 border border-sky-400/25 space-y-3 text-xs shadow-xl"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    AI Memory & Live Ingested Candidate Data
                  </span>
                  <button
                    onClick={() => setShowContextDrawer(false)}
                    className="text-[11px] text-slate-400 hover:text-white"
                  >
                    Hide
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-slate-400 block text-[10px]">Active Candidate</span>
                    <strong className="text-white">{currentProfile.fullName}</strong>
                    <span className="text-sky-400 block text-[10px]">{currentProfile.targetRole}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-slate-400 block text-[10px]">Extracted Skills</span>
                    <strong className="text-emerald-400">Python, ML, C++, SQL, PyTorch</strong>
                    <span className="text-slate-500 block text-[10px]">18 skills verified</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-slate-400 block text-[10px]">Active Skill Gaps</span>
                    <strong className="text-amber-400">AWS, Docker, Kubernetes</strong>
                    <span className="text-slate-500 block text-[10px]">Roadmap Sprint active</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages Scroll Feed */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 min-h-0">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3.5 text-xs sm:text-sm ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {/* AI Avatar */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-400/40 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <Bot className="w-4 h-4 text-sky-400" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className={`max-w-3xl rounded-3xl p-5 space-y-3 relative group shadow-xl ${
                    isUser
                      ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium shadow-sky-500/10'
                      : 'bg-[#0B111E] border border-white/[0.08] text-slate-200'
                  }`}>
                    
                    {/* Header */}
                    <div className="flex items-center justify-between text-[11px] opacity-75 pb-1.5 border-b border-white/[0.06]">
                      <span className="font-bold flex items-center gap-1.5">
                        {isUser ? 'Rachit Jain' : 'SkillSync Career Copilot'}
                      </span>
                      <span className="font-mono text-[10px]">{msg.timestamp}</span>
                    </div>

                    {/* Markdown Body */}
                    <div className="whitespace-pre-line leading-relaxed space-y-2 text-xs sm:text-sm font-normal">
                      {msg.text}
                    </div>

                    {/* Copy Response Button */}
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="absolute top-3 right-3 p-1.5 rounded-xl bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white cursor-pointer"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    )}

                    {/* Suggested Follow-up Prompt Pills */}
                    {!isUser && msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                      <div className="pt-3 border-t border-white/[0.06] space-y-2">
                        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                          Suggested Follow-ups:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.suggestedPrompts.map((prompt, pIdx) => (
                            <button
                              key={pIdx}
                              onClick={() => handleSubmit(prompt)}
                              className="px-3 py-1 rounded-xl bg-white/[0.04] hover:bg-sky-500/15 border border-white/[0.08] hover:border-sky-400/30 text-[11px] text-slate-300 hover:text-sky-300 font-medium transition-all text-left cursor-pointer flex items-center gap-1"
                            >
                              <span>{prompt}</span>
                              <ChevronRight className="w-3 h-3 opacity-60" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                </motion.div>
              );
            })}

            {/* Live Typing / Token Streaming Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 text-xs text-sky-400"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-sky-400 animate-spin" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-[#0B111E] border border-white/[0.08] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-slate-400 text-xs pl-2 font-mono">Synthesizing personalized advice...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 3. SUGGESTED PROMPT PILLS STRIP (Directly required) */}
          <div className="pt-3 pb-2 space-y-1.5 border-t border-white/[0.06] shrink-0">
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-mono">
              <span>Quick Prompt Inquiries</span>
              <span className="text-sky-400">Click to run immediately</span>
            </div>

            <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 max-h-20">
              {suggestedPrompts.map((prompt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubmit(prompt)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-sky-500/15 border border-white/[0.08] hover:border-sky-400/40 text-xs text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  <span>{prompt}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* 4. CHATGPT-STYLE INPUT AREA */}
          <div className="pt-2 shrink-0">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="relative flex items-center">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your career, skills, resume, or opportunities (e.g. 'Which jobs am I most suitable for?')..."
                rows={1}
                className="w-full bg-[#070B12] border border-white/10 focus:border-sky-400 rounded-2xl pl-4 pr-24 py-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all shadow-inner resize-none"
              />

              <div className="absolute right-2.5 flex items-center gap-1.5">
                <motion.button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-4 py-2 rounded-xl shimmer-btn text-slate-950 text-xs font-extrabold shadow-md shadow-sky-500/25 disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Send</span>
                  <Send className="w-3 h-3 fill-current text-slate-950" />
                </motion.button>
              </div>
            </form>

            <div className="flex items-center justify-between text-[10px] text-slate-500 px-2 pt-1.5 font-mono">
              <span>Press <strong>Enter</strong> to send, <strong>Shift + Enter</strong> for new line</span>
              <span>SkillSync Career Model v2.4</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
