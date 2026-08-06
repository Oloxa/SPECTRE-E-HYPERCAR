import React, { useState } from 'react';
import { Play, Zap, Shield, Sparkles, Sliders, ChevronDown } from 'lucide-react';
import { PAINT_OPTIONS } from '../data/carData';
import { ColorVariant } from '../types';

interface HeroProps {
  selectedColor: ColorVariant;
  onSelectColor: (color: ColorVariant) => void;
  onOpenSoundSim: () => void;
  onOpenReserve: () => void;
  onOpenConfigurator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedColor,
  onSelectColor,
  onOpenSoundSim,
  onOpenReserve,
  onOpenConfigurator,
}) => {
  const currentPaint = PAINT_OPTIONS.find((p) => p.id === selectedColor) || PAINT_OPTIONS[0];

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 overflow-hidden">
      {/* Background Dark Hypersonic Canvas Effects */}
      <div className="absolute inset-0 bg-[#020204] -z-20" />
      
      {/* Dynamic ambient color glow responding to chosen exterior paint */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] sm:w-[900px] sm:h-[500px] rounded-full blur-[140px] opacity-35 transition-all duration-1000 -z-10 pointer-events-none"
        style={{
          backgroundColor: currentPaint.hex === '#09090b' ? '#8b5cf6' : currentPaint.hex,
        }}
      />

      {/* Cyber Grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center items-center text-center relative z-10 my-auto">
        {/* Top Eyebrow Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill border border-purple-500/30 text-purple-300 mb-6 text-xs font-space tracking-[0.2em] uppercase animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>PRODUCTION LIMITED TO 100 UNITS GLOBALLY</span>
        </div>

        {/* Display Headline */}
        <h1 className="font-syne font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-white uppercase leading-[0.9] drop-shadow-2xl">
          BEYOND <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-400 text-glow-purple">
            VELOCITY
          </span>
        </h1>

        {/* Dynamic Metric Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          <div className="glass-card px-5 py-3 rounded-2xl flex flex-col items-center border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <span className="font-space font-bold text-2xl sm:text-3xl text-white tracking-tight">1,920 HP</span>
            <span className="font-space text-[10px] tracking-widest text-slate-400 uppercase">Quad-Motor Torque</span>
          </div>

          <div className="glass-card px-5 py-3 rounded-2xl flex flex-col items-center border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="flex items-center gap-1.5">
              <span className="font-space font-bold text-2xl sm:text-3xl text-purple-300 tracking-tight">1.74s</span>
              <span className="text-xs text-cyan-400 font-mono font-semibold">0-60 MPH</span>
            </div>
            <span className="font-space text-[10px] tracking-widest text-slate-400 uppercase">Launch Control</span>
          </div>

          <div className="glass-card px-5 py-3 rounded-2xl flex flex-col items-center border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <span className="font-space font-bold text-2xl sm:text-3xl text-white tracking-tight">520 MI</span>
            <span className="font-space text-[10px] tracking-widest text-slate-400 uppercase">Aero Range</span>
          </div>

          <div className="glass-card px-5 py-3 rounded-2xl flex flex-col items-center border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <span className="font-space font-bold text-2xl sm:text-3xl text-cyan-300 tracking-tight">255+ MPH</span>
            <span className="font-space text-[10px] tracking-widest text-slate-400 uppercase">Top Speed</span>
          </div>
        </div>

        {/* Hypercar Visual Stage */}
        <div className="relative w-full max-w-5xl my-8 sm:my-10 group">
          {/* Main Visual Image Container with Dynamic Filter based on paint */}
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden glass-card border border-purple-500/30 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
            <img
              src={currentPaint.imageUrl}
              alt={`SPECTRE Hypercar - ${currentPaint.name}`}
              className="w-full h-full object-cover rounded-2xl transition-all duration-700 filter brightness-95 contrast-110 group-hover:scale-105"
            />

            {/* Overlaid Hypersonic Hologram HUD Elements */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-purple-500/40 text-[11px] font-space text-purple-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                ACTIVE COLOR: {currentPaint.name.toUpperCase()}
              </div>
            </div>

            <div className="absolute top-6 right-6 hidden sm:flex items-center gap-2">
              <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-slate-700 text-[11px] font-mono text-slate-300">
                AERO DRAG: 0.20 Cd
              </div>
            </div>

            {/* Play Sound Simulation Banner Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/70 backdrop-blur-xl px-5 py-2.5 rounded-full border border-purple-500/40 shadow-2xl">
              <button
                onClick={onOpenSoundSim}
                className="flex items-center gap-2.5 text-xs font-space tracking-wider text-purple-300 hover:text-white transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.8)]">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>SIMULATE 0-60 MPH SOUND ENGINE</span>
              </button>
            </div>
          </div>

          {/* Color Swatch Switcher Toolbar below hero image */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="font-space text-xs tracking-wider text-slate-400 uppercase">
                Exterior Finish:
              </span>
              <div className="flex items-center gap-2.5">
                {PAINT_OPTIONS.map((paint) => {
                  const active = paint.id === selectedColor;
                  return (
                    <button
                      key={paint.id}
                      onClick={() => onSelectColor(paint.id)}
                      className={`relative w-8 h-8 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center ${
                        active
                          ? 'ring-2 ring-purple-400 ring-offset-2 ring-offset-black scale-110 shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                          : 'opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ backgroundColor: paint.hex }}
                      title={paint.name}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenConfigurator}
                className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-xs font-space tracking-wider text-slate-200 border border-slate-700 hover:border-purple-500/50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Open Studio Configurator
              </button>
              <button
                onClick={onOpenReserve}
                className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-xs font-space font-semibold tracking-wider text-white transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
              >
                Reserve Now
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-4 flex flex-col items-center text-slate-500 text-xs font-space tracking-widest animate-bounce cursor-pointer" onClick={() => {
          document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          <span>EXPLORE AERODYNAMICS</span>
          <ChevronDown className="w-4 h-4 mt-1 text-purple-400" />
        </div>
      </div>
    </section>
  );
};
