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
  CheckCircle2
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { CopilotMessage, TalentProfile } from '../types';
import { AppRoute } from './AppLayout';

interface CareerCopilotViewProps {
  messages: CopilotMessage[];
  onSendMessage: (text: string) => void;
  currentProfile: TalentProfile;
  onNavigate: (route: AppRoute) => void;
}

export const CareerCopilotView: React.FC<CareerCopilotViewProps> = ({
  messages,
  onSendMessage,
  currentProfile,
  onNavigate
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptStarters = [
    'Conduct a mock technical interview for Anthropic streaming role',
    'How should I negotiate for the $245k offer + equity?',
    'Critique my resume project bullet points for higher impact',
    'Explain how to master WebAssembly and Yjs CRDTs in 14 days'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userText = inputText;
    setInputText('');
    soundFx.playSuccess();
    onSendMessage(userText);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    soundFx.playBlip(1200);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col justify-between space-y-4">
      {/* Top Status Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-indigo-400/25 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-sky-500/20 border border-indigo-400/40 flex items-center justify-center">
            <Bot className="w-5 h-5 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">AI Career Copilot</h2>
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Ready & Connected
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Calibrated to: <strong className="text-slate-200">{currentProfile.fullName}</strong> ({currentProfile.targetRole})
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Real-time Engineering Advisory</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 text-xs sm:text-sm ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-indigo-400" />
                </div>
              )}

              <div className={`max-w-2xl rounded-2xl p-4 sm:p-5 space-y-2.5 relative group ${
                isUser 
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium shadow-md shadow-sky-500/15' 
                  : 'bg-slate-950/90 border border-white/[0.08] text-slate-200 shadow-lg'
              }`}>
                {/* Header */}
                <div className="flex items-center justify-between text-[11px] opacity-75 pb-1 border-b border-white/[0.06]">
                  <span className="font-semibold">{isUser ? 'You' : 'Career Copilot'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Body */}
                <div className="whitespace-pre-line leading-relaxed">
                  {msg.text}
                </div>

                {/* Copy Button */}
                {!isUser && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white cursor-pointer"
                    title="Copy response"
                  >
                    {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}

                {/* Follow-up Suggestions */}
                {msg.suggestedPrompts && (
                  <div className="pt-2 space-y-1.5 border-t border-white/[0.06]">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300 block">
                      Recommended Follow-ups:
                    </span>
                    <div className="space-y-1">
                      {msg.suggestedPrompts.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            soundFx.playBlip(1000);
                            onSendMessage(p);
                          }}
                          className="w-full text-left p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-indigo-400/30 text-xs text-slate-300 hover:text-indigo-200 transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span className="truncate">{p}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {isUser && (
                <img
                  src={currentProfile.avatar}
                  alt={currentProfile.fullName}
                  className="w-8 h-8 rounded-lg object-cover border border-sky-400 shrink-0 mt-1"
                />
              )}
            </motion.div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Starters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 shrink-0">
        <span className="text-xs text-slate-500 shrink-0 flex items-center gap-1 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" /> Quick:
        </span>
        {promptStarters.map((starter, idx) => (
          <button
            key={idx}
            onClick={() => {
              soundFx.playBlip(1000);
              onSendMessage(starter);
            }}
            className="text-xs px-3 py-1.5 rounded-full bg-slate-950 border border-white/[0.08] hover:border-sky-400/40 text-slate-300 hover:text-sky-300 whitespace-nowrap transition-colors cursor-pointer"
          >
            {starter}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="shrink-0 relative">
        <div className="flex items-center rounded-2xl bg-slate-950/90 border border-white/15 focus-within:border-sky-400 p-2 shadow-2xl transition-all">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything (e.g. 'How should I explain my low-latency streaming project during interviews?')..."
            className="flex-1 bg-transparent px-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="px-4 py-2.5 rounded-xl shimmer-btn text-slate-950 text-xs font-bold shadow-md shadow-sky-500/25 disabled:opacity-40 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5 fill-current" />
          </motion.button>
        </div>
      </form>
    </div>
  );
};
