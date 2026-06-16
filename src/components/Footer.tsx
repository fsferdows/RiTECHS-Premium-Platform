import React, { useState } from 'react';
import { GraduationCap, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer id="premium-footer" className="bg-maroon-dark text-white py-16 border-t border-accent-gold/20 premium-noise">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xs border border-accent-gold flex items-center justify-center bg-primary-maroon overflow-hidden">
                {!logoError ? (
                  <img 
                    src="/logo.png" 
                    alt="RiTECHS Brand Logo" 
                    onError={() => setLogoError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <GraduationCap className="w-6 h-6 text-accent-gold" />
                )}
              </div>
              <span className="font-serif-display text-2xl font-bold tracking-tight text-white">RiTECHS</span>
            </div>
            
            <p className="text-white/70 text-sm font-light leading-relaxed">
              An elite global hub nurturing cybersecurity, IoT excellence, and energy sustainability scholarship. Aligning researchers with world-renowned peer systems.
            </p>

            <div className="flex flex-col gap-3 text-xs text-white/60 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-gold shrink-0" />
                <span>153, Dunstall Avenue, Wolverhampton, West Midlands, WV6 0NG, United Kingdom</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-gold shrink-0" />
                <span>info@ritechs.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent-gold shrink-0" />
                <span>+44 (0) 745 510 5988</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-serif-display text-lg text-accent-gold font-medium tracking-wide">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              {[
                { name: "About RiTECHS", path: "#/about" },
                { name: "Mentorship Hub", path: "#/mentors" },
                { name: "Academic Services", path: "#/services" },
                { name: "Editorial news", path: "#/blog" },
                { name: "Scholastic Contact", path: "#/contact" }
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => onNavigate(link.path)}
                  className="text-white/70 hover:text-accent-gold hover:translate-x-1 transition-all duration-200 text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Conferences */}
          <div className="flex flex-col gap-6">
            <h4 className="font-serif-display text-lg text-accent-gold font-medium tracking-wide">
              Conferences
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <button
                onClick={() => onNavigate("#/conferences/icetcs")}
                className="text-white/70 hover:text-accent-gold text-left group"
              >
                <div className="font-semibold text-white group-hover:text-accent-gold">ICETCS 2026</div>
                <div className="text-xs text-white/55">Genoa, Italy · Oct 12-13</div>
              </button>
              <button
                onClick={() => onNavigate("#/conferences/itss-ioe")}
                className="text-white/70 hover:text-accent-gold text-left group"
              >
                <div className="font-semibold text-white group-hover:text-accent-gold">ITSS-IoE 2026</div>
                <div className="text-xs text-white/55">Babcock, Nigeria · Oct 27-28</div>
              </button>
              <button
                onClick={() => onNavigate("#/conferences/aiot-rse")}
                className="text-white/70 hover:text-accent-gold text-left group"
              >
                <div className="font-semibold text-white group-hover:text-accent-gold">AIoT-RSE 2026</div>
                <div className="text-xs text-white/55">Genoa, Italy · Oct 12-13</div>
              </button>
            </div>
          </div>

          {/* Column 4: Research Insights Newsletter */}
          <div className="flex flex-col gap-6" id="footer-research-insights">
            <h4 className="font-serif-display text-lg text-accent-gold font-semibold tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent-gold rounded-full inline-block animate-pulse" />
              Research Insights
            </h4>
            <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
              Receive elite journal reviews, calls for papers, and exclusive scholarship invitations directly in your academic inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 mt-2">
              <div className="relative group/input rounded-xs overflow-hidden border border-white/10 focus-within:border-accent-gold/60 transition-all duration-300 bg-white/5 py-1 px-2 flex items-center shadow-inner">
                <input
                  type="email"
                  placeholder="academic.email@institution.edu"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow bg-transparent outline-none py-1.5 px-2 text-xs tracking-wider placeholder-white/25 text-white font-mono"
                />
                <button
                  type="submit"
                  className="bg-accent-gold hover:bg-white text-primary-maroon font-bold py-1 px-3 text-[10px] sm:text-xs font-mono uppercase tracking-widest transition-all duration-300 shadow-md group-hover/input:scale-102 flex items-center gap-1 cursor-pointer select-none"
                  id="btn-subscribe-insights"
                >
                  <Send className="w-3 h-3" />
                  <span>JOIN</span>
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-2 text-[11px] text-accent-gold mt-1 animate-fade-in font-mono tracking-wide">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>SUBSCRIBED SUCCESSFULLY.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/55 font-sans font-light">
          <p>© 2026 RiTECHS Academic Organization. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-mono text-[10px]">
            <span>WOLVERHAMPTON, UNITED KINGDOM</span>
            <span>·</span>
            <a href="mailto:info@ritechs.org" className="hover:text-accent-gold underline">INFO@RITECHS.ORG</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
