import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight, Server, Cpu, Mail, Lock } from 'lucide-react';
import { MOCK_PRICING } from '../utils/mockData';
import { soundFx } from '../utils/audio';

export const PricingCtaSection: React.FC = () => {
  const [annualBilling, setAnnualBilling] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    soundFx.playSuccess();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Autonomous Deployment Tiers</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ready to Deploy Your <br />
            <span className="text-gradient-cyan">Autonomous Talent OS?</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 mb-8">
            Scale your engineering team with mathematical precision. Choose the compute allocation that matches your frontier ambitions.
          </p>

          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-xs font-mono ${!annualBilling ? 'text-cyan-300 font-bold' : 'text-slate-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => {
                soundFx.playSwitch();
                setAnnualBilling(!annualBilling);
              }}
              className="relative w-12 h-6 rounded-full bg-obsidian-850 border border-white/20 p-0.5 transition-colors focus:outline-none"
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`w-5 h-5 rounded-full bg-cyan-400 shadow-md ${annualBilling ? 'ml-6' : 'ml-0'}`}
              />
            </button>
            <span className={`text-xs font-mono flex items-center gap-1.5 ${annualBilling ? 'text-cyan-300 font-bold' : 'text-slate-400'}`}>
              Annual
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/40">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {MOCK_PRICING.map((plan, idx) => {
            const price = annualBilling ? plan.annualPrice : plan.monthlyPrice;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => soundFx.playBlip(900 + idx * 60)}
                className={`rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  plan.popular
                    ? 'border-cyan-400/60 shadow-2xl shadow-cyan-950/60 ring-1 ring-cyan-400/40 scale-105 bg-obsidian-900/90'
                    : 'border-white/[0.08] hover:border-white/25'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-md">
                    Most Popular Deployment
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    {plan.id === 'sovereign' && (
                      <Server className="w-5 h-5 text-cyan-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-6 min-h-[36px]">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-white/[0.08]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold font-mono text-white">
                        ${price}
                      </span>
                      <span className="text-xs font-mono text-slate-400">/ month</span>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400/80">
                      {annualBilling ? 'Billed annually ($' + price * 12 + '/yr)' : 'Billed monthly'}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-mono text-slate-300 block mb-2 font-semibold">
                      Included Capabilities:
                    </span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <div className="p-0.5 rounded bg-cyan-500/20 text-cyan-400 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => soundFx.playSuccess()}
                  className={`w-full py-3 rounded-xl font-semibold text-xs transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold shadow-lg shadow-cyan-500/25'
                      : 'bg-obsidian-800 hover:bg-obsidian-750 text-white border border-white/10 hover:border-cyan-400/50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* High Conversion Launch Waitlist Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl relative overflow-hidden bg-gradient-to-br from-obsidian-900 via-obsidian-850 to-cyan-950/40 border border-cyan-500/30 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl shadow-cyan-950/50"
        >
          {/* Top Beam */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400" />
          
          <div className="max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
              <Lock className="w-3.5 h-3.5" />
              Private Beta Tier 1 Allocation: 85% Claimed
            </span>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Step Into the Autonomous Talent Future
            </h3>

            <p className="text-sm text-slate-300 mb-8">
              Join 450+ high-growth tech firms already verifying engineers with zero-knowledge cryptographic proofs.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-mono text-xs flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Encrypted Access Token Dispatched. Check your inbox for node activation keys.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="founder@frontier-lab.ai"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-obsidian-950/80 border border-white/15 focus:border-cyan-400 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl font-bold text-xs text-black bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-400/25 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Authenticating...' : 'Claim Early Access'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
