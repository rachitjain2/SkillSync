import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MOCK_TESTIMONIALS } from '../utils/mockData';
import { soundFx } from '../utils/audio';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background Aura */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Frontier Lab Endorsements</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Validated by Leaders <br />
            <span className="text-gradient-cyan">Building the Frontier</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            See how high-velocity engineering organizations deploy world-class talent in hours instead of months.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => soundFx.playBlip(900 + idx * 50)}
              className="rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between relative group hover:border-cyan-400/40 transition-all shadow-xl"
            >
              <div>
                {/* Metric Badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {testimonial.badge}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author & Telemetry Footer */}
              <div className="pt-4 border-t border-white/[0.08]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-11 h-11 rounded-xl object-cover border border-cyan-500/30"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1">
                        {testimonial.author}
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      </h4>
                      <p className="text-xs text-slate-400 font-mono">
                        {testimonial.role}, <span className="text-slate-300">{testimonial.company}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Outcome Highlight */}
                <div className="mt-3 p-2 rounded-lg bg-obsidian-950/80 border border-white/[0.05] flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">{testimonial.metrics.label}:</span>
                  <span className="text-emerald-400 font-bold">{testimonial.metrics.value}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
