import React, { useState, useRef, useEffect } from 'react';
import { Mentor } from '../types';
import { 
  Search, Filter, Mail, Star, X, Calendar, CheckSquare, Award, 
  BookOpen, Clock, UserCheck, Sparkles, Send, Check, Loader,ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TiltCard } from './TiltCard';
import { FadeUpSection } from './FadeUpSection';
import { MentorCard } from './MentorCard';

interface MentorsViewProps {
  mentors: Mentor[];
  onNavigate: (path: string) => void;
}

export default function MentorsView({ mentors, onNavigate }: MentorsViewProps) {
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<string>('All');
  const [selectedRole, setSelectedRole] = useState<'all' | 'mentor' | 'mentee'>('all');
  
  // Drawer state
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  
  // Consultation form inside Drawer
  const [consultDate, setConsultDate] = useState('');
  const [consultTimeSlot, setConsultTimeSlot] = useState('');
  const [consultTopic, setConsultTopic] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Sample slots for interactive luxury slot selection
  const timeSlots = [
    "09:30 AM - 11:00 AM (CET)",
    "11:30 AM - 01:00 PM (CET)",
    "02:00 PM - 03:30 PM (CET)",
    "04:00 PM - 05:30 PM (CET)"
  ];

  // Extract all fields dynamically & count them for facet badges
  const fieldCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    mentors.forEach(m => {
      m.fields.forEach(f => {
        counts[f] = (counts[f] || 0) + 1;
      });
    });
    return counts;
  }, [mentors]);

  const allFields = ['All', ...Object.keys(fieldCounts)];

  const filteredMentors = mentors.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesField = selectedField === 'All' || m.fields.includes(selectedField);
    const matchesRole = selectedRole === 'all' || m.role === selectedRole;
    return matchesSearch && matchesField && matchesRole;
  });

  const handleOpenMentor = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setBookingSuccess(false);
    setConsultDate('');
    setConsultTimeSlot('');
    setConsultTopic('');
  };

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultTimeSlot) return;
    setBookingLoading(true);
    setTimeout(() => {
      setBookingLoading(false);
      setBookingSuccess(true);
    }, 1000);
  };

  return (
    <div id="mentors-matchmaking-view" className="pt-20 animate-fade-in-up text-charcoal">
      {/* Brand Header */}
      <section className="relative bg-gradient-to-b from-primary-navy to-[#0F2954] text-white py-20 px-6 text-center premium-noise overflow-hidden">
        {/* Glassmorphic Background Image Layer with soft scholastic library ambient view */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden opacity-55">
          <img 
            src="/banner 4.png" 
            alt="Scholastic Library Backdrop" 
            referrerPolicy="no-referrer"
            onError={(e) => {
              const el = e.currentTarget;
              const bkp = "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1600";
              if (el.src !== bkp) {
                el.src = bkp;
              } else {
                el.onerror = null;
                el.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='100%25' height='100%25' fill='%23000'/%3E%3C/svg%3E";
              }
            }}
            className="w-full h-full object-cover brightness-[55%] contrast-[110%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/40 via-primary-navy/70 to-[#0F2954] mix-blend-multiply" />
        </div>

        {/* Subtle geometric lines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none z-10">
          <div className="absolute top-10 left-10 w-96 h-96 rounded-full border border-accent-gold/30" />
          <div className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full border-2 border-dashed border-accent-gold/15" />
        </div>

        <div className="max-w-4xl mx-auto relative z-20">
          <span className="text-[10px] font-mono tracking-widest text-accent-gold uppercase font-bold bg-[#C9A961]/10 px-3 py-1.5 border border-accent-gold/20 rounded-full mb-4 inline-block">
            SCHOLASTIC MATCHMAKER NETWORK
          </span>
          <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight mb-4 mt-2 text-white animate-fade-in">
            Colleague & Editorial Matches
          </h1>
          <p className="font-serif-accent text-base sm:text-lg italic text-white/85 max-w-2xl mx-auto leading-relaxed font-light">
            Connecting PhD candidates and elite scholars with world-class editors, reviewers, and scientific leaders from top-tier academic boards.
          </p>
        </div>
      </section>

      {/* Advanced search & filter panel: compact, luxurious, structured */}
      <section className="py-6 bg-white border-b border-divider-gold/60 shadow-xs z-20 relative sticky top-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-5 items-stretch md:items-center justify-between">
          
          {/* Main search and selector */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full md:w-auto flex-grow max-w-2xl">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-accent-gold absolute left-3 w-4 justify-center top-3.5" />
              <input 
                type="text" 
                placeholder="Search index by scholar name, university, country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-neutral-warm/50 border border-divider-gold/60 focus:border-accent-gold outline-none text-xs transition-colors rounded-sm"
              />
            </div>
            
            {/* Segmented Category Buttons */}
            <div className="flex items-center gap-1 border border-divider-gold/50 p-1 bg-neutral-warm/40 rounded-sm shrink-0">
              {(['all', 'mentor', 'mentee'] as const).map((roleOption) => {
                const count = roleOption === 'all' 
                  ? mentors.length 
                  : mentors.filter(m => m.role === roleOption).length;
                return (
                  <button
                    key={roleOption}
                    onClick={() => setSelectedRole(roleOption)}
                    className={`px-3 py-1.5 text-[9px] uppercase font-mono tracking-widest font-bold transition-all rounded-xs ${
                      selectedRole === roleOption
                        ? 'bg-primary-navy text-accent-gold'
                        : 'text-primary-navy/70 hover:text-primary-navy hover:bg-neutral-warm/60'
                    }`}
                  >
                    {roleOption === 'all' ? `All (${count})` : roleOption === 'mentor' ? `Advisors` : `Scholars`}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px md:h-8 w-full md:w-px bg-divider-gold/80" />

          {/* Faceted Tag Selector with count indicators */}
          <div className="flex items-center gap-3 overflow-x-auto select-none no-scrollbar py-1">
            <span className="text-[9px] font-mono tracking-widest uppercase text-muted-gray whitespace-nowrap shrink-0">
              Disciplinary Focus:
            </span>
            <div className="flex gap-1.5">
              {allFields.map(field => {
                const count = field === 'All' ? filteredMentors.length : fieldCounts[field] || 0;
                const isSelected = selectedField === field;
                return (
                  <button
                    key={field}
                    onClick={() => setSelectedField(field)}
                    className={`px-3 py-1.5 border text-[9px] font-mono uppercase tracking-wider whitespace-nowrap transition-all rounded-full ${
                      isSelected 
                        ? 'bg-primary-navy border-primary-navy text-accent-gold shadow-sm' 
                        : 'border-divider-gold bg-transparent text-primary-navy/80 hover:bg-neutral-warm hover:border-divider-gold/80'
                    }`}
                  >
                    {field} {field !== 'All' && <span className={`ml-1 px-1 rounded-sm text-[8px] font-bold ${isSelected ? 'bg-accent-gold/20 text-accent-gold' : 'bg-neutral-warm border border-divider-gold/50 text-muted-gray'}`}>{count}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Grid listing: 1000x better with Framer Motion, micro interactions, polished layout */}
      <FadeUpSection className="py-12 max-w-6xl mx-auto px-6">
        {filteredMentors.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredMentors.map((mentor, index) => (
              <motion.div 
                layout
                key={mentor.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <MentorCard 
                  mentor={mentor} 
                  onClick={() => handleOpenMentor(mentor)} 
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-[#FAFAF7] border border-dashed border-divider-gold/65">
            <Filter className="w-8 h-8 text-accent-gold/60 mx-auto mb-4" />
            <h3 className="font-serif-display text-lg text-primary-navy font-bold">No academic matches found</h3>
            <p className="text-xs text-muted-gray mt-1 max-w-sm mx-auto font-light">
              Expand your searches or select "All Fields" to match advisors with similar publishing portfolios.
            </p>
          </div>
        )}
      </FadeUpSection>

      {/* Operational Framework: Mentorship Procedure & Outcomes Section */}
      <section className="py-16 bg-[#FAF9F5] border-t border-divider-gold/60 premium-noise">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-xs font-mono tracking-widest text-[#6B7280] uppercase mb-2">Operational Framework</h3>
            <h2 className="font-serif-display text-3xl sm:text-4.5xl text-primary-navy font-bold leading-tight">
              Our Matchmaker Procedure
            </h2>
            <p className="text-xs text-muted-gray max-w-xl mx-auto leading-relaxed mt-2 font-light">
              We connect world-class publishers, senior chairs, and promising young scholars through a structured, 8-step quality advisory iteration.
            </p>
          </div>

          {/* 8 Step Procedure Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { num: "01", title: "Identify Prospective matches", desc: "Evaluate scholarly abstracts and match research alignments perfectly." },
              { num: "02", title: "Establish Channels", desc: "Setup secure, live discussion forums and formal advisory bounds under English NDAs." },
              { num: "03", title: "Collaborative Projects", desc: "Launch collaborative joint-research initiatives targeting leading IEEE/Springer proceedings." },
              { num: "04", title: "Offer Educational Resources", desc: "Provide full access to LaTeX typesetting rules, grammar manuals, and Q1 review files." },
              { num: "05", title: "Host Events & Boot Camps", desc: "Invite matched pairs to localized regional seminars and fast-tracked publication workshops." },
              { num: "06", title: "Scholarships & Funding", desc: "Grant reduced registration tariffs and special travel stipends for developing economies." },
              { num: "07", title: "Feedback & Assessment", desc: "Conduct strict peer auditing rounds, providing metric review density assessments." },
              { num: "08", title: "Strengthen Connections", desc: "Consolidate persistent alumni relations, solidifying worldwide peer networks." }
            ].map((step, idx) => (
              <div key={idx} className="bg-white border border-divider-gold/30 p-6 flex flex-col justify-between hover:border-accent-gold transition-colors duration-300 rounded-xs">
                <span className="font-mono text-xs font-bold text-accent-gold">{step.num} // PROCESS_STAGE</span>
                <div className="mt-4">
                  <h4 className="font-serif-display text-sm font-bold text-primary-navy mb-1.5 uppercase tracking-wide">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-muted-gray leading-normal font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Output Goals Double Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-divider-gold/30 pt-16">
            <div className="bg-white border border-divider-gold/40 p-10 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent-gold/5 flex items-center justify-center font-mono text-[9px] font-bold text-accent-gold uppercase tracking-wider">
                Advisors
              </div>
              <h3 className="font-mono text-xs text-accent-gold uppercase tracking-widest mb-2 font-bold">FOR MENTORS // CO-CHAIRS</h3>
              <h4 className="font-serif-display text-2xl font-bold text-primary-navy mb-4">Elite Output Goals</h4>
              <ul className="flex flex-col gap-3 text-xs text-muted-gray font-light">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                  <span>Deep intellectual satisfaction by shaping international research frontiers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                  <span>Enhanced academic leadership, with prominent listing in proceedings.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                  <span>Expanded global scholarly network matching promising co-authors.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                  <span>Exclusive invitations to chair panels at Rome, Genoa, and Wolverhampton summits.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-divider-gold/40 p-10 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent-gold/5 flex items-center justify-center font-mono text-[9px] font-bold text-accent-gold uppercase tracking-wider">
                Scholars
              </div>
              <h3 className="font-mono text-xs text-accent-gold uppercase tracking-widest mb-2 font-bold">FOR MENTEES // DELEGATES</h3>
              <h4 className="font-serif-display text-2xl font-bold text-primary-navy mb-4">Scholastic Output Goals</h4>
              <ul className="flex flex-col gap-3 text-xs text-muted-gray font-light">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                  <span>Technical capability enhancement across advanced modeling methodologies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                  <span>Direct, accelerated path to high-impact Q1 journal index linking.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                  <span>Uncensored, detailed thesis review feedback regarding code execution.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                  <span>Lifetime inclusion in the prestigious global RiTECHS alumni registry.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------
          Advisors slide-over panel
         ---------------------------------------- */}
      <AnimatePresence>
        {selectedMentor && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Blurry Backdrop Filter with spring transitions */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary-navy/60 backdrop-blur-sm cursor-pointer" 
              onClick={() => setSelectedMentor(null)} 
            />
            
            {/* Elegant drawer container */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="bg-white w-full max-w-xl h-full shadow-2xl relative z-10 flex flex-col border-l border-accent-gold/30 overflow-y-auto"
            >
              {/* Header top drawer */}
              <div className="bg-primary-navy px-8 py-6 text-white border-b border-accent-gold/20 flex justify-between items-center premium-noise shrink-0">
                <div>
                  <span className="text-[8px] font-mono text-accent-gold uppercase tracking-widest font-bold">EVALUATION BOARD ADVISOR</span>
                  <h2 className="font-serif-display text-2xl font-bold mt-1 text-white">{selectedMentor.name}</h2>
                </div>
                <button 
                  onClick={() => setSelectedMentor(null)}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                  id="drawer-close"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Profile Drawer Body */}
              <div className="p-8 flex flex-col gap-6 flex-grow">
                
                {/* Advisor card spotlight in drawer */}
                <div className="flex gap-5 items-start bg-neutral-warm border border-divider-gold/50 p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-accent-gold/5 rounded-bl-full pointer-events-none" />
                  <div className="w-20 h-20 rounded-xs overflow-hidden border border-divider-gold/60 shrink-0 shadow-sm">
                    <img 
                      src={selectedMentor.image} 
                      alt={selectedMentor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left flex-grow min-w-0">
                    <span className="text-[8px] font-mono tracking-widest text-[#C9A961] uppercase font-bold px-1.5 py-0.5 bg-[#C9A961]/10 rounded-sm inline-block mb-1.5">
                      {selectedMentor.role || 'mentor'}
                    </span>
                    <h4 className="font-serif-display text-base font-bold text-primary-navy leading-tight mb-0.5 truncate">
                      {selectedMentor.university}
                    </h4>
                    <p className="text-[10px] text-muted-gray uppercase tracking-widest font-mono font-medium">{selectedMentor.country}</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 font-mono text-[10px] text-accent-gold mt-2 font-bold select-text">
                      <span className="flex items-center gap-1">★ {selectedMentor.rating} RATING INDEX</span>
                      <span className="hidden sm:inline text-white/20">|</span>
                      <a href={`mailto:${selectedMentor.email}`} className="text-[#05142E] hover:underline flex items-center gap-1 font-sans text-xs font-normal lowercase normal-case leading-none mt-1 sm:mt-0">
                        <Mail className="w-3.5 h-3.5 text-accent-gold" /> {selectedMentor.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Biography block */}
                <div className="text-left">
                  <h4 className="font-serif-display text-xs font-bold tracking-widest uppercase text-primary-navy border-b border-divider-gold/50 pb-1.5 mb-2.5">
                    Affiliation & Biography
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
                    {selectedMentor.bio}
                  </p>
                </div>

                {/* Fields representation */}
                <div className="text-left">
                  <h4 className="font-serif-display text-xs font-bold tracking-widest uppercase text-primary-navy border-b border-divider-gold/50 pb-1.5 mb-2.5">
                    Peer Directives
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMentor.fields.map((f, i) => (
                      <span key={i} className="text-[9px] font-mono tracking-wide uppercase bg-[#E6E6DF]/30 border border-divider-gold px-2 py-0.5 text-primary-navy font-semibold">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Publication list */}
                <div className="text-left">
                  <h4 className="font-serif-display text-xs font-bold tracking-widest uppercase text-primary-navy border-b border-divider-gold/50 pb-1.5 mb-2.5 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-accent-gold" /> Critical Publications Indexed
                  </h4>
                  <div className="flex flex-col gap-2 font-mono text-[9px] text-[#2C3E50] leading-relaxed">
                    {selectedMentor.publications.map((p, i) => (
                      <div key={i} className="flex gap-2.5 items-start bg-neutral-warm/80 p-2.5 border-l-2 border-accent-gold border border-divider-gold/30">
                        <Award className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Elegant Interactive booking module */}
                <div className="border border-accent-gold/20 bg-[#C9A961]/5 p-5 shrink-0 select-none text-left rounded-sm mt-2">
                  <h3 className="font-serif-display text-sm text-primary-navy font-bold mb-3 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-accent-gold" /> Propose Editorial Collaboration Slot
                  </h3>

                  {!bookingSuccess ? (
                    <form onSubmit={handleBookConsultation} className="flex flex-col gap-4 text-xs font-sans">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="font-mono text-[9px] uppercase tracking-wider text-muted-gray font-bold">Proposed Date</label>
                          <input 
                            type="date" 
                            required 
                            min="2026-06-15"
                            value={consultDate}
                            onChange={(e) => setConsultDate(e.target.value)}
                            className="border border-divider-gold/70 bg-white p-2 text-xs focus:border-accent-gold outline-none"
                          />
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <label className="font-mono text-[9px] uppercase tracking-wider text-muted-gray font-bold">Available Slots (CET)</label>
                          <div className="grid grid-cols-1 gap-1">
                            {timeSlots.map(slot => (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setConsultTimeSlot(slot)}
                                className={`text-left p-1.5 border text-[9px] font-mono tracking-tight transition-all uppercase font-medium ${
                                  consultTimeSlot === slot 
                                    ? 'bg-primary-navy border-primary-navy text-accent-gold' 
                                    : 'border-divider-gold bg-white text-muted-gray hover:bg-neutral-warm'
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="font-mono text-[9px] uppercase tracking-wider text-muted-gray font-bold">Manuscript Draft Abstract or Scope Focus</label>
                        <textarea 
                          rows={2.5} 
                          placeholder="Detail your draft index details, LaTeX specifications, or targeted publishing venue..."
                          required 
                          value={consultTopic}
                          onChange={(e) => setConsultTopic(e.target.value)}
                          className="border border-divider-gold/70 bg-white p-2 text-xs focus:border-accent-gold outline-none resize-none font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={bookingLoading || !consultTimeSlot || !consultDate}
                        className="w-full bg-primary-navy hover:bg-accent-gold text-white hover:text-primary-navy text-[9px] py-3 font-mono font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none"
                      >
                        {bookingLoading ? (
                          <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        ) : (
                          <span>Propose Advisory Meeting</span>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center p-4 bg-white border border-accent-gold/20 animate-fade-in flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20">
                        <Clock className="w-5 h-5 animate-pulse text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="font-serif-display text-sm font-bold text-primary-navy">Meeting Proposed Successfully</h4>
                        <p className="text-[10px] text-muted-gray font-light mt-0.5 max-w-[280px] leading-relaxed mx-auto">
                          Your advisory session slot proposal has been logged inside our index registry. {selectedMentor.name} will evaluate your abstract.
                        </p>
                      </div>
                      <div className="bg-neutral-warm border border-divider-gold/30 p-2.5 font-mono text-[8px] w-full text-left mt-2">
                        <div><span className="text-muted-gray uppercase">Advisor:</span> {selectedMentor.name}</div>
                        <div><span className="text-muted-gray uppercase">Proposed Date:</span> {consultDate}</div>
                        <div><span className="text-muted-gray uppercase">Proposed Term:</span> {consultTimeSlot}</div>
                        <div><span className="text-muted-gray uppercase">Topic Abstract:</span> {consultTopic}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
