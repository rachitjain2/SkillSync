import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, 
  Cpu, 
  Users, 
  Zap, 
  CheckCircle2, 
  Terminal, 
  ArrowRight,
  Code2,
  Sparkles,
  Layers
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export const WorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: 'Deep Codebase & Graph Ingestion',
      category: 'Stage 01 • Neural Parsing',
      icon: GitBranch,
      desc: 'The SkillSync Ingestion Engine indexes candidate repositories, commit trajectories, AST structures, and PR reviews into a 512-dimensional competency embedding.',
      codeSnippet: `// SkillSync Ingestion Pipeline
const candidateGraph = await SkillSync.ingest({
  repositories: ["org/inference-engine", "org/zk-rollup"],
  parseAST: true,
  extractCommitVelocity: true,
  dimensions: 512
});
// Extracted 1,420 verifiable code execution vectors`,
      telemetry: {
        latency: '3.2s',
        dataPoints: '1.4M AST Nodes',
        confidence: '99.8%'
      }
    },
    {
      id: 1,
      title: 'Autonomous Multi-Agent Sandbox Simulation',
      category: 'Stage 02 • Simulation',
      icon: Cpu,
      desc: 'Candidates are immersed in an interactive cloud sandbox. Autonomous AI agents simulate chaotic production incidents, evaluating real-time debugging, refactoring, and system architecture.',
      codeSnippet: `[AI Sentry Agent]: Triggering artificial p2p deadlock under 10k QPS...
[Candidate]: Identified race condition in Mutex lock guard at thread #4.
[Candidate]: Applied lock-free ring buffer patch with atomic CAS.
[Verification]: All 128 stress tests passed in 4.2ms. System restored.`,
      telemetry: {
        latency: '14.8s total',
        scenarios: '4 Production Chaos Tests',
        confidence: '99.4%'
      }
    },
    {
      id: 2,
      title: 'Predictive Velocity & Pod Synergy Alignment',
      category: 'Stage 03 • Team Dynamics',
      icon: Users,
      desc: 'Calculates how the engineer will harmonize with your existing engineering team. Predicts PR review turnaround, architecture consensus speed, and sprint velocity lift.',
      codeSnippet: `// Synergy Coefficient Matrix
const synergyScore = await NeuralPod.evaluateSynergy({
  candidate: "@elena_neuro",
  existingTeam: ["@lead_architect", "@staff_infra"],
  metrics: ["PR_Review_Velocity", "System_Consensus", "Mentorship"]
});
// Predicted Pod Lift: +3.8x sprint completion velocity`,
      telemetry: {
        latency: '1.8s',
        synergyIndex: '97.6%',
        confidence: '98.9%'
      }
    },
    {
      id: 3,
      title: 'Cryptographic Proof & Instant Pod Deployment',
      category: 'Stage 04 • Deployment',
      icon: Zap,
      desc: 'A Zero-Knowledge skill attestation is published to the chain. The candidate is granted verified credentials and provisioned into your development war room within minutes.',
      codeSnippet: `// Sepolia ZK-Rollup Proof Verification
const zkProof = ZKVerifier.verify({
  attestationHash: "0x7f9a...c43e",
  evaluatorSignature: "0xSKILLSYNC_AGENT_CLUSTER_04",
  status: "VERIFIED_DEPLOYABLE"
});
// War Room Provisioned: Slack #eng-war-room + GitHub Repo Access granted`,
      telemetry: {
        latency: '0.9s',
        zkProofStatus: 'On-Chain Verified',
        confidence: '100%'
      }
    }
  ];

  return (
    <section id="workflow" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Deterministic 4-Stage Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            How the Autonomous <br />
            <span className="text-gradient-purple">Talent OS Operates</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            From raw repository code ingestion to verified day-one deployment in under 48 hours.
          </p>
        </div>

        {/* Interactive Pipeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Step Selector List (Spans 5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              return (
                <div
                  key={step.id}
                  onClick={() => {
                    soundFx.playBlip(800 + step.id * 100);
                    setActiveStep(step.id);
                  }}
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'bg-gradient-to-r from-obsidian-900 to-obsidian-850 border-cyan-500/50 shadow-xl shadow-cyan-500/10'
                      : 'bg-obsidian-950/60 border-white/[0.05] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl transition-colors ${
                      isActive 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' 
                        : 'bg-obsidian-800 text-slate-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 mb-1">
                        {step.category}
                      </div>
                      <h4 className={`text-base font-bold mb-1.5 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-300'
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Step Execution & Code Terminal Visualizer (Spans 7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-panel border border-cyan-500/30 p-1 shadow-2xl shadow-cyan-950/40 overflow-hidden">
              {/* Terminal Window Header */}
              <div className="bg-obsidian-950 px-4 py-3 border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    pipeline://cluster-node-01/{steps[activeStep].category.toLowerCase().replace(/ /g, '-')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    EXECUTING
                  </span>
                </div>
              </div>

              {/* Code / Agent Log Area */}
              <div className="p-5 bg-obsidian-950/90 font-mono text-xs text-slate-200 overflow-x-auto min-h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <pre className="text-cyan-300 leading-relaxed font-mono whitespace-pre-wrap">
                      {steps[activeStep].codeSnippet}
                    </pre>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Step Telemetry Bar */}
              <div className="bg-obsidian-900/90 px-5 py-3 border-t border-white/[0.08] grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] block">Execution Time</span>
                  <span className="text-cyan-400 font-semibold">{steps[activeStep].telemetry.latency}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Telemetry Factor</span>
                  <span className="text-violet-400 font-semibold">{Object.values(steps[activeStep].telemetry)[1]}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Attestation Precision</span>
                  <span className="text-emerald-400 font-semibold">{steps[activeStep].telemetry.confidence}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
