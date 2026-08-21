import React, { useState, useEffect } from 'react';
import { BackgroundParticles } from './components/BackgroundParticles';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { AppLayout, AppRoute } from './components/AppLayout';
import { MinimalLanding } from './components/MinimalLanding';
import { DashboardView } from './components/DashboardView';
import { MyProfileView } from './components/MyProfileView';
import { ResumeView } from './components/ResumeView';
import { OpportunitiesView } from './components/OpportunitiesView';
import { SkillAnalysisView } from './components/SkillAnalysisView';
import { LearningRoadmapView } from './components/LearningRoadmapView';
import { CareerCopilotView } from './components/CareerCopilotView';
import { SettingsView } from './components/SettingsView';
import { MatchAnalysisView } from './components/MatchAnalysisView';

// Authentication Views
import { LoginView } from './components/LoginView';
import { SignupView } from './components/SignupView';
import { ForgotPasswordView } from './components/ForgotPasswordView';
import { ResetPasswordView } from './components/ResetPasswordView';

import { 
  TalentProfile, 
  JobOpportunity, 
  RoadmapSprint, 
  CopilotMessage 
} from './types';
import { 
  INITIAL_TALENT_PROFILES, 
  MOCK_JOB_OPPORTUNITIES, 
  INITIAL_ROADMAP_SPRINTS, 
  INITIAL_COPILOT_MESSAGES 
} from './utils/mockData';
import { soundFx } from './utils/audio';
import { supabase } from './utils/supabaseClient';

export const App: React.FC = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Authentication & Session
  const [session, setSession] = useState<any>(null);

  // Active Persona & Central State (Default: Rachit Jain)
  const [activePersonaKey, setActivePersonaKey] = useState<string>('rachit-jain');
  const [currentProfile, setCurrentProfile] = useState<TalentProfile>(INITIAL_TALENT_PROFILES['rachit-jain']);
  const [opportunities, setOpportunities] = useState<JobOpportunity[]>(MOCK_JOB_OPPORTUNITIES);
  const [roadmaps, setRoadmaps] = useState<RoadmapSprint[]>(INITIAL_ROADMAP_SPRINTS);
  const [selectedOpportunity, setSelectedOpportunity] = useState<JobOpportunity | null>(null);
  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>(INITIAL_COPILOT_MESSAGES);

  // Routing state
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('dashboard');

  // Monitor Supabase session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, activeSession) => {
      setSession(activeSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Hash Router Listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      
      const validRoutes: AppRoute[] = [
        'landing', 'login', 'signup', 'forgot-password', 'reset-password', 
        'dashboard', 'profile', 'resume', 'opportunities', 'match-analysis', 'skills', 
        'roadmap', 'copilot', 'settings'
      ];

      if (hash.includes('recovery') || hash.includes('type=recovery')) {
        setCurrentRoute('reset-password');
      } else if (validRoutes.includes(hash as AppRoute)) {
        setCurrentRoute(hash as AppRoute);
      } else if (hash === '') {
        // Default to dashboard for SaaS-first experience or minimal landing if explicitly visited
        setCurrentRoute('dashboard');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleNavigate = (route: AppRoute) => {
    window.location.hash = route === 'landing' ? '#/landing' : `#/${route}`;
    setCurrentRoute(route);
  };

  const handleToggleSound = () => {
    const newState = soundFx.toggleSound();
    setSoundEnabled(newState);
  };

  const handleSelectPersona = (personaKey: string) => {
    setActivePersonaKey(personaKey);
    const profile = INITIAL_TALENT_PROFILES[personaKey] || INITIAL_TALENT_PROFILES['alex-rivera'];
    setCurrentProfile(profile);

    // Adjust opportunity match scores dynamically based on persona
    if (personaKey === 'sarah-lin') {
      const remappedJobs = MOCK_JOB_OPPORTUNITIES.map(job => {
        if (job.id === 'job-3') {
          return { ...job, matchScore: 98, aiRationale: 'Direct 98% synergy for Sarah Lin. 8+ years GPU cluster orchestration, eBPF telemetry, and Ray framework matches Scale AI compute team.' };
        } else if (job.id === 'job-1') {
          return { ...job, matchScore: 89 };
        }
        return job;
      });
      setOpportunities(remappedJobs);
    } else {
      setOpportunities(MOCK_JOB_OPPORTUNITIES);
    }
  };

  const handleUpdateProfile = (updated: TalentProfile) => {
    setCurrentProfile(updated);
  };

  const handleToggleTask = (sprintId: string, taskId: string) => {
    const updatedRoadmaps = roadmaps.map(sprint => {
      if (sprint.id === sprintId) {
        const updatedTasks = sprint.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });
        return { ...sprint, tasks: updatedTasks };
      }
      return sprint;
    });

    setRoadmaps(updatedRoadmaps);

    // Calculate completed and slightly boost profile match readiness
    const all = updatedRoadmaps.flatMap(s => s.tasks);
    const completedCount = all.filter(t => t.completed).length;
    const boost = Math.min(99, 90 + Math.round((completedCount / all.length) * 8));
    setCurrentProfile(prev => ({
      ...prev,
      overallMatchReadiness: boost
    }));
  };

  const handleApplyOpportunity = (jobId: string) => {
    setOpportunities(prev => prev.map(job => {
      if (job.id === jobId) {
        return { ...job, applied: true };
      }
      return job;
    }));
  };

  const handleToggleSaveOpportunity = (jobId: string) => {
    setOpportunities(prev => prev.map(job => {
      if (job.id === jobId) {
        return { ...job, saved: !job.saved };
      }
      return job;
    }));
  };

  const handleGenerateCustomRoadmap = (job: JobOpportunity) => {
    const newSprint: RoadmapSprint = {
      id: `sprint-custom-${Date.now()}`,
      sprintNumber: roadmaps.length + 1,
      title: `Sprint ${roadmaps.length + 1}: Targeted Qualification for ${job.company}`,
      subtitle: `Close identified skill gaps for ${job.title}`,
      focusArea: job.department,
      targetOpportunityId: job.id,
      targetOpportunityTitle: `${job.title} @ ${job.company}`,
      tasks: job.missingSkills.map((gap, idx) => ({
        id: `task-custom-${idx}`,
        title: `Master ${gap.skillName}`,
        description: `Acquire core proficiency in ${gap.skillName} using recommended curriculum (${gap.suggestedResource}).`,
        skillTag: gap.category,
        completed: false,
        estimatedHours: gap.difficultyToAcquire.includes('Fast') ? 8 : 16,
        difficulty: gap.difficultyToAcquire.includes('Fast') ? 'Intermediate' : 'Advanced',
        resourceType: 'Hands-on Project',
        resourceTitle: gap.suggestedResource,
        resourceLink: 'https://github.com'
      }))
    };

    setRoadmaps([newSprint, ...roadmaps]);
  };

  const handleSendMessage = (text: string) => {
    const userMsg: CopilotMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: 'Just now',
      text
    };

    setCopilotMessages(prev => [...prev, userMsg]);

    // Simulate intelligent streaming assistant response
    setTimeout(() => {
      soundFx.playSuccess();
      let responseText = '';
      let suggestedPrompts: string[] = [];

      const lower = text.toLowerCase();
      if (lower.includes('microsoft') || lower.includes('ai engineer') || lower.includes('copilot')) {
        responseText = `### 🎯 Strategic Interview Playbook: Microsoft AI Engineer Intern (92% Match)\n\n#### 1. Core Technical Talking Points:\n- **Multi-Modal RAG Architecture:** Detail your 420 ★ GitHub project combining Qdrant vector indexing, sentence embeddings, and FastAPI token streaming.\n- **Low-Latency Inference:** Explain your C++ and PyTorch quantization benchmarks reducing latency by 35%.\n- **Database Performance:** Highlight your SQL query optimization (indexing & EXPLAIN ANALYZE) at DataStream Technologies handling 50k IoT feeds.\n\n#### 2. Sample Technical Screening Question:\n> *"How do you handle retrieval hallucination when embedding cosine similarity scores are borderline (<0.65)?"*\n\n**Recommended Response:**\n1. Implement hybrid search (BM25 sparse keyword + dense embeddings).\n2. Apply cross-encoder re-ranking on the top 20 candidate chunks.\n3. Add a confidence threshold gate with explicit citation provenance.`;
        suggestedPrompts = [
          'Conduct a live technical mock interview for Microsoft',
          'Explain how to master AWS SageMaker & Docker to reach 100%',
          'Critique my RAG project architecture for engineering hiring managers'
        ];
      } else if (lower.includes('deepmind') || lower.includes('c++') || lower.includes('algorithm')) {
        responseText = `### 🧠 Google DeepMind ML Engineering Playbook (90% Match)\n\n#### 1. Why DeepMind Values Your Profile:\n- DeepMind looks for candidates who balance high-level Python ML modeling with low-level **C++ SIMD performance**.\n- Your real-time edge vision pipeline in C++ and **Top 2.1% algorithmic rank** give you a significant edge.\n\n#### 2. Key DeepMind Interview Concepts:\n- **Transformer Attention Complexity:** FlashAttention memory tiling ($O(N)$ SRAM vs $O(N^2)$ HBM).\n- **Distributed Training:** PyTorch DDP vs FSDP and gradient accumulation across TPU/GPU clusters.\n- **C++ Concurrency:** Lock-free queues, memory barriers, and SIMD vectorization with OpenCV.`;
        suggestedPrompts = [
          'Give me 3 C++ concurrency questions asked at DeepMind',
          'How do I explain PyTorch DDP multi-GPU training?',
          'Simulate an algorithmic system design problem'
        ];
      } else if (lower.includes('aws') || lower.includes('docker') || lower.includes('sagemaker') || lower.includes('roadmap') || lower.includes('100%')) {
        responseText = `### ⚡ 4-Week Accelerated Roadmap to 100% Role Qualification\n\n- **Week 1 (Docker Fundamentals):** Multi-stage builds, CUDA runtime containerization (<450MB image).\n- **Week 2 (Docker + ML Serving):** FastAPI + Uvicorn worker pools, health check probes, Docker Compose with Qdrant.\n- **Week 3 (AWS Fundamentals):** IAM least-privilege security policies, S3 model artifact buckets, EC2 GPU provisioning.\n- **Week 4 (Deploy ML on AWS):** Amazon SageMaker serverless endpoints, ECS Fargate, CloudWatch latency telemetry (<120ms P95).\n\n*Completing these 4 milestones bridges your qualification from 92% to 100% verified match across all 14 target roles.*`;
        suggestedPrompts = [
          'Show me the Dockerfile template for PyTorch + FastAPI',
          'How do I set up an autoscaling SageMaker endpoint?',
          'Recalculate my matches after completing AWS & Docker'
        ];
      } else if (lower.includes('resume') || lower.includes('project') || lower.includes('rag')) {
        responseText = `### 📝 AI Project Resume Critique: Multi-Modal RAG Knowledge Assistant\n\n#### Original Bullet Points:\n- Built a RAG application in Python and PyTorch with vector search.\n\n#### 🚀 High-Impact Rewritten Version:\n- **Architected and open-sourced** an end-to-end Multi-Modal RAG Knowledge Assistant in **Python, PyTorch, and Qdrant** (420 ★ GitHub), achieving sub-140ms semantic retrieval over 250k+ technical documents.\n- **Constructed asynchronous FastAPI REST endpoints** with connection pooling and Redis caching, sustaining 450+ concurrent requests with zero dropped frames.\n- **Benchmarked token precision and latency**, improving model hallucination resilience by 28% through cross-encoder re-ranking.`;
        suggestedPrompts = [
          'Critique my C++ Edge Vision project bullets',
          'Draft a tailored cover letter for Microsoft Copilot',
          'How do I present my NIT GPA (3.91) effectively?'
        ];
      } else {
        responseText = `Hello **${currentProfile.fullName}**! I am your **SkillSync AI Career Copilot**.\n\nHere is your current career standing:\n- **Active Persona:** ${currentProfile.fullName} (${currentProfile.title})\n- **Top Opportunity:** Microsoft AI Engineer Intern (**92% Match**)\n- **Key Missing Skills:** AWS & Docker (Closing these will bring your match score to **100%**)\n\nWhat would you like to prepare for next?`;
        suggestedPrompts = [
          'Conduct a mock interview for the Microsoft AI Engineer Intern role',
          'Explain the 4-week roadmap to master AWS & Docker',
          'Critique my RAG project description for tech resumes',
          'Give me 5 practice C++ algorithm questions asked at Google DeepMind'
        ];
      }

      const copilotMsg: CopilotMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'copilot',
        timestamp: 'Just now',
        text: responseText,
        suggestedPrompts
      };

      setCopilotMessages(prev => [...prev, copilotMsg]);
    }, 650);
  };

  const handleAskCopilotAboutJob = (job: JobOpportunity) => {
    handleSendMessage(`Prep me for an interview for the ${job.title} role at ${job.company}. Focus on what their engineering team looks for and how my background aligns.`);
  };

  // Compute stats
  const allTasks = roadmaps.flatMap(s => s.tasks);
  const completedTasks = allTasks.filter(t => t.completed);
  const roadmapProgress = Math.round((completedTasks.length / allTasks.length) * 100) || 0;

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden">
      {/* Background Neural Particles */}
      <BackgroundParticles />

      {/* View Router */}
      {currentRoute === 'landing' ? (
        <div className="min-h-screen relative z-10 flex flex-col justify-between">
          {/* Minimal Header on Landing */}
          <header className="h-20 px-6 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <span className="font-mono text-cyan-400 font-bold text-base">§</span>
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                Skill<span className="text-cyan-400">Sync</span> AI
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavigate('login')}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNavigate('dashboard')}
                className="px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all shadow-sm"
              >
                Launch Console OS
              </button>
            </div>
          </header>

          <MinimalLanding
            onNavigate={handleNavigate}
            currentProfile={currentProfile}
            onSelectPersona={handleSelectPersona}
          />

          {/* Minimal Footer */}
          <footer className="h-16 px-6 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/[0.06] text-xs font-mono text-slate-500">
            <span>SkillSync AI Talent Operating System v4.8</span>
            <span>Zero-Knowledge Skill Attestations</span>
          </footer>
        </div>
      ) : ['login', 'signup', 'forgot-password', 'reset-password'].includes(currentRoute) ? (
        /* Standalone Auth Views */
        <main className="relative z-10 flex items-center justify-center min-h-screen p-4">
          {currentRoute === 'login' && (
            <LoginView 
              onNavigate={handleNavigate} 
              onLoginSuccess={(activeSession) => {
                setSession(activeSession);
                handleNavigate('dashboard');
              }} 
            />
          )}
          {currentRoute === 'signup' && (
            <SignupView onNavigate={handleNavigate} />
          )}
          {currentRoute === 'forgot-password' && (
            <ForgotPasswordView onNavigate={handleNavigate} />
          )}
          {currentRoute === 'reset-password' && (
            <ResetPasswordView onNavigate={handleNavigate} />
          )}
        </main>
      ) : (
        /* Full SaaS Application Shell */
        <AppLayout
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          currentProfile={currentProfile}
          onSelectPersona={handleSelectPersona}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          session={session}
          onLogout={() => {
            setSession(null);
            handleNavigate('landing');
          }}
          opportunitiesCount={opportunities.length}
          roadmapProgress={roadmapProgress}
        >
          {currentRoute === 'dashboard' && (
            <DashboardView
              currentProfile={currentProfile}
              opportunities={opportunities}
              roadmaps={roadmaps}
              onNavigate={handleNavigate}
              onSelectOpportunity={(job) => setSelectedOpportunity(job)}
              onToggleTask={handleToggleTask}
              onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            />
          )}

          {currentRoute === 'profile' && (
            <MyProfileView
              profile={currentProfile}
              onUpdateProfile={handleUpdateProfile}
              onNavigate={handleNavigate}
            />
          )}

          {currentRoute === 'resume' && (
            <ResumeView
              currentProfile={currentProfile}
              onUpdateProfile={handleUpdateProfile}
              onNavigate={handleNavigate}
            />
          )}

          {currentRoute === 'opportunities' && (
            <OpportunitiesView
              opportunities={opportunities}
              currentProfile={currentProfile}
              selectedOpportunity={selectedOpportunity}
              onSelectOpportunity={(job) => setSelectedOpportunity(job)}
              onApplyOpportunity={handleApplyOpportunity}
              onToggleSaveOpportunity={handleToggleSaveOpportunity}
              onGenerateCustomRoadmap={handleGenerateCustomRoadmap}
              onNavigate={handleNavigate}
              onAskCopilotAboutJob={handleAskCopilotAboutJob}
            />
          )}

          {currentRoute === 'match-analysis' && (
            <MatchAnalysisView
              currentProfile={currentProfile}
              opportunities={opportunities}
              selectedOpportunity={selectedOpportunity}
              onSelectOpportunity={(job) => setSelectedOpportunity(job)}
              onNavigate={handleNavigate}
              onApplyOpportunity={handleApplyOpportunity}
              onGenerateCustomRoadmap={handleGenerateCustomRoadmap}
            />
          )}

          {currentRoute === 'skills' && (
            <SkillAnalysisView
              currentProfile={currentProfile}
              onNavigate={handleNavigate}
              onAddSkillToRoadmap={(skillName) => {
                const targetJob = opportunities[0];
                handleGenerateCustomRoadmap(targetJob);
              }}
            />
          )}

          {currentRoute === 'roadmap' && (
            <LearningRoadmapView
              roadmaps={roadmaps}
              currentProfile={currentProfile}
              onToggleTask={handleToggleTask}
              onNavigate={handleNavigate}
            />
          )}

          {currentRoute === 'copilot' && (
            <CareerCopilotView
              messages={copilotMessages}
              onSendMessage={handleSendMessage}
              currentProfile={currentProfile}
              onNavigate={handleNavigate}
            />
          )}

          {currentRoute === 'settings' && (
            <SettingsView
              currentProfile={currentProfile}
              onUpdateProfile={handleUpdateProfile}
              session={session}
              onLogout={() => {
                setSession(null);
                handleNavigate('landing');
              }}
            />
          )}
        </AppLayout>
      )}

      {/* Global Command Palette (⌘K) */}
      <CommandPaletteModal
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        onSelectPersona={handleSelectPersona}
        currentProfile={currentProfile}
        opportunities={opportunities}
        onSelectOpportunity={(job) => setSelectedOpportunity(job)}
        onToggleSound={handleToggleSound}
        soundEnabled={soundEnabled}
      />
    </div>
  );
};

export default App;
