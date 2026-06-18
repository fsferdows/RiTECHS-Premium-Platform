import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle, 
  Calculator, 
  FileText, 
  Sparkles, 
  Globe, 
  Users, 
  Layers, 
  ArrowRight,
  BookmarkCheck,
  Award,
  BookOpen,
  DollarSign,
  Briefcase
} from 'lucide-react';

interface ConferencePlansViewProps {
  onNavigate: (path: string) => void;
}

export default function ConferencePlansView({ onNavigate }: ConferencePlansViewProps) {
  const [activeSegment, setActiveSegment] = useState<'individual' | 'institution'>('individual');
  
  // Interactive Calculator State
  const [selectedPlanId, setSelectedPlanId] = useState('author_std');
  const [attendeeCount, setAttendeeCount] = useState(1);
  const [needsProofreading, setNeedsProofreading] = useState(false);
  const [includePhysicalProceeding, setIncludePhysicalProceeding] = useState(false);
  
  // Institutional Calculator State
  const [instPackage, setInstPackage] = useState('silver');
  const [estimatedPapers, setEstimatedPapers] = useState(40);
  const [addLneePublishing, setAddLneePublishing] = useState(true);

  // Proposal submit simulation
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proposalSent, setProposalSent] = useState(false);

  // Plans details list
  const individualPlans = [
    {
      id: 'student_rate',
      title: 'Student Author Rate',
      price: '€290',
      numericPrice: 290,
      description: 'Concessionary tier for active PhD candidates, graduate, or undergraduate investigators.',
      bullets: [
        'Oral / hybrid presentation schedule slot',
        'Springer LNEE or IEEE electronic access',
        'Indicated Student Certificate of Presentation',
        'Academic peer mentorship pairing session'
      ],
      tag: 'CONCESSIONARY',
      isFeatured: false
    },
    {
      id: 'author_std',
      title: 'Standard Author Rate',
      price: '€390',
      numericPrice: 390,
      description: 'Standard publication rate for academicians, researchers, and university faculties.',
      bullets: [
        'Full double-blind peer review processing',
        'Post-conference Scopus-indexed volume publication',
        'Certificate of Author Presentation (PDF + Printed)',
        'E-proceedings and active networking sessions'
      ],
      tag: 'RECOMMENDED',
      isFeatured: true
    },
    {
      id: 'presenter_only',
      title: 'Presenter Only (No Pub)',
      price: '€190',
      numericPrice: 190,
      description: 'For scholars presenting abstracts or posters without full paper review cycle.',
      bullets: [
        'Abstract presentation / Poster gallery entry',
        'Exclusion from Springer/IEEE proceedings',
        'Official Certificate of Presentation',
        'Attendance to all technical keynote panels'
      ],
      tag: 'NON-PUBLICATION',
      isFeatured: false
    },
    {
      id: 'listener_pass',
      title: 'Academic Listener',
      price: '€95',
      numericPrice: 95,
      description: 'For spectators, students, co-authors, or industry stakeholders attending.',
      bullets: [
        'Full access to parallel technical sessions',
        'Exclusive keynote and workshop streams',
        'Official Certificate of Attendance',
        'Conference documentation & abstracts booklet'
      ],
      tag: 'SPECTATOR',
      isFeatured: false
    }
  ];

  const institutionalPackages = [
    {
      id: 'bronze',
      title: 'Bronze Workshop Suite',
      basePrice: '€2,400',
      numericBasePrice: 2400,
      capacity: 'Up to 25 Papers',
      description: 'Ideal support framework for specialized local workshop forums or technical symposium co-hosting.',
      benefits: [
        'Online submission review routing panel',
        'Pre-made review forms & scholastic rubrics',
        'RiTECHS e-certificates distributions API',
        'Shared secretariat guidance'
      ],
      badge: 'REGIONAL WORKSHOP'
    },
    {
      id: 'silver',
      title: 'Silver Global Symposium',
      basePrice: '€4,800',
      numericBasePrice: 4800,
      capacity: '25 to 60 Papers',
      description: 'Fully integrated review and submission portal backed by RiTECHS publishing pipeline guidelines.',
      benefits: [
        'Custom review domain (e.g. yourconf.ritechs.org)',
        'Full review dashboard & board alignment',
        'Lecture Notes (Springer) / IEEE submittals prep',
        'Direct email campaign support to 40,000+ researchers'
      ],
      badge: 'INTERNATIONAL STANDARD',
      isFeatured: true
    },
    {
      id: 'gold',
      title: 'Gold University Nexus',
      basePrice: '€8,900',
      numericBasePrice: 8900,
      capacity: 'Over 60 Papers',
      description: 'Enterprise structural solution for universities looking to co-establish premium international conferences.',
      benefits: [
        'Unlimited review volume capacity lines',
        'Academic pairing with 18+ global advisory members',
        'Dedicated Secretariat representative (Wolverhampton desk)',
        'Guaranteed professional proceeding prep & typesetting'
      ],
      badge: 'ELITE CO-HOST'
    }
  ];

  // Dynamic Rate Calculation
  const calculatedIndividualTotal = () => {
    const activeIndividualPlan = individualPlans.find(p => p.id === selectedPlanId);
    if (!activeIndividualPlan) return 0;
    
    let base = activeIndividualPlan.numericPrice * attendeeCount;
    if (needsProofreading && (selectedPlanId === 'author_std' || selectedPlanId === 'student_rate')) {
      base += 120 * attendeeCount; // Proofreading fee per paper
    }
    if (includePhysicalProceeding) {
      base += 65 * attendeeCount; // Printed handbook cost
    }
    return base;
  };

  const calculatedInstTotal = () => {
    const activeInstPack = institutionalPackages.find(p => p.id === instPackage);
    if (!activeInstPack) return 0;

    let base = activeInstPack.numericBasePrice;
    
    // Add paper processing surcharge
    if (estimatedPapers > 30) {
      const extraPapers = estimatedPapers - 30;
      base += extraPapers * 45; // €45 charge per extra paper review
    }
    
    // Add Springer Nature index licensing surcharge
    if (addLneePublishing) {
      base += 1500;
    }

    return base;
  };

  // Submit request form
  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setProposalSent(true);
      setIsSubmitting(false);
    }, 1100);
  };

  return (
    <div id="conference-plans-view" className="pt-20 animate-fade-in-up text-white bg-maroon-dark min-h-screen">
      
      {/* Top Banner section */}
      <section className="bg-gradient-to-b from-[#2C0509] to-[#3D0C11] text-white py-12 lg:py-16 px-6 relative premium-noise border-b border-accent-gold/25">
        <div className="max-w-6xl mx-auto text-left relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-accent-gold uppercase font-bold bg-accent-gold/15 px-3 py-1.5 border border-accent-gold/30 rounded-full mb-4 inline-block">
              SCHOLASTIC PARTICIPATION & REVIEW PIPELINES
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-bold tracking-tight mb-4 mt-2">
              Plans & Sponsorship
            </h1>
            <p className="font-serif-accent text-sm md:text-base italic text-neutral-200 max-w-2xl font-light">
              Choose an author registration tier to represent your research, or partner as an academy to co-host and index a world-class symposium volume.
            </p>
          </div>

          <div className="flex bg-[#1b0305] p-1 border border-accent-gold/25 rounded-md font-mono text-xs">
            <button
              onClick={() => setActiveSegment('individual')}
              className={`px-4 py-2 transition-all duration-300 rounded-sm flex items-center gap-2 cursor-pointer ${
                activeSegment === 'individual'
                  ? 'bg-accent-gold text-primary-maroon font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>INDIVIDUAL REGISTRATION</span>
            </button>
            <button
              onClick={() => setActiveSegment('institution')}
              className={`px-4 py-2 transition-all duration-300 rounded-sm flex items-center gap-2 cursor-pointer ${
                activeSegment === 'institution'
                  ? 'bg-accent-gold text-primary-maroon font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>CO-HOST PARTNERSHIPS</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans Presentation */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {activeSegment === 'individual' ? (
          <div>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {individualPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border p-6 flex flex-col justify-between rounded-xs transition-all duration-300 relative group bg-[#1f0305] ${
                    plan.isFeatured
                      ? 'border-accent-gold shadow-md shadow-accent-gold/5'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {plan.isFeatured && (
                    <span className="absolute top-0 right-4 translate-y-[-50%] bg-accent-gold text-primary-maroon font-mono text-[8px] font-bold tracking-widest px-2.5 py-1 uppercase rounded-xs">
                      {plan.tag}
                    </span>
                  )}

                  <div>
                    <span className="text-[9px] font-mono tracking-wider text-accent-gold/60 uppercase block mb-1">
                      {plan.tag}
                    </span>
                    <h3 className="font-serif-display text-lg font-bold text-white mb-2 group-hover:text-accent-gold transition-colors">
                      {plan.title}
                    </h3>
                    <div className="flex items-baseline gap-1.5 my-3">
                      <span className="font-serif-display text-3xl font-bold text-white">{plan.price}</span>
                      <span className="text-[10px] font-mono text-white/45">/ per paper</span>
                    </div>
                    <p className="text-white/60 text-xs font-light mb-6 border-b border-white/5 pb-4 leading-relaxed">
                      {plan.description}
                    </p>

                    <ul className="flex flex-col gap-3 text-xs text-white/80 font-sans mb-8">
                      {plan.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                          <span className="font-light">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPlanId(plan.id);
                      const el = document.getElementById('rate-calculator-anchor');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full text-center py-2.5 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      selectedPlanId === plan.id
                        ? 'bg-accent-gold text-primary-maroon border border-accent-gold'
                        : 'bg-transparent border border-white/20 text-white hover:border-accent-gold hover:text-accent-gold'
                    }`}
                  >
                    {selectedPlanId === plan.id ? 'PLAN SELECTED' : 'CALCULATE RATE'}
                  </button>
                </div>
              ))}
            </div>

            {/* Rate Calculator and Addons */}
            <div id="rate-calculator-anchor" className="mt-16 bg-[#230407] border border-accent-gold/25 p-8 rounded-xs text-left shadow-2xl">
              <h3 className="font-serif-display text-xl font-bold text-white border-b border-white/10 pb-4 mb-6 flex items-center gap-2.5">
                <Calculator className="w-5 h-5 text-accent-gold" /> Individual Registration Rate Estimator
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 flex flex-col gap-6 text-xs">
                  
                  {/* Select Plan sync */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-accent-gold uppercase block mb-2 font-semibold">
                        Choose Tier
                      </label>
                      <select
                        value={selectedPlanId}
                        onChange={(e) => setSelectedPlanId(e.target.value)}
                        className="w-full bg-black/40 border border-white/15 px-3 py-2.5 rounded-xs focus:border-accent-gold outline-none font-sans text-white"
                      >
                        {individualPlans.map(p => (
                          <option key={p.id} value={p.id} className="bg-maroon-dark text-white">{p.title} (Starting {p.price})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-accent-gold uppercase block mb-2 font-semibold">
                        Quantity of Attendees / Papers
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={attendeeCount}
                        onChange={(e) => setAttendeeCount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-black/40 border border-white/15 px-3 py-2.5 rounded-xs focus:border-accent-gold outline-none text-white font-mono"
                      />
                    </div>
                  </div>

                  {/* Addon checkboxes */}
                  <div className="pt-4 border-t border-white/10 flex flex-col gap-4 font-mono text-[11px]">
                    <div className="text-white/45 uppercase tracking-wider mb-1">Addon Services</div>
                    
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={needsProofreading}
                        disabled={selectedPlanId === 'listener_pass' || selectedPlanId === 'presenter_only'}
                        onChange={(e) => setNeedsProofreading(e.target.checked)}
                        className="w-4 h-4 rounded-xs border-accent-gold text-primary-maroon bg-[#1b0305]"
                      />
                      <span>
                        Academic Language Review assistance (+€120 per paper)
                        { (selectedPlanId === 'listener_pass' || selectedPlanId === 'presenter_only') && " - Not eligible" }
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={includePhysicalProceeding}
                        onChange={(e) => setIncludePhysicalProceeding(e.target.checked)}
                        className="w-4 h-4 rounded-xs border-accent-gold text-primary-maroon bg-[#1b0305]"
                      />
                      <span>Physical printed Symposium Proceedings book edition (+€65)</span>
                    </label>
                  </div>
                </div>

                {/* Calculation breakdown */}
                <div className="lg:col-span-4 bg-black/35 border border-white/10 p-6 rounded-xs flex flex-col justify-between h-full min-h-[220px]">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-accent-gold uppercase mb-4 font-bold border-b border-white/5 pb-2">
                      ESTIMATED RATE SHEET
                    </div>
                    <div className="flex justify-between items-center text-xs text-white/70 mb-2">
                      <span>Base Registration:</span>
                      <span>€{(individualPlans.find(p => p.id === selectedPlanId)?.numericPrice || 0) * attendeeCount}</span>
                    </div>

                    {needsProofreading && (selectedPlanId === 'author_std' || selectedPlanId === 'student_rate') && (
                      <div className="flex justify-between items-center text-xs text-white/70 mb-2">
                        <span>Language Review:</span>
                        <span>€{120 * attendeeCount}</span>
                      </div>
                    )}

                    {includePhysicalProceeding && (
                      <div className="flex justify-between items-center text-xs text-white/70 mb-2">
                        <span>Printed Proceedings:</span>
                        <span>€{65 * attendeeCount}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-4 border-t border-accent-gold/30">
                    <div className="flex justify-between items-baseline mb-6">
                      <span className="font-mono text-[10px] text-accent-gold font-bold">TOTAL DUPLICATE:</span>
                      <span className="font-serif-display text-3xl font-bold text-white">€{calculatedIndividualTotal()}</span>
                    </div>

                    <button 
                      onClick={() => onNavigate('#/contact')}
                      className="w-full bg-accent-gold text-primary-maroon hover:bg-white font-mono text-xs font-bold py-2.5 px-4 uppercase tracking-widest transition-all duration-300 text-center cursor-pointer"
                    >
                      REQUEST REGISTER BOOKINGS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Packages List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
              {institutionalPackages.map((pack) => (
                <div
                  key={pack.id}
                  className={`border p-8 flex flex-col justify-between rounded-xs transition-all duration-300 relative bg-[#1f0305] ${
                    pack.isFeatured
                      ? 'border-accent-gold shadow-md shadow-accent-gold/5'
                      : 'border-white/10'
                  }`}
                >
                  <div>
                    <span className="px-2 py-1 bg-accent-gold/15 border border-accent-gold/30 text-accent-gold text-[8px] font-mono tracking-widest uppercase font-semibold rounded-xs">
                      {pack.badge}
                    </span>
                    <h3 className="font-serif-display text-xl font-bold text-white mt-4 mb-2">
                      {pack.title}
                    </h3>
                    <div className="flex items-baseline gap-1.5 my-3">
                      <span className="font-serif-display text-3xl font-bold text-white">{pack.basePrice}</span>
                      <span className="text-[10px] font-mono text-white/45">/ Base Establishment</span>
                    </div>
                    <div className="font-mono text-[11px] text-accent-gold mb-4">CAPACITY LIMIT: {pack.capacity}</div>
                    <p className="text-white/60 text-xs font-light mb-6 border-b border-white/5 pb-4 leading-relaxed">
                      {pack.description}
                    </p>

                    <ul className="flex flex-col gap-3 text-xs text-white/80 font-sans mb-8">
                      {pack.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                          <span className="font-light">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setInstPackage(pack.id);
                      const el = document.getElementById('inst-calculator-anchor');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full text-center py-2.5 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      instPackage === pack.id
                        ? 'bg-accent-gold text-primary-maroon border border-accent-gold'
                        : 'bg-transparent border border-white/20 text-white hover:border-accent-gold hover:text-accent-gold'
                    }`}
                  >
                    {instPackage === pack.id ? 'PACKAGE SELECTED' : 'CALCULATE CO-HOST'}
                  </button>
                </div>
              ))}
            </div>

            {/* Institutional Calculator */}
            <div id="inst-calculator-anchor" className="mt-16 bg-[#230407] border border-accent-gold/25 p-8 rounded-xs text-left shadow-2xl">
              <h3 className="font-serif-display text-xl font-bold text-white border-b border-white/10 pb-4 mb-6 flex items-center gap-2.5">
                <Calculator className="w-5 h-5 text-accent-gold" /> Co-Host Event Pricing Calculator
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 flex flex-col gap-6 text-xs">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-accent-gold uppercase block mb-2 font-semibold">
                        Co-Host Suite Level
                      </label>
                      <select
                        value={instPackage}
                        onChange={(e) => setInstPackage(e.target.value)}
                        className="w-full bg-black/40 border border-white/15 px-3 py-2.5 rounded-xs focus:border-accent-gold outline-none font-sans text-white"
                      >
                        {institutionalPackages.map(p => (
                          <option key={p.id} value={p.id} className="bg-maroon-dark text-white">{p.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-accent-gold uppercase block mb-2 font-semibold">
                        Expected Submission volume Count
                      </label>
                      <input
                        type="number"
                        min={10}
                        max={150}
                        value={estimatedPapers}
                        onChange={(e) => setEstimatedPapers(Math.max(10, parseInt(e.target.value) || 10))}
                        className="w-full bg-black/40 border border-white/15 px-3 py-2.5 rounded-xs focus:border-accent-gold outline-none text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 font-mono text-[11px]">
                    <div className="text-white/45 uppercase tracking-wider mb-2">Publishing Partnerships</div>
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={addLneePublishing}
                        onChange={(e) => setAddLneePublishing(e.target.checked)}
                        className="w-4 h-4 rounded-xs border-accent-gold text-primary-maroon bg-[#1b0305]"
                      />
                      <span>Leverage official Springer Nature (LNEE / LNCS) scopus editorial volume (+€1,500)</span>
                    </label>
                  </div>
                </div>

                {/* Institutional calculation sheet & contact proposal Form */}
                <div className="lg:col-span-4 bg-black/35 border border-white/10 p-6 rounded-xs flex flex-col justify-between h-full min-h-[220px]">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-accent-gold uppercase mb-4 font-bold border-b border-white/5 pb-2">
                      ESTIMATED SPONSOR SHEET
                    </div>
                    <div className="flex justify-between items-center text-xs text-white/70 mb-2">
                      <span>Base Platform License:</span>
                      <span>{institutionalPackages.find(p => p.id === instPackage)?.basePrice}</span>
                    </div>

                    {estimatedPapers > 30 && (
                      <div className="flex justify-between items-center text-xs text-white/70 mb-2">
                        <span>Extra Papers Review ({estimatedPapers - 30} pcs):</span>
                        <span>€{(estimatedPapers - 30) * 45}</span>
                      </div>
                    )}

                    {addLneePublishing && (
                      <div className="flex justify-between items-center text-xs text-white/70 mb-2">
                        <span>Springer LNEE indexing volume:</span>
                        <span>€1,500</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-4 border-t border-accent-gold/30">
                    <div className="flex justify-between items-baseline mb-6">
                      <span className="font-mono text-[10px] text-accent-gold font-bold">EST. BUDGET:</span>
                      <span className="font-serif-display text-3xl font-bold text-white">€{calculatedInstTotal()}</span>
                    </div>

                    <button 
                      onClick={() => {
                        const el = document.getElementById('proposal-contact-form-block');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full bg-accent-gold text-primary-maroon hover:bg-white font-mono text-xs font-bold py-2.5 px-4 uppercase tracking-widest transition-all duration-300 text-center cursor-pointer"
                    >
                      REQUEST EVENT PROPOSAL
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Proposal submit form */}
            <div id="proposal-contact-form-block" className="mt-16 max-w-2xl mx-auto bg-[#1f0305] border border-accent-gold/20 p-8 rounded-xs text-left shadow-2xl">
              <span className="text-[9px] font-mono tracking-widest text-accent-gold uppercase font-bold text-center block mb-2">
                SUBMIT EVENT SPECIFICATIONS
              </span>
              <h3 className="font-serif-display text-xl font-bold text-white text-center mb-6">
                RiTECHS Secretariat Proposal Booking
              </h3>

              {proposalSent ? (
                <div className="bg-accent-gold/10 border border-accent-gold/30 p-8 text-center rounded-xs animate-fade-in my-4 select-none">
                  <BookmarkCheck className="w-12 h-12 text-accent-gold mx-auto mb-4 animate-bounce" />
                  <h4 className="font-serif-display text-lg font-bold text-white mb-2">Sponsorship Proposal Dispatched</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light max-w-md mx-auto">
                    The Wolverhampton editorial support secretariat will compile customized prospectus materials and review schedules based on your calculated budget. Look out for index validation parameters in your email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="flex flex-col gap-5 text-xs text-white/95">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[9px] tracking-widest text-white/45 uppercase block mb-1">YOUR FULL NAME</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Prof. Jean-Pierre"
                        className="w-full bg-black/40 border border-white/10 px-3.5 py-2.5 rounded-xs outline-none focus:border-accent-gold text-white"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] tracking-widest text-white/45 uppercase block mb-1">INSTITUTION EMAIL</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="e.g. research@faculty.edu"
                        className="w-full bg-black/40 border border-white/10 px-3.5 py-2.5 rounded-xs outline-none focus:border-accent-gold text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[9px] tracking-widest text-white/45 uppercase block mb-1">Brief Co-Host Theme / Scope</label>
                    <textarea
                      rows={3}
                      placeholder="Indicate key technical domains, regional venue details, and tentative symposium timelines..."
                      className="w-full bg-black/40 border border-white/10 px-3.5 py-2.5 rounded-xs outline-none focus:border-accent-gold text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 bg-accent-gold text-primary-maroon font-bold py-3 px-6 uppercase font-mono tracking-widest transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white cursor-pointer"
                  >
                    <span>TRANSMIT PROSPECTUS REQUEST</span>
                    <ArrowRight className="w-4 h-4 text-primary-maroon" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </section>

    </div>
  );
}
