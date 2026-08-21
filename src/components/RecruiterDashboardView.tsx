import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Search, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  X, 
  Download, 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Star, 
  Award, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  Layers, 
  Send, 
  Calendar, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Eye,
  FileText,
  UserCheck,
  ExternalLink
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { TalentProfile, JobOpportunity } from '../types';
import { AppRoute } from './AppLayout';

interface RecruiterDashboardViewProps {
  currentProfile: TalentProfile;
  opportunities: JobOpportunity[];
  onNavigate: (route: AppRoute) => void;
}

interface RecruiterCandidate {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  title: string;
  location: string;
  matchScore: number;
  matchBreakdown: {
    skills: number;
    experience: number;
    projects: number;
    domain: number;
  };
  matchingSkills: string[];
  missingSkills: { name: string; impact: string; timeToLearn: string }[];
  aiRecommendation: string;
  experienceLevel: string;
  education: string;
  topProject: { name: string; stars: number; description: string; tags: string[] };
  experienceSummary: string;
  verified: boolean;
  status: 'New Match' | 'Shortlisted' | 'Screen Scheduled' | 'Offer Extended';
}

interface CreatedJob {
  id: string;
  title: string;
  department: string;
  location: string;
  workStyle: string;
  salaryRange: string;
  description: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  activeCandidatesCount: number;
  avgMatchScore: number;
  createdAt: string;
}

export const RecruiterDashboardView: React.FC<RecruiterDashboardViewProps> = ({
  currentProfile,
  opportunities,
  onNavigate
}) => {
  // Active Jobs state
  const [jobs, setJobs] = useState<CreatedJob[]>([
    {
      id: 'job-rec-1',
      title: 'AI / ML Engineer Intern',
      department: 'Applied AI & Foundation Models',
      location: 'Redmond, WA / Remote',
      workStyle: 'Hybrid',
      salaryRange: '$48 - $56/hr',
      description: 'Build high-performance AI inference pipelines, optimize multimodal retrieval models, and integrate scalable vector databases with Python, PyTorch, and SQL.',
      requiredSkills: ['Python', 'Machine Learning', 'SQL', 'PyTorch', 'C++'],
      niceToHaveSkills: ['AWS', 'Docker', 'FastAPI'],
      activeCandidatesCount: 28,
      avgMatchScore: 89.2,
      createdAt: '2 days ago'
    },
    {
      id: 'job-rec-2',
      title: 'Senior AI Full-Stack Engineer',
      department: 'Enterprise AI Products',
      location: 'San Francisco, CA / Remote',
      workStyle: 'Remote',
      salaryRange: '$190k - $240k',
      description: 'Ship high-throughput streaming interfaces, token caching mechanisms, and real-time collaborative AI canvases using TypeScript, Next.js, and FastAPI.',
      requiredSkills: ['TypeScript', 'Next.js', 'Python', 'FastAPI', 'Vector Databases'],
      niceToHaveSkills: ['WebAssembly', 'vLLM', 'Docker'],
      activeCandidatesCount: 19,
      avgMatchScore: 86.4,
      createdAt: '4 days ago'
    },
    {
      id: 'job-rec-3',
      title: 'Staff ML Infrastructure Engineer',
      department: 'Cloud & Compute Platforms',
      location: 'Seattle, WA (Remote)',
      workStyle: 'Remote',
      salaryRange: '$220k - $270k',
      description: 'Architect multi-node GPU cluster orchestrators, manage Kubernetes scheduling policies, and automate infrastructure deployments.',
      requiredSkills: ['Kubernetes', 'Terraform', 'AWS', 'Python', 'GPU Orchestration'],
      niceToHaveSkills: ['Triton', 'Ray', 'CUDA'],
      activeCandidatesCount: 14,
      avgMatchScore: 84.1,
      createdAt: '1 week ago'
    }
  ]);

  const [selectedJobId, setSelectedJobId] = useState<string>('job-rec-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [minScoreFilter, setMinScoreFilter] = useState<number>(0);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [inspectingCandidate, setInspectingCandidate] = useState<RecruiterCandidate | null>(null);
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [createJobModalOpen, setCreateJobModalOpen] = useState(false);
  const [shortlistModalOpen, setShortlistModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Job Form State
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDept, setNewJobDept] = useState('Applied AI Engineering');
  const [newJobLocation, setNewJobLocation] = useState('San Francisco, CA / Remote');
  const [newJobSalary, setNewJobSalary] = useState('$130,000 - $165,000');
  const [newJobDesc, setNewJobDesc] = useState('');
  const [newJobSkills, setNewJobSkills] = useState('Python, Machine Learning, PyTorch, SQL, Docker');

  // Candidate Pool
  const [candidates, setCandidates] = useState<RecruiterCandidate[]>([
    {
      id: 'cand-rachit',
      rank: 1,
      name: 'Rachit Jain',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
      title: 'AI / ML Engineer & CS Scholar',
      location: 'Bangalore, India (Open to Remote / Relocation)',
      matchScore: 94,
      matchBreakdown: { skills: 96, experience: 90, projects: 95, domain: 92 },
      matchingSkills: ['Python', 'Machine Learning', 'C++', 'SQL', 'PyTorch', 'FastAPI'],
      missingSkills: [
        { name: 'AWS Cloud Services', impact: '-4%', timeToLearn: '1-2 weeks' },
        { name: 'Docker Production', impact: '-2%', timeToLearn: '1 week' }
      ],
      aiRecommendation: 'Outstanding #1 candidate. Exceptional Python and ML algorithmic depth combined with practical Multi-Modal RAG repository work (420 ★ GitHub) and top NIT academic standing (GPA 3.91). Highly recommended for fast-track technical screening.',
      experienceLevel: 'Student / Fresher (2 Internships)',
      education: 'B.Tech in Computer Science & AI (National Institute of Technology, GPA 3.91)',
      topProject: {
        name: 'Multi-Modal RAG Knowledge Assistant',
        stars: 420,
        description: 'End-to-end question-answering system combining vector search (Qdrant), sentence embeddings, and open-source LLMs with an asynchronous FastAPI backend.',
        tags: ['Python', 'PyTorch', 'SQL', 'FastAPI', 'Qdrant']
      },
      experienceSummary: 'AI / ML Research Intern @ NeuralCraft Systems (improved accuracy to 93.6%) + Backend Intern @ DataStream Technologies.',
      verified: true,
      status: 'Shortlisted'
    },
    {
      id: 'cand-alex',
      rank: 2,
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      title: 'Senior AI Full-Stack Systems Engineer',
      location: 'San Francisco, CA (Remote)',
      matchScore: 89,
      matchBreakdown: { skills: 92, experience: 88, projects: 90, domain: 86 },
      matchingSkills: ['Python', 'FastAPI', 'SQL', 'TypeScript', 'Vector Databases'],
      missingSkills: [
        { name: 'Low-Level C++ SIMD', impact: '-6%', timeToLearn: '3-4 weeks' },
        { name: 'PyTorch Quantization', impact: '-5%', timeToLearn: '2 weeks' }
      ],
      aiRecommendation: 'Strong #2 candidate. 6+ years building high-throughput TypeScript/Python applications and real-time streaming architectures. Excellent domain fit for API-heavy AI applications.',
      experienceLevel: 'Senior (6+ Years)',
      education: 'B.S. in Computer Science (UC Berkeley)',
      topProject: {
        name: 'OpenAgent-Stream Vector Engine',
        stars: 3400,
        description: 'High-throughput token streaming middleware handling 4.2M daily inferences with sub-25ms TTFT.',
        tags: ['TypeScript', 'Next.js', 'FastAPI', 'Pinecone']
      },
      experienceSummary: 'Senior Systems Engineer @ AgenticFlow + Lead Frontend Engineer @ ScaleSync.',
      verified: true,
      status: 'New Match'
    },
    {
      id: 'cand-sarah',
      rank: 3,
      name: 'Sarah Lin',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      title: 'Staff ML Infrastructure & Cloud Lead',
      location: 'Seattle, WA (Remote)',
      matchScore: 84,
      matchBreakdown: { skills: 86, experience: 92, projects: 82, domain: 80 },
      matchingSkills: ['Python', 'Docker', 'AWS', 'Kubernetes', 'SQL'],
      missingSkills: [
        { name: 'Transformer Architecture Fine-Tuning', impact: '-9%', timeToLearn: '2-3 weeks' },
        { name: 'C++ Algorithmic Foundations', impact: '-7%', timeToLearn: '3-4 weeks' }
      ],
      aiRecommendation: 'Superb cloud and Kubernetes infrastructure specialist. Unmatched for GPU cluster scaling and platform reliability, but slightly more DevOps-focused than pure ML modeling.',
      experienceLevel: 'Staff / Lead (8+ Years)',
      education: 'M.S. in Distributed Systems (University of Washington)',
      topProject: {
        name: 'KubeGPU-AutoScaler Operator',
        stars: 1250,
        description: 'Kubernetes custom controller dynamically provisioning spot GPU nodes based on tensor queue depth.',
        tags: ['Kubernetes', 'Go', 'AWS', 'Terraform']
      },
      experienceSummary: 'Staff ML Infrastructure Lead @ CloudScale Systems + DevOps Architect @ Hyperscaler.',
      verified: true,
      status: 'New Match'
    },
    {
      id: 'cand-marcus',
      rank: 4,
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      title: 'Backend AI Systems & Database Architect',
      location: 'Austin, TX / Remote',
      matchScore: 81,
      matchBreakdown: { skills: 82, experience: 85, projects: 80, domain: 78 },
      matchingSkills: ['Python', 'SQL', 'FastAPI', 'PostgreSQL', 'Docker'],
      missingSkills: [
        { name: 'PyTorch Deep Learning', impact: '-11%', timeToLearn: '3-4 weeks' },
        { name: 'Vector Embedding Retraining', impact: '-8%', timeToLearn: '2 weeks' }
      ],
      aiRecommendation: 'High-caliber database and backend engineer with strong SQL optimization. Good candidate if the primary bottleneck is data ingestion and connection pooling.',
      experienceLevel: 'Mid-Senior (4 Years)',
      education: 'B.S. in Software Engineering (UT Austin)',
      topProject: {
        name: 'AsyncRelay PostgreSQL Ingestor',
        stars: 580,
        description: 'Distributed event pipeline processing 100k writes/sec with automated connection pooling.',
        tags: ['Python', 'PostgreSQL', 'Redis', 'Kafka']
      },
      experienceSummary: 'Backend Engineer @ DataFlow Inc.',
      verified: true,
      status: 'New Match'
    },
    {
      id: 'cand-elena',
      rank: 5,
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      title: 'NLP Research Associate & Applied Scientist',
      location: 'Boston, MA (Hybrid)',
      matchScore: 79,
      matchBreakdown: { skills: 84, experience: 76, projects: 80, domain: 78 },
      matchingSkills: ['Python', 'PyTorch', 'Machine Learning', 'HuggingFace'],
      missingSkills: [
        { name: 'SQL Query Optimization', impact: '-12%', timeToLearn: '2 weeks' },
        { name: 'C++ Systems Programming', impact: '-9%', timeToLearn: '4 weeks' }
      ],
      aiRecommendation: 'Strong academic research background in transformer evaluation and token perplexity. Requires support for high-throughput production database integrations.',
      experienceLevel: 'Junior / Research Associate (2 Years)',
      education: 'M.S. in Computational Linguistics (MIT)',
      topProject: {
        name: 'TransformerBench Evaluation Suite',
        stars: 310,
        description: 'Automated evaluation harness for measuring cross-lingual perplexity on quantized LLMs.',
        tags: ['Python', 'PyTorch', 'HuggingFace', 'Transformers']
      },
      experienceSummary: 'Research Assistant @ MIT NLP Lab.',
      verified: false,
      status: 'New Match'
    }
  ]);

  const activeJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter(cand => {
      const matchesSearch = 
        cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cand.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cand.matchingSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        cand.education.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesScore = cand.matchScore >= minScoreFilter;

      return matchesSearch && matchesScore;
    });
  }, [candidates, searchQuery, minScoreFilter]);

  const toggleSelectCandidate = (id: string) => {
    soundFx.playSwitch();
    setSelectedCandidateIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    soundFx.playSwitch();
    if (selectedCandidateIds.length === filteredCandidates.length) {
      setSelectedCandidateIds([]);
    } else {
      setSelectedCandidateIds(filteredCandidates.map(c => c.id));
    }
  };

  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim()) return;

    soundFx.playSuccess();
    const skillsArray = newJobSkills.split(',').map(s => s.trim()).filter(Boolean);

    const newJob: CreatedJob = {
      id: `job-rec-${Date.now()}`,
      title: newJobTitle,
      department: newJobDept,
      location: newJobLocation,
      workStyle: 'Hybrid',
      salaryRange: newJobSalary,
      description: newJobDesc || 'High-impact AI engineering role building next-generation foundation model systems.',
      requiredSkills: skillsArray,
      niceToHaveSkills: ['AWS', 'Docker', 'FastAPI'],
      activeCandidatesCount: candidates.length,
      avgMatchScore: 88.5,
      createdAt: 'Just now'
    };

    setJobs([newJob, ...jobs]);
    setSelectedJobId(newJob.id);
    setCreateJobModalOpen(false);

    setToastMessage(`Job "${newJob.title}" created & AI candidate matching completed!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleGenerateShortlist = () => {
    if (selectedCandidateIds.length === 0) {
      setToastMessage('Please select at least 1 candidate to generate a shortlist.');
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    soundFx.playSuccess();
    setShortlistModalOpen(true);
  };

  const handleExportCSV = () => {
    soundFx.playSuccess();
    const selected = candidates.filter(c => selectedCandidateIds.includes(c.id));
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Rank,Name,Title,Match Score,Education,Matching Skills,Status"].join(",") + "\n" +
      selected.map(c => `"${c.rank}","${c.name}","${c.title}","${c.matchScore}%","${c.education}","${c.matchingSkills.join('; ')}","${c.status}"`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SkillSync_AI_Shortlist_${activeJob.title.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper for radial score
  const renderRadialGauge = (score: number, size = 64, strokeWidth = 5) => {
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
            className="stroke-slate-800"
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
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">
            Match
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-24 relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="fixed top-20 right-8 z-50 p-4 rounded-2xl bg-emerald-500 text-slate-950 font-extrabold text-xs shadow-2xl flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-5 h-5 text-slate-950" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. TOP HEADER BANNER & ACTION BAR */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 sm:p-10 rounded-3xl glass-panel border border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.08] via-sky-500/[0.04] to-transparent shadow-2xl relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-300">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Enterprise AI Talent Intelligence & Matcher</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Recruiter Command Dashboard
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Autonomous candidate vector matching, explainable qualification breakdowns, and instant shortlisting across pre-screened technical talent.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                soundFx.playBlip(1000);
                setCreateJobModalOpen(true);
              }}
              className="px-5 py-3 rounded-2xl shimmer-btn text-slate-950 text-xs font-extrabold shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Create New Job</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleGenerateShortlist}
              className="px-5 py-3 rounded-2xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-extrabold flex items-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Generate Shortlist ({selectedCandidateIds.length})</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* 2. RECRUITER 4 MAIN ENTERPRISE METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Active Jobs */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-3xl glass-panel border border-white/[0.08] space-y-3 bg-slate-950/70 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-2xl bg-sky-500/15 text-sky-400">
              <Briefcase className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
              Active
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{jobs.length} Roles</div>
            <div className="text-xs text-slate-400 font-medium">Active Openings</div>
          </div>
        </motion.div>

        {/* Metric 2: Candidates Evaluated */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-3xl glass-panel border border-white/[0.08] space-y-3 bg-slate-950/70 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-2xl bg-indigo-500/15 text-indigo-400">
              <Users className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-mono text-sky-400 font-bold bg-sky-500/10 px-2 py-0.5 rounded-lg border border-sky-500/20">
              AI Screened
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">142 Profiles</div>
            <div className="text-xs text-slate-400 font-medium">Evaluated Candidates</div>
          </div>
        </motion.div>

        {/* Metric 3: Average Match Score */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-3xl glass-panel border border-white/[0.08] space-y-3 bg-slate-950/70 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-2xl bg-emerald-500/15 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
              High Synergy
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{activeJob.avgMatchScore}%</div>
            <div className="text-xs text-slate-400 font-medium">Average Match Score</div>
          </div>
        </motion.div>

        {/* Metric 4: Time Saved */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-3xl glass-panel border border-white/[0.08] space-y-3 bg-slate-950/70 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-2xl bg-purple-500/15 text-purple-400">
              <Clock className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-mono text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded-lg border border-purple-500/20">
              74% Faster
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">38.5 Hours</div>
            <div className="text-xs text-slate-400 font-medium">Time Saved per Req</div>
          </div>
        </motion.div>

      </div>

      {/* 3. ACTIVE JOB SELECTOR STRIP */}
      <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/[0.08]">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-sky-400" />
              Target Position Filter
            </h3>
            <p className="text-xs text-slate-400">Select an active job requisition to evaluate its AI-matched talent pool</p>
          </div>

          <span className="text-xs font-mono text-slate-400">
            {jobs.length} Active Requisitions
          </span>
        </div>

        {/* Job Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {jobs.map((job) => {
            const isSelected = selectedJobId === job.id;

            return (
              <motion.div
                key={job.id}
                whileHover={{ y: -2 }}
                onClick={() => {
                  soundFx.playSwitch();
                  setSelectedJobId(job.id);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-sky-500/15 border-sky-400/40 shadow-lg shadow-sky-500/10'
                    : 'bg-slate-950/80 border-white/[0.06] hover:border-white/20 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate max-w-[180px]">
                    {job.title}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono font-bold">
                    {job.activeCandidatesCount} Matches
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-1">{job.department} • {job.location}</p>

                <div className="flex flex-wrap items-center gap-1 pt-1">
                  {job.requiredSkills.slice(0, 3).map((skill, sIdx) => (
                    <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 font-mono">
                      {skill}
                    </span>
                  ))}
                  {job.requiredSkills.length > 3 && (
                    <span className="text-[10px] text-slate-500">+{job.requiredSkills.length - 3}</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 4. CANDIDATE RANKING TABLE & BATCH CONTROLS */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/[0.08] space-y-6 shadow-2xl">
        
        {/* Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Award className="w-6 h-6 text-amber-400" />
              Ranked Candidate Pool for {activeJob.title}
            </h2>
            <p className="text-xs text-slate-400">
              Ranked in real time by mathematical vector compatibility and verified skill confidence.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidates or skills..."
                className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-400"
              />
            </div>

            <select
              value={minScoreFilter}
              onChange={(e) => { soundFx.playSwitch(); setMinScoreFilter(Number(e.target.value)); }}
              className="bg-slate-950 border border-white/10 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-sky-400 cursor-pointer"
            >
              <option value={0}>All Match Scores</option>
              <option value={90}>90%+ Top Matches</option>
              <option value={85}>85%+ High Synergy</option>
              <option value={80}>80%+ Qualified</option>
            </select>

            {/* Compare Button */}
            {selectedCandidateIds.length >= 2 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => {
                  soundFx.playSuccess();
                  setComparisonModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Compare ({selectedCandidateIds.length})</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Batch Selection Banner */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/80 border border-white/[0.06] text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedCandidateIds.length > 0 && selectedCandidateIds.length === filteredCandidates.length}
              onChange={handleSelectAll}
              className="rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-0 cursor-pointer"
            />
            <span>Select All ({filteredCandidates.length} Candidates)</span>
          </div>

          <div className="font-mono text-slate-400">
            {selectedCandidateIds.length} Selected
          </div>
        </div>

        {/* Candidate Ranking List */}
        <div className="space-y-3">
          {filteredCandidates.map((cand) => {
            const isSelected = selectedCandidateIds.includes(cand.id);

            return (
              <motion.div
                key={cand.id}
                whileHover={{ y: -2 }}
                className={`p-5 sm:p-6 rounded-3xl border transition-all shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-5 group cursor-pointer ${
                  cand.rank === 1
                    ? 'border-amber-400/40 bg-gradient-to-r from-amber-500/[0.06] via-slate-950/80 to-slate-950/90 shadow-amber-500/5'
                    : isSelected
                    ? 'border-sky-400/40 bg-sky-500/[0.04]'
                    : 'border-white/[0.08] bg-slate-950/80 hover:border-white/20'
                }`}
                onClick={() => {
                  soundFx.playBlip(1000);
                  setInspectingCandidate(cand);
                }}
              >
                {/* Left: Checkbox, Rank, Avatar, Candidate Summary */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  
                  {/* Select Checkbox (stopPropagation so it doesn't trigger card inspect) */}
                  <div className="pt-2" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectCandidate(cand.id)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-0 cursor-pointer"
                    />
                  </div>

                  {/* Rank Badge */}
                  <div className="flex flex-col items-center shrink-0">
                    <span className={`w-8 h-8 rounded-xl font-extrabold text-xs font-mono flex items-center justify-center shadow-md ${
                      cand.rank === 1
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50'
                        : cand.rank === 2
                        ? 'bg-slate-700/40 text-slate-200 border border-white/20'
                        : 'bg-slate-900 text-slate-400 border border-white/10'
                    }`}>
                      #{cand.rank}
                    </span>
                  </div>

                  {/* Candidate Avatar */}
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-white/10 shadow-md shrink-0"
                  />

                  {/* Candidate Info */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                          {cand.name}
                        </h3>
                        {cand.rank === 1 && (
                          <span className="px-2 py-0.5 text-[10px] rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 font-bold flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current text-amber-400" /> #1 Match
                          </span>
                        )}
                        {cand.verified && (
                          <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-sky-400 font-medium">{cand.title} • {cand.location}</p>
                      <p className="text-[11px] text-slate-400 pt-0.5">{cand.education}</p>
                    </div>

                    {/* Matching Skills & Missing Gaps */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="text-emerald-400 font-bold text-[11px] uppercase tracking-wider">Matching:</span>
                        {cand.matchingSkills.slice(0, 4).map((skill, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-medium">
                            {skill} ✓
                          </span>
                        ))}
                      </div>

                      {cand.missingSkills.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 text-xs">
                          <span className="text-amber-400 font-bold text-[11px] uppercase tracking-wider">Skill Gap:</span>
                          {cand.missingSkills.map((gap, gIdx) => (
                            <span key={gIdx} className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px] font-medium">
                              {gap.name} ({gap.timeToLearn})
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Right: Radial Score & Action CTA */}
                <div className="flex items-center lg:flex-col lg:items-end justify-between shrink-0 gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <span className="text-xs font-bold text-white block">AI Match Score</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Rank #{cand.rank}</span>
                    </div>
                    {renderRadialGauge(cand.matchScore, 68, 5)}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playBlip(1000);
                      setInspectingCandidate(cand);
                    }}
                    className="px-4 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-sky-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View AI Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* 5. CANDIDATE DEEP INSPECTION DRAWER */}
      <AnimatePresence>
        {inspectingCandidate && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInspectingCandidate(null)}
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
                    src={inspectingCandidate.avatar}
                    alt={inspectingCandidate.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-white/10"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{inspectingCandidate.name}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">
                        Rank #{inspectingCandidate.rank}
                      </span>
                    </div>
                    <p className="text-xs text-sky-400">{inspectingCandidate.title} • {inspectingCandidate.location}</p>
                  </div>
                </div>

                <button
                  onClick={() => setInspectingCandidate(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 border border-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Match Score & Vector Breakdown */}
              <div className="p-6 rounded-3xl glass-panel border border-emerald-500/30 bg-emerald-500/[0.04] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-bold text-white">AI Compatibility Score</span>
                  </div>
                  <span className="text-2xl font-extrabold font-mono text-emerald-400">
                    {inspectingCandidate.matchScore}% Match
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-white/[0.06]">
                    <span className="text-xs font-mono font-bold text-sky-400 block">{inspectingCandidate.matchBreakdown.skills}%</span>
                    <span className="text-[10px] text-slate-400">Tech Skills</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-white/[0.06]">
                    <span className="text-xs font-mono font-bold text-indigo-400 block">{inspectingCandidate.matchBreakdown.projects}%</span>
                    <span className="text-[10px] text-slate-400">Projects</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-white/[0.06]">
                    <span className="text-xs font-mono font-bold text-emerald-400 block">{inspectingCandidate.matchBreakdown.experience}%</span>
                    <span className="text-[10px] text-slate-400">Experience</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-white/[0.06]">
                    <span className="text-xs font-mono font-bold text-purple-400 block">{inspectingCandidate.matchBreakdown.domain}%</span>
                    <span className="text-[10px] text-slate-400">Domain Fit</span>
                  </div>
                </div>
              </div>

              {/* AI Recommendation Summary */}
              <div className="p-5 rounded-2xl bg-sky-500/[0.05] border border-sky-400/25 space-y-2">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
                  AI Recommendation & Synthesis:
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {inspectingCandidate.aiRecommendation}
                </p>
              </div>

              {/* Matching Skills vs Missing Skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Matching Skills */}
                <div className="p-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/25 space-y-2.5">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                    Matching Skills ({inspectingCandidate.matchingSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {inspectingCandidate.matchingSkills.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium">
                        {s} ✓
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/25 space-y-2.5">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Identified Gaps ({inspectingCandidate.missingSkills.length})
                  </span>
                  <div className="space-y-1.5">
                    {inspectingCandidate.missingSkills.map((gap, idx) => (
                      <div key={idx} className="text-xs text-slate-300 flex items-center justify-between">
                        <span className="font-semibold text-white">{gap.name}</span>
                        <span className="text-[10px] text-amber-400 font-mono">({gap.timeToLearn})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Verified Project */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FolderGit2 className="w-4 h-4" /> Top Verified Repository
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-bold">
                    ★ {inspectingCandidate.topProject.stars} GitHub Stars
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white">{inspectingCandidate.topProject.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{inspectingCandidate.topProject.description}</p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {inspectingCandidate.topProject.tags.map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience & Education */}
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-1.5">
                  <span className="text-xs font-bold text-slate-400 uppercase block">Work Experience History</span>
                  <p className="text-slate-200">{inspectingCandidate.experienceSummary}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-1.5">
                  <span className="text-xs font-bold text-slate-400 uppercase block">Education & Credentials</span>
                  <p className="text-slate-200">{inspectingCandidate.education}</p>
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 sticky bottom-0 bg-[#090D15] pb-2">
                <button
                  onClick={() => {
                    toggleSelectCandidate(inspectingCandidate.id);
                    setToastMessage(`${inspectingCandidate.name} added to batch shortlist!`);
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-slate-200 text-xs font-semibold cursor-pointer"
                >
                  {selectedCandidateIds.includes(inspectingCandidate.id) ? 'Remove from Shortlist' : 'Add to Shortlist'}
                </button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    soundFx.playSuccess();
                    setToastMessage(`Interview invitation sent to ${inspectingCandidate.name}!`);
                    setTimeout(() => setToastMessage(null), 3500);
                  }}
                  className="px-6 py-2.5 rounded-xl shimmer-btn text-slate-950 text-xs font-extrabold shadow-lg shadow-sky-500/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 fill-current text-slate-950" />
                  <span>Schedule Technical Screen</span>
                </motion.button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. CREATE JOB MODAL */}
      <AnimatePresence>
        {createJobModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCreateJobModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#090D15] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 z-10 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Create New Job Opening</h3>
                    <p className="text-xs text-slate-400">AI will automatically index candidates against these criteria</p>
                  </div>
                </div>

                <button
                  onClick={() => setCreateJobModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateJobSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    placeholder="e.g. AI / ML Engineer, Foundation Model Specialist"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Department</label>
                    <input
                      type="text"
                      value={newJobDept}
                      onChange={(e) => setNewJobDept(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Location & Workstyle</label>
                    <input
                      type="text"
                      value={newJobLocation}
                      onChange={(e) => setNewJobLocation(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Compensation Range</label>
                  <input
                    type="text"
                    value={newJobSalary}
                    onChange={(e) => setNewJobSalary(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Required Skills (Comma separated) *</label>
                  <input
                    type="text"
                    required
                    value={newJobSkills}
                    onChange={(e) => setNewJobSkills(e.target.value)}
                    placeholder="e.g. Python, PyTorch, C++, SQL, Docker"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Job Description & Responsibilities</label>
                  <textarea
                    rows={3}
                    value={newJobDesc}
                    onChange={(e) => setNewJobDesc(e.target.value)}
                    placeholder="Describe role responsibilities, team structure, and primary deliverables..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCreateJobModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-slate-300 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-2.5 rounded-xl shimmer-btn text-slate-950 font-extrabold shadow-lg shadow-emerald-500/25 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Publish & Run AI Matcher</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. GENERATE SHORTLIST MODAL */}
      <AnimatePresence>
        {shortlistModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShortlistModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#090D15] border border-indigo-500/30 rounded-3xl p-6 sm:p-8 space-y-6 z-10 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">AI Shortlist Generated</h3>
                    <p className="text-xs text-slate-400">{selectedCandidateIds.length} candidate profiles compiled for {activeJob.title}</p>
                  </div>
                </div>

                <button
                  onClick={() => setShortlistModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Shortlist Table */}
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {candidates.filter(c => selectedCandidateIds.includes(c.id)).map(c => (
                  <div key={c.id} className="p-3 rounded-2xl bg-slate-950 border border-white/[0.06] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <span className="font-bold text-white block">{c.name}</span>
                        <span className="text-[11px] text-slate-400">{c.education}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-extrabold text-emerald-400 text-sm block">{c.matchScore}% Match</span>
                      <span className="text-[10px] text-sky-400">Rank #{c.rank}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/10">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-sky-400" />
                  <span>Export Shortlist (CSV)</span>
                </button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    soundFx.playSuccess();
                    setShortlistModalOpen(false);
                    setToastMessage(`Shortlist of ${selectedCandidateIds.length} candidates shared with hiring team!`);
                    setTimeout(() => setToastMessage(null), 3500);
                  }}
                  className="px-6 py-2.5 rounded-xl shimmer-btn text-slate-950 text-xs font-extrabold shadow-md shadow-sky-500/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 fill-current text-slate-950" />
                  <span>Share with Hiring Team</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. CANDIDATE COMPARISON MATRIX MODAL */}
      <AnimatePresence>
        {comparisonModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setComparisonModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#090D15] border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 z-10 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Side-by-Side Candidate Comparison</h3>
                    <p className="text-xs text-slate-400">Comparing {selectedCandidateIds.length} candidates for {activeJob.title}</p>
                  </div>
                </div>

                <button
                  onClick={() => setComparisonModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Comparison Matrix Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {candidates.filter(c => selectedCandidateIds.includes(c.id)).map((c) => (
                  <div key={c.id} className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-4">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <span className="font-bold text-white block text-sm">{c.name}</span>
                        <span className="text-[10px] text-sky-400">{c.title}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                      <span className="text-2xl font-extrabold font-mono text-emerald-400">{c.matchScore}%</span>
                      <span className="text-[10px] text-slate-400 block">Overall AI Match</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Education</span>
                      <p className="text-slate-200 text-[11px]">{c.education}</p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Top Skills</span>
                      <div className="flex flex-wrap gap-1">
                        {c.matchingSkills.slice(0, 4).map((s, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-emerald-300 font-mono">
                            {s} ✓
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Skill Gaps</span>
                      <div className="space-y-1">
                        {c.missingSkills.map((gap, i) => (
                          <span key={i} className="text-[10px] block text-amber-300 font-mono">
                            • {gap.name} ({gap.timeToLearn})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
