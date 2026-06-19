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

  const handleCloseMentor = () => {
    setSelectedMentor(null);
    // Suppress query parameters from page hash smoothly
    const hash = window.location.hash;
    if (hash.includes('mentorId=')) {
      window.location.hash = '#/mentors';
    }
  };

  useEffect(() => {
    const handleCheckHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/mentorId=(\d+)/);
      if (match) {
        const id = parseInt(match[1]);
        const found = mentors.find(m => m.id === id);
        if (found) {
          handleOpenMentor(found);
        }
      }
    };

    handleCheckHash();
    window.addEventListener('hashchange', handleCheckHash);
    return () => window.removeEventListener('hashchange', handleCheckHash);
  }, [mentors]);

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
          <div className="text-center py-12 md:py-20 bg-primary-maroon/40 border border-dashed border-accent-gold/20 rounded-sm">
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
          Advisors slide-over panel -> Centered compact elite modal
         ---------------------------------------- */}
      <AnimatePresence>
        {selectedMentor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            {/* Blurry Backdrop Filter with spring transitions */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary-navy/80 backdrop-blur-md cursor-pointer" 
              onClick={handleCloseMentor} 
            />
            
            {/* Compact centered modal / board container */}
            <motion.div 
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-maroon-dark w-full max-w-2xl rounded-sm shadow-2xl relative z-10 flex flex-col border border-accent-gold/40 text-white overflow-hidden max-h-[92vh]"
            >
              {/* Top Bar Header */}
              <div className="bg-white px-5 py-3.5 text-black border-b border-accent-gold/25 flex justify-between items-center premium-noise shrink-0">
                <div className="text-left">
                  <span className="text-[7.5px] font-mono font-bold text-primary-maroon uppercase tracking-widest bg-primary-maroon/10 px-2 py-0.5 border border-primary-maroon/20">
                    ID: EM-{String(selectedMentor.id).padStart(3, '0')} // EVALUATION BOARD MEMBER
                  </span>
                  <h2 className="font-serif-display text-lg sm:text-xl font-bold mt-1 text-black leading-tight">
                    {selectedMentor.name}
                  </h2>
                </div>
                <button 
                  onClick={handleCloseMentor}
                  className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer text-black"
                  id="drawer-close"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable multi-grid content area (designed with premium spatial balance) */}
              <div className="p-4 sm:p-5 overflow-y-auto flex-grow bg-maroon-dark space-y-4">
                
                {/* 2-Column Responsive Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                  
                  {/* Left Column (Metadata & Details card) */}
                  <div className="md:col-span-5 flex flex-col gap-4 text-left">
                    {/* Compact Profile showcase card */}
                    <div className="bg-primary-maroon border border-accent-gold/20 p-3 relative overflow-hidden flex flex-row items-center gap-3">
                      <div className="absolute top-0 right-0 w-12 h-12 bg-accent-gold/5 rounded-bl-full pointer-events-none" />
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xs overflow-hidden border border-accent-gold/25 shrink-0 shadow-sm">
                        <img 
                          src={selectedMentor.image} 
                          alt={selectedMentor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-grow">
                        <span className="text-[7px] font-mono tracking-widest text-[#C9A961] uppercase font-bold px-1.5 py-0.5 bg-[#C9A961]/10 rounded-sm inline-block mb-1">
                          {selectedMentor.role || 'mentor'}
                        </span>
                        <h4 className="font-serif-display text-xs font-bold text-white leading-tight mb-0.5 truncate" title={selectedMentor.university}>
                          {selectedMentor.university}
                        </h4>
                        <p className="text-[8.5px] text-neutral-300 uppercase tracking-widest font-mono font-bold">{selectedMentor.country}</p>
                        
                        <div className="flex items-center gap-1.5 font-mono text-[7.5px] text-accent-gold mt-1 font-bold">
                          <Star className="w-2.5 h-2.5 text-accent-gold fill-accent-gold shrink-0" />
                          <span>{selectedMentor.rating} RATING INDEX</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Access Actions Contact Group */}
                    <div className="bg-maroon-light/30 border border-accent-gold/15 p-2.5 rounded-xs flex flex-col gap-1.5">
                      <span className="text-[7.5px] font-mono text-accent-gold/70 uppercase tracking-wider font-bold">Inquire Immediately</span>
                      <a 
                        href={`mailto:${selectedMentor.email}`} 
                        className="bg-accent-gold hover:bg-[#B3934B] text-primary-maroon font-mono text-[7.5px] tracking-widest uppercase font-bold text-center py-1.5 px-2.5 transition-colors flex items-center justify-center gap-1 w-full"
                      >
                        <Mail className="w-3 h-3 text-primary-maroon" /> Send Email Direct
                      </a>
                    </div>

                    {/* Fields representation */}
                    <div className="space-y-1">
                      <h4 className="font-serif-display text-[9px] font-bold tracking-widest uppercase text-accent-gold border-b border-accent-gold/15 pb-1">
                        Peer Directives & Scope
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedMentor.fields.map((f, i) => (
                          <span key={i} className="text-[7px] font-mono tracking-wider uppercase bg-primary-maroon border border-accent-gold/15 px-1.5 py-0.5 text-accent-gold font-bold">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Bio, Publications & Instant Propose form) */}
                  <div className="md:col-span-7 flex flex-col gap-4 text-left">
                    
                    {/* Biography block (More compact, styled neatly) */}
                    <div>
                      <h4 className="font-serif-display text-[9px] font-bold tracking-widest uppercase text-accent-gold border-b border-accent-gold/15 pb-1 mb-1">
                        Academic Biography
                      </h4>
                      <p className="text-[9.5px] text-neutral-200 leading-relaxed font-light font-sans max-h-20 overflow-y-auto pr-1">
                        {selectedMentor.bio}
                      </p>
                    </div>

                    {/* Publication list (Perfect scrollable layout to maximize area) */}
                    <div>
                      <h4 className="font-serif-display text-[9px] font-bold tracking-widest uppercase text-accent-gold border-b border-accent-gold/15 pb-1 mb-1.5 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-accent-gold" /> Indexed Publications
                      </h4>
                      <div className="flex flex-col gap-1 font-mono text-[8px] text-neutral-200 leading-tight max-h-[70px] overflow-y-auto pr-1">
                        {selectedMentor.publications.map((p, i) => (
                          <div key={i} className="flex gap-1.5 items-start bg-primary-maroon p-1 border-l border-accent-gold border border-accent-gold/15">
                            <Award className="w-2.5 h-2.5 text-accent-gold shrink-0 mt-0.5" />
                            <span className="truncate" title={p}>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Elegant Interactive booking module (Extremely Compact) */}
                    <div className="border border-accent-gold/20 bg-primary-maroon p-3 rounded-sm select-none">
                      <h3 className="font-serif-display text-[10px] text-white font-bold mb-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-accent-gold" /> Book Advisory Session
                      </h3>

                      {!bookingSuccess ? (
                        <form onSubmit={handleBookConsultation} className="flex flex-col gap-2 text-xs font-sans">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="flex flex-col gap-1">
                              <label className="font-mono text-[6.5px] uppercase tracking-wider text-accent-gold/80 font-bold">Proposed Date</label>
                              <input 
                                type="date" 
                                required 
                                min="2026-06-15"
                                value={consultDate}
                                onChange={(e) => setConsultDate(e.target.value)}
                                className="border border-accent-gold/20 bg-maroon-dark text-white p-1 text-[9px] focus:border-accent-gold outline-none w-full font-mono"
                              />
                            </div>
                            
                            <div className="flex flex-col gap-0.5">
                              <label className="font-mono text-[6.5px] uppercase tracking-wider text-accent-gold/80 font-bold">CET Slots</label>
                              <div className="grid grid-cols-2 gap-0.5">
                                {timeSlots.map(slot => {
                                  // Shorten timezone label for extreme compactness
                                  const labelStr = slot.replace(" (CET)", "");
                                  return (
                                    <button
                                      key={slot}
                                      type="button"
                                      onClick={() => setConsultTimeSlot(slot)}
                                      className={`text-center py-0.5 px-1 border text-[7px] font-mono tracking-tighter uppercase font-medium scroll-smooth select-none cursor-pointer ${
                                        consultTimeSlot === slot 
                                          ? 'bg-accent-gold border-accent-gold text-primary-maroon font-bold' 
                                          : 'border-accent-gold/15 bg-maroon-dark text-neutral-300 hover:bg-primary-maroon'
                                      }`}
                                    >
                                      {labelStr}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-0.5">
                            <label className="font-mono text-[6.5px] uppercase tracking-wider text-accent-gold/80 font-bold">Manuscript Draft Focus</label>
                            <textarea 
                              rows={1} 
                              placeholder="Detail your draft latex info or scope focus..."
                              required 
                              value={consultTopic}
                              onChange={(e) => setConsultTopic(e.target.value)}
                              className="border border-accent-gold/20 bg-maroon-dark text-white p-1 text-[9px] focus:border-accent-gold outline-none resize-none font-sans w-full"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={bookingLoading || !consultTimeSlot || !consultDate}
                            className="w-full bg-accent-gold hover:bg-[#B3934B] text-primary-maroon text-[7.5px] py-1.5 font-mono font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-35 disabled:pointer-events-none cursor-pointer"
                          >
                            {bookingLoading ? (
                              <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                            ) : (
                              <span>PROPOSE ADVISORY MATCH</span>
                            )}
                          </button>
                        </form>
                      ) : (
                        <div className="text-center p-2 bg-maroon-dark border border-accent-gold/20 animate-fade-in flex flex-col items-center gap-1 text-white">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20">
                            <Clock className="w-3.5 h-3.5 text-emerald-500" />
                          </div>
                          <div>
                            <h4 className="font-serif-display text-[10px] font-bold text-white">Proposal Logged</h4>
                            <p className="text-[8px] text-neutral-300 font-light mt-0.5 max-w-[210px] leading-tight mx-auto">
                              Session slot proposed successfully. {selectedMentor.name} will audit your abstract.
                            </p>
                          </div>
                          <div className="bg-primary-maroon border border-accent-gold/20 p-1.5 font-mono text-[7px] w-full text-left space-y-0.5 text-neutral-200">
                            <div><span className="text-accent-gold font-bold">ADVISOR:</span> {selectedMentor.name}</div>
                            <div><span className="text-accent-gold font-bold">PROPOSED:</span> {consultDate} at {consultTimeSlot}</div>
                            <div><span className="text-accent-gold font-bold">METRIC:</span> {consultTopic}</div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
