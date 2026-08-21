import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import { soundFx } from '../utils/audio';

interface ForgotPasswordViewProps {
  onNavigate: (route: 'landing' | 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'dashboard') => void;
}

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (val: string) => {
    setEmail(val);
    soundFx.playBlip(1100, 0.01);
  };

  const handleFocus = () => {
    soundFx.playBlip(1300, 0.01);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playBlip(900, 0.05);
    setLoading(true);
    setError(null);

    if (!email) {
      setError('Please provide your email address.');
      setLoading(false);
      return;
    }

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/#reset-password`,
      });

      if (resetError) throw resetError;

      soundFx.playSuccess();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to request recovery link.');
      soundFx.playBlip(300, 0.2); // low buzzer
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative z-10 py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 rounded-2xl glass-panel border border-cyan-500/20 text-center shadow-[0_0_50px_-12px_rgba(6,182,212,0.15)]"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-3">Recovery Dispatched</h2>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            An authentication link has been dispatched to <span className="font-mono text-cyan-300 font-semibold">{email}</span>. 
            Please utilize this link to verify identity and establish a new passcode.
          </p>
          <button
            onClick={() => {
              soundFx.playBlip(700, 0.05);
              onNavigate('login');
            }}
            className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/20 transition-all duration-200"
          >
            Return to Login View
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10 py-12">
      <button 
        onClick={() => {
          soundFx.playBlip(700, 0.05);
          onNavigate('login');
        }}
        className="absolute top-6 left-6 flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Login
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-2xl glass-panel border border-cyan-500/30 shadow-[0_0_50px_-12px_rgba(6,182,212,0.2)]"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 mb-2 font-mono text-xs font-semibold px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>RECOVERY PROTOCOL</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-1">
            Passcode Reset
          </h2>
          <p className="text-sm text-slate-400">Request a recovery link to restore access</p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 text-red-200 text-xs rounded-xl mb-6 overflow-hidden"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={handleFocus}
                placeholder="your.email@example.com"
                required
                className="w-full pl-11 pr-4 py-3 bg-obsidian-950/50 border border-white/10 focus:outline-none focus:ring-2 rounded-xl text-sm text-white placeholder-slate-600 focus:border-cyan-500/60 focus:ring-cyan-500/20 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 hover:brightness-110 active:brightness-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-cyan-500 to-blue-600 shadow-cyan-500/20"
          >
            {loading ? 'Transmitting Request...' : 'Request Recovery Link'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
