import { ArrowRight, Globe, Shield, Zap, Users, GraduationCap, ArrowUpRight, Award, MessageSquare, BookOpen, ChevronLeft, ChevronRight, Search, Play, Pause, Video, Volume2, VolumeX, X, Star, Mail } from 'lucide-react';
import { Conference, Mentor, BlogPost } from '../types';
import React, { useState, useEffect, useRef } from 'react';
import { ALL_PARTNERS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { TiltCard } from './TiltCard';
import { FadeUpSection } from './FadeUpSection';
import { CinematicHero } from './CinematicHero';
import { ConferenceCard } from './ConferenceCard';
import { MentorCard } from './MentorCard';

interface HomeViewProps {
  onNavigate: (path: string) => void;
  conferences: Conference[];
  mentors: Mentor[];
  blogs: BlogPost[];
}

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18
    }
  }
};

export default function HomeView({ onNavigate, conferences, mentors, blogs }: HomeViewProps) {
  const conferencesRef = useRef<HTMLDivElement>(null);
  const mentorsRef = useRef<HTMLDivElement>(null);

  const slideLeft = (ref: { current: HTMLDivElement | null }) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const slideRight = (ref: { current: HTMLDivElement | null }) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const [activeTestimony, setActiveTestimony] = useState(0);
  const [homeIsPlaying, setHomeIsPlaying] = useState(false);
  const [homeActiveVideo, setHomeActiveVideo] = useState<'vid1' | 'vid2'>('vid1');
  const [homeIsMuted, setHomeIsMuted] = useState(true);
  const [videoHasError, setVideoHasError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHomeMentor, setSelectedHomeMentor] = useState<Mentor | null>(null);

  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Drag to scroll states
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isHoveredRef = useRef(false);

  // Unified drag start
  const handleDragStart = (pageX: number) => {
    if (!mentorsRef.current) return;
    setIsAutoScrolling(false);
    isDraggingRef.current = true;
    startXRef.current = pageX - mentorsRef.current.offsetLeft;
    scrollLeftRef.current = mentorsRef.current.scrollLeft;
  };

  const handleDragMove = (pageX: number) => {
    if (!isDraggingRef.current || !mentorsRef.current) return;
    const x = pageX - mentorsRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    mentorsRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.pageX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    handleDragMove(e.pageX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].pageX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].pageX);
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handlePrev = () => {
    setIsAutoScrolling(false);
    slideLeft(mentorsRef);
  };

  const handleNext = () => {
    setIsAutoScrolling(false);
    slideRight(mentorsRef);
  };

  useEffect(() => {
    if (!isAutoScrolling) return;

    let animationId: number;
    const speed = 0.55; // Extremely smooth, elegant continuous motion speed

    const scrollStep = () => {
      const el = mentorsRef.current;
      if (!el) {
        animationId = requestAnimationFrame(scrollStep);
        return;
      }

      // Only scroll if the user is not actively interacting
      if (!isHoveredRef.current && !isDraggingRef.current) {
        el.scrollLeft += speed;

        // Continuous wrap-around at half width (since array is duplicated)
        const halfWidth = el.scrollWidth / 2;
        if (halfWidth > 0 && el.scrollLeft >= halfWidth) {
          el.scrollLeft = el.scrollLeft - halfWidth;
        }
      }

      animationId = requestAnimationFrame(scrollStep);
    };

    animationId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationId);
  }, [isAutoScrolling, mentors]);

  useEffect(() => {
    setVideoHasError(false);
  }, [homeActiveVideo, homeIsPlaying]);

  const homeLectures = [
    {
      id: 'vid1' as const,
      title: "01. Post-Quantum Cryptographic Readiness Protocols (ICETCS Lecture)",
      category: "Sovereign Cybersecurity",
      duration: "18:42"
    },
    {
      id: 'vid2' as const,
      title: "02. TinyML Load Prediction Algorithms on Smart Energy Grids",
      category: "Adaptive Systems & ML",
      duration: "24:15"
    }
  ];

  const testimonials = [
    {
      quote: "The pre-peer review formatting service resolved grammatical nuances that saved my PhD submission. RiTECHS is the definitive baseline for high-impact publishing.",
      author: "Dr. Alistair Vance",
      title: "Assistant Professor, University of Wolverhampton",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "My mentor, Prof. Santos, helped me target ML-KEM integration for 6G microgrids. Within four months, our joint manuscript was accepted into Q1 Cybersecurity Journals.",
      author: "Amina Al-Mansoor",
      title: "PhD Candidate, University of Lagos",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "The quality of organizing and the depth of papers presented at AIoT-RSE established an extraordinary reference point for sustainable renewable energy research.",
      author: "Prof. Dr-Ing. Marcus Weber",
      title: "Director, Munich Energy Institute",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimony((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div id="home-view" className="animate-fade-in-up text-neutral-800">
      {/* 1. Cinematic Hero with sliding images */}
      <CinematicHero onNavigate={onNavigate} conferences={conferences} mentors={mentors} />

      {/* 2. Trusted Partners Infinite Auto-scroll Marquee */}
      <FadeUpSection id="partners-marquee" className="bg-primary-navy border-y border-accent-gold/15 py-7 overflow-hidden relative w-full">
        <div className="max-w-6xl mx-auto px-6 mb-2 text-center">
          <p className="text-[10px] font-mono tracking-widest text-accent-gold/60 uppercase">
            Associated Universities & Scholarly Channels
          </p>
        </div>
        
        {/* Infinite marquee block */}
        <div className="flex gap-12 items-center relative select-none w-full">
          <div className="flex gap-16 items-center animate-carousel-scroll whitespace-nowrap min-w-full">
            {[1, 2].map((loopIdx) => (
              <div key={loopIdx} className="flex gap-16 items-center shrink-0">
                {ALL_PARTNERS.map((partner, pIdx) => (
                  <span 
                    key={`${partner.name}-${pIdx}`} 
                    className={`text-white/40 font-serif-display text-base tracking-widest hover:text-accent-gold transition-colors ${
                      pIdx % 2 === 0 ? 'italic' : ''
                    }`}
                  >
                    {partner.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </FadeUpSection>

      {/* 3. Global Impact Stats Grid */}
      <FadeUpSection id="impact-stats" className="py-12 md:py-20 bg-maroon-dark premium-noise border-b border-accent-gold/15 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-2">Scale & Network</h3>
            <h2 className="font-serif-display text-2.5xl sm:text-4.5xl text-white font-light leading-tight tracking-tight">Rigorous Global <span className="font-serif-accent italic text-accent-gold font-normal">Engagement</span></h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "47+", label: "Countries Represented" },
              { value: "1,200+", label: "Expert Mentors" },
              { value: "15,000+", label: "Researchers Served" },
              { value: "98%", label: "Satisfaction Rate" }
            ].map((stat, idx) => (
              <TiltCard key={idx} className="bg-primary-maroon/40 p-6 text-center border border-accent-gold/20 hover:border-accent-gold/50 transition-all duration-300 group premium-card-glow">
                <div className="font-serif-display text-4.5xl sm:text-5xl font-extrabold text-white mb-2 group-hover:text-accent-gold transition-colors">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[#C9A961]/90 font-sans font-medium">
                  {stat.label}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </FadeUpSection>

      {/* 4. Featured Conferences */}
      <FadeUpSection id="featured-conferences" className="py-12 md:py-20 bg-maroon-light premium-noise border-b border-accent-gold/15">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-accent-gold uppercase font-bold bg-[#C9A961]/10 px-3 py-1 border border-accent-gold/25 rounded-full inline-block mb-3 select-none">
                ACADEMIC FORUMS & SCHOLAR PLACEMENTS
              </span>
              <h2 className="font-serif-display text-2.5xl sm:text-4.5xl text-white font-light leading-tight tracking-tight">
                Featured <span className="font-serif-accent italic text-accent-gold font-normal">Conferences</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <div className="flex items-center gap-1.5 mr-1">
                <button
                  onClick={() => slideLeft(conferencesRef)}
                  className="w-8 h-8 rounded-full border border-accent-gold/25 hover:border-accent-gold hover:bg-maroon-dark/80 flex items-center justify-center transition-all bg-maroon-dark/30 text-white shadow-xs cursor-pointer"
                  title="Slide Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => slideRight(conferencesRef)}
                  className="w-8 h-8 rounded-full border border-accent-gold/25 hover:border-accent-gold hover:bg-maroon-dark/80 flex items-center justify-center transition-all bg-maroon-dark/30 text-white shadow-xs cursor-pointer"
                  title="Slide Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => onNavigate("#/conferences")}
                className="text-xs font-sans uppercase tracking-widest font-semibold text-accent-gold hover:text-white flex items-center gap-1.5 group transition-colors cursor-pointer bg-maroon-dark/40 hover:bg-maroon-dark/80 border border-accent-gold/20 px-3 py-1.5 rounded-xs"
              >
                View Hub <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="relative">
            <motion.div 
              ref={conferencesRef}
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-2 -mx-6 px-6 md:mx-0 md:px-0"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {conferences.map((conf) => (
                <motion.div 
                  key={conf.slug} 
                  variants={staggerItemVariants}
                  className="w-[285px] sm:w-[335px] shrink-0 scroll-snap-align-start"
                >
                  <ConferenceCard 
                    conf={conf}
                    onNavigate={onNavigate}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </FadeUpSection>

      {/* 5. Mentor Spotlight */}
      <FadeUpSection id="mentor-spotlight" className="py-12 md:py-20 bg-primary-maroon relative border-y border-accent-gold/15 overflow-hidden premium-noise">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-accent-gold uppercase font-bold bg-[#C9A961]/10 px-3 py-1 border border-accent-gold/25 rounded-full inline-block mb-3 select-none">
                PEER GUIDANCE DIRECTORY // ESTABLISHED FACULTY
              </span>
              <h2 className="font-serif-display text-2.5xl sm:text-4.5xl text-white font-light leading-tight tracking-tight">
                Popular <span className="font-serif-accent italic text-accent-gold font-normal">Mentor Spotlight</span>
              </h2>
            </div>
            
            {/* Professional Interactive Control Deck */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 select-none">
              {/* Option Selector: Auto vs Manual */}
              <div className="flex items-center gap-1.5 bg-maroon-dark/90 border border-accent-gold/20 p-1 rounded-full shadow-lg">
                <button
                  type="button"
                  onClick={() => setIsAutoScrolling(true)}
                  className={`px-3 py-1.5 text-[8.5px] font-mono uppercase tracking-wider rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    isAutoScrolling 
                      ? 'bg-accent-gold text-primary-maroon font-bold shadow-md' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isAutoScrolling ? 'bg-primary-maroon animate-pulse' : 'bg-neutral-500'}`} />
                  Sliding Auto-Loop
                </button>
                <button
                  type="button"
                  onClick={() => setIsAutoScrolling(false)}
                  className={`px-3 py-1.5 text-[8.5px] font-mono uppercase tracking-wider rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    !isAutoScrolling 
                      ? 'bg-accent-gold text-primary-maroon font-bold shadow-md' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Interactive Deck
                </button>
              </div>

              {/* Step Navigation Arrows */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full border border-accent-gold/30 hover:border-accent-gold hover:bg-white/5 text-accent-gold hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95"
                  title="Previous Mentor"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full border border-accent-gold/30 hover:border-accent-gold hover:bg-white/5 text-accent-gold hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95"
                  title="Next Mentor"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="h-6 w-px bg-accent-gold/20 hidden sm:block" />

              <button
                onClick={() => onNavigate("#/mentors")}
                className="text-[10px] font-sans uppercase tracking-widest font-semibold text-accent-gold hover:text-white flex items-center gap-1.5 group transition-all duration-300 bg-white/5 hover:bg-white/10 border border-accent-gold/30 px-3.5 py-1.5 rounded-xs cursor-pointer"
              >
                Full Registry <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Sliding Marquee / Interactive Track Container */}
        <div 
          className="relative w-full overflow-hidden py-4 bg-maroon-dark/65 border-y border-accent-gold/10"
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { isHoveredRef.current = false; handleMouseUpOrLeave(); }}
        >
          <motion.div 
            ref={mentorsRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUpOrLeave}
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth w-full px-6 select-none cursor-grab active:cursor-grabbing"
          >
            {[...mentors, ...mentors].map((mentor, index) => (
              <motion.div 
                key={`${mentor.id}-slide-${index}`} 
                variants={staggerItemVariants}
                className="w-[250px] sm:w-[290px] shrink-0 transform hover:scale-[1.02] transition-transform duration-300"
              >
                <MentorCard 
                  mentor={mentor}
                  isDark={true}
                  className="border-accent-gold/20"
                  onClick={() => onNavigate(`#/mentor-common-view/${mentor.id}`)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </FadeUpSection>

      {/* Interactive Academic Broadcast Lectures Showcase */}
      <FadeUpSection id="academic-transmissions" className="py-12 md:py-20 bg-maroon-dark premium-noise border-y border-accent-gold/15 w-full text-left">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-2">SCHOLASTIC BROADCASTS</h3>
            <h2 className="font-serif-display text-2.5xl sm:text-4xl text-white font-light leading-tight">Virtual <span className="font-serif-accent italic text-accent-gold font-normal">Symposium</span> & Lecture Screenings</h2>
            <p className="text-neutral-300 text-xs sm:text-sm font-light max-w-2xl mx-auto mt-2">
              Preview our premium digital curricula and recorded keynotes. Click any lecture on the sidebar to load the real-time scholar feed from our active peer training chapters.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-primary-maroon border border-accent-gold/25 p-4 sm:p-6 shadow-[0_15px_40px_rgba(3,10,23,0.25)] relative overflow-hidden text-white">
            {/* Corner styling lines */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent-gold/40" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent-gold/40" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent-gold/40" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent-gold/40" />

            {/* Main Interactive Player Box */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="aspect-video bg-charcoal/95 border border-primary-navy/10 relative overflow-hidden flex items-center justify-center rounded-sm group">
                {homeIsPlaying ? (
                  videoHasError ? (
                    <div className="absolute inset-0 bg-[#05122b] flex flex-col justify-between p-6 sm:p-8 select-none font-mono text-[11px] leading-relaxed border border-accent-gold/20 animate-fade-in text-white/90">
                      {/* Top status bar */}
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 bg-accent-gold rounded-full animate-ping shrink-0" />
                          <span className="text-accent-gold font-bold uppercase tracking-wider text-[10px]">
                            CARRIER SYNC ACTIVE // DIGITAL COURSEWARE STREAM
                          </span>
                        </div>
                        <div className="text-white/40 uppercase tracking-widest text-[9px]">
                          SECURE SEC_ID: {homeActiveVideo === 'vid1' ? 'Q-LAT-09' : 'T-ML-55'}
                        </div>
                      </div>

                      {/* Middle audio and telemetry visualizer */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-auto items-center">
                        <div className="md:col-span-5 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                          <span className="text-[9px] uppercase tracking-widest text-white/50 block mb-1.5 font-bold">
                            Active Frequency Carrier
                          </span>
                          {/* Dancing Waveform Visualizer */}
                          <div className="flex items-end gap-1.5 h-14 mb-4">
                            {[0.4, 0.75, 0.3, 0.9, 0.5, 0.8, 0.25, 0.65, 0.85, 0.45, 0.6].map((h, i) => (
                              <div
                                key={i}
                                className="w-1 bg-accent-gold rounded-full animate-bounce"
                                style={{
                                  height: `${h * 100}%`,
                                  animationDuration: `${0.9 + i * 0.12}s`,
                                  animationDelay: `${i * 0.08}s`
                                }}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-accent-gold/80 italic font-serif-accent font-light">
                            "Muted listening mode active"
                          </span>
                        </div>

                        <div className="md:col-span-1 border-r border-white/5 h-16 hidden md:block" />

                        {/* Telemetry data box */}
                        <div className="md:col-span-6 text-left flex flex-col gap-1.5 text-white/70 overflow-hidden">
                          <div>
                            <span className="text-white/40 select-none font-bold">LECTURE: </span>
                            <span className="text-white font-medium">
                              {homeActiveVideo === 'vid1' 
                                ? 'Post-Quantum Cryptographic Readiness Protocols' 
                                : 'TinyML Load Prediction on Smart Energy Grids'
                              }
                            </span>
                          </div>
                          <div>
                            <span className="text-white/40 select-none font-bold">CHAPTER: </span>
                            <span className="text-accent-gold">
                              {homeActiveVideo === 'vid1' ? 'Sovereign Cybersecurity Advisory' : 'Autonomous Microgrids & ML'}
                            </span>
                          </div>
                          <div>
                            <span className="text-white/40 select-none font-bold">SCHOLAR: </span>
                            <span>
                              {homeActiveVideo === 'vid1' ? 'Dr. Alistair J. Evans (Scientific Chair)' : 'Prof. Maria Santos'}
                            </span>
                          </div>
                          <div className="text-[9px] text-white/30 truncate mt-1">
                            LOG // SYNCING ENCRYPTION MATRIX // VERIFIED COMPILATION
                          </div>
                        </div>
                      </div>

                      {/* Bottom action bar */}
                      <div className="bg-[#0b1b36] border border-white/5 rounded px-4 py-2.5 flex justify-between items-center text-[10px]">
                        <span className="text-white/50">
                          {homeActiveVideo === 'vid1' ? 'STREAM OFFSET 18:42 Min' : 'STREAM OFFSET 24:15 Min'}
                        </span>
                        <a 
                          href={homeActiveVideo === 'vid1' 
                            ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' 
                            : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-gold underline hover:text-white transition-colors uppercase font-bold tracking-wider"
                          title="Open native stream in a new tab"
                        >
                          Bypass Sandbox & Open Stream ↗
                        </a>
                      </div>
                    </div>
                  ) : (
                    <video
                      key={homeActiveVideo}
                      src={homeActiveVideo === 'vid1' ? '/video 1.mp4' : '/video 2.mp4'}
                      className="w-full h-full object-cover z-0 animate-fade-in"
                      playsInline
                      autoPlay
                      controls={false}
                      muted={homeIsMuted}
                      onEnded={() => setHomeIsPlaying(false)}
                      onError={(e) => {
                        const video = e.currentTarget;
                        const fallbackUrl = homeActiveVideo === 'vid1'
                          ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
                          : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';
                        if (video.src !== fallbackUrl) {
                          video.src = fallbackUrl;
                          video.load();
                          video.play().catch(() => {});
                        } else {
                          setVideoHasError(true);
                        }
                      }}
                      id="homepage-academic-video"
                    />
                  )
                ) : (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={homeActiveVideo === 'vid1' 
                        ? 'https://images.unsplash.com/photo-1639322537228-f710d846310a' 
                        : 'https://images.unsplash.com/photo-1466611653911-95081537e5b7'
                      }
                      alt="Seminar Poster Frame"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-[40%] contrast-110 blur-xs"
                    />
                  </div>
                )}

                {/* Overlays / Play trigger button */}
                {!homeIsPlaying && (
                  <button
                    onClick={() => setHomeIsPlaying(true)}
                    className="w-16 h-16 rounded-full bg-accent-gold text-primary-maroon flex items-center justify-center shadow-2xl z-10 transition-transform duration-300 hover:scale-108 focus:outline-none cursor-pointer"
                    title="Click to Stream Lecture"
                    id="home-play-video-trigger"
                  >
                    <Play className="w-8 h-8 fill-current translate-x-0.5" />
                  </button>
                )}

                {homeIsPlaying && (
                  <div 
                    onClick={() => setHomeIsPlaying(false)}
                    className="absolute inset-0 cursor-pointer z-10 flex items-center justify-center bg-black/10 opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center">
                      <Pause className="w-6 h-6 fill-current" />
                    </div>
                  </div>
                )}

                {/* Live Transmission Badge */}
                <div className="absolute top-4 left-4 z-20 bg-[#030a17]/85 border border-accent-gold/20 backdrop-blur-md px-3 py-1 font-mono text-[9px] text-accent-gold uppercase tracking-[0.2em] flex items-center gap-2 select-none shadow-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </span>
                  <span>{homeIsPlaying ? "Transmission Stream Active" : "Stream Suspended"}</span>
                </div>

                {/* Mute switcher */}
                {homeIsPlaying && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setHomeIsMuted(!homeIsMuted);
                    }}
                    className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-[#030a17]/70 text-white border border-white/10 flex items-center justify-center hover:bg-accent-gold hover:text-primary-navy transition-colors focus:outline-none"
                    title={homeIsMuted ? "Unmute Audio" : "Mute Audio"}
                  >
                    {homeIsMuted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
                  </button>
                )}
              </div>

              {/* Status footer with metadata */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-neutral-300 uppercase bg-maroon-dark/60 p-3 border border-accent-gold/20 rounded-xs select-none">
                <div className="flex items-center gap-2 text-white">
                  <Video className="w-4 h-4 text-accent-gold" />
                  <span>PREVIEW: {homeActiveVideo === 'vid1' ? 'POST-QUANTUM READY CRYPTO' : 'TINYML LOAD PREDICTION FOR 6G'}</span>
                </div>
                <div className="text-accent-gold tracking-widest font-bold">
                  {homeIsPlaying ? "1080P SCHOLASTIC CAPTURE" : "INTERACTIVE DEMO"}
                </div>
              </div>
            </div>

            {/* Sidebar list */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent-gold border-b border-accent-gold/20 pb-2 select-none">
                Transmitted Lessons ({homeLectures.length})
              </div>

              <div className="flex flex-col gap-2">
                {homeLectures.map((lecture) => {
                  const isActive = homeActiveVideo === lecture.id;
                  return (
                    <button
                      key={lecture.id}
                      onClick={() => {
                        setHomeActiveVideo(lecture.id);
                        setHomeIsPlaying(true);
                      }}
                      className={`text-left p-4 border transition-all duration-300 flex flex-col gap-1.5 relative group cursor-pointer ${
                        isActive 
                          ? 'bg-maroon-dark border-accent-gold text-white' 
                          : 'bg-primary-maroon/40 border-accent-gold/15 hover:bg-[#601421]/45 hover:border-accent-gold/30 text-neutral-200'
                      }`}
                      id={`home-video-btn-${lecture.id}`}
                    >
                      {isActive && (
                        <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-accent-gold rounded-bl-sm" />
                      )}
                      <div className={`text-[9px] font-mono uppercase tracking-[0.15em] ${isActive ? 'text-accent-gold font-bold' : 'text-accent-gold/80'}`}>
                        {lecture.category}
                      </div>
                      <div className="text-[11px] font-bold leading-snug font-serif-display font-medium">
                        {lecture.title}
                      </div>
                      <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 group-hover:text-amber-300 transition-colors mt-2">
                        <span>Duration: {lecture.duration}</span>
                        {isActive && homeIsPlaying ? (
                          <span className="text-green-400 font-bold uppercase animate-pulse flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> PLAYING
                          </span>
                        ) : (
                          <span className="text-accent-gold font-sans font-semibold">Preview ➔</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => onNavigate('#/dashboard')}
                className="mt-4 w-full bg-maroon-dark hover:bg-accent-gold text-white hover:text-primary-maroon py-3 px-4 font-sans font-bold uppercase tracking-widest text-[9px] border border-accent-gold/25 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Enter Student Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </FadeUpSection>

      {/* 6. Service Overviews */}
      <FadeUpSection id="services-overview" className="py-16 bg-primary-maroon text-white premium-noise relative w-full border-t border-accent-gold/15">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-2">Solutions & Support</h3>
            <h2 className="font-serif-display text-2.5xl sm:text-3.5xl font-light leading-tight mb-4">
              Our Academic <span className="font-serif-accent italic text-accent-gold font-normal">Pillars</span>
            </h2>
            <p className="text-white/75 text-sm font-light leading-relaxed font-serif-accent italic">
              "Fostering continuous research capability, language precision, and global publication strategy."
            </p>
          </div>

          <motion.div 
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <GraduationCap className="w-8 h-8 text-accent-gold" />,
                title: "Scholastic e-Learning",
                desc: "High-grade specialized video curricula on post-quantum protocols, TinyML load forecasting, and journal technical writing standards.",
                btnText: "Take Free Courses"
              },
              {
                icon: <Shield className="w-8 h-8 text-accent-gold" />,
                title: "Publication Support",
                desc: "Rigorous language polishing, professional formatting, and logic assessments tailored to eliminate over 30% of editorial denials.",
                btnText: "Upload Manuscript"
              },
              {
                icon: <Users className="w-8 h-8 text-accent-gold" />,
                title: "Elite Mentorship",
                desc: "Private matchmaking pathways linking PhD candidates and university professors with industry advisors across three continents.",
                btnText: "Register as Mentee"
              }
            ].map((srv, idx) => (
              <motion.div key={idx} variants={staggerItemVariants}>
                <TiltCard 
                  className="bg-white/5 border border-white/10 p-8 flex flex-col hover:border-accent-gold/40 group text-left h-full premium-card-glow animate-none"
                >
                  <div className="mb-6">{srv.icon}</div>
                  <h3 className="font-serif-display text-xl text-white font-medium mb-4">{srv.title}</h3>
                  <p className="text-white/70 text-xs leading-relaxed font-light mb-8">{srv.desc}</p>
                  <button
                    onClick={() => onNavigate("#/services")}
                    className="mt-auto text-left text-xs font-sans uppercase tracking-widest text-accent-gold hover:text-white font-semibold flex items-center gap-2 group transition-colors cursor-pointer"
                  >
                    {srv.btnText}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </FadeUpSection>

      {/* 7. Comprehensive Testimonial Carousel */}
      <FadeUpSection id="testimonials" className="py-12 md:py-20 bg-primary-maroon relative border-y border-accent-gold/15 w-full overflow-hidden premium-noise text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <MessageSquare className="w-8 h-8 text-accent-gold/40 mx-auto mb-4" />
          
          <div className="min-h-[180px] sm:min-h-[140px] flex items-center justify-center relative my-2 px-4 sm:px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimony}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center"
              >
                <p className="font-serif-accent text-lg sm:text-2xl italic text-neutral-100 leading-relaxed font-normal mb-8 max-w-3xl">
                  "{testimonials[activeTestimony].quote}"
                </p>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-accent-gold/40 mb-3 bg-charcoal/10 shadow-md">
                    <img 
                      src={testimonials[activeTestimony].image} 
                      alt={testimonials[activeTestimony].author} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-serif-display text-base font-bold text-accent-gold leading-tight">
                    {testimonials[activeTestimony].author}
                  </h4>
                  <p className="text-[10px] uppercase tracking-widest font-mono text-neutral-300 mt-1.5 font-medium">
                    {testimonials[activeTestimony].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimony(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeTestimony === idx ? 'bg-accent-gold w-5' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </FadeUpSection>

      {/* 8. Editorial News Spotlight */}
      <FadeUpSection id="editorial-news" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-2">Editorial Desk</h3>
              <h2 className="font-serif-display text-2.5xl sm:text-3.5xl text-primary-navy font-light">
                Litterae & <span className="font-serif-accent italic text-accent-gold font-normal">Gazette</span>
              </h2>
            </div>
            <button
              onClick={() => onNavigate("#/blog")}
              className="mt-4 md:mt-0 text-xs font-sans uppercase tracking-widest font-semibold text-accent-gold hover:text-primary-navy flex items-center gap-2 group transition-colors cursor-pointer"
            >
              Browse Magazine <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {blogs.filter((b) => b.featured).map((post) => (
              <div 
                key={post.id}
                className="flex flex-col gap-6 group cursor-pointer"
                onClick={() => onNavigate("#/blog")}
              >
                <div className="aspect-[16/9] overflow-hidden border border-divider-gold/40">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-4 text-xs font-mono text-accent-gold uppercase mb-3">
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-serif-display text-2xl sm:text-3xl text-primary-navy font-bold leading-tight mb-4 group-hover:text-accent-gold transition-colors text-left font-serif-display">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-gray leading-relaxed font-light text-left">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-8 justify-between">
              {blogs.filter((b) => !b.featured).slice(0, 3).map((post) => (
                <div 
                  key={post.id} 
                  className="flex gap-4 sm:gap-6 group cursor-pointer"
                  onClick={() => onNavigate("#/blog")}
                >
                  <div className="w-24 sm:w-32 aspect-square shrink-0 overflow-hidden border border-divider-gold/30">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center text-left">
                    <span className="text-[10px] font-mono text-accent-gold uppercase mb-1">{post.category}</span>
                    <h4 className="font-serif-display text-base sm:text-lg text-primary-navy font-semibold mb-2 group-hover:text-accent-gold transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-muted-gray font-light line-clamp-1">{post.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeUpSection>

      {/* 8.5. Our Trusted Partners Directory Section */}
      <FadeUpSection id="trusted-partners-directory" className="py-12 md:py-20 bg-neutral-warm border-t border-accent-gold/15 text-stone-900 select-none">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h3 className="text-xs font-mono tracking-widest text-[#9c2535] uppercase mb-2">Academic Alliance</h3>
            <h2 className="font-serif-display text-2.5xl sm:text-4.5xl text-primary-navy font-light leading-tight tracking-tight mb-4">
              Our Trusted <span className="font-serif-accent italic text-accent-gold font-normal">Partners</span>
            </h2>
            <p className="text-muted-gray text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-light">
              We collaborate with premier universities, publishing networks, and enterprise cybersecurity research groups around the world. These alliances validate, co-host, and index our peer-vetted papers.
            </p>
          </div>

          {/* Interactive Search for Partners */}
          <div className="max-w-md mx-auto mb-10 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#9c2535] opacity-60 animate-pulse" />
            </div>
            <input 
              type="text" 
              placeholder="Filter partner institutions by name..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-3 bg-white text-stone-900 border border-accent-gold/40 focus:border-[#9c2535] focus:outline-none placeholder-stone-400 text-xs tracking-wide rounded-xs transition-all shadow-xs"
            />
          </div>

          <motion.div 
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {ALL_PARTNERS.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((partner, pIdx) => (
              <motion.div key={`${partner.name}-${pIdx}`} variants={staggerItemVariants}>
                <a 
                  href={partner.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white hover:bg-white text-stone-850 hover:text-primary-navy border border-stone-200 hover:border-accent-gold/70 p-5 rounded-xs transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md flex flex-col justify-between group h-full"
                >
                  <div>
                    <div className="w-8 h-8 rounded-full bg-primary-navy/5 flex items-center justify-center mb-4 group-hover:bg-[#9c2535]/10 transition-colors">
                      <span className="font-serif-display text-xs font-black text-[#9c2535] group-hover:text-[#9c2535]">
                        {partner.name.charAt(0)}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold leading-snug tracking-wider uppercase font-sans line-clamp-2">
                      {partner.name}
                    </h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[9px] font-mono tracking-widest text-[#9c2535]/75 font-semibold group-hover:text-[#9c2535]">
                    <span>VISIT PORTAL</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#9c2535] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>

          {ALL_PARTNERS.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
            <div className="text-center py-12 text-stone-400 text-xs font-mono select-none">
              No coordinating partner found matching "{searchTerm}"
            </div>
          )}
        </div>
      </FadeUpSection>

      {/* 9. Join The Network Banner CTA */}
      <FadeUpSection id="banner-cta" className="border-t border-accent-gold/25 py-12 md:py-20 text-center text-white overflow-hidden relative w-full bg-primary-navy">
        {/* Background Premium Banner 5 */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/banner 5.png" 
            alt="Corporate Banner 5" 
            className="w-full h-full object-cover opacity-100"
            onError={(e) => {
              const el = e.currentTarget;
              const bkp = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600";
              if (el.src !== bkp) {
                el.src = bkp;
              } else {
                el.style.display = 'none';
              }
            }}
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <div className="relative group p-1 bg-[#102447]/90 border-2 border-accent-gold/45 rounded-sm shadow-xl transition-transform duration-300 hover:scale-105">
              <img 
                src="/logo.png" 
                alt="RiTECHS Logo" 
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  // If space or path issue causes fallback, display block nicely or use text
                }}
              />
            </div>
          </div>
          <h2 className="font-serif-display text-2.5xl sm:text-4xl font-bold mb-4">
            Begin Your Journey to Excellence
          </h2>
          <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6 max-w-xl mx-auto font-light font-serif-accent italic">
            "We foster critical support for ambitious academics targeting global reach. Create your free account to access mentorship, courseware, and pre-submission proofs."
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate("#/login?mode=register")}
              className="bg-accent-gold hover:bg-[#B3934B] text-primary-navy font-sans uppercase tracking-widest text-xs font-semibold px-8 py-3.5 transition-all duration-300 shadow-md cursor-pointer"
              id="cta-register-bottom"
            >
              Configure Student/Mentor Account
            </button>
            <button
              onClick={() => onNavigate("#/about")}
              className="text-white hover:text-accent-gold underline text-xs font-sans uppercase tracking-widest font-mono py-2 cursor-pointer"
            >
              Verify RiTECHS Status & Governance
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4 justify-center items-center text-[10px] font-mono tracking-wider">
            <span className="text-white/40">OFFICIAL DOCUMENTS //</span>
            <a 
              href="https://ritechs.org/uploads/1779448778.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-accent-gold hover:text-white transition-colors flex items-center gap-1.5 font-bold"
            >
              Download CFP PDF
            </a>
            <span className="text-white/20">|</span>
            <a 
              href="https://ritechs.org/uploads" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-accent-gold hover:text-white transition-colors flex items-center gap-1.5 font-bold"
            >
              Explore Uploads Directory
            </a>
          </div>
        </div>
      </FadeUpSection>

      {/* 🏅 Mentor Details Modal Overlay inside HomeView */}
      <AnimatePresence>
        {selectedHomeMentor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 cursor-pointer" 
              onClick={() => setSelectedHomeMentor(null)} 
            />
            
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="bg-[#2D060A] w-full max-w-2xl rounded-sm shadow-2xl relative z-10 flex flex-col border border-accent-gold/40 text-white overflow-hidden max-h-[92vh]"
            >
              {/* Top Bar Header */}
              <div className="bg-white px-5 py-4 text-black border-b border-accent-gold/25 flex justify-between items-center premium-noise shrink-0">
                <div className="text-left">
                  <span className="text-[7.5px] font-mono font-bold text-primary-maroon uppercase tracking-widest bg-primary-maroon/10 px-2 py-0.5 border border-primary-maroon/20">
                    ID: EM-{String(selectedHomeMentor.id).padStart(3, '0')} // ADVISOR INQUIRY BOARD
                  </span>
                  <h2 className="font-serif-display text-lg sm:text-xl font-bold mt-1 text-black leading-tight">
                    {selectedHomeMentor.name}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedHomeMentor(null)}
                  className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer text-black"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable grid content */}
              <div className="p-5 overflow-y-auto flex-grow bg-[#200306] space-y-4 text-left">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                  
                  {/* Left Column (Metadata) */}
                  <div className="md:col-span-5 flex flex-col gap-4">
                    <div className="bg-primary-maroon border border-accent-gold/20 p-3 relative overflow-hidden flex flex-row items-center gap-3">
                      <div className="absolute top-0 right-0 w-12 h-12 bg-accent-gold/5 rounded-bl-full pointer-events-none" />
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xs overflow-hidden border border-accent-gold/25 shrink-0 shadow-sm">
                        <img 
                          src={selectedHomeMentor.image} 
                          alt={selectedHomeMentor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-grow">
                        <span className="text-[7px] font-mono tracking-widest text-[#C9A961] uppercase font-bold px-1.5 py-0.5 bg-[#C9A961]/10 rounded-sm inline-block mb-1">
                          {selectedHomeMentor.role || 'mentor'}
                        </span>
                        <h4 className="font-serif-display text-xs font-bold text-white leading-tight mb-0.5 truncate" title={selectedHomeMentor.university}>
                          {selectedHomeMentor.university}
                        </h4>
                        <p className="text-[8.5px] text-neutral-300 uppercase tracking-widest font-mono font-bold">{selectedHomeMentor.country}</p>
                        
                        <div className="flex items-center gap-1.5 font-mono text-[7.5px] text-accent-gold mt-1 font-bold">
                          <Star className="w-2.5 h-2.5 text-accent-gold fill-accent-gold shrink-0" />
                          <span>{selectedHomeMentor.rating} RATING INDEX</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-maroon-light/30 border border-accent-gold/15 p-2.5 rounded-xs flex flex-col gap-1.5">
                      <span className="text-[7.5px] font-mono text-accent-gold/70 uppercase tracking-wider font-bold">Inquire Immediately</span>
                      <a 
                        href={`mailto:${selectedHomeMentor.email}`} 
                        className="bg-accent-gold hover:bg-[#B3934B] text-primary-maroon font-mono text-[7.5px] tracking-widest uppercase font-bold text-center py-1.5 px-2.5 transition-colors flex items-center justify-center gap-1 w-full animate-pulse"
                      >
                        <Mail className="w-3 h-3 text-primary-maroon" /> Send Email Direct
                      </a>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-serif-display text-[9px] font-bold tracking-widest uppercase text-accent-gold border-b border-accent-gold/15 pb-1">
                        Peer Directives & Scope
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedHomeMentor.fields.map((f, i) => (
                          <span key={i} className="text-[7px] font-mono tracking-wider uppercase bg-primary-maroon border border-accent-gold/15 px-1.5 py-0.5 text-accent-gold font-bold">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="md:col-span-7 flex flex-col gap-4">
                    <div>
                      <h4 className="font-serif-display text-[9px] font-bold tracking-widest uppercase text-accent-gold border-b border-accent-gold/15 pb-1 mb-1">
                        Academic Biography
                      </h4>
                      <p className="text-[10px] sm:text-[11.5px] text-neutral-200 leading-relaxed font-light font-sans max-h-36 overflow-y-auto pr-1">
                        {selectedHomeMentor.bio}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-serif-display text-[9px] font-bold tracking-widest uppercase text-accent-gold border-b border-accent-gold/15 pb-1 mb-1.5 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-accent-gold" /> Indexed Publications
                      </h4>
                      <div className="flex flex-col gap-1 font-mono text-[8px] text-neutral-200 leading-tight max-h-[120px] overflow-y-auto pr-1">
                        {selectedHomeMentor.publications.map((p, i) => (
                          <div key={i} className="flex gap-1.5 items-start bg-primary-maroon p-1 border-l border-accent-gold border border-accent-gold/15">
                            <Award className="w-2.5 h-2.5 text-accent-gold shrink-0 mt-0.5" />
                            <span className="truncate whitespace-normal text-left" title={p}>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer Link redirecting to general listing workspace */}
                <div className="border-t border-accent-gold/20 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#2D060A]/40 -mx-5 -mb-5 p-5 mt-2 gap-3">
                  <p className="text-[9px] text-neutral-300 max-w-sm leading-tight font-sans">
                    Want to consult peer frameworks, leave student reviews, or hold a formal presentation audit with {selectedHomeMentor.name}?
                  </p>
                  <button
                    onClick={() => {
                      setSelectedHomeMentor(null);
                      onNavigate(`#/mentors?mentorId=${selectedHomeMentor.id}`);
                    }}
                    className="bg-accent-gold hover:bg-[#B3934B] text-primary-maroon text-[9px] font-mono tracking-widest uppercase font-extrabold px-3.5 py-2 transition-all shrink-0 rounded-xs flex items-center gap-1 cursor-pointer"
                  >
                    Open Scholar Booking Panel <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
