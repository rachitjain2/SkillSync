import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Terminal, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Cpu, 
  Search, 
  ChevronRight,
  ShieldCheck,
  User,
  Briefcase,
  LogOut
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { supabase } from '../utils/supabaseClient';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  session: any;
  onNavigate: (route: 'landing' | 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'dashboard') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenCommandPalette, 
  soundEnabled, 
  onToggleSound,
  session,
  onNavigate
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Problem', href: '#problem' },
    { name: 'Features', href: '#features' },
    { name: 'AI Workflow', href: '#workflow' },
    { name: 'Live Sandbox', href: '#sandbox' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Architecture Council', href: '#team' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-obsidian-950/80 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/50' 
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={() => soundFx.playBlip(700)}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-blue-500/10 border border-cyan-500/40 flex items-center justify-center p-0.5 shadow-lg shadow-cyan-500/20 group-hover:border-cyan-400 transition-all duration-300">
            <Cpu className="w-5 h-5 text-cyan-400 animate-pulse group-hover:scale-110 transition-transform" />
            <div className="absolute -inset-1 bg-cyan-500/20 rounded-xl blur-sm -z-10 group-hover:opacity-100 opacity-60 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
              Skill<span className="text-cyan-400">Sync</span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded">
                OS
              </span>
            </span>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              v4.8 NEURAL LIVE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/[0.07]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => soundFx.playBlip(900)}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 hover:bg-white/[0.04] rounded-full transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions & Utilities */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Quick Search / Cmd+K trigger */}
          <button
            onClick={() => {
              soundFx.playSwitch();
              onOpenCommandPalette();
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-slate-400 bg-obsidian-850/80 hover:bg-obsidian-800 border border-white/10 hover:border-cyan-500/40 rounded-lg transition-all duration-200 group"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <span>Search OS</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800/80 text-slate-300 rounded border border-white/10">
              ⌘K
            </kbd>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Interface Audio' : 'Enable Futuristic UI Audio'}
            className={`p-2 rounded-lg border transition-all duration-200 ${
              soundEnabled
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-sm shadow-cyan-500/30'
                : 'bg-obsidian-850/60 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Dynamic Authentication CTA Buttons */}
          {session ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundFx.playBlip(800, 0.04);
                  onNavigate('dashboard');
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-lg transition-colors group"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <span>Console OS</span>
              </button>

              <button
                onClick={async () => {
                  soundFx.playSwitch();
                  try {
                    await supabase.auth.signOut();
                  } catch (err) {
                    console.error('Error signing out:', err);
                  }
                  soundFx.playSuccess();
                  onNavigate('landing');
                }}
                title="Sign Out Session"
                className="p-2 rounded-lg bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  soundFx.playBlip(700, 0.04);
                  onNavigate('login');
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </button>

              <button
                onClick={() => {
                  soundFx.playSuccess();
                  onNavigate('signup');
                }}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-lg group bg-gradient-to-br from-cyan-500 via-blue-500 to-violet-600 hover:from-cyan-400 hover:via-blue-400 hover:to-violet-500 text-white shadow-lg shadow-cyan-500/20 active:scale-95 transition-all duration-200"
              >
                <span className="relative px-3.5 py-1.5 transition-all ease-in duration-75 bg-obsidian-950 rounded-[7px] group-hover:bg-opacity-0 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white" />
                  <span>Deploy OS</span>
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => {
              soundFx.playSwitch();
              onOpenCommandPalette();
            }}
            className="p-2 text-slate-400 hover:text-cyan-400 bg-obsidian-850/80 border border-white/10 rounded-lg"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              soundFx.playBlip(600);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 text-slate-300 hover:text-white bg-obsidian-850/80 border border-white/10 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-obsidian-950/95 border-b border-white/10 px-4 pt-3 pb-6 flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    soundFx.playBlip(800);
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/[0.04] rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={onToggleSound}
                className="flex items-center gap-2 text-xs text-slate-400 px-3 py-2 bg-obsidian-900 rounded-lg border border-white/10"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
                <span>{soundEnabled ? 'Audio On' : 'Audio Muted'}</span>
              </button>

              {session ? (
                <div className="flex flex-col gap-2 w-full">
                  <button
                    onClick={() => {
                      soundFx.playBlip(800, 0.04);
                      setMobileMenuOpen(false);
                      onNavigate('dashboard');
                    }}
                    className="px-4 py-2.5 text-center text-xs font-semibold text-slate-200 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span>Console OS</span>
                  </button>
                  <button
                    onClick={async () => {
                      soundFx.playSwitch();
                      setMobileMenuOpen(false);
                      try {
                        await supabase.auth.signOut();
                      } catch (err) {
                        console.error('Error signing out:', err);
                      }
                      soundFx.playSuccess();
                      onNavigate('landing');
                    }}
                    className="px-4 py-2.5 text-center text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out Session</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 w-full">
                  <button
                    onClick={() => {
                      soundFx.playBlip(700, 0.04);
                      setMobileMenuOpen(false);
                      onNavigate('login');
                    }}
                    className="flex-1 px-4 py-2.5 text-center text-xs font-semibold text-slate-300 bg-white/[0.02] border border-white/[0.08] rounded-lg"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playSuccess();
                      setMobileMenuOpen(false);
                      onNavigate('signup');
                    }}
                    className="flex-1 px-4 py-2.5 text-center text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 rounded-lg shadow-lg shadow-cyan-500/20"
                  >
                    Deploy OS
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
