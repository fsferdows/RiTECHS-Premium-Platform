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
    <div id="mentors-matchmaking-view" className="pt-20 animate-fade-in-up text-white bg-maroon-dark min-h-screen">
      {/* Brand Header */}
      <section className="relative bg-gradient-to-b from-[#2C0509] to-[#3D0C11] text-white py-12 lg:py-16 px-6 border-b border-accent-gold/25 premium-noise overflow-hidden">
        {/* Subtle geometric lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-10 animate-pulse">
          <div className="absolute top-10 left-10 w-96 h-96 rounded-full border border-[#C9A961]/20" />
          <div className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full border-2 border-dashed border-[#C9A961]/10" />
        </div>

        <div className="max-w-6xl mx-auto relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          {/* Left Column: Clear premium scholastic headings */}
          <div className="lg:col-span-7 flex flex-col justify-center text-white">
            <span className="text-[10px] font-mono tracking-widest text-[#C9A961] uppercase font-bold bg-[#C9A961]/15 px-3 py-1.5 border border-[#C9A961]/30 rounded-full mb-4 inline-block self-start">
              SCHOLASTIC MATCHMAKER NETWORK
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 mt-2 text-white leading-tight animate-fade-in">
              Colleague & Editorial Matches
            </h1>
            <p className="font-serif-accent text-sm sm:text-base lg:text-lg italic text-neutral-200 max-w-2xl leading-relaxed font-light">
              Connecting PhD candidates and elite scholars with world-class editors, reviewers, and scientific leaders from top-tier academic boards.
            </p>
          </div>

          {/* Right Column: Clear, unobstructed PNG background/banner image */}
          <div className="lg:col-span-5 w-full h-48 sm:h-64 lg:h-80 overflow-hidden relative border border-accent-gold/30 rounded-xs shadow-xl group bg-maroon-dark">
            <img 
              src="/banner 4.png" 
              alt="Scholastic Library Backdrop" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-80"
              onError={(e) => {
                const el = e.currentTarget;
                const bkp = "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1600";
                if (el.src !== bkp) {
                  el.src = bkp;
                } else {
                  el.onerror = null;
                  el.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='100%25' height='100%25' fill='%23fff'/%3E%3C/svg%3E";
                }
              }}
            />
            {/* Subtle elegant gold overlay/plaque line */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-maroon-dark/90 border border-accent-gold/45 text-accent-gold font-mono text-[8px] uppercase tracking-widest font-semibold rounded-xs shadow-xs">
              ADVISORY HUB
            </div>
          </div>
        </div>
      </section>

      {/* Advanced search & filter panel: compact, luxurious, structured */}
      <section className="py-6 bg-maroon-dark/95 border-b border-accent-gold/15 shadow-xl z-20 relative sticky top-16 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-5 items-stretch md:items-center justify-between">
          
          {/* Main search and selector */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full md:w-auto flex-grow max-w-2xl">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-accent-gold absolute left-3 top-3.5" />
              <input 
                type="text" 
                placeholder="Search index by scholar name, university, country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-primary-maroon/60 border border-accent-gold/25 focus:border-accent-gold outline-none text-xs text-white placeholder-neutral-400 transition-colors rounded-sm"
              />
            </div>
            
            {/* Segmented Category Buttons */}
            <div className="flex items-center gap-1 border border-accent-gold/20 p-1 bg-primary-maroon/40 rounded-sm shrink-0">
              {(['all', 'mentor', 'mentee'] as const).map((roleOption) => {
                const count = roleOption === 'all' 
                  ? mentors.length 
                  : mentors.filter(m => m.role === roleOption).length;
                return (
                  <button
                    key={roleOption}
                    onClick={() => setSelectedRole(roleOption)}
                    className={`px-3 py-1.5 text-[9px] uppercase font-mono tracking-widest font-bold transition-all rounded-xs cursor-pointer ${
                      selectedRole === roleOption
                        ? 'bg-accent-gold text-primary-maroon shadow-md'
                        : 'text-neutral-300 hover:text-white hover:bg-primary-maroon/60'
                    }`}
                  >
                    {roleOption === 'all' ? `All (${count})` : roleOption === 'mentor' ? `Advisors` : `Scholars`}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px md:h-8 w-full md:w-px bg-accent-gold/15" />

          {/* Faceted Tag Selector with count indicators */}
          <div className="flex items-center gap-3 overflow-x-auto select-none no-scrollbar py-1">
            <span className="text-[9px] font-mono tracking-widest uppercase text-accent-gold/80 whitespace-nowrap shrink-0">
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
                    className={`px-3 py-1.5 border text-[9px] font-mono uppercase tracking-wider whitespace-nowrap transition-all rounded-full cursor-pointer ${
                      isSelected 
                        ? 'bg-accent-gold border-accent-gold text-primary-maroon font-bold shadow-md' 
                        : 'border-accent-gold/25 bg-transparent text-white/80 hover:bg-primary-maroon hover:border-accent-gold/45'
                    }`}
                  >
                    {field} {field !== 'All' && <span className={`ml-1 px-1 rounded-sm text-[8px] font-bold ${isSelected ? 'bg-primary-maroon/20 text-primary-maroon' : 'bg-primary-maroon/60 border border-accent-gold/15 text-accent-gold'}`}>{count}</span>}
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
          <div className="text-center py-20 bg-primary-maroon/40 border border-dashed border-accent-gold/20 rounded-sm">
            <Filter className="w-8 h-8 text-accent-gold/60 mx-auto mb-4" />
            <h3 className="font-serif-display text-lg text-white font-bold">No academic matches found</h3>
            <p className="text-xs text-neutral-300 mt-1 max-w-sm mx-auto font-light">
              Expand your searches or select "All Fields" to match advisors with similar publishing portfolios.
            </p>
          </div>
        )}
      </FadeUpSection>

      {/* Operational Framework: Mentorship Procedure & Outcomes Section */}
      <section className="py-16 bg-maroon-dark border-t border-accent-gold/15 premium-noise text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-2">Operational Framework</h3>
            <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-white font-bold leading-tight">
              Our Matchmaker Procedure
            </h2>
            <p className="text-xs text-neutral-300 max-w-xl mx-auto leading-relaxed mt-2 font-light">
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
              <div key={idx} className="bg-primary-maroon border border-accent-gold/15 p-5 flex flex-col justify-between hover:border-accent-gold/40 transition-colors duration-300 rounded-xs">
                <span className="font-mono text-xs font-bold text-accent-gold">{step.num} // PROCESS_STAGE</span>
                <div className="mt-4">
                  <h4 className="font-serif-display text-sm font-bold text-white mb-1.5 uppercase tracking-wide">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-neutral-300 leading-normal font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Output Goals Double Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-accent-gold/10 pt-16">
            <div className="bg-primary-maroon border border-accent-gold/15 p-5 md:p-6 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent-gold/5 flex items-center justify-center font-mono text-[9px] font-bold text-accent-gold uppercase tracking-wider">
                Advisors
              </div>
              <h3 className="font-mono text-xs text-accent-gold uppercase tracking-widest mb-2 font-bold">FOR MENTORS // CO-CHAIRS</h3>
              <h4 className="font-serif-display text-2xl font-bold text-white mb-4">Elite Output Goals</h4>
              <ul className="flex flex-col gap-3 text-xs text-neutral-300 font-light">
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

            <div className="bg-primary-maroon border border-accent-gold/15 p-5 md:p-6 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent-gold/5 flex items-center justify-center font-mono text-[9px] font-bold text-accent-gold uppercase tracking-wider">
                Scholars
              </div>
              <h3 className="font-mono text-xs text-accent-gold uppercase tracking-widest mb-2 font-bold">FOR MENTEES // DELEGATES</h3>
              <h4 className="font-serif-display text-2xl font-bold text-white mb-4">Scholastic Output Goals</h4>
              <ul className="flex flex-col gap-3 text-xs text-neutral-300 font-light">
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
              className="bg-maroon-dark w-full max-w-xl h-full shadow-2xl relative z-10 flex flex-col border-l border-accent-gold/30 overflow-y-auto text-white"
            >
              {/* Header top drawer */}
              <div className="bg-white px-8 py-6 text-black border-b border-accent-gold/20 flex justify-between items-center premium-noise shrink-0">
                <div>
                  <span className="text-[8px] font-mono text-primary-maroon uppercase tracking-widest font-bold">EVALUATION BOARD ADVISOR</span>
                  <h2 className="font-serif-display text-2xl font-bold mt-1 text-black">{selectedMentor.name}</h2>
                </div>
                <button 
                  onClick={() => setSelectedMentor(null)}
                  className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer"
                  id="drawer-close"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>

              {/* Profile Drawer Body */}
              <div className="p-8 flex flex-col gap-6 flex-grow bg-maroon-dark">
                
                {/* Advisor card spotlight in drawer */}
                <div className="flex gap-5 items-start bg-primary-maroon border border-accent-gold/20 p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-accent-gold/5 rounded-bl-full pointer-events-none" />
                  <div className="w-20 h-20 rounded-xs overflow-hidden border border-accent-gold/25 shrink-0 shadow-sm">
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
                    <h4 className="font-serif-display text-base font-bold text-white leading-tight mb-0.5 truncate">
                      {selectedMentor.university}
                    </h4>
                    <p className="text-[10px] text-neutral-300 uppercase tracking-widest font-mono font-medium">{selectedMentor.country}</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 font-mono text-[10px] text-accent-gold mt-2 font-bold select-text">
                      <span className="flex items-center gap-1">★ {selectedMentor.rating} RATING INDEX</span>
                      <span className="hidden sm:inline text-white/20">|</span>
                      <a href={`mailto:${selectedMentor.email}`} className="text-white hover:underline flex items-center gap-1 font-sans text-xs font-normal normal-case leading-none mt-1 sm:mt-0">
                        <Mail className="w-3.5 h-3.5 text-accent-gold" /> {selectedMentor.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Biography block */}
                <div className="text-left">
                  <h4 className="font-serif-display text-xs font-bold tracking-widest uppercase text-accent-gold border-b border-accent-gold/15 pb-1.5 mb-2.5">
                    Affiliation & Biography
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light font-sans">
                    {selectedMentor.bio}
                  </p>
                </div>

                {/* Fields representation */}
                <div className="text-left">
                  <h4 className="font-serif-display text-xs font-bold tracking-widest uppercase text-accent-gold border-b border-accent-gold/15 pb-1.5 mb-2.5">
                    Peer Directives
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMentor.fields.map((f, i) => (
                      <span key={i} className="text-[9px] font-mono tracking-wide uppercase bg-primary-maroon border border-accent-gold/20 px-2 py-0.5 text-accent-gold font-semibold">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Publication list */}
                <div className="text-left">
                  <h4 className="font-serif-display text-xs font-bold tracking-widest uppercase text-accent-gold border-b border-accent-gold/15 pb-1.5 mb-2.5 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-accent-gold" /> Critical Publications Indexed
                  </h4>
                  <div className="flex flex-col gap-2 font-mono text-[9px] text-neutral-200 leading-relaxed">
                    {selectedMentor.publications.map((p, i) => (
                      <div key={i} className="flex gap-2.5 items-start bg-primary-maroon p-2.5 border-l-2 border-accent-gold border border-accent-gold/15">
                        <Award className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Elegant Interactive booking module */}
                <div className="border border-accent-gold/20 bg-primary-maroon p-5 shrink-0 select-none text-left rounded-sm mt-2">
                  <h3 className="font-serif-display text-sm text-white font-bold mb-3 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-accent-gold" /> Propose Editorial Collaboration Slot
                  </h3>

                  {!bookingSuccess ? (
                    <form onSubmit={handleBookConsultation} className="flex flex-col gap-4 text-xs font-sans">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="font-mono text-[9px] uppercase tracking-wider text-accent-gold/80 font-bold">Proposed Date</label>
                          <input 
                            type="date" 
                            required 
                            min="2026-06-15"
                            value={consultDate}
                            onChange={(e) => setConsultDate(e.target.value)}
                            className="border border-accent-gold/20 bg-maroon-dark text-white p-2 text-xs focus:border-accent-gold outline-none w-full"
                          />
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <label className="font-mono text-[9px] uppercase tracking-wider text-accent-gold/80 font-bold">Available Slots (CET)</label>
                          <div className="grid grid-cols-1 gap-1">
                            {timeSlots.map(slot => (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setConsultTimeSlot(slot)}
                                className={`text-left p-1.5 border text-[9px] font-mono tracking-tight transition-all uppercase font-medium cursor-pointer ${
                                  consultTimeSlot === slot 
                                    ? 'bg-accent-gold border-accent-gold text-primary-maroon font-bold' 
                                    : 'border-accent-gold/20 bg-maroon-dark text-neutral-300 hover:bg-primary-maroon'
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="font-mono text-[9px] uppercase tracking-wider text-accent-gold/80 font-bold">Manuscript Draft Abstract or Scope Focus</label>
                        <textarea 
                          rows={2.5} 
                          placeholder="Detail your draft index details, LaTeX specifications, or targeted publishing venue..."
                          required 
                          value={consultTopic}
                          onChange={(e) => setConsultTopic(e.target.value)}
                          className="border border-accent-gold/20 bg-maroon-dark text-white p-2 text-xs focus:border-accent-gold outline-none resize-none font-sans w-full"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={bookingLoading || !consultTimeSlot || !consultDate}
                        className="w-full bg-accent-gold hover:bg-[#B3934B] text-primary-maroon text-[9px] py-3 font-mono font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      >
                        {bookingLoading ? (
                          <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        ) : (
                          <span>Propose Advisory Meeting</span>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center p-4 bg-maroon-dark border border-accent-gold/20 animate-fade-in flex flex-col items-center gap-2 text-white">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20">
                        <Clock className="w-5 h-5 animate-pulse text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="font-serif-display text-sm font-bold text-white">Meeting Proposed Successfully</h4>
                        <p className="text-[10px] text-neutral-300 font-light mt-0.5 max-w-[280px] leading-relaxed mx-auto">
                          Your advisory session slot proposal has been logged inside our index registry. {selectedMentor.name} will evaluate your abstract.
                        </p>
                      </div>
                      <div className="bg-primary-maroon border border-accent-gold/20 p-2.5 font-mono text-[8px] w-full text-left mt-2 text-neutral-200">
                        <div><span className="text-accent-gold uppercase">Advisor:</span> {selectedMentor.name}</div>
                        <div><span className="text-accent-gold uppercase">Proposed Date:</span> {consultDate}</div>
                        <div><span className="text-accent-gold uppercase">Proposed Term:</span> {consultTimeSlot}</div>
                        <div><span className="text-accent-gold uppercase">Topic Abstract:</span> {consultTopic}</div>
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
