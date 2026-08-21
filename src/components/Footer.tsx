import React from 'react';
import { Cpu, Github, Twitter, Disc as Discord, ShieldCheck, Terminal, Heart, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-obsidian-950 border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand & Cluster Telemetry (Spans 2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Skill<span className="text-cyan-400">Sync</span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded ml-1.5">
                  OS
                </span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The autonomous talent operating system engineered with zero-knowledge cryptographic skill proofs, multi-agent sandbox evaluations, and neural graph matchmaking.
            </p>

            {/* Real-time Cluster Health Pulse */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-obsidian-900 border border-white/[0.08] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">Neural Clusters:</span>
              <span className="text-emerald-400 font-semibold">100% Operational (9ms)</span>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
              <li>
                <a href="#hero" onClick={() => soundFx.playBlip(900)} className="hover:text-cyan-300 transition-colors">
                  Autonomous Query Bar
                </a>
              </li>
              <li>
                <a href="#problem" onClick={() => soundFx.playBlip(900)} className="hover:text-cyan-300 transition-colors">
                  Legacy vs Autonomous
                </a>
              </li>
              <li>
                <a href="#features" onClick={() => soundFx.playBlip(900)} className="hover:text-cyan-300 transition-colors">
                  Neural Skill Matrix
                </a>
              </li>
              <li>
                <a href="#workflow" onClick={() => soundFx.playBlip(900)} className="hover:text-cyan-300 transition-colors">
                  AI Screening Pipeline
                </a>
              </li>
              <li>
                <a href="#sandbox" onClick={() => soundFx.playBlip(900)} className="hover:text-cyan-300 transition-colors">
                  Interactive Sandbox
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Architecture */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Architecture
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
              <li>
                <a href="#team" onClick={() => soundFx.playBlip(900)} className="hover:text-cyan-300 transition-colors">
                  Research Council
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={() => soundFx.playBlip(900)} className="hover:text-cyan-300 transition-colors">
                  Sovereign Enclaves
                </a>
              </li>
              <li>
                <a href="#testimonials" onClick={() => soundFx.playBlip(900)} className="hover:text-cyan-300 transition-colors">
                  Frontier Benchmarks
                </a>
              </li>
              <li>
                <span className="text-slate-600 cursor-not-allowed">
                  ZK-Proof Verifier (v4.8)
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Security */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Security & Trust
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                SOC2 Type II Certified
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Zero-Knowledge Privacy
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Deterministic Verification
              </li>
              <li className="pt-1 text-[11px] text-slate-500 font-mono">
                Sepolia L2 Contract: 0x7F9...4C3E
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 SkillSync OS Inc. Engineered for the Post-AGI Talent Paradigm.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-cyan-300 transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-cyan-300 transition-colors cursor-pointer">Privacy Protocol</span>
            <span>•</span>
            <span className="hover:text-cyan-300 transition-colors cursor-pointer">Security Whitepaper</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
