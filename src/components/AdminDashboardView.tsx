import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, Save, FileText, Calendar, Users, DollarSign, 
  Settings, Check, X, Shield, RefreshCw, RefreshCcw, LogOut, Info, BookOpen
} from 'lucide-react';
import { BlogPost, Conference, Mentor } from '../types';

interface AdminDashboardViewProps {
  conferences: Conference[];
  blogs: BlogPost[];
  mentors: Mentor[];
  onUpdateConferences: (conferences: Conference[]) => void;
  onUpdateBlogs: (blogs: BlogPost[]) => void;
  onUpdateMentors: (mentors: Mentor[]) => void;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export default function AdminDashboardView({
  conferences,
  blogs,
  mentors,
  onUpdateConferences,
  onUpdateBlogs,
  onUpdateMentors,
  onNavigate,
  onLogout,
}: AdminDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'blogs' | 'conferences' | 'mentors' | 'services'>('blogs');

  // Inline forms state
  const [editingBlogId, setEditingBlogId] = useState<string | number | null>(null);
  const [editingConfId, setEditingConfId] = useState<string | null>(null);
  const [editingMentorId, setEditingMentorId] = useState<string | number | null>(null);

  // New item flags & forms
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [showAddConf, setShowAddConf] = useState(false);
  const [showAddMentor, setShowAddMentor] = useState(false);

  // Form inputs for Blog
  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCategory, setBlogCategory] = useState('Academic Craft');
  const [blogImage, setBlogImage] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogReadTime, setBlogReadTime] = useState('5 min read');

  // Form inputs for Conference
  const [confName, setConfName] = useState('');
  const [confFullName, setConfFullName] = useState('');
  const [confLocation, setConfLocation] = useState('');
  const [confFormat, setConfFormat] = useState('Hybrid');
  const [confYear, setConfYear] = useState('2026');
  const [confDates, setConfDates] = useState('');
  const [confDesc, setConfDesc] = useState('');
  const [confTracksCSV, setConfTracksCSV] = useState('');
  const [confCfpPdfUrl, setConfCfpPdfUrl] = useState('');
  const [confUploadsFolderUrl, setConfUploadsFolderUrl] = useState('');
  const [confLogoUrl, setConfLogoUrl] = useState('');

  // Form inputs for Mentor
  const [mentorName, setMentorName] = useState('');
  const [mentorUniversity, setMentorUniversity] = useState('');
  const [mentorCountry, setMentorCountry] = useState('');
  const [mentorEmail, setMentorEmail] = useState('');
  const [mentorBio, setMentorBio] = useState('');
  const [mentorImage, setMentorImage] = useState('');
  const [mentorFieldsCSV, setMentorFieldsCSV] = useState('');
  const [mentorRating, setMentorRating] = useState(4.8);

  // Calculator custom base rate setting
  const [customStandardRate, setCustomStandardRate] = useState(() => {
    return parseFloat(localStorage.getItem('ritechs_calc_standard_rate') || '0.025');
  });
  const [customPremiumRate, setCustomPremiumRate] = useState(() => {
    return parseFloat(localStorage.getItem('ritechs_calc_premium_rate') || '0.045');
  });
  const [savedRateSuccess, setSavedRateSuccess] = useState(false);

  // --- BLOG ACTIONS ---
  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      title: blogTitle || 'Untitled Custom Scholarly Editorial',
      excerpt: blogExcerpt || 'A short abstract explaining critical peer insights.',
      content: blogContent || 'Deep editorial contents and critiques on peer evaluations.',
      category: blogCategory,
      image: blogImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
      author: blogAuthor || 'Dr. Academic Administrator',
      readTime: blogReadTime || '6 min read',
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      featured: false
    };

    const updated = [newBlog, ...blogs];
    onUpdateBlogs(updated);
    
    // reset
    setBlogTitle('');
    setBlogExcerpt('');
    setBlogContent('');
    setBlogCategory('Academic Craft');
    setBlogImage('');
    setBlogAuthor('');
    setBlogReadTime('5 min read');
    setShowAddBlog(false);
  };

  const handleStartEditBlog = (post: BlogPost) => {
    setEditingBlogId(post.id);
    setBlogTitle(post.title);
    setBlogExcerpt(post.excerpt || '');
    setBlogContent(post.content || '');
    setBlogCategory(post.category || 'Academic Craft');
    setBlogImage(post.image || '');
    setBlogAuthor(post.author || '');
    setBlogReadTime(post.readTime || '5 min read');
  };

  const handleSaveEditBlog = (id: string | number) => {
    const updated = blogs.map(b => b.id === id ? {
      ...b,
      title: blogTitle,
      excerpt: blogExcerpt,
      content: blogContent,
      category: blogCategory,
      image: blogImage,
      author: blogAuthor,
      readTime: blogReadTime
    } : b);
    onUpdateBlogs(updated);
    setEditingBlogId(null);
  };

  const handleDeleteBlog = (id: string | number) => {
    if (confirm('Are you sure you want to permanently delete this blog post? This takes effect instantly.')) {
      const updated = blogs.filter(b => b.id !== id);
      onUpdateBlogs(updated);
    }
  };

  // --- CONFERENCE ACTIONS ---
  const handleAddConf = (e: React.FormEvent) => {
    e.preventDefault();
    const newConf: Conference = {
      id: `conf-${Date.now()}`,
      name: confName || 'NEW-CONF 2026',
      full_name: confFullName || 'International Workshop on Secure Systems',
      fullName: confFullName || 'International Workshop on Secure Systems',
      location: confLocation || 'Online virtual suite',
      format: confFormat,
      year: confYear,
      dates: confDates || 'Nov-26 to Nov-27',
      description: confDesc || 'No-code generated conference platform providing dynamic research peer evaluations.',
      tracks: confTracksCSV ? confTracksCSV.split(',').map(t => t.trim()) : ['Cybersecurity & Network Defenses', 'Energy Engineering Informatics'],
      general_chairs: ['Secretariat Chair'],
      keynote_speakers: [],
      importantDates: [
        { event: 'Paper Submission Deadline', date: '30-Sep-26', status: 'current' }
      ],
      cfpPdfUrl: confCfpPdfUrl,
      uploadsFolderUrl: confUploadsFolderUrl,
      logoUrl: confLogoUrl
    };

    const updated = [...conferences, newConf];
    onUpdateConferences(updated);

    // reset
    setConfName('');
    setConfFullName('');
    setConfLocation('');
    setConfFormat('Hybrid');
    setConfYear('2026');
    setConfDates('');
    setConfDesc('');
    setConfTracksCSV('');
    setConfCfpPdfUrl('');
    setConfUploadsFolderUrl('');
    setConfLogoUrl('');
    setShowAddConf(false);
  };

  const handleStartEditConf = (conf: Conference) => {
    setEditingConfId(conf.id || '');
    setConfName(conf.name);
    setConfFullName(conf.fullName || conf.full_name || '');
    setConfLocation(conf.location);
    setConfFormat(conf.format || 'Hybrid');
    setConfYear(conf.year || '2026');
    setConfDates(conf.dates || '');
    setConfDesc(conf.description || '');
    setConfTracksCSV(conf.tracks ? conf.tracks.join(', ') : '');
    setConfCfpPdfUrl(conf.cfpPdfUrl || '');
    setConfUploadsFolderUrl(conf.uploadsFolderUrl || '');
    setConfLogoUrl(conf.logoUrl || '');
  };

  const handleSaveEditConf = (id: string) => {
    const updated = conferences.map(c => (c.id === id || c.slug === id) ? {
      ...c,
      name: confName,
      fullName: confFullName,
      full_name: confFullName,
      location: confLocation,
      format: confFormat,
      year: confYear,
      dates: confDates,
      description: confDesc,
      tracks: confTracksCSV.split(',').map(t => t.trim()).filter(Boolean),
      cfpPdfUrl: confCfpPdfUrl,
      uploadsFolderUrl: confUploadsFolderUrl,
      logoUrl: confLogoUrl
    } : c);
    onUpdateConferences(updated);
    setEditingConfId(null);
  };

  const handleDeleteConf = (id: string | undefined) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this conference? It will instantly disappear from all navigation maps.')) {
      const updated = conferences.filter(c => c.id !== id && c.slug !== id);
      onUpdateConferences(updated);
    }
  };

  // --- MENTOR ACTIONS ---
  const handleAddMentor = (e: React.FormEvent) => {
    e.preventDefault();
    const newMentor: Mentor = {
      id: `mentor-${Date.now()}`,
      name: mentorName || 'Prof. Unnamed Advisor',
      university: mentorUniversity || 'Wolverhampton Academy',
      country: mentorCountry || 'United Kingdom',
      rating: mentorRating,
      fields: mentorFieldsCSV ? mentorFieldsCSV.split(',').map(f => f.trim()) : ['Cybersecurity', 'Smart Edge Networks'],
      image: mentorImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
      email: mentorEmail || 'advisor@ritechs.com',
      bio: mentorBio || 'Credentialed independent journal peer evaluation coordinator.',
      publications: []
    };

    const updated = [...mentors, newMentor];
    onUpdateMentors(updated);

    // reset
    setMentorName('');
    setMentorUniversity('');
    setMentorCountry('');
    setMentorEmail('');
    setMentorBio('');
    setMentorImage('');
    setMentorFieldsCSV('');
    setMentorRating(4.8);
    setShowAddMentor(false);
  };

  const handleStartEditMentor = (m: Mentor) => {
    setEditingMentorId(m.id);
    setMentorName(m.name);
    setMentorUniversity(m.university);
    setMentorCountry(m.country);
    setMentorEmail(m.email || '');
    setMentorBio(m.bio || '');
    setMentorImage(m.image || '');
    setMentorFieldsCSV(m.fields.join(', '));
    setMentorRating(m.rating);
  };

  const handleSaveEditMentor = (id: string | number) => {
    const updated = mentors.map(m => m.id === id ? {
      ...m,
      name: mentorName,
      university: mentorUniversity,
      country: mentorCountry,
      email: mentorEmail,
      bio: mentorBio,
      image: mentorImage,
      fields: mentorFieldsCSV.split(',').map(f => f.trim()).filter(Boolean),
      rating: mentorRating
    } : m);
    onUpdateMentors(updated);
    setEditingMentorId(null);
  };

  const handleDeleteMentor = (id: string | number) => {
    if (confirm('Are you sure you want to delete this mentor advisor? This takes effect instantly across all search rosters.')) {
      const updated = mentors.filter(m => m.id !== id);
      onUpdateMentors(updated);
    }
  };

  // --- SERVICE RATES ACTION ---
  const handleSaveRates = () => {
    localStorage.setItem('ritechs_calc_standard_rate', customStandardRate.toString());
    localStorage.setItem('ritechs_calc_premium_rate', customPremiumRate.toString());
    setSavedRateSuccess(true);
    setTimeout(() => setSavedRateSuccess(false), 3000);
  };

  const handleResetToDefault = () => {
    localStorage.removeItem('ritechs_calc_standard_rate');
    localStorage.removeItem('ritechs_calc_premium_rate');
    setCustomStandardRate(0.025);
    setCustomPremiumRate(0.045);
    alert('Calculator rates restored to original scholarly benchmarks!');
  };

  return (
    <div className="pt-24 min-h-screen bg-maroon-dark text-white pb-12 premium-noise relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#330309]/80 to-transparent pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-left">
        
        {/* Superior Header Indicator */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-accent-gold/20 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping inline-block" />
              <span className="text-[10px] font-mono tracking-widest text-accent-gold uppercase font-bold">
                SECRETARIAT EXECUTIVE CORE
              </span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              Management & Admin Panel
            </h1>
            <p className="text-xs text-neutral-300 font-light mt-1">
              Add, modify, or erase all conference catalogs, blog critiques, mentor listings, and pricing margins dynamically with instant global updates.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('#/')}
              className="px-4 py-2 bg-transparent hover:bg-white/5 border border-accent-gold/20 text-accent-gold text-xs font-mono uppercase tracking-widest transition-all cursor-pointer rounded-xs"
            >
              Academic Front-end
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-[#AA2330] hover:bg-red-700 text-white text-xs font-mono uppercase tracking-widest transition-all cursor-pointer rounded-xs flex items-center gap-1.5 shadow-md"
            >
              <LogOut className="w-3.5 h-3.5" />
              Exit Secretariat
            </button>
          </div>
        </div>

        {/* Global Statistics Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-primary-maroon border border-accent-gold/15 p-4 rounded-xs">
            <span className="text-[9px] font-mono text-accent-gold/70 uppercase">Blogs Count</span>
            <div className="text-2xl font-serif-display font-black text-white mt-1">{blogs.length}</div>
          </div>
          <div className="bg-primary-maroon border border-accent-gold/15 p-4 rounded-xs">
            <span className="text-[9px] font-mono text-accent-gold/70 uppercase">Conferences Listed</span>
            <div className="text-2xl font-serif-display font-black text-white mt-1">{conferences.length}</div>
          </div>
          <div className="bg-primary-maroon border border-accent-gold/15 p-4 rounded-xs">
            <span className="text-[9px] font-mono text-accent-gold/70 uppercase">Expert Advisors</span>
            <div className="text-2xl font-serif-display font-black text-white mt-1">{mentors.length}</div>
          </div>
          <div className="bg-primary-maroon border border-accent-gold/15 p-4 rounded-xs">
            <span className="text-[9px] font-mono text-accent-gold/70 uppercase">Base Calculations</span>
            <div className="text-sm font-sans font-semibold text-accent-gold mt-2">
              Standard: ${customStandardRate}/wd
            </div>
          </div>
        </div>

        {/* Dashboard Section Selection Grid */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-accent-gold/10 pb-4 select-none">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer border ${
              activeTab === 'blogs' 
                ? 'bg-accent-gold text-primary-maroon border-accent-gold font-bold' 
                : 'bg-primary-maroon/40 text-neutral-300 border-accent-gold/10 hover:border-accent-gold/30 hover:text-white'
            }`}
          >
            Manage Editorial Blogs
          </button>
          <button
            onClick={() => setActiveTab('conferences')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer border ${
              activeTab === 'conferences' 
                ? 'bg-accent-gold text-primary-maroon border-accent-gold font-bold' 
                : 'bg-primary-maroon/40 text-neutral-300 border-accent-gold/10 hover:border-accent-gold/30 hover:text-white'
            }`}
          >
            Manage Conferences
          </button>
          <button
            onClick={() => setActiveTab('mentors')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer border ${
              activeTab === 'mentors' 
                ? 'bg-accent-gold text-primary-maroon border-accent-gold font-bold' 
                : 'bg-primary-maroon/40 text-neutral-300 border-accent-gold/10 hover:border-accent-gold/30 hover:text-white'
            }`}
          >
            Manage Mentors
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer border ${
              activeTab === 'services' 
                ? 'bg-accent-gold text-primary-maroon border-accent-gold font-bold' 
                : 'bg-primary-maroon/40 text-neutral-300 border-accent-gold/10 hover:border-accent-gold/30 hover:text-white'
            }`}
          >
            Pricing Config
          </button>
        </div>

        {/* TAB CONTENT: MANAGE BLOGS */}
        {activeTab === 'blogs' && (
          <div className="bg-primary-maroon/10 border border-accent-gold/15 p-6 rounded-xs">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif-display text-xl text-white font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent-gold" />
                Editorial Essays
              </h2>
              <button
                onClick={() => setShowAddBlog(!showAddBlog)}
                className="px-4 py-2 bg-accent-gold hover:bg-[#B3934B] text-primary-maroon text-[10px] font-mono uppercase tracking-widest font-black rounded-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                {showAddBlog ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                {showAddBlog ? 'Hide Form' : 'Write Scholar Essay'}
              </button>
            </div>

            {/* FORM TO ADD BLOG */}
            {showAddBlog && (
              <form onSubmit={handleAddBlog} className="mb-8 p-6 bg-primary-maroon border border-accent-gold/25 rounded-xs grid grid-cols-1 md:grid-cols-2 gap-4">
                <h3 className="col-span-full font-serif-display text-base font-bold text-accent-gold uppercase tracking-wide border-b border-accent-gold/15 pb-2">
                  Drafting New Essay
                </h3>
                
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Essay Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Comparative analysis of Post-Quantum Signatures"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Representative Photo URL</label>
                  <input
                    type="text"
                    placeholder="Unsplash image URL or blank"
                    value={blogImage}
                    onChange={(e) => setBlogImage(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Scholar Category</label>
                  <select
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  >
                    <option value="Academic Craft">Academic Craft</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Renewable Energy">Renewable Energy</option>
                    <option value="IoT Excellence">IoT Excellence</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 text-left col-span-1">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Primary Author</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Arthur Dent"
                    value={blogAuthor}
                    onChange={(e) => setBlogAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left col-span-full">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Short Abstract Outline</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Provide a strong 2-sentence summary hook."
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left col-span-full">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Full Editorial Manuscript Body</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Write or paste your full editorial critique..."
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="col-span-full flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddBlog(false)}
                    className="px-4 py-2 border border-white/20 hover:bg-white/5 font-mono text-[9px] tracking-widest uppercase cursor-pointer rounded-xs"
                  >
                    Cancel Draft
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-green-600 hover:bg-green-700 font-mono text-[9px] tracking-widest uppercase font-bold text-white cursor-pointer rounded-xs shadow-md"
                  >
                    Publish Instantly
                  </button>
                </div>
              </form>
            )}

            {/* LIST OF CURRENT BLOGS */}
            <div className="flex flex-col gap-3 font-sans">
              {blogs.map(post => (
                <div key={post.id} className="border border-accent-gold/15 p-4 rounded-xs bg-maroon-dark/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-accent-gold/30 transition-colors">
                  
                  {editingBlogId === post.id ? (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-full flex justify-between items-center border-b border-accent-gold/10 pb-2 mb-2">
                        <span className="font-mono text-[9px] uppercase font-bold text-accent-gold">Editing Essay</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveEditBlog(post.id)}
                            className="bg-green-600 hover:bg-green-700 text-white font-mono text-[9px] px-3 py-1 uppercase tracking-wider rounded-xs cursor-pointer flex items-center gap-1"
                          >
                            <Save className="w-3 h-3" /> Save Changes
                          </button>
                          <button
                            onClick={() => setEditingBlogId(null)}
                            className="bg-white/10 hover:bg-white/25 text-white font-mono text-[9px] px-3 py-1 uppercase tracking-wider rounded-xs cursor-pointer"
                          >
                            Discard
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Heading Title</label>
                        <input
                          type="text"
                          value={blogTitle}
                          onChange={(e) => setBlogTitle(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Author credit</label>
                        <input
                          type="text"
                          value={blogAuthor}
                          onChange={(e) => setBlogAuthor(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 text-left col-span-full">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Short Abstract</label>
                        <textarea
                          rows={2}
                          value={blogExcerpt}
                          onChange={(e) => setBlogExcerpt(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 text-left col-span-full">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Manuscript Content</label>
                        <textarea
                          rows={4}
                          value={blogContent}
                          onChange={(e) => setBlogContent(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                    </div>
                  ) : (
                    <>
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-[#330309] border border-accent-gold/25 overflow-hidden rounded-xs shrink-0 flex items-center justify-center">
                          <img 
                            src={post.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] font-mono bg-accent-gold/15 text-accent-gold px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                              {post.category}
                            </span>
                            <span className="text-[9px] font-mono text-neutral-400">Published {post.date}</span>
                          </div>
                          <h4 className="font-serif-display text-sm font-bold text-white mt-1 leading-snug">{post.title}</h4>
                          <p className="text-[10px] text-neutral-300 font-sans italic mt-0.5">By {post.author}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 items-center shrink-0">
                        <button
                          onClick={() => handleStartEditBlog(post)}
                          className="p-2 border border-accent-gold/20 text-accent-gold hover:bg-accent-gold hover:text-primary-maroon rounded-xs transition-colors cursor-pointer mr-1"
                          title="Edit Editorial Essay"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(post.id)}
                          className="p-2 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xs transition-colors cursor-pointer"
                          title="Delete Essay"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  )}

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB CONTENT: MANAGE CONFERENCES */}
        {activeTab === 'conferences' && (
          <div className="bg-primary-maroon/10 border border-accent-gold/15 p-6 rounded-xs">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif-display text-xl text-white font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent-gold" />
                Conferences Hub & Schedules
              </h2>
              <button
                onClick={() => setShowAddConf(!showAddConf)}
                className="px-4 py-2 bg-accent-gold hover:bg-[#B3934B] text-primary-maroon text-[10px] font-mono uppercase tracking-widest font-black rounded-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                {showAddConf ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                {showAddConf ? 'Hide Form' : 'Host New Conference'}
              </button>
            </div>

            {/* FORM TO ADD CONFERENCE */}
            {showAddConf && (
              <form onSubmit={handleAddConf} className="mb-8 p-6 bg-primary-maroon border border-accent-gold/25 rounded-xs grid grid-cols-1 md:grid-cols-2 gap-4">
                <h3 className="col-span-full font-serif-display text-base font-bold text-accent-gold uppercase tracking-wide border-b border-accent-gold/15 pb-2">
                  Launch Academic Forum
                </h3>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Acronym Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ICETCS 2026"
                    value={confName}
                    onChange={(e) => setConfName(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Institutional Full Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Int'l Conference on IoT Smart Cities"
                    value={confFullName}
                    onChange={(e) => setConfFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Physical Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. University of Genoa, Italy"
                    value={confLocation}
                    onChange={(e) => setConfLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Event Format</label>
                  <select
                    value={confFormat}
                    onChange={(e) => setConfFormat(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  >
                    <option value="Hybrid">Hybrid Session</option>
                    <option value="In-Person">In-Person Campus Only</option>
                    <option value="Virtual">Virtual Stream Suite</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Dates Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 12-Oct-26 to 13-Oct-26"
                    value={confDates}
                    onChange={(e) => setConfDates(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left col-span-full">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Call for Papers & Description</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe specific objectives and research paradigms..."
                    value={confDesc}
                    onChange={(e) => setConfDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left col-span-full">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Conference Research tracks (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="Quantum cryptography, Renewable energy grids, Edge IoT"
                    value={confTracksCSV}
                    onChange={(e) => setConfTracksCSV(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left col-span-full">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Call For Papers (CFP) PDF File Link</label>
                  <input
                    type="text"
                    placeholder="e.g. https://ritechs.org/uploads/1779448778.pdf"
                    value={confCfpPdfUrl}
                    onChange={(e) => setConfCfpPdfUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left col-span-full">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Uploads Directory / Files Folder Link</label>
                  <input
                    type="text"
                    placeholder="e.g. https://ritechs.org/uploads"
                    value={confUploadsFolderUrl}
                    onChange={(e) => setConfUploadsFolderUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left col-span-full">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Conference Institution Logo URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. https://domain.com/school-logo.png"
                    value={confLogoUrl}
                    onChange={(e) => setConfLogoUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="col-span-full flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddConf(false)}
                    className="px-4 py-2 border border-white/20 hover:bg-white/5 font-mono text-[9px] tracking-widest uppercase cursor-pointer rounded-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-green-600 hover:bg-green-700 font-mono text-[9px] tracking-widest uppercase font-bold text-white cursor-pointer rounded-xs shadow-md"
                  >
                    Host Forum Instantly
                  </button>
                </div>
              </form>
            )}

            {/* LIST OF CURRENT CONFERENCES */}
            <div className="flex flex-col gap-3 font-sans text-left">
              {conferences.map(conf => (
                <div key={conf.id || conf.name} className="border border-accent-gold/15 p-4 rounded-xs bg-maroon-dark/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-accent-gold/30 transition-colors">
                  
                  {editingConfId === (conf.id || conf.name) ? (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-full flex justify-between items-center border-b border-accent-gold/10 pb-2 mb-2">
                        <span className="font-mono text-[9px] uppercase font-bold text-accent-gold text-left">Editing Conference</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveEditConf(conf.id || conf.name)}
                            className="bg-green-600 hover:bg-green-700 text-white font-mono text-[9px] px-3 py-1 uppercase tracking-wider rounded-xs cursor-pointer flex items-center gap-1"
                          >
                            <Save className="w-3" /> Save Changes
                          </button>
                          <button
                            onClick={() => setEditingConfId(null)}
                            className="bg-white/10 hover:bg-white/25 text-white font-mono text-[9px] px-3 py-1 uppercase tracking-wider rounded-xs cursor-pointer"
                          >
                            Discard
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Acronym</label>
                        <input
                          type="text"
                          value={confName}
                          onChange={(e) => setConfName(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Full Institutional Title</label>
                        <input
                          type="text"
                          value={confFullName}
                          onChange={(e) => setConfFullName(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Duration Dates</label>
                        <input
                          type="text"
                          value={confDates}
                          onChange={(e) => setConfDates(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Location</label>
                        <input
                          type="text"
                          value={confLocation}
                          onChange={(e) => setConfLocation(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 col-span-full">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Research Topics (comma CSV)</label>
                        <input
                          type="text"
                          value={confTracksCSV}
                          onChange={(e) => setConfTracksCSV(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 col-span-full">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Description Call for Papers</label>
                        <textarea
                          rows={3}
                          value={confDesc}
                          onChange={(e) => setConfDesc(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 col-span-full">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Call for Papers (CFP) PDF Link</label>
                        <input
                          type="text"
                          value={confCfpPdfUrl}
                          onChange={(e) => setConfCfpPdfUrl(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 col-span-full">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Uploads Folder Link</label>
                        <input
                          type="text"
                          value={confUploadsFolderUrl}
                          onChange={(e) => setConfUploadsFolderUrl(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 col-span-full">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Institution Logo Link (Optional)</label>
                        <input
                          type="text"
                          value={confLogoUrl}
                          onChange={(e) => setConfLogoUrl(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                    </div>
                  ) : (
                    <>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-serif-display font-bold text-white">{conf.name}</span>
                          <span className="text-[8px] font-mono bg-accent-gold/15 text-accent-gold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {conf.format}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono italic">({conf.year})</span>
                        </div>
                        <p className="text-xs text-neutral-300 font-medium mt-1 leading-normal">
                          {conf.fullName || conf.full_name}
                        </p>
                        <div className="text-[9px] font-mono text-accent-gold/70 mt-1 uppercase tracking-wider">
                          📅 {conf.dates || 'TBD'} · 📍 {conf.location}
                        </div>
                      </div>

                      <div className="flex gap-2 items-center shrink-0">
                        <button
                          onClick={() => handleStartEditConf(conf)}
                          className="p-2 border border-accent-gold/20 text-accent-gold hover:bg-accent-gold hover:text-primary-maroon rounded-xs transition-colors cursor-pointer mr-1"
                          title="Edit Scheduled Conference"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteConf(conf.id || conf.slug)}
                          className="p-2 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xs transition-colors cursor-pointer"
                          title="Delete Conference"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  )}

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB CONTENT: MANAGE MENTORS */}
        {activeTab === 'mentors' && (
          <div className="bg-primary-maroon/10 border border-accent-gold/15 p-6 rounded-xs">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif-display text-xl text-white font-bold flex items-center gap-2">
                <Users className="w-5 h-5 text-accent-gold" />
                Scholarly Advisors & Mentors
              </h2>
              <button
                onClick={() => setShowAddMentor(!showAddMentor)}
                className="px-4 py-2 bg-accent-gold hover:bg-[#B3934B] text-primary-maroon text-[10px] font-mono uppercase tracking-widest font-black rounded-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                {showAddMentor ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                {showAddMentor ? 'Hide Form' : 'Enlist Expert Advisor'}
              </button>
            </div>

            {/* FORM TO ADD MENTOR */}
            {showAddMentor && (
              <form onSubmit={handleAddMentor} className="mb-8 p-6 bg-primary-maroon border border-accent-gold/25 rounded-xs grid grid-cols-1 md:grid-cols-2 gap-4">
                <h3 className="col-span-full font-serif-display text-base font-bold text-accent-gold uppercase tracking-wide border-b border-accent-gold/15 pb-2">
                  Enlist Scientific Advisor
                </h3>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Full Scholar Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prof. Giulio Ferro"
                    value={mentorName}
                    onChange={(e) => setMentorName(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Affiliated University</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. University of Genoa, Italy"
                    value={mentorUniversity}
                    onChange={(e) => setMentorUniversity(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Institutional Country</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Italy"
                    value={mentorCountry}
                    onChange={(e) => setMentorCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Contact Mail Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. prof.ferro@ritechs.org"
                    value={mentorEmail}
                    onChange={(e) => setMentorEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Avatar Image URL</label>
                  <input
                    type="text"
                    placeholder="Unsplash portrait photo or blank"
                    value={mentorImage}
                    onChange={(e) => setMentorImage(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Academic rating score</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1.0"
                    max="5.0"
                    placeholder="4.9"
                    value={mentorRating}
                    onChange={(e) => setMentorRating(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left col-span-full">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Fields of Expertise (comma-separated list)</label>
                  <input
                    type="text"
                    placeholder="e.g. Cryptography Theory, Kubernetes Security, IoT Sensors"
                    value={mentorFieldsCSV}
                    onChange={(e) => setMentorFieldsCSV(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left col-span-full">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961]/80">Advisor Professional Biography</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Dr. Giulio is a top tier editorial coordinator with over 150+ index citations..."
                    value={mentorBio}
                    onChange={(e) => setMentorBio(e.target.value)}
                    className="w-full px-3 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>

                <div className="col-span-full flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddMentor(false)}
                    className="px-4 py-2 border border-white/20 hover:bg-white/5 font-mono text-[9px] tracking-widest uppercase cursor-pointer rounded-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-green-600 hover:bg-green-700 font-mono text-[9px] tracking-widest uppercase font-bold text-white cursor-pointer rounded-xs shadow-md"
                  >
                    Enlist Advisor
                  </button>
                </div>
              </form>
            )}

            {/* LIST OF CURRENT ADVISORS */}
            <div className="flex flex-col gap-3 font-sans text-left">
              {mentors.map(m => (
                <div key={m.id} className="border border-accent-gold/15 p-4 rounded-xs bg-maroon-dark/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-accent-gold/30 transition-colors">
                  
                  {editingMentorId === m.id ? (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-full flex justify-between items-center border-b border-accent-gold/10 pb-2 mb-2">
                        <span className="font-mono text-[9px] uppercase font-bold text-accent-gold text-left">Editing Advisor</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveEditMentor(m.id)}
                            className="bg-green-600 hover:bg-green-700 text-white font-mono text-[9px] px-3 py-1 uppercase tracking-wider rounded-xs cursor-pointer flex items-center gap-1"
                          >
                            <Save className="w-3" /> Save Changes
                          </button>
                          <button
                            onClick={() => setEditingMentorId(null)}
                            className="bg-white/10 hover:bg-white/25 text-white font-mono text-[9px] px-3 py-1 uppercase tracking-wider rounded-xs cursor-pointer"
                          >
                            Disregard
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Scholar Name</label>
                        <input
                          type="text"
                          value={mentorName}
                          onChange={(e) => setMentorName(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Institutional Affiliation</label>
                        <input
                          type="text"
                          value={mentorUniversity}
                          onChange={(e) => setMentorUniversity(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Institutional Country</label>
                        <input
                          type="text"
                          value={mentorCountry}
                          onChange={(e) => setMentorCountry(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Secured Institutional Email</label>
                        <input
                          type="email"
                          value={mentorEmail}
                          onChange={(e) => setMentorEmail(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 col-span-full">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Fields (CSV)</label>
                        <input
                          type="text"
                          value={mentorFieldsCSV}
                          onChange={(e) => setMentorFieldsCSV(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 col-span-full">
                        <label className="font-mono text-[8.5px] uppercase text-accent-gold/60">Biography summary</label>
                        <textarea
                          rows={3}
                          value={mentorBio}
                          onChange={(e) => setMentorBio(e.target.value)}
                          className="px-3 py-1.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold text-xs rounded-xs"
                        />
                      </div>

                    </div>
                  ) : (
                    <>
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-[#330309] border border-accent-gold/25 overflow-hidden rounded-full shrink-0">
                          <img 
                            src={m.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'} 
                            alt={m.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h4 className="font-serif-display text-sm font-bold text-white leading-tight">{m.name}</h4>
                          <p className="text-[10px] text-neutral-300 font-sans mt-0.5">
                            🏫 {m.university}, {m.country}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {m.fields.map((f, i) => (
                              <span key={i} className="text-[7.5px] font-mono text-accent-gold bg-accent-gold/10 px-1.5 py-0.2 border border-accent-gold/10 uppercase">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 items-center shrink-0">
                        <button
                          onClick={() => handleStartEditMentor(m)}
                          className="p-2 border border-accent-gold/20 text-accent-gold hover:bg-accent-gold hover:text-primary-maroon rounded-xs transition-colors cursor-pointer mr-1"
                          title="Modify Expert profile"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteMentor(m.id)}
                          className="p-2 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xs transition-colors cursor-pointer"
                          title="Remove Expert Advisor"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  )}

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB CONTENT: SERVICES CALCULATION PRICING */}
        {activeTab === 'services' && (
          <div className="bg-primary-maroon/15 border border-accent-gold/20 p-6 rounded-xs">
            <h2 className="font-serif-display text-xl text-white font-bold flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-accent-gold" />
              Language Polishing Calculator Calibration
            </h2>
            <p className="text-xs text-neutral-300 font-light max-w-xl mb-6">
              Calibrate the decimal-multiplier cost constants per parsed word in real-time. Modifying these rate variables rewrites the estimation output instantly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-primary-maroon border border-accent-gold/20 rounded-xs mb-6 text-left">
              
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] font-bold">
                  Standard Peer Polish rate ($ per word)
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-accent-gold absolute left-3.5 top-3" />
                  <input
                    type="number"
                    step="0.001"
                    min="0.001"
                    placeholder="0.025"
                    value={customStandardRate}
                    onChange={(e) => setCustomStandardRate(parseFloat(e.target.value) || 0.025)}
                    className="w-full pl-10 pr-4 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>
                <span className="text-[8px] font-mono text-neutral-400">Benchmarked target rate: $0.025/word</span>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] font-bold">
                  Premium Expert Peer-Review rate ($ per word)
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-accent-gold absolute left-3.5 top-3" />
                  <input
                    type="number"
                    step="0.001"
                    min="0.001"
                    placeholder="0.045"
                    value={customPremiumRate}
                    onChange={(e) => setCustomPremiumRate(parseFloat(e.target.value) || 0.045)}
                    className="w-full pl-10 pr-4 py-2 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs"
                  />
                </div>
                <span className="text-[8px] font-mono text-neutral-400">Benchmarked target rate: $0.045/word</span>
              </div>

            </div>

            {savedRateSuccess && (
              <div className="mb-4 p-3 bg-green-900/40 border border-green-500/50 text-green-300 font-mono text-[9px] tracking-widest uppercase rounded-xs animate-pulse">
                ✓ Rates saved and synchronized globally! Real-time calculators calibrated.
              </div>
            )}

            <div className="flex gap-4 justify-end">
              <button
                onClick={handleResetToDefault}
                className="px-4 py-2 border border-white/20 hover:bg-white/5 font-mono text-[9px] tracking-widest uppercase cursor-pointer rounded-xs"
              >
                Reset original rates
              </button>
              <button
                onClick={handleSaveRates}
                className="px-6 py-2.5 bg-accent-gold hover:bg-[#B3934B] text-primary-maroon font-bold font-mono text-[9px] tracking-widest uppercase cursor-pointer rounded-xs shadow-md"
              >
                Apply Custom Pricing Rules
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
