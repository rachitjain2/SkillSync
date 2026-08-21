import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import { soundFx } from '../utils/audio';

interface ResetPasswordViewProps {
  onNavigate: (route: 'landing' | 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'dashboard') => void;
}

export const ResetPasswordView: React.FC<ResetPasswordViewProps> = ({ onNavigate }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, val: string) => {
    setter(val);
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

    if (!password || !confirmPassword) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) throw updateError;

      soundFx.playSuccess();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to update passcode.');
      soundFx.playBlip(300, 0.2); // buzzer
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
          <h2 className="text-2xl font-extrabold text-white mb-3">Passcode Updated</h2>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            Your credentials have been successfully updated. You may now authenticate utilizing your new passcode.
          </p>
          <button
            onClick={() => {
              soundFx.playBlip(700, 0.05);
              onNavigate('login');
            }}
            className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/20 transition-all duration-200"
          >
            Access Login View
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10 py-12">
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
            <span>CREDENTIAL ESTABLISHMENT</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-1">
            New Passcode
          </h2>
          <p className="text-sm text-slate-400">Establish a secure passcode for your profile</p>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">New Password (min. 6 characters)</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => handleInputChange(setPassword, e.target.value)}
                onFocus={handleFocus}
                placeholder="••••••••••••"
                required
                className="w-full pl-11 pr-12 py-3 bg-obsidian-950/50 border border-white/10 focus:outline-none focus:ring-2 rounded-xl text-sm text-white placeholder-slate-600 focus:border-cyan-500/60 focus:ring-cyan-500/20 transition-all"
              />
              <button
                type="button"
                onClick={() => {
                  soundFx.playBlip(750, 0.02);
                  setShowPassword(!showPassword);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">Confirm Passcode</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => handleInputChange(setConfirmPassword, e.target.value)}
                onFocus={handleFocus}
                placeholder="••••••••••••"
                required
                className="w-full pl-11 pr-12 py-3 bg-obsidian-950/50 border border-white/10 focus:outline-none focus:ring-2 rounded-xl text-sm text-white placeholder-slate-600 focus:border-cyan-500/60 focus:ring-cyan-500/20 transition-all"
              />
              <button
                type="button"
                onClick={() => {
                  soundFx.playBlip(750, 0.02);
                  setShowConfirmPassword(!showConfirmPassword);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 hover:brightness-110 active:brightness-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-cyan-500 to-blue-600 shadow-cyan-500/20 mt-2"
          >
            {loading ? 'Updating Credentials...' : 'Register New Password'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
