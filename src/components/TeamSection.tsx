import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Cpu, ShieldCheck, Sparkles, ExternalLink, Fingerprint, Award } from 'lucide-react';
import { MOCK_TEAM } from '../utils/mockData';
import { TeamMember } from '../types';
import { soundFx } from '../utils/audio';

export const TeamSection: React.FC = () => {
  const [activeMemberModal, setActiveMemberModal] = useState<TeamMember | null>(null);

  return (
    <section id="team" className="py-24 relative overflow-hidden bg-obsidian-950/40">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Core Architecture Council</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Pioneering Autonomous <br />
            <span className="text-gradient-purple">Talent Intelligence</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            Engineered by researchers and distributed systems veterans from Google DeepMind, OpenAI, Stanford AI Lab, and Stripe Core.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_TEAM.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => soundFx.playBlip(950 + idx * 40)}
              onClick={() => {
                soundFx.playSuccess();
                setActiveMemberModal(member);
              }}
              className="rounded-2xl glass-panel p-5 sm:p-6 flex flex-col justify-between group hover:border-violet-400/50 transition-all cursor-pointer shadow-xl relative overflow-hidden"
            >
              <div>
                {/* Avatar with Glow & Ring */}
                <div className="relative mb-5 mx-auto w-24 h-24 sm:w-28 sm:h-28">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full rounded-2xl object-cover border-2 border-violet-500/40 group-hover:border-cyan-400 transition-colors shadow-lg shadow-violet-500/20"
                  />
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-violet-500/20 to-cyan-500/20 blur-sm -z-10 group-hover:opacity-100 opacity-50 transition-opacity" />
                  <span className="absolute -bottom-1.5 -right-1.5 p-1 rounded-lg bg-obsidian-900 border border-violet-500/40 text-cyan-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Info */}
                <div className="text-center mb-4">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs font-mono text-violet-400 font-medium mt-0.5">
                    {member.role}
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono mt-1">
                    {member.specialty}
                  </p>
                </div>

                {/* Short Bio */}
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4 text-center">
                  {member.bio}
                </p>
              </div>

              {/* Affiliation Badges */}
              <div className="pt-3 border-t border-white/[0.06]">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {member.previous.map((prev, pIdx) => (
                    <span
                      key={pIdx}
                      className="text-[9px] font-mono px-2 py-0.5 rounded bg-obsidian-900 text-slate-400 border border-white/[0.06]"
                    >
                      {prev}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Member Details Modal */}
      <AnimatePresence>
        {activeMemberModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl glass-panel border border-violet-500/40 p-6 sm:p-8 shadow-2xl shadow-violet-950/50"
            >
              <button
                onClick={() => {
                  soundFx.playBlip(700);
                  setActiveMemberModal(null);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-obsidian-900 border border-white/10"
              >
                ✕
              </button>

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={activeMemberModal.avatar}
                  alt={activeMemberModal.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-violet-400 shadow-md"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">{activeMemberModal.name}</h3>
                  <div className="text-xs font-mono text-cyan-400">{activeMemberModal.role}</div>
                  <div className="text-xs text-slate-400">{activeMemberModal.specialty}</div>
                </div>
              </div>

              <div className="space-y-4 text-xs font-sans text-slate-300 mb-6 leading-relaxed">
                <p>{activeMemberModal.bio}</p>
                <div className="p-3 rounded-xl bg-obsidian-950/80 border border-white/[0.08] font-mono text-[11px]">
                  <div className="text-violet-400 font-semibold mb-1 flex items-center gap-1.5">
                    <Fingerprint className="w-3.5 h-3.5" />
                    Cryptographic Neural Signature
                  </div>
                  <div className="text-slate-400 truncate">{activeMemberModal.neuralSignature}</div>
                  <div className="text-emerald-400 text-[10px] mt-1">✓ On-Chain Verifier Key Active</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <div className="flex gap-1.5">
                  {activeMemberModal.previous.map((p, i) => (
                    <span key={i} className="text-[10px] font-mono bg-obsidian-900 px-2 py-1 rounded text-slate-300 border border-white/10">
                      {p}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    soundFx.playBlip(800);
                    setActiveMemberModal(null);
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
