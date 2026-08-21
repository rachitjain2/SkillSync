import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  UserCircle, 
  FileText, 
  Briefcase, 
  BarChart3, 
  Map, 
  Bot, 
  Settings, 
  Search, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Sparkles, 
  ChevronRight, 
  LogOut, 
  CheckCircle2, 
  Bell, 
  ExternalLink,
  TrendingUp,
  Award
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { TalentProfile } from '../types';

export type AppRoute = 
  | 'landing' 
  | 'login' 
  | 'signup' 
  | 'forgot-password' 
  | 'reset-password' 
  | 'dashboard' 
  | 'profile' 
  | 'resume' 
  | 'opportunities' 
  | 'match-analysis'
  | 'skills' 
  | 'roadmap' 
  | 'copilot' 
  | 'settings';

interface AppLayoutProps {
  children: React.ReactNode;
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  currentProfile: TalentProfile;
  onSelectPersona: (personaKey: string) => void;
  onOpenCommandPalette: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  session: any;
  onLogout: () => void;
  opportunitiesCount?: number;
  roadmapProgress?: number;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  currentRoute,
  onNavigate,
  currentProfile,
  onSelectPersona,
  onOpenCommandPalette,
  soundEnabled,
  onToggleSound,
  session,
  onLogout,
  opportunitiesCount = 5,
  roadmapProgress = 33
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [personaMenuOpen, setPersonaMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navItems = [
    {
      id: 'dashboard' as AppRoute,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'profile' as AppRoute,
      label: 'My Profile',
      icon: UserCircle,
      badge: `${currentProfile.overallMatchReadiness}%`
    },
    {
      id: 'resume' as AppRoute,
      label: 'Resume',
      icon: FileText,
      badge: 'Parser'
    },
    {
      id: 'opportunities' as AppRoute,
      label: 'Opportunities',
      icon: Briefcase,
      badge: `${opportunitiesCount} Top`
    },
    {
      id: 'match-analysis' as AppRoute,
      label: 'Match Analysis',
      icon: Sparkles,
      badge: '92%'
    },
    {
      id: 'skills' as AppRoute,
      label: 'Skill Analysis',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'roadmap' as AppRoute,
      label: 'Learning Roadmap',
      icon: Map,
      badge: `${roadmapProgress}%`
    },
    {
      id: 'copilot' as AppRoute,
      label: 'AI Career Copilot',
      icon: Bot,
      badge: 'Live'
    },
    {
      id: 'settings' as AppRoute,
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  const handleItemClick = (route: AppRoute) => {
    soundFx.playBlip(900, 0.03);
    onNavigate(route);
    setMobileSidebarOpen(false);
  };

  const getPageTitle = () => {
    switch (currentRoute) {
      case 'dashboard': return 'Command Dashboard';
      case 'profile': return 'AI Talent Profile';
      case 'resume': return 'Resume Parsing Lab';
      case 'opportunities': return 'Matched Opportunities';
      case 'match-analysis': return 'AI Match Analysis & Explainability';
      case 'skills': return 'Skill Radar & Market Gaps';
      case 'roadmap': return 'Personalized Learning Roadmap';
      case 'copilot': return 'AI Career Copilot';
      case 'settings': return 'Settings & Preferences';
      default: return 'SkillSync AI';
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#080B12] text-slate-100 font-sans select-none">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0D121F]/95 border-r border-white/[0.08] backdrop-blur-2xl shrink-0 z-30 justify-between">
        <div>
          {/* Logo Header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-white/[0.08]">
            <button 
              onClick={() => handleItemClick('landing')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500/20 to-indigo-600/30 border border-sky-400/40 flex items-center justify-center group-hover:border-sky-400 transition-colors shadow-sm shadow-sky-500/20">
                <Sparkles className="w-4 h-4 text-sky-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                  Skill<span className="text-sky-400">Sync</span>
                  <span className="text-[10px] px-1 py-0.2 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30 font-mono">
                    AI
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">Talent Platform</div>
              </div>
            </button>

            <button
              onClick={() => handleItemClick('landing')}
              title="Return to minimal landing"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Action Button */}
          <div className="p-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                soundFx.playSuccess();
                handleItemClick('resume');
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-violet-500/15 hover:from-sky-500/25 hover:via-indigo-500/25 hover:to-violet-500/25 border border-sky-400/30 hover:border-sky-400/50 text-sky-300 hover:text-sky-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm group cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-6 transition-transform" />
              <span>Parse New Resume</span>
            </motion.button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-2 space-y-1">
            <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Navigation
            </div>
            {navItems.map((item) => {
              const isActive = currentRoute === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-400/30 shadow-sm shadow-sky-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-sky-500/20 text-sky-300 font-bold' 
                        : 'bg-white/[0.05] text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Active Profile Pill */}
        <div className="p-3 border-t border-white/[0.08] relative">
          <div 
            onClick={() => setPersonaMenuOpen(!personaMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-white/[0.07] hover:border-sky-400/30 transition-all cursor-pointer flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={currentProfile.avatar}
                alt={currentProfile.fullName}
                className="w-8 h-8 rounded-lg object-cover border border-sky-400/40 shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-200 truncate">
                  {currentProfile.fullName}
                </div>
                <div className="text-[10px] text-sky-400 font-medium truncate">
                  {currentProfile.overallMatchReadiness}% Match Ready
                </div>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${personaMenuOpen ? 'rotate-90' : ''}`} />
          </div>

          {/* Popover Persona Switcher & Logout */}
          <AnimatePresence>
            {personaMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.96 }}
                className="absolute bottom-16 left-3 right-3 bg-slate-900 border border-white/10 rounded-2xl p-2.5 shadow-2xl z-40 text-xs font-sans space-y-1"
              >
                <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Active Candidate
                </div>
                <button
                  onClick={() => {
                    soundFx.playSwitch();
                    onSelectPersona('rachit-jain');
                    setPersonaMenuOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between cursor-pointer ${
                    currentProfile.id === 'rachit-jain' ? 'bg-sky-500/15 text-sky-300 font-semibold' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>Rachit Jain (AI/ML Intern)</span>
                  {currentProfile.id === 'rachit-jain' && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />}
                </button>
                <button
                  onClick={() => {
                    soundFx.playSwitch();
                    onSelectPersona('alex-rivera');
                    setPersonaMenuOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between cursor-pointer ${
                    currentProfile.id === 'alex-rivera' ? 'bg-sky-500/15 text-sky-300 font-semibold' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>Alex Rivera (Senior AI)</span>
                  {currentProfile.id === 'alex-rivera' && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />}
                </button>
                <button
                  onClick={() => {
                    soundFx.playSwitch();
                    onSelectPersona('sarah-lin');
                    setPersonaMenuOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between cursor-pointer ${
                    currentProfile.id === 'sarah-lin' ? 'bg-indigo-500/15 text-indigo-300 font-semibold' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>Sarah Lin (ML Platform)</span>
                  {currentProfile.id === 'sarah-lin' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
                
                <div className="pt-1 mt-1 border-t border-white/[0.08]">
                  <button
                    onClick={() => {
                      setPersonaMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-red-400 hover:bg-red-500/10 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Reset / Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-72 bg-[#0D121F] border-r border-white/10 h-full p-4 flex flex-col justify-between z-10"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-sky-400" />
                    <span className="font-bold text-white">SkillSync AI</span>
                  </div>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = currentRoute === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                          isActive
                            ? 'bg-sky-500/15 text-sky-300 border border-sky-400/30'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/5 text-slate-300">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-red-400 bg-red-500/10 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Exit Session</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main View Container */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Top Navigation Header Bar */}
        <header className="h-16 px-4 sm:px-6 bg-[#0D121F]/80 border-b border-white/[0.08] backdrop-blur-xl flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white bg-white/[0.03] border border-white/10"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-slate-400">SkillSync AI</span>
              <span className="hidden sm:inline text-slate-600">/</span>
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {getPageTitle()}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Command Palette Search */}
            <button
              onClick={() => {
                soundFx.playSwitch();
                onOpenCommandPalette();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-white/10 hover:border-sky-400/40 text-xs text-slate-400 hover:text-slate-200 transition-all shadow-inner group cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 group-hover:text-sky-400 transition-colors" />
              <span className="hidden sm:inline">Search & Navigate</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.06] text-slate-300 rounded border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Persona Fast Switcher Pill */}
            <div className="hidden lg:flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => {
                  soundFx.playSwitch();
                  onSelectPersona('rachit-jain');
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  currentProfile.id === 'rachit-jain' ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Rachit (AI/ML)
              </button>
              <button
                onClick={() => {
                  soundFx.playSwitch();
                  onSelectPersona('alex-rivera');
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  currentProfile.id === 'alex-rivera' ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Alex (Senior)
              </button>
              <button
                onClick={() => {
                  soundFx.playSwitch();
                  onSelectPersona('sarah-lin');
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  currentProfile.id === 'sarah-lin' ? 'bg-indigo-500/20 text-indigo-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sarah (Infra)
              </button>
            </div>

            {/* Audio Feedback Toggle */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute Interface Audio' : 'Enable Interactive Sound FX'}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-sky-500/15 border-sky-400/40 text-sky-400 shadow-sm shadow-sky-500/20'
                  : 'bg-slate-950/70 border-white/10 text-slate-400 hover:text-slate-200'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Notifications Toggle */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-white/10 text-slate-400 hover:text-slate-200 transition-all relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sky-500" />
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    className="absolute right-0 mt-2 w-80 bg-slate-900 border border-white/10 rounded-2xl p-4 shadow-2xl z-50 text-xs"
                  >
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.08]">
                      <span className="font-bold text-white">Career Notifications</span>
                      <span className="text-[11px] text-sky-400 font-semibold">2 New Updates</span>
                    </div>
                    <div className="space-y-2.5">
                      <div 
                        onClick={() => {
                          setNotificationsOpen(false);
                          handleItemClick('opportunities');
                        }}
                        className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/20 hover:border-sky-400/40 cursor-pointer transition-colors"
                      >
                        <div className="text-sky-300 font-semibold mb-0.5">Anthropic Match: 96%</div>
                        <p className="text-[11px] text-slate-400">Senior AI Full-Stack role matches your OpenAgent-Stream repository.</p>
                      </div>
                      <div 
                        onClick={() => {
                          setNotificationsOpen(false);
                          handleItemClick('roadmap');
                        }}
                        className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 hover:border-violet-500/40 cursor-pointer transition-colors"
                      >
                        <div className="text-violet-300 font-semibold mb-0.5">Roadmap Task Ready</div>
                        <p className="text-[11px] text-slate-400">Complete Sprint 1 WebContainer task to increase match score for 14 roles.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Scrollable View Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
};
