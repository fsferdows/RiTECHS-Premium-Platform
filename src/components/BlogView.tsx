import { useState } from 'react';
import { BlogPost } from '../types';
import { Calendar, User, Clock, ArrowRight, X, Heart, MessageSquare, BookMarked, Search } from 'lucide-react';
import { FadeUpSection } from './FadeUpSection';

interface BlogViewProps {
  blogs: BlogPost[];
}

export default function BlogView({ blogs }: BlogViewProps) {
  const [activeTab, setActiveTab] = useState<'All' | 'Academic Craft' | 'Cybersecurity' | 'Renewable Energy' | 'IoT Excellence'>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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
    <div id="editorial-blog-view" className="pt-16 animate-fade-in text-charcoal">
      
      {/* Narrative Header */}
      <section className="bg-primary-navy text-white py-20 px-6 text-center relative premium-noise">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-4">Litterae & Gazette</h3>
          <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight mb-8">
            RiTECHS Editorial
          </h1>
          <p className="font-serif-accent text-lg sm:text-xl italic text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
            Insights on peer-rebuttals, abstract positioning hooks, and research methodology advances in emerging security, IoT smart cities, and AI-energy nodes.
          </p>
        </div>
      </section>

      {/* Categories Toolbar & Quick Search */}
      <section className="py-8 bg-white border-b border-divider-gold/60">
        <div className="max-w-6xl mx-auto px-6 flex flex-col xl:flex-row gap-6 items-center justify-between">
          <div className="flex flex-wrap gap-2 w-full xl:w-auto">
            {(['All', 'Academic Craft', 'Cybersecurity', 'Renewable Energy', 'IoT Excellence'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 border text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  activeTab === cat 
                    ? 'bg-primary-navy border-primary-navy text-accent-gold' 
                    : 'border-divider-gold bg-transparent text-primary-navy/80 hover:bg-neutral-warm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full xl:w-80 shrink-0">
            <Search className="w-4 h-4 text-accent-gold absolute left-3top-3" />
            <input 
              type="text" 
              placeholder="Search editorial archives..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-neutral-warm/40 border border-divider-gold/60 focus:border-accent-gold outline-none text-xs transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Main Magazine Layout container */}
      <FadeUpSection className="py-20 max-w-6xl mx-auto px-6 flex flex-col gap-20">
        
        {/* 1. Hero Full-width Article (Renders primarily if no filter is active, or matches criteria) */}
        {activeTab === 'All' && !searchTerm && featuredPost && (
          <div 
            onClick={() => handleOpenPost(featuredPost)}
            className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-divider-gold/45 pb-16"
            id="blog-hero-article"
          >
            {/* The 16:9 Image */}
            <div className="lg:col-span-7 aspect-[16/9] overflow-hidden border border-divider-gold/45 bg-charcoal/10 relative">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-[800ms]"
              />
              <div className="absolute top-4 left-4 bg-primary-navy/90 border border-accent-gold/40 text-accent-gold text-[9px] font-mono px-3 py-1 tracking-widest font-semibold uppercase">
                FEATURED CRITIQUE
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs font-mono text-accent-gold uppercase mb-3">
                <span>{featuredPost.category}</span>
                <span>·</span>
                <span>{featuredPost.readTime}</span>
              </div>

              {/* Gold underline animation on headline */}
              <h2 className="font-serif-display text-2.5xl sm:text-3.5xl lg:text-4.5xl text-primary-navy font-bold leading-tight mb-4 relative inline-block">
                <span className="bg-left-bottom bg-gradient-to-r from-accent-gold to-accent-gold bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 pb-1">
                  {featuredPost.title}
                </span>
              </h2>

              <p className="text-sm text-muted-gray leading-relaxed font-light mb-6 line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center gap-3 font-mono text-[10px] text-primary-navy/80 border-t border-divider-gold/30 pt-4 mt-2">
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
          <h3 className="font-serif-display text-xl sm:text-2xl text-primary-navy font-bold border-b border-divider-gold/35 pb-3">
            {activeTab === 'All' ? 'Latest Scholarly Essays' : `${activeTab} Columns`}
          </h3>

          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredBlogs.map(post => (
                <div 
                  key={post.id}
                  onClick={() => handleOpenPost(post)}
                  className="flex flex-col h-full cursor-pointer group"
                  id={`article-${post.id}`}
                >
                  {/* Portrait 4:3 images */}
                  <div className="aspect-[4/3] overflow-hidden border border-divider-gold/40 bg-charcoal/10 shrink-0 mb-6 relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs border border-divider-gold text-primary-navy text-[8px] font-mono px-2 py-0.5 tracking-wider font-semibold uppercase">
                      {post.category}
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-[10px] font-mono text-accent-gold uppercase mb-2">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h4 className="font-serif-display text-lg text-primary-navy font-bold leading-snug mb-3">
                      <span className="bg-left-bottom bg-gradient-to-r from-accent-gold to-accent-gold bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 pb-0.5">
                        {post.title}
                      </span>
                    </h4>

                    {/* 2-line excerpt clamp */}
                    <p className="text-xs text-muted-gray leading-relaxed font-light mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <button
                      className="mt-auto text-left text-[10px] font-sans uppercase font-bold tracking-widest text-[#B3934B] hover:text-primary-navy flex items-center gap-1.5 transition-colors"
                    >
                      Retrieve Dissertation <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#FAFAF7] border border-dashed border-divider-gold/60">
              <p className="text-xs text-muted-gray font-light">No articles match the selected tag filters.</p>
            </div>
          )}
        </div>

      </FadeUpSection>

      {/* ----------------------------------------
          IMMERSIVE READ MODAL FOR SINGLE POSTS
         ---------------------------------------- */}
      {selectedPost && (
        <div className="fixed inset-0 bg-primary-navy/70 z-50 flex items-center justify-center p-6 backdrop-blur-xs">
          {/* Dismiss Backplane */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedPost(null)} />
          
          <div className="bg-white rounded-xs border border-accent-gold/30 w-full max-w-2xl h-[85vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col animate-scale-up">
            
            {/* Action Bar Header */}
            <div className="bg-primary-navy text-white px-8 py-5 border-b border-accent-gold/20 flex justify-between items-center premium-noise shrink-0 select-none">
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-accent-gold" />
                <span className="font-serif-display text-sm font-semibold">RiTECHS Gazette Reader</span>
              </div>
              <button 
                onClick={() => setSelectedPost(null)}
                className="w-8 h-8 rounded-full border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors"
                id="blog-modal-close"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Reading Core */}
            <div className="p-8 flex flex-col gap-6 flex-grow">
              
              <div className="flex items-center gap-3 text-xs font-mono text-accent-gold uppercase select-none">
                <span>{selectedPost.category}</span>
                <span>·</span>
                <span>{selectedPost.date}</span>
                <span>·</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <h1 className="font-serif-display text-2xl sm:text-3xl text-primary-navy font-bold leading-tight">
                {selectedPost.title}
              </h1>

              {/* Author attribution info */}
              <div className="flex items-center gap-3 bg-neutral-warm border border-divider-gold/35 p-3 font-mono text-[10px] text-primary-navy select-none">
                <User className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                <span>Written by: <strong className="font-bold">{selectedPost.author}</strong></span>
              </div>

              {/* Article Hero Banner */}
              <div className="aspect-[16/9] overflow-hidden border border-divider-gold/30 bg-charcoal/5 select-none shrink-0">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Parsed content formatted cleanly with pre-wrap */}
              <div className="text-xs sm:text-sm text-charcoal/90 leading-relaxed font-light font-sans whitespace-pre-wrap flex flex-col gap-4">
                {selectedPost.content}
              </div>

              {/* Academic citations footer box */}
              <div className="border border-divider-gold/40 bg-neutral-warm p-4 font-mono text-[9px] mt-6 select-all">
                <div className="text-[10px] text-muted-gray uppercase font-bold tracking-wider select-none mb-1">
                  How to Cite this Editorial
                </div>
                <code>
                  {selectedPost.author.split(' & ')[0]} ({new Date(selectedPost.date).getFullYear()}). "{selectedPost.title}". RiTECHS premium platforms. Available at: info@ritechs.org/gazette/{selectedPost.id}
                </code>
              </div>

            </div>

            {/* Footer action close dismiss */}
            <div className="bg-neutral-warm py-4 px-8 border-t border-divider-gold/30 flex justify-end shrink-0 select-none">
              <button
                onClick={() => setSelectedPost(null)}
                className="bg-primary-navy hover:bg-accent-gold text-white hover:text-primary-navy text-[10px] tracking-widest uppercase font-mono font-bold px-6 py-2.5 transition-colors"
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
