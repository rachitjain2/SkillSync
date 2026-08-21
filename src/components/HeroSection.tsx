import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Terminal, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  Layers, 
  Zap, 
  Code2,
  ExternalLink,
  ChevronRight,
  Fingerprint
} from 'lucide-react';
import { MOCK_PROMPTS, MOCK_CANDIDATES } from '../utils/mockData';
import { Candidate, PromptQuery } from '../types';
import { soundFx } from '../utils/audio';

interface HeroSectionProps {
  onSelectCandidate: (candidate: Candidate) => void;
  onOpenCommandPalette: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onSelectCandidate,
  onOpenCommandPalette 
}) => {
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [resultsReady, setResultsReady] = useState(true);
  const [activeCandidates, setActiveCandidates] = useState<Candidate[]>([]);

  const currentPrompt = MOCK_PROMPTS[activePromptIndex];

  useEffect(() => {
    // Initial load with default prompt results
    const matching = MOCK_CANDIDATES.filter(c => 
      currentPrompt.resultCandidateIds.includes(c.id)
    );
    setActiveCandidates(matching);
  }, []);

  const handleRunPrompt = (index: number) => {
    soundFx.playSwitch();
    setActivePromptIndex(index);
    setCustomInput('');
    triggerSimulation(MOCK_PROMPTS[index]);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    soundFx.playSuccess();
    triggerSimulation(currentPrompt, customInput);
  };

  const triggerSimulation = (prompt: PromptQuery, _overrideText?: string) => {
    setIsExecuting(true);
    setResultsReady(false);
    setCurrentStepIndex(0);

    const stepInterval = setInterval(() => {
      soundFx.playPulse();
      setCurrentStepIndex((prev) => {
        if (prev < prompt.reasoningSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setIsExecuting(false);
          setResultsReady(true);
          const matched = MOCK_CANDIDATES.filter(c => 
            prompt.resultCandidateIds.includes(c.id)
          );
          setActiveCandidates(matched.length > 0 ? matched : [MOCK_CANDIDATES[0]]);
          soundFx.playSuccess();
          return prev;
        }
      });
    }, 450);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Decorative Gradients & Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-cyan-500/15 via-violet-600/15 to-blue-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Floating Badge */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-850/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-500/10 backdrop-blur-md hover:border-cyan-400 transition-colors cursor-pointer"
            onClick={() => {
              soundFx.playBlip(1000);
              onOpenCommandPalette();
            }}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="font-semibold text-slate-200">SkillSync Autonomous Kernel 4.8</span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-400 flex items-center gap-1">
              Press <kbd className="bg-slate-800 px-1 rounded text-[10px]">⌘K</kbd>
            </span>
          </motion.div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
          >
            The Autonomous{' '}
            <span className="text-gradient-cyan drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]">
              Talent Operating System
            </span>{' '}
            for the Post-AGI Era
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Replace weeks of biased resume parsing with <span className="text-cyan-300 font-medium">cryptographic skill verification</span>, 
            autonomous multi-agent coding simulations, and real-time engineering graph matchmaking.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#pricing"
            onClick={() => soundFx.playSuccess()}
            className="relative px-7 py-3.5 rounded-xl font-semibold text-sm text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-teal-200 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-95 transition-all duration-200 flex items-center gap-2 group"
          >
            <Zap className="w-4 h-4 text-black fill-current" />
            <span>Deploy SkillSync OS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#sandbox"
            onClick={() => soundFx.playBlip(800)}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-obsidian-850/80 hover:bg-obsidian-800 border border-white/10 hover:border-cyan-500/40 shadow-lg backdrop-blur-md active:scale-95 transition-all duration-200 flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Live Interactive Sandbox</span>
          </a>
        </motion.div>

        {/* ChatGPT + Cursor + Perplexity Style Interactive AI Prompt & Search Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl glass-panel p-1.5 sm:p-2 border border-white/[0.12] shadow-2xl shadow-cyan-950/40">
            {/* Top Bar with OS Control Dots & Active Mode */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] bg-obsidian-900/60 rounded-t-xl mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/70 border border-rose-400/40" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70 border border-amber-400/40" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70 border border-emerald-400/40" />
                <span className="text-[11px] font-mono text-slate-400 ml-2 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  SkillSync.ai / autonomous-query-orchestrator
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-violet-400" />
                  Neural Vector DB: Online
                </span>
              </div>
            </div>

            {/* Prompt Selector Pills */}
            <div className="px-3 pb-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 shrink-0">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Suggested Tasks:
              </span>
              {MOCK_PROMPTS.map((prompt, idx) => (
                <button
                  key={prompt.id}
                  onClick={() => handleRunPrompt(idx)}
                  className={`text-xs px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all duration-200 border ${
                    activePromptIndex === idx && !customInput
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-500/30'
                      : 'bg-obsidian-850/60 text-slate-400 border-white/[0.08] hover:text-slate-200 hover:border-white/20'
                  }`}
                >
                  {prompt.category}
                </button>
              ))}
            </div>

            {/* Input Form & Execution Bar */}
            <form onSubmit={handleCustomSubmit} className="px-3 pb-3">
              <div className="relative flex items-center rounded-xl bg-obsidian-950/80 border border-cyan-500/30 focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400/30 transition-all p-1.5 shadow-inner">
                <div className="pl-3 pr-2 text-cyan-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={customInput || currentPrompt.query}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Describe desired tech stack, cryptographic credentials, or engineering pod dynamics..."
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans px-1"
                />
                <button
                  type="submit"
                  disabled={isExecuting}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 disabled:opacity-50 flex items-center gap-1.5 shrink-0 transition-all active:scale-95"
                >
                  {isExecuting ? (
                    <>
                      <Activity className="w-3.5 h-3.5 animate-spin" />
                      <span>Synthesizing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Execute Neural Match</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* AI Reasoning Streaming Logs (Perplexity & Cursor style) */}
            <div className="px-3 pb-3">
              <div className="rounded-xl bg-obsidian-950/70 border border-white/[0.07] p-3 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-400 mb-2 pb-1 border-b border-white/[0.05]">
                  <span className="flex items-center gap-1.5 text-[11px] text-cyan-400">
                    <Layers className="w-3.5 h-3.5" />
                    Autonomous Multi-Agent Thought Stream
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {isExecuting ? 'Processing Neural Graph...' : 'Match Completed • 100% Attested'}
                  </span>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {currentPrompt.reasoningSteps.map((step, idx) => {
                    const isPassed = !isExecuting || (currentStepIndex >= idx);
                    const isCurrent = isExecuting && currentStepIndex === idx;

                    if (!isPassed && !isCurrent) return null;

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex items-start gap-2 ${
                          isCurrent 
                            ? 'text-cyan-300 font-semibold' 
                            : isPassed 
                              ? 'text-slate-300' 
                              : 'text-slate-600'
                        }`}
                      >
                        {isCurrent ? (
                          <span className="w-3.5 h-3.5 flex items-center justify-center text-cyan-400 animate-spin mt-0.5">
                            ⟳
                          </span>
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        )}
                        <span>{step}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Candidate Match Results Preview Cards */}
            <AnimatePresence>
              {resultsReady && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="px-3 pb-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeCandidates.map((cand) => (
                      <div
                        key={cand.id}
                        onClick={() => {
                          soundFx.playBlip(1100);
                          onSelectCandidate(cand);
                        }}
                        className="p-3.5 rounded-xl bg-obsidian-900/90 border border-cyan-500/25 hover:border-cyan-400/60 transition-all cursor-pointer group shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
                      >
                        <div>
                          {/* Card Header */}
                          <div className="flex items-start justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={cand.avatar}
                                alt={cand.name}
                                className="w-10 h-10 rounded-lg object-cover border border-cyan-500/40 shadow-sm"
                              />
                              <div>
                                <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                                  {cand.name}
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                </h4>
                                <p className="text-[11px] text-slate-400 font-mono">{cand.role}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                {cand.matchScore}% Match
                              </span>
                            </div>
                          </div>

                          {/* Skill Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {cand.skills.slice(0, 3).map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-obsidian-800 text-slate-300 border border-white/[0.08]"
                              >
                                {skill.name.split(' (')[0]}
                              </span>
                            ))}
                          </div>

                          {/* AI Verification Note */}
                          <p className="text-[11px] text-slate-400 line-clamp-2 italic mb-2">
                            "{cand.aiScreeningSummary}"
                          </p>
                        </div>

                        {/* Bottom Actions */}
                        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                          <span className="font-mono text-[10px] text-cyan-400/80 flex items-center gap-1">
                            <Fingerprint className="w-3 h-3" />
                            {cand.zeroKnowledgeHash.slice(0, 18)}...
                          </span>
                          <span className="text-cyan-300 font-medium flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                            Inspect Dossier
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Live Platform Telemetry Metric Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {[
            { label: 'Verified Engineer Nodes', value: '45,820+', change: '+18% this month' },
            { label: 'Autonomous Match Precision', value: '99.4%', change: 'Multi-Agent verified' },
            { label: 'Screening Simulation Latency', value: '< 14s', change: 'Zero human drag' },
            { label: 'Hiring Cycle Reduction', value: '84%', change: 'From 6 wks to 48 hrs' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-card p-4 rounded-xl text-center relative overflow-hidden group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mb-1 tracking-tight group-hover:text-cyan-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-300 mb-1">{stat.label}</div>
              <div className="text-[10px] font-mono text-cyan-400/80">{stat.change}</div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
