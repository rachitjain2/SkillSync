import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  Layers, 
  ArrowUpRight, 
  Target, 
  Award, 
  Zap,
  CheckCircle2
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { TalentProfile, SkillAnalysisCategory } from '../types';
import { MOCK_SKILL_ANALYSIS } from '../utils/mockData';
import { AppRoute } from './AppLayout';

interface SkillAnalysisViewProps {
  currentProfile: TalentProfile;
  onNavigate: (route: AppRoute) => void;
  onAddSkillToRoadmap?: (skillName: string) => void;
}

export const SkillAnalysisView: React.FC<SkillAnalysisViewProps> = ({
  currentProfile,
  onNavigate,
  onAddSkillToRoadmap
}) => {
  const categories: SkillAnalysisCategory[] = MOCK_SKILL_ANALYSIS;

  const missingSkillsHighROI = [
    {
      skill: 'WebAssembly (Wasm) Sandboxed Execution',
      category: 'Frontend & Systems',
      potentialScoreGain: '+4.2%',
      demand: 'Top 1% Frontier AI Labs',
      rolesUnlocked: 'Senior AI Full-Stack @ Anthropic, Lead @ Vercel',
      timeToLearn: '10 - 14 Days'
    },
    {
      skill: 'CRDTs & Local-First State Sync (Yjs / ElectricSQL)',
      category: 'Distributed Systems',
      potentialScoreGain: '+3.8%',
      demand: 'Top 2% Product Engineering',
      rolesUnlocked: 'Staff Platform @ Linear',
      timeToLearn: '2 - 3 Weeks'
    },
    {
      skill: 'Custom Triton GPU Kernels & KV-Cache Acceleration',
      category: 'AI & Inference Systems',
      potentialScoreGain: '+6.5%',
      demand: 'Top 0.5% Compute Platforms',
      rolesUnlocked: 'Distributed Inference Architect @ Scale AI',
      timeToLearn: '3 - 4 Weeks'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Skill Matrix & Market Gap Radar
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Multi-dimensional evaluation comparing your competencies against current market standards across 45,000+ engineers.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            soundFx.playSuccess();
            onNavigate('roadmap');
          }}
          className="px-5 py-2.5 rounded-xl shimmer-btn text-slate-950 text-xs font-bold shadow-lg shadow-sky-500/20 flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span>Launch Learning Roadmap</span>
        </motion.button>
      </div>

      {/* 3 Core Overview Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-6 rounded-2xl glass-card border border-white/[0.08]">
          <span className="text-xs font-semibold text-slate-400 block mb-2">Overall Algorithmic Percentile</span>
          <div className="text-3xl font-extrabold font-mono text-sky-400 mb-1">{currentProfile.metrics.algorithmicRank}</div>
          <p className="text-xs text-slate-300">Scored higher than 98.8% of global full-stack AI candidates in automated coding simulations.</p>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-6 rounded-2xl glass-card border border-white/[0.08]">
          <span className="text-xs font-semibold text-slate-400 block mb-2">Code Velocity Multiplier</span>
          <div className="text-3xl font-extrabold font-mono text-emerald-400 mb-1">{currentProfile.metrics.codeVelocity}</div>
          <p className="text-xs text-slate-300">Measured commit-to-production throughput with AI pairing workflows.</p>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-6 rounded-2xl glass-card border border-white/[0.08]">
          <span className="text-xs font-semibold text-slate-400 block mb-2">System Design Score</span>
          <div className="text-3xl font-extrabold font-mono text-indigo-400 mb-1">{currentProfile.metrics.systemDesignScore}</div>
          <p className="text-xs text-slate-300">Validated across distributed queue design and asynchronous streaming architectures.</p>
        </motion.div>
      </div>

      {/* Category Benchmark Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-sky-400" />
          Competency Domain Benchmarks
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-4 hover:border-sky-400/30 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-white">{cat.category}</h4>
                  <span className="text-xs text-slate-400">{cat.skillsCount} verified competencies</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-extrabold text-sky-300 font-mono">{cat.overallScore}/100</div>
                  <div className="text-[11px] text-emerald-400 font-semibold">{cat.marketPercentile}th Percentile</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 rounded-full transition-all duration-700"
                  style={{ width: `${cat.overallScore}%` }}
                />
              </div>

              {/* Top Skills Tags */}
              <div>
                <span className="text-xs font-medium text-slate-400 block mb-2">Dominant Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.topSkills.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-0.5 rounded-md bg-slate-950 text-slate-200 border border-white/[0.08]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Assessment Note */}
              <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/[0.04]">
                "{cat.growthPotential}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Highest ROI Skill Gaps to Close */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" />
            High-ROI Skill Acquisition Targets
          </h3>
          <p className="text-xs text-slate-400">
            Closing these identified gaps will maximize your match percentages across Tier-1 opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {missingSkillsHighROI.map((gap, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl glass-panel border border-amber-500/25 bg-gradient-to-b from-amber-500/[0.02] to-transparent space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {gap.category}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400 font-mono">{gap.potentialScoreGain} Match</span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-white leading-snug">{gap.skill}</h4>
                <p className="text-xs text-slate-300">Unlocks: <strong className="text-sky-300 font-medium">{gap.rolesUnlocked}</strong></p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Est. Time: <strong className="text-slate-200">{gap.timeToLearn}</strong></span>
                  <span className="text-amber-300/90 font-medium">{gap.demand}</span>
                </div>

                <button
                  onClick={() => {
                    soundFx.playSuccess();
                    if (onAddSkillToRoadmap) onAddSkillToRoadmap(gap.skill);
                    onNavigate('roadmap');
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-sky-400/40 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-sky-400" />
                  <span>Add to Learning Roadmap</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
