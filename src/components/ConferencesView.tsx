import React, { useState } from 'react';
import { Conference } from '../types';
import { 
  Calendar, MapPin, Laptop, Search, Info, Award, UserCheck, 
  MapPinIcon, Sparkles, Building, CreditCard, ChevronLeft, Check, Ticket 
} from 'lucide-react';
import { TiltCard } from './TiltCard';
import { FadeUpSection } from './FadeUpSection';
import { ConferenceCard } from './ConferenceCard';

interface ConferencesViewProps {
  currentPath: string;
  conferences: Conference[];
  onNavigate: (path: string) => void;
}

export default function ConferencesView({ currentPath, conferences, onNavigate }: ConferencesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [formatFilter, setFormatFilter] = useState<'All' | 'Hybrid' | 'In-Person'>('All');
  
  // Payment state
  const [stripeModalOpen, setStripeModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<{ tier: string; price: string; confName: string } | null>(null);
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Parse path for details (e.g. #/conferences/icetcs)
  const isDetailsPage = currentPath.startsWith('#/conferences/');
  const activeSlug = isDetailsPage ? currentPath.replace('#/conferences/', '') : null;
  const activeConference = conferences.find(c => c.slug === activeSlug);

  const filteredConferences = conferences.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFormat = formatFilter === 'All' || c.format === formatFilter;
    return matchesSearch && matchesFormat;
  });

  const launchStripe = (confName: string, tier: string, price: string) => {
    setSelectedTier({ confName, tier, price });
    setStripeModalOpen(true);
    setPaymentSuccess(false);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1800);
  };

  if (activeConference) {
    // ----------------------------------------
    // SINGLE CONFERENCE DETAIL TEMPLATE
    // ----------------------------------------
    return (
      <div id="conference-detail-view" className="pt-20 animate-fade-in-up text-charcoal">
        {/* Detail Hero Section */}
        <section className="bg-primary-navy text-white py-16 px-6 relative premium-noise overflow-hidden border-b border-accent-gold/20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full bg-accent-gold blur-[120px]" />
          </div>
          
          <div className="max-w-5xl mx-auto relative z-10">
            <button 
              onClick={() => onNavigate('#/conferences')}
              className="inline-flex items-center gap-2 text-accent-gold hover:text-white text-xs uppercase tracking-widest font-mono mb-8 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Return to Hub
            </button>

            <div className="flex flex-wrap items-center gap-3 mb-4 font-mono text-xs">
              <span className="px-3 py-1 bg-accent-gold/10 border border-accent-gold text-accent-gold uppercase tracking-wider font-semibold">
                {activeConference.year} EDITION
              </span>
              <span className="px-3 py-1 bg-white/10 uppercase border border-white/20">
                {activeConference.format}
              </span>
            </div>

            <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
              {activeConference.fullName} ({activeConference.name})
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-sm text-white/80 font-mono mt-8 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-gold" />
                <span>{activeConference.location}</span>
                <span className="text-white/40">[{activeConference.format}]</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent-gold" />
                <span>{activeConference.dates}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Overview & Important Dates (Horizontal on desktop, vertical on mobile) */}
        <section className="py-20 bg-white border-b border-divider-gold/60">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <h2 className="font-serif-display text-2.5xl sm:text-3xl text-primary-navy font-bold leading-tight">
                Summit Mission & Context
              </h2>
              <p className="text-sm text-muted-gray leading-relaxed font-light">
                {activeConference.description}
              </p>
              <p className="text-sm text-primary-navy/85 leading-relaxed font-serif-accent italic text-base">
                "Peer reviews for Accepted Papers will detail specific feedback regarding methodology modeling, ensuring sufficient density to justify Q1 index linking."
              </p>
            </div>

            <div className="lg:col-span-5 bg-neutral-warm border border-divider-gold/50 p-8 flex flex-col">
              <h3 className="font-serif-display text-lg text-primary-navy font-semibold mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent-gold" /> Critical Milestone Timeline
              </h3>
              
              {/* Timeline list */}
              <div className="flex flex-col gap-5">
                {activeConference.importantDates.map((d, index) => (
                  <div key={index} className="flex gap-4 items-start relative group">
                    {index < activeConference.importantDates.length - 1 && (
                      <div className="absolute top-6 left-2.5 bottom-0 w-px bg-divider-gold" />
                    )}

                    <div className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center shrink-0 z-10 transition-colors ${
                      d.status === 'current' 
                        ? 'bg-accent-gold border-accent-gold text-primary-navy shadow-xs' 
                        : d.status === 'past'
                        ? 'bg-primary-navy border-primary-navy text-white'
                        : 'bg-white border-divider-gold text-muted-gray'
                    }`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-primary-navy">
                          {d.event}
                        </span>
                        {d.status === 'current' && (
                          <span className="text-[8px] bg-red-600 text-white font-mono uppercase tracking-widest px-1.5 rounded-xs animate-pulse font-bold">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="font-serif-accent text-sm italic text-muted-gray mt-1 font-medium">{d.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership & Organizers Section */}
        {((activeConference.general_chairs && activeConference.general_chairs.length > 0) || 
          (activeConference.keynote_speakers && activeConference.keynote_speakers.length > 0)) && (
          <section className="py-16 bg-[#FDFDFB] border-b border-divider-gold/40">
            <div className="max-w-5xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* General Chairs */}
                {activeConference.general_chairs && activeConference.general_chairs.length > 0 && (
                  <div className="bg-white border border-divider-gold/30 p-8 rounded-sm shadow-xs">
                    <h3 className="font-mono text-xs text-accent-gold uppercase tracking-widest mb-4 font-bold">
                      General Chair(s)
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {activeConference.general_chairs.map((chair, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-primary-navy font-semibold font-serif-display">
                          <span className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
                          {chair}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Keynote Speakers */}
                {activeConference.keynote_speakers && activeConference.keynote_speakers.length > 0 && (
                  <div className="bg-white border border-divider-gold/30 p-8 rounded-sm shadow-xs">
                    <h3 className="font-mono text-xs text-accent-gold uppercase tracking-widest mb-4 font-bold">
                      Keynote Speaker Series
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeConference.keynote_speakers.map((speaker, idx) => (
                        <div key={idx} className="text-xs text-muted-gray bg-neutral-warm/30 p-2.5 border border-divider-gold/20 flex items-center gap-2">
                          <span className="text-accent-gold font-bold">#</span>
                          <span className="font-sans font-medium">{speaker}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Topics and Tracks Section */}
        <section className="py-20 bg-[#FAFAF7] premium-noise border-b border-divider-gold/60">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-3">CONFERENCE SCOPE</h3>
              <h2 className="font-serif-display text-3xl font-bold text-primary-navy">Research Topics & Call Tracks</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeConference.tracks.map((track, i) => (
                <div key={i} className="bg-white border border-divider-gold/40 p-8 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-navy/5 flex items-center justify-center text-accent-gold shrink-0 font-mono text-sm font-bold">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="font-serif-display text-base font-bold text-primary-navy mb-2">Track Core Area</h4>
                    <p className="text-xs sm:text-sm text-muted-gray font-light leading-relaxed">
                      {track}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Speaker Showcase (Grayscale Portraits that colorize on hover) */}
        <section className="py-20 bg-white border-b border-divider-gold/60">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-3">Distinguished Guest Speakers</h3>
              <h2 className="font-serif-display text-3xl font-bold text-primary-navy">The Academic Assembly</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {activeConference.speakers.map((speaker, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-6 items-center border border-divider-gold/30 p-6 bg-neutral-warm/40 group">
                  <div className="w-32 h-32 rounded-sm overflow-hidden shrink-0 bg-charcoal/10 border border-divider-gold">
                    <img 
                      src={speaker.image} 
                      alt={speaker.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[700ms]"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] font-mono text-accent-gold uppercase tracking-wider font-bold">
                      {speaker.role}
                    </span>
                    <h3 className="font-serif-display text-lg text-primary-navy font-bold mt-1 mb-1">
                      {speaker.name}
                    </h3>
                    <p className="text-xs text-muted-gray font-mono font-medium tracking-wide uppercase">
                      {speaker.affiliation}
                    </p>
                    <p className="text-xs text-primary-navy/80 font-serif-accent italic font-light mt-3 leading-relaxed">
                      "{speaker.topic}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Tiers pricing cards */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-3 text-center">Registration & Passes</h3>
              <h2 className="font-serif-display text-3xl sm:text-4.5xl text-primary-navy font-bold leading-tight">Secure Your Place</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {activeConference.pricing.map((tier, index) => (
                <div 
                  key={index}
                  className={`border flex flex-col justify-between h-full p-8 shadow-xs relative group ${
                    tier.isFeatured 
                      ? 'border-accent-gold bg-primary-navy text-white premium-noise' 
                      : 'border-divider-gold bg-neutral-warm/40 text-charcoal'
                  }`}
                >
                  {tier.isFeatured && (
                    <span className="absolute top-0 right-1/2 translate-x-1/2 translate-y-[-50%] bg-accent-gold text-primary-navy font-sans text-[8px] font-bold uppercase tracking-widest px-3 py-1 text-center">
                      RECOMMENDED TIER
                    </span>
                  )}

                  <div>
                    <h4 className="text-xs font-mono tracking-widest uppercase mb-4 text-[#C9A961]/90">
                      {tier.tier}
                    </h4>
                    
                    <div className="flex items-baseline gap-2 mb-8 border-b border-divider-gold/30 pb-6">
                      <span className="font-serif-display text-4.5xl font-black">
                        {tier.price}
                      </span>
                      <span className="text-xs text-muted-gray">/ pass</span>
                    </div>

                    <ul className="flex flex-col gap-4 text-xs font-light mb-8">
                      {tier.benefits.map((b, bIdx) => (
                        <li key={bIdx} className="flex gap-2 items-start">
                          <Check className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                          <span className="leading-normal">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => launchStripe(activeConference.name, tier.tier, tier.price)}
                    className={`w-full py-3.5 text-xs font-sans uppercase tracking-widest font-semibold transition-all duration-300 ${
                      tier.isFeatured 
                        ? 'bg-accent-gold text-primary-navy hover:bg-[#B3934B]' 
                        : 'border border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white'
                    }`}
                  >
                    Reserve Place
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Venue and Sponsors Section */}
        <section className="py-20 bg-[#FAFAF7] premium-noise border-t border-divider-gold/60">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-3 flex items-center gap-1.5">
                <MapPinIcon className="w-4 h-4" /> Physical Venue & Access
              </h3>
              <h4 className="font-serif-display text-xl text-primary-navy font-bold mb-4">
                Hybrid Linkages
              </h4>
              <p className="text-xs sm:text-sm text-muted-gray leading-relaxed font-light mb-6">
                All physical sessions convene inside accredited partner lecture halls located in {activeConference.location}. Virtual sessions are routed via real-time high-fidelity streaming platform integrations, allowing active attendees to raise hands and participate inside dialogue structures seamlessly.
              </p>
              <div className="bg-white border border-divider-gold/40 p-4 text-[11px] font-mono">
                <div className="flex justify-between py-1 border-b border-divider-gold/10">
                  <span className="text-muted-gray">WIFI Credentials:</span>
                  <span className="font-medium text-primary-navy">RITECHS_GUEST_5G</span>
                </div>
                <div className="flex justify-between py-1 border-b border-divider-gold/10">
                  <span className="text-muted-gray">Plenary Room:</span>
                  <span className="font-medium text-primary-navy">Main Octagon Room</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-gray">Web linking status:</span>
                  <span className="font-medium text-green-600">ONLINE</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="text-xs font-mono tracking-widest text-[#6B7280] uppercase mb-4">CO-SPONSORED BY</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-divider-gold/30 p-6 flex items-center justify-center font-serif-display text-sm tracking-wider text-primary-navy">
                  IEEE Sovereign S&P
                </div>
                <div className="bg-white border border-divider-gold/30 p-6 flex items-center justify-center font-serif-display text-sm tracking-wider text-primary-navy italic">
                  Springer Nature
                </div>
                <div className="bg-white border border-divider-gold/30 p-6 flex items-center justify-center font-serif-display text-sm tracking-wider text-primary-navy">
                  Wolverhampton Corp
                </div>
                <div className="bg-white border border-divider-gold/30 p-6 flex items-center justify-center font-serif-display text-sm tracking-wider text-primary-navy italic">
                  ACM Europe
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            STRIPE SECURE CHECKOUT MODAL INTENT
           ---------------------------------------- */}
        {stripeModalOpen && selectedTier && (
          <div className="fixed inset-0 bg-primary-navy/70 z-50 flex items-center justify-center p-6 backdrop-blur-xs">
            <div className="bg-white rounded-xs border border-accent-gold/40 w-full max-w-md overflow-hidden shadow-2xl relative animate-scale-up">
              
              {/* Strap brand header */}
              <div className="bg-primary-navy p-6 text-white border-b border-accent-gold/20 flex justify-between items-center premium-noise">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-accent-gold" />
                  <span className="font-serif-display text-lg font-bold text-white">Stripe Checkout</span>
                </div>
                <button 
                  onClick={() => setStripeModalOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {!paymentSuccess ? (
                <form onSubmit={handlePay} className="p-8 flex flex-col gap-4 text-xs">
                  <div className="bg-neutral-warm border border-divider-gold/40 p-4 mb-2">
                    <div className="text-[10px] uppercase font-mono tracking-widest text-muted-gray">Registration Intake</div>
                    <div className="font-serif-display text-base font-bold text-primary-navy mt-1">
                      {selectedTier.confName} · {selectedTier.tier}
                    </div>
                    <div className="text-xl font-bold font-serif-display text-accent-gold mt-2">
                      {selectedTier.price} <span className="text-[10px] font-sans text-muted-gray uppercase italic">Vetted Rate</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] text-primary-navy font-bold uppercase">Academic Email / Holder Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Prof. Alistair Evans" 
                      required 
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="border border-divider-gold p-3 bg-neutral-warm/30 font-sans text-sm focus:border-accent-gold outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] text-primary-navy font-bold uppercase">Card Credentials (STRIPE TEST)</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="border border-divider-gold p-3 bg-neutral-warm/30 font-mono text-sm focus:border-accent-gold outline-none w-full"
                      />
                      <span className="absolute right-3 top-3 text-[10px] bg-accent-gold/20 text-[#B3934B] px-1.5 py-0.5 font-bold uppercase tracking-widest">TEST</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] text-primary-navy font-bold uppercase">Expiry (MM/YY)</label>
                      <input 
                        type="text" 
                        placeholder="12/28" 
                        required 
                        maxLength={5}
                        className="border border-divider-gold p-3 text-center bg-neutral-warm/30 text-sm focus:border-accent-gold outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] text-primary-navy font-bold uppercase">CVV / CVC</label>
                      <input 
                        type="password" 
                        placeholder="•••" 
                        required 
                        maxLength={4}
                        className="border border-divider-gold p-3 text-center bg-neutral-warm/30 text-sm focus:border-accent-gold outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-accent-gold hover:bg-[#B3934B] text-primary-navy py-4 font-sans font-bold uppercase tracking-widest mt-4 text-xs transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-primary-navy/40 border-t-primary-navy rounded-full animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" /> Secure Vetted Payment
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="p-8 text-center flex flex-col items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-600 border border-green-500/20 flex items-center justify-center animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-xl font-bold text-primary-navy">Payment Accepted</h3>
                    <p className="text-xs text-muted-gray leading-relaxed font-light mt-2 max-w-sm">
                      Your attendance has been registered successfully. A secure invitation link and receipt has been routed back to your academic email.
                    </p>
                  </div>
                  <div className="bg-neutral-warm border border-divider-gold/30 p-4 font-mono text-[10px] w-full text-left flex flex-col gap-1">
                    <div><span className="text-muted-gray">Conf:</span> {selectedTier.confName}</div>
                    <div><span className="text-muted-gray">Tier:</span> {selectedTier.tier}</div>
                    <div><span className="text-muted-gray">Invoice:</span> INV-2026-{Math.floor(Math.random() * 90000 + 10000)}</div>
                    <div><span className="text-muted-gray">Status:</span> SECURED BY STRIPE</div>
                  </div>
                  <button
                    onClick={() => setStripeModalOpen(false)}
                    className="w-full bg-primary-navy text-white hover:bg-accent-gold hover:text-primary-navy py-3 uppercase text-xs tracking-widest font-semibold transition-colors"
                  >
                    Close Portal
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------
  // CONFERENCES PORTAL HUB MAIN VIEW
  // ----------------------------------------
  return (
    <div id="conferences-hub-view" className="pt-16 animate-fade-in-up text-charcoal">
      {/* Editorial Header */}
      <section className="bg-gradient-to-b from-primary-navy to-[#0F2954] text-white py-24 px-6 text-center relative premium-noise overflow-hidden border-b border-accent-gold/20">
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden opacity-100">
          <img 
            src="/banner 3.png" 
            alt="Scholastic Campus Backdrop" 
            referrerPolicy="no-referrer"
            onError={(e) => {
              const el = e.currentTarget;
              const bkp = "https://images.unsplash.com/photo-1491841573176-0aa59e4b67ad?auto=format&fit=crop&q=80&w=1600";
              if (el.src !== bkp) {
                el.src = bkp;
              } else {
                el.onerror = null;
                el.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='100%25' height='100%25' fill='%23000'/%3E%3C/svg%3E";
              }
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-4">Scientific Symposiums</h3>
          <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight mb-8">
            The Conference Hub
          </h1>
          <p className="font-serif-accent text-lg sm:text-xl italic text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
            Providing index-linked platforms where cyber defense, advanced IoT grids, and sustainable energy methodologies meet peer recognition.
          </p>
        </div>
      </section>

      {/* Filters & Search Toolbar */}
      <section className="py-8 bg-white border-b border-divider-gold/50">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-6 items-center justify-between">
          
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-accent-gold absolute left-3.5 top-3.5" />
            <input 
              type="text" 
              placeholder="Search by city, name, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-neutral-warm/40 border border-divider-gold/60 focus:border-accent-gold outline-none text-xs transition-colors"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            {(["All", "Hybrid", "In-Person"] as const).map((format) => (
              <button
                key={format}
                onClick={() => setFormatFilter(format)}
                className={`flex-grow md:flex-grow-0 px-4 py-2 border text-xs tracking-widest font-mono uppercase transition-colors ${
                  formatFilter === format 
                    ? 'bg-primary-navy border-primary-navy text-accent-gold' 
                    : 'border-divider-gold bg-transparent text-primary-navy/80 hover:bg-neutral-warm'
                }`}
              >
                {format}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Conference Grid List */}
      <FadeUpSection className="py-20 max-w-5xl mx-auto px-6">
        {filteredConferences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredConferences.map((conf) => (
              <ConferenceCard 
                key={conf.slug}
                conf={conf}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#FAFAF7] border border-dashed border-divider-gold/65">
            <Info className="w-8 h-8 text-accent-gold/60 mx-auto mb-4" />
            <h3 className="font-serif-display text-lg text-primary-navy font-bold">No conferences match criteria</h3>
            <p className="text-xs text-muted-gray mt-1 max-w-sm mx-auto font-light leading-relaxed">
              Adjust filters or clear your search term to explore our upcoming index-linked editions.
            </p>
          </div>
        )}
      </FadeUpSection>
    </div>
  );
}
