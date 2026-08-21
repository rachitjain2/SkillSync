import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Terminal, 
  GitBranch, 
  Zap, 
  Sparkles, 
  CheckCircle, 
  Layers, 
  Radar, 
  Code, 
  LineChart,
  Bot,
  Binary,
  Volume2
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export const FeaturesBento: React.FC = () => {
  const [activeScreeningWave, setActiveScreeningWave] = useState(true);
  const [radarHovered, setRadarHovered] = useState(false);

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Autonomous Intelligence Suite</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Engineered for Frontier Teams <br />
            <span className="text-gradient-cyan">Operating at Hyper-Speed</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            A comprehensive suite of neural algorithms designed to evaluate, verify, and orchestrate elite engineering talent autonomously.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1: Neural Skill Matrix & Dynamic Vector Graph (Spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => {
              setRadarHovered(true);
              soundFx.playBlip(950);
            }}
            onMouseLeave={() => setRadarHovered(false)}
            className="md:col-span-2 rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-400/40 transition-all"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Radar className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-xs font-mono text-cyan-400/90 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  512-D Vector Embeddings
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Neural Skill Matrix & Vector Graph
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Calculates continuous multidimensional competency vectors across concurrency, kernel debugging, system architecture, and AI pair-programming velocity.
              </p>
            </div>

            {/* Interactive Radar Visualizer Simulation */}
            <div className="relative h-44 rounded-xl bg-obsidian-950/80 border border-white/[0.06] p-4 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 radar-grid opacity-30" />
              
              {/* Spinning radar line */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-36 h-36 rounded-full border border-cyan-500/20 relative animate-radar-sweep">
                  <div className="absolute top-0 right-1/2 w-18 h-0.5 bg-gradient-to-r from-transparent to-cyan-400 origin-right" />
                </div>
              </div>

              {/* Data points */}
              <div className="relative z-10 grid grid-cols-3 gap-2 sm:gap-4 text-center w-full max-w-sm">
                <div className="p-2 rounded-lg bg-obsidian-900/90 border border-cyan-500/20">
                  <div className="text-[10px] font-mono text-slate-400">Concurrency</div>
                  <div className="text-sm font-bold text-cyan-300 font-mono">99.2%</div>
                </div>
                <div className="p-2 rounded-lg bg-obsidian-900/90 border border-violet-500/20">
                  <div className="text-[10px] font-mono text-slate-400">Memory/Kernel</div>
                  <div className="text-sm font-bold text-violet-300 font-mono">97.8%</div>
                </div>
                <div className="p-2 rounded-lg bg-obsidian-900/90 border border-emerald-500/20">
                  <div className="text-[10px] font-mono text-slate-400">AI Velocity</div>
                  <div className="text-sm font-bold text-emerald-300 font-mono">99.6%</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Autonomous Interviewing Agents (Spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onMouseEnter={() => soundFx.playBlip(1000)}
            className="md:col-span-2 rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-violet-400/40 transition-all"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-violet-400/90 bg-violet-500/10 px-2.5 py-1 rounded-full border border-violet-500/20 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
                  Voice + Code Agent
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                Autonomous Technical Screening Agent
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Deploys multi-turn AI interviewers capable of simulating live production outages, debugging race conditions, and stress testing algorithmic trade-offs.
              </p>
            </div>

            {/* Simulated Live Audio Waveform & Agent Chat */}
            <div className="relative rounded-xl bg-obsidian-950/80 border border-white/[0.06] p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/[0.05] pb-1.5">
                <span className="text-violet-400 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  Simulated Voice Sandbox #402
                </span>
                <span className="text-emerald-400">Latency: 140ms</span>
              </div>

              {/* Animated Waveform bars */}
              <div className="flex items-center justify-center gap-1 h-6 py-1">
                {[12, 24, 8, 18, 30, 14, 22, 10, 28, 16, 20, 8, 26, 14, 18, 32, 10, 22].map((height, i) => (
                  <motion.span
                    key={i}
                    animate={{ height: activeScreeningWave ? [height * 0.4, height, height * 0.4] : 4 }}
                    transition={{ repeat: Infinity, duration: 0.8 + (i % 4) * 0.2, ease: "easeInOut" }}
                    className="w-1 bg-gradient-to-t from-violet-500 to-cyan-400 rounded-full"
                  />
                ))}
              </div>

              <div className="text-[11px] text-slate-300 bg-obsidian-900 p-2 rounded-lg font-mono">
                <span className="text-violet-400 font-semibold">AI Agent: </span>
                "Can you walk me through your p2p gossip protocol under 40% packet drop?"
              </div>
            </div>
          </motion.div>

          {/* Card 3: Cryptographic Zero-Knowledge Verification (Spans 2 cols / 1 on large) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onMouseEnter={() => soundFx.playBlip(1100)}
            className="md:col-span-2 lg:col-span-2 rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between group hover:border-emerald-400/40 transition-all"
          >
            <div>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-fit mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                Zero-Knowledge Skill Proofs
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-4">
                Verifies candidate identity, past repository contributions, and algorithmic execution without disclosing proprietary employer source code.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-950/80 border border-white/[0.06] font-mono text-[11px] space-y-1 text-slate-400">
              <div className="flex justify-between text-emerald-400">
                <span>ZK-SNARK Attestation</span>
                <span>STATUS: VALID</span>
              </div>
              <div className="truncate text-slate-500">Hash: 0x9b44a8e23f...912f</div>
              <div className="text-slate-400">Verified On: Ethereum & Sepolia L2</div>
            </div>
          </motion.div>

          {/* Card 4: Predictive Engineering Velocity & Bench Forecast (Spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onMouseEnter={() => soundFx.playBlip(1150)}
            className="md:col-span-2 lg:col-span-2 rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between group hover:border-amber-400/40 transition-all"
          >
            <div>
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit mb-4">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                Predictive Bench Capacity Engine
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-4">
                Forecasts hiring needs 3 months before bottlenecking. Simulates how adding specialized engineers impacts codebase PR throughput and release velocity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
              <div className="p-2.5 rounded-lg bg-obsidian-950/80 border border-white/[0.06]">
                <span className="text-slate-500 block text-[10px]">Projected Sprint Lift</span>
                <span className="text-emerald-400 font-bold text-sm">+4.8x Velocity</span>
              </div>
              <div className="p-2.5 rounded-lg bg-obsidian-950/80 border border-white/[0.06]">
                <span className="text-slate-500 block text-[10px]">Onboarding Ramp</span>
                <span className="text-cyan-400 font-bold text-sm">&lt; 3 Days to 1st PR</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
