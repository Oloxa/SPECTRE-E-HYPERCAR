import React, { useState } from 'react';
import { MEDIA_QUOTES } from '../data/carData';
import { Zap, Award, Mail, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#020204] border-t border-purple-500/20 pt-20 pb-12 px-4 sm:px-8 text-slate-400 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Media Mentions Showcase */}
        <div>
          <div className="flex items-center gap-2 mb-8 justify-center">
            <Award className="w-4 h-4 text-cyan-400" />
            <span className="font-space text-xs font-bold text-slate-300 uppercase tracking-widest">
              CRITICAL ACCLAIM & MEDIA MENTIONS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MEDIA_QUOTES.map((quote, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all flex flex-col justify-between"
              >
                <p className="font-jakarta text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6">
                  "{quote.quote}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <span className="font-syne font-bold text-sm text-white uppercase tracking-wider">
                    {quote.outlet}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-[10px] font-space text-purple-300">
                    {quote.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Concierge Signup Section */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-syne font-extrabold text-2xl text-white uppercase tracking-wide">
              SPECTRE PRIVATE CONCIERGE BULLETIN
            </h3>
            <p className="font-jakarta text-xs text-slate-400 max-w-md">
              Receive confidential telemetry updates, track day invitations, and private launch announcements directly to your inbox.
            </p>
          </div>

          {!subscribed ? (
            <form
              onSubmit={handleSubscribe}
              className="flex items-center gap-2 w-full md:w-auto max-w-md"
            >
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter VIP email address"
                  className="w-full pl-11 pr-4 py-3.5 rounded-full bg-slate-900 border border-slate-700 text-white text-xs font-jakarta focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-space text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(168,85,247,0.5)] cursor-pointer flex items-center gap-2 shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="px-6 py-3 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-space text-xs uppercase tracking-wider flex items-center gap-2">
              <Check className="w-4 h-4 text-cyan-400" />
              <span>VIP BULLETIN SUBSCRIPTION ACTIVE</span>
            </div>
          )}
        </div>

        {/* Footer Bottom Metadata & Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="font-syne font-bold text-white tracking-widest uppercase">
              SPECTRE E-HYPERCAR
            </span>
            <span>© {new Date().getFullYear()} SPECTRE AUTOMOTIVE GROUP</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-purple-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Telemetry Terms
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              FIA Homologation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
