import React, { useState, useEffect } from 'react';
import { 
  Star, Heart, Mail, Calendar, BookOpen, Clock, Award, X, Sparkles, Send, 
  Check, Loader, ChevronRight, Video, Trash2, Home, ArrowLeft, ShieldAlert, Copy, CheckSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Mentor } from '../types';

interface MentorCommonViewProps {
  mentors: Mentor[];
  currentPath: string;
  onNavigate: (path: string) => void;
}

interface AcademicBooking {
  id: string;
  mentorId: number;
  mentorName: string;
  mentorImage: string;
  date: string;
  timeSlot: string;
  topic: string;
  mode: string;
  meetingUrl: string;
}

export default function MentorCommonView({ mentors, currentPath, onNavigate }: MentorCommonViewProps) {
  // Extract mentorId from path, supporting both '#/mentor-common-view/353' and '#/mentor-common-view?mentorId=353'
  const getMentorIdFromPath = () => {
    if (currentPath.includes('?mentorId=')) {
      const match = currentPath.match(/mentorId=(\d+)/);
      if (match) return Number(match[1]);
    }
    const segments = currentPath.split('/');
    const lastSegment = segments[segments.length - 1];
    const parsed = Number(lastSegment);
    if (!isNaN(parsed)) return parsed;
    
    // Check fallback query strings
    const urlParams = new URLSearchParams(currentPath.split('?')[1] || '');
    const qId = urlParams.get('id');
    if (qId) return Number(qId);

    return null;
  };

  const mentorId = getMentorIdFromPath();
  const mentor = mentors.find(m => m.id === mentorId) || null;

  // Persistence States
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ritechs_favorites_mentors');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookings, setBookings] = useState<AcademicBooking[]>(() => {
    try {
      const saved = localStorage.getItem('ritechs_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [endorsements, setEndorsements] = useState<Record<string, any[]>>(() => {
    try {
      const saved = localStorage.getItem('ritechs_endorsements_map');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Local interaction states
  const [isFavorite, setIsFavorite] = useState(false);
  const [consultDateType, setConsultDateType] = useState<'quick' | 'custom'>('quick');
  const [quickDateSelected, setQuickDateSelected] = useState('');
  const [consultDate, setConsultDate] = useState('');
  const [consultTimeSlot, setConsultTimeSlot] = useState('');
  const [consultTopic, setConsultTopic] = useState('');
  const [consultMode, setConsultMode] = useState('Pre-Submission Peer Review');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Review submission states
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [endorseSuccess, setEndorseSuccess] = useState(false);

  // Link copy visual helper
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (mentor) {
      setIsFavorite(favorites.includes(mentor.id));
    }
  }, [mentor, favorites]);

  // Sync favorites
  const toggleFavorite = () => {
    if (!mentor) return;
    let nextFavs: number[];
    if (favorites.includes(mentor.id)) {
      nextFavs = favorites.filter(id => id !== mentor.id);
    } else {
      nextFavs = [...favorites, mentor.id];
    }
    setFavorites(nextFavs);
    localStorage.setItem('ritechs_favorites_mentors', JSON.stringify(nextFavs));
  };

  // Generate deterministic dates for the mock scheduler
  const getNextAvailableDates = () => {
    const dates = [];
    const daysName = ["Tuesday", "Wednesday", "Friday"];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const tempDate = new Date(today);
      tempDate.setDate(today.getDate() + i);
      const dayName = tempDate.toLocaleDateString('en-US', { weekday: 'long' });
      if (daysName.includes(dayName)) {
        dates.push({
          day: dayName,
          formatted: tempDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          raw: tempDate.toISOString().split('T')[0]
        });
      }
    }
    return dates;
  };

  const upcomingDates = getNextAvailableDates();

  useEffect(() => {
    if (upcomingDates.length > 0 && !quickDateSelected) {
      setQuickDateSelected(upcomingDates[0].formatted);
    }
  }, [upcomingDates]);

  // Handle slot availability
  const getAvailabilityStatus = (mId: number) => {
    const mentorBookings = bookings.filter(b => b.mentorId === mId);
    
    const daysName = ["Tuesday", "Wednesday", "Friday"];
    const slotHours = ["09:30 AM", "11:30 AM", "02:00 PM", "04:00 PM"];
    
    const slots = daysName.flatMap((day) => {
      return slotHours.map((hour) => {
        const isBooked = mentorBookings.some(b => b.timeSlot.startsWith(hour));
        return {
          day,
          time: hour,
          isBooked,
          occupancy: isBooked ? 100 : (20 + (mId % 7) * 10)
        };
      });
    }).slice(0, 6);

    const openCount = slots.filter(s => !s.isBooked).length;
    let summary = "🟢 High Availability (5 open slots this week)";
    if (openCount <= 2) {
      summary = "🔴 Low Availability (1-2 remaining slots)";
    } else if (openCount <= 4) {
      summary = "🟡 Medium Availability (3-4 remaining slots)";
    }

    return {
      summary,
      openCount,
      slots
    };
  };

  // Propose booking submission
  const handleProposeConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentor) return;

    if (!consultTimeSlot) {
      alert("Please select an available timing slot.");
      return;
    }

    setBookingLoading(true);

    setTimeout(() => {
      const finalDate = consultDateType === 'quick' ? quickDateSelected : consultDate;
      const meetingId = `EM-BO-${Math.floor(10000 + Math.random() * 90000)}`;

      const newBooking: AcademicBooking = {
        id: meetingId,
        mentorId: mentor.id,
        mentorName: mentor.name,
        mentorImage: mentor.image,
        date: finalDate,
        timeSlot: consultTimeSlot,
        topic: consultTopic || "Thesis pre-submission structural peer review",
        mode: consultMode,
        meetingUrl: `https://meet.jit.si/ritechs-consult-${mentor.id}-${Math.floor(1000 + Math.random() * 9000)}`
      };

      const updatedBookings = [newBooking, ...bookings];
      setBookings(updatedBookings);
      localStorage.setItem('ritechs_bookings', JSON.stringify(updatedBookings));

      setBookingLoading(false);
      setBookingSuccess(true);

      // Reset
      setConsultTopic('');
      setConsultTimeSlot('');

      setTimeout(() => {
        setBookingSuccess(false);
      }, 5000);
    }, 1100);
  };

  // Endorsement review handler
  const handleSubmitEndorsement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentor) return;

    const reviewId = `RE-${Date.now()}`;
    const newReview = {
      id: reviewId,
      name: newReviewName || "Anonymous Scholar",
      title: newReviewTitle || "Doctoral Candidate",
      rating: newReviewRating,
      comment: newReviewComment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const mentorIdStr = String(mentor.id);
    const existingReviews = endorsements[mentorIdStr] || [];
    const updatedReviews = [newReview, ...existingReviews];
    
    const nextEndorsements = {
      ...endorsements,
      [mentorIdStr]: updatedReviews
    };

    setEndorsements(nextEndorsements);
    localStorage.setItem('ritechs_endorsements_map', JSON.stringify(nextEndorsements));

    setNewReviewName('');
    setNewReviewTitle('');
    setNewReviewRating(5);
    setNewReviewComment('');
    setEndorseSuccess(true);

    setTimeout(() => {
      setEndorseSuccess(false);
    }, 4500);
  };

  const handleCopyLink = () => {
    if (!mentor) return;
    const directUrl = `${window.location.origin}/#/mentor-common-view/${mentor.id}`;
    navigator.clipboard.writeText(directUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!mentor) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center p-6 bg-neutral-warm text-white">
        <div className="bg-[#2D060A] border-2 border-accent-gold/40 max-w-md p-8 rounded-sm shadow-xl space-y-4">
          <ShieldAlert className="w-12 h-12 text-accent-gold mx-auto animate-bounce" />
          <h2 className="font-serif-display text-lg font-bold text-accent-gold uppercase tracking-wider">
            Mentor Registry Out of Range
          </h2>
          <p className="text-xs text-neutral-300 font-sans leading-relaxed">
            The requested advisor index of <span className="font-mono text-white font-bold bg-black/45 px-1.5 py-0.5">#{mentorId}</span> was not found in our global indexed ledger. Please return to the central listing layout to seek verified co-authors.
          </p>
          <button 
            onClick={() => onNavigate('#/mentors')}
            className="w-full bg-accent-gold hover:bg-[#B3934B] text-primary-maroon font-mono text-[9.5px] uppercase font-bold py-2.5 tracking-widest transition-all cursor-pointer rounded-xs flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Advisors Registry
          </button>
        </div>
      </div>
    );
  }

  const mentorAvailability = getAvailabilityStatus(mentor.id);
  const activeReviews = endorsements[String(mentor.id)] || [];

  return (
    <div className="min-h-screen bg-neutral-warm pb-16 pt-24 select-none">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Navigation & Actions Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-accent-gold/15 pb-4">
          <button
            onClick={() => onNavigate('#/mentors')}
            className="group flex items-center gap-2 text-[9.5px] font-mono uppercase tracking-widest text-[#C9A961] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Volver a la Lista de Mentores</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="bg-black/40 border border-accent-gold/30 hover:border-accent-gold text-accent-gold text-[9px] font-mono tracking-wider uppercase px-3 py-1.5 transition-colors flex items-center gap-1.5 rounded-xs cursor-pointer"
              title="Copy the direct URL of this common view profile"
            >
              <Copy className="w-3 h-3" />
              <span>{copied ? "COPIED URL!" : "COPY COMMON VIEW LINK"}</span>
            </button>

            <button
              onClick={toggleFavorite}
              className={`border text-[9px] font-mono tracking-wider uppercase px-3 py-1.5 transition-all flex items-center gap-1.5 rounded-xs cursor-pointer ${
                isFavorite 
                  ? 'bg-rose-700 border-rose-500 text-white shadow-lg' 
                  : 'bg-black/40 border-[#C9A961]/35 text-[#C9A961] hover:text-rose-400 hover:border-rose-400/50'
              }`}
            >
              <Heart className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
              <span>{isFavorite ? "FAVORITED" : "FAVORITE"}</span>
            </button>
          </div>
        </div>

        {/* Cinematic Header Block */}
        <div className="bg-gradient-to-r from-primary-maroon via-[#3D0C11] to-maroon-dark border border-accent-gold/35 shadow-2xl relative overflow-hidden premium-noise rounded-sm mb-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-gold/5 rounded-bl-full pointer-events-none blur-2xl animate-pulse" />
          
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 relative z-10">
            {/* Aspect ratio framed photo */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-sm overflow-hidden border-2 border-accent-gold shadow-xl shrink-0 bg-maroon-dark">
              <img 
                src={mentor.image} 
                alt={mentor.name} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Title / Badge Metadata */}
            <div className="text-center md:text-left flex-grow space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-[8px] font-mono bg-accent-gold text-primary-maroon px-2 py-0.5 rounded-full font-bold uppercase">
                  VERIFIED ADVISORY CHAIR
                </span>
                <span className="text-[8px] font-mono border border-[#C9A961]/35 bg-[#C9A961]/10 text-accent-gold px-2 py-0.5 rounded-xs uppercase tracking-widest font-bold">
                  ID: EM-{String(mentor.id).padStart(3, '0')}
                </span>
                <span className="text-[8px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-xs uppercase font-extrabold tracking-widest">
                  PORTFOLIO ACTIVE
                </span>
              </div>

              <h1 className="font-serif-display text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wide uppercase leading-tight">
                {mentor.name}
              </h1>

              <p className="text-[10px] sm:text-xs text-neutral-300 font-mono tracking-widest uppercase font-semibold">
                {mentor.title} • {mentor.university}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-[10px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-accent-gold" /> {mentor.country}</span>
                <span className="flex items-center gap-1.5 text-accent-gold font-extrabold">
                  <Star className="w-3.5 h-3.5 text-accent-gold fill-accent-gold" /> {mentor.rating} ADVISOR RATING
                </span>
              </div>

              {/* Research Tags */}
              <div className="flex flex-wrap justify-center md:justify-start gap-1.5 pt-2">
                {mentor.fields.map((f, i) => (
                  <span 
                    key={i} 
                    className="text-[7.5px] font-mono tracking-wider uppercase font-extrabold px-2 py-1 bg-maroon-light/40 border border-accent-gold/20 text-accent-gold rounded-xs shadow-sm"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Area (Bio, publications, endorsements) - 7 cols */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Scholarly biography */}
            <div className="bg-primary-maroon border border-accent-gold/20 p-6 relative rounded-sm shadow-md text-white select-text">
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent-gold/5 rounded-bl-full pointer-events-none" />
              <h3 className="font-serif-display text-sm tracking-widest uppercase text-accent-gold border-b border-accent-gold/15 pb-2 mb-3.5 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-accent-gold" /> Academic Biography & Focus Scope
              </h3>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light font-sans whitespace-pre-line">
                {mentor.bio}
              </p>
            </div>

            {/* Indexed publications list */}
            <div className="bg-primary-maroon border border-accent-gold/20 p-6 rounded-sm shadow-md text-white">
              <h3 className="font-serif-display text-sm tracking-widest uppercase text-accent-gold border-b border-accent-gold/15 pb-2 mb-4 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-accent-gold" /> Indexed Publications & Accepted Portfolios
              </h3>
              
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 select-text">
                {mentor.publications.map((pubmed, idx) => (
                  <div key={idx} className="bg-maroon-dark/50 border border-accent-gold/15 p-3 flex gap-3 rounded-xs hover:border-accent-gold/40 transition-colors">
                    <Award className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-xs font-mono font-medium text-neutral-100 leading-tight">
                        {pubmed}
                      </p>
                      <div className="flex items-center gap-1.5 font-mono text-[7px] text-neutral-400 uppercase tracking-tight">
                        <span>Indexed: Scopus & JCR Q1</span>
                        <span className="text-accent-gold/50">•</span>
                        <span>Author Verified</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Endorsements Component */}
            <div className="bg-primary-maroon border border-accent-gold/20 p-6 rounded-sm shadow-md text-white space-y-6">
              
              <div className="flex items-center justify-between border-b border-accent-gold/15 pb-2.5">
                <h3 className="font-serif-display text-sm tracking-widest uppercase text-accent-gold flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-accent-gold fill-accent-gold" /> Scholar Testimonials & Endorsements
                </h3>
                <span className="text-[9px] font-mono text-neutral-300">
                  ({activeReviews.length} Reviews Verified)
                </span>
              </div>

              {/* Form trigger submission */}
              <form onSubmit={handleSubmitEndorsement} className="bg-maroon-dark/45 border border-accent-gold/15 p-4 rounded-xs space-y-3">
                <p className="font-mono text-[8px] text-accent-gold uppercase tracking-wider font-extrabold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-accent-gold animate-pulse" /> Write Your Scholarly Review or Endorsement
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1 text-left">
                    <label className="text-[7px] font-mono uppercase text-neutral-400 font-bold block">Author / Scholar Name</label>
                    <input 
                      type="text"
                      required
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder="E.g., Dr. Alice Vance, PhD"
                      className="border border-accent-gold/25 bg-maroon-dark text-white p-2 text-xs focus:border-accent-gold outline-none w-full rounded-xs placeholder-neutral-500 font-mono"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-[7px] font-mono uppercase text-neutral-400 font-bold block">Affiliation / Title</label>
                    <input 
                      type="text"
                      value={newReviewTitle}
                      onChange={(e) => setNewReviewTitle(e.target.value)}
                      placeholder="E.g., Associate Prof. / PhD Candidate"
                      className="border border-accent-gold/25 bg-maroon-dark text-white p-2 text-xs focus:border-accent-gold outline-none w-full rounded-xs placeholder-neutral-500 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[7px] font-mono uppercase text-neutral-400 font-bold block">Rating Assessment</label>
                  <div className="flex bg-[#2C0509] p-1.5 border border-accent-gold/15 self-start rounded-xs w-max gap-1">
                    {[1, 2, 3, 4, 5].map(stars => (
                      <button
                        key={stars}
                        type="button"
                        onClick={() => setNewReviewRating(stars)}
                        className="p-0.5 filter hover:brightness-125 transition-all text-accent-gold"
                      >
                        <Star className={`w-4 h-4 ${newReviewRating >= stars ? 'fill-accent-gold text-accent-gold' : 'text-neutral-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[7px] font-mono uppercase text-neutral-400 font-bold block">Review Narrative & Testimony</label>
                  <textarea
                    required
                    rows={3}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Provide details about your manuscript co-authorship research, LaTeX document audit help, or response to peer review queries..."
                    className="border border-accent-gold/25 bg-maroon-dark text-white p-2 text-xs focus:border-accent-gold outline-none w-full rounded-xs placeholder-neutral-500 font-light"
                  />
                </div>

                <div className="flex justify-between items-center gap-2 pt-1.5">
                  {endorseSuccess ? (
                    <p className="font-mono text-[8px] text-emerald-400 font-bold animate-pulse">✓ ENDORSEMENT PUBLISHED TO BROWSER LEDGER!</p>
                  ) : (
                    <span />
                  )}
                  <button
                    type="submit"
                    className="bg-accent-gold hover:bg-[#B3934B] text-primary-maroon px-4 py-2 text-[8px] font-mono uppercase tracking-widest font-extrabold transition-all cursor-pointer rounded-xs"
                  >
                    Publish Testimonial
                  </button>
                </div>
              </form>

              {/* List reviews */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {activeReviews.length > 0 ? (
                  activeReviews.map((review: any) => (
                    <div key={review.id} className="bg-maroon-dark/30 border border-accent-gold/10 p-3.5 text-left space-y-1.5 rounded-xs select-text">
                      <div className="flex items-center justify-between gap-2.5">
                        <div className="min-w-0">
                          <span className="font-mono text-xs text-white font-extrabold">{review.name}</span>
                          <span className="text-[9px] font-mono text-neutral-400 border-l border-accent-gold/20 pl-2 ml-2 uppercase font-medium">{review.title}</span>
                        </div>
                        <div className="flex gap-0.5 shrink-0">
                          {Array.from({ length: 5 }).map((_, fIdx) => (
                            <Star key={fIdx} className={`w-2.5 h-2.5 ${review.rating > fIdx ? 'fill-accent-gold text-accent-gold' : 'text-neutral-700'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs font-sans font-light text-neutral-200 leading-relaxed italic">
                        "{review.comment}"
                      </p>
                      <div className="text-[7px] text-neutral-400 text-right font-mono font-bold uppercase tracking-wider">
                        Date Verified: {review.date}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-neutral-400 italic text-xs font-serif-accent">
                    No reviews left yet for {mentor.name}. Be the first to leave a verified scholar review!
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Right Area (Scheduler & live availability) - 5 cols */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            {/* Live Availability visual calendar slots */}
            <div className="bg-primary-maroon border border-accent-gold/25 p-5 relative text-white rounded-sm">
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#C9A961] font-bold block">
                  Current Live Availability Agenda
                </span>
              </div>

              <div className="font-serif-display text-sm font-bold text-white leading-snug mb-3">
                {mentorAvailability.summary}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {mentorAvailability.slots.map((s, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => {
                      if (!s.isBooked) {
                        setConsultTimeSlot(`${s.time} (${s.day})`);
                      }
                    }}
                    className={`p-2 border flex flex-col justify-between transition-all rounded-xs ${
                      s.isBooked 
                        ? 'bg-black/45 border-red-950/20 opacity-40 cursor-not-allowed text-neutral-500' 
                        : consultTimeSlot.startsWith(s.time) && consultTimeSlot.includes(s.day)
                          ? 'bg-[#5A121C] border-accent-gold hover:bg-[#6e1823] cursor-pointer ring-1 ring-accent-gold'
                          : 'bg-black/35 border-accent-gold/15 hover:border-accent-gold/45 cursor-pointer hover:bg-black/55'
                    }`}
                  >
                    <span className="font-mono text-[7px] text-neutral-400 uppercase tracking-wider">{s.day}</span>
                    <div className="flex justify-between items-center mt-1">
                      <span className="font-mono text-[9px] text-white font-extrabold">{s.time}</span>
                      <span className={`text-[6px] font-mono px-1 py-0.2 font-extrabold uppercase shrink-0 border ${
                        s.isBooked 
                          ? 'text-red-400 bg-red-950/20 border-red-900/10' 
                          : 'text-emerald-400 bg-emerald-950/20 border-emerald-500/20 animate-pulse'
                      }`}>
                        {s.isBooked ? "Booked" : "Select"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Form Card */}
            <div className="bg-gradient-to-br from-primary-maroon to-maroon-dark border-2 border-accent-gold/30 p-5 rounded-sm shadow-xl text-white">
              <h3 className="font-serif-display text-sm tracking-widest uppercase text-accent-gold border-b border-accent-gold/15 pb-2 mb-4 flex items-center gap-1.5 font-bold">
                <Calendar className="w-4 h-4 text-accent-gold" /> Propose Secure Audit Consultation
              </h3>

              <form onSubmit={handleProposeConsultation} className="space-y-4">
                
                {/* Topic field */}
                <div className="space-y-1">
                  <label className="text-[7.5px] font-mono uppercase text-neutral-400 font-bold block">
                    Research Topic & Manuscript Area
                  </label>
                  <input 
                    type="text"
                    required
                    value={consultTopic}
                    onChange={(e) => setConsultTopic(e.target.value)}
                    placeholder="E.g., Quantum Crypto integration for Grid Smart Meters"
                    className="border border-[#C9A961]/25 bg-[#200306] text-white p-2 text-xs focus:border-accent-gold outline-none w-full rounded-xs placeholder-neutral-600 font-mono"
                  />
                </div>

                {/* Consultation type */}
                <div className="space-y-1">
                  <label className="text-[7.5px] font-mono uppercase text-neutral-400 font-bold block">
                    Review Mode & Method
                  </label>
                  <select 
                    value={consultMode}
                    onChange={(e) => setConsultMode(e.target.value)}
                    className="border border-[#C9A961]/25 bg-[#200306] text-white p-2 text-xs focus:border-accent-gold outline-none w-full rounded-xs font-mono"
                  >
                    <option value="Pre-Submission Peer Review">Pre-Submission Peer Review</option>
                    <option value="LaTeX Proof-Style Verification">LaTeX Proof-Style Verification</option>
                    <option value="Conference Selection Alignment Audit">Conference Selection Alignment Audit</option>
                    <option value="International Collaboration Pitch">International Collaboration Pitch</option>
                  </select>
                </div>

                {/* Time Type Selectors */}
                <div className="space-y-2">
                  <label className="text-[7.5px] font-mono uppercase text-neutral-400 font-bold block">
                    Select Consultation Date Mode
                  </label>
                  
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setConsultDateType('quick')}
                      className={`flex-1 py-1.5 text-[8.5px] font-mono uppercase font-bold tracking-wide border rounded-xs transition-colors cursor-pointer ${
                        consultDateType === 'quick' 
                          ? 'bg-accent-gold text-primary-maroon border-accent-gold font-extrabold' 
                          : 'bg-[#200306] border-[#C9A961]/25 text-[#C9A961]'
                      }`}
                    >
                      Quick Session Dates
                    </button>
                    <button
                      type="button"
                      onClick={() => setConsultDateType('custom')}
                      className={`flex-1 py-1.5 text-[8.5px] font-mono uppercase font-bold tracking-wide border rounded-xs transition-colors cursor-pointer ${
                        consultDateType === 'custom' 
                          ? 'bg-accent-gold text-primary-maroon border-accent-gold font-extrabold' 
                          : 'bg-[#200306] border-[#C9A961]/25 text-[#C9A961]'
                      }`}
                    >
                      Custom Date Request
                    </button>
                  </div>

                  {consultDateType === 'quick' ? (
                    <div className="grid grid-cols-1 gap-1.5 pt-1">
                      {upcomingDates.map((d, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setQuickDateSelected(d.formatted)}
                          className={`p-2 text-[9px] font-mono text-left border rounded-xs transition-all flex justify-between items-center cursor-pointer ${
                            quickDateSelected === d.formatted 
                              ? 'bg-accent-gold/15 border-accent-gold text-white font-bold' 
                              : 'bg-[#200306]/90 border-[#C9A961]/15 text-neutral-200 hover:border-[#C9A961]/40'
                          }`}
                        >
                          <span>{d.day}</span>
                          <span className="text-[8.5px] font-extrabold text-accent-gold">{d.formatted}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <input 
                      type="date"
                      required={consultDateType === 'custom'}
                      value={consultDate}
                      onChange={(e) => setConsultDate(e.target.value)}
                      className="border border-[#C9A961]/25 bg-[#200306] text-white p-2 text-xs focus:border-accent-gold outline-none w-full rounded-xs font-mono"
                    />
                  )}
                </div>

                {/* Slot chosen indicator */}
                <div className="bg-black/35 p-3.5 border border-accent-gold/15 rounded-xs space-y-1">
                  <span className="text-[7px] font-mono text-neutral-400 uppercase tracking-widest font-extrabold block">Selected Appointment Slot</span>
                  {consultTimeSlot ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                      <CheckSquare className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>{consultTimeSlot} ({consultDateType === 'quick' ? quickDateSelected : (consultDate || 'No Date Inputted')})</span>
                    </div>
                  ) : (
                    <p className="text-rose-400 text-[9.5px] font-mono font-bold leading-normal italic">
                      ⚠ Please click on any "Select" button on the live availability grid above.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full bg-accent-gold hover:bg-[#B3934B] text-primary-maroon font-mono text-[9.5px] tracking-widest uppercase font-extrabold py-3 shadow-[0_4px_12px_rgba(201,169,97,0.2)] hover:shadow-[0_6px_20px_rgba(201,169,97,0.35)] transition-all cursor-pointer rounded-xs flex items-center justify-center gap-2"
                >
                  {bookingLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin text-primary-maroon" /> Calculating Peer Availability...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Schedule Conference Booking Entry
                    </>
                  )}
                </button>

                {bookingSuccess && (
                  <div className="bg-emerald-950/35 border-l-4 border-emerald-500 p-3 mt-3">
                    <p className="font-mono text-[9px] text-emerald-400 font-bold animate-pulse">
                      ⚡ SUCCESS! REQUEST SUBMITTED TO SECURE LEDGER
                    </p>
                    <p className="text-[8px] text-neutral-300 font-sans mt-0.5 leading-snug">
                      Your pre-submission meeting is registered with Jitsi link ready in your scholar dashboard portal tracking.
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Direct Contact Info card */}
            <div className="bg-primary-maroon border border-accent-gold/20 p-5 rounded-xs text-left">
              <span className="text-[7.5px] font-mono text-[#C9A961]/70 uppercase tracking-widest font-bold block mb-1">Direct Advisor Access</span>
              <h4 className="font-serif-display text-xs font-bold text-white mb-2 leading-tight">Inquire Formal Collaboration Program</h4>
              <p className="text-[9.5px] font-sans text-neutral-300 leading-relaxed mb-3">
                Secure formal, direct mail-channel access holds continuous proof audits. Ensure standard email guidelines are met.
              </p>
              <a 
                href={`mailto:${mentor.email}`}
                className="bg-accent-gold hover:bg-[#B3934B] text-primary-maroon font-mono text-[8px] tracking-widest uppercase font-extrabold text-center py-2 px-3 transition-colors flex items-center justify-center gap-1.5 w-full rounded-xs cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-primary-maroon" /> Direct Advisor Query Email
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
