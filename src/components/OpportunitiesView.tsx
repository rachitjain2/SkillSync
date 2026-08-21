import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Bookmark, 
  BookmarkCheck, 
  ChevronRight, 
  X, 
  MapPin, 
  DollarSign, 
  Bot, 
  Map, 
  Send, 
  TrendingUp, 
  Building,
  Target,
  ArrowRight,
  SlidersHorizontal,
  ArrowUpDown,
  Filter,
  Check,
  Cpu,
  Layers,
  Award,
  Clock,
  Globe
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { JobOpportunity, TalentProfile } from '../types';
import { AppRoute } from './AppLayout';

interface OpportunitiesViewProps {
  opportunities: JobOpportunity[];
  currentProfile: TalentProfile;
  selectedOpportunity: JobOpportunity | null;
  onSelectOpportunity: (job: JobOpportunity | null) => void;
  onApplyOpportunity: (jobId: string) => void;
  onToggleSaveOpportunity: (jobId: string) => void;
  onGenerateCustomRoadmap: (job: JobOpportunity) => void;
  onNavigate: (route: AppRoute) => void;
  onAskCopilotAboutJob: (job: JobOpportunity) => void;
}

type SortOption = 'best-match' | 'newest' | 'skill-gap' | 'most-relevant';

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  opportunities,
  currentProfile,
  selectedOpportunity,
  onSelectOpportunity,
  onApplyOpportunity,
  onToggleSaveOpportunity,
  onGenerateCustomRoadmap,
  onNavigate,
  onAskCopilotAboutJob
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [remoteFilter, setRemoteFilter] = useState<'all' | 'Remote' | 'Hybrid' | 'On-Site'>('all');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');
  const [matchFilter, setMatchFilter] = useState<'all' | '90' | '85' | '80'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('best-match');
  const [appliedToast, setAppliedToast] = useState<string | null>(null);

  // Filter and sort opportunities
  const filteredAndSortedOpportunities = useMemo(() => {
    let result = opportunities.filter((job) => {
      // Search query
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.matchedSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Role filter
      const matchesRole = 
        roleFilter === 'all' ? true :
        roleFilter === 'intern' ? job.title.toLowerCase().includes('intern') :
        roleFilter === 'research' ? (job.title.toLowerCase().includes('scientist') || job.title.toLowerCase().includes('research')) :
        roleFilter === 'systems' ? (job.title.toLowerCase().includes('systems') || job.title.toLowerCase().includes('data')) :
        true;

      // Location filter
      const matchesLocation = 
        locationFilter === 'all' ? true :
        locationFilter === 'us' ? (job.location.includes('WA') || job.location.includes('CA') || job.location.includes('San Francisco')) :
        locationFilter === 'india' ? job.location.includes('Bangalore') :
        locationFilter === 'europe' ? job.location.includes('London') :
        true;

      // Remote filter
      const matchesRemote = remoteFilter === 'all' ? true : job.workStyle === remoteFilter;

      // Experience filter
      const matchesExp = 
        experienceFilter === 'all' ? true :
        experienceFilter === 'intern' ? job.title.toLowerCase().includes('intern') :
        job.experienceLevel === experienceFilter;

      // Match score filter
      const matchesScore = 
        matchFilter === 'all' ? true :
        matchFilter === '90' ? job.matchScore >= 90 :
        matchFilter === '85' ? job.matchScore >= 85 :
        job.matchScore >= 80;

      return matchesSearch && matchesRole && matchesLocation && matchesRemote && matchesExp && matchesScore;
    });

    // Sorting algorithm
    result.sort((a, b) => {
      if (sortBy === 'best-match') {
        return b.matchScore - a.matchScore;
      }
      if (sortBy === 'newest') {
        const order: Record<string, number> = { 'Just now': 1, '1 day ago': 2, '2 days ago': 3, '3 days ago': 4, '4 days ago': 5, '5 days ago': 6 };
        return (order[a.postedAt] || 10) - (order[b.postedAt] || 10);
      }
      if (sortBy === 'skill-gap') {
        return a.missingSkills.length - b.missingSkills.length;
      }
      if (sortBy === 'most-relevant') {
        return (b.matchBreakdown.domainFit + b.matchBreakdown.projectRelevance) - (a.matchBreakdown.domainFit + a.matchBreakdown.projectRelevance);
      }
      return 0;
    });

    return result;
  }, [opportunities, searchQuery, roleFilter, locationFilter, remoteFilter, experienceFilter, matchFilter, sortBy]);

  const handleApplyClick = (job: JobOpportunity) => {
    soundFx.playSuccess();
    onApplyOpportunity(job.id);
    setAppliedToast(`Application submitted to ${job.company} for ${job.title}!`);
    setTimeout(() => setAppliedToast(null), 3500);
  };

  // Helper for Circular SVG Progress Gauge
  const renderRadialScore = (score: number, size = 68, strokeWidth = 5) => {
    const radius = (size - strokeWidth * 2) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-slate-800/80"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={`${
              score >= 90 ? 'stroke-emerald-400' : score >= 85 ? 'stroke-sky-400' : 'stroke-indigo-400'
            } transition-all duration-1000 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute text-center flex flex-col items-center justify-center">
          <span className="text-xs sm:text-sm font-extrabold text-white font-mono leading-none">
            {score}%
          </span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">
            Match
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-7 pb-16 relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {appliedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="fixed top-20 right-8 z-50 p-4 rounded-2xl bg-emerald-500 text-slate-950 font-extrabold text-xs shadow-2xl flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-5 h-5 text-slate-950" />
            <span>{appliedToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. TOP HEADER & EXPLAINABILITY HERO */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 sm:p-8 rounded-3xl glass-panel border border-sky-400/20 shadow-2xl relative overflow-hidden bg-gradient-to-br from-sky-500/[0.05] via-indigo-500/[0.03] to-transparent"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs font-semibold text-sky-300">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>AI-Powered Explainable Matchmaker</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Opportunities matched to your skills
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Every match score is calculated against <strong className="text-white">{currentProfile.fullName}’s</strong> verified technical skills, project repositories, and target role criteria.
            </p>
          </div>

          {/* Real-time Matching Summary Pill */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] flex items-center gap-4 text-xs shrink-0">
            <div>
              <span className="text-slate-400 block text-[11px]">Active Profile</span>
              <span className="text-white font-bold">{currentProfile.fullName}</span>
              <span className="text-sky-400 text-[11px] block">{currentProfile.targetRole}</span>
            </div>
            <div className="pl-4 border-l border-white/10 text-right">
              <span className="text-slate-400 block text-[11px]">Qualified Matches</span>
              <span className="text-emerald-400 font-extrabold text-base font-mono">{filteredAndSortedOpportunities.length} Roles</span>
              <span className="text-[10px] text-slate-400 font-mono">Live Attestation</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. FILTER CONTROLS & SEARCH BAR */}
      <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4 shadow-xl">
        
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role title, company, or technical stack (e.g. Python, PyTorch, C++, SQL, AWS)..."
            className="w-full bg-slate-950/90 border border-white/[0.08] focus:border-sky-400 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Multi-Dimensional Filter Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
          
          {/* Role Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Role Track</label>
            <select
              value={roleFilter}
              onChange={(e) => { soundFx.playSwitch(); setRoleFilter(e.target.value); }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-400 cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="intern">AI / ML Interns</option>
              <option value="research">Applied Research</option>
              <option value="systems">Data & Systems</option>
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Location</label>
            <select
              value={locationFilter}
              onChange={(e) => { soundFx.playSwitch(); setLocationFilter(e.target.value); }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-400 cursor-pointer"
            >
              <option value="all">All Locations</option>
              <option value="us">United States (SF/WA)</option>
              <option value="india">India (Bangalore)</option>
              <option value="europe">Europe (London)</option>
            </select>
          </div>

          {/* Remote Workstyle Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Workstyle</label>
            <select
              value={remoteFilter}
              onChange={(e) => { soundFx.playSwitch(); setRemoteFilter(e.target.value as any); }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-400 cursor-pointer"
            >
              <option value="all">All Workstyles</option>
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-Site">On-Site</option>
            </select>
          </div>

          {/* Experience Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Experience</label>
            <select
              value={experienceFilter}
              onChange={(e) => { soundFx.playSwitch(); setExperienceFilter(e.target.value); }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-400 cursor-pointer"
            >
              <option value="all">All Experience</option>
              <option value="intern">Intern / Fresher</option>
              <option value="Mid-Level">Mid-Level</option>
            </select>
          </div>

          {/* Match Score Threshold Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Match Score</label>
            <select
              value={matchFilter}
              onChange={(e) => { soundFx.playSwitch(); setMatchFilter(e.target.value as any); }}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-400 cursor-pointer"
            >
              <option value="all">All Scores</option>
              <option value="90">90%+ Match (Top Tier)</option>
              <option value="85">85%+ High Synergy</option>
              <option value="80">80%+ Compatible</option>
            </select>
          </div>

          {/* Sorting Dropdown */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3 text-sky-400" /> Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => { soundFx.playSwitch(); setSortBy(e.target.value as SortOption); }}
              className="w-full bg-slate-950 border border-sky-400/30 text-sky-300 font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-sky-400 cursor-pointer"
            >
              <option value="best-match">Best Match</option>
              <option value="newest">Newest</option>
              <option value="skill-gap">Fewest Skill Gaps</option>
              <option value="most-relevant">Most Relevant</option>
            </select>
          </div>

        </div>
      </div>

      {/* 3. OPPORTUNITY CARDS LIST (AI MATCH & EXPLAINABILITY) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1 text-xs text-slate-400 font-mono">
          <span>Showing {filteredAndSortedOpportunities.length} matched opportunities</span>
          <span>Sorted by: <strong className="text-sky-300 capitalize">{sortBy.replace('-', ' ')}</strong></span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredAndSortedOpportunities.map((job) => (
            <motion.div
              key={job.id}
              whileHover={{ y: -3 }}
              className="p-6 rounded-3xl glass-card border border-white/[0.08] hover:border-sky-400/40 transition-all shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
            >
              {/* Left Column: Company, Title, Location, Skills */}
              <div className="flex items-start gap-5 flex-1 min-w-0">
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="w-16 h-16 rounded-2xl object-cover border border-white/10 shadow-md shrink-0"
                />

                <div className="space-y-3 flex-1 min-w-0">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                        {job.title}
                      </h3>
                      <span className="text-xs font-bold text-sky-400">{job.company}</span>
                      {job.applied && (
                        <span className="px-2.5 py-0.5 text-[10px] rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                          Applied ✓
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 text-[11px]">
                        {job.workStyle}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">
                        {job.salaryRange}
                      </span>
                      <span>•</span>
                      <span className="text-slate-400">{job.postedAt}</span>
                    </div>
                  </div>

                  {/* Skill Match Section */}
                  <div className="space-y-1.5 pt-0.5">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="text-emerald-400 font-bold text-[11px] uppercase tracking-wider">Skill Match:</span>
                      {job.matchedSkills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 text-xs font-semibold flex items-center gap-1"
                        >
                          <span>{skill}</span>
                          <span className="text-emerald-400 font-bold">✓</span>
                        </span>
                      ))}
                    </div>

                    {/* Skill Gap Section */}
                    {job.missingSkills.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="text-amber-400 font-bold text-[11px] uppercase tracking-wider">Skill Gap:</span>
                        {job.missingSkills.map((gap, gIdx) => (
                          <span
                            key={gIdx}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/25 text-xs font-semibold flex items-center gap-1"
                          >
                            <span>{gap.skillName}</span>
                            <span className="text-[10px] text-amber-400/80 font-mono">({gap.difficultyToAcquire.split(' ')[0]})</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Prominent Radial Match Score & "See Why I Match" CTA */}
              <div className="flex lg:flex-col items-center lg:items-end justify-between shrink-0 gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-white/[0.06]">
                {/* Visually Prominent Radial Progress Indicator */}
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-bold text-white block">AI Match Score</span>
                    <span className="text-[11px] text-emerald-400 font-medium font-mono">Top Percentile</span>
                  </div>
                  {renderRadialScore(job.matchScore, 72, 6)}
                </div>

                {/* Primary CTA: "See Why I Match" */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    soundFx.playBlip(1000);
                    onSelectOpportunity(job);
                  }}
                  className="px-5 py-3 rounded-2xl shimmer-btn text-slate-950 text-xs font-extrabold shadow-lg shadow-sky-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current text-slate-950" />
                  <span>See Why I Match</span>
                  <ChevronRight className="w-4 h-4 text-slate-950" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. DETAILED AI MATCH ANALYSIS SLIDE-OVER DRAWER */}
      <AnimatePresence>
        {selectedOpportunity && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onSelectOpportunity(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="relative w-full max-w-2xl bg-[#090D15] border-l border-white/10 h-full overflow-y-auto p-6 sm:p-8 space-y-6 z-10 shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <img
                    src={selectedOpportunity.companyLogo}
                    alt={selectedOpportunity.company}
                    className="w-14 h-14 rounded-2xl object-cover border border-white/10"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedOpportunity.title}</h3>
                    <p className="text-xs text-sky-400 font-semibold">{selectedOpportunity.company} • {selectedOpportunity.location} ({selectedOpportunity.workStyle})</p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectOpportunity(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 border border-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Match Score & 4-Factor Circular Progress Breakdown */}
              <div className="p-6 rounded-3xl glass-panel border border-sky-400/30 space-y-5 bg-gradient-to-br from-sky-500/[0.06] to-indigo-500/[0.04]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-sky-400" />
                    <span className="text-sm font-bold text-white">AI Match Score & Vector Breakdown</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-extrabold font-mono text-emerald-400">
                      {selectedOpportunity.matchScore}% Match
                    </span>
                    <button
                      onClick={() => {
                        soundFx.playSuccess();
                        onNavigate('match-analysis' as any);
                      }}
                      className="px-3 py-1 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/40 text-xs font-bold hover:bg-sky-500/30 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Full Analysis</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-white/[0.06] flex flex-col items-center space-y-1.5">
                    {renderRadialScore(selectedOpportunity.matchBreakdown.skillMatch, 52, 4)}
                    <span className="text-slate-300 font-semibold text-xs">Technical Skills</span>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-white/[0.06] flex flex-col items-center space-y-1.5">
                    {renderRadialScore(selectedOpportunity.matchBreakdown.experienceAlignment, 52, 4)}
                    <span className="text-slate-300 font-semibold text-xs">Experience Fit</span>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-white/[0.06] flex flex-col items-center space-y-1.5">
                    {renderRadialScore(selectedOpportunity.matchBreakdown.projectRelevance, 52, 4)}
                    <span className="text-slate-300 font-semibold text-xs">Projects Synergy</span>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-white/[0.06] flex flex-col items-center space-y-1.5">
                    {renderRadialScore(selectedOpportunity.matchBreakdown.domainFit, 52, 4)}
                    <span className="text-slate-300 font-semibold text-xs">Domain Synergy</span>
                  </div>
                </div>
              </div>

              {/* AI "Why You Match" Rationale */}
              <div className="p-6 rounded-3xl bg-sky-500/[0.05] border border-sky-400/25 space-y-3">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
                  AI Match Rationale & Why You Stand Out:
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {selectedOpportunity.aiRationale}
                </p>

                <div className="pt-2 space-y-2">
                  <span className="text-xs font-semibold text-slate-400 block">
                    Key Strength Highlights:
                  </span>
                  {selectedOpportunity.keyMatchHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Identified Skill Gaps */}
              {selectedOpportunity.missingSkills.length > 0 && (
                <div className="p-6 rounded-3xl bg-amber-500/[0.04] border border-amber-500/25 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Identified Skill Gaps ({selectedOpportunity.missingSkills.length})
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold">Actionable</span>
                  </div>

                  <div className="space-y-2.5">
                    {selectedOpportunity.missingSkills.map((gap, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-950 rounded-2xl border border-white/[0.05] text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm">{gap.skillName}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold font-mono">
                            {gap.importance}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-300">
                          Est. Acquisition: <strong className="text-white">{gap.difficultyToAcquire}</strong> • Recommended Resource: <span className="text-sky-400 font-medium">{gap.suggestedResource}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playSuccess();
                      onGenerateCustomRoadmap(selectedOpportunity);
                      onNavigate('roadmap');
                    }}
                    className="w-full py-3 rounded-2xl bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/40 text-violet-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Map className="w-4 h-4" />
                    <span>Generate Targeted Learning Roadmap for this Role</span>
                  </button>
                </div>
              )}

              {/* Full Job Description & Scope */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Role Overview</h4>
                  <p className="leading-relaxed text-slate-300">{selectedOpportunity.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Key Responsibilities</h4>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-300">
                    {selectedOpportunity.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Requirements</h4>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-300">
                    {selectedOpportunity.requirements.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Benefits & Perks</h4>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-300">
                    {selectedOpportunity.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Drawer Bottom Sticky Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 bg-[#090D15] pb-2">
                <button
                  onClick={() => {
                    onAskCopilotAboutJob(selectedOpportunity);
                    onNavigate('copilot');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-slate-200 text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-indigo-400" />
                  <span>Ask Copilot Prep</span>
                </button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleApplyClick(selectedOpportunity)}
                  disabled={selectedOpportunity.applied}
                  className="px-6 py-2.5 rounded-xl shimmer-btn text-slate-950 text-xs font-extrabold shadow-xl shadow-sky-500/25 disabled:opacity-60 flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 fill-current text-slate-950" />
                  <span>{selectedOpportunity.applied ? 'Application Sent ✓' : 'Apply with Tailored Profile'}</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
