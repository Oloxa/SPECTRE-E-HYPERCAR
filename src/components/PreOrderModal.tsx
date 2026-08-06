import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lock,
  CreditCard,
  Building,
  Coins,
  CheckCircle,
  FileText,
} from 'lucide-react';
import { PreOrderForm, ConfiguratorState } from '../types';
import { PAINT_OPTIONS, WHEEL_OPTIONS } from '../data/carData';

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ConfiguratorState;
}

export const PreOrderModal: React.FC<PreOrderModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [form, setForm] = useState<PreOrderForm>({
    step: 1,
    tier: 'founders',
    fullName: '',
    email: '',
    phone: '',
    region: 'North America',
    paymentMethod: 'wire',
    termsAccepted: false,
    isSubmitted: false,
    reservationId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const currentPaint =
    PAINT_OPTIONS.find((p) => p.id === config.paint) || PAINT_OPTIONS[0];

  const handleNextStep = () => {
    // Validation
    const newErrors: Record<string, string> = {};
    if (form.step === 2) {
      if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required.';
      if (!form.email.trim() || !form.email.includes('@'))
        newErrors.email = 'Valid Email Address is required.';
      if (!form.phone.trim()) newErrors.phone = 'Contact Phone is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (form.step < 3) {
      setForm((prev) => ({ ...prev, step: prev.step + 1 }));
    } else {
      // Submit reservation
      const resId = `SPECTRE-VIP-${Math.floor(100000 + Math.random() * 900000)}`;
      setForm((prev) => ({
        ...prev,
        isSubmitted: true,
        reservationId: resId,
      }));
    }
  };

  const handlePrevStep = () => {
    if (form.step > 1) {
      setForm((prev) => ({ ...prev, step: prev.step - 1 }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 glass-card rounded-3xl p-6 sm:p-10 border border-purple-500/40 shadow-[0_0_100px_rgba(168,85,247,0.4)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!form.isSubmitted ? (
          <>
            {/* Modal Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-[10px] font-space tracking-widest uppercase mb-3">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                OFFICIAL PRODUCTION ALLOCATION FORM
              </div>
              <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
                VIP PRE-ORDER ALLOCATION
              </h3>
              <p className="font-jakarta text-slate-400 text-xs mt-1">
                Step {form.step} of 3: Reserve your production slot with a $25,000 USD fully refundable deposit.
              </p>
            </div>

            {/* Stepper Progress Bar */}
            <div className="w-full bg-slate-900 h-1.5 rounded-full mb-8 overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${(form.step / 3) * 100}%` }}
              />
            </div>

            {/* STEP 1: Select Edition Tier */}
            {form.step === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <label className="font-space text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Select Production Tier:
                </label>

                <div className="space-y-3">
                  <div
                    onClick={() => setForm((prev) => ({ ...prev, tier: 'founders' }))}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      form.tier === 'founders'
                        ? 'bg-purple-950/60 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                            form.tier === 'founders'
                              ? 'bg-purple-600 border-purple-400 text-white'
                              : 'border-slate-700 bg-slate-800'
                          }`}
                        >
                          {form.tier === 'founders' && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                          <p className="font-space text-sm font-bold text-white uppercase">
                            FOUNDERS SERIES (#001 / #100)
                          </p>
                          <p className="font-jakarta text-xs text-slate-400">
                            Includes carbon weave badge, concierge priority delivery & VIP track day experience.
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        LIMITED
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setForm((prev) => ({ ...prev, tier: 'performance' }))}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      form.tier === 'performance'
                        ? 'bg-purple-950/60 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                            form.tier === 'performance'
                              ? 'bg-purple-600 border-purple-400 text-white'
                              : 'border-slate-700 bg-slate-800'
                          }`}
                        >
                          {form.tier === 'performance' && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                          <p className="font-space text-sm font-bold text-white uppercase">
                            SPECTRE GT PERFORMANCE
                          </p>
                          <p className="font-jakarta text-xs text-slate-400">
                            Standard bespoke allocation with personal styling consultation.
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-slate-400">
                        STANDARD
                      </span>
                    </div>
                  </div>
                </div>

                {/* Config Summary Badge */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 font-bold">SELECTED FINISH:</span>
                    <span>{currentPaint.name}</span>
                  </div>
                  <span className="text-cyan-400 font-bold">$25,000 DEPOSIT</span>
                </div>
              </div>
            )}

            {/* STEP 2: Contact Information */}
            {form.step === 2 && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <label className="font-space text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Lord Alexander Sterling"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500 font-jakarta"
                  />
                  {errors.fullName && (
                    <span className="text-red-400 text-xs mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-space text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="client@concierge.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500 font-jakarta"
                    />
                    {errors.email && (
                      <span className="text-red-400 text-xs mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  <div>
                    <label className="font-space text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500 font-jakarta"
                    />
                    {errors.phone && (
                      <span className="text-red-400 text-xs mt-1 block">{errors.phone}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="font-space text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Preferred Delivery Region
                  </label>
                  <select
                    value={form.region}
                    onChange={(e) => setForm({ ...form, region: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500 font-jakarta cursor-pointer"
                  >
                    <option value="North America">North America (Monaco, California, NY)</option>
                    <option value="Europe">Europe (London, Zurich, Milan, Munich)</option>
                    <option value="Middle East">Middle East (Dubai, Riyadh, Abu Dhabi)</option>
                    <option value="Asia Pacific">Asia Pacific (Tokyo, Singapore, Hong Kong)</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 3: Refundable Deposit Payment Option */}
            {form.step === 3 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 text-center">
                  <span className="font-space text-[10px] text-purple-300 uppercase tracking-widest block">
                    REFUNDABLE RESERVATION DEPOSIT
                  </span>
                  <span className="font-space font-extrabold text-3xl text-cyan-300 text-glow-cyan my-1 block">
                    $25,000 USD
                  </span>
                  <span className="font-jakarta text-[11px] text-slate-400">
                    100% Fully Refundable prior to final production chassis locking.
                  </span>
                </div>

                <div className="space-y-3">
                  <label className="font-space text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Deposit Payment Channel:
                  </label>

                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, paymentMethod: 'wire' }))}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        form.paymentMethod === 'wire'
                          ? 'bg-purple-950/80 border-purple-400 text-white shadow-lg'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <Building className="w-5 h-5 text-purple-400" />
                      <span className="font-space text-[11px] font-bold">Bank Wire</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, paymentMethod: 'card' }))}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        form.paymentMethod === 'card'
                          ? 'bg-purple-950/80 border-purple-400 text-white shadow-lg'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-cyan-400" />
                      <span className="font-space text-[11px] font-bold">Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, paymentMethod: 'crypto' }))}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        form.paymentMethod === 'crypto'
                          ? 'bg-purple-950/80 border-purple-400 text-white shadow-lg'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <Coins className="w-5 h-5 text-amber-400" />
                      <span className="font-space text-[11px] font-bold">Crypto Concierge</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={form.termsAccepted}
                    onChange={(e) => setForm({ ...form, termsAccepted: e.target.checked })}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                  <label htmlFor="terms" className="font-jakarta text-xs text-slate-300 cursor-pointer">
                    I agree to SPECTRE VIP Allocation Terms & Conditions and acknowledge the deposit terms.
                  </label>
                </div>
              </div>
            )}

            {/* Step Navigation Controls */}
            <div className="mt-8 flex items-center justify-between gap-4 pt-6 border-t border-slate-800">
              {form.step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-space uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNextStep}
                disabled={form.step === 3 && !form.termsAccepted}
                className={`px-8 py-3.5 rounded-full font-space font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer ${
                  form.step === 3 && !form.termsAccepted
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.5)]'
                }`}
              >
                <span>{form.step === 3 ? 'Confirm Deposit & Reserve' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          /* Confirmation Screen */
          <div className="text-center space-y-6 py-4 animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-full bg-purple-950/80 border-2 border-purple-400 text-purple-300 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(168,85,247,0.8)]">
              <CheckCircle className="w-8 h-8 text-cyan-400" />
            </div>

            <div>
              <span className="font-space text-xs font-bold text-purple-400 uppercase tracking-widest block">
                ALLOCATION CONFIRMED
              </span>
              <h3 className="font-syne font-extrabold text-3xl text-white uppercase mt-1">
                WELCOME TO SPECTRE VIP
              </h3>
              <p className="font-jakarta text-slate-300 text-xs max-w-md mx-auto mt-2">
                Your reservation registration has been registered. Our private concierge team will contact you within 24 hours.
              </p>
            </div>

            {/* VIP Pass Summary Badge */}
            <div className="glass-card p-6 rounded-2xl border border-purple-500/40 bg-purple-950/20 text-left space-y-3 font-mono text-xs text-slate-300">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-500">RESERVATION SERIAL:</span>
                <span className="font-bold text-cyan-300 text-sm">{form.reservationId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">CLIENT NAME:</span>
                <span className="text-white font-semibold">{form.fullName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">SELECTED TIER:</span>
                <span className="text-purple-300 font-semibold">{form.tier.toUpperCase()} SERIES</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">DELIVERY REGION:</span>
                <span className="text-white">{form.region}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-space font-bold text-xs uppercase tracking-widest shadow-lg transition-all cursor-pointer"
            >
              Return to Showcase
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
