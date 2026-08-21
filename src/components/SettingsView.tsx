import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Save, 
  Sliders, 
  User, 
  Bell, 
  ShieldCheck, 
  Database, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Key, 
  RefreshCw,
  LogOut
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { TalentProfile } from '../types';

interface SettingsViewProps {
  currentProfile: TalentProfile;
  onUpdateProfile: (updated: TalentProfile) => void;
  session: any;
  onLogout: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentProfile,
  onUpdateProfile,
  session,
  onLogout
}) => {
  const [targetRole, setTargetRole] = useState(currentProfile.targetRole);
  const [targetSalary, setTargetSalary] = useState(currentProfile.targetSalary);
  const [weights, setWeights] = useState({
    skills: 40,
    experience: 30,
    projects: 20,
    domain: 10
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    soundFx.playSuccess();
    onUpdateProfile({
      ...currentProfile,
      targetRole,
      targetSalary
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Settings className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Settings & Matching Preferences
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Configure autonomous matching sensitivity, target compensation, and system integrations.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all active:scale-95"
        >
          {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Saved ✓' : 'Save Preferences'}</span>
        </button>
      </div>

      {/* Target Role & Career Criteria */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08] space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08]">
          <User className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Target Role & Opportunity Criteria
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-mono text-slate-400 mb-1.5">Primary Target Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-obsidian-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-400 font-medium"
            />
          </div>

          <div>
            <label className="block font-mono text-slate-400 mb-1.5">Target Total Compensation</label>
            <input
              type="text"
              value={targetSalary}
              onChange={(e) => setTargetSalary(e.target.value)}
              className="w-full bg-obsidian-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-400 font-medium"
            />
          </div>
        </div>
      </div>

      {/* AI Match Vector Sensitivity Weights */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08] space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08]">
          <Sliders className="w-5 h-5 text-violet-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Autonomous Vector Weight Calibration
          </h3>
        </div>
        <p className="text-xs text-slate-300">
          Adjust the relative mathematical weights used by SkillSync Kernel when computing match percentages.
        </p>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Technical Skill Match Weight</span>
              <span className="text-cyan-400 font-bold">{weights.skills}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              value={weights.skills}
              onChange={(e) => setWeights({ ...weights, skills: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Experience & Tenure Weight</span>
              <span className="text-cyan-400 font-bold">{weights.experience}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              value={weights.experience}
              onChange={(e) => setWeights({ ...weights, experience: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Project / Repository Relevance</span>
              <span className="text-cyan-400 font-bold">{weights.projects}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              value={weights.projects}
              onChange={(e) => setWeights({ ...weights, projects: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Security & Authentication Metadata */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08] space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08]">
          <Database className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Security & Cryptographic Attestations
          </h3>
        </div>

        <div className="space-y-2 text-xs font-mono">
          <div className="p-3 bg-obsidian-950 rounded-xl border border-white/[0.04] flex items-center justify-between">
            <span className="text-slate-400">Node Identity:</span>
            <span className="text-slate-200">{session?.user?.email || currentProfile.email}</span>
          </div>
          <div className="p-3 bg-obsidian-950 rounded-xl border border-white/[0.04] flex items-center justify-between">
            <span className="text-slate-400">ZK Attestation Hash:</span>
            <span className="text-cyan-400 truncate max-w-[250px]">{currentProfile.zeroKnowledgeHash}</span>
          </div>
          <div className="p-3 bg-obsidian-950 rounded-xl border border-white/[0.04] flex items-center justify-between">
            <span className="text-slate-400">Auth State:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Authenticated & Attested
            </span>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out & Clear Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
