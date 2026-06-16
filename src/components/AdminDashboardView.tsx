import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Save, FileText, Calendar, Users, DollarSign, 
  Settings, Check, X, Shield, RefreshCw, RefreshCcw, LogOut, Info, BookOpen,
  Image as ImageIcon, Globe, History, Sparkles, AlertTriangle
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
  const [activeTab, setActiveTab] = useState<'blogs' | 'conferences' | 'mentors' | 'services' | 'assets' | 'seo' | 'history'>('blogs');

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

  // --- AUDIT SYSTEM SCHEMA ---
  interface AuditLog {
    id: string;
    timestamp: string;
    category: 'conference' | 'mentor' | 'blog' | 'assets' | 'seo';
    action: string;
    details: string;
  }

  const [logs, setLogs] = useState<AuditLog[]>(() => {
    const stored = localStorage.getItem('ritechs_audit_logs');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    const initLogs: AuditLog[] = [
      {
        id: 'log-init-1',
        timestamp: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
        category: 'seo',
        action: 'SEO Metadata Initialized',
        details: 'Pristine security descriptions matching academic parameters indexed by crawlers.'
      },
      {
        id: 'log-init-2',
        timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
        category: 'conference',
        action: 'Database Catalog Active',
        details: 'Loaded 2 active conferences into Oxford and Genoa system memory.'
      }
    ];
    localStorage.setItem('ritechs_audit_logs', JSON.stringify(initLogs));
    return initLogs;
  });

  const logAction = (category: 'conference' | 'mentor' | 'blog' | 'assets' | 'seo', action: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      category,
      action,
      details
    };
    setLogs(prev => {
      const u = [newLog, ...prev];
      localStorage.setItem('ritechs_audit_logs', JSON.stringify(u));
      return u;
    });
  };

  // --- REGIONAL BRAND SETTINGS ---
  const [logoSetting, setLogoSetting] = useState(() => localStorage.getItem('ritechs_logo') || '/logo.png');
  const [featuredSectionSetting, setFeaturedSectionSetting] = useState(() => localStorage.getItem('ritechs_featured_banner') || '/banner 5.png');
  const [assetSavedSuccess, setAssetSavedSuccess] = useState(false);

  // --- LIVE SEO DOCUMENT CONTROLLER ---
  const [docTitle, setDocTitle] = useState(() => localStorage.getItem('ritechs_seo_title') || 'RiTECHS Platform — Global Academic Excellence');
  const [metaDesc, setMetaDesc] = useState(() => localStorage.getItem('ritechs_seo_description') || 'An elite global hub nurturing cybersecurity, IoT excellence, and energy sustainability scholarship. Aligning researchers with world-renowned peer systems.');
  const [seoSavedSuccess, setSeoSavedSuccess] = useState(false);

  // Sync to DOM header elements dynamically
  useEffect(() => {
    if (docTitle) {
      document.title = docTitle;
    }
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    if (metaDesc) {
      metaTag.setAttribute('content', metaDesc);
    }
    localStorage.setItem('ritechs_seo_title', docTitle);
    localStorage.setItem('ritechs_seo_description', metaDesc);
  }, [docTitle, metaDesc]);

  const handleSaveAssets = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('ritechs_logo', logoSetting);
    localStorage.setItem('ritechs_featured_banner', featuredSectionSetting);
    setAssetSavedSuccess(true);
    logAction('assets', 'Brand Assets Configured', 'Realigned corporate logo image and core banner sliders.');
    // Broadcast storage event to force local state reload
    window.dispatchEvent(new Event('storage'));
    setTimeout(() => setAssetSavedSuccess(false), 3000);
  };

  const handleSaveSEO = (e: React.FormEvent) => {
    e.preventDefault();
    logAction('seo', 'SEO Metadata Synchronized', `Modified doc title tag: "${docTitle}".`);
    setSeoSavedSuccess(true);
    setTimeout(() => setSeoSavedSuccess(false), 3000);
  };

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
    logAction('blog', 'Editorial Blog Appended', `Published new publication editorial draft: "${newBlog.title}".`);
    
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
    logAction('blog', 'Editorial Blog Edited', `Amended narrative structure for blog: "${blogTitle}".`);
  };

  const handleDeleteBlog = (id: string | number) => {
    if (confirm('Are you sure you want to permanently delete this blog post? This takes effect instantly.')) {
      const target = blogs.find(b => b.id === id);
      const updated = blogs.filter(b => b.id !== id);
      onUpdateBlogs(updated);
      logAction('blog', 'Editorial Blog Removed', `Permanently deleted editorial post "${target?.title || id}".`);
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
    logAction('conference', 'Academic Conference Appended', `Published track metrics for: "${newConf.name}".`);

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
    logAction('conference', 'Academic Conference Edited', `Updated credentials and tracks for: "${confName}".`);
  };

  const handleDeleteConf = (id: string | undefined) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this conference? It will instantly disappear from all navigation maps.')) {
      const target = conferences.find(c => c.id === id || c.slug === id);
      const updated = conferences.filter(c => c.id !== id && c.slug !== id);
      onUpdateConferences(updated);
      logAction('conference', 'Academic Conference Terminated', `De-registered conference context: "${target?.name || id}".`);
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
    logAction('mentor', 'Research Advisor Appended', `Listed mentor expert: "${newMentor.name}".`);

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
    logAction('mentor', 'Research Advisor Edited', `Amended coordinates/affiliation of advisor: "${mentorName}".`);
  };

  const handleDeleteMentor = (id: string | number) => {
    if (confirm('Are you sure you want to delete this mentor advisor? This takes effect instantly across all search rosters.')) {
      const target = mentors.find(m => m.id === id);
      const updated = mentors.filter(m => m.id !== id);
      onUpdateMentors(updated);
      logAction('mentor', 'Research Advisor Dismissed', `De-enlisted advisory record for Prof: "${target?.name || id}".`);
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
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8 border-b border-accent-gold/10 pb-4 select-none">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-3 py-2.5 text-[11px] font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer border flex items-center justify-center gap-1.5 ${
              activeTab === 'blogs' 
                ? 'bg-accent-gold text-primary-maroon border-accent-gold font-bold shadow-[0_4px_12px_rgba(201,169,97,0.2)]' 
                : 'bg-primary-maroon/20 text-neutral-300 border-accent-gold/10 hover:border-accent-gold/40 hover:text-white hover:bg-primary-maroon/40'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0 text-accent-gold" />
            Blogs
          </button>
          <button
            onClick={() => setActiveTab('conferences')}
            className={`px-3 py-2.5 text-[11px] font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer border flex items-center justify-center gap-1.5 ${
              activeTab === 'conferences' 
                ? 'bg-accent-gold text-primary-maroon border-accent-gold font-bold shadow-[0_4px_12px_rgba(201,169,97,0.2)]' 
                : 'bg-primary-maroon/20 text-neutral-300 border-accent-gold/10 hover:border-accent-gold/40 hover:text-white hover:bg-primary-maroon/40'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 shrink-0 text-accent-gold" />
            Confs
          </button>
          <button
            onClick={() => setActiveTab('mentors')}
            className={`px-3 py-2.5 text-[11px] font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer border flex items-center justify-center gap-1.5 ${
              activeTab === 'mentors' 
                ? 'bg-accent-gold text-primary-maroon border-accent-gold font-bold shadow-[0_4px_12px_rgba(201,169,97,0.2)]' 
                : 'bg-primary-maroon/20 text-neutral-300 border-accent-gold/10 hover:border-accent-gold/40 hover:text-white hover:bg-primary-maroon/40'
            }`}
          >
            <Users className="w-3.5 h-3.5 shrink-0 text-accent-gold" />
            Mentors
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3 py-2.5 text-[11px] font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer border flex items-center justify-center gap-1.5 ${
              activeTab === 'services' 
                ? 'bg-accent-gold text-primary-maroon border-accent-gold font-bold shadow-[0_4px_12px_rgba(201,169,97,0.2)]' 
                : 'bg-primary-maroon/20 text-neutral-300 border-accent-gold/10 hover:border-accent-gold/40 hover:text-white hover:bg-primary-maroon/40'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 shrink-0 text-accent-gold" />
            Pricing
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`px-3 py-2.5 text-[11px] font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer border flex items-center justify-center gap-1.5 ${
              activeTab === 'assets' 
                ? 'bg-accent-gold text-primary-maroon border-accent-gold font-bold shadow-[0_4px_12px_rgba(201,169,97,0.2)]' 
                : 'bg-primary-maroon/20 text-neutral-300 border-accent-gold/10 hover:border-accent-gold/40 hover:text-white hover:bg-primary-maroon/40'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 shrink-0 text-accent-gold" />
            Assets
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-3 py-2.5 text-[11px] font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer border flex items-center justify-center gap-1.5 ${
              activeTab === 'seo' 
                ? 'bg-accent-gold text-primary-maroon border-accent-gold font-bold shadow-[0_4px_12px_rgba(201,169,97,0.2)]' 
                : 'bg-primary-maroon/20 text-neutral-300 border-accent-gold/10 hover:border-accent-gold/40 hover:text-white hover:bg-primary-maroon/40'
            }`}
          >
            <Globe className="w-3.5 h-3.5 shrink-0 text-accent-gold" />
            SEO
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-2.5 text-[11px] font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer border flex items-center justify-center gap-1.5 ${
              activeTab === 'history' 
                ? 'bg-accent-gold text-primary-maroon border-accent-gold font-bold shadow-[0_4px_12px_rgba(201,169,97,0.2)]' 
                : 'bg-primary-maroon/20 text-neutral-300 border-accent-gold/10 hover:border-accent-gold/40 hover:text-white hover:bg-primary-maroon/40'
            }`}
          >
            <History className="w-3.5 h-3.5 shrink-0 text-accent-gold" />
            Logs
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

          </div>
        )}

        {/* TAB CONTENT: ASSET MANAGER */}
        {activeTab === 'assets' && (
          <div className="bg-primary-maroon/15 border border-accent-gold/20 p-6 rounded-xs text-left animate-fadeIn">
            <h2 className="font-serif-display text-xl text-white font-bold flex items-center gap-2 mb-2">
              <ImageIcon className="w-5 h-5 text-accent-gold" />
              Regional Asset & Corporate Brand Manager
            </h2>
            <p className="text-xs text-neutral-300 font-light max-w-xl mb-6 font-sans">
              Update site-wide logos and featured section hero assets dynamically in real-time. Changes are immediately stored locally and rendered across global corporate blocks.
            </p>

            <form onSubmit={handleSaveAssets} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-primary-maroon border border-accent-gold/20 rounded-xs">
                
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] font-bold">
                    Official Institutional Logo URI
                  </label>
                  <input
                    type="text"
                    value={logoSetting}
                    onChange={(e) => setLogoSetting(e.target.value)}
                    placeholder="e.g. /logo.png or link address"
                    className="w-full px-4 py-2.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs text-white placeholder-neutral-500 font-mono"
                  />
                  <div className="mt-2 flex items-center gap-3 bg-black/20 p-2.5 border border-accent-gold/10 rounded-xs">
                    <img
                      src={logoSetting}
                      alt="Logo Preview"
                      className="w-10 h-10 object-contain bg-primary-maroon p-1 border border-accent-gold/25 rounded-xs"
                      onError={(e) => {
                        e.currentTarget.src = "/logo.png";
                      }}
                    />
                    <span className="text-[8px] font-mono text-neutral-400">Current Logo Live Preview</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] font-bold">
                    Featured Exhibition Hero Banner Link
                  </label>
                  <input
                    type="text"
                    value={featuredSectionSetting}
                    onChange={(e) => setFeaturedSectionSetting(e.target.value)}
                    placeholder="e.g. /banner 5.png or external link"
                    className="w-full px-4 py-2.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs text-white placeholder-neutral-500 font-mono"
                  />
                  <div className="mt-2 flex items-center gap-3 bg-black/20 p-2.5 border border-accent-gold/10 rounded-xs">
                    <img
                      src={featuredSectionSetting}
                      alt="Hero Banner Preview"
                      className="w-14 h-8 object-cover rounded-xs border border-accent-gold/20"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                    <span className="text-[8px] font-mono text-neutral-400">Current Hero Banner Preview</span>
                  </div>
                </div>

              </div>

              {assetSavedSuccess && (
                <div id="asset-success-notif" className="p-3 bg-green-900/40 border border-green-500/50 text-green-300 font-mono text-[9px] tracking-widest uppercase rounded-xs animate-pulse">
                  ✓ High-fidelity corporate assets synchronized successfully! Brand maps updated.
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setLogoSetting('/logo.png');
                    setFeaturedSectionSetting('/banner 5.png');
                  }}
                  className="px-4 py-2 border border-white/20 hover:bg-white/5 font-mono text-[8px] tracking-widest uppercase cursor-pointer rounded-xs text-stone-300"
                >
                  Restore Factory Originals
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-accent-gold hover:bg-[#B3934B] text-primary-maroon font-bold font-mono text-[8.5px] tracking-widest uppercase cursor-pointer rounded-xs shadow-md"
                >
                  Save and Publish Brand Assets
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB CONTENT: INTERNATIONAL SEO MANAGER */}
        {activeTab === 'seo' && (
          <div className="bg-primary-maroon/15 border border-accent-gold/20 p-6 rounded-xs text-left animate-fadeIn">
            <h2 className="font-serif-display text-xl text-white font-bold flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-accent-gold" />
              Search Engine & Metatag Optimization Center
            </h2>
            <p className="text-xs text-neutral-300 font-light max-w-xl mb-6 font-sans">
              Dynamically manipulate the DOM title and semantic description meta header variables. This keeps crawled content fresh and optimized for international academic search engines.
            </p>

            <form onSubmit={handleSaveSEO} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 p-6 bg-primary-maroon border border-accent-gold/20 rounded-xs">
                
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] font-bold">
                    Target Document Title Tag (Real-Time DOM)
                  </span>
                  <input
                    type="text"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs text-white"
                    placeholder="RiTECHS Platform — Global Academic Excellence"
                  />
                  <span className="text-[8px] font-mono text-neutral-400/85">Updates standard browser title bars and search query snippet headers.</span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A961] font-bold">
                    Global Meta Description Content
                  </span>
                  <textarea
                    rows={4}
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    className="w-full px-4 py-2.5 bg-maroon-dark border border-accent-gold/25 focus:border-accent-gold outline-none text-xs rounded-xs text-white font-sans"
                    placeholder="Enter global SEO crawler summary details..."
                  />
                  <span className="text-[8px] font-mono text-neutral-400/85">Provides descriptions utilized by search indexing crawlers.</span>
                </div>

              </div>

              {seoSavedSuccess && (
                <div id="seo-success-notif" className="p-3 bg-green-900/40 border border-green-500/50 text-green-300 font-mono text-[9px] tracking-widest uppercase rounded-xs">
                  ✓ SEO DOM Meta Variables compiled and aligned for international indexing engines!
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-accent-gold hover:bg-[#B3934B] text-primary-maroon font-bold font-mono text-[8.5px] tracking-widest uppercase cursor-pointer rounded-xs shadow-md"
                >
                  Sync Metadata Registers
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB CONTENT: CHANGE HISTORY & AUDIT LOG */}
        {activeTab === 'history' && (
          <div className="bg-primary-maroon/15 border border-accent-gold/20 p-6 rounded-xs text-left animate-fadeIn">
            <div className="flex justify-between items-start gap-4 mb-2 flex-wrap">
              <div>
                <h2 className="font-serif-display text-xl text-white font-bold flex items-center gap-2">
                  <History className="w-5 h-5 text-accent-gold" />
                  Administrative Audit Logs & History Tracker
                </h2>
                <p className="text-xs text-neutral-300 font-light max-w-xl mt-1 font-sans">
                  Chronological trace of recent modifications made to academic data elements (Conferences, Mentors, Blogs, Assets, or SEO parameters) during this session.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const cleared = [{
                    id: 'log-clear-0',
                    timestamp: new Date().toISOString(),
                    category: 'seo' as const,
                    action: 'Audit Log Cleaned',
                    details: 'Log records flushed by admin command.'
                  }];
                  setLogs(cleared);
                  localStorage.setItem('ritechs_audit_logs', JSON.stringify(cleared));
                }}
                className="px-3 py-1.5 border border-red-500/30 hover:bg-red-500/10 hover:text-red-300 text-red-100 font-mono text-[8.5px] uppercase tracking-wider rounded-xs cursor-pointer"
              >
                Clear History Logs
              </button>
            </div>

            <div className="mt-6 bg-primary-maroon border border-accent-gold/20 rounded-xs overflow-hidden">
              <div className="px-4 py-2.5 bg-maroon-dark/60 border-b border-accent-gold/15 flex items-center justify-between text-[8px] font-mono uppercase tracking-widest text-accent-gold/60 font-bold">
                <span>Action & Registered System Components</span>
                <span>Timestamp (Local)</span>
              </div>

              <div className="divide-y divide-accent-gold/10 max-h-[420px] overflow-y-auto">
                {logs.length === 0 ? (
                  <div className="p-8 text-center text-neutral-400 font-mono text-xs">
                    No active modifications have been logged in the system.
                  </div>
                ) : (
                  logs.map((log) => {
                    let catColor = "text-blue-450 bg-blue-500/10 border-blue-500/20";
                    if (log.category === 'conference') catColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
                    if (log.category === 'mentor') catColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
                    if (log.category === 'blog') catColor = "text-purple-400 bg-purple-500/10 border-purple-500/20";
                    if (log.category === 'assets') catColor = "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";

                    return (
                      <div key={log.id} className="p-4 hover:bg-white/2.5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                        <div className="flex items-start gap-3">
                          <span className={`px-2 py-0.5 text-[7px] font-mono uppercase tracking-widest border font-semibold shrink-0 rounded-xs mt-0.5 ${catColor}`}>
                            {log.category}
                          </span>
                          <div>
                            <p className="text-white text-xs font-semibold leading-tight">{log.action}</p>
                            <p className="text-[#9CA3AF] text-[10px] mt-1 font-light font-sans">{log.details}</p>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono text-neutral-450 shrink-0 bg-maroon-dark px-2 py-1 border border-accent-gold/10 rounded-xs sm:self-center self-start">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
