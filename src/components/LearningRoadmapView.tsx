import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  Code2, 
  Layers, 
  ArrowRight, 
  TrendingUp, 
  Award,
  Zap,
  Target,
  RefreshCw,
  Check,
  AlertTriangle,
  Play,
  ShieldCheck,
  Server,
  Cloud,
  Container,
  Cpu,
  ChevronDown,
  ChevronUp,
  FolderGit2
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { TalentProfile, RoadmapSprint } from '../types';
import { AppRoute } from './AppLayout';

interface LearningRoadmapViewProps {
  roadmaps?: RoadmapSprint[];
  currentProfile: TalentProfile;
  onToggleTask?: (sprintId: string, taskId: string) => void;
  onNavigate: (route: AppRoute) => void;
}

interface Milestone {
  id: string;
  week: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  badgeColor: string;
  whatToLearn: string;
  whyItMatters: string;
  estimatedTime: string;
  recommendedResources: { title: string; type: string; link: string }[];
  practicalTask: {
    title: string;
    description: string;
    repoEvidence: string;
  };
  completed: boolean;
}

export const LearningRoadmapView: React.FC<LearningRoadmapViewProps> = ({
  currentProfile,
  onNavigate
}) => {
  // 4-Week Milestone Timeline
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 'm-1',
      week: 'WEEK 1',
      title: 'Docker Fundamentals',
      subtitle: 'Core containerization, layer caching, and isolated runtime builds',
      icon: Container,
      color: 'from-sky-500 to-blue-600',
      badgeColor: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
      whatToLearn: 'Docker architecture (Engine, Daemon, CLI), Dockerfile commands (FROM, RUN, COPY, ENTRYPOINT), multi-stage build optimization, and local image registry management.',
      whyItMatters: 'Eliminates environment drift and standardizes dependencies across research prototyping and production runtime environments.',
      estimatedTime: '6 Hours (3 modules)',
      recommendedResources: [
        { title: 'Docker Deep Dive for AI Engineers', type: 'Course Guide', link: 'https://docs.docker.com/get-started/' },
        { title: 'Multi-Stage Build Optimization Handbook', type: 'Documentation', link: 'https://docs.docker.com/build/building/multi-stage/' }
      ],
      practicalTask: {
        title: 'Containerize Python + PyTorch Base Environment',
        description: 'Construct a multi-stage Dockerfile packaging Python 3.11, PyTorch CPU/CUDA, and C++ build tools, reducing the final artifact size from 2.4GB to under 450MB.',
        repoEvidence: 'github.com/rachitjain/pytorch-docker-template'
      },
      completed: true
    },
    {
      id: 'm-2',
      week: 'WEEK 2',
      title: 'Docker + ML Deployment',
      subtitle: 'Packaging FastAPI inference microservices with health checks & worker scaling',
      icon: Server,
      color: 'from-indigo-500 to-violet-600',
      badgeColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-400/30',
      whatToLearn: 'Integrating FastAPI with Uvicorn worker pools, handling asynchronous vector query batching, implementing health/liveness probes, and structuring Docker Compose stacks for Qdrant vector databases.',
      whyItMatters: 'Bridges raw Python modeling code into resilient, high-concurrency API microservices ready for cloud deployment.',
      estimatedTime: '8 Hours (4 modules)',
      recommendedResources: [
        { title: 'FastAPI Production Model Serving on Docker', type: 'Interactive Lab', link: 'https://fastapi.tiangolo.com/deployment/docker/' },
        { title: 'Asynchronous Vector Batching Patterns', type: 'Technical Paper', link: 'https://qdrant.tech/documentation/' }
      ],
      practicalTask: {
        title: 'Package Multi-Modal RAG Knowledge Assistant into Docker Compose',
        description: 'Create a production-ready docker-compose.yml orchestrating the FastAPI application container alongside a self-hosted Qdrant vector database with automated health check retry logic.',
        repoEvidence: 'github.com/rachitjain/multimodal-rag-assistant/docker'
      },
      completed: true
    },
    {
      id: 'm-3',
      week: 'WEEK 3',
      title: 'AWS Fundamentals',
      subtitle: 'IAM role security, S3 model artifact buckets, and EC2 compute provisioning',
      icon: Cloud,
      color: 'from-amber-500 to-orange-600',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
      whatToLearn: 'AWS Cloud fundamentals, IAM least-privilege security policies, S3 bucket versioning & encryption for model weights, EC2 GPU instance provisioning, and VPC networking security groups.',
      whyItMatters: 'Establishes the enterprise cloud infrastructure and security clearance required by Microsoft, Amazon, and frontier AI research labs.',
      estimatedTime: '8 Hours (3 modules)',
      recommendedResources: [
        { title: 'AWS Cloud Practitioner Essentials for Developers', type: 'AWS Training', link: 'https://aws.amazon.com/training/' },
        { title: 'IAM Policy & S3 Model Checkpoint Storage Guide', type: 'Whitepaper', link: 'https://aws.amazon.com/s3/' }
      ],
      practicalTask: {
        title: 'Configure S3 Model Storage & Automated EC2 GPU Provisioning',
        description: 'Set up an encrypted S3 bucket for PyTorch weights with IAM role authentication and deploy an automated UserData initialization script on an AWS EC2 instance.',
        repoEvidence: 'github.com/rachitjain/aws-ml-infra'
      },
      completed: false
    },
    {
      id: 'm-4',
      week: 'WEEK 4',
      title: 'Deploy ML Application on AWS',
      subtitle: 'Amazon SageMaker inference endpoints, ECS Fargate serverless containers & CloudWatch',
      icon: Cpu,
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
      whatToLearn: 'Deploying containerized models to Amazon ECS Fargate and SageMaker Serverless Endpoints, configuring auto-scaling target tracking policies, and tracking inference latency with CloudWatch metrics.',
      whyItMatters: 'Directly fulfills the critical missing qualification for Microsoft Copilot & Amazon Bedrock roles, elevating your match readiness from 92% to 100%.',
      estimatedTime: '10 Hours (4 modules)',
      recommendedResources: [
        { title: 'Amazon SageMaker Developer Guide & Immersion Lab', type: 'Official Lab', link: 'https://docs.aws.amazon.com/sagemaker/' },
        { title: 'ECS Fargate Serverless ML Deployment Pattern', type: 'Architecture Guide', link: 'https://aws.amazon.com/fargate/' }
      ],
      practicalTask: {
        title: 'Deploy Serverless RAG Inference on AWS with CloudWatch Latency Tracing',
        description: 'Launch your containerized RAG Assistant on AWS ECS Fargate, attach an Application Load Balancer with HTTPS, and verify sub-120ms P95 query latency via CloudWatch alarms.',
        repoEvidence: 'github.com/rachitjain/aws-sagemaker-rag-pipeline'
      },
      completed: false
    }
  ]);

  const [recalculating, setRecalculating] = useState(false);
  const [recalculateModalOpen, setRecalculateModalOpen] = useState(false);
  const [recalculatedScore, setRecalculatedScore] = useState<number>(92);
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>('m-3');

  // Compute live progress
  const completedCount = milestones.filter(m => m.completed).length;
  const progressPercentage = Math.round((completedCount / milestones.length) * 100);

  const toggleMilestone = (id: string) => {
    soundFx.playSwitch();
    setMilestones(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, completed: !m.completed };
      }
      return m;
    }));
  };

  const handleRecalculateMatches = () => {
    soundFx.playBlip(1000);
    setRecalculating(true);
    setRecalculateModalOpen(true);

    // Simulate AI match re-evaluation
    setTimeout(() => {
      soundFx.playSuccess();
      const newScore = Math.min(100, 92 + completedCount * 2);
      setRecalculatedScore(newScore);
      setRecalculating(false);
    }, 2200);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 relative">
      
      {/* 1. TOP HERO HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 sm:p-10 rounded-3xl glass-panel border border-violet-500/30 bg-gradient-to-br from-violet-500/[0.08] via-sky-500/[0.04] to-transparent shadow-2xl relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/15 border border-violet-400/30 text-xs font-bold text-violet-300">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>AI-Generated Personalized Curriculum</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Your Path to{' '}
              <span className="bg-gradient-to-r from-violet-400 via-sky-300 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
                AI Engineer
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              This customized learning roadmap is dynamically synthesized from <strong className="text-white">{currentProfile.fullName}’s</strong> actual skill gaps. Closing these modules bridges your qualification from <strong className="text-sky-300">92% to 100%</strong> for target frontier roles.
            </p>

            {/* Candidate Skill Gaps Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">Skill Gaps:</span>
              <span className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold font-mono">
                AWS
              </span>
              <span className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold font-mono">
                Docker
              </span>
              <span className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold font-mono">
                Kubernetes
              </span>
            </div>
          </div>

          {/* Right: Current Match vs Target Match Comparison Widget */}
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/10 shadow-2xl flex flex-col items-center justify-center space-y-4 shrink-0">
            <div className="flex items-center gap-6">
              
              {/* Current Match */}
              <div className="text-center">
                <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                  Current Match
                </span>
                <div className="w-20 h-20 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex flex-col items-center justify-center shadow-inner">
                  <span className="text-2xl font-extrabold font-mono text-white">92%</span>
                  <span className="text-[9px] font-bold text-sky-300 uppercase">Ready</span>
                </div>
              </div>

              <div className="text-slate-600 font-bold text-lg">→</div>

              {/* Target Match */}
              <div className="text-center">
                <span className="text-[11px] text-emerald-400 uppercase font-bold tracking-wider block mb-1">
                  Target
                </span>
                <div className="w-20 h-20 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 flex flex-col items-center justify-center shadow-lg shadow-emerald-500/10">
                  <span className="text-2xl font-extrabold font-mono text-emerald-400">100%</span>
                  <span className="text-[9px] font-bold text-emerald-300 uppercase">Mastery</span>
                </div>
              </div>

            </div>

            <div className="w-full pt-3 border-t border-white/10 text-center">
              <span className="text-xs font-mono text-emerald-400 font-bold">
                +8% Match Readiness Delta
              </span>
            </div>
          </div>

        </div>
      </motion.div>

      {/* 2. LIVE PROGRESS & RECALCULATE BAR */}
      <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Progress Tracker */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-violet-400" />
              Learning Progress
            </span>
            <span className="font-mono font-extrabold text-violet-400 text-sm">
              {progressPercentage}% Completed ({completedCount}/{milestones.length} Milestones)
            </span>
          </div>

          <div className="h-3.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/[0.06] shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-violet-500 via-sky-400 to-emerald-400 rounded-full shadow-sm"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Est. Remaining: ~16 Hours</span>
            <span>Target Velocity: 2 Sprints / Month</span>
          </div>
        </div>

        {/* Primary CTA: "Recalculate My Matches" */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRecalculateMatches}
          disabled={recalculating}
          className="px-6 py-3.5 rounded-2xl shimmer-btn text-slate-950 text-xs font-extrabold shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2.5 cursor-pointer shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${recalculating ? 'animate-spin' : ''}`} />
          <span>Recalculate My Matches</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
        </motion.button>

      </div>

      {/* 3. VISUAL 4-WEEK MILESTONE TIMELINE */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Map className="w-6 h-6 text-violet-400" />
              Sprint Timeline: 4-Week Targeted Roadmap
            </h2>
            <p className="text-xs text-slate-400">
              Complete each milestone's practical coding tasks to close candidate skill gaps.
            </p>
          </div>

          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Interactive Roadmap
          </span>
        </div>

        {/* Milestones Stack */}
        <div className="space-y-4">
          {milestones.map((milestone, idx) => {
            const Icon = milestone.icon;
            const isExpanded = expandedMilestone === milestone.id;

            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`p-6 sm:p-7 rounded-3xl glass-panel border transition-all shadow-xl ${
                  milestone.completed
                    ? 'border-emerald-500/30 bg-emerald-500/[0.02]'
                    : isExpanded
                    ? 'border-violet-500/40 bg-violet-500/[0.03] shadow-violet-500/5'
                    : 'border-white/[0.08] bg-slate-950/70 hover:border-white/20'
                }`}
              >
                {/* Milestone Summary Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    
                    {/* Week Badge & Icon */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${milestone.color} text-white shadow-md mb-1`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        {milestone.week}
                      </span>
                    </div>

                    {/* Title & Metadata */}
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border ${milestone.badgeColor}`}>
                          {milestone.week}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          {milestone.title}
                        </h3>
                        {milestone.completed && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold font-mono flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-400" /> Completed
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 font-normal line-clamp-1">
                        {milestone.subtitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                        <span className="flex items-center gap-1 text-sky-400 font-mono font-semibold">
                          <Clock className="w-3.5 h-3.5" />
                          {milestone.estimatedTime}
                        </span>
                        <span>•</span>
                        <span className="text-slate-300">
                          {milestone.recommendedResources.length} Curated Resources
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Right Actions: Mark Complete & Expand Details */}
                  <div className="flex items-center gap-3 self-end lg:self-auto shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/[0.06] w-full lg:w-auto justify-between lg:justify-end">
                    
                    {/* Mark Milestone as Complete Button */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleMilestone(milestone.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        milestone.completed
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-white/[0.05] text-slate-300 border border-white/10 hover:bg-white/[0.09] hover:text-white'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${milestone.completed ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span>{milestone.completed ? 'Milestone Complete ✓' : 'Mark as Complete'}</span>
                    </motion.button>

                    {/* Expand Details Toggle */}
                    <button
                      onClick={() => {
                        soundFx.playBlip(900);
                        setExpandedMilestone(isExpanded ? null : milestone.id);
                      }}
                      className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                  </div>

                </div>

                {/* Milestone Expanded Breakdown Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-6 mt-6 border-t border-white/[0.08] space-y-6"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* What to learn & Why it matters */}
                        <div className="space-y-4">
                          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] space-y-1.5">
                            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5" /> What to Learn
                            </span>
                            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                              {milestone.whatToLearn}
                            </p>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] space-y-1.5">
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                              <Target className="w-3.5 h-3.5" /> Why It Matters
                            </span>
                            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                              {milestone.whyItMatters}
                            </p>
                          </div>
                        </div>

                        {/* Practical Task & Recommended Resources */}
                        <div className="space-y-4">
                          
                          {/* Practical Task Card */}
                          <div className="p-4 rounded-2xl bg-violet-500/[0.06] border border-violet-500/25 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
                                <Code2 className="w-3.5 h-3.5" /> Practical Task
                              </span>
                              <span className="text-[10px] font-mono text-violet-400 font-bold">Hands-on Deliverable</span>
                            </div>

                            <h4 className="text-sm font-bold text-white">{milestone.practicalTask.title}</h4>
                            <p className="text-xs text-slate-300 leading-relaxed">{milestone.practicalTask.description}</p>
                            
                            <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                              <FolderGit2 className="w-3.5 h-3.5 text-violet-400" />
                              <span>Evidence: <strong className="text-sky-300">{milestone.practicalTask.repoEvidence}</strong></span>
                            </div>
                          </div>

                          {/* Recommended Resources List */}
                          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] space-y-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                              Recommended Resources:
                            </span>

                            <div className="space-y-1.5">
                              {milestone.recommendedResources.map((res, rIdx) => (
                                <a
                                  key={rIdx}
                                  href={res.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] flex items-center justify-between text-xs text-slate-200 hover:text-sky-300 transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-400 font-mono">
                                      {res.type}
                                    </span>
                                    <span>{res.title}</span>
                                  </div>
                                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                                </a>
                              ))}
                            </div>
                          </div>

                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 4. RECALCULATE MATCHES SIMULATION MODAL */}
      <AnimatePresence>
        {recalculateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !recalculating && setRecalculateModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#090D15] border border-sky-400/30 rounded-3xl p-6 sm:p-8 space-y-6 z-10 shadow-2xl"
            >
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center mx-auto shadow-lg shadow-sky-500/20">
                  {recalculating ? (
                    <RefreshCw className="w-8 h-8 text-sky-400 animate-spin" />
                  ) : (
                    <Sparkles className="w-8 h-8 text-emerald-400" />
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {recalculating ? 'Recalculating Match Vectors...' : 'Matches Recalculated!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {recalculating
                    ? 'AI is re-indexing your completed roadmap milestones against Microsoft, Google DeepMind, and Amazon requirements.'
                    : 'Your verified skill accomplishments have been ingested into the matching model.'}
                </p>
              </div>

              {/* Updated Match Score Breakdown */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Microsoft AI Engineer Intern</span>
                  <span className="text-sm font-extrabold font-mono text-emerald-400">
                    92% → <strong className="text-base text-white">{recalculatedScore}%</strong>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Google DeepMind ML Intern</span>
                  <span className="text-sm font-extrabold font-mono text-emerald-400">
                    90% → <strong className="text-base text-white">{Math.min(100, recalculatedScore - 2)}%</strong>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Amazon AWS Bedrock Intern</span>
                  <span className="text-sm font-extrabold font-mono text-emerald-400">
                    86% → <strong className="text-base text-white">{Math.min(100, recalculatedScore + 1)}%</strong>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setRecalculateModalOpen(false)}
                  disabled={recalculating}
                  className="w-full py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-slate-300 text-xs font-semibold border border-white/10 cursor-pointer disabled:opacity-50"
                >
                  Close
                </button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={recalculating}
                  onClick={() => {
                    setRecalculateModalOpen(false);
                    onNavigate('opportunities');
                  }}
                  className="w-full py-3 rounded-xl shimmer-btn text-slate-950 text-xs font-extrabold shadow-md shadow-sky-500/25 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  <span>View Matched Opportunities</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </motion.button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
