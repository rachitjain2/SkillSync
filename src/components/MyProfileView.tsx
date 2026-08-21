import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  ShieldCheck, 
  Sparkles, 
  Edit3, 
  Save, 
  Download, 
  Plus, 
  ExternalLink, 
  Star, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  TrendingUp, 
  Code2, 
  MapPin, 
  Mail,
  Check
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { TalentProfile, SkillItem } from '../types';
import { AppRoute } from './AppLayout';

interface MyProfileViewProps {
  profile: TalentProfile;
  onUpdateProfile: (updated: TalentProfile) => void;
  onNavigate: (route: AppRoute) => void;
}

export const MyProfileView: React.FC<MyProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onNavigate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedJSON, setCopiedJSON] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: profile.fullName,
    title: profile.title,
    bio: profile.bio,
    targetRole: profile.targetRole,
    targetSalary: profile.targetSalary,
    location: profile.location
  });

  const categories = ['All', 'Frontend & Web', 'Core Language', 'AI & ML', 'Cloud & DevOps', 'Database & Storage', 'Distributed Systems'];

  const filteredSkills = selectedCategory === 'All' 
    ? profile.skills 
    : profile.skills.filter(s => s.category === selectedCategory);

  const handleSaveProfile = () => {
    soundFx.playSuccess();
    onUpdateProfile({
      ...profile,
      fullName: editForm.fullName,
      title: editForm.title,
      bio: editForm.bio,
      targetRole: editForm.targetRole,
      targetSalary: editForm.targetSalary,
      location: editForm.location
    });
    setIsEditing(false);
  };

  const handleToggleSkillVerification = (skillId: string) => {
    soundFx.playSwitch();
    const updatedSkills = profile.skills.map(s => {
      if (s.id === skillId) {
        return { ...s, verified: !s.verified };
      }
      return s;
    });
    onUpdateProfile({ ...profile, skills: updatedSkills });
  };

  const handleExportJSON = () => {
    soundFx.playSuccess();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${profile.handle}_skillsync_profile.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Profile Header Dossier Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 sm:p-8 rounded-2xl glass-panel border border-sky-400/20 shadow-2xl relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <img
              src={profile.avatar}
              alt={profile.fullName}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-sky-400 shadow-xl shadow-sky-500/20 shrink-0"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  {profile.fullName}
                </h2>
                <span className="text-xs font-mono text-sky-400 font-semibold">{profile.handle}</span>
                <span className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Profile
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-200">{profile.title}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" />{profile.location}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-500" />{profile.email}</span>
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExportJSON}
              className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              {copiedJSON ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4 text-sky-400" />}
              <span>{copiedJSON ? 'Downloaded ✓' : 'Export Profile (JSON)'}</span>
            </motion.button>

            {isEditing ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveProfile}
                className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  soundFx.playSwitch();
                  setIsEditing(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-sky-300 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Bio & Target Roles */}
        {isEditing ? (
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Full Name</label>
              <input
                type="text"
                value={editForm.fullName}
                onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Professional Title</label>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Bio / Summary</label>
              <textarea
                rows={2}
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Target Job Role</label>
              <input
                type="text"
                value={editForm.targetRole}
                onChange={(e) => setEditForm({ ...editForm, targetRole: e.target.value })}
                className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Target Compensation</label>
              <input
                type="text"
                value={editForm.targetSalary}
                onChange={(e) => setEditForm({ ...editForm, targetSalary: e.target.value })}
                className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>
        ) : (
          <div className="pt-6 space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
              {profile.bio}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Target Role:</span>
                <span className="text-white font-semibold">{profile.targetRole}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Compensation:</span>
                <span className="text-sky-400 font-semibold">{profile.targetSalary}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Match Readiness:</span>
                <span className="text-emerald-400 font-bold font-mono">{profile.overallMatchReadiness}% Verified</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Verified Skills Matrix */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-sky-400" />
              Verified Skills Matrix
            </h3>
            <p className="text-xs text-slate-400">
              Evaluated based on code repositories, project history, and practical technical depth
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playSwitch();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border border-white/[0.06] hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              whileHover={{ y: -2 }}
              className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/[0.08] hover:border-sky-400/40 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                    {skill.name}
                  </h4>
                  <span className="text-xs text-slate-400">{skill.category}</span>
                </div>

                <button
                  onClick={() => handleToggleSkillVerification(skill.id)}
                  title={skill.verified ? "Verified Skill (Click to toggle)" : "Click to mark as verified"}
                  className={`px-2 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-medium transition-all cursor-pointer ${
                    skill.verified
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-850 text-slate-400 border border-white/10 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{skill.verified ? 'Verified' : 'Self-Reported'}</span>
                </button>
              </div>

              {/* Proficiency Bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400 font-medium">Proficiency</span>
                  <span className="text-sky-300 font-bold font-mono">{skill.proficiency}%</span>
                </div>
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/[0.04]">
                <span>{skill.yearsOfExperience} years experience</span>
                <span className="text-emerald-400/90 font-medium">Top {100 - (skill.marketDemandPercentile || 95)}% demand</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Experience History */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-sky-400" />
            Experience & Career Milestones
          </h3>
          <p className="text-xs text-slate-400">
            Work history with parsed technical achievements and measurable outcomes
          </p>
        </div>

        <div className="space-y-4">
          {profile.experience.map((exp) => (
            <motion.div
              key={exp.id}
              whileHover={{ y: -2 }}
              className="p-6 rounded-2xl glass-card border border-white/[0.08] space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-white">{exp.role}</h4>
                  <p className="text-xs text-sky-400 font-medium">{exp.company} • {exp.location}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs bg-white/[0.04] text-slate-300 border border-white/[0.08] self-start sm:self-auto font-medium">
                  {exp.period}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {exp.description}
              </p>

              {/* Quantified Impact Metrics */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-semibold text-slate-400 block">
                  Key Achievements & Impact:
                </span>
                {exp.impactMetrics.map((metric, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>

              {/* Highlighted Skills */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.highlightedSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-0.5 rounded-md bg-sky-500/10 text-sky-300 border border-sky-400/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Projects & Repositories */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-400" />
            Featured Projects & Open-Source Repositories
          </h3>
          <p className="text-xs text-slate-400">
            Real code artifacts demonstrating systems design and architectural depth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.projects.map((proj) => (
            <motion.div
              key={proj.id}
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl glass-card border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-sky-400/40 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    {proj.title}
                    {proj.stars && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1 font-semibold">
                        <Star className="w-3 h-3 fill-current" />
                        {proj.stars}
                      </span>
                    )}
                  </h4>
                  <span className="px-2.5 py-0.5 text-xs rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold font-mono">
                    {proj.aiVerificationScore}% Score
                  </span>
                </div>
                <p className="text-xs text-sky-400 font-medium mb-2">{proj.tagline}</p>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">{proj.description}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-400 hover:text-sky-300 flex items-center gap-1"
                    >
                      <span>View GitHub Repository</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-slate-200 flex items-center gap-1"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education */}
        <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-sky-400" />
            Education
          </h3>
          {profile.education.map((edu) => (
            <div key={edu.id} className="space-y-1.5 text-xs">
              <div className="text-sm font-bold text-white">{edu.degree}</div>
              <div className="text-sky-400 font-medium">{edu.institution} • {edu.year}</div>
              {edu.honors && <div className="text-slate-200 font-semibold">{edu.honors}</div>}
              <div className="pt-2 text-slate-400">
                <span className="block mb-1.5 font-medium">Relevant Coursework:</span>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 text-xs">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="p-6 rounded-2xl glass-panel border border-white/[0.08] space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-sky-400" />
            Certifications & Credentials
          </h3>
          <div className="space-y-3">
            {profile.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.06] flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-200">{cert.name}</div>
                  <div className="text-xs text-slate-400">{cert.issuer} • {cert.date}</div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
