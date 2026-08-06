import React, { useState } from 'react';
import { AERO_FEATURES } from '../data/carData';
import { Shield, Zap, Wind, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const AerodynamicsSpecs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(AERO_FEATURES[0].id);

  const currentFeature =
    AERO_FEATURES.find((f) => f.id === activeTab) || AERO_FEATURES[0];

  return (
    <section id="specs" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      {/* Background Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-cyan-500/30 text-cyan-400 text-xs font-space tracking-widest uppercase mb-4">
          <Wind className="w-3.5 h-3.5" />
          AERODYNAMICS & CHASSIS ENGINEERING
        </div>
        <h2 className="font-syne font-extrabold text-4xl sm:text-6xl text-white uppercase tracking-tight">
          AEROSPACE ARCHITECTURE
        </h2>
        <p className="font-jakarta text-slate-400 text-sm sm:text-base max-w-2xl mt-4">
          Engineered for hypersonic stability down to every carbon fiber strand. SPECTRE utilizes ground-effect Venturi active aerodynamics and FIA-grade structural rigidity.
        </p>
      </div>

      {/* Interactive Hotspot Feature Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {AERO_FEATURES.map((feature) => {
          const isActive = feature.id === activeTab;
          return (
            <button
              key={feature.id}
              onClick={() => setActiveTab(feature.id)}
              className={`px-6 py-3 rounded-full text-xs font-space tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.5)] border border-purple-400'
                  : 'glass-card text-slate-400 hover:text-white hover:border-purple-500/40'
              }`}
            >
              {feature.id === 'monocoque' && <Shield className="w-4 h-4 text-purple-300" />}
              {feature.id === 'torque-vectoring' && <Zap className="w-4 h-4 text-cyan-300" />}
              {feature.id === 'active-aero' && <Wind className="w-4 h-4 text-indigo-300" />}
              <span>{feature.title}</span>
            </button>
          );
        })}
      </div>

      {/* Feature Highlight Card Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-card p-6 sm:p-10 rounded-3xl border border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {/* Left Column - Tech Specs details */}
        <div className="lg:col-span-5 space-y-6">
          <span className="font-space text-xs font-semibold tracking-[0.25em] text-purple-400 uppercase">
            {currentFeature.subtitle}
          </span>
          <h3 className="font-syne font-extrabold text-3xl sm:text-4xl text-white leading-tight">
            {currentFeature.title}
          </h3>

          {/* Metric Highlight Box */}
          <div className="glass-card p-5 rounded-2xl border border-purple-500/20 bg-purple-950/20 flex items-center justify-between">
            <div>
              <div className="font-space text-[10px] text-slate-400 uppercase tracking-widest">
                {currentFeature.statLabel}
              </div>
              <div className="font-space font-extrabold text-3xl text-cyan-300 tracking-tight mt-1">
                {currentFeature.stat}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

          <p className="font-jakarta text-slate-300 text-sm leading-relaxed">
            {currentFeature.description}
          </p>

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {currentFeature.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-[11px] font-mono flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3 h-3 text-purple-400" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column - Visual Aero Render Showcase */}
        <div className="lg:col-span-7 relative group overflow-hidden rounded-2xl aspect-[16/10] border border-slate-800">
          <img
            src={currentFeature.image}
            alt={currentFeature.title}
            className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105 filter brightness-90 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* Telemetry Hotspot Pins */}
          <div className="absolute top-1/2 left-1/3 p-2 bg-purple-600/80 backdrop-blur-md rounded-full border border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.8)] animate-pulse">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <div className="absolute bottom-1/3 right-1/4 p-2 bg-cyan-500/80 backdrop-blur-md rounded-full border border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.8)] animate-pulse">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-slate-700">
            <span>SPECTRE DYNAMICS SIMULATION v4.2</span>
            <span className="text-purple-400 font-bold">100% CFD VERIFIED</span>
          </div>
        </div>
      </div>
    </section>
  );
};
