import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Cpu, 
  Zap, 
  Users, 
  ShieldAlert, 
  ShieldCheck, 
  TrendingDown, 
  TrendingUp,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export const ProblemSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'breakdown'>('comparison');

  const legacyIssues = [
    {
      title: 'Hallucinated & Inflated Resumes',
      desc: 'Static PDFs full of keyword optimization and false claims with zero mathematical proof.',
      icon: FileText,
      stat: '78% Contain Exaggerations',
      color: 'rose',
    },
    {
      title: '6-Week Engineering Drag',
      desc: 'Top engineers spend 300+ hours conducting repetitive live coding interviews instead of building.',
      icon: Clock,
      stat: '42 Days Avg Time-to-Hire',
      color: 'amber',
    },
    {
      title: 'Subjective Human Bias & Mismatch',
      desc: 'Interviewer mood, trivia-based algorithm gotchas, and pedigree bias resulting in 40% first-year turnover.',
      icon: ShieldAlert,
      stat: '46% Mis-hire Rate',
      color: 'rose',
    },
  ];

  const skillSyncSolutions = [
    {
      title: 'Cryptographic Zero-Knowledge Skill Proofs',
      desc: 'Verifiable on-chain proofs and deterministic Git code velocity vectors with zero credential faking.',
      icon: ShieldCheck,
      stat: '100% Cryptographically Verified',
      color: 'emerald',
    },
    {
      title: 'Autonomous Multi-Agent Sandboxes',
      desc: 'AI agents conduct deep multi-turn system simulations and code reviews in under 15 minutes.',
      icon: Cpu,
      stat: '< 48 Hours to Deployment',
      color: 'cyan',
    },
    {
      title: 'Deterministic Velocity & Synergy Matching',
      desc: 'Mathematical matching based on codebase PR velocity, architecture patterns, and team synergy.',
      icon: Zap,
      stat: '99.4% Match Precision',
      color: 'emerald',
    },
  ];

  return (
    <section id="problem" className="py-24 relative overflow-hidden">
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>The Fundamental Paradigm Shift</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Legacy Hiring is Broken. <br />
            <span className="text-gradient-cyan">SkillSync Automates the Truth.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            In the post-AGI world, hiring senior engineers through static PDF resumes and trivia algorithms is like searching the web with a phonebook.
          </p>
        </div>

        {/* Side-by-Side Holographic Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Legacy Recruiting Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-gradient-to-b from-rose-950/20 via-obsidian-900/60 to-obsidian-950/80 border border-rose-500/20 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-rose-500/20 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-rose-200">The Legacy Sourcing Model</h3>
                    <p className="text-xs font-mono text-rose-400/80">Human Bottlenecks & Static Data</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30">
                  OBSOLETE
                </span>
              </div>

              <div className="space-y-4 mb-6">
                {legacyIssues.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-obsidian-950/60 border border-white/[0.04] hover:border-rose-500/30 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                            <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">
                              {item.stat}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/20 text-xs text-rose-300/90 font-mono flex items-center justify-between">
              <span>Result: Cost per hire &gt; $28,000</span>
              <span className="text-rose-400 font-bold">42-Day Friction</span>
            </div>
          </motion.div>

          {/* SkillSync Autonomous Paradigm Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-gradient-to-b from-cyan-950/30 via-obsidian-900/60 to-obsidian-950/80 border border-cyan-500/30 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-cyan-950/30"
          >
            {/* Glowing top border beam */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-400 to-violet-500" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-cyan-200">The SkillSync Autonomous OS</h3>
                    <p className="text-xs font-mono text-cyan-400/80">Deterministic Neural Execution</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  STATE OF THE ART
                </span>
              </div>

              <div className="space-y-4 mb-6">
                {skillSyncSolutions.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-obsidian-950/80 border border-cyan-500/20 hover:border-cyan-400/50 transition-colors group shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                              {item.title}
                            </h4>
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                              {item.stat}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 font-mono flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Outcome: Instant Autonomous Deployment
              </span>
              <span className="text-cyan-400 font-bold">&lt; 48hr Total Cycle</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
