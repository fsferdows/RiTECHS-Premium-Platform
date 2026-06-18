import { useState } from 'react';
import { BlogPost, INITIAL_AUTHORS } from '../types';
import { Calendar, User, Clock, ArrowRight, X, Heart, MessageSquare, BookMarked, Search, Share2 } from 'lucide-react';
import { FadeUpSection } from './FadeUpSection';
import { SafeImageWithSkeleton } from './SafeImageWithSkeleton';

function HighlightText({ text, highlight }: { text: string; highlight?: string }) {
  if (!text) return null;
  if (!highlight || !highlight.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-[#C9A961]/40 text-white px-0.5 rounded-xs font-serif italic font-bold">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

interface BlogViewProps {
  blogs: BlogPost[];
}

export default function BlogView({ blogs }: BlogViewProps) {
  const [activeTab, setActiveTab] = useState<'All' | 'Academic Craft' | 'Cybersecurity' | 'Renewable Energy' | 'IoT Excellence'>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedBlogId, setCopiedBlogId] = useState<string | null>(null);

  const handleCopyBlogLink = (postId: string) => {
    const shareUrl = `${window.location.origin}/#/blog?post=${postId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedBlogId(postId);
      setTimeout(() => setCopiedBlogId(null), 2000);
    });
  };

  // Extract featured and secondary lists
  const featuredPost = blogs.find(b => b.featured) || blogs[0];
  
  const filteredBlogs = blogs.filter(b => {
    const matchesTab = activeTab === 'All' || b.category === activeTab;
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleOpenPost = (post: BlogPost) => {
    setSelectedPost(post);
  };

  return (
    <div id="editorial-blog-view" className="pt-16 animate-fade-in text-white bg-maroon-dark min-h-screen">
      
      {/* Narrative Header */}
      <section className="bg-gradient-to-b from-maroon-dark to-primary-maroon text-white py-12 md:py-20 px-6 text-center relative premium-noise">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-4">Litterae & Gazette</h3>
          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5.5xl lg:text-6xl font-bold tracking-tight mb-8">
            RiTECHS Editorial
          </h1>
          <p className="font-serif-accent text-base sm:text-lg lg:text-xl italic text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
            Insights on peer-rebuttals, abstract positioning hooks, and research methodology advances in emerging security, IoT smart cities, and AI-energy nodes.
          </p>
        </div>
      </section>

      {/* Categories Toolbar & Quick Search */}
      <section className="py-8 bg-maroon-dark border-b border-accent-gold/15 text-white premium-noise">
        <div className="max-w-6xl mx-auto px-6 flex flex-col xl:flex-row gap-6 items-center justify-between">
          <div className="flex flex-wrap gap-2 w-full xl:w-auto">
            {(['All', 'Academic Craft', 'Cybersecurity', 'Renewable Energy', 'IoT Excellence'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 border text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === cat 
                    ? 'bg-primary-maroon border-accent-gold text-accent-gold font-bold' 
                    : 'border-accent-gold/25 bg-transparent text-neutral-300 hover:bg-primary-maroon hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full xl:w-80 shrink-0">
            <Search className="w-4 h-4 text-accent-gold absolute left-3 top-3" />
            <input 
              type="text" 
              placeholder="Search editorial archives..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-primary-maroon border border-accent-gold/25 text-white placeholder-neutral-400 focus:border-accent-gold outline-none text-xs transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Main Magazine Layout container */}
      <FadeUpSection className="py-12 md:py-20 bg-maroon-dark w-full text-white border-b border-accent-gold/15 premium-noise text-left">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-20">
          
          {/* 1. Hero Full-width Article (Renders primarily if no filter is active, or matches criteria) */}
          {activeTab === 'All' && !searchTerm && featuredPost && (
            <div 
              onClick={() => handleOpenPost(featuredPost)}
              className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-accent-gold/20 pb-16"
              id="blog-hero-article"
            >
              {/* The 16:9 Image */}
              <div className="lg:col-span-7 aspect-[16/9] overflow-hidden border border-accent-gold/25 bg-charcoal/10 relative">
                <SafeImageWithSkeleton 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-all duration-[800ms]"
                  skeletonClassName="bg-primary-maroon-light/60"
                />
                <div className="absolute top-4 left-4 bg-maroon-dark/95 border border-accent-gold/45 text-accent-gold text-[9px] font-mono px-3 py-1 tracking-widest font-semibold uppercase">
                  FEATURED CRITIQUE
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs font-mono text-accent-gold uppercase mb-3 text-left">
                  <span>{featuredPost.category}</span>
                  <span>·</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                {/* Gold underline animation on headline */}
                <h2 className="font-serif-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight mb-4 relative inline-block text-left">
                  <span className="bg-left-bottom bg-gradient-to-r from-accent-gold to-accent-gold bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 pb-1">
                    {featuredPost.title}
                  </span>
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mb-6 line-clamp-3 text-left">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-3 font-mono text-[10px] text-neutral-300 border-t border-accent-gold/20 pt-4 mt-2 justify-start">
                  <User className="w-3.5 h-3.5 text-accent-gold" />
                  <span className="font-semibold block max-w-[200px] truncate">{featuredPost.author}</span>
                  <span>·</span>
                  <Calendar className="w-3.5 h-3.5 text-accent-gold" />
                  <span>{featuredPost.date}</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. Secondary Magazine Grid: 3 columns */}
          <div className="flex flex-col gap-10">
            <h3 className="font-serif-display text-lg sm:text-xl lg:text-2xl text-white font-bold border-b border-accent-gold/20 pb-3 text-left">
              {activeTab === 'All' ? 'Latest Scholarly Essays' : `${activeTab} Columns`}
            </h3>

            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map(post => (
                  <div 
                    key={post.id}
                    onClick={() => handleOpenPost(post)}
                    className="flex flex-col h-full cursor-pointer group text-left bg-primary-maroon/20 border border-accent-gold/15 p-5 rounded-xs hover:border-accent-gold/35 hover:shadow-lg transition-all duration-300"
                    id={`article-${post.id}`}
                  >
                    {/* Portrait 4:3 images */}
                    <div className="aspect-[4/3] overflow-hidden border border-accent-gold/20 bg-charcoal/10 shrink-0 mb-4 relative">
                      <SafeImageWithSkeleton 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                        skeletonClassName="bg-primary-maroon-dark/60"
                      />
                      <div className="absolute top-3 left-3 bg-maroon-dark/95 backdrop-blur-xs border border-accent-gold/30 text-accent-gold text-[8px] font-mono px-2 py-0.5 tracking-wider font-semibold uppercase">
                        {post.category}
                      </div>
                    </div>

                    <div className="flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-[10px] font-mono text-accent-gold uppercase mb-2">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h4 className="font-serif-display text-sm sm:text-base lg:text-lg text-white font-bold leading-snug mb-3 text-left">
                        <span className="bg-left-bottom bg-gradient-to-r from-accent-gold to-accent-gold bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 pb-0.5">
                          <HighlightText text={post.title} highlight={searchTerm} />
                        </span>
                      </h4>

                      {/* 2-line excerpt clamp */}
                      <p className="text-xs text-neutral-300 leading-relaxed font-light mb-4 line-clamp-2 text-left">
                        <HighlightText text={post.excerpt} highlight={searchTerm} />
                      </p>

                      <button
                        className="mt-auto text-left text-[10px] font-sans uppercase font-bold tracking-widest text-accent-gold hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        Retrieve Dissertation <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-primary-maroon border border-dashed border-accent-gold/20">
                <p className="text-xs text-neutral-400 font-light">No articles match the selected tag filters.</p>
              </div>
            )}
          </div>
        </div>
      </FadeUpSection>

      {/* ----------------------------------------
          IMMERSIVE READ MODAL FOR SINGLE POSTS
         ---------------------------------------- */}
      {selectedPost && (
        <div className="fixed inset-0 bg-[#030a17]/85 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          {/* Dismiss Backplane */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedPost(null)} />
          
          <div className="bg-maroon-dark text-white border border-accent-gold/30 w-full max-w-2xl h-[85vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col animate-scale-up rounded-xs">
            
            {/* Action Bar Header */}
            <div className="bg-primary-maroon text-white px-8 py-5 border-b border-accent-gold/20 flex justify-between items-center premium-noise shrink-0 select-none">
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-accent-gold" />
                <span className="font-serif-display text-sm font-semibold">RiTECHS Gazette Reader</span>
              </div>
              <button 
                onClick={() => setSelectedPost(null)}
                className="w-8 h-8 rounded-full border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                id="blog-modal-close"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Reading Core */}
            <div className="p-8 flex flex-col gap-6 flex-grow text-left">
              
              <div className="flex items-center gap-3 text-xs font-mono text-accent-gold uppercase select-none">
                <span>{selectedPost.category}</span>
                <span>·</span>
                <span>{selectedPost.date}</span>
                <span>·</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <h1 className="font-serif-display text-xl sm:text-2xl lg:text-3xl text-white font-bold leading-tight">
                {selectedPost.title}
              </h1>

              {/* Author attribution info */}
              <div className="flex items-center gap-3 bg-[#3d0d14] border border-accent-gold/20 p-3 font-mono text-[10px] text-accent-gold select-none">
                <User className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                <span>Written by: <strong className="font-bold">{selectedPost.author}</strong></span>
              </div>

              {/* Article Hero Banner */}
              <div className="aspect-[16/9] overflow-hidden border border-accent-gold/15 bg-charcoal/5 select-none shrink-0">
                <SafeImageWithSkeleton 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                  skeletonClassName="bg-primary-maroon-dark/60"
                />
              </div>

              {/* Parsed content formatted cleanly with pre-wrap */}
              <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light font-sans whitespace-pre-wrap flex flex-col gap-4">
                {selectedPost.content}
              </div>

              {/* Premium Author Bio Card */}
              {(() => {
                const authorObj = INITIAL_AUTHORS.find(a => 
                  a.name === selectedPost.author || 
                  selectedPost.author?.includes(a.name) ||
                  a.name.includes(selectedPost.author || "---")
                );
                if (!authorObj) return null;
                return (
                  <div className="bg-[#1f090d] border border-accent-gold/25 p-5 mt-4 text-left shadow-lg rounded-xs relative overflow-hidden group">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-accent-gold/5 rounded-full blur-xl pointer-events-none" />
                    <h4 className="text-[10px] uppercase font-mono tracking-widest text-accent-gold mb-4 border-b border-accent-gold/15 pb-2 font-bold select-none">
                      About the Author & Academic Credentials
                    </h4>
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <img 
                        src={authorObj.image} 
                        alt={authorObj.name} 
                        className="w-12 h-12 rounded-full object-cover border border-accent-gold/45 shrink-0 shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-serif-display font-bold text-sm text-white">{authorObj.name}</h5>
                        <p className="text-[10px] font-mono text-accent-gold mt-1 leading-normal italic font-medium">
                          {authorObj.credentials}
                        </p>
                        <p className="text-xs text-neutral-300 mt-2.5 leading-relaxed font-light font-sans">
                          {authorObj.bio}
                        </p>
                        
                        {authorObj.publishedWorks && authorObj.publishedWorks.length > 0 && (
                          <div className="mt-4">
                            <span className="text-[9px] uppercase font-mono tracking-widest text-[#B3934B] font-bold select-none block mb-1.5">
                              Selected peer-reviewed works:
                            </span>
                            <ul className="space-y-1.5 text-[10px] font-sans font-light text-neutral-300 pl-1.5 border-l border-accent-gold/20">
                              {authorObj.publishedWorks.map((work, wIdx) => (
                                <li key={wIdx} className="flex gap-1.5">
                                  <span className="text-[#C9A961] select-none">▪</span>
                                  <span className="leading-snug">{work.title}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {authorObj.links && authorObj.links.length > 0 && (
                          <div className="flex gap-3 mt-4">
                            {authorObj.links.map((ln, lnIdx) => (
                              <a 
                                key={lnIdx} 
                                href={ln.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[9px] uppercase tracking-wider font-mono text-accent-gold hover:text-white underline font-semibold transition-colors flex items-center gap-1"
                              >
                                {ln.label} →
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Academic citations footer box */}
              <div className="border border-accent-gold/20 bg-primary-maroon p-4 font-mono text-[9px] text-neutral-300 mt-6 select-all">
                <div className="text-[10px] text-accent-gold uppercase font-bold tracking-wider select-none mb-1">
                  How to Cite this Editorial
                </div>
                <code>
                  {selectedPost.author.split(' & ')[0]} ({new Date(selectedPost.date).getFullYear()}). "{selectedPost.title}". RiTECHS premium platforms. Available at: info@ritechs.org/gazette/{selectedPost.id}
                </code>
              </div>

            </div>

            {/* Footer action close dismiss */}
            <div className="bg-primary-maroon py-4 px-8 border-t border-accent-gold/20 flex justify-end gap-3 shrink-0 select-none">
              <button
                onClick={() => handleCopyBlogLink(selectedPost.id)}
                className="bg-transparent border border-accent-gold/45 hover:bg-white/5 text-accent-gold font-bold text-[10px] tracking-widest uppercase font-mono px-5 py-2.5 transition-colors cursor-pointer rounded-xs flex items-center gap-1.5 shadow-md justify-center"
              >
                <Share2 className="w-3.5 h-3.5 text-accent-gold animate-pulse" />
                {copiedBlogId === selectedPost.id ? 'Copied!' : 'Copy Link'}
              </button>
              <button
                onClick={() => setSelectedPost(null)}
                className="bg-accent-gold hover:bg-[#B3934B] text-primary-maroon font-black text-[10px] tracking-widest uppercase font-mono px-6 py-2.5 transition-colors cursor-pointer rounded-xs shadow-md"
              >
                Dismiss Reader
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
