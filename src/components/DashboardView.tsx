import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Sparkles, 
  Briefcase, 
  ArrowUpRight, 
  CheckCircle2, 
  FileText, 
  Bot, 
  Map, 
  ChevronRight, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Target, 
  Award,
  ExternalLink,
  Code2,
  Search,
  Bell,
  Settings,
  User,
  AlertCircle,
  GraduationCap,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { TalentProfile, JobOpportunity, RoadmapSprint } from '../types';
import { AppRoute } from './AppLayout';

interface DashboardViewProps {
  currentProfile: TalentProfile;
  opportunities: JobOpportunity[];
  roadmaps: RoadmapSprint[];
  onNavigate: (route: AppRoute) => void;
  onSelectOpportunity: (job: JobOpportunity) => void;
  onToggleTask: (sprintId: string, taskId: string) => void;
  onOpenCommandPalette?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentProfile,
  opportunities,
  roadmaps,
  onNavigate,
  onSelectOpportunity,
  onToggleTask,
  onOpenCommandPalette
}) => {
  // Determine dynamic time-of-day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = currentProfile.fullName.split(' ')[0] || 'Rachit';

  // Metrics calculations
  const totalSkillsCount = currentProfile.skills.length;
  const opportunitiesCount = opportunities.length || 14;
  const avgMatchScore = Math.round(
    opportunities.reduce((acc, curr) => acc + curr.matchScore, 0) / (opportunities.length || 1)
  ) || 89;
  const skillGapsCount = opportunities.reduce((acc, curr) => acc + curr.missingSkills.length, 0);

  // Top 5 skills for talent profile snapshot
  const topSkillsList = currentProfile.skills.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto space-y-7 pb-12">
      
      {/* 1. TOP PRODUCT HEADER (Embedded Context Bar) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-4 rounded-2xl glass-panel border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl"
      >
        {/* Left: User Profile & Target Role Quick Pill */}
        <div className="flex items-center gap-3.5">
          <div className="relative cursor-pointer" onClick={() => onNavigate('profile')}>
            <img
              src={currentProfile.avatar}
              alt={currentProfile.fullName}
              className="w-11 h-11 rounded-xl object-cover border-2 border-sky-400 shadow-md shadow-sky-500/20"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#090D15]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white cursor-pointer hover:text-sky-300 transition-colors" onClick={() => onNavigate('profile')}>
                {currentProfile.fullName}
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-sky-500/15 text-sky-300 border border-sky-400/30 rounded-full font-semibold">
                {currentProfile.handle}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Target: <strong className="text-slate-200">{currentProfile.targetRole}</strong></span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">{currentProfile.overallMatchReadiness}% Match Ready</span>
            </div>
          </div>
        </div>

        {/* Right: AI Status, Search, Notifications, Settings Shortcuts */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* AI Status Badge */}
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Status: Active & Calibrated</span>
          </div>

          {/* Quick Search */}
          {onOpenCommandPalette && (
            <button
              onClick={() => {
                soundFx.playSwitch();
                onOpenCommandPalette();
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search (⌘K)</span>
            </button>
          )}

          {/* Settings Button */}
          <button
            onClick={() => {
              soundFx.playBlip(900);
              onNavigate('settings');
            }}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Open Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* 2. WELCOME SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="p-6 sm:p-8 rounded-3xl glass-panel border border-sky-400/25 shadow-2xl relative overflow-hidden bg-gradient-to-br from-sky-500/[0.06] via-indigo-500/[0.03] to-transparent"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs font-semibold text-sky-300">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>SkillSync Talent Engine</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {getGreeting()}, {firstName} 👋
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-medium">
              Your AI career overview is ready.
            </p>
          </div>

          {/* Key Status Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.08]">
              <span className="text-[11px] text-slate-400 font-medium block mb-1">Profile Completeness</span>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-white font-mono">94%</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-semibold">High</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.08]">
              <span className="text-[11px] text-slate-400 font-medium block mb-1">Resume Status</span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Analyzed & Synced</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.08]">
              <span className="text-[11px] text-slate-400 font-medium block mb-1">Current Target Role</span>
              <span className="text-xs font-bold text-sky-300 truncate block">{currentProfile.targetRole}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. MAIN METRICS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Skills Identified */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -3 }}
          onClick={() => onNavigate('skills')}
          className="p-5 rounded-2xl glass-card border border-white/[0.08] hover:border-sky-400/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Skills Identified</span>
            <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
              <Code2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mb-0.5">
            {totalSkillsCount} Skills
          </div>
          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-0.5">
            <CheckCircle2 className="w-3 h-3" /> {currentProfile.skills.filter(s => s.verified).length} Verified by AI
          </span>
        </motion.div>

        {/* Metric 2: Opportunities Matched */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          whileHover={{ y: -3 }}
          onClick={() => onNavigate('opportunities')}
          className="p-5 rounded-2xl glass-card border border-white/[0.08] hover:border-emerald-400/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Opportunities Matched</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <Briefcase className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mb-0.5">
            {opportunitiesCount} Roles
          </div>
          <span className="text-[11px] text-sky-400 font-medium flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> Top Tier Tech Labs
          </span>
        </motion.div>

        {/* Metric 3: Average Match Score */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -3 }}
          onClick={() => onNavigate('opportunities')}
          className="p-5 rounded-2xl glass-card border border-white/[0.08] hover:border-indigo-400/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Average Match Score</span>
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mb-0.5">
            {avgMatchScore}% Match
          </div>
          <span className="text-[11px] text-indigo-300 font-medium">
            Top 1.2% Percentile
          </span>
        </motion.div>

        {/* Metric 4: Skill Gaps Identified */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          whileHover={{ y: -3 }}
          onClick={() => onNavigate('roadmap')}
          className="p-5 rounded-2xl glass-card border border-white/[0.08] hover:border-amber-400/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Skill Gaps Identified</span>
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Target className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mb-0.5">
            {skillGapsCount || 3} Gaps
          </div>
          <span className="text-[11px] text-amber-300 font-medium flex items-center gap-0.5">
            Roadmap Available →
          </span>
        </motion.div>
      </div>

      {/* 4. AI TALENT PROFILE SNAPSHOT + AI INSIGHT & NEXT ACTION (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left (5 Cols): AI TALENT PROFILE SNAPSHOT */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-5 p-6 sm:p-7 rounded-3xl glass-panel border border-white/[0.08] space-y-5 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                  <User className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-white">AI Talent Profile</h3>
              </div>
              <span className="px-2.5 py-0.5 text-[11px] rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono font-semibold">
                Verified Dossier
              </span>
            </div>

            {/* Candidate Details */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-white/[0.05]">
                <span className="text-slate-400 font-medium">Candidate:</span>
                <span className="text-white font-bold">{currentProfile.fullName}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-white/[0.05]">
                <span className="text-slate-400 font-medium">Target Role:</span>
                <span className="text-sky-300 font-bold">{currentProfile.targetRole}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-white/[0.05]">
                <span className="text-slate-400 font-medium">Experience:</span>
                <span className="text-slate-200 font-semibold">Student / Fresher</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0A66C2]/[0.08] border border-[#0A66C2]/30">
                <span className="text-slate-300 font-medium flex items-center gap-1.5 text-xs">
                  <span className="font-bold text-[#0A66C2]">in</span> LinkedIn Verified:
                </span>
                <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Synced
                </span>
              </div>
            </div>

            {/* Top Skills Chips */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Top Core Skills:
              </span>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Machine Learning', 'C++', 'SQL', 'AI & Deep Learning'].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-300 border border-sky-400/25 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA: View Full Profile */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              soundFx.playSuccess();
              onNavigate('profile');
            }}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-white/10 hover:border-sky-400/40 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>View Full Profile</span>
            <ChevronRight className="w-4 h-4 text-sky-400" />
          </motion.button>
        </motion.div>

        {/* Right (7 Cols): AI INSIGHT CARD & NEXT ACTION */}
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
          
          {/* AI Insight Card: "Your strongest advantage" */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-6 sm:p-7 rounded-3xl glass-panel border border-sky-400/30 bg-gradient-to-br from-sky-500/[0.08] to-indigo-500/[0.04] space-y-3 shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center gap-2.5 text-sky-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>AI Career Insight</span>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Your strongest advantage
            </h3>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              "Your combination of <strong>Python + Machine Learning + C++ + SQL</strong> and practical project experience makes you highly suitable for AI/ML internships and foundational research positions."
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-sky-300 font-mono">
              <span>Verified Strengths:</span>
              <span className="px-2 py-0.5 rounded bg-sky-500/15 border border-sky-400/30">Algorithms</span>
              <span className="px-2 py-0.5 rounded bg-sky-500/15 border border-sky-400/30">Neural Networks</span>
              <span className="px-2 py-0.5 rounded bg-sky-500/15 border border-sky-400/30">Data Pipelines</span>
            </div>
          </motion.div>

          {/* Next Action Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 sm:p-7 rounded-3xl glass-panel border border-violet-400/30 bg-gradient-to-br from-violet-500/[0.08] to-indigo-500/[0.04] space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-violet-300 text-xs font-bold uppercase tracking-wider">
                <Target className="w-4 h-4 text-violet-400" />
                <span>Recommended Next Action</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                +8-12% Match Boost
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              Improve your <strong className="text-white">AWS Cloud Deployment & SageMaker</strong> skills to increase your average match score by an estimated <span className="text-emerald-400 font-bold font-mono">8-12%</span> across Tier-1 AI roles.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                soundFx.playSuccess();
                onNavigate('roadmap');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl shimmer-btn text-slate-950 text-xs font-extrabold shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Learning Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* 5. TOP OPPORTUNITIES SECTION */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Briefcase className="w-5 h-5 text-sky-400" />
              Top Matched Opportunities
            </h2>
            <p className="text-xs text-slate-400">
              Personalized matches calculated using real-time skill alignment and experience diagnostics.
            </p>
          </div>

          <button
            onClick={() => onNavigate('opportunities')}
            className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Opportunities ({opportunities.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Opportunity Cards List (3-5 Cards) */}
        <div className="grid grid-cols-1 gap-4">
          {opportunities.slice(0, 4).map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + idx * 0.05 }}
              whileHover={{ y: -2 }}
              className="p-6 rounded-2xl glass-card border border-white/[0.08] hover:border-sky-400/40 transition-all shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
            >
              {/* Left Details */}
              <div className="flex items-start gap-4">
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="w-14 h-14 rounded-2xl object-cover border border-white/10 shadow-md shrink-0"
                />

                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                      {job.title}
                    </h3>
                    <span className="text-xs font-bold text-sky-400">{job.company}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                      {job.location}
                    </span>
                  </div>

                  {/* Matching & Missing Skills Display */}
                  <div className="space-y-1.5 pt-1">
                    {/* Strong Matches */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="text-emerald-400 font-semibold text-[11px]">Strong matches:</span>
                      {job.matchedSkills.slice(0, 4).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-medium"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>

                    {/* Skill Gaps */}
                    {job.missingSkills.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="text-amber-400 font-semibold text-[11px]">Skill gap:</span>
                        {job.missingSkills.map((gap, gIdx) => (
                          <span
                            key={gIdx}
                            className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px] font-medium"
                          >
                            ! {gap.skillName}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Match Percentage & CTA */}
              <div className="flex lg:flex-col items-center lg:items-end justify-between shrink-0 gap-3 border-t lg:border-t-0 pt-3 lg:pt-0 border-white/[0.06]">
                <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-sm font-extrabold font-mono inline-flex items-center gap-1.5 shadow-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>{job.matchScore}% Match</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    soundFx.playBlip(1000);
                    onSelectOpportunity(job);
                    onNavigate('match-analysis');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-sky-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <span>View AI Analysis</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};
