import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Search, Sparkles } from 'lucide-react';
import { Conference, Mentor } from '../types';

interface CinematicHeroProps {
  onNavigate: (path: string) => void;
  conferences: Conference[];
  mentors: Mentor[];
}

export function CinematicHero({ onNavigate, conferences, mentors }: CinematicHeroProps) {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<number>(0); // -1 for left, 1 for right
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [failedBanners, setFailedBanners] = useState<Record<number, boolean>>({});

  const heroImages = [
    {
      localUrl: "/banner 1.0.png",
      url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600",
      label: "Oxford Research Quadrangle — Historical Academic Campus",
      caption: "Connecting traditional classical scholarship with modern computational publishing breakthroughs."
    },
    {
      localUrl: "/banner 1.png",
      url: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1600",
      label: "Genoa Advanced Computational Laboratory — Security Systems",
      caption: "Securing modern autonomous architectures, edge networks, and peer publication formats."
    },
    {
      localUrl: "/banner 3.png",
      url: "https://images.unsplash.com/photo-1491841573176-0aa59e4b67ad?auto=format&fit=crop&q=80&w=1600",
      label: "Wolverhampton Scholastic Commons — Training Forums",
      caption: "Empowering next-generation researchers with hands-on accredited online curricula."
    },
    {
      localUrl: "/banner 4.png",
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
      label: "Munich Distributed Data Infrastructure — Cloud Projects",
      caption: "Implementing renewable microgrid load balancing diagnostics and energy telemetry."
    },
    {
      localUrl: "/banner 5.png",
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600",
      label: "Cambridge Digital Innovation Hub — Green Computing",
      caption: "Deploying high-reliability embedded system architectures for decentralized academic forums."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideDirection(1);
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handleNextHero = () => {
    setSlideDirection(1);
    setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
  };

  const handlePrevHero = () => {
    setSlideDirection(-1);
    setCurrentHeroImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const jumpToHero = (idx: number) => {
    setSlideDirection(idx > currentHeroImage ? 1 : -1);
    setCurrentHeroImage(idx);
  };

  // Grouped search query filtration
  const getFilteredResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results: Array<{
      type: 'conference' | 'mentor' | 'service';
      title: string;
      subtitle: string;
      link: string;
    }> = [];

    // 1. Match Conferences
    conferences.forEach(c => {
      if (c.name.toLowerCase().includes(query) || c.fullName.toLowerCase().includes(query) || c.location.toLowerCase().includes(query)) {
        results.push({
          type: 'conference',
          title: c.name,
          subtitle: `${c.fullName} (${c.location})`,
          link: `#/conferences/${c.slug}`
        });
      }
    });

    // 2. Match Mentors
    mentors.forEach(m => {
      const matchFields = m.fields.some(f => f.toLowerCase().includes(query));
      if (m.name.toLowerCase().includes(query) || m.university.toLowerCase().includes(query) || m.country.toLowerCase().includes(query) || matchFields) {
        results.push({
          type: 'mentor',
          title: m.name,
          subtitle: `${m.university} • Specialized in ${m.fields.slice(0, 2).join(', ')}`,
          link: `#/mentors`
        });
      }
    });

    // 3. Match Services
    const customServices = [
      { name: "Academic Editing Service", desc: "optimal conclusive impact narrative restructuring Vetting" },
      { name: "Proofreading & Grammar Sanity", desc: "typographical misspellings errors missed punctuation sentence flow" },
      { name: "Academic Formatting & Styling", desc: "IEEE Springer ACM columns margins tables LaTeX templates" },
      { name: "Academic Poster Presentation Support", desc: "PowerPoint Publisher Photoshop editable visual speech notes drafts" },
      { name: "Online Scholar Training Courses", desc: "vulnerability scanning load forecasting peer review LaTeX mastery" }
    ];

    customServices.forEach(s => {
      if (s.name.toLowerCase().includes(query) || s.desc.toLowerCase().includes(query)) {
        results.push({
          type: 'service',
          title: s.name,
          subtitle: "RiTECHS Peer Publication & Academic Training Support",
          link: `#/services`
        });
      }
    });

    return results.slice(0, 5); // Return top 5 matches
  };

  const searchResults = getFilteredResults();

  return (
    <section 
      id="hero-section"
      className="relative min-h-[80vh] flex items-center justify-center bg-primary-navy overflow-hidden premium-noise pt-12 pb-8"
    >
      {/* Sliding background images with elegant slow scale and cross-fade transitions */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <AnimatePresence initial={false} custom={slideDirection}>
          <motion.div
            key={currentHeroImage}
            custom={slideDirection}
            variants={{
              enter: (direction: number) => ({
                opacity: 0,
                scale: 1.05,
                filter: "blur(4px) brightness(30%)",
                x: direction > 0 ? 50 : -50,
              }),
              center: {
                opacity: 0.65,
                scale: 1,
                filter: "blur(0px) brightness(65%)",
                x: 0,
                transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] }
              },
              exit: (direction: number) => ({
                opacity: 0,
                scale: 0.96,
                filter: "blur(4px) brightness(30%)",
                x: direction < 0 ? 50 : -50,
                transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] }
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={heroImages[currentHeroImage].localUrl}
              alt={heroImages[currentHeroImage].label}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const el = e.currentTarget;
                const bkp = heroImages[currentHeroImage].url;
                if (el.src !== bkp) {
                  el.src = bkp;
                } else {
                  el.onerror = null;
                  el.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='100%25' height='100%25' fill='%230A1F44'/%3E%3C/svg%3E";
                }
              }}
              className="w-full h-full object-cover select-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Shimmer / Color overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030a17]/95 via-primary-navy/90 to-[#030a17] z-10" />
        
        {/* Subtle architectural grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C9A96105_1px,transparent_1px),linear-gradient(to_bottom,#C9A96105_1px,transparent_1px)] bg-[size:4rem_4rem] z-10" />
      </div>

      {/* Ambient background active metadata tag */}
      <div className="absolute bottom-4 left-6 z-20 hidden lg:block select-text font-mono text-[9px] tracking-[0.2em] text-accent-gold/50 uppercase">
        <span className="text-white/40 mr-2">LOCATION //</span> {heroImages[currentHeroImage].label}
      </div>

      {/* Active slider status timeline progress timer */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-20 overflow-hidden">
        <motion.div 
          key={currentHeroImage}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 7.5, ease: "linear" }}
          className="h-full bg-gradient-to-r from-accent-gold/45 via-accent-gold to-accent-gold/45 shadow-[0_0_8px_#C9A961]"
        />
      </div>

      {/* Previous and Next Slide Arrow overlays */}
      <div className="absolute inset-y-0 left-6 right-6 z-20 flex justify-between items-center pointer-events-none">
        <button
          onClick={handlePrevHero}
          className="w-10 h-10 rounded-full border border-white/10 hover:border-accent-gold hover:bg-white/5 flex items-center justify-center transition-all duration-300 pointer-events-auto backdrop-blur-xs group shadow-lg"
          title="Previous Background Slide"
        >
          <ChevronLeft className="w-4 h-4 text-white/50 group-hover:text-accent-gold transition-colors" />
        </button>
        <button
          onClick={handleNextHero}
          className="w-10 h-10 rounded-full border border-white/10 hover:border-accent-gold hover:bg-white/5 flex items-center justify-center transition-all duration-300 pointer-events-auto backdrop-blur-xs group shadow-lg"
          title="Next Background Slide"
        >
          <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-accent-gold transition-colors" />
        </button>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white py-6 flex flex-col items-center">
        {/* Badge with pulse accent */}
        <div className="inline-flex items-center gap-2 border border-accent-gold/30 bg-accent-gold/10 px-3.5 py-1.5 rounded-full text-[9px] font-mono tracking-[0.2em] text-accent-gold mb-6 uppercase animate-fade-in shadow-xl select-none">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-gold"></span>
          </span>
          <span>Empowering Scholarly Breakthroughs Globally</span>
        </div>

        {/* Premium Glass-Card container for high text legibility & elegant presentation */}
        <div className="bg-[#050e21]/60 border border-accent-gold/15 p-6 sm:p-8 mb-6 max-w-3xl backdrop-blur-lg relative rounded-xs shadow-[0_20px_50px_rgba(3,10,23,0.8)]">
          {/* Subtle corner elements */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent-gold/50" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent-gold/50" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent-gold/50" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent-gold/50" />

          <h1 className="font-serif-display text-3xl sm:text-4.5xl lg:text-5.5xl font-semibold tracking-tight mb-4 leading-tight text-white">
            Research. Innovation. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-white to-accent-gold font-normal">
              Technology & Education.
            </span>
          </h1>

          {/* Staggered text reveal loader for slide captions */}
          <div className="min-h-[48px] sm:min-h-[40px] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentHeroImage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.9, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif-accent text-xs sm:text-sm md:text-base italic text-[#F1EFEA] max-w-2xl mx-auto leading-relaxed font-light"
              >
                "{heroImages[currentHeroImage].caption}"
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Omni Spotlight Search & Action Hub */}
        <div className="relative w-full max-w-md mb-6 z-30 select-text">
          <div className={`relative flex items-center bg-[#050e21]/75 border rounded-xs transition-all duration-300 ${
            isSearchFocused ? 'border-accent-gold shadow-[0_0_20px_rgba(201,169,97,0.3)] bg-[#050e21]/90' : 'border-white/10 hover:border-white/20'
          }`}>
            <div className="pl-3.5 pr-1.5">
              <Search className="w-3.5 h-3.5 text-accent-gold" />
            </div>
            <input
              type="text"
              placeholder="Search mentors, conference dates, or editing services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
              className="w-full bg-transparent text-white placeholder-white/35 py-3 pr-3 text-xs font-sans focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="pr-3.5 text-xs font-mono text-accent-gold/70 hover:text-accent-gold font-bold transition-colors"
              >
                RESET
              </button>
            )}
          </div>

          {/* Suggestions overlay */}
          <AnimatePresence>
            {isSearchFocused && searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 right-0 mt-2 bg-[#040d1e] border border-accent-gold/30 shadow-[0_25px_50px_rgba(0,0,0,0.8)] rounded-xs overflow-hidden text-left z-40 max-h-[280px] overflow-y-auto"
              >
                <div className="p-2 border-b border-white/5 bg-white/5 text-[9px] font-mono tracking-widest text-accent-gold font-bold uppercase flex justify-between">
                  <span>SUGGESTED DISCOVERIES</span>
                  <span>{searchResults.length} FOUND</span>
                </div>
                {searchResults.length > 0 ? (
                  <div className="flex flex-col">
                    {searchResults.map((res, idx) => (
                      <button
                        key={idx}
                        onMouseDown={() => {
                          onNavigate(res.link);
                        }}
                        className="w-full p-3 hover:bg-white/5 transition-colors border-b border-white/5 flex flex-col gap-0.5 text-left group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-white group-hover:text-accent-gold transition-colors font-serif-display">{res.title}</span>
                          <span className="text-[8px] font-mono tracking-widest text-accent-gold uppercase bg-accent-gold/10 px-1.5 py-0.5 border border-accent-gold/15 rounded-full">
                            {res.type}
                          </span>
                        </div>
                        <span className="text-[9px] text-white/55 truncate">{res.subtitle}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-white/45 font-light">
                    No matching records found for "{searchQuery}". <br />
                    <span className="text-[9px] text-accent-gold/60 mt-1 block font-mono">Try searching 'IEEE', 'Wolverhampton', or 'ML-KEM'</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row gap-3.5 justify-center w-full max-w-sm z-20">
          <button
            onClick={() => onNavigate("#/conferences")}
            className="bg-accent-gold hover:bg-[#B3934B] text-primary-navy font-sans uppercase tracking-[0.15em] text-[10px] font-bold px-6 py-3 transition-all duration-300 shadow-xl hover:scale-102 active:scale-98 group flex items-center justify-center gap-2 cursor-pointer"
            id="hero-cta-conferences"
          >
            Explore Conferences
          </button>
          <button
            onClick={() => onNavigate("#/mentors")}
            className="border border-white/30 hover:border-accent-gold hover:bg-white/5 text-white font-sans uppercase tracking-[0.15em] text-[10px] font-bold px-6 py-3 transition-all duration-300 hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            id="hero-cta-mentors"
          >
            Find a Mentor
          </button>
        </div>

        {/* Interactive slider image dot indicators with jump triggers */}
        <div className="flex gap-2 mt-6 select-none z-20">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => jumpToHero(idx)}
              className={`h-1 rounded-full transition-all duration-500 hover:bg-accent-gold/80 ${
                currentHeroImage === idx ? 'w-8 bg-accent-gold' : 'w-2 bg-white/30'
              }`}
              title={`Switch to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll Down Hint */}
        <div className="mt-8 flex flex-col items-center gap-1.5 text-white/30 text-[9px] font-mono tracking-widest select-none">
          <span>SCROLL TO EXPLORE</span>
          <div className="w-0.5 h-4 bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent-gold rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
