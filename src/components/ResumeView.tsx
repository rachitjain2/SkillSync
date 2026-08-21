import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  ArrowRight, 
  RefreshCw, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  Zap, 
  FileCheck,
  Star,
  Check,
  Search,
  User,
  Mail,
  Award,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  FolderGit2,
  Terminal,
  Clock,
  Compass,
  ChevronRight
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { TalentProfile } from '../types';
import { SAMPLE_RESUME_TEXTS } from '../utils/mockData';
import { AppRoute } from './AppLayout';

interface ResumeViewProps {
  currentProfile: TalentProfile;
  onUpdateProfile: (updated: TalentProfile) => void;
  onNavigate: (route: AppRoute) => void;
}

interface ExtractedSkillEvidence {
  skill: string;
  category: 'Languages' | 'Frameworks' | 'Tools' | 'Core Concepts' | 'Soft Skills';
  confidence: number;
  evidence: string;
}

export const ResumeView: React.FC<ResumeViewProps> = ({
  currentProfile,
  onUpdateProfile,
  onNavigate
}) => {
  // Step state: 1 = Upload, 2 = AI Processing, 3 = Results
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>({
    name: 'Rachit_Jain_AI_ML_Resume.pdf',
    size: '1.4 MB'
  });
  const [uploadProgress, setUploadProgress] = useState(100);
  const [isUploading, setIsUploading] = useState(false);

  // Processing stage state
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const processingStages = [
    { title: 'Reading resume', detail: 'Parsing document layout, OCR structure, and raw token stream' },
    { title: 'Extracting information', detail: 'Normalizing candidate personal dossier, education, and credentials' },
    { title: 'Identifying skills', detail: 'Classifying programming languages, ML frameworks, databases, and tools' },
    { title: 'Analyzing experience', detail: 'Quantifying internship impacts, project repositories, and technical depth' },
    { title: 'Building talent profile', detail: 'Synthesizing AI career summary and skill confidence evidence vectors' }
  ];

  // Skill Confidence & Evidence Dataset
  const skillEvidenceList: ExtractedSkillEvidence[] = [
    { skill: 'Python', category: 'Languages', confidence: 96, evidence: 'Used extensively in 4 projects, 2 internships, and automated ML pipelines' },
    { skill: 'Machine Learning', category: 'Core Concepts', confidence: 94, evidence: 'Demonstrated in 3 projects, model evaluation benchmarks, and DeepLearning.AI cert' },
    { skill: 'C++', category: 'Languages', confidence: 90, evidence: 'Used in real-time edge vision pipeline & university data structures coursework' },
    { skill: 'SQL', category: 'Tools', confidence: 88, evidence: 'Mentioned in projects and coursework (PostgreSQL query optimization & IoT feeds)' },
    { skill: 'AI & Deep Learning', category: 'Core Concepts', confidence: 92, evidence: 'PyTorch transformer fine-tuning and multi-modal RAG architecture' },
    { skill: 'PyTorch & TensorFlow', category: 'Frameworks', confidence: 86, evidence: 'Used for classification benchmarks and model quantization' },
    { skill: 'FastAPI', category: 'Frameworks', confidence: 84, evidence: 'Constructed asynchronous REST microservices for 50,000+ IoT telemetry feeds' },
    { skill: 'Git & GitHub', category: 'Tools', confidence: 92, evidence: 'Continuous version control across verified open-source repositories' },
    { skill: 'Cloud Deployment (AWS)', category: 'Tools', confidence: 64, evidence: 'Mentioned as foundational knowledge; primary target for roadmap improvement' }
  ];

  const handleStartProcessing = () => {
    soundFx.playSuccess();
    setCurrentStep(2);
    setActiveStageIdx(0);

    let stage = 0;
    const interval = setInterval(() => {
      soundFx.playPulse();
      stage++;
      if (stage < processingStages.length) {
        setActiveStageIdx(stage);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          soundFx.playSuccess();
          setCurrentStep(3);
        }, 500);
      }
    }, 700);
  };

  const handleFileUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadedFile({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    });

    let prog = 0;
    const uploadInterval = setInterval(() => {
      prog += 25;
      setUploadProgress(prog);
      soundFx.playBlip(700 + prog * 5);
      if (prog >= 100) {
        clearInterval(uploadInterval);
        setIsUploading(false);
        soundFx.playSuccess();
      }
    }, 150);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleLoadSample = (key: string) => {
    soundFx.playBlip(900);
    if (key === 'rachit') {
      setUploadedFile({ name: 'Rachit_Jain_AI_ML_Resume.pdf', size: '1.4 MB' });
    } else if (key === 'alex') {
      setUploadedFile({ name: 'Alex_Rivera_Senior_AI_Resume.pdf', size: '1.8 MB' });
    } else {
      setUploadedFile({ name: 'Sarah_Lin_Staff_MLOps_Resume.pdf', size: '2.1 MB' });
    }
    setUploadProgress(100);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      
      {/* 1. HEADER & STEP PROGRESS INDICATOR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-400/20">
              <FileText className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Resume Intelligence & Parsing Lab
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Upload your resume document to receive an AI-extracted talent dossier, skill confidence matrix, and opportunity recommendations.
          </p>
        </div>

        {/* 3-Step Wizard Navigation Indicator */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-white/[0.08] text-xs font-mono self-start md:self-auto">
          {[
            { step: 1, label: '1. Upload' },
            { step: 2, label: '2. AI Processing' },
            { step: 3, label: '3. Results Dossier' },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => {
                if (item.step === 1 || (item.step === 3 && currentStep === 3)) {
                  soundFx.playSwitch();
                  setCurrentStep(item.step as any);
                }
              }}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                currentStep === item.step
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-sm'
                  : currentStep > item.step
                    ? 'text-emerald-400 hover:text-emerald-300'
                    : 'text-slate-500'
              }`}
            >
              <span>{item.label}</span>
              {currentStep > item.step && <span className="ml-1 text-emerald-400">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: UPLOAD RESUME */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-6"
        >
          {/* Main Drag & Drop Card */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleFileDrop}
            className={`p-10 sm:p-14 rounded-3xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center min-h-[340px] relative overflow-hidden glass-panel ${
              dragActive 
                ? 'border-sky-400 bg-sky-500/10 scale-[1.01]' 
                : uploadedFile 
                  ? 'border-emerald-500/40 bg-emerald-500/[0.02]' 
                  : 'border-white/15 hover:border-sky-400/40'
            }`}
          >
            {/* Center Icon */}
            <div className="w-18 h-18 rounded-3xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-400/30 flex items-center justify-center mb-5 text-sky-400 shadow-xl shadow-sky-500/10">
              {uploadedFile ? (
                <FileCheck className="w-9 h-9 text-emerald-400" />
              ) : (
                <UploadCloud className="w-9 h-9 text-sky-400" />
              )}
            </div>

            {uploadedFile ? (
              <div className="space-y-2 mb-6 max-w-md">
                <span className="text-xs font-bold text-emerald-400 font-mono flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Ready for AI Parsing
                </span>
                <h3 className="text-lg font-bold text-white truncate">{uploadedFile.name}</h3>
                <span className="text-xs text-slate-400 font-mono">{uploadedFile.size} • Document Parsed</span>

                {/* Upload Progress Bar */}
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden mt-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-sky-400 h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2 mb-6 max-w-md">
                <h3 className="text-xl font-extrabold text-white">Drag & drop your resume file here</h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Accepts <strong className="text-slate-200">PDF, DOCX, or TXT</strong> files (up to 15MB)
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <label className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 text-xs font-bold cursor-pointer transition-all hover:border-sky-400/40 flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" />
                <span>Browse Local Files</span>
                <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileSelect} className="hidden" />
              </label>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartProcessing}
                disabled={!uploadedFile || isUploading}
                className="px-7 py-3 rounded-xl shimmer-btn text-slate-950 text-xs font-extrabold shadow-xl shadow-sky-500/25 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Run AI Intelligence Engine</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Quick Load Sample Resumes */}
          <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                Or Try Sample Candidate Resumes:
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleLoadSample('rachit')}
                className="p-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-sky-400/30 text-left transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-white group-hover:text-sky-300">Rachit Jain (AI / ML)</div>
                <div className="text-[11px] text-sky-400">Student / Fresher • Python, ML, C++, SQL</div>
              </button>

              <button
                onClick={() => handleLoadSample('alex')}
                className="p-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-white/[0.08] hover:border-indigo-400/30 text-left transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-white group-hover:text-indigo-300">Alex Rivera (Senior AI)</div>
                <div className="text-[11px] text-slate-400">6+ yrs • Next.js, vLLM, Vector DBs</div>
              </button>

              <button
                onClick={() => handleLoadSample('sarah')}
                className="p-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-white/[0.08] hover:border-violet-400/30 text-left transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-white group-hover:text-violet-300">Sarah Lin (ML Platform)</div>
                <div className="text-[11px] text-slate-400">8+ yrs • GPU Clusters, Kubernetes, IaC</div>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 2: AI PROCESSING INTERFACE */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="p-8 sm:p-12 rounded-3xl glass-panel border border-sky-400/30 space-y-8 text-center relative overflow-hidden"
        >
          {/* Animated Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-sky-400/10 to-transparent h-24 animate-scanline" />

          <div className="max-w-md mx-auto space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/15 border border-sky-400/40 flex items-center justify-center mx-auto text-sky-400 animate-pulse">
              <Cpu className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-extrabold text-white">AI Resume Analysis in Progress</h2>
            <p className="text-xs text-slate-400">
              Extracting entities, calculating skill confidence vectors, and constructing verified talent profile.
            </p>
          </div>

          {/* 5 Animated Processing Stages */}
          <div className="max-w-xl mx-auto space-y-3 text-left">
            {processingStages.map((stage, idx) => {
              const isCurrent = activeStageIdx === idx;
              const isDone = activeStageIdx > idx;

              return (
                <motion.div
                  key={idx}
                  animate={isCurrent ? { x: [0, 4, 0] } : {}}
                  className={`p-3.5 rounded-2xl text-xs flex items-start gap-3 transition-all ${
                    isCurrent
                      ? 'bg-sky-500/15 border border-sky-400/40 text-sky-300 shadow-md shadow-sky-500/10'
                      : isDone
                        ? 'bg-emerald-500/[0.04] border border-emerald-500/25 text-slate-300'
                        : 'bg-white/[0.02] border border-white/[0.04] text-slate-500'
                  }`}
                >
                  {isCurrent ? (
                    <RefreshCw className="w-4 h-4 text-sky-400 animate-spin mt-0.5 shrink-0" />
                  ) : isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 mt-0.5 shrink-0" />
                  )}

                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm">{stage.title}</div>
                    <div className="text-[11px] text-slate-400">{stage.detail}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* STEP 3: RESULTS (AI-GENERATED TALENT PROFILE) */}
      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-7"
        >
          {/* Top Bar Banner with Sync & Navigate Actions */}
          <div className="p-6 rounded-3xl glass-panel border border-emerald-500/30 bg-gradient-to-r from-emerald-500/[0.06] via-sky-500/[0.04] to-transparent flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-extrabold text-white">AI Talent Profile Generated</h2>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-bold">
                    Extraction Score: 98.4%
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  All skills, projects, and quantified achievements have been synthesized into your active profile.
                </p>
              </div>
            </div>

            {/* Top Action CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  soundFx.playSuccess();
                  onNavigate('profile');
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Improve My Profile</span>
                <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  soundFx.playSuccess();
                  onNavigate('opportunities');
                }}
                className="px-6 py-2.5 rounded-xl shimmer-btn text-slate-950 text-xs font-extrabold shadow-lg shadow-sky-500/25 flex items-center gap-1.5 cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5 fill-current" />
                <span>Find Matching Opportunities</span>
              </motion.button>
            </div>
          </div>

          {/* Section 1: AI PROFILE SUMMARY */}
          <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-sky-400/25 bg-gradient-to-br from-sky-500/[0.04] to-indigo-500/[0.02] space-y-3">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>AI Profile Summary</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              "<strong>Rachit Jain</strong> is a high-potential AI/ML engineer with strong foundational problem-solving in Python and C++, proven experience building deep learning pipelines and Multi-Modal RAG systems, and practical relational database query optimization skills. Well-positioned for AI/ML engineering internships and research associate roles."
            </p>
          </div>

          {/* Section 2: PERSONAL INFORMATION & SKILLS CONFIDENCE (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 5 Cols: PERSONAL INFORMATION */}
            <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08]">
                <User className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Personal Information</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/[0.04]">
                  <span className="text-slate-400 block text-[11px] mb-0.5">Full Name</span>
                  <span className="text-white font-bold text-sm">Rachit Jain</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/[0.04]">
                  <span className="text-slate-400 block text-[11px] mb-0.5">Email Address</span>
                  <span className="text-sky-300 font-mono">rachit.jain@skillsync.io</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/[0.04]">
                  <span className="text-slate-400 block text-[11px] mb-0.5">Education</span>
                  <span className="text-slate-200 font-bold block">B.Tech in CS & Artificial Intelligence</span>
                  <span className="text-slate-400 text-[11px]">National Institute of Technology • 2022 - 2026 (GPA: 3.91)</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/[0.04]">
                  <span className="text-slate-400 block text-[11px] mb-0.5">Career Experience Level</span>
                  <span className="text-emerald-400 font-semibold">Student / Fresher (2 Internships)</span>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: SKILL CONFIDENCE & EVIDENCE */}
            <div className="lg:col-span-7 p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Skill Confidence & Resume Evidence</h3>
                </div>
                <span className="text-[10px] font-mono text-sky-400">{skillEvidenceList.length} Skills Attested</span>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {skillEvidenceList.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/[0.06] hover:border-sky-400/30 transition-all text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{item.skill}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded bg-white/[0.05] text-slate-400 font-mono">
                          {item.category}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold font-mono">
                        {item.confidence}% Confidence
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-300 flex items-start gap-2">
                      <span className="text-sky-400 font-semibold shrink-0">Evidence:</span>
                      <span>{item.evidence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: CATEGORIZED SKILLS TAXONOMY */}
          <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <Code2 className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Extracted Skills Breakdown</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              {/* Programming Languages */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.04] space-y-2">
                <span className="text-sky-400 font-bold block text-xs">Programming Languages</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Python', 'C++', 'SQL', 'JavaScript'].map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-200 border border-white/[0.06] text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frameworks */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.04] space-y-2">
                <span className="text-indigo-400 font-bold block text-xs">Frameworks & ML</span>
                <div className="flex flex-wrap gap-1.5">
                  {['PyTorch', 'TensorFlow', 'FastAPI', 'Scikit-Learn', 'HuggingFace'].map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-200 border border-white/[0.06] text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & Platforms */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.04] space-y-2">
                <span className="text-emerald-400 font-bold block text-xs">Tools & Databases</span>
                <div className="flex flex-wrap gap-1.5">
                  {['PostgreSQL', 'Qdrant Vector DB', 'Git', 'Docker', 'OpenCV'].map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-200 border border-white/[0.06] text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Concepts */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.04] space-y-2">
                <span className="text-violet-400 font-bold block text-xs">Technical Concepts</span>
                <div className="flex flex-wrap gap-1.5">
                  {['RAG Pipelines', 'Deep Learning', 'Data Structures', 'OOP in C++'].map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-200 border border-white/[0.06] text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.04] space-y-2">
                <span className="text-amber-400 font-bold block text-xs">Soft Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Problem Solving', 'Team Collaboration', 'Research Rigor', 'Adaptability'].map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-200 border border-white/[0.06] text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: PROJECTS & EXPERIENCE HIGHLIGHTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: PROJECTS */}
            <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
                <FolderGit2 className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Extracted Projects</h3>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.05] space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">Multi-Modal RAG Knowledge Assistant</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-semibold font-mono">420 ★ GitHub</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    End-to-end question-answering pipeline combining vector search (Qdrant), sentence embeddings, and open-source LLM reasoning with an interactive web UI.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Python', 'Machine Learning', 'PyTorch', 'SQL', 'FastAPI', 'Qdrant'].map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-400/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.05] space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">Real-Time Edge Vision Pipeline in C++</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-semibold font-mono">280 ★ GitHub</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    High-performance object detection and tracking in C++ and OpenCV utilizing multithreading and SIMD instructions.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['C++', 'AI & Deep Learning', 'OpenCV', 'Algorithms', 'SIMD'].map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-400/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: EXPERIENCE */}
            <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
                <Briefcase className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Extracted Experience</h3>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.05] space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">AI / ML Research Intern</h4>
                    <span className="text-xs font-mono text-sky-400">NeuralCraft Systems (2024 - Present)</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-300 leading-relaxed">
                    <li>Improved model classification accuracy from 84% to 93.6% on benchmark datasets.</li>
                    <li>Optimized inference latency by 35% through quantization and batch processing.</li>
                    <li>Authored comprehensive documentation and unit tests for ML pipeline components.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.05] space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">Software Development Intern (Backend)</h4>
                    <span className="text-xs font-mono text-sky-400">DataStream Technologies (2023 - 2024)</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-300 leading-relaxed">
                    <li>Built RESTful API microservices in Python and SQL handling telemetry ingestion from 50,000+ IoT endpoints.</li>
                    <li>Reduced API response times by 28% through database indexing and connection pooling.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: BOTTOM STICKY ACTION BAR */}
          <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Need to upload an updated version of your resume?
              <button
                onClick={() => {
                  soundFx.playSwitch();
                  setCurrentStep(1);
                }}
                className="ml-2 text-sky-400 hover:text-sky-300 font-bold underline cursor-pointer"
              >
                Re-upload Resume
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  soundFx.playSuccess();
                  onNavigate('profile');
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4 text-sky-400" />
                <span>Improve My Profile</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  soundFx.playSuccess();
                  onNavigate('opportunities');
                }}
                className="px-6 py-2.5 rounded-xl shimmer-btn text-slate-950 text-xs font-extrabold shadow-lg shadow-sky-500/25 flex items-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 fill-current" />
                <span>Find Matching Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
};
