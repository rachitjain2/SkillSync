import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Terminal, 
  Sparkles, 
  Cpu, 
  Activity, 
  Code2, 
  Zap, 
  CheckCircle, 
  Fingerprint, 
  ExternalLink,
  ChevronRight,
  Filter,
  Play
} from 'lucide-react';
import { MOCK_CANDIDATES } from '../utils/mockData';
import { Candidate } from '../types';
import { soundFx } from '../utils/audio';

interface InteractivePlaygroundProps {
  selectedCandidate: Candidate | null;
  onSelectCandidate: (candidate: Candidate) => void;
}

export const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({
  selectedCandidate,
  onSelectCandidate,
}) => {
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>(
    selectedCandidate || MOCK_CANDIDATES[0]
  );
  const [isSimulatingChallenge, setIsSimulatingChallenge] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);

  const domains = [
    { id: 'all', label: 'All Verified Nodes' },
    { id: 'distributed', label: 'Distributed Systems' },
    { id: 'agents', label: 'Autonomous Agents' },
    { id: 'graphics', label: 'Neural UI & WebGPU' },
    { id: 'crypto', label: 'Cryptographic ZK' },
  ];

  const handleSelect = (candidate: Candidate) => {
    soundFx.playBlip(1000);
    setCurrentCandidate(candidate);
    onSelectCandidate(candidate);
    setSimLogs([]);
    setIsSimulatingChallenge(false);
  };

  const handleRunSimulation = () => {
    soundFx.playSuccess();
    setIsSimulatingChallenge(true);
    setSimLogs(['[Agent Cluster]: Initializing isolated Docker kernel sandbox...']);

    const steps = [
      '[Agent Sentry]: Injecting distributed lock contention simulation...',
      `[Candidate]: ${currentCandidate.name} analyzing memory allocation in LLVM IR...`,
      '[Candidate]: Applied zero-allocation buffer synchronization (0.8ms latency).',
      '[ZK Verifier]: Generated proof hash on Sepolia Testnet.',
      '[Result]: Score 100/100. Verification Complete. Ready for Day-1 Deployment.'
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        soundFx.playPulse();
        setSimLogs(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          setIsSimulatingChallenge(false);
        }
      }, (idx + 1) * 600);
    });
  };

  return (
    <section id="sandbox" className="py-24 relative overflow-hidden bg-obsidian-950/60">
      {/* Background Lights */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Talent Sandbox</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Inspect Verified Engineers <br />
            <span className="text-gradient-cyan">In Real-Time</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            Click any verified engineer node to inspect cryptographic proofs, telemetry metrics, and trigger a live technical simulation.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 mb-4 no-scrollbar">
          {domains.map((dom) => (
            <button
              key={dom.id}
              onClick={() => {
                soundFx.playSwitch();
                setFilterDomain(dom.id);
              }}
              className={`text-xs px-4 py-2 rounded-full font-medium transition-all duration-200 border whitespace-nowrap ${
                filterDomain === dom.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-500/20'
                  : 'bg-obsidian-900/80 text-slate-400 border-white/[0.08] hover:text-slate-200'
              }`}
            >
              {dom.label}
            </button>
          ))}
        </div>

        {/* Sandbox Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Candidate Node Selector List (Spans 5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {MOCK_CANDIDATES.map((cand) => {
              const isSelected = currentCandidate.id === cand.id;
              return (
                <div
                  key={cand.id}
                  onClick={() => handleSelect(cand)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-obsidian-900/95 border-cyan-400 shadow-xl shadow-cyan-500/15 ring-1 ring-cyan-400/40'
                      : 'bg-obsidian-950/70 border-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={cand.avatar}
                          alt={cand.name}
                          className="w-12 h-12 rounded-xl object-cover border border-cyan-500/40"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-obsidian-950 flex items-center justify-center">
                          <CheckCircle className="w-2.5 h-2.5 text-black stroke-[3]" />
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          {cand.name}
                          <span className="text-[11px] font-mono font-normal text-slate-400">
                            {cand.handle}
                          </span>
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1">{cand.role}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        {cand.matchScore}%
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Candidate Deep Dossier Inspector (Spans 7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-panel border border-cyan-500/30 p-6 sm:p-8 shadow-2xl shadow-cyan-950/30">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-4">
                  <img
                    src={currentCandidate.avatar}
                    alt={currentCandidate.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400 shadow-lg shadow-cyan-500/20"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">{currentCandidate.name}</h3>
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        ZK-Attested
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{currentCandidate.role}</p>
                    <p className="text-[11px] text-cyan-400 font-mono mt-1 flex items-center gap-1">
                      <Fingerprint className="w-3.5 h-3.5" />
                      {currentCandidate.zeroKnowledgeHash}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 bg-obsidian-900/80 p-3 rounded-xl border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-400">Match Confidence</span>
                  <span className="text-xl font-extrabold font-mono text-cyan-400">
                    {currentCandidate.matchScore}%
                  </span>
                </div>
              </div>

              {/* Verified Metrics Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                <div className="p-3 rounded-xl bg-obsidian-950/80 border border-white/[0.06] text-center">
                  <span className="text-[10px] font-mono text-slate-500 block mb-1">Code Velocity</span>
                  <span className="text-sm font-bold text-white font-mono">{currentCandidate.metrics.codeVelocity}</span>
                </div>
                <div className="p-3 rounded-xl bg-obsidian-950/80 border border-white/[0.06] text-center">
                  <span className="text-[10px] font-mono text-slate-500 block mb-1">Algorithmic Rank</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">{currentCandidate.metrics.algorithmicRank}</span>
                </div>
                <div className="p-3 rounded-xl bg-obsidian-950/80 border border-white/[0.06] text-center">
                  <span className="text-[10px] font-mono text-slate-500 block mb-1">System Design</span>
                  <span className="text-sm font-bold text-cyan-400 font-mono">{currentCandidate.metrics.systemDesignScore}</span>
                </div>
                <div className="p-3 rounded-xl bg-obsidian-950/80 border border-white/[0.06] text-center">
                  <span className="text-[10px] font-mono text-slate-500 block mb-1">AI Pairing Prof.</span>
                  <span className="text-sm font-bold text-violet-400 font-mono">{currentCandidate.metrics.aiPairingProficiency}</span>
                </div>
              </div>

              {/* Skills Progress */}
              <div className="space-y-3 mb-6">
                <div className="text-xs font-mono text-slate-300 flex items-center justify-between">
                  <span>Cryptographically Attested Skill Breakdown</span>
                  <span className="text-cyan-400">Sepolia L2 Validated</span>
                </div>
                {currentCandidate.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">{skill.name}</span>
                      <span className="text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-obsidian-950 rounded-full overflow-hidden border border-white/[0.05]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.6, delay: sIdx * 0.1 }}
                        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Screening Summary Note */}
              <div className="p-4 rounded-xl bg-obsidian-950/80 border border-cyan-500/20 mb-6">
                <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 mb-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  Autonomous Agent Assessment
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {currentCandidate.aiScreeningSummary}
                </p>
              </div>

              {/* Interactive Simulation Sandbox Trigger */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulatingChallenge}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSimulatingChallenge ? (
                    <>
                      <Activity className="w-4 h-4 animate-spin" />
                      <span>Simulating Real-World Challenge...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Run Live Sandbox Test</span>
                    </>
                  )}
                </button>

                <a
                  href="#pricing"
                  onClick={() => soundFx.playSuccess()}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-200 bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 hover:border-cyan-400 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Provision War Room</span>
                </a>
              </div>

              {/* Live Simulation Logs Output */}
              {simLogs.length > 0 && (
                <div className="mt-4 p-3 rounded-xl bg-black border border-cyan-500/30 font-mono text-[11px] space-y-1 max-h-36 overflow-y-auto">
                  {simLogs.map((log, lIdx) => (
                    <div key={lIdx} className="text-cyan-300">
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
