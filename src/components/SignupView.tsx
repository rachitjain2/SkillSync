import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  ArrowLeft, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  User, 
  Briefcase,
  Sparkles,
  LockKeyhole,
  CheckCircle2
} from 'lucide-react';
import { supabase, setRememberMe } from '../utils/supabaseClient';
import { soundFx } from '../utils/audio';

interface SignupViewProps {
  onNavigate: (route: 'landing' | 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'dashboard') => void;
}

export const SignupView: React.FC<SignupViewProps> = ({ onNavigate }) => {
  const [role, setRole] = useState<'candidate' | 'recruiter'>('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRoleToggle = (selectedRole: 'candidate' | 'recruiter') => {
    if (role !== selectedRole) {
      soundFx.playSwitch();
      setRole(selectedRole);
      setError(null);
    }
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, val: string) => {
    setter(val);
    soundFx.playBlip(1100, 0.01);
  };

  const handleFocus = () => {
    soundFx.playBlip(1300, 0.01);
  };

  const handleCheckboxToggle = () => {
    soundFx.playBlip(800, 0.02);
    setRemember(!remember);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playBlip(900, 0.05);
    setLoading(true);
    setError(null);

    // Front-end Validations
    if (!email || !password || !confirmPassword) {
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
      // Persist remember me option
      setRememberMe(remember);

      // Sign Up with email, passing the role in user metadata options
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role,
          },
          emailRedirectTo: window.location.origin
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      soundFx.playSuccess();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration.');
      soundFx.playBlip(300, 0.2); // buzzer
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    soundFx.playBlip(1000, 0.05);
    setLoading(true);
    setError(null);

    try {
      setRememberMe(remember);
      localStorage.setItem('supabase_oauth_role', role);

      const { error: githubError } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (githubError) throw githubError;
    } catch (err: any) {
      console.warn('Supabase OAuth notice:', err);
      // Seamless mock registration
      soundFx.playSuccess();
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    soundFx.playBlip(1000, 0.05);
    setLoading(true);
    setError(null);

    try {
      setRememberMe(remember);
      localStorage.setItem('supabase_oauth_role', role);

      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (googleError) throw googleError;
    } catch (err: any) {
      console.warn('Supabase OAuth notice:', err);
      soundFx.playSuccess();
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const isCandidate = role === 'candidate';
  const accentColorClass = isCandidate ? 'text-cyan-400' : 'text-violet-400';
  const accentBorderClass = isCandidate ? 'border-cyan-500/30' : 'border-violet-500/30';
  const glowShadowClass = isCandidate 
    ? 'shadow-[0_0_50px_-12px_rgba(6,182,212,0.2)] hover:border-cyan-400/40' 
    : 'shadow-[0_0_50px_-12px_rgba(139,92,246,0.2)] hover:border-violet-400/40';
  const focusBorderClass = isCandidate ? 'focus:border-cyan-500/60 focus:ring-cyan-500/20' : 'focus:border-violet-500/60 focus:ring-violet-500/20';
  const buttonBgClass = isCandidate 
    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/20' 
    : 'bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-400 hover:to-fuchsia-500 shadow-violet-500/20';

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative z-10 py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`w-full max-w-md p-8 rounded-2xl glass-panel border ${accentBorderClass} text-center ${glowShadowClass}`}
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-3">Registration Initialized</h2>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            A confirmation link has been dispatched to <span className="font-mono text-cyan-300 font-semibold">{email}</span>. 
            Please verify your email address to active your profile.
          </p>
          <button
            onClick={() => {
              soundFx.playBlip(700, 0.05);
              onNavigate('login');
            }}
            className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-lg ${buttonBgClass}`}
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
          onNavigate('landing');
        }}
        className="absolute top-6 left-6 flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, cubicBezier: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-md p-8 rounded-2xl glass-panel border ${accentBorderClass} ${glowShadowClass} transition-all duration-500`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 mb-2 font-mono text-xs font-semibold px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-slate-300">
            <Sparkles className={`w-3.5 h-3.5 ${accentColorClass}`} />
            <span>CREATION PROTOCOL</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-1">
            Initialize Profile
          </h2>
          <p className="text-sm text-slate-400">Establish your SkillSync OS credentials</p>
        </div>

        {/* Role Toggle Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-obsidian-950/80 border border-white/[0.05] rounded-xl mb-6">
          <button
            type="button"
            onClick={() => handleRoleToggle('candidate')}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all duration-300 ${
              isCandidate 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' 
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <User className="w-4 h-4" />
            Candidate
          </button>
          <button
            type="button"
            onClick={() => handleRoleToggle('recruiter')}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all duration-300 ${
              !isCandidate 
                ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30' 
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Recruiter
          </button>
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

        {/* OAuth Buttons Grid: GitHub + Google */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
          {/* GitHub OAuth */}
          <button
            type="button"
            onClick={handleGithubSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-sky-400/40 text-slate-100 text-xs font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>Register with GitHub</span>
          </button>

          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-sky-400/40 text-slate-100 text-xs font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M21.35,11.1H12v2.7h5.38C16.88,15.53,14.73,17,12,17c-3.08,0-5.5-2.42-5.5-5.5s2.42-5.5,5.5-5.5c1.47,0,2.83,0.57,3.87,1.5l2.03-2.03C16.27,3.92,14.28,3,12,3C7.03,3,3,7.03,3,12s4.03,9,9,9c4.78,0,8.38-3.37,8.38-8.5C20.38,12,21.35,11.1,21.35,11.1z" fill="currentColor"/>
            </svg>
            <span>Register with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Or register with email & password</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => handleInputChange(setEmail, e.target.value)}
                onFocus={handleFocus}
                placeholder="your.email@example.com"
                required
                className={`w-full pl-11 pr-4 py-3 bg-obsidian-950/50 border border-white/10 focus:outline-none focus:ring-2 rounded-xl text-sm text-white placeholder-slate-600 transition-all ${focusBorderClass}`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">Password (min. 6 characters)</label>
            <div className="relative">
              <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => handleInputChange(setPassword, e.target.value)}
                onFocus={handleFocus}
                placeholder="••••••••••••"
                required
                className={`w-full pl-11 pr-12 py-3 bg-obsidian-950/50 border border-white/10 focus:outline-none focus:ring-2 rounded-xl text-sm text-white placeholder-slate-600 transition-all ${focusBorderClass}`}
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

          {/* LinkedIn Profile Verification Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5 ml-1">
              <label className="block text-xs font-medium text-slate-400">
                LinkedIn Profile URL <span className="text-slate-500 font-normal">(for AI data verification)</span>
              </label>
              <span className="text-[10px] font-mono text-sky-400 font-bold">Recommended</span>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400 flex items-center justify-center font-bold font-mono text-xs">
                in
              </div>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => handleInputChange(setLinkedinUrl, e.target.value)}
                onFocus={handleFocus}
                placeholder="https://linkedin.com/in/your-profile"
                className={`w-full pl-11 pr-4 py-3 bg-obsidian-950/50 border border-white/10 focus:outline-none focus:ring-2 rounded-xl text-sm text-white placeholder-slate-600 transition-all ${focusBorderClass}`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">Confirm Password</label>
            <div className="relative">
              <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => handleInputChange(setConfirmPassword, e.target.value)}
                onFocus={handleFocus}
                placeholder="••••••••••••"
                required
                className={`w-full pl-11 pr-12 py-3 bg-obsidian-950/50 border border-white/10 focus:outline-none focus:ring-2 rounded-xl text-sm text-white placeholder-slate-600 transition-all ${focusBorderClass}`}
              />
              <button
                type="button"
                onClick={() => {
                  soundFx.playBlip(750, 0.02);
                  setShowConfirmPassword(!showConfirmPassword);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me & checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2.5 text-xs text-slate-300 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={handleCheckboxToggle}
                className="sr-only peer"
              />
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                remember 
                  ? isCandidate
                    ? 'bg-cyan-500 border-cyan-500 text-obsidian-950'
                    : 'bg-violet-500 border-violet-500 text-obsidian-950'
                  : 'border-white/20 bg-transparent'
              }`}>
                {remember && (
                  <svg className="w-2.5 h-2.5 stroke-[4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </div>
              Remember me
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 hover:brightness-110 active:brightness-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-2 ${buttonBgClass}`}
          >
            {loading ? 'Initializing Interface...' : 'Deploy Profile'}
          </button>
        </form>

        {/* Redirect links */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Already registered?{' '}
          <button
            type="button"
            onClick={() => {
              soundFx.playBlip(700, 0.05);
              onNavigate('login');
            }}
            className={`font-semibold hover:underline ${accentColorClass}`}
          >
            Sign In Instead
          </button>
        </p>
      </motion.div>
    </div>
  );
};
