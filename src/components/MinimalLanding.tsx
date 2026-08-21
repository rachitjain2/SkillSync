import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Briefcase, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  ChevronRight, 
  Bot, 
  Zap,
  Star,
  Users
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { TalentProfile } from '../types';
import { AppRoute } from './AppLayout';

interface MinimalLandingProps {
  onNavigate: (route: AppRoute) => void;
  currentProfile: TalentProfile;
  onSelectPersona: (personaKey: string) => void;
}

export const MinimalLanding: React.FC<MinimalLandingProps> = ({
  onNavigate,
  currentProfile,
  onSelectPersona
}) => {
  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col justify-between py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      {/* Top Floating Badge */}
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 260 }}
          whileHover={{ scale: 1.03 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-sky-400/30 text-xs font-mono text-sky-300 shadow-xl shadow-sky-500/10 backdrop-blur-md cursor-default"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
          </span>
          <span className="font-semibold text-slate-200">SkillSync AI Talent Platform</span>
          <span className="text-slate-500">•</span>
          <span className="text-sky-300">Intelligent Matchmaking</span>
        </motion.div>
      </div>

      {/* Main Minimal Hero */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 180 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12] mb-6"
        >
          Your Skills. Your Opportunities.{' '}
          <span className="text-gradient-hero drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]">
            Matched by AI.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10"
        >
          SkillSync AI understands your skills and connects you with opportunities you actually qualify for.
        </motion.p>

        {/* Primary Action Buttons with Spring Micro-Interactions */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              soundFx.playSuccess();
              onNavigate('resume');
            }}
            className="px-8 py-4 rounded-xl font-bold text-base text-slate-950 shimmer-btn shadow-xl shadow-sky-500/20 active:scale-95 transition-all flex items-center gap-2.5 group cursor-pointer"
          >
            <FileText className="w-5 h-5 text-slate-950 fill-current" />
            <span>Analyze My Resume</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              soundFx.playBlip(800);
              onNavigate('opportunities');
            }}
            className="px-7 py-4 rounded-xl font-semibold text-base text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-sky-400/40 shadow-lg backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-sky-400" />
            <span>Explore Opportunities</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Interactive Live Persona Explorer Card */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-4xl mx-auto w-full mb-8"
      >
        <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Top Row: Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-400/30 flex items-center justify-center shadow-inner">
                <Sparkles className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">Interactive Candidate Preview</h3>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full font-semibold">
                    Real-time Data
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Switch candidate profiles to test instant match scores & personalized roadmap generation
                </p>
              </div>
            </div>

            {/* Persona Switcher Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-white/[0.08]">
              <button
                onClick={() => {
                  soundFx.playSwitch();
                  onSelectPersona('rachit-jain');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  currentProfile.id === 'rachit-jain'
                    ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Rachit Jain (AI/ML Intern)
              </button>
              <button
                onClick={() => {
                  soundFx.playSwitch();
                  onSelectPersona('alex-rivera');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  currentProfile.id === 'alex-rivera'
                    ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Alex Rivera (Senior AI)
              </button>
              <button
                onClick={() => {
                  soundFx.playSwitch();
                  onSelectPersona('sarah-lin');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  currentProfile.id === 'sarah-lin'
                    ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sarah Lin (ML Infra)
              </button>
            </div>
          </div>

          {/* Active Candidate Snapshot Grid */}
          <div className="pt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-white/[0.05]">
              <span className="text-slate-400 block text-[11px] mb-1">Target Engineering Role</span>
              <span className="text-white font-semibold truncate block">{currentProfile.targetRole}</span>
            </div>
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-white/[0.05]">
              <span className="text-slate-400 block text-[11px] mb-1">AI Match Readiness</span>
              <span className="text-sky-400 font-bold flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {currentProfile.overallMatchReadiness}% Verified Match
              </span>
            </div>
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-white/[0.05] flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px] mb-0.5">Active Roadmap</span>
                <span className="text-emerald-400 font-semibold">3 Sprints Configured</span>
              </div>
              <button
                onClick={() => {
                  soundFx.playBlip(900);
                  onNavigate('dashboard');
                }}
                className="px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <span>Launch App</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Humanized Feature Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full">
        {[
          { label: 'Instant Resume Parser', detail: 'Parses skills, experience & repositories in seconds' },
          { label: 'Transparent Match Rationale', detail: 'Explains exactly why you match & what skills are missing' },
          { label: 'Personalized Roadmaps', detail: 'Curated weekly sprints to qualify for top roles' },
          { label: 'AI Career Copilot', detail: 'Interactive interview coaching & offer negotiation' },
        ].map((item, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-slate-900/40 border border-white/[0.06] text-center">
            <span className="text-xs font-semibold text-slate-200 block mb-0.5">{item.label}</span>
            <span className="text-[11px] text-slate-400 block">{item.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
