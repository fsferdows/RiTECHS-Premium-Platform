import React, { useState, useRef, useEffect } from 'react';
import { Mentor } from '../types';
import { 
  Search, Filter, Mail, Star, X, Calendar, CheckSquare, Award, 
  BookOpen, Clock, UserCheck, Sparkles, Send, Check, Loader, ChevronRight,
  Video, Trash2, Copy, Download, CalendarRange, Clock3, AlertCircle, CalendarPlus, Plus, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TiltCard } from './TiltCard';
import { FadeUpSection } from './FadeUpSection';
import { MentorCard } from './MentorCard';

export interface AcademicBooking {
  id: string;
  mentorId: number;
  mentorName: string;
  mentorImage: string;
  mentorUniversity: string;
  mentorRole: string;
  date: string;
  timeSlot: string;
  topic: string;
  mode: string;
  meetingUrl: string;
  createdAt: string;
}

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
  
  // Bookings state initialized from localStorage
  const [bookings, setBookings] = useState<AcademicBooking[]>(() => {
    try {
      const saved = localStorage.getItem('ritechs_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Toggle for Bookings ledger dashboard panel
  const [isLedgerExpanded, setIsLedgerExpanded] = useState(true);

  // Sync bookings to localStorage
  useEffect(() => {
    localStorage.setItem('ritechs_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Consultation form inside Drawer
  const [consultDateType, setConsultDateType] = useState<'quick' | 'custom'>('quick');
  const [quickDateSelected, setQuickDateSelected] = useState('');
  const [consultDate, setConsultDate] = useState('');
  const [consultTimeSlot, setConsultTimeSlot] = useState('');
  const [consultTopic, setConsultTopic] = useState('');
  const [consultMode, setConsultMode] = useState('Pre-Submission Peer Review');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Sample slots for interactive luxury slot selection
  const timeSlots = [
    "09:30 AM - 11:00 AM (CET)",
    "11:30 AM - 01:00 PM (CET)",
    "02:00 PM - 03:30 PM (CET)",
    "04:00 PM - 05:30 PM (CET)"
  ];

  // Micro-modes of support
  const consultModes = [
    { title: "Pre-Submission Peer Review", duration: "60 mins", perk: "Target Journals & Peer review Prep" },
    { title: "LaTeX Formatting & Notation Audit", duration: "30 mins", perk: "Equations & Section styling" },
    { title: "Target Journal Fit & Alignment", duration: "45 mins", perk: "Q1 Match probability assessment" },
    { title: "Methodology & Coding Peer Consult", duration: "60 mins", perk: "Implementation & Proof audit" }
  ];

  // Quick dates generator (generates upcoming 4 dates starting from tomorrow)
  const quickDates = React.useMemo(() => {
    const dates = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 1; i <= 4; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const dateStr = String(d.getDate()).padStart(2, '0');
      const fullDateString = `${year}-${month}-${dateStr}`;
      
      dates.push({
        value: fullDateString,
        dayName: days[d.getDay()],
        dayNum: d.getDate(),
        monthName: months[d.getMonth()]
      });
    }
    return dates;
  }, []);

  // Pre-set the first quick date as default
  useEffect(() => {
    if (quickDates.length > 0 && !quickDateSelected) {
      setQuickDateSelected(quickDates[0].value);
    }
  }, [quickDates, quickDateSelected]);

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
    if (quickDates.length > 0) {
      setQuickDateSelected(quickDates[0].value);
    }
    setConsultDateType('quick');
    setConsultTimeSlot(timeSlots[0]);
    setConsultTopic('');
    setConsultMode('Pre-Submission Peer Review');
  };

  const handleCloseMentor = () => {
    setSelectedMentor(null);
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
        const idStr = match[1];
        const found = mentors.find(m => String(m.id) === idStr);
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
    if (!selectedMentor) return;

    const chosenDate = consultDateType === 'quick' ? quickDateSelected : consultDate;
    if (!chosenDate || !consultTimeSlot) return;

    setBookingLoading(true);

    setTimeout(() => {
      const newBooking: AcademicBooking = {
        id: `EM-BO-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        mentorId: selectedMentor.id,
        mentorName: selectedMentor.name,
        mentorImage: selectedMentor.image,
        mentorUniversity: selectedMentor.university,
        mentorRole: selectedMentor.role || 'mentor',
        date: chosenDate,
        timeSlot: consultTimeSlot,
        topic: consultTopic || 'Scholarly Abstract and Notation Audit',
        mode: consultMode,
        meetingUrl: `https://meet.jit.si/ritechs-advisory-${Math.random().toString(36).substr(2, 8)}`,
        createdAt: new Date().toISOString()
      };

      setBookings(prev => [newBooking, ...prev]);
      setBookingLoading(false);
      setBookingSuccess(true);
    }, 1100);
  };

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm("Are you sure you want to release this scheduled advisory session? This time-slot will be immediately made available for other researchers.")) {
      setBookings(prev => prev.filter(b => b.id !== bookingId));
    }
  };

  const handleDownloadICS = (booking: AcademicBooking) => {
    const title = `Advisory: ${booking.mentorName} (${booking.mode})`;
    const description = `Topic: ${booking.topic}\\nMeeting URL: ${booking.meetingUrl}\\nLocation: Secure Virtual Boardroom\\nUniversity: ${booking.mentorUniversity}`;
    const dateClean = booking.date.replace(/-/g, '');
    
    const startHourStr = booking.timeSlot.includes("09:30") ? "093000" :
                         booking.timeSlot.includes("11:30") ? "113000" :
                         booking.timeSlot.includes("02:00") ? "140000" : "160000";
                         
    const endHourStr =   booking.timeSlot.includes("11:00") ? "110000" :
                         booking.timeSlot.includes("01:00") ? "130000" :
                         booking.timeSlot.includes("03:30") ? "153000" : "173000";

    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//RITECHS Academic Mentorship//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `UID:ritechs-booking-${booking.id}@ritechs.org`,
      `DTSTART;TZID=Europe/Brussels:${dateClean}T${startHourStr}`,
      `DTEND;TZID=Europe/Brussels:${dateClean}T${endHourStr}`,
      `DESCRIPTION:${description}`,
      'LOCATION:Online Video Meeting (Secure Loop)',
      `URL:${booking.meetingUrl}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ritechs-booking-${booking.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getSessionStatus = (bDate: string) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const target = new Date(bDate);
      target.setHours(0, 0, 0, 0);

      const diffTime = target.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        return { label: "Advisory Today", color: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 animate-pulse font-bold" };
      } else if (diffDays === 1) {
        return { label: "Tomorrow", color: "bg-amber-500/15 text-amber-400 border border-amber-500/30" };
      } else if (diffDays < 0) {
        return { label: "Archived", color: "bg-neutral-800 text-neutral-400 border border-neutral-700/30" };
      } else {
        return { label: `In ${diffDays} Days`, color: "bg-[#C9A961]/15 text-accent-gold border border-accent-gold/25" };
      }
    } catch (e) {
      return { label: "Confirmed", color: "bg-accent-gold/15 text-accent-gold border border-accent-gold/25" };
    }
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

      {/* Dynamic Academic Advisory Schedules Ledger Dashboard */}
      {bookings.length > 0 && (
        <section className="bg-primary-maroon border-b border-accent-gold/20 premium-noise text-white py-6 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between border-b border-accent-gold/15 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-accent-gold/10 border border-accent-gold/20 rounded-xs">
                  <CalendarRange className="w-4 h-4 text-accent-gold" />
                </div>
                <div>
                  <h3 className="font-serif-display text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    Your Scheduled Advisory Ledger
                    <span className="text-[9px] font-mono bg-accent-gold text-primary-maroon px-1.5 py-0.2 rounded-full font-bold">
                      {bookings.length}
                    </span>
                  </h3>
                  <p className="text-[10px] text-neutral-300 font-sans font-light">
                    Active bookings synced locally to your browser ledger.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsLedgerExpanded(!isLedgerExpanded)}
                className="text-[9px] font-mono tracking-widest text-accent-gold hover:text-[#B3934B] uppercase font-bold border border-accent-gold/15 hover:border-accent-gold/45 px-2.5 py-1.5 transition-all flex items-center gap-1 cursor-pointer"
              >
                {isLedgerExpanded ? "Collapse Schedule [-]" : "Expand Schedule [+]"}
              </button>
            </div>

            <AnimatePresence>
              {isLedgerExpanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden"
                >
                  {bookings.map((booking) => {
                    const status = getSessionStatus(booking.date);
                    return (
                      <motion.div 
                        key={booking.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="bg-maroon-dark border border-accent-gold/25 p-3.5 rounded-sm relative flex flex-col justify-between hover:border-accent-gold/45 transition-colors group shadow-sm text-left"
                      >
                        {/* Status indices */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[7.5px] font-mono font-bold text-accent-gold uppercase tracking-wider">
                            ID: {booking.id}
                          </span>
                          <span className={`text-[7.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${status.color}`}>
                            {status.label}
                          </span>
                        </div>

                        {/* Advisor Detail info */}
                        <div className="flex gap-2.5 items-center bg-primary-maroon/50 p-2 border border-accent-gold/10 mb-2.5 rounded-xs">
                          <div className="w-10 h-10 rounded-xs overflow-hidden border border-accent-gold/15 shrink-0 bg-maroon-dark">
                            <img src={booking.mentorImage} alt={booking.mentorName} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-serif-display text-xs font-bold text-white truncate">{booking.mentorName}</h4>
                            <p className="text-[8.5px] text-neutral-300 font-mono truncate">{booking.mentorUniversity}</p>
                          </div>
                        </div>

                        {/* Meeting Slot Spec */}
                        <div className="space-y-1 text-left mb-3 bg-black/10 p-2 border-l border-accent-gold/30">
                          <div className="flex items-center gap-1.5 font-mono text-[8.5px] text-neutral-200">
                            <Clock3 className="w-3 h-3 text-accent-gold" />
                            <span>{booking.date} at {booking.timeSlot}</span>
                          </div>
                          <div className="text-[9.5px] text-neutral-300 font-serif-accent leading-tight italic truncate">
                            Focus: "{booking.topic}"
                          </div>
                          <div className="inline-block text-[7.5px] font-mono font-black text-accent-gold uppercase tracking-widest bg-accent-gold/10 px-1 py-0.2">
                            Mode: {booking.mode}
                          </div>
                        </div>

                        {/* Action Operations */}
                        <div className="grid grid-cols-3 gap-1.5 mt-auto shrink-0">
                          <a 
                            href={booking.meetingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[7.5px] tracking-widest uppercase font-bold py-1.5 px-1 text-center transition-colors flex items-center justify-center gap-0.5 rounded-xs"
                          >
                            <Video className="w-2.5 h-2.5 shrink-0" /> JOIN
                          </a>
                          <button 
                            onClick={() => handleDownloadICS(booking)}
                            className="bg-primary-maroon hover:bg-[#3D0C11] border border-accent-gold/25 text-neutral-250 hover:text-white font-mono text-[7.5px] tracking-widest uppercase font-bold py-1.5 px-1 text-center transition-colors flex items-center justify-center gap-0.5 rounded-xs cursor-pointer"
                            title="Add to personal devices calendar (.ics file)"
                          >
                            <Download className="w-2.5 h-2.5 shrink-0 text-accent-gold" /> CAL
                          </button>
                          <button 
                            onClick={() => handleCancelBooking(booking.id)}
                            className="bg-[#3D0C11] hover:bg-[#5E121A] text-red-300 hover:text-white font-mono text-[7.5px] tracking-widest uppercase font-bold py-1.5 px-1 text-center transition-colors flex items-center justify-center gap-0.5 rounded-xs cursor-pointer"
                          >
                            <Trash2 className="w-2.5 h-2.5 shrink-0" /> CANCEL
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      )}

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
                  onClick={() => {
                    handleOpenMentor(mentor);
                    window.location.hash = `#/mentors?mentorId=${mentor.id}`;
                  }} 
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
             {/* Clear dark Backdrop overlay with spring transitions */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 cursor-pointer" 
              onClick={handleCloseMentor} 
            />
            
            {/* Crisp centered modal / board container */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
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

                    {/* Elegant Interactive booking module (Extremely Compact, Premium-Noise & Tactile) */}
                    <div className="border border-accent-gold/20 bg-primary-maroon p-3.5 rounded-sm select-none">
                      <h3 className="font-serif-display text-[10.5px] text-white font-bold mb-2 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-accent-gold" /> Book Advisory Session
                      </h3>

                      {!bookingSuccess ? (
                        <form onSubmit={handleBookConsultation} className="flex flex-col text-xs font-sans">
                          {/* Segmented control for choosing quick recommended dates vs custom dates */}
                          <div className="flex bg-maroon-dark p-0.5 border border-accent-gold/15 mb-2 rounded-xs">
                            <button
                              type="button"
                              onClick={() => setConsultDateType('quick')}
                              className={`flex-1 py-1 text-[8px] font-mono uppercase tracking-widest text-center cursor-pointer font-bold transition-all ${consultDateType === 'quick' ? 'bg-accent-gold text-primary-maroon shadow-sm' : 'text-neutral-300 hover:text-white hover:bg-white/5'}`}
                            >
                              ⚡ Recommended Slots
                            </button>
                            <button
                              type="button"
                              onClick={() => setConsultDateType('custom')}
                              className={`flex-1 py-1 text-[8px] font-mono uppercase tracking-widest text-center cursor-pointer font-bold transition-all ${consultDateType === 'custom' ? 'bg-accent-gold text-primary-maroon shadow-sm' : 'text-neutral-300 hover:text-white hover:bg-white/5'}`}
                            >
                              📅 Custom Calendar
                            </button>
                          </div>

                          {/* Quick dates list representing interactive upcoming slots */}
                          {consultDateType === 'quick' ? (
                            <div className="grid grid-cols-4 gap-1.5 mb-2">
                              {quickDates.map((qd) => {
                                const isSelected = quickDateSelected === qd.value;
                                return (
                                  <button
                                    key={qd.value}
                                    type="button"
                                    onClick={() => setQuickDateSelected(qd.value)}
                                    className={`p-1 border flex flex-col items-center justify-center transition-all cursor-pointer rounded-xs ${isSelected ? 'bg-accent-gold border-accent-gold text-primary-maroon font-bold' : 'border-accent-gold/15 bg-maroon-dark text-neutral-300 hover:bg-primary-maroon'}`}
                                  >
                                    <span className="text-[6.5px] font-mono uppercase font-bold opacity-80">{qd.dayName}</span>
                                    <span className="text-sm font-serif-display font-black leading-none my-0.5">{qd.dayNum}</span>
                                    <span className="text-[6.5px] font-mono uppercase font-bold tracking-tighter">{qd.monthName}</span>
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="mb-2 flex flex-col gap-1 text-left">
                              <label className="font-mono text-[7px] uppercase tracking-wider text-accent-gold/80 font-bold">Choose Custom Academic Date</label>
                              <input 
                                type="date" 
                                required={consultDateType === 'custom'}
                                min="2026-06-15"
                                value={consultDate}
                                onChange={(e) => setConsultDate(e.target.value)}
                                className="border border-accent-gold/20 bg-maroon-dark text-white p-1 text-[9px] focus:border-accent-gold outline-none w-full font-mono rounded-xs"
                              />
                            </div>
                          )}

                          {/* Micro-modes support selection */}
                          <div className="mb-2 text-left">
                            <label className="font-mono text-[7px] uppercase tracking-wider text-accent-gold/80 font-bold mb-1 block">Support Mandate Mode</label>
                            <div className="grid grid-cols-2 gap-1.5">
                              {consultModes.map((m) => {
                                const isSelected = consultMode === m.title;
                                return (
                                  <button
                                    key={m.title}
                                    type="button"
                                    onClick={() => setConsultMode(m.title)}
                                    className={`p-1.5 border text-left transition-all cursor-pointer rounded-xs flex flex-col justify-between ${isSelected ? 'bg-accent-gold border-accent-gold text-primary-maroon font-serif' : 'border-accent-gold/15 bg-maroon-dark text-neutral-300 hover:bg-primary-maroon'}`}
                                  >
                                    <div className="flex items-center justify-between w-full">
                                      <span className={`text-[7.5px] font-mono uppercase tracking-tight truncate max-w-[110px] ${isSelected ? 'text-primary-maroon font-black' : 'text-neutral-200'}`}>
                                        {m.title}
                                      </span>
                                      <span className={`text-[6px] font-mono px-1 rounded-sm shrink-0 whitespace-nowrap ml-1 ${isSelected ? 'bg-primary-maroon/20 text-primary-maroon font-bold' : 'bg-accent-gold/10 text-accent-gold border border-accent-gold/15'}`}>
                                        {m.duration}
                                      </span>
                                    </div>
                                    <p className={`text-[6.5px] font-light mt-0.5 leading-normal ${isSelected ? 'text-primary-maroon opacity-90 font-medium' : 'text-neutral-400'}`}>
                                      {m.perk}
                                    </p>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* CET slot grid */}
                          <div className="mb-2 text-left">
                            <div className="flex items-center justify-between mb-1">
                              <label className="font-mono text-[7px] uppercase tracking-wider text-accent-gold/80 font-bold">Available CET Advisory Slot</label>
                              <span className="text-[6.5px] font-mono text-emerald-400 uppercase tracking-widest font-black flex items-center gap-0.5">● 93% MATCH INDEX</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                              {timeSlots.map(slot => {
                                const labelStr = slot.replace(" (CET)", "");
                                const isSelected = consultTimeSlot === slot;
                                return (
                                  <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setConsultTimeSlot(slot)}
                                    className={`flex justify-between items-center py-1 px-1.5 border text-[7.5px] font-mono uppercase font-semibold transition-all cursor-pointer rounded-xs ${
                                      isSelected 
                                        ? 'bg-accent-gold border-accent-gold text-primary-maroon font-extrabold shadow-sm' 
                                        : 'border-accent-gold/15 bg-maroon-dark text-neutral-300 hover:bg-primary-maroon'
                                    }`}
                                  >
                                    <span>{labelStr}</span>
                                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3] text-primary-maroon" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Manuscript Focus text area */}
                          <div className="mb-2.5 text-left">
                            <label className="font-mono text-[7px] uppercase tracking-wider text-accent-gold/80 font-bold mb-1 block">Brief Abstract Focus or Manuscript Draft Topic</label>
                            <input 
                              type="text"
                              placeholder="E.g., Proof audit on Deep RL or Lyapunov LaTeX equations..."
                              required 
                              value={consultTopic}
                              onChange={(e) => setConsultTopic(e.target.value)}
                              className="border border-accent-gold/20 bg-maroon-dark text-white p-1.5 text-[9px] focus:border-accent-gold outline-none font-sans w-full rounded-xs placeholder-neutral-500"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={bookingLoading || !consultTimeSlot || (consultDateType === 'quick' ? !quickDateSelected : !consultDate)}
                            className="w-full bg-accent-gold hover:bg-[#B3934B] text-primary-maroon text-[7.5px] py-2 font-mono font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-35 disabled:pointer-events-none cursor-pointer"
                          >
                            {bookingLoading ? (
                              <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 border-2 border-primary-maroon/40 border-t-primary-maroon rounded-full animate-spin" />
                                <span>VERIFYING ACADEMIC ALIGNMENT...</span>
                              </div>
                            ) : (
                              <span>PROPOSE ADVISORY MATCH</span>
                            )}
                          </button>
                        </form>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-maroon-dark border border-accent-gold/25 p-3.5 rounded-sm flex flex-col items-center gap-2 text-white text-center"
                        >
                          <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <h4 className="font-serif-display text-xs font-bold text-white uppercase tracking-wider">Advisory Match Scheduled!</h4>
                            <p className="text-[8px] text-neutral-300 font-light mt-0.5 leading-tight max-w-[260px] mx-auto">
                              Your slot has been synchronized and successfully entered into our secure editorial calendar.
                            </p>
                          </div>
                          
                          <div className="bg-primary-maroon border border-accent-gold/20 p-2.5 font-mono text-[7.5px] w-full text-left space-y-1 rounded-xs leading-normal">
                            <div className="flex justify-between border-b border-accent-gold/10 pb-0.5">
                              <span className="text-accent-gold font-bold">RESERVATION ID:</span> 
                              <span className="font-black text-white">{bookings[0]?.id || 'EM-BO-XXXXX'}</span>
                            </div>
                            <div className="flex justify-between border-b border-accent-gold/10 pb-0.5">
                              <span className="text-accent-gold font-bold">ADVISOR:</span> 
                              <span className="text-white truncate max-w-[150px]">{selectedMentor.name}</span>
                            </div>
                            <div className="flex justify-between border-b border-accent-gold/10 pb-0.5">
                              <span className="text-accent-gold font-bold">DATE & SLOT:</span> 
                              <span className="text-white">{(consultDateType === 'quick' ? quickDateSelected : consultDate) || bookings[0]?.date} at {consultTimeSlot || bookings[0]?.timeSlot}</span>
                            </div>
                            <div className="flex justify-between border-b border-accent-gold/10 pb-0.5">
                              <span className="text-accent-gold font-bold">MANDATE:</span> 
                              <span className="text-accent-gold font-bold truncate max-w-[150px]">{consultMode}</span>
                            </div>
                            <div className="pt-0.5 flex justify-between items-center gap-2">
                              <span className="text-accent-gold font-bold">MEETING LINK:</span>
                              <a 
                                href={bookings[0]?.meetingUrl || "https://meet.jit.si"} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[6.5px] font-black px-1.5 py-0.5"
                              >
                                JOIN ROOM
                              </a>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 w-full mt-1">
                            <button
                              type="button"
                              onClick={() => {
                                const lastBooking = bookings[0];
                                if (lastBooking) {
                                  handleDownloadICS(lastBooking);
                                }
                              }}
                              className="bg-accent-gold hover:bg-[#B3934B] text-primary-maroon font-mono text-[7.5px] font-black uppercase tracking-widest py-1.5 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Download className="w-3 h-3 text-primary-maroon" /> Download ICS
                            </button>
                            <button
                              type="button"
                              onClick={() => setBookingSuccess(false)}
                              className="bg-[#2C0509] hover:bg-primary-maroon border border-accent-gold/25 text-neutral-300 hover:text-white font-mono text-[7.5px] font-black uppercase tracking-widest py-1.5 transition-all cursor-pointer"
                            >
                              New Booking
                            </button>
                          </div>
                        </motion.div>
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
