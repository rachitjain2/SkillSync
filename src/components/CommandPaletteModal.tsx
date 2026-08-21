import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  LayoutDashboard, 
  UserCircle, 
  FileText, 
  Briefcase, 
  BarChart3, 
  Map, 
  Bot, 
  Settings, 
  Sparkles, 
  ArrowRight, 
  Volume2, 
  Cpu,
  CheckCircle2
} from 'lucide-react';
import { AppRoute } from './AppLayout';
import { JobOpportunity, TalentProfile } from '../types';
import { soundFx } from '../utils/audio';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: AppRoute) => void;
  onSelectPersona: (personaKey: string) => void;
  currentProfile: TalentProfile;
  opportunities: JobOpportunity[];
  onSelectOpportunity: (job: JobOpportunity) => void;
  onToggleSound: () => void;
  soundEnabled: boolean;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectPersona,
  currentProfile,
  opportunities,
  onSelectOpportunity,
  onToggleSound,
  soundEnabled
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : soundFx.playSwitch();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const appNavActions = [
    { label: 'Go to Command Dashboard', route: 'dashboard' as AppRoute, icon: LayoutDashboard },
    { label: 'View AI Talent Profile', route: 'profile' as AppRoute, icon: UserCircle },
    { label: 'Open Resume Ingestion Lab', route: 'resume' as AppRoute, icon: FileText },
    { label: 'Explore Matched Opportunities', route: 'opportunities' as AppRoute, icon: Briefcase },
    { label: 'Inspect Skill Matrix & Radar', route: 'skills' as AppRoute, icon: BarChart3 },
    { label: 'Open Personalized Learning Roadmap', route: 'roadmap' as AppRoute, icon: Map },
    { label: 'Chat with AI Career Copilot', route: 'copilot' as AppRoute, icon: Bot },
    { label: 'Configure System Settings', route: 'settings' as AppRoute, icon: Settings },
  ];

  const filteredNavActions = appNavActions.filter(a => 
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredJobs = opportunities.filter(j => 
    j.title.toLowerCase().includes(query.toLowerCase()) ||
    j.company.toLowerCase().includes(query.toLowerCase()) ||
    j.matchedSkills.some(s => s.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-2xl rounded-2xl glass-panel border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 overflow-hidden bg-[#090D15]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] bg-obsidian-900/80">
          <Search className="w-5 h-5 text-cyan-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a page, job title, company, or action (e.g., Anthropic, Roadmap, Rust)..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans"
          />
          <kbd className="px-2 py-1 text-[10px] font-mono bg-obsidian-800 text-slate-400 rounded border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results / Commands Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Navigation Items */}
          <div>
            <div className="text-[11px] font-mono text-cyan-400 px-3 py-1 uppercase tracking-wider">
              Navigation Pages
            </div>
            <div className="space-y-1 mt-1">
              {filteredNavActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      soundFx.playBlip(900);
                      onNavigate(action.route);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.06] hover:border-cyan-500/30 border border-transparent cursor-pointer transition-all text-xs text-slate-300 hover:text-white group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span>{action.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Matched Opportunities */}
          {filteredJobs.length > 0 && (
            <div>
              <div className="text-[11px] font-mono text-slate-400 px-3 py-1 uppercase tracking-wider">
                Matched Opportunities ({filteredJobs.length})
              </div>
              <div className="space-y-1 mt-1">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => {
                      soundFx.playSuccess();
                      onSelectOpportunity(job);
                      onNavigate('opportunities');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.06] hover:border-cyan-500/30 border border-transparent cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-7 h-7 rounded-lg object-cover border border-white/10"
                      />
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {job.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {job.company} • {job.salaryRange}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {job.matchScore}% Match
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Persona Switcher Shortcuts */}
          <div>
            <div className="text-[11px] font-mono text-slate-400 px-3 py-1 uppercase tracking-wider">
              Switch Active Persona
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                onClick={() => {
                  soundFx.playSwitch();
                  onSelectPersona('alex-rivera');
                  onClose();
                }}
                className={`p-2.5 rounded-xl border text-xs font-medium text-left flex items-center justify-between ${
                  currentProfile.id === 'alex-rivera'
                    ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                    : 'bg-obsidian-900 border-white/[0.06] text-slate-300 hover:text-white'
                }`}
              >
                <span>Alex Rivera (AI Eng)</span>
                {currentProfile.id === 'alex-rivera' && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
              <button
                onClick={() => {
                  soundFx.playSwitch();
                  onSelectPersona('sarah-lin');
                  onClose();
                }}
                className={`p-2.5 rounded-xl border text-xs font-medium text-left flex items-center justify-between ${
                  currentProfile.id === 'sarah-lin'
                    ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                    : 'bg-obsidian-900 border-white/[0.06] text-slate-300 hover:text-white'
                }`}
              >
                <span>Sarah Lin (MLOps)</span>
                {currentProfile.id === 'sarah-lin' && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-obsidian-900/90 px-4 py-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            SkillSync Global Command Palette
          </span>
          <span>Navigation: [↑] [↓] Select: [Enter]</span>
        </div>
      </motion.div>
    </div>
  );
};
