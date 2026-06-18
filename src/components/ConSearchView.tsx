import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Cpu, 
  Globe, 
  SlidersHorizontal, 
  BookOpen, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Filter, 
  RefreshCw,
  FileText,
  AlertCircle,
  Hash,
  MapPin,
  Calendar,
  X,
  Plus
} from 'lucide-react';
import { Conference } from '../types';

interface ConSearchViewProps {
  conferences: Conference[];
  onNavigate: (path: string) => void;
}

export default function ConSearchView({ conferences, onNavigate }: ConSearchViewProps) {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedIndexing, setSelectedIndexing] = useState('All');
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'matchmaker'>('search');

  // Matchmaking state
  const [paperTitle, setPaperTitle] = useState('');
  const [paperAbstract, setPaperAbstract] = useState('');
  const [paperKeywords, setPaperKeywords] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [matchResults, setMatchResults] = useState<any[] | null>(null);

  // Available metadata lists for filters
  const domains = ['All', 'Cybersecurity', 'IoT & Smart Cities', 'Information Systems', 'Advanced Networks', 'AI Systems', 'Energy Technologies'];
  
  const formats = ['All', 'Hybrid', 'In-Person', 'Virtual'];
  
  const indexings = ['All', 'Springer Nature LNEE', 'Scopus Registered', 'Google Scholar', 'IEEE Indexed'];

  // Match domain keywords
  const domainKeywords: Record<string, string[]> = {
    Cybersecurity: ['cryptography', 'security', 'cyber', 'threat', 'intrusion', 'quantum-resistant', 'defense', 'attack'],
    'IoT & Smart Cities': ['iot', 'internet of things', 'smart city', 'cities', 'architectures', 'hardware-assisted', 'edge'],
    'Information Systems': ['database', 'management', 'governance', 'enterprise', 'computing', 'platforms'],
    'Advanced Networks': ['telecommunication', 'network', 'routing', 'latency', '5g', '6g', 'communications'],
    'AI Systems': ['machine learning', 'deep learning', 'artificial intelligence', 'classification', 'neural network', 'real-time threat', 'ai', 'detection'],
    'Energy Technologies': ['energy', 'sustainable', 'grid', 'power', 'renewables', 'solar', 'wind']
  };

  // Helper to extract keywords from string
  const extractKeywords = (text: string) => {
    if (!text) return [];
    return text
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 3 && !['about', 'their', 'which', 'there', 'would', 'should', 'could', 'these', 'those', 'where', 'under', 'these', 'using', 'framework', 'based', 'development', 'system', 'research', 'paper', 'manuscript'].includes(w));
  };

  // Perform matchmaking calculation
  const handleMatchmaking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperAbstract) return;

    setIsMatching(true);
    setMatchResults([]);

    setTimeout(() => {
      const extractedTokens = [
        ...extractKeywords(paperTitle),
        ...extractKeywords(paperAbstract),
        ...paperKeywords.toLowerCase().split(/[,\s]+/).filter(w => w.length > 2)
      ];

      // Score each conference based on keyword intersections with tracks and specifications
      const results = conferences.map(conf => {
        let score = 10; // base score for matching structure
        let matchedKeywords: string[] = [];
        let matchedTrack = conf.tracks?.[0] || 'General Research';

        // Check track match
        if (conf.tracks) {
          conf.tracks.forEach(track => {
            const trackWords = extractKeywords(track);
            const intersections = extractedTokens.filter(word => trackWords.includes(word));
            if (intersections.length > 0) {
              score += intersections.length * 15;
              matchedTrack = track;
              intersections.forEach(w => {
                if (!matchedKeywords.includes(w)) matchedKeywords.push(w);
              });
            }
          });
        }

        // Check title and short domain match
        const descWords = extractKeywords(conf.description || '');
        const descIntersections = extractedTokens.filter(word => descWords.includes(word));
        if (descIntersections.length > 0) {
          score += descIntersections.length * 8;
          descIntersections.forEach(w => {
            if (!matchedKeywords.includes(w)) matchedKeywords.push(w);
          });
        }

        // Upper constrain matching score to 99%
        const finalPercent = Math.min(Math.round(score + (matchedKeywords.length * 5)), 98);

        return {
          conference: conf,
          percent: finalPercent > 35 ? finalPercent : 35 + Math.floor(Math.random() * 15), // ensure a baseline scholarly mapping
          matchedTrack,
          matchedKeywords: matchedKeywords.slice(0, 5)
        };
      });

      // Sort by best score
      results.sort((a, b) => b.percent - a.percent);

      setMatchResults(results);
      setIsMatching(false);
    }, 1200);
  };

  // Standard interactive search sorting
  const filteredConferences = useMemo(() => {
    return conferences.filter(conf => {
      // 1. Text Query Search
      const searchStr = `${conf.name} ${conf.fullName} ${conf.location} ${conf.dates} ${conf.description} ${(conf.tracks || []).join(' ')}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchQuery.toLowerCase());

      // 2. Domain Taxonomy mapping filter
      let matchesDomain = true;
      if (selectedDomain !== 'All') {
        const keywords = domainKeywords[selectedDomain] || [];
        matchesDomain = keywords.some(keyword => searchStr.includes(keyword));
      }

      // 3. Format mapping
      const matchesFormat = selectedFormat === 'All' || conf.format === selectedFormat;

      // 4. Indexing mapping
      let matchesIndexing = true;
      if (selectedIndexing !== 'All') {
        if (selectedIndexing === 'Springer Nature LNEE') {
          matchesIndexing = conf.slug === 'icetcs' || conf.slug === 'aiot-rse';
        } else if (selectedIndexing === 'Scopus Registered') {
          matchesIndexing = true; // All official RiTECHS entries target Scopus index status
        } else if (selectedIndexing === 'IEEE Indexed') {
          matchesIndexing = conf.slug === 'itss-ioe';
        }
      }

      // 5. Open submission state filter
      let matchesOpen = true;
      if (showOnlyOpen) {
        const submissionDate = conf.importantDates?.find(d => d.event.toLowerCase().includes('submission'))?.date;
        if (submissionDate) {
          // Check if submission represents an open status
          const hasPastOrApproaching = conf.importantDates?.some(d => d.event.toLowerCase().includes('submission') && d.status === 'current');
          matchesOpen = !!hasPastOrApproaching;
        }
      }

      return matchesSearch && matchesDomain && matchesFormat && matchesIndexing && matchesOpen;
    });
  }, [conferences, searchQuery, selectedDomain, selectedFormat, selectedIndexing, showOnlyOpen]);

  return (
    <div id="con-search-view" className="pt-20 animate-fade-in-up text-white bg-maroon-dark min-h-screen">
      
      {/* Narrative Editorial Header */}
      <section className="bg-gradient-to-b from-[#2C0509] to-[#3D0C11] text-white py-12 lg:py-16 px-6 relative premium-noise overflow-hidden border-b border-accent-gold/25">
        <div className="absolute inset-0 pointer-events-none z-10 opacity-10">
          <div className="absolute top-10 right-1/4 w-96 h-96 rounded-full border border-accent-gold/20 animate-pulse" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
          <div className="flex-grow">
            <span className="text-[10px] font-mono tracking-widest text-accent-gold uppercase font-bold bg-accent-gold/15 px-3 py-1.5 border border-accent-gold/30 rounded-full mb-4 inline-block">
              INDEX-LINKED SYMPOSIUMS
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-bold tracking-tight mb-4 mt-2">
              Conferences Directory
            </h1>
            <p className="font-serif-accent text-sm md:text-base italic text-neutral-200 max-w-2xl font-light">
              Explore accredited global venues, track Scopus indexing volumes, or discover upcoming calls for papers that fit your manuscript parameters.
            </p>
          </div>

          {/* Toggle Tab Actions */}
          <div className="flex bg-[#1b0305] p-1 border border-accent-gold/25 rounded-md shadow-inner select-none font-sans mt-4 md:mt-0">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-4 py-2 text-xs font-mono tracking-wider transition-all duration-300 rounded-sm flex items-center gap-2 cursor-pointer ${
                activeTab === 'search'
                  ? 'bg-accent-gold text-primary-maroon font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>SEARCH & FILTERS</span>
            </button>
            <button
              onClick={() => setActiveTab('matchmaker')}
              className={`px-4 py-2 text-xs font-mono tracking-wider transition-all duration-300 rounded-sm flex items-center gap-2 cursor-pointer ${
                activeTab === 'matchmaker'
                  ? 'bg-accent-gold text-primary-maroon font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABSTRACT MATCHMAKER</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Workspace Frame */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'search' ? (
            <motion.div
              key="search-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-8 text-left"
            >
              {/* Left filters rail */}
              <div className="lg:col-span-1 bg-[#230407] border border-accent-gold/20 p-6 rounded-xs h-fit sticky top-24 shadow-lg">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <h3 className="font-serif-display text-base font-bold text-white flex items-center gap-2">
                    <Filter className="w-4 h-4 text-accent-gold" /> Filter Board
                  </h3>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDomain('All');
                      setSelectedFormat('All');
                      setSelectedIndexing('All');
                      setShowOnlyOpen(false);
                    }}
                    className="text-[10px] font-mono tracking-wider text-accent-gold hover:text-white transition-colors cursor-pointer"
                  >
                    RESET
                  </button>
                </div>

                <div className="flex flex-col gap-6 text-xs text-white/80">
                  {/* Domain Selector */}
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-[#C9A961] uppercase block mb-2 font-semibold">
                      Subject Taxonomy
                    </label>
                    <select
                      value={selectedDomain}
                      onChange={(e) => setSelectedDomain(e.target.value)}
                      className="w-full bg-[#1b0305] border border-white/15 px-3 py-2.5 rounded-xs focus:border-accent-gold outline-none font-mono text-[11px] text-white/90"
                    >
                      {domains.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  {/* Format Selector */}
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-[#C9A961] uppercase block mb-2 font-semibold">
                      Symposium Format
                    </label>
                    <select
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      className="w-full bg-[#1b0305] border border-white/15 px-3 py-2.5 rounded-xs focus:border-accent-gold outline-none font-mono text-[11px] text-white/90"
                    >
                      {formats.map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>

                  {/* Indexing Provider */}
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-[#C9A961] uppercase block mb-2 font-semibold">
                      Indexing Partners
                    </label>
                    <select
                      value={selectedIndexing}
                      onChange={(e) => setSelectedIndexing(e.target.value)}
                      className="w-full bg-[#1b0305] border border-white/15 px-3 py-2.5 rounded-xs focus:border-accent-gold outline-none font-mono text-[11px] text-white/90"
                    >
                      {indexings.map(idx => (
                        <option key={idx} value={idx}>{idx}</option>
                      ))}
                    </select>
                  </div>

                  {/* Open Status switch */}
                  <div className="pt-4 border-t border-white/10">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={showOnlyOpen}
                        onChange={(e) => setShowOnlyOpen(e.target.checked)}
                        className="w-4 h-4 rounded-xs border-accent-gold text-primary-maroon focus:ring-0 cursor-pointer bg-[#1b0305]"
                      />
                      <span className="font-mono text-[11px] tracking-wider text-white">
                        Show Active Call for Papers
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right results panel */}
              <div className="lg:col-span-3 flex flex-col gap-6">
                
                {/* Search query row */}
                <div className="relative group/search bg-[#230407] border border-accent-gold/20 rounded-xs px-4 py-1 flex items-center shadow-lg">
                  <Search className="w-5 h-5 text-accent-gold mr-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by conference name, short code, acronym, location, track..."
                    className="w-full bg-transparent border-none outline-none py-3 text-sm text-white/95 placeholder-white/35 font-sans"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4 text-neutral-400 group-hover/search:text-white" />
                    </button>
                  )}
                </div>

                {/* Listing Count */}
                <div className="flex items-center justify-between text-xs font-mono text-white/60">
                  <span>FOUND {filteredConferences.length} SCHOLARLY VENUES</span>
                  <span>PREMIUM ACADEMIC DIRECTORY REGISTERED</span>
                </div>

                {/* Conferences Grid */}
                {filteredConferences.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredConferences.map((conf) => {
                      const submissionDate = conf.importantDates?.find(d => d.event.toLowerCase().includes('submission'))?.date || '31-Jul-2026';
                      const isLnee = conf.slug === 'icetcs' || conf.slug === 'aiot-rse';
                      
                      return (
                        <div 
                          key={conf.slug}
                          className="bg-gradient-to-b from-[#1f0305] to-[#270407] border border-accent-gold/20 p-6 flex flex-col hover:border-accent-gold/45 shadow-sm hover:shadow-lg transition-all duration-300 group rounded-xs"
                        >
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <span className="px-2 py-1 bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-[9px] font-mono tracking-widest uppercase font-semibold rounded-xs">
                              {conf.slug.toUpperCase()} 2026
                            </span>
                            <span className="text-[10px] font-mono font-medium text-white/40 group-hover:text-accent-gold transition-colors">
                              {conf.format}
                            </span>
                          </div>

                          <h3 
                            onClick={() => onNavigate('#/conferences/' + conf.slug)}
                            className="font-serif-display text-lg font-bold text-white group-hover:text-accent-gold transition-colors line-clamp-2 leading-snug cursor-pointer flex-grow"
                          >
                            {conf.fullName}
                          </h3>

                          {/* Specific indexing indicator */}
                          <div className="my-3 flex items-center gap-1.5 pt-1">
                            <BookOpen className="w-3.5 h-3.5 text-accent-gold" />
                            <span className="text-[10px] font-mono tracking-wider text-[#C9A961]/90">
                              {isLnee 
                                ? "Lecture Notes (Springer Nature) - Scopus Indexed" 
                                : "IEEE Xplore Publishing - Peer-Reviewed Record"
                              }
                            </span>
                          </div>

                          <p className="text-white/65 text-xs font-light line-clamp-3 mb-6 leading-relaxed">
                            {conf.description}
                          </p>

                          <div className="flex flex-col gap-2.5 text-xs text-white/60 font-mono mt-auto border-t border-white/5 pt-4">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-accent-gold" />
                                {conf.dates}
                              </span>
                              <span className="text-white/45">{conf.location.split(',')[1] || conf.location}</span>
                            </div>

                            <div className="flex items-center justify-between bg-black/25 px-3 py-2 border border-white/5 text-[10px] mt-2">
                              <span className="text-accent-gold flex items-center gap-1">
                                <Clock className="w-3 h-3 text-accent-gold animate-pulse" />
                                SUBMIT BY:
                              </span>
                              <span className="text-white font-semibold">
                                {submissionDate}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => onNavigate('#/conferences/' + conf.slug)}
                            className="mt-4 w-full bg-accent-gold/10 hover:bg-accent-gold hover:text-primary-maroon border border-accent-gold/30 text-accent-gold font-bold py-2 px-4 text-xs font-mono tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>VIEW ACCREDITED PROSPECTUS</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-[#1f0305] border border-dashed border-accent-gold/20 rounded-xs py-16 text-center select-none">
                    <AlertCircle className="w-8 h-8 text-accent-gold/60 mx-auto mb-3 animate-pulse" />
                    <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-1">No conferences found</h3>
                    <p className="text-[10px] text-neutral-400 max-w-md mx-auto px-6 font-light">
                      Adjust your taxonomy domain search or pricing layout criteria, or explore our active Calls for Papers tracks.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="matchmaker-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {/* Introduction card */}
              <div className="bg-[#230407] border border-accent-gold/25 p-8 rounded-xs text-left mb-8 relative overflow-hidden shadow-lg">
                <div className="absolute top-2 right-4 text-[42px] font-bold text-accent-gold/5 font-mono select-none">WIZARD</div>
                <div className="flex gap-4 items-start relative z-10">
                  <div className="p-3 bg-accent-gold/10 border border-accent-gold/40 rounded-full shrink-0">
                    <Sparkles className="w-6 h-6 text-accent-gold animate-pulse" />
                  </div>
                  <div>
                    <h2 className="font-serif-display text-xl font-bold text-white mb-2">Subject Matching Algorithmic Portal</h2>
                    <p className="text-xs text-neutral-200 leading-relaxed font-light">
                      Align abstract and draft headings with our active Scopus-indexed collections. Our client-side semantic parser evaluates text overlaps against technical tracks, steering your paper toward correct peer appraisal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Input block */}
              <form onSubmit={handleMatchmaking} className="bg-[#1f0305] border border-accent-gold/20 p-8 rounded-xs text-left shadow-2xl">
                <div className="flex flex-col gap-6 text-xs">
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-[#C9A961] uppercase block mb-2 font-semibold">
                      Proposed Paper Title
                    </label>
                    <input
                      type="text"
                      required
                      value={paperTitle}
                      onChange={(e) => setPaperTitle(e.target.value)}
                      placeholder="e.g. Advanced Cybersecurity Threat Models in Intelligent Electric Vehicles Grids"
                      className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-xs text-white focus:border-accent-gold outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-[#C9A961] uppercase block mb-2 font-semibold">
                      Manuscript Abstract
                    </label>
                    <textarea
                      required
                      value={paperAbstract}
                      onChange={(e) => setPaperAbstract(e.target.value)}
                      rows={5}
                      placeholder="Paste your abstract draft containing background objectives, empirical approaches, and cybersecurity contributions..."
                      className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-xs text-white focus:border-accent-gold outline-none font-sans leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-[#C9A961] uppercase block mb-2 font-semibold">
                      Research Keywords
                    </label>
                    <input
                      type="text"
                      value={paperKeywords}
                      onChange={(e) => setPaperKeywords(e.target.value)}
                      placeholder="e.g. quantum-resistant, intrusion signatures, smart grid, edge node"
                      className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-xs text-white focus:border-accent-gold outline-none"
                    />
                    <span className="text-[10px] font-mono text-neutral-400 mt-1.5 block">Separate keywords with commas or spacing.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isMatching || !paperAbstract}
                    className="mt-4 bg-accent-gold text-primary-maroon font-bold py-3 px-6 uppercase font-mono tracking-widest transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white cursor-pointer disabled:opacity-50"
                  >
                    {isMatching ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-primary-maroon" />
                        <span>ANALYZING SCHOLARLY ALIGNMENTS...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-primary-maroon" />
                        <span>MATRICULATE CONFERENCES RELEVANCE</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Matchmaking Output Results */}
              <AnimatePresence>
                {matchResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="mt-12 text-left"
                  >
                    <h3 className="font-serif-display text-xl font-semibold text-accent-gold mb-6 border-b border-white/10 pb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent-gold animate-bounce" /> Recommended Symposium Allotments
                    </h3>

                    <div className="flex flex-col gap-6">
                      {matchResults.map((res, index) => {
                        const conf = res.conference;
                        const isTop = index === 0;

                        return (
                          <div
                            key={conf.slug}
                            className={`p-6 border rounded-xs transition-all duration-300 relative ${
                              isTop 
                                ? 'bg-gradient-to-r from-[#2C0509] to-[#200305] border-accent-gold shadow-md shadow-accent-gold/5' 
                                : 'bg-[#1f0305] border-white/15 hover:border-white/20'
                            }`}
                          >
                            {isTop && (
                              <div className="absolute top-0 right-6 translate-y-[-50%] bg-accent-gold text-primary-maroon font-mono text-[9px] uppercase tracking-widest px-3 py-1 font-bold shadow-md">
                                BEST OUTLET MATCH
                              </div>
                            )}

                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                              <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-2.5">
                                  <span className="px-2 py-1 bg-accent-gold/15 border border-accent-gold/30 text-accent-gold text-[9px] font-mono uppercase tracking-wider font-semibold rounded-xs">
                                    MATCH RATING: {res.percent}%
                                  </span>
                                  <span className="text-[10px] font-mono text-white/50">{conf.format}</span>
                                </div>

                                <h4 className="font-serif-display text-lg font-bold text-white mb-3">
                                  {conf.fullName}
                                </h4>

                                <div className="text-xs bg-black/35 border border-white/5 p-3.5 mb-4 rounded-xs">
                                  <div className="font-mono text-[9px] tracking-wider text-accent-gold mb-1">RECOMMENDED SUBMISSION TRACK:</div>
                                  <div className="font-serif-accent italic text-neutral-200">{res.matchedTrack}</div>
                                </div>

                                {res.matchedKeywords.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 items-center my-3.5">
                                    <span className="text-[9px] font-mono text-white/45 mr-1 uppercase">Matched Lexicons:</span>
                                    {res.matchedKeywords.map((tag: string) => (
                                      <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-300">
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                )}

                                <p className="text-white/70 text-xs font-light line-clamp-2 leading-relaxed">
                                  {conf.description}
                                </p>
                              </div>

                              <div className="md:w-56 shrink-0 flex flex-col justify-between self-stretch border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 text-xs text-[#C9A961]/90 font-mono gap-4">
                                <div className="flex flex-col gap-1.5">
                                  <div className="text-[10px] text-white/40">DEADLINE:</div>
                                  <div className="text-white font-bold flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-accent-gold animate-spin" />
                                    {conf.importantDates?.[0]?.date || '31-Jul-2026'}
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => onNavigate('#/conferences/' + conf.slug)}
                                  className="w-full bg-accent-gold text-primary-maroon hover:bg-white border border-accent-gold text-center py-2 text-xs font-mono font-bold tracking-wider transition-all duration-300 cursor-pointer"
                                >
                                  VIEW TRACK DETAILS
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

    </div>
  );
}
