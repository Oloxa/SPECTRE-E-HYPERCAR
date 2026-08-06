import React from 'react';
import {
  PAINT_OPTIONS,
  WHEEL_OPTIONS,
  INTERIOR_OPTIONS,
} from '../data/carData';
import { ConfiguratorState, ColorVariant } from '../types';
import { Sliders, Check, Sparkles, DollarSign, ArrowRight, Disc, Layers } from 'lucide-react';

interface VehicleConfiguratorProps {
  config: ConfiguratorState;
  onChangeConfig: (newConfig: Partial<ConfiguratorState>) => void;
  onOpenReserveWithConfig: () => void;
}

export const VehicleConfigurator: React.FC<VehicleConfiguratorProps> = ({
  config,
  onChangeConfig,
  onOpenReserveWithConfig,
}) => {
  const currentPaint =
    PAINT_OPTIONS.find((p) => p.id === config.paint) || PAINT_OPTIONS[0];
  const currentWheel =
    WHEEL_OPTIONS.find((w) => w.id === config.wheels) || WHEEL_OPTIONS[0];
  const currentInterior =
    INTERIOR_OPTIONS.find((i) => i.id === config.interior) || INTERIOR_OPTIONS[0];

  // Base price: $2,850,000
  const BASE_PRICE = 2850000;
  const totalPrice =
    BASE_PRICE +
    currentPaint.price +
    currentWheel.price +
    currentInterior.price +
    (config.trackPackage ? 120000 : 0) +
    (config.carbonCeramicBrakes ? 45000 : 0);

  return (
    <section id="configurator" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-purple-500/30 text-purple-300 text-xs font-space tracking-widest uppercase mb-4">
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          BESPOKE DESIGN STUDIO
        </div>
        <h2 className="font-syne font-extrabold text-4xl sm:text-6xl text-white uppercase tracking-tight">
          BUILD YOUR SPECTRE
        </h2>
        <p className="font-jakarta text-slate-400 text-sm sm:text-base max-w-2xl mt-4">
          Tailor every surface of your hypercar to match your aesthetic vision. Live price estimation updates synchronously with your selected options.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Live Visual Preview Stage */}
        <div className="lg:col-span-7 sticky top-28 space-y-6">
          <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden glass-card border border-purple-500/30 p-2 shadow-2xl">
            <img
              src={currentPaint.imageUrl}
              alt={`Configured SPECTRE - ${currentPaint.name}`}
              className="w-full h-full object-cover rounded-2xl transition-all duration-500 filter brightness-95 contrast-105"
            />

            {/* Config Overlay Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-purple-500/40 text-[11px] font-space text-purple-300">
                PAINT: {currentPaint.name.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-slate-700 text-[11px] font-space text-slate-300">
                WHEELS: {currentWheel.name}
              </span>
            </div>

            {/* Estimated Price Floating Badge */}
            <div className="absolute bottom-4 right-4 glass-card px-5 py-3 rounded-2xl border border-purple-500/40 bg-black/80 backdrop-blur-xl text-right">
              <span className="font-space text-[10px] text-slate-400 uppercase tracking-widest block">
                ESTIMATED MSRP
              </span>
              <span className="font-space font-extrabold text-2xl sm:text-3xl text-cyan-300 text-glow-cyan">
                ${totalPrice.toLocaleString()} USD
              </span>
            </div>
          </div>

          {/* Config Summary Strip */}
          <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
            <div>
              <span className="text-slate-500">BASE: </span>
              <span>$2,850,000</span>
            </div>
            <div>
              <span className="text-slate-500">OPTIONS: </span>
              <span className="text-purple-400 font-bold">
                +${(totalPrice - BASE_PRICE).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-slate-500">DELIVERY: </span>
              <span>Q3 2027</span>
            </div>
          </div>
        </div>

        {/* Right Column - Interactive Option Controls */}
        <div className="lg:col-span-5 space-y-8 glass-card p-6 sm:p-8 rounded-3xl border border-purple-500/30">
          {/* 1. Exterior Paint Selector */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-space font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                1. Exterior Paint Finish
              </label>
              <span className="font-mono text-xs text-purple-400 font-semibold">
                {currentPaint.price === 0 ? 'INCLUDED' : `+$${currentPaint.price.toLocaleString()}`}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {PAINT_OPTIONS.map((paint) => {
                const selected = paint.id === config.paint;
                return (
                  <button
                    key={paint.id}
                    onClick={() => onChangeConfig({ paint: paint.id })}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-center gap-3 ${
                      selected
                        ? 'bg-purple-950/60 border-purple-400 ring-1 ring-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: paint.hex }}
                    />
                    <div className="overflow-hidden">
                      <p className="font-space text-xs font-semibold text-white truncate">
                        {paint.name}
                      </p>
                      <p className="font-mono text-[10px] text-slate-400">
                        {paint.price === 0 ? 'Standard' : `+$${(paint.price / 1000).toFixed(0)}k`}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Wheels Selector */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="font-space font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <Disc className="w-4 h-4 text-cyan-400" />
                2. Wheel Specification
              </label>
              <span className="font-mono text-xs text-cyan-400 font-semibold">
                {currentWheel.price === 0 ? 'INCLUDED' : `+$${currentWheel.price.toLocaleString()}`}
              </span>
            </div>

            <div className="space-y-2.5">
              {WHEEL_OPTIONS.map((wheel) => {
                const selected = wheel.id === config.wheels;
                return (
                  <button
                    key={wheel.id}
                    onClick={() => onChangeConfig({ wheels: wheel.id })}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                      selected
                        ? 'bg-purple-950/60 border-purple-400 ring-1 ring-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-space text-xs font-bold text-white">{wheel.name}</p>
                      <p className="font-jakarta text-[11px] text-slate-400 mt-0.5">
                        {wheel.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <span className="font-mono text-xs text-purple-300">
                        {wheel.price === 0 ? 'Inc.' : `+$${(wheel.price / 1000).toFixed(0)}k`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Interior Material Option */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <label className="font-space font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              3. Interior Cockpit Theme
            </label>

            <div className="space-y-2.5">
              {INTERIOR_OPTIONS.map((interior) => {
                const selected = interior.id === config.interior;
                return (
                  <button
                    key={interior.id}
                    onClick={() => onChangeConfig({ interior: interior.id })}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                      selected
                        ? 'bg-purple-950/60 border-purple-400 ring-1 ring-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-space text-xs font-bold text-white">
                        {interior.name}
                      </p>
                      <p className="font-jakarta text-[11px] text-slate-400 mt-0.5">
                        {interior.material}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-purple-300 shrink-0 ml-3">
                      {interior.price === 0 ? 'Inc.' : `+$${(interior.price / 1000).toFixed(0)}k`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Track Performance Add-ons */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <label className="font-space font-bold text-xs text-slate-400 uppercase tracking-wider">
              Performance Add-ons
            </label>

            <div
              onClick={() =>
                onChangeConfig({ trackPackage: !config.trackPackage })
              }
              className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                config.trackPackage
                  ? 'bg-purple-950/60 border-purple-400'
                  : 'bg-slate-900/40 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    config.trackPackage
                      ? 'bg-purple-600 border-purple-400 text-white'
                      : 'border-slate-700 bg-slate-800'
                  }`}
                >
                  {config.trackPackage && <Check className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <p className="font-space text-xs font-bold text-white">
                    Track Aerodynamic Package
                  </p>
                  <p className="font-jakarta text-[11px] text-slate-400">
                    Dual Active Wing Elements + Ground Effect Venturi Skirts
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-cyan-400 font-bold">
                +$120,000
              </span>
            </div>

            <div
              onClick={() =>
                onChangeConfig({
                  carbonCeramicBrakes: !config.carbonCeramicBrakes,
                })
              }
              className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                config.carbonCeramicBrakes
                  ? 'bg-purple-950/60 border-purple-400'
                  : 'bg-slate-900/40 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    config.carbonCeramicBrakes
                      ? 'bg-purple-600 border-purple-400 text-white'
                      : 'border-slate-700 bg-slate-800'
                  }`}
                >
                  {config.carbonCeramicBrakes && <Check className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <p className="font-space text-xs font-bold text-white">
                    Carbon Ceramic Matrix Brakes
                  </p>
                  <p className="font-jakarta text-[11px] text-slate-400">
                    420mm Carbon Rotors + 10-Piston Titanium Calipers
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-cyan-400 font-bold">
                +$45,000
              </span>
            </div>
          </div>

          {/* Trigger VIP Pre-order with Config */}
          <button
            onClick={onOpenReserveWithConfig}
            className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-space font-bold text-xs uppercase tracking-widest shadow-[0_0_35px_rgba(168,85,247,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Allocation Form with Spec</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
