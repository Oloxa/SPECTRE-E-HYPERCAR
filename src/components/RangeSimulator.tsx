import React, { useState } from 'react';
import { Gauge, BatteryCharging, Zap, Thermometer, Wind, AlertCircle } from 'lucide-react';

export const RangeSimulator: React.FC = () => {
  const [velocity, setVelocity] = useState(65); // default cruising speed in MPH
  const [temperature, setTemperature] = useState(72); // Ambient temp °F
  const [trackMode, setTrackMode] = useState(false);

  // Dynamic Range & Energy Calculations
  // Optimal efficiency is at ~55-65 MPH giving max ~520 mi range.
  // Drag increases quadratically with speed (v^2).
  const baseBatteryCapacity = 140; // kWh battery pack
  
  const calculateMetrics = () => {
    // Speed factor: drag energy consumption
    const speedRatio = velocity / 60;
    const dragFactor = Math.pow(speedRatio, 2.1);
    
    // Temp factor: optimal around 70°F
    const tempDiff = Math.abs(temperature - 70);
    const tempEfficiencyLoss = (tempDiff / 100) * 0.15; // up to 15% loss in extreme temp

    // Track mode multiplier (aggressive active vectoring & thermal cooling)
    const modeMultiplier = trackMode ? 1.6 : 1.0;

    // Consumption in Wh/mi (Base ~230 Wh/mi at 60 MPH)
    const consumptionWhMi = Math.max(180, Math.round(230 * dragFactor * (1 + tempEfficiencyLoss) * modeMultiplier));
    
    // Remaining estimated range in miles
    const calculatedRange = Math.min(580, Math.max(85, Math.round((baseBatteryCapacity * 1000) / consumptionWhMi)));

    // Power kw demand at steady cruising velocity
    const kwDemand = Math.round((velocity * consumptionWhMi) / 1000);

    return {
      range: calculatedRange,
      consumption: consumptionWhMi,
      kwDemand,
      cdRatio: (0.20 + (velocity > 120 ? 0.05 : 0)).toFixed(2),
    };
  };

  const metrics = calculateMetrics();

  return (
    <section id="simulator" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-purple-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-cyan-500/30 text-cyan-400 text-xs font-space tracking-widest uppercase mb-3">
              <BatteryCharging className="w-3.5 h-3.5" />
              DYNAMIC TELEMETRY CALCULATOR
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
              RANGE & PERFORMANCE SIMULATOR
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-space text-xs text-slate-400 uppercase">
              DRIVING MODE:
            </span>
            <button
              onClick={() => setTrackMode(false)}
              className={`px-4 py-2 rounded-full text-xs font-space tracking-wider uppercase transition-all cursor-pointer ${
                !trackMode
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              GT Aero Cruiser
            </button>
            <button
              onClick={() => setTrackMode(true)}
              className={`px-4 py-2 rounded-full text-xs font-space tracking-wider uppercase transition-all cursor-pointer ${
                trackMode
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Track Velocity
            </button>
          </div>
        </div>

        {/* Main Grid: Controls vs Result Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-8">
            {/* Velocity Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-space text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-purple-400" />
                  Target Velocity
                </label>
                <div className="font-space font-extrabold text-2xl text-purple-300">
                  {velocity} <span className="text-xs text-slate-400">MPH</span>
                </div>
              </div>

              <input
                type="range"
                min="20"
                max="220"
                step="5"
                value={velocity}
                onChange={(e) => setVelocity(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-purple-500 border border-slate-800"
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>20 MPH (City)</span>
                <span>65 MPH (Highway)</span>
                <span>150 MPH (Autobahn)</span>
                <span>220 MPH (V-Max)</span>
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-space text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-cyan-400" />
                  Ambient Temperature
                </label>
                <div className="font-space font-semibold text-lg text-cyan-300">
                  {temperature}°F
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="110"
                step="2"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-800"
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0°F (Freezing)</span>
                <span>72°F (Optimal)</span>
                <span>110°F (Extreme Heat)</span>
              </div>
            </div>

            {/* Battery Spec Banner */}
            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20 flex items-center gap-3">
              <Zap className="w-5 h-5 text-purple-400 shrink-0" />
              <p className="font-jakarta text-xs text-slate-300">
                SPECTRE 140 kWh 800V silicon-anode solid-state architecture supports 350 kW ultra-fast DC charging (10-80% in 12 minutes).
              </p>
            </div>
          </div>

          {/* Results Telemetry Column */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {/* Primary Calculated Range Box */}
            <div className="col-span-2 glass-card p-6 rounded-2xl border border-purple-500/40 bg-gradient-to-br from-purple-950/40 to-slate-950 flex flex-col items-center justify-center text-center">
              <span className="font-space text-xs tracking-widest text-slate-400 uppercase">
                ESTIMATED DRIVING RANGE
              </span>
              <div className="font-space font-extrabold text-6xl sm:text-7xl text-cyan-300 text-glow-cyan my-2">
                {metrics.range}
              </div>
              <span className="font-space text-sm font-bold text-white tracking-wider uppercase">
                MILES ON SINGLE CHARGE
              </span>
            </div>

            {/* Metric 1: Power Consumption */}
            <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <span className="font-space text-[10px] text-slate-400 uppercase tracking-widest">
                ENERGY CONSUMPTION
              </span>
              <div className="font-space font-bold text-2xl text-white mt-2">
                {metrics.consumption}{' '}
                <span className="text-xs text-purple-400">Wh/mi</span>
              </div>
            </div>

            {/* Metric 2: Power Demand */}
            <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <span className="font-space text-[10px] text-slate-400 uppercase tracking-widest">
                CONTINUOUS POWER
              </span>
              <div className="font-space font-bold text-2xl text-cyan-300 mt-2">
                {metrics.kwDemand} <span className="text-xs text-slate-400">kW</span>
              </div>
            </div>

            {/* Metric 3: Aero Drag Ratio */}
            <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <span className="font-space text-[10px] text-slate-400 uppercase tracking-widest">
                AERO DRAG COEFFICIENT
              </span>
              <div className="font-space font-bold text-2xl text-white mt-2">
                {metrics.cdRatio} <span className="text-xs text-slate-400">Cd</span>
              </div>
            </div>

            {/* Metric 4: Battery Cell Temp */}
            <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <span className="font-space text-[10px] text-slate-400 uppercase tracking-widest">
                THERMAL REGULATION
              </span>
              <div className="font-space font-bold text-2xl text-emerald-400 mt-2">
                NOMINAL
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
