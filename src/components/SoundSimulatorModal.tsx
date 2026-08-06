import React, { useState, useEffect } from 'react';
import { X, Play, Square, Zap, Gauge, Flame, Volume2, ShieldAlert } from 'lucide-react';
import { soundEngine } from '../lib/soundSynth';

interface SoundSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SoundSimulatorModal: React.FC<SoundSimulatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [rpm, setRpm] = useState(1000);
  const [launchComplete, setLaunchComplete] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      soundEngine.stop();
      setIsLaunching(false);
      setSpeed(0);
      setRpm(1000);
      setLaunchComplete(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    setLaunchComplete(false);
    setSpeed(0);
    setRpm(1000);

    soundEngine.startLaunch(
      (currentSpeed, currentRpm) => {
        setSpeed(currentSpeed);
        setRpm(currentRpm);
      },
      () => {
        setIsLaunching(false);
        setLaunchComplete(true);
      }
    );
  };

  const handleStop = () => {
    soundEngine.stop();
    setIsLaunching(false);
  };

  const gForce = (speed / 60) * 1.85; // Simulated Launch G-Force up to 1.85 G

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/40 shadow-[0_0_80px_rgba(168,85,247,0.3)]">
        {/* Modal Close Button */}
        <button
          onClick={() => {
            soundEngine.stop();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-400">
            <Volume2 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-syne font-bold text-2xl text-white tracking-wide uppercase">
              0-60 MPH SOUND SIMULATOR
            </h3>
            <p className="font-jakarta text-xs text-slate-400">
              Synthesized 1,920 HP Quad-Motor High-Voltage Launch Whine
            </p>
          </div>
        </div>

        {/* Speedometer & RPM Telemetry Gauge Visualizer */}
        <div className="my-8 relative glass-card p-6 rounded-2xl border border-purple-500/20 text-center flex flex-col items-center justify-center overflow-hidden">
          {/* Ambient Launch Glow Effect */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-transparent transition-opacity duration-300 pointer-events-none"
            style={{ opacity: isLaunching ? 1 : 0.2 }}
          />

          <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            {/* Speed Gauge */}
            <div className="flex flex-col items-center justify-center">
              <span className="font-space text-[10px] tracking-widest text-slate-400 uppercase mb-1">
                VELOCITY
              </span>
              <div className="font-space font-extrabold text-6xl text-white tracking-tighter text-glow-purple">
                {speed}
              </div>
              <span className="font-space text-xs text-purple-400 font-semibold tracking-wider">
                MPH
              </span>
            </div>

            {/* RPM Speedometer Arc Representation */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    stroke="#A855F7"
                    strokeWidth="8"
                    strokeDasharray={326}
                    strokeDashoffset={326 - (326 * (rpm - 1000)) / 21000}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-75"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <Gauge className="w-5 h-5 text-purple-400 mb-0.5" />
                  <span className="font-space text-xs font-bold text-white">
                    {(rpm / 1000).toFixed(1)}k
                  </span>
                  <span className="font-space text-[9px] text-slate-400">RPM</span>
                </div>
              </div>
            </div>

            {/* Simulated Launch G-Force */}
            <div className="flex flex-col items-center justify-center">
              <span className="font-space text-[10px] tracking-widest text-slate-400 uppercase mb-1">
                LAUNCH ACCELERATION
              </span>
              <div className="font-space font-extrabold text-5xl text-cyan-300 tracking-tight">
                {gForce.toFixed(2)}
              </div>
              <span className="font-space text-xs text-cyan-400 font-semibold tracking-wider">
                G-FORCE
              </span>
            </div>
          </div>

          {/* Time Progression Bar */}
          <div className="w-full mt-6 bg-slate-900 rounded-full h-2 overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-75"
              style={{ width: `${(speed / 60) * 100}%` }}
            />
          </div>
          <div className="w-full flex justify-between items-center text-[10px] font-mono text-slate-400 mt-2">
            <span>0.00s (STANDSTILL)</span>
            <span className="text-purple-400 font-bold">BENCHMARK: 1.74s</span>
            <span>60.0 MPH</span>
          </div>
        </div>

        {/* Launch Status Banner */}
        {launchComplete && (
          <div className="mb-6 p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-between animate-in slide-in-from-bottom-2">
            <div className="flex items-center gap-3">
              <Flame className="w-5 h-5 text-amber-400" />
              <div className="text-left">
                <p className="font-space text-xs font-bold text-white">
                  LAUNCH COMPLETED: 0-60 MPH IN 1.74s
                </p>
                <p className="font-jakarta text-[11px] text-slate-300">
                  Peak torque 2,360 Nm delivered via quad electric inverter drive.
                </p>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-cyan-400">1.85G MAX</span>
          </div>
        )}

        {/* Control Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {!isLaunching ? (
            <button
              onClick={handleStartLaunch}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-space font-semibold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current text-amber-300" />
              <span>ENGAGE LAUNCH CONTROL</span>
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-red-950 hover:bg-red-900 border border-red-500/50 text-red-300 font-space font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Square className="w-4 h-4 fill-current text-red-400" />
              <span>ABORT LAUNCH</span>
            </button>
          )}

          <button
            onClick={() => {
              soundEngine.stop();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 font-space text-xs uppercase tracking-widest border border-slate-700 transition-all cursor-pointer"
          >
            Close Simulator
          </button>
        </div>
      </div>
    </div>
  );
};
