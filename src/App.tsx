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
      if (lower.includes('which jobs') || lower.includes('suitable for') || lower.includes('best jobs')) {
        responseText = `### 🎯 Roles Most Suitable for Your Profile (${currentProfile.fullName})\n\nBased on your verified skills (**Python 96%**, **Machine Learning 94%**, **C++ 90%**, **SQL 88%**) and project repositories, here are your top 3 highest-conviction opportunities:\n\n1. **AI Engineer Intern @ Microsoft (92% Match)**\n   - **Why you fit:** Strong alignment with Microsoft Copilot foundation models, PyTorch RAG pipelines, and SQL database tuning.\n   - **Skill Gap to 100%:** AWS / Azure cloud deployment.\n\n2. **Machine Learning Engineering Intern @ Google DeepMind (90% Match)**\n   - **Why you fit:** Exceptional algorithmic ranking (Top 2.1%) combined with low-level C++ SIMD optimization.\n   - **Skill Gap to 100%:** Distributed training (JAX).\n\n3. **AI Research Intern @ Meta FAIR (89% Match)**\n   - **Why you fit:** Edge vision and NLP Transformer fine-tuning experience from NeuralCraft Systems.\n   - **Skill Gap to 100%:** Triton GPU kernel optimization.`;
        suggestedPrompts = [
          'What skills am I missing for an AI Engineer role?',
          'How can I improve my resume for Microsoft?',
          'What should I learn next to reach 100%?'
        ];
      } else if (lower.includes('missing') || lower.includes('gaps') || lower.includes('skills am i missing')) {
        responseText = `### 🔍 Skill Gaps Identified for AI / ML Engineer Roles\n\nComparing your profile against 14 enterprise job specifications, the AI matching model identified **3 primary skill gaps**:\n\n1. **Cloud Deployment (AWS / Azure) — Critical (-5% Score Impact)**\n   - *Why:* Enterprise teams require candidates to deploy models to AWS ECS Fargate or SageMaker inference endpoints rather than running locally.\n   - *Time to Acquire:* 1-2 weeks.\n\n2. **Containerization (Docker) — Recommended (-3% Score Impact)**\n   - *Why:* Standardizing CUDA dependencies and FastAPI microservices with reproducible multi-stage Dockerfiles.\n   - *Time to Acquire:* 1 week.\n\n3. **Cluster Orchestration (Kubernetes) — High Synergy**\n   - *Why:* Scaling distributed GPU worker pods across high-throughput inference clusters.\n   - *Time to Acquire:* 2-3 weeks.\n\n*Closing AWS & Docker will immediately elevate your Microsoft match from 92% to 100%.*`;
        suggestedPrompts = [
          'What should I learn next?',
          'Show me the 4-week learning roadmap',
          'Conduct a mock interview for the Microsoft AI Engineer Intern role'
        ];
      } else if (lower.includes('improve my resume') || lower.includes('improve resume') || lower.includes('resume')) {
        responseText = `### 📝 Actionable Resume Improvements for ${currentProfile.fullName}\n\nHere are 3 high-impact recommendations to elevate your resume from good to elite:\n\n1. **Quantify Repository Impact:**\n   - *Before:* "Built a RAG application with vector search."\n   - *After:* *"Architected an open-source Multi-Modal RAG Knowledge Assistant in **Python, PyTorch, and Qdrant** (420 ★ GitHub), achieving sub-140ms semantic retrieval across 250k+ technical documents."*\n\n2. **Highlight Low-Latency C++ Depth:**\n   - *Before:* "Wrote computer vision code in C++."\n   - *After:* *"Developed a real-time edge vision pipeline in **C++ and OpenCV** utilizing SIMD vectorization and multithreading, cutting inference latency by 35%."*\n\n3. **Lead with NIT CS & AI Academic Rank:**\n   - Emphasize your **3.91/4.00 GPA** and Dean's Honor List directly in the header education block.`;
        suggestedPrompts = [
          'Which jobs am I most suitable for?',
          'Why was I rejected for this role?',
          'What should I learn next?'
        ];
      } else if (lower.includes('rejected') || lower.includes('rejection') || lower.includes('why was i rejected')) {
        responseText = `### 🔍 AI Rejection Diagnostic & Root-Cause Analysis\n\nWhen candidates with your profile face rejections at top frontier labs, it is rarely due to fundamental coding ability. The top 3 diagnostic reasons are:\n\n1. **Lack of Production Cloud Deployment History:**\n   - Many applicants have local PyTorch models, but lack verified **AWS SageMaker / Docker containerization** experience serving live traffic.\n\n2. **Vague Metric Quantification:**\n   - Resumes that describe *responsibilities* rather than *quantified business impact* (e.g. latency reductions, queries per second, benchmark percentiles) score lower in ATS screenings.\n\n3. **Missing System Design Artifacts:**\n   - Enterprise teams prioritize candidates who can demonstrate end-to-end API design (FastAPI schemas, database indexing, connection pooling).\n\n*SkillSync AI's 4-Week Learning Roadmap is specifically designed to eliminate these 3 rejection failure modes.*`;
        suggestedPrompts = [
          'What should I learn next to fix this?',
          'What skills am I missing for an AI Engineer role?',
          'Find opportunities matching my profile.'
        ];
      } else if (lower.includes('learn next') || lower.includes('what should i learn')) {
        responseText = `### 🚀 What You Should Learn Next (Priority Action Plan)\n\nBased on your current 92% readiness score, here is your highest-leverage learning sequence:\n\n- **Step 1 (Days 1-7): Docker for AI Engineers**\n  - Build multi-stage Dockerfiles packaging Python 3.11, PyTorch CUDA runtimes, and reduce image sizes under 450MB.\n\n- **Step 2 (Days 8-14): FastAPI + Qdrant Microservices**\n  - Package your Multi-Modal RAG Assistant into Docker Compose with health checks and asynchronous token batching.\n\n- **Step 3 (Days 15-21): AWS S3 & IAM Security**\n  - Configure encrypted model weight buckets and automated EC2 GPU instance provisioning.\n\n- **Step 4 (Days 22-28): Amazon SageMaker Serverless Endpoints**\n  - Deploy autoscaling inference with CloudWatch telemetry (<120ms P95 latency).\n\n*Completing this roadmap takes ~28 hours total and unlocks 100% qualification.*`;
        suggestedPrompts = [
          'Add this sequence to my Learning Roadmap',
          'Which jobs am I most suitable for?',
          'Conduct a mock interview for the Microsoft AI Engineer Intern role'
        ];
      } else if (lower.includes('find opportunities') || lower.includes('matching my profile') || lower.includes('opportunities')) {
        responseText = `### 💼 Matched Opportunities for Your Profile\n\nI have retrieved **14 qualified opportunities** ranked by your AI vector compatibility score:\n\n1. **Microsoft** — AI Engineer Intern (**92% Match**)\n   - *Location:* Redmond, WA / Remote (Hybrid) • *$48 - $56/hr + Housing*\n\n2. **Google DeepMind** — Machine Learning Engineering Intern (**90% Match**)\n   - *Location:* Mountain View, CA / London • *$52 - $60/hr + Relocation*\n\n3. **Meta (FAIR)** — AI Research Intern (**89% Match**)\n   - *Location:* Menlo Park, CA / Remote • *$55 - $64/hr + Housing*\n\n4. **Amazon (AWS)** — Generative AI & Data Systems Intern (**86% Match**)\n   - *Location:* Seattle, WA / Bangalore • *$45 - $54/hr*\n\n5. **Anthropic** — Junior AI Applied Scientist (**85% Match**)\n   - *Location:* San Francisco, CA / Remote • *$120k - $150k + Equity*`;
        suggestedPrompts = [
          'Why am I a 92% match for Microsoft?',
          'What skills am I missing for an AI Engineer role?',
          'Conduct a mock interview for Microsoft'
        ];
      } else if (lower.includes('microsoft') || lower.includes('copilot')) {
        responseText = `### 🎯 Strategic Interview Playbook: Microsoft AI Engineer Intern (92% Match)\n\n#### 1. Core Technical Talking Points:\n- **Multi-Modal RAG Architecture:** Detail your 420 ★ GitHub project combining Qdrant vector indexing, sentence embeddings, and FastAPI token streaming.\n- **Low-Latency Inference:** Explain your C++ and PyTorch quantization benchmarks reducing latency by 35%.\n- **Database Performance:** Highlight your SQL query optimization (indexing & EXPLAIN ANALYZE) at DataStream Technologies handling 50k IoT feeds.\n\n#### 2. Sample Technical Screening Question:\n> *"How do you handle retrieval hallucination when embedding cosine similarity scores are borderline (<0.65)?"*\n\n**Recommended Response:**\n1. Implement hybrid search (BM25 sparse keyword + dense embeddings).\n2. Apply cross-encoder re-ranking on the top 20 candidate chunks.\n3. Add a confidence threshold gate with explicit citation provenance.`;
        suggestedPrompts = [
          'Conduct a live technical mock interview for Microsoft',
          'Explain how to master AWS SageMaker & Docker to reach 100%',
          'Critique my RAG project architecture for engineering hiring managers'
        ];
      } else {
        responseText = `Hello **${currentProfile.fullName}**! I am your **SkillSync AI Career Copilot**.\n\nI have active memory of your profile:\n- **Candidate Dossier:** ${currentProfile.fullName} (NIT, GPA 3.91, CS & AI)\n- **Top Opportunity:** Microsoft AI Engineer Intern (**92% Match**)\n- **Verified Skills:** Python, Machine Learning, C++, SQL, PyTorch, FastAPI\n- **Target Skill Gaps:** AWS, Docker, Kubernetes\n\nHow can I help you accelerate your career today?`;
        suggestedPrompts = [
          'Which jobs am I most suitable for?',
          'What skills am I missing for an AI Engineer role?',
          'How can I improve my resume?',
          'What should I learn next?'
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
              opportunities={opportunities}
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
