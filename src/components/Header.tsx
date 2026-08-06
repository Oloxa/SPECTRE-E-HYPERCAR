import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, Sliders, ArrowRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenReserve: () => void;
  onOpenConfigurator: () => void;
  onOpenSoundSim: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReserve,
  onOpenConfigurator,
  onOpenSoundSim,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-4 sm:px-8 py-4 ${
        scrolled ? 'pt-3 pb-3' : 'pt-6 pb-6'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card rounded-full px-6 py-3 transition-all duration-500 border border-purple-500/20 shadow-2xl backdrop-blur-xl">
        {/* Brand Logo / Wordmark */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all">
            <div className="w-full h-full bg-[#020204] rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-syne font-extrabold text-xl tracking-[0.25em] text-white group-hover:text-purple-300 transition-colors">
              SPECTRE
            </span>
            <span className="font-space text-[9px] tracking-widest text-purple-400/80 uppercase -mt-1">
              E-HYPERCAR
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-jakarta tracking-wide text-slate-300">
          <button
            onClick={() => scrollToSection('hero')}
            className="hover:text-purple-400 transition-colors cursor-pointer py-1 relative group"
          >
            Overview
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all duration-300" />
          </button>
          <button
            onClick={() => scrollToSection('specs')}
            className="hover:text-purple-400 transition-colors cursor-pointer py-1 relative group"
          >
            Performance & Aero
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all duration-300" />
          </button>
          <button
            onClick={() => scrollToSection('configurator')}
            className="hover:text-purple-400 transition-colors cursor-pointer py-1 relative group flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            Configurator
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
          </button>
          <button
            onClick={() => scrollToSection('simulator')}
            className="hover:text-purple-400 transition-colors cursor-pointer py-1 relative group"
          >
            Range Calculator
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all duration-300" />
          </button>
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenSoundSim}
            className="px-4 py-2 text-xs font-space tracking-wider uppercase rounded-full bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 border border-purple-500/30 transition-all flex items-center gap-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            Sound Engine
          </button>

          <button
            onClick={onOpenReserve}
            className="group relative px-6 py-2.5 rounded-full text-xs font-space font-semibold tracking-widest uppercase text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] flex items-center gap-2 cursor-pointer overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Reserve VIP Allocation
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-7xl mx-auto glass-card rounded-2xl p-6 border border-purple-500/30 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <button
            onClick={() => scrollToSection('hero')}
            className="block w-full text-left py-2 text-slate-200 hover:text-purple-400 font-jakarta text-base"
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection('specs')}
            className="block w-full text-left py-2 text-slate-200 hover:text-purple-400 font-jakarta text-base"
          >
            Performance & Aero
          </button>
          <button
            onClick={() => {
              scrollToSection('configurator');
              onOpenConfigurator();
            }}
            className="block w-full text-left py-2 text-slate-200 hover:text-cyan-400 font-jakarta text-base flex items-center justify-between"
          >
            <span>Interactive Configurator</span>
            <Sliders className="w-4 h-4 text-cyan-400" />
          </button>
          <button
            onClick={() => scrollToSection('simulator')}
            className="block w-full text-left py-2 text-slate-200 hover:text-purple-400 font-jakarta text-base"
          >
            Range Simulator
          </button>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSoundSim();
              }}
              className="w-full py-3 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/40 text-xs font-space uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-purple-400" />
              Launch Sound Simulator
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReserve();
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-space font-semibold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"
            >
              Reserve VIP Allocation
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
