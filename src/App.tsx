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
      if (lower.includes('anthropic') || lower.includes('streaming') || lower.includes('interview')) {
        responseText = `Here is your strategic preparation playbook for **Anthropic's Senior AI Full-Stack** role:\n\n### 1. Key Technical Talking Points:\n- **Token Streaming Latency:** Highlight your *OpenAgent-Stream* architecture (handling 4.2M daily inferences with sub-25ms TTFT).\n- **Backpressure Handling:** Explain how you use TypeScript async iterators and Web Streams API to prevent UI jank during 500+ tok/sec burst outputs.\n- **Wasm Sandboxing:** Emphasize your Sprint 1 progress compiling memory-isolated Rust modules into WebAssembly.\n\n### 2. Live Simulation Question:\n*"How would you design a real-time collaborative artifact canvas where multiple users can prompt Claude while seeing real-time DOM diffs?"*\n\n**Recommended Response Structure:**\n1. Explain local-first state synchronization via Yjs.\n2. Detail the token-to-AST streaming parser.\n3. Mention WebContainer microVM isolation for security.`;
        suggestedPrompts = [
          'Simulate the coding question on SSE backpressure',
          'How should I respond to behavioral questions on AI safety?',
          'Draft an opening pitch for the Anthropic hiring manager'
        ];
      } else if (lower.includes('negotiat') || lower.includes('offer') || lower.includes('salary')) {
        responseText = `### Strategic Compensation Negotiation Blueprint for $245k + Equity:\n\n1. **Leverage Points:**\n- Your top 1.2% algorithmic percentile and verified ZK-proof attestation on Sepolia.\n- Direct domain match: You built an open-source tool (*OpenAgent-Stream*) with 3.4k GitHub stars solving their exact problem.\n- Competing opportunity pipelines with Linear ($250k) and Scale AI ($280k).\n\n2. **Negotiation Script:**\n> *"I'm thrilled about the mission to build intuitive multimodal interfaces for Claude. Based on my existing production track record scaling streaming pipelines and multiple competing offers in the $240k-$260k band, I would be ready to sign immediately if we can align on $235,000 base + 0.18% equity grant with accelerated vesting."*`;
        suggestedPrompts = [
          'What if they push back on the equity percentage?',
          'How do I negotiate for a signing bonus or compute stipend?',
          'Review my written counter-offer email draft'
        ];
      } else if (lower.includes('wasm') || lower.includes('crdt') || lower.includes('roadmap') || lower.includes('14 days')) {
        responseText = `### 14-Day Accelerated Roadmap: WebAssembly + CRDT Mastery\n\n- **Days 1-4 (Rust to Wasm):** Write a Rust crate using \`wasm-bindgen\` and \`wasm-pack\` to parse streaming JSON-RPC payloads directly into SharedArrayBuffers.\n- **Days 5-8 (CRDT Fundamentals):** Implement a multi-client collaborative document in TypeScript using \`yjs\` and \`y-webrtc\`.\n- **Days 9-12 (Browser Sandbox):** Connect StackBlitz WebContainers to run virtualized Python/Node.js in-browser with zero server dependency.\n- **Days 13-14 (Portfolio Attestation):** Publish as a verified open-source repo to boost your match scores across Anthropic and Linear to 99%.`;
        suggestedPrompts = [
          'Add these 14-day milestones to my Learning Roadmap',
          'Give me the Rust wasm-bindgen boilerplate code',
          'How do I test Yjs conflict resolution under packet loss?'
        ];
      } else {
        responseText = `I have analyzed your inquiry against your **${currentProfile.fullName}** profile and current target role (**${currentProfile.targetRole}**).\n\nKey Recommendations:\n- Your core skills in TypeScript, Next.js, and vLLM are currently in the **top 1.5% of market demand**.\n- You have **5 high-synergy opportunities** ready on your match board, led by Anthropic (96% match) and Vercel (95% match).\n- Completing **Sprint 1 Task 3 (WebContainers in browser)** is your highest-leverage priority today.\n\nLet me know which area you'd like to dive deeper into!`;
        suggestedPrompts = [
          'Prep me for my next technical screening',
          'How do I optimize my resume bullet points for high impact?',
          'Review the missing skills for the Linear Staff Platform role'
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
