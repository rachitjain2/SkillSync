import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown, 
  TrendingUp, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  Layers, 
  Bot, 
  Map, 
  Send, 
  SlidersHorizontal, 
  ShieldCheck, 
  ArrowUpRight, 
  Award,
  Zap,
  Info,
  Check,
  Building,
  Target
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { JobOpportunity, TalentProfile, RoadmapSprint } from '../types';

interface MatchAnalysisViewProps {
  currentProfile: TalentProfile;
  opportunities: JobOpportunity[];
  selectedOpportunity: JobOpportunity | null;
  onSelectOpportunity: (job: JobOpportunity) => void;
  onNavigate: (route: 'landing' | 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'dashboard' | 'profile' | 'resume' | 'opportunities' | 'skills' | 'roadmap' | 'copilot' | 'settings' | 'match-analysis') => void;
  onApplyOpportunity: (jobId: string) => void;
  onGenerateCustomRoadmap: (job: JobOpportunity) => void;
}

export const MatchAnalysisView: React.FC<MatchAnalysisViewProps> = ({
  currentProfile,
  opportunities,
  selectedOpportunity,
  onSelectOpportunity,
  onNavigate,
  onApplyOpportunity,
  onGenerateCustomRoadmap
}) => {
  // Default to Microsoft AI Engineer Intern or the passed opportunity
  const activeJob: JobOpportunity = selectedOpportunity || opportunities[0] || {
    id: 'job-1',
    title: 'AI Engineer Intern',
    company: 'Microsoft',
    companyLogo: 'https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?w=100&auto=format&fit=crop&q=80',
    location: 'Redmond, WA / Remote',
    workStyle: 'Hybrid',
    type: 'Full-Time',
    salaryRange: '$48 - $56/hr + Housing Stipend',
    experienceLevel: 'Mid-Level',
    department: 'Applied AI & Copilot Foundations',
    matchScore: 92,
    matchBreakdown: {
      skillMatch: 95,
      experienceAlignment: 90,
      projectRelevance: 94,
      domainFit: 89
    },
    aiRationale: 'Your Python and Machine Learning experience strongly aligns with the role’s core requirements. Your projects demonstrate practical ML implementation, while your SQL experience supports the data-processing requirements.',
    keyMatchHighlights: [
      'Strong command of Python, PyTorch, and classical Machine Learning algorithms',
      'Solid relational database and SQL query optimization foundation',
      'Demonstrated project work in Multimodal RAG Question-Answering'
    ],
    matchedSkills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    missingSkills: [
      {
        skillName: 'AWS',
        category: 'Cloud & DevOps',
        importance: 'Critical',
        difficultyToAcquire: 'Fast (1-2 weeks)',
        marketDemand: 'Top 5% in Enterprise AI',
        suggestedResource: 'AWS Certified Cloud Practitioner & SageMaker Deployment Lab'
      },
      {
        skillName: 'Docker',
        category: 'Cloud & DevOps',
        importance: 'Recommended',
        difficultyToAcquire: 'Fast (1-2 weeks)',
        marketDemand: 'Top 8% in AI Infrastructure',
        suggestedResource: 'Docker for Data Science & ML Containerization'
      }
    ],
    description: 'Join Microsoft as an AI Engineer Intern to build the next generation of intelligent Copilot experiences.',
    responsibilities: [],
    requirements: [],
    benefits: [],
    postedAt: '1 day ago'
  };

  // State for expanded reasoning cards
  const [expandedFactor, setExpandedFactor] = useState<string | null>('technical');
  const [appliedToast, setAppliedToast] = useState<string | null>(null);

  // Exact Match Breakdown Weighted Stack requested:
  // Technical Skills: +32
  // Relevant Projects: +24
  // Education: +18
  // Experience: +12
  // Additional Skills: +6
  // TOTAL: 92%
  const breakdownFactors = [
    {
      id: 'technical',
      title: 'Technical Skills',
      score: '+32',
      maxScore: '/ 35 pts',
      color: 'from-sky-500 to-blue-600',
      textColor: 'text-sky-400',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/30',
      icon: Code2,
      summary: 'Verified mastery in Python, Machine Learning fundamentals, SQL queries, and neural networks.',
      evidence: [
        'Python (96% proficiency): Used in 4 production projects & 2 internships',
        'Machine Learning (94% proficiency): Stanford & DeepLearning.AI certified',
        'SQL (88% proficiency): Schema normalization, indexing, and high-concurrency queries',
        'TensorFlow & PyTorch (86% proficiency): Quantized model inference & evaluation'
      ]
    },
    {
      id: 'projects',
      title: 'Relevant Projects',
      score: '+24',
      maxScore: '/ 25 pts',
      color: 'from-indigo-500 to-violet-600',
      textColor: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30',
      icon: FolderGit2,
      summary: 'Proven ability to build end-to-end multi-modal RAG systems and high-speed C++ pipelines.',
      evidence: [
        'Multi-Modal RAG Knowledge Assistant: 420 ★ GitHub, Qdrant vector search integration',
        'Real-Time Edge Vision Pipeline: C++ SIMD optimizations and OpenCV object tracking',
        'Demonstrates practical ability to ship functional AI systems beyond academic exercises'
      ]
    },
    {
      id: 'education',
      title: 'Education',
      score: '+18',
      maxScore: '/ 20 pts',
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      icon: GraduationCap,
      summary: 'B.Tech in Computer Science & Artificial Intelligence with top academic standing (GPA 3.91).',
      evidence: [
        'National Institute of Technology • B.Tech in CS & AI (2022 - 2026)',
        'Dean’s Honor List with 3.91 / 4.00 cumulative GPA',
        'Completed advanced coursework in Machine Learning, Algorithms, DBMS, and Linear Algebra'
      ]
    },
    {
      id: 'experience',
      title: 'Experience',
      score: '+12',
      maxScore: '/ 15 pts',
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      icon: Briefcase,
      summary: 'Hands-on industry exposure through 2 internships in AI research and backend engineering.',
      evidence: [
        'AI / ML Research Intern @ NeuralCraft Systems: Cut latency by 35% & boosted accuracy to 93.6%',
        'Software Development Intern @ DataStream Technologies: Scaled REST APIs for 50k IoT feeds',
        'Proven track record delivering code in team sprints with CI/CD and unit testing'
      ]
    },
    {
      id: 'additional',
      title: 'Additional Skills',
      score: '+6',
      maxScore: '/ 5 pts bonus',
      color: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      icon: Award,
      summary: 'FastAPI microservice development, Git collaboration workflows, and algorithmic rank.',
      evidence: [
        'FastAPI asynchronous REST API endpoints with Swagger schema documentation',
        'Top 2.1% algorithmic problem-solving percentile in competitive simulations',
        'Rapid adaptability and collaborative cross-functional communication'
      ]
    }
  ];

  const handleApplyClick = () => {
    soundFx.playSuccess();
    onApplyOpportunity(activeJob.id);
    setAppliedToast(`Application submitted to ${activeJob.company} for ${activeJob.title}!`);
    setTimeout(() => setAppliedToast(null), 3500);
  };

  const handleRoadmapClick = () => {
    soundFx.playSuccess();
    onGenerateCustomRoadmap(activeJob);
    onNavigate('roadmap');
  };

  // Radial calculation for the large hero gauge
  const heroRadius = 78;
  const heroCircumference = 2 * Math.PI * heroRadius;
  const heroStrokeDashoffset = heroCircumference - (activeJob.matchScore / 100) * heroCircumference;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 relative">
      
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

      {/* 1. TOP CONTEXT & OPPORTUNITY SWITCHER BAR */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-2xl glass-panel border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl"
      >
        <div className="flex items-center gap-3.5 flex-wrap">
          <button
            onClick={() => {
              soundFx.playBlip(800);
              onNavigate('opportunities');
            }}
            className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>← All Opportunities</span>
          </button>

          <span className="text-slate-600 hidden sm:inline">•</span>

          {/* Opportunity Switcher Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Target Role:</span>
            <select
              value={activeJob.id}
              onChange={(e) => {
                const found = opportunities.find(o => o.id === e.target.value);
                if (found) {
                  soundFx.playSwitch();
                  onSelectOpportunity(found);
                }
              }}
              className="bg-slate-950 border border-sky-400/40 text-sky-300 font-bold text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-sky-400 cursor-pointer shadow-sm"
            >
              {opportunities.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.company} — {job.title} ({job.matchScore}% Match)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              soundFx.playBlip(1000);
              onNavigate('copilot');
            }}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-400/30 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>Ask Copilot Prep</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleApplyClick}
            disabled={activeJob.applied}
            className="px-4 py-1.5 rounded-xl shimmer-btn text-slate-950 text-xs font-extrabold shadow-md shadow-sky-500/25 disabled:opacity-60 flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 fill-current text-slate-950" />
            <span>{activeJob.applied ? 'Applied ✓' : 'Apply Now'}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* 2. HERO MATCH SECTION: "Why are you a 92% match?" */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 sm:p-10 rounded-3xl glass-panel border border-sky-400/30 bg-gradient-to-br from-sky-500/[0.08] via-indigo-500/[0.04] to-transparent shadow-2xl relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Left Hero Text */}
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-xs font-bold text-sky-300 shadow-sm">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>AI Deep Match Diagnostics</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Why are you a{' '}
              <span className="text-gradient-hero drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]">
                {activeJob.matchScore}% match?
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              SkillSync AI cross-referenced your verified resume entities, code repositories, and technical coursework against <strong className="text-white">{activeJob.company}’s {activeJob.title}</strong> role requirements.
            </p>

            {/* Snapshot Pill Group */}
            <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
              <span className="px-3 py-1 rounded-xl bg-slate-950/80 border border-white/[0.08] text-slate-200">
                Company: <strong className="text-white">{activeJob.company}</strong>
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-950/80 border border-white/[0.08] text-slate-200">
                Location: <strong className="text-white">{activeJob.location}</strong>
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-950/80 border border-white/[0.08] text-slate-200">
                Candidate: <strong className="text-sky-300">{currentProfile.fullName}</strong>
              </span>
            </div>
          </div>

          {/* Right: Giant Animated Circular Radial Progress Gauge */}
          <div className="flex flex-col items-center justify-center shrink-0 p-6 rounded-3xl bg-slate-950/80 border border-white/10 shadow-2xl relative">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 180 180">
                {/* Background Ring */}
                <circle
                  cx="90"
                  cy="90"
                  r={heroRadius}
                  className="stroke-slate-850"
                  strokeWidth="12"
                  fill="transparent"
                />
                {/* Animated Gradient Progress Stroke */}
                <circle
                  cx="90"
                  cy="90"
                  r={heroRadius}
                  className="stroke-sky-400 transition-all duration-1000 ease-out drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                  strokeWidth="12"
                  strokeDasharray={heroCircumference}
                  strokeDashoffset={heroStrokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Center Content */}
              <div className="absolute text-center flex flex-col items-center justify-center">
                <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
                  {activeJob.matchScore}%
                </span>
                <span className="text-[11px] font-extrabold text-sky-300 uppercase tracking-wider mt-1">
                  Overall Match
                </span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 font-mono">
                <TrendingUp className="w-3.5 h-3.5" /> Top 1.2% Percentile
              </span>
            </div>
          </div>

        </div>
      </motion.div>

      {/* 3. MATCH BREAKDOWN SECTION (+32, +24, +18, +12, +6 = 92%) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Layers className="w-6 h-6 text-sky-400" />
              Detailed Match Score Breakdown
            </h2>
            <p className="text-xs text-slate-400">
              How the {activeJob.matchScore}% total score was mathematically synthesized across your profile vectors.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-slate-300 self-start sm:self-auto">
            Total Score: <strong className="text-emerald-400 font-bold">{activeJob.matchScore}%</strong> / 100%
          </div>
        </div>

        {/* Visual Stacked Progress Bar */}
        <div className="h-3 rounded-full bg-slate-900 overflow-hidden flex shadow-inner border border-white/[0.06]">
          <div style={{ width: '32%' }} className="bg-sky-400 h-full" title="Technical Skills (+32)" />
          <div style={{ width: '24%' }} className="bg-indigo-400 h-full" title="Relevant Projects (+24)" />
          <div style={{ width: '18%' }} className="bg-emerald-400 h-full" title="Education (+18)" />
          <div style={{ width: '12%' }} className="bg-amber-400 h-full" title="Experience (+12)" />
          <div style={{ width: '6%' }} className="bg-purple-400 h-full" title="Additional Skills (+6)" />
          <div style={{ width: '8%' }} className="bg-slate-800 h-full opacity-40" title="Missing Skills Gap (-8%)" />
        </div>

        {/* Breakdown Factor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-1">
          {breakdownFactors.map((factor) => {
            const Icon = factor.icon;
            const isExpanded = expandedFactor === factor.id;

            return (
              <motion.div
                key={factor.id}
                whileHover={{ y: -2 }}
                onClick={() => {
                  soundFx.playBlip(900);
                  setExpandedFactor(isExpanded ? null : factor.id);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isExpanded
                    ? `${factor.bgColor} ${factor.borderColor} shadow-lg shadow-sky-500/5`
                    : 'bg-slate-950/80 border-white/[0.08] hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className={`p-2 rounded-xl ${factor.bgColor} ${factor.textColor}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="text-right">
                    <span className={`text-xl font-extrabold font-mono ${factor.textColor} block`}>
                      {factor.score}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{factor.maxScore}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{factor.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{factor.summary}</p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 pt-1 border-t border-white/[0.04]">
                  <span>{isExpanded ? 'Hide Evidence' : 'View Evidence'}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Expanded Evidence Inspection Drawer/Panel */}
        <AnimatePresence>
          {expandedFactor && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-5 rounded-2xl glass-panel border border-sky-400/20 bg-slate-950/90 space-y-3"
            >
              {(() => {
                const activeFactorData = breakdownFactors.find(f => f.id === expandedFactor);
                if (!activeFactorData) return null;
                const Icon = activeFactorData.icon;

                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${activeFactorData.textColor}`} />
                        <h4 className="text-sm font-bold text-white">
                          Verified Evidence: {activeFactorData.title} ({activeFactorData.score} Points Awarded)
                        </h4>
                      </div>
                      <button
                        onClick={() => setExpandedFactor(null)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Close
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {activeFactorData.evidence.map((ev, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-start gap-2 text-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{ev}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. MATCHING SKILLS vs MISSING SKILLS COMPARATIVE VISUALS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: MATCHING SKILLS */}
        <div className="p-6 rounded-3xl glass-panel border border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.04] to-transparent space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-white">Matching Skills Verified</h3>
                <p className="text-xs text-slate-400">Skills present in your profile directly satisfying role criteria</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
              4/4 Matched
            </span>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Python', proficiency: 96, evidence: 'Used in 4 projects & 2 internships' },
              { name: 'Machine Learning', proficiency: 94, evidence: 'Used in 3 projects & research papers' },
              { name: 'SQL', proficiency: 88, evidence: 'Mentioned in projects and coursework (DBMS, indexing)' },
              { name: 'TensorFlow', proficiency: 86, evidence: 'Used for neural network modeling & quantization' }
            ].map((skill, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/[0.05] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{skill.name}</span>
                    <span className="text-emerald-400 font-bold text-xs">✓ Verified</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">{skill.proficiency}% Proficiency</span>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span className="text-slate-500">Evidence:</span>
                  <span>{skill.evidence}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: MISSING SKILLS (SKILL GAPS) */}
        <div className="p-6 rounded-3xl glass-panel border border-amber-500/25 bg-gradient-to-br from-amber-500/[0.04] to-transparent space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">Missing Skills Identified</h3>
                  <p className="text-xs text-slate-400">Gaps in profile required to reach 100% match readiness</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono">
                2 Identified
              </span>
            </div>

            <div className="space-y-3">
              {[
                { name: 'AWS', gapImpact: '-5% Impact', time: '1-2 weeks', resource: 'AWS SageMaker & EC2 Model Deployment' },
                { name: 'Docker', gapImpact: '-3% Impact', time: '1-2 weeks', resource: 'Containerized Microservices & Dockerfiles' }
              ].map((gap, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/[0.05] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{gap.name}</span>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {gap.gapImpact}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-300">
                    Est. Time to Learn: <strong className="text-white">{gap.time}</strong> • Recommended: <span className="text-sky-400">{gap.resource}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Button inside Missing Skills */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRoadmapClick}
            className="w-full py-3 rounded-2xl bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/40 text-violet-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer mt-2"
          >
            <Map className="w-4 h-4" />
            <span>Generate Learning Roadmap for Missing Skills</span>
          </motion.button>
        </div>

      </div>

      {/* 5. NATURAL LANGUAGE AI EXPLAINABILITY CARDS (WHY YOU MATCH / WHY YOU DON'T FULLY MATCH) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card A: WHY YOU MATCH */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-7 rounded-3xl glass-panel border border-sky-400/30 bg-gradient-to-br from-sky-500/[0.06] to-indigo-500/[0.03] space-y-3 shadow-xl"
        >
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Why You Match</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white">
            Natural Language AI Synthesis
          </h3>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            "{activeJob.aiRationale}"
          </p>

          <div className="pt-2 space-y-1.5 border-t border-white/[0.06] text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Direct alignment with Microsoft Copilot foundation modeling requirements.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Multi-Modal RAG Knowledge Assistant proves practical vector search depth.</span>
            </div>
          </div>
        </motion.div>

        {/* Card B: WHY YOU DON'T FULLY MATCH */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-7 rounded-3xl glass-panel border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.06] to-transparent space-y-3 shadow-xl"
        >
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Why You Don't Fully Match</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white">
            Identified Qualification Gaps
          </h3>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            "Your profile currently lacks demonstrated <strong className="text-white">AWS and Docker</strong> experience. Enterprise engineering teams require containerized deployments and cloud infrastructure to serve models in high-throughput production environments."
          </p>

          <div className="pt-2 space-y-1.5 border-t border-white/[0.06] text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Missing AWS SageMaker / ECS containerized deployment history (-5%).</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Lack of production Dockerfile container packaging (-3%).</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* 6. "HOW TO REACH 100%" ACTION HERO BANNER */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 sm:p-10 rounded-3xl glass-panel border border-sky-400/40 bg-gradient-to-r from-violet-600/[0.15] via-sky-600/[0.12] to-indigo-600/[0.15] shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-300">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Accelerated Roadmap Available</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How to reach 100%
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            Complete the <strong className="text-white">Sprint 1 AWS Cloud & Docker Deployment</strong> roadmap to bridge the remaining 8% gap. Gaining these skills will elevate your profile from <span className="text-sky-300 font-bold font-mono">92%</span> to a perfect <span className="text-emerald-400 font-bold font-mono">100% verified match</span>.
          </p>
        </div>

        {/* Primary CTA Button: "How to reach 100%" */}
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRoadmapClick}
          className="px-8 py-4 rounded-2xl shimmer-btn text-slate-950 text-sm font-extrabold shadow-xl shadow-sky-500/30 flex items-center justify-center gap-2.5 cursor-pointer shrink-0"
        >
          <Target className="w-5 h-5 fill-current text-slate-950" />
          <span>How to reach 100%</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </motion.button>
      </motion.div>

    </div>
  );
};
