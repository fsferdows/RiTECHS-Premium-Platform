import React, { useState, useEffect } from 'react';
import { 
  FolderIcon, FileText, Upload, GraduationCap, Video, CheckCircle2, 
  Settings, Clock, Award, ShieldCheck, Download, Play, Pause, ChevronRight, 
  FileSpreadsheet, Sparkles, User, Mail, Globe, Printer, AlertCircle, LayoutDashboard,
  Copy, Eye, X, BookMarked
} from 'lucide-react';
import { Manuscript, UserState, INITIAL_AUTHORS } from '../types';

interface DashboardViewProps {
  user: UserState;
  manuscripts: Manuscript[];
  onUpdateUser: (updatedUser: Partial<UserState>) => void;
  onNavigate: (path: string) => void;
  timeThemeSync?: boolean;
  onToggleTimeThemeSync?: (enabled: boolean) => void;
}

interface CourseChapter {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl: string;
}

export default function DashboardView({ 
  user, 
  manuscripts, 
  onUpdateUser, 
  onNavigate,
  timeThemeSync = false,
  onToggleTimeThemeSync
}: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'elearning' | 'tracker' | 'settings'>('overview');

  const AVAILABLE_INTERESTS = [
    "Quantum Cryptography",
    "TinyML Load Prediction",
    "Autonomous Vehicles (CAVs)",
    "Blockchain Protocols",
    "Smart Energy Grids",
    "IoT Cybersecurity",
    "Hypervisor Security",
    "Space Systems"
  ];

  const [selectedInterests, setSelectedInterests] = useState<string[]>(() => {
    const saved = localStorage.getItem('ritechs_user_interests');
    return saved ? JSON.parse(saved) : ["Quantum Cryptography", "IoT Cybersecurity"];
  });
  
  // Manuscript tracking state
  const [localManuscripts, setLocalManuscripts] = useState<Manuscript[]>(manuscripts);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [activeManuscriptId, setActiveManuscriptId] = useState<string>('manuscript-01');
  const [copiedManuscriptId, setCopiedManuscriptId] = useState<string | null>(null);
  const [printPreviewOpen, setPrintPreviewOpen] = useState(false);

  // ELearning Video states
  const [chapters, setChapters] = useState<CourseChapter[]>([
    { id: 'ch1', title: '01. Post-Quantum Cryptographic Readiness Protocols', duration: '18:42', completed: true, videoUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a' },
    { id: 'ch2', title: '02. TinyML Load Prediction algorithms on Smart Grids', duration: '24:15', completed: true, videoUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7' },
    { id: 'ch3', title: '03. Writing for Nature & IEEE: Abstract Hook optimization', duration: '14:50', completed: false, videoUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8' },
    { id: 'ch4', title: '04. Rigorous Rebuttals & Program Chair communications', duration: '19:10', completed: false, videoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2' }
  ]);
  const [activeChapter, setActiveChapter] = useState<CourseChapter>(chapters[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [videoProgress, setVideoProgress] = useState(35); // simulated percent
  const [videoQuality, setVideoQuality] = useState<'720p' | '1080p' | '4K'>('1080p');
  const [certificateEarned, setCertificateEarned] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [videoError, setVideoError] = useState<Record<string, boolean>>({});
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  // Sync playback rates and states with HTML5 video events
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Guard failed playbacks securely (e.g. initial gesture block or empty assets)
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, activeChapter]);

  // Profile fields state
  const [profileName, setProfileName] = useState(user.name || '');
  const [profileEmail, setProfileEmail] = useState(user.email || '');
  const [profileAffiliation, setProfileAffiliation] = useState('University of Wolverhampton');
  const [profileStatus, setProfileStatus] = useState<string>('');

  useEffect(() => {
    // Determine certificate if all completed
    const allDone = chapters.every(c => c.completed);
    setCertificateEarned(allDone);
  }, [chapters]);

  // Handle fake file drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (['pdf', 'docx', 'doc', 'tex'].includes(ext || '')) {
        setSelectedFile(file);
        setNewTitle(file.name.replace(/\.[^/.]+$/, ""));
      } else {
        alert('Invalid format. Please upload .docx, .doc, .pdf or .tex files.');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setNewTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !newTitle) return;

    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return 10;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const sizeString = `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`;
            const newManuscript: Manuscript = {
              id: `manuscript-${Date.now()}`,
              title: newTitle,
              serviceType: "Premium Peer Reviewing & Formatting",
              fileSize: sizeString,
              fileName: selectedFile.name,
              status: "Submitted",
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              timeline: [
                { title: "Submitted", date: new Date().toLocaleDateString(), done: true },
                { title: "Assigned to Editor", date: "Pending Allocation", done: false },
                { title: "In Editing", date: "Pending", done: false },
                { title: "QA Peer Review Review", date: "Pending", done: false },
                { title: "Delivered to Scholar", date: "Pending", done: false }
              ]
            };
            setLocalManuscripts([newManuscript, ...localManuscripts]);
            setActiveManuscriptId(newManuscript.id);
            setSelectedFile(null);
            setNewTitle('');
            setUploadProgress(null);
            setActiveTab('tracker');
          }, 600);
          return 100;
        }
        return prev + 30;
      });
    }, 150);
  };

  const handleChapterSelect = (chapter: CourseChapter) => {
    setActiveChapter(chapter);
    setIsPlaying(false);
    setVideoProgress(chapter.completed ? 100 : 15);
  };

  const handleLessonCompletion = () => {
    // Mark current lesson as complete
    const updated = chapters.map(c => c.id === activeChapter.id ? { ...c, completed: true } : c);
    setChapters(updated);
    
    // Find next uncompleted chapter
    const nextChapter = updated.find(c => !c.completed);
    if (nextChapter) {
      setActiveChapter(nextChapter);
      setVideoProgress(15);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: profileName,
      email: profileEmail
    });
    setProfileStatus('Preferences synchronized successfully inside client memory.');
    setTimeout(() => setProfileStatus(''), 4000);
  };

  const selectedManuscript = localManuscripts.find(m => m.id === activeManuscriptId) || localManuscripts[0];

  const handleCopyLink = (manuscriptId: string) => {
    const shareUrl = `${window.location.origin}/#/dashboard?manuscript=${manuscriptId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedManuscriptId(manuscriptId);
      setTimeout(() => setCopiedManuscriptId(null), 2000);
    });
  };

  const downloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportBibTeX = (manuscript: Manuscript) => {
    const author = "RiTECHS Affiliate Scholar";
    const year = manuscript.date ? manuscript.date.split('-')[0] : '2026';
    const cleanId = manuscript.id.replace(/[^a-zA-Z0-9]/g, '');
    const bib = `@article{${cleanId}_${year},
  author = {${author}},
  title = {${manuscript.title}},
  journal = {RiTECHS Scholarly Peer-Rebuttal Repository},
  year = {${year}},
  note = {Manuscript ID: ${manuscript.id}, Status: ${manuscript.status}, Size: ${manuscript.fileSize}}
}`;
    downloadFile(`${manuscript.id}_citation.bib`, bib, 'application/x-bibtex');
  };

  const handleExportRIS = (manuscript: Manuscript) => {
    const author = "RiTECHS Affiliate Scholar";
    const year = manuscript.date ? manuscript.date.split('-')[0] : '2026';
    const ris = `TY  - JOUR
AU  - ${author}
TI  - ${manuscript.title}
JO  - RiTECHS Scholarly Peer-Rebuttal Repository
PY  - ${year}
UR  - http://ritechs.org/submissions/${manuscript.id.toLowerCase()}
N1  - Status: ${manuscript.status}
N1  - Size: ${manuscript.fileSize}
ER  - `;
    downloadFile(`${manuscript.id}_citation.ris`, ris, 'application/x-research-info-systems');
  };

  const notifications = React.useMemo(() => {
    const list: { id: string; type: 'manuscript' | 'conference'; title: string; subtitle: string; date: string; tag: string }[] = [];

    localManuscripts.forEach((m) => {
      const matches = selectedInterests.some(interest => {
        const words = interest.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        return words.some(w => m.title.toLowerCase().includes(w) || m.serviceType.toLowerCase().includes(w));
      });
      if (matches) {
        list.push({
          id: `m-alert-${m.id}`,
          type: 'manuscript',
          title: `New Manuscript matching: ${m.title}`,
          subtitle: `Uploaded on ${m.date}. Security pre-vetting validation complete.`,
          date: m.date,
          tag: m.serviceType
        });
      }
    });

    if (selectedInterests.length > 0) {
      if (selectedInterests.some(i => i.includes("Cryptography") || i.includes("Cybersecurity"))) {
        list.push({
          id: 'conf-deadline-icetcs',
          type: 'conference',
          title: 'DEADLINE APPROACHING: ICETCS 2026 Camera-Ready Submission',
          subtitle: 'The hard deadline is June 30, 2026. Submit formatted papers now to avoid late fee structures.',
          date: '2026-06-30',
          tag: 'ICETCS 2026'
        });
      }
      if (selectedInterests.some(i => i.includes("IoT") || i.includes("Vehicles") || i.includes("Grids"))) {
        list.push({
          id: 'conf-deadline-itss',
          type: 'conference',
          title: 'DEADLINE APPROACHING: ITSS-IoE 2026 Draft Submission',
          subtitle: 'Peer-review system closes in 18 days. Coordinate with your assigned mentor ASAP.',
          date: '2026-07-04',
          tag: 'ITSS-IoE 2026'
        });
      }
    }

    return list;
  }, [selectedInterests, localManuscripts]);

  const sidebarItems = [
    { id: 'overview' as const, label: 'Portal Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'elearning' as const, label: 'e-Learning Syllabi', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'tracker' as const, label: 'Manuscript Spaces', icon: <FileText className="w-4 h-4" /> },
    { id: 'settings' as const, label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div id="dashboard-portal-view" className="pt-20 min-h-screen animate-fade-in-up flex flex-col xl:flex-row text-charcoal bg-[#FAFAF7] premium-noise">
      
      {/* Dashboard Left Sidebar */}
      <aside className="w-full xl:w-64 bg-primary-navy xl:min-h-[calc(100vh-80px)] text-white/80 p-6 flex flex-col gap-6 shrink-0 border-r border-accent-gold/15">
        <div className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-gold/15 border border-accent-gold flex items-center justify-center text-accent-gold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-display text-sm font-bold text-white block max-w-[140px] truncate leading-tight">
                {user.name}
              </h4>
              <p className="text-[10px] uppercase tracking-wider font-mono text-accent-gold font-semibold">
                {user.role} tier
              </p>
            </div>
          </div>
        </div>

        <nav className="flex xl:flex-col gap-1 overflow-x-auto xl:overflow-x-visible py-2 xl:py-0 border-b xl:border-b-0 border-white/10 shrink-0">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xs text-xs font-mono uppercase tracking-wider transition-all duration-300 text-left shrink-0 xl:shrink-1 ${
                activeTab === item.id 
                  ? 'bg-accent-gold text-primary-navy font-bold shadow-md' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Board notification support */}
        <div className="mt-auto hidden xl:block bg-white/5 border border-white/10 p-4 rounded-xs text-[11px] leading-relaxed">
          <div className="flex gap-2 text-accent-gold font-bold mb-2 font-mono">
            <Award className="w-4 h-4 shrink-0" />
            <span>ADVISORY DIRECTIVE</span>
          </div>
          <p className="text-white/70 font-light font-sans">
            Have you completed your LaTeX formatting alignments? Verify guidelines inside our Course catalogs.
          </p>
        </div>
      </aside>

      {/* Dashboard Main Workspace Panel */}
      <main className="flex-grow p-6 sm:p-10">
        
        {/* SUBVIEW: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-8 animate-fade-in">
            {/* Greeting */}
            <div>
              <h1 className="font-serif-display text-3xl sm:text-4.5xl text-primary-navy font-bold leading-none mb-2">
                Academia Matchmaker Portal
              </h1>
              <p className="text-sm text-muted-gray font-light">
                Welcome back, {user.name}. View peer manuscript statuses, review classes, and consult advisors.
              </p>
            </div>

            {/* Quick stats widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                onClick={() => setActiveTab('tracker')}
                className="bg-white border border-divider-gold/60 p-6 flex items-center justify-between shadow-xs hover:border-accent-gold/40 cursor-pointer transition-colors"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-gray">Live Manuscripts</span>
                  <div className="font-serif-display text-3xl font-bold text-primary-navy mt-1">
                    {localManuscripts.length} Files
                  </div>
                </div>
                <FolderIcon className="w-10 h-10 text-accent-gold/40" />
              </div>

              <div 
                onClick={() => setActiveTab('elearning')}
                className="bg-white border border-divider-gold/60 p-6 flex items-center justify-between shadow-xs hover:border-accent-gold/40 cursor-pointer transition-colors"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-gray">Academic Syllabi</span>
                  <div className="font-serif-display text-3xl font-bold text-primary-navy mt-1 animate-pulse">
                    {chapters.filter(c => c.completed).length}/{chapters.length} Completed
                  </div>
                </div>
                <GraduationCap className="w-10 h-10 text-accent-gold/40" />
              </div>

              <div 
                onClick={() => setActiveTab('settings')}
                className="bg-white border border-divider-gold/60 p-6 flex items-center justify-between shadow-xs hover:border-accent-gold/40 cursor-pointer transition-colors"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-gray">Registered Email</span>
                  <div className="font-serif-display text-lg font-bold text-primary-navy mt-1 truncate max-w-[180px]">
                    {user.email}
                  </div>
                </div>
                <Mail className="w-10 h-10 text-accent-gold/40" />
              </div>
            </div>

            {/* Matching Interests & Deadline Alerts Center */}
            {notifications.length > 0 && (
              <div className="bg-[#102447] border border-accent-gold/45 p-6 text-white select-none relative overflow-hidden shadow-md">
                <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 bg-accent-gold/5 rounded-full pointer-events-none" />
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-accent-gold animate-pulse shrink-0" />
                  <h3 className="font-serif-display font-semibold text-sm sm:text-base text-accent-gold tracking-wider uppercase">
                    Scholarly Alerts: Matching Interests & Deadlines
                  </h3>
                  <span className="bg-[#9c2535] text-white text-[9px] font-mono font-black px-2.5 py-0.5 rounded-full tracking-normal">
                    {notifications.length} NEW
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="bg-white/5 border border-white/10 hover:border-accent-gold/25 p-4 rounded-xs flex gap-3.5 items-start transition-all duration-300">
                      <div className="p-2 bg-accent-gold/10 text-accent-gold rounded-full font-serif-display text-xs font-black shrink-0 w-8 h-8 flex items-center justify-center">
                        {notif.type === 'manuscript' ? 'MS' : 'CF'}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[8px] font-mono bg-accent-gold/20 text-accent-gold px-1.5 py-0.5 font-bold uppercase tracking-wider">
                            {notif.tag}
                          </span>
                          <span className="text-[8px] font-mono text-white/40">
                            {notif.date}
                          </span>
                        </div>
                        <h4 className="font-sans font-bold text-[11px] text-white mt-1.5 leading-snug truncate">
                          {notif.title}
                        </h4>
                        <p className="text-[10px] text-white/70 font-light mt-0.5 leading-relaxed line-clamp-2">
                          {notif.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Zone & active manuscript tracker tandem */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Drag & Drop Area */}
              <div className="lg:col-span-6 bg-white border border-divider-gold/50 p-8">
                <h3 className="font-serif-display text-lg text-primary-navy font-bold mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-accent-gold" /> Upload New Manuscript
                </h3>
                
                <form onSubmit={handleUploadSubmit} className="flex flex-col gap-4">
                  
                  {/* Drop zone outer */}
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xs p-8 text-center transition-all ${
                      isDragging 
                        ? 'border-accent-gold bg-accent-gold/10 scale-98' 
                        : 'border-divider-gold/80 hover:border-accent-gold/40'
                    }`}
                  >
                    <input 
                      type="file" 
                      id="manuscript-file"
                      className="hidden" 
                      onChange={handleFileSelect}
                      accept=".pdf,.docx,.doc,.tex"
                    />
                    <label htmlFor="manuscript-file" className="cursor-pointer flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold mb-2">
                        <Upload className="w-6 h-6 animate-pulse" />
                      </div>
                      <span className="font-serif-display font-bold text-sm text-primary-navy">
                        Drag & Drop or Choose Local File
                      </span>
                      <p className="text-[10px] text-muted-gray leading-none font-mono">
                        Supports standard formats: .docx, .doc, .pdf, .tex (max 50MB)
                      </p>
                    </label>
                  </div>

                  {/* Selected file card preview */}
                  {selectedFile && (
                    <div className="bg-[#C9A961]/5 border border-accent-gold/20 p-4 text-xs font-mono flex flex-col gap-1 animate-fade-in text-left">
                      <div><span className="text-muted-gray uppercase">FILE:</span> {selectedFile.name}</div>
                      <div><span className="text-muted-gray uppercase">SIZE:</span> {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</div>
                      
                      <div className="flex flex-col gap-1 mt-3">
                        <label className="text-[9px] uppercase tracking-wider text-primary-navy font-bold">Clarify Manuscript Title</label>
                        <input 
                          type="text" 
                          required 
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="border border-divider-gold bg-white p-2.5 font-sans focus:border-accent-gold outline-none text-xs w-full"
                          placeholder="e.g. A Sovereign Zero Trust framework for Quantum Edges"
                        />
                      </div>
                    </div>
                  )}

                  {uploadProgress !== null && (
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[10px] font-mono text-primary-navy">
                        <span>Uploading track files...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="h-2 bg-divider-gold/40 relative">
                        <div className="h-full bg-accent-gold transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!selectedFile || uploadProgress !== null}
                    className="w-full bg-primary-navy text-white hover:bg-accent-gold hover:text-primary-navy py-3 uppercase text-xs tracking-widest font-mono font-bold transition-all disabled:opacity-40"
                  >
                    Initialize Service Tracker
                  </button>

                </form>

              </div>

              {/* Right Column: Mini Tracker Showcase */}
              <div className="lg:col-span-6 bg-white border border-divider-gold/50 p-8">
                <h3 className="font-serif-display text-lg text-primary-navy font-bold mb-4">
                  Active Manuscript Milestones
                </h3>

                <div className="flex flex-col gap-4">
                  {localManuscripts.map(ms => (
                    <div 
                      key={ms.id} 
                      onClick={() => { setActiveManuscriptId(ms.id); setActiveTab('tracker'); }}
                      className={`p-4 border transition-colors cursor-pointer flex justify-between items-center ${
                        activeManuscriptId === ms.id 
                          ? 'border-accent-gold bg-[#C9A961]/5' 
                          : 'border-divider-gold hover:border-accent-gold/20 bg-neutral-warm/30'
                      }`}
                    >
                      <div className="max-w-[240px]">
                        <h4 className="font-serif-display font-bold text-sm text-primary-navy truncate">
                          {ms.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 font-mono text-[9px] text-muted-gray">
                          <span>{ms.date}</span>
                          <span>·</span>
                          <span>{ms.fileSize}</span>
                        </div>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-xs text-[9px] uppercase font-mono border font-bold ${
                        ms.status === 'Delivered' 
                          ? 'bg-green-100 text-green-700 border-green-300' 
                          : 'bg-accent-gold/20 text-primary-navy border-accent-gold/40 animate-pulse'
                      }`}>
                        {ms.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SUBVIEW: E-LEARNING COMPONENT PLAYER */}
        {activeTab === 'elearning' && (
          <div className="flex flex-col gap-8 animate-fade-in" id="elearning-stage">
            <div>
              <h1 className="font-serif-display text-3xl text-primary-navy font-bold leading-none mb-2">
                Scholastic e-Learning Player
              </h1>
              <p className="text-sm text-muted-gray font-light">
                Continuous knowledge access. Review all four specialized chapters below to qualify for your printable Verified Board Certificate.
              </p>
            </div>

            {/* Cert rewards card */}
            {certificateEarned ? (
              <div className="bg-gradient-to-r from-accent-gold/15 via-white to-accent-gold/15 border border-accent-gold p-6 flex flex-col md:flex-row items-center justify-between gap-6 animate-scale-up">
                <div className="flex items-start gap-4">
                  <Award className="w-12 h-12 text-accent-gold shrink-0 animate-bounce" />
                  <div>
                    <h3 className="font-serif-display text-lg text-primary-navy font-bold">
                      Verified Board Certificate Qualified!
                    </h3>
                    <p className="text-xs text-muted-gray leading-normal max-w-md">
                      You have met all rigor requirements across our e-Learning chapters. You are qualified to generate your printable Board Certificate.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowCertificateModal(true)}
                  className="bg-accent-gold hover:bg-[#B3934B] text-primary-navy font-sans uppercase tracking-widest font-extrabold text-xs px-6 py-3.5 flex items-center gap-2 shadow-md shrink-0 shrink-1"
                >
                  <Printer className="w-4 h-4" /> Generate Printable Diploma
                </button>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-300 p-4 text-xs text-yellow-800 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-accent-gold shrink-0" />
                <span>Completion Status: <strong>{chapters.filter(c => c.completed).length} of {chapters.length} chapters done</strong>. Finish remaining chapters to qualify for the Board certificate!</span>
              </div>
            )}

            {/* The chrome video player tandem */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Chromeless responsive Player (Col span 8) */}
              <div className="lg:col-span-8 bg-black text-white border border-accent-gold/25 p-4 relative overflow-hidden flex flex-col shadow-xl">
                
                {/* Visual Header */}
                <div className="flex justify-between items-center text-xs font-mono text-[#C9A961] pb-3 border-b border-white/10 mb-4 select-none">
                  <span className="truncate max-w-[290px]">{activeChapter.title}</span>
                  <span className="bg-accent-gold/20 px-2 py-0.5 border border-accent-gold/30">{videoQuality} BUFFER</span>
                </div>

                {/* Sub-aspect poster frame with play buttons */}
                <div className="aspect-video relative overflow-hidden bg-charcoal/80 flex items-center justify-center">
                  {isPlaying && !videoError[activeChapter.id] ? (
                    <video
                      ref={videoRef}
                      src={activeChapter.id === 'ch1' || activeChapter.id === 'ch3' ? '/video 1.mp4' : '/video 2.mp4'}
                      className="absolute inset-0 w-full h-full object-cover z-0 animate-fade-in"
                      playsInline
                      preload="auto"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onError={(e) => {
                        const video = e.currentTarget;
                        video.onerror = null;
                        const fallbackOnlineUrl = activeChapter.id === 'ch1' || activeChapter.id === 'ch3'
                          ? "https://assets.mixkit.co/videos/preview/mixkit-futuristic-subway-station-with-neon-lights-44140-large.mp4"
                          : "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-programmer-typing-on-a-keyboard-41743-large.mp4";
                        if (video.src !== fallbackOnlineUrl) {
                          video.src = fallbackOnlineUrl;
                          video.load();
                          video.play().catch(() => {});
                        } else {
                          setVideoError(prev => ({ ...prev, [activeChapter.id]: true }));
                        }
                      }}
                      onTimeUpdate={(e) => {
                        const video = e.currentTarget;
                        if (video.duration) {
                          setVideoProgress(Math.round((video.currentTime / video.duration) * 100));
                        }
                      }}
                      onEnded={() => {
                        setIsPlaying(false);
                        setVideoProgress(100);
                        handleLessonCompletion();
                      }}
                    />
                  ) : (
                    <img 
                      src={activeChapter.videoUrl} 
                      alt={activeChapter.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-65"
                    />
                  )}
                  
                  {!isPlaying ? (
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="w-16 h-16 rounded-full bg-accent-gold/90 text-primary-navy flex items-center justify-center animate-pulse shadow-2xl relative z-20 transition-transform hover:scale-105 select-none"
                      id="video-play-btn"
                    >
                      <Play className="w-8 h-8 fill-current translate-x-0.5" />
                    </button>
                  ) : (
                    <div 
                      onClick={() => setIsPlaying(false)}
                      className="absolute inset-0 cursor-pointer z-10 flex items-center justify-center group select-none"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Pause className="w-8 h-8 fill-current" />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 font-mono text-[9px] bg-black/60 px-2 py-1 border border-white/10 uppercase select-none z-20">
                    {isPlaying && !videoError[activeChapter.id] ? 'STREAMING REALTIME CONTENT' : 'FEED PAUSED'}
                  </div>
                </div>

                {/* Timeline slide progress bar */}
                <div className="mt-4 flex flex-col gap-2 select-none">
                  <div className="relative h-1.5 bg-white/10 cursor-pointer" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                    setVideoProgress(pct);
                    if (videoRef.current && videoRef.current.duration) {
                      videoRef.current.currentTime = (pct / 100) * videoRef.current.duration;
                    }
                  }}>
                    <div className="absolute top-0 left-0 bottom-0 bg-accent-gold" style={{ width: `${videoProgress}%` }} />
                  </div>

                  {/* Chrome Toolbar controllers */}
                  <div className="flex flex-wrap items-center justify-between text-xs text-white/70 font-mono mt-1 pt-2">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-accent-gold transition-colors font-bold text-[10px]"
                      >
                        {isPlaying ? 'PAUSE' : 'PLAY'}
                      </button>
                      <span className="text-[10px] text-white/35">
                        {Math.floor((videoProgress / 100) * 15)}:00 / {activeChapter.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Playback rate selector */}
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] text-white/40">SPEED:</span>
                        <div className="flex gap-1">
                          {[0.75, 1.0, 1.5, 2.0].map(sp => (
                            <button
                              key={sp}
                              onClick={() => setPlaybackSpeed(sp)}
                              className={`px-1.5 py-0.5 text-[9px] border transition-colors ${
                                playbackSpeed === sp 
                                  ? 'bg-accent-gold/20 border-accent-gold text-accent-gold font-bold' 
                                  : 'border-white/10 text-white/50 hover:text-white'
                              }`}
                            >
                              {sp}x
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quality selector */}
                      <select 
                        value={videoQuality}
                        onChange={(e: any) => setVideoQuality(e.target.value)}
                        className="bg-black border border-white/20 text-white text-[9px] px-1 py-0.5 outline-none font-sans"
                      >
                        <option value="720p">720p HD</option>
                        <option value="1080p">1080p FHD</option>
                        <option value="4K">4K UHD</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Chapter actions footer inside player */}
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <p className="text-white/60 font-light font-sans text-xs">
                    Finished absorbing current lecture material? Register compliance to advance.
                  </p>
                  <button
                    onClick={handleLessonCompletion}
                    disabled={activeChapter.completed}
                    className={`px-5 py-2.5 font-mono text-[9px] uppercase tracking-widest font-bold transition-all ${
                      activeChapter.completed 
                        ? 'bg-white/10 text-white/40 border border-white/5 cursor-not-allowed' 
                        : 'bg-accent-gold text-primary-navy hover:bg-[#B3934B]'
                    }`}
                  >
                    {activeChapter.completed ? 'Vetted compliant✓' : 'Register completion'}
                  </button>
                </div>

              </div>

              {/* Chapters markers list sidebar (Col span 4) */}
              <div className="lg:col-span-4 bg-white border border-divider-gold/50 p-6">
                <h3 className="font-serif-display text-base text-primary-navy font-bold mb-4 border-b border-divider-gold/30 pb-2 flex items-center gap-2">
                  <Video className="w-4.5 h-4.5 text-accent-gold" /> Chapters Syllabus
                </h3>

                <div className="flex flex-col gap-3">
                  {chapters.map(ch => (
                    <button
                      key={ch.id}
                      onClick={() => handleChapterSelect(ch)}
                      className={`w-full p-4 text-left border flex items-start gap-3 transition-colors ${
                        activeChapter.id === ch.id 
                          ? 'border-accent-gold bg-[#C9A961]/5' 
                          : 'border-divider-gold hover:border-accent-gold/25'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-full border shrink-0 flex items-center justify-center ${
                        ch.completed 
                          ? 'bg-accent-gold border-accent-gold text-primary-navy' 
                          : 'bg-white border-divider-gold text-white/0'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <div className="flex-grow">
                        <div className="font-serif-display text-xs font-bold text-primary-navy leading-normal">
                          {ch.title}
                        </div>
                        <span className="text-[9px] font-mono text-muted-gray mt-1 block">
                          Duration: {ch.duration} min
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SUBVIEW: TRACKER DETAILED STATUS */}
        {activeTab === 'tracker' && (
          <div className="flex flex-col gap-8 animate-fade-in">
            <div>
              <h1 className="font-serif-display text-3xl text-primary-navy font-bold leading-none mb-2">
                Manuscript Spaces & Tracker
              </h1>
              <p className="text-sm text-muted-gray font-light">
                Secure signed workflow. Check the daily vetting statuses of your scholarly papers.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Manuscript List sidebar (Col span 4) */}
              <div className="lg:col-span-4 bg-white border border-divider-gold/50 p-6 flex flex-col gap-3">
                <h3 className="font-serif-display text-base text-primary-navy font-bold border-b border-divider-gold/30 pb-2 mb-2">
                  Uploaded Manuscripts
                </h3>

                {localManuscripts.map(ms => (
                  <button
                    key={ms.id}
                    onClick={() => setActiveManuscriptId(ms.id)}
                    className={`w-full p-4 border text-left flex flex-col gap-1 transition-colors ${
                      activeManuscriptId === ms.id 
                        ? 'border-accent-gold bg-[#C9A961]/5 font-bold' 
                        : 'border-divider-gold hover:border-accent-gold/25'
                    }`}
                  >
                    <h4 className="font-serif-display text-xs text-primary-navy leading-normal truncate w-full">
                      {ms.title}
                    </h4>
                    <div className="flex items-center justify-between w-full mt-2 select-none">
                      <span className="text-[9px] font-mono text-muted-gray">{ms.date}</span>
                      <span className={`px-2 py-0.5 rounded-xs text-[8px] uppercase tracking-wider font-mono font-bold ${
                        ms.status === 'Delivered' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-accent-gold/20 text-primary-navy'
                      }`}>
                        {ms.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Status details page (Col span 8) */}
              <div className="lg:col-span-8 bg-white border border-divider-gold/50 p-8 flex flex-col gap-6">
                
                {/* Meta details header card */}
                <div className="border-b border-divider-gold/20 pb-6">
                  <span className="text-[10px] font-mono tracking-widest text-accent-gold uppercase font-bold leading-none block mb-1">
                    MANUSCRIPT RECORD ID: {selectedManuscript.id}
                  </span>
                  <h2 className="font-serif-display text-xl sm:text-2xl text-primary-navy font-bold leading-snug">
                    {selectedManuscript.title}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-gray mt-4 select-none">
                    <div>FILE: <span className="text-primary-navy font-semibold">{selectedManuscript.fileName}</span></div>
                    <div>·</div>
                    <div>SIZE: <span className="text-primary-navy font-semibold">{selectedManuscript.fileSize}</span></div>
                    <div>·</div>
                    <div>DATE: <span className="text-primary-navy font-semibold">{selectedManuscript.date}</span></div>
                  </div>
                </div>

                {/* Workflow step milestones */}
                <div>
                  <h3 className="font-serif-display text-sm font-semibold text-primary-navy mb-6 uppercase tracking-wider">
                    Visual Workflow Progress
                  </h3>

                  {/* Horizontal on desktop, vertical on mobile */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                    
                    {/* The connector bar */}
                    <div className="hidden md:block absolute top-[22px] left-10 right-10 h-0.5 bg-divider-gold z-0" />

                    {[
                      { state: "Submitted", desc: "Manuscript uploaded successfully" },
                      { state: "Assigned", desc: "Assigned to specialized language editors" },
                      { state: "In Editing", desc: "Adjusting structural formatting alignments" },
                      { state: "QA Review", desc: "Scientific peer-review checkpoint audits" },
                      { state: "Delivered", desc: "Secured downloadable camera-ready files" }
                    ].map((step, idx) => {
                      const statesList = ["Submitted", "Assigned", "In Editing", "QA Review", "Delivered"];
                      const currentActiveIdx = statesList.indexOf(selectedManuscript.status);
                      const myIdx = statesList.indexOf(step.state);
                      
                      const isDone = myIdx <= currentActiveIdx;
                      const isActive = myIdx === currentActiveIdx;

                      return (
                        <div 
                          key={step.state}
                          className="flex flex-col items-center text-center relative z-10 w-full md:w-32"
                        >
                          <div className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                            isActive 
                              ? 'bg-accent-gold border-accent-gold text-primary-navy scale-110 shadow-md font-bold' 
                              : isDone 
                              ? 'bg-primary-navy border-primary-navy text-white font-semibold' 
                              : 'bg-white border-divider-gold text-muted-gray font-light'
                          }`}>
                            {idx + 1}
                          </div>
                          <h4 className="font-serif-display text-xs font-bold text-primary-navy mt-3 leading-none">
                            {step.state}
                          </h4>
                          <p className="text-[9px] text-muted-gray leading-normal mt-1 font-sans hidden md:block select-none">
                            {step.desc}
                          </p>
                        </div>
                      );
                    })}

                  </div>
                </div>

                {/* Action panel downloads */}
                <div className="bg-neutral-warm border border-divider-gold/45 p-6 mt-6 flex flex-col sm:flex-row gap-6 justify-between items-center select-none">
                  <div className="flex gap-4 items-start">
                    <ShieldCheck className="w-10 h-10 text-accent-gold/70 shrink-0" />
                    <div>
                      <h4 className="font-serif-display font-bold text-sm text-primary-navy">
                        {selectedManuscript.status === 'Delivered' ? 'Delivered Camera-Ready File' : 'Interim Draft Protected'}
                      </h4>
                      <p className="text-[10px] text-muted-gray leading-relaxed max-w-md font-light mt-0.5">
                        {selectedManuscript.status === 'Delivered' 
                          ? 'This verified output is fully compliant with target Springer / IEEE templates. Review peer edit logs.' 
                          : 'Your raw file asset is preserved inside our high-integrity storage clusters. Re-allocation triggers expirable encryption.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2.5 mt-4 sm:mt-0 select-none">
                    <button 
                      onClick={() => handleCopyLink(selectedManuscript.id)}
                      className="bg-primary-navy hover:bg-opacity-90 text-white font-sans uppercase font-bold text-[9px] tracking-widest px-4 py-3 flex items-center gap-1.5 shadow-sm border border-accent-gold/20 hover:border-accent-gold transition-colors cursor-pointer"
                      title="Copy Shareable Academic Link to Clipboard"
                    >
                      <Copy className="w-3 h-3 text-accent-gold" /> 
                      {copiedManuscriptId === selectedManuscript.id ? 'Copied!' : 'Copy Link'}
                    </button>

                    <button 
                      onClick={() => handleExportBibTeX(selectedManuscript)}
                      className="bg-primary-navy hover:bg-opacity-90 text-white font-sans uppercase font-bold text-[9px] tracking-widest px-4 py-3 flex items-center gap-1.5 shadow-sm border border-accent-gold/20 hover:border-accent-gold transition-colors cursor-pointer"
                      title="Export manuscript reference in BibTeX format"
                    >
                      <BookMarked className="w-3 h-3 text-accent-gold" /> BIBTEX
                    </button>

                    <button 
                      onClick={() => handleExportRIS(selectedManuscript)}
                      className="bg-primary-navy hover:bg-opacity-90 text-white font-sans uppercase font-bold text-[9px] tracking-widest px-4 py-3 flex items-center gap-1.5 shadow-sm border border-accent-gold/20 hover:border-accent-gold transition-colors cursor-pointer"
                      title="Export manuscript reference in RIS format"
                    >
                      <BookMarked className="w-3 h-3 text-accent-gold" /> RIS
                    </button>

                    <button 
                      onClick={() => setPrintPreviewOpen(true)}
                      className="bg-primary-navy hover:bg-opacity-90 text-white font-sans uppercase font-bold text-[9px] tracking-widest px-4 py-3 flex items-center gap-1.5 shadow-sm border border-accent-gold/20 hover:border-accent-gold transition-colors cursor-pointer"
                      title="Open scholastic high-fidelity document layout before printing"
                    >
                      <Eye className="w-3 h-3 text-accent-gold" /> Print Preview
                    </button>

                    <button 
                      onClick={() => window.print()}
                      className="bg-primary-navy hover:bg-opacity-90 text-white font-sans uppercase font-bold text-[9px] tracking-widest px-4 py-3 flex items-center gap-1.5 shadow-sm border border-accent-gold/30 hover:border-accent-gold transition-colors cursor-pointer"
                      title="Generate high-fidelity research PDF"
                    >
                      <Printer className="w-3 h-3 text-accent-gold" /> Download as PDF
                    </button>

                    {selectedManuscript.status === 'Delivered' ? (
                      <a 
                        href="#download-camera-ready" 
                        onClick={(e) => { e.preventDefault(); alert('Signed cryptographic URL activated. Beginning download of: camera_ready_' + selectedManuscript.fileName); }}
                        className="bg-accent-gold hover:bg-[#B3934B] text-primary-maroon font-sans uppercase font-bold text-[9px] tracking-widest px-4 py-3 flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Download className="w-3 h-3" /> Camera-Ready
                      </a>
                    ) : (
                      <button 
                        disabled
                        className="bg-neutral-200 text-stone-400 border border-stone-200 cursor-not-allowed font-sans uppercase font-bold text-[9px] tracking-widest px-4 py-3"
                      >
                        Awaiting Review
                      </button>
                    )}
                  </div>
                </div>

                {/* Academic credibility author bio card */}
                {(() => {
                  const authorObj = INITIAL_AUTHORS.find(a => 
                    a.name === selectedManuscript.author || 
                    selectedManuscript.author?.includes(a.name) ||
                    a.name.includes(selectedManuscript.author || "---")
                  );
                  if (!authorObj) return null;
                  return (
                    <div className="bg-neutral-warm border border-divider-gold p-6 text-left relative overflow-hidden group shadow-xs">
                      <div className="absolute right-0 top-0 w-24 h-24 bg-accent-gold/5 rounded-full blur-xl pointer-events-none" />
                      <h4 className="text-[10px] uppercase font-mono tracking-widest text-[#B3934B] mb-4 border-b border-divider-gold/30 pb-2 font-bold select-none">
                        Author Profile & Academic Credentials
                      </h4>
                      <div className="flex flex-col sm:flex-row gap-4 items-start animate-fade-in">
                        <img 
                          src={authorObj.image} 
                          alt={authorObj.name} 
                          className="w-12 h-12 rounded-full object-cover border border-accent-gold/40 shrink-0 shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-serif-display font-bold text-sm text-primary-navy leading-none">{authorObj.name}</h5>
                          <p className="text-[9px] font-mono text-[#B3934B] mt-1 leading-normal italic">
                            {authorObj.credentials}
                          </p>
                          <p className="text-xs text-muted-gray mt-2.5 leading-relaxed font-light font-sans">
                            {authorObj.bio}
                          </p>
                          
                          {authorObj.publishedWorks && authorObj.publishedWorks.length > 0 && (
                            <div className="mt-4">
                              <span className="text-[9px] uppercase font-mono tracking-widest text-primary-navy font-bold select-none block mb-1.5">
                                Published scholastic works:
                              </span>
                              <ul className="space-y-1 text-[10px] font-sans font-light text-muted-gray pl-1 border-l border-divider-gold">
                                {authorObj.publishedWorks.map((work, wIdx) => (
                                  <li key={wIdx} className="flex gap-1.5 leading-normal">
                                    <span className="text-accent-gold select-none">▪</span>
                                    <span>{work.title}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {authorObj.links && authorObj.links.length > 0 && (
                            <div className="flex gap-3 mt-4 select-none">
                              {authorObj.links.map((ln, lnIdx) => (
                                <a 
                                  key={lnIdx} 
                                  href={ln.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-[9px] uppercase tracking-wider font-mono text-[#C9A961] hover:text-primary-navy underline font-bold transition-colors"
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

              </div>

            </div>
          </div>
        )}

        {/* SUBVIEW: SETTINGS / PROFILE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white border border-divider-gold/50 p-8 max-w-2xl mx-auto animate-fade-in">
            <h1 className="font-serif-display text-2xl text-primary-navy font-bold border-b border-divider-gold/30 pb-4 mb-6">
              Scholar Settings & Credentials
            </h1>

            {profileStatus && (
              <div className="bg-green-50 border border-green-300 p-4 text-xs text-green-700 font-mono mb-6 select-none animate-scale-up">
                {profileStatus}
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-6 text-xs">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-primary-navy font-bold uppercase">Scholar Full Name</label>
                <input 
                  type="text" 
                  value={profileName} 
                  required
                  onChange={(e) => setProfileName(e.target.value)}
                  className="border border-divider-gold p-3 bg-neutral-warm/25 font-sans text-sm focus:border-accent-gold outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-primary-navy font-bold uppercase">Primary Academic Email</label>
                <input 
                  type="email" 
                  value={profileEmail} 
                  required
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="border border-divider-gold p-3 bg-neutral-warm/25 font-sans text-sm focus:border-accent-gold outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-primary-navy font-bold uppercase">Associated University / Institution</label>
                <input 
                  type="text" 
                  value={profileAffiliation} 
                  required
                  onChange={(e) => setProfileAffiliation(e.target.value)}
                  className="border border-divider-gold p-3 bg-neutral-warm/25 font-sans text-sm focus:border-accent-gold outline-none"
                />
              </div>

              <div className="flex flex-col gap-2 select-none">
                <label className="font-mono text-[10px] text-primary-navy font-bold uppercase">Active Tier Subscription</label>
                <div className="bg-neutral-warm border border-divider-gold/40 p-4 font-mono text-[10px] flex items-center justify-between">
                  <div>
                    <div className="font-serif-display text-sm font-bold text-primary-navy">{user.role === 'mentor' ? 'Advisor Panel Tier' : 'Graduate Scholar Tier'}</div>
                    <p className="text-muted-gray text-[9px] mt-1 font-sans">Active linkage to Q1 journal reviewers</p>
                  </div>
                  <span className="bg-primary-navy text-accent-gold border border-accent-gold/40 px-3 py-1 font-bold uppercase">
                    VETTED ACTIVE
                  </span>
                </div>
              </div>

              {/* Research Interests Alerts Settings */}
              <div className="flex flex-col gap-2 border-t border-divider-gold/25 pt-6 select-none">
                <label className="font-mono text-[10px] text-primary-navy font-bold uppercase">Listed Research Interests (Alerts & Deadlines)</label>
                <p className="text-[10px] text-muted-gray leading-tight">
                  Choose your research themes. Newly uploaded manuscripts matching these keywords, or relevant conference deadlines, will trigger custom security and review alerts.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {AVAILABLE_INTERESTS.map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => {
                          const next = isSelected 
                            ? selectedInterests.filter(i => i !== interest)
                            : [...selectedInterests, interest];
                          setSelectedInterests(next);
                          localStorage.setItem('ritechs_user_interests', JSON.stringify(next));
                        }}
                        className={`p-3 text-left border flex items-center justify-between transition-all rounded-xs text-[11px] ${
                          isSelected 
                            ? 'bg-[#102447]/5 border-accent-gold text-primary-navy font-bold' 
                            : 'border-[#E5E7EB] text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        <span>{interest}</span>
                        {isSelected ? (
                          <span className="text-accent-gold text-[10px] font-bold">● SELECTED</span>
                        ) : (
                          <span className="text-stone-300 text-[10px]">○ ADD</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* System Time-Based Theme Toggling Setting */}
              <div className="flex flex-col gap-2 border-t border-divider-gold/25 pt-6 select-none">
                <label className="font-mono text-[10px] text-primary-navy font-bold uppercase">Dynamic Chrono-Theme System</label>
                <div className="flex items-center justify-between p-4 bg-neutral-warm/40 border border-divider-gold/20 rounded-xs">
                  <div className="max-w-[80%]">
                    <span className="font-sans font-bold text-[#102447] text-xs block">
                      Local System Time Sync
                    </span>
                    <p className="text-[10px] text-[#6B7280] leading-normal mt-1">
                      Enabling this feature automatically switches the platform theme between <strong>Classic Light</strong> (6:00 AM - 6:00 PM) and <strong>Luxurious Dark</strong> (6:00 PM - 6:00 AM) in real time using your system clock.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggleTimeThemeSync?.(!timeThemeSync)}
                    className={`w-14 h-7 rounded-full transition-colors relative duration-300 focus:outline-none cursor-pointer ${
                      timeThemeSync ? 'bg-[#C9A961]' : 'bg-[#D1D5DB]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-all duration-300 shadow-md ${
                        timeThemeSync ? 'left-8' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="bg-accent-gold hover:bg-[#B3934B] text-primary-navy py-3.5 uppercase text-xs tracking-widest font-mono font-bold transition-all duration-300"
              >
                Synchronize Memorized Preferences
              </button>
            </form>
          </div>
        )}

      </main>

      {/* ----------------------------------------
          Verified Diploma printable modal view
         ---------------------------------------- */}
      {showCertificateModal && (
        <div className="fixed inset-0 bg-primary-navy/80 z-50 flex items-center justify-center p-6 backdrop-blur-xs select-none">
          <div className="bg-white rounded-xs border-4 border-accent-gold p-8 w-full max-w-2xl relative shadow-2xl animate-scale-up text-center flex flex-col items-center">
            
            {/* Absolute close */}
            <button 
              onClick={() => setShowCertificateModal(false)}
              className="absolute right-4 top-4 hover:text-accent-gold text-primary-navy text-sm font-extrabold font-mono"
            >
              ✕
            </button>

            {/* Certificate border embellishment */}
            <div className="border border-accent-gold/40 w-full p-8 flex flex-col items-center">
              
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 border border-accent-gold flex items-center justify-center bg-primary-navy">
                  <GraduationCap className="w-6 h-6 text-accent-gold" />
                </div>
                <span className="font-serif-display text-xl font-bold tracking-tight text-primary-navy">RiTECHS Board</span>
              </div>

              <span className="text-[10px] font-mono tracking-widest text-[#B3934B] font-bold uppercase">
                BOARD DIPLOMA OF EXCELLENCE
              </span>

              <h2 className="font-serif-display text-2.5xl sm:text-3.5xl text-primary-navy font-bold leading-normal mt-4">
                Certificate of Academic Vetting
              </h2>

              <p className="font-serif-accent text-sm italic text-muted-gray max-w-md mt-4">
                This document certifies that the graduate scholar represented below has complied with all formatting, abstract hook, and peer review rebuttals coursework.
              </p>

              <div className="h-px bg-divider-gold/50 w-24 my-6" />

              <span className="text-xs text-muted-gray uppercase tracking-widest font-mono block">PROUDLY PRESENTED TO</span>
              <div className="font-serif-display text-2xl font-bold text-primary-navy mt-1">
                {profileName || user.name}
              </div>
              <span className="text-[11px] font-sans text-muted-gray mt-1 font-semibold">{profileAffiliation}</span>

              <div className="grid grid-cols-2 gap-12 mt-12 w-full text-[10px] font-mono text-primary-navy">
                <div className="flex flex-col items-center border-t border-divider-gold pt-3">
                  <div className="italic font-serif-accent text-sm text-[#B3934B]">Alistair Evans</div>
                  <span className="text-muted-gray mt-1">Dr. Alistair J. Evans</span>
                  <span className="text-[8px] text-muted-gray leading-none">Scientific Chair, Board</span>
                </div>
                <div className="flex flex-col items-center border-t border-divider-gold pt-3">
                  <div className="font-serif-display font-bold text-xs">RITECHS#909287</div>
                  <span className="text-muted-gray mt-1">Verified Board Code</span>
                  <span className="text-[8px] text-green-600 leading-none">STATUS: EXCEEDED REQUIREMENTS</span>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => window.print()}
                  className="bg-primary-navy text-white hover:bg-accent-gold hover:text-primary-navy text-[10px] tracking-widest uppercase font-mono font-bold px-6 py-2.5 transition-colors"
                >
                  Print Diploma
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="border border-divider-gold hover:bg-neutral-warm text-[10px] tracking-widest uppercase font-mono font-bold px-6 py-2.5 transition-colors"
                >
                  Dismiss Frame
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
      {/* 4. PRINT PREVIEW TEMPLATE BLOCK (HIDDEN ON WEB SCREEN, VISIBLE ON PRINT LAYOUT) */}
      {selectedManuscript && (
        <div className="hidden print:block bg-white text-black p-12 max-w-4xl mx-auto font-serif" id="print-manuscript-preprint">
          <div className="text-center mb-8 border-b-2 border-black pb-6">
            <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-600 block mb-2">
              RiTECHS High-Security Peer-Rebuttal Scholarly Repository
            </span>
            <h1 className="text-2xl font-bold font-serif leading-tight mb-4" style={{ color: '#000000' }}>
              {selectedManuscript.title}
            </h1>
            <p className="text-sm italic mb-3 font-serif font-serif-accent">Original Research Document Pre-publication Version — ID: {selectedManuscript.id}</p>
            <div className="text-[10px] text-neutral-700 font-sans flex justify-center gap-6 mt-4 uppercase tracking-wider font-semibold">
              <span><strong>Category:</strong> {selectedManuscript.serviceType}</span>
              <span>·</span>
              <span><strong>Size:</strong> {selectedManuscript.fileSize}</span>
              <span>·</span>
              <span><strong>Indexed:</strong> {selectedManuscript.date}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase mb-3 font-serif border-b border-black/35 pb-1">Abstract</h2>
            <p className="text-xs leading-relaxed text-justify indent-8 mb-6 text-neutral-800">
              This research study presents the formal verification, parameter optimizations, and secure peer-vetting bounds for mission-critical technology frameworks under the direction of the RiTECHS Board of Directors. In high-density settings, traditional protection schemes scale sub-optimally. We present a low-resource cryptographic methodology that ensures quantum-resistant security bounds. Experimental captures show robust performance resilience across academic networks.
            </p>
          </div>

          <div className="mb-8 animate-fadeIn">
            <h2 className="text-sm font-bold uppercase mb-3 font-serif border-b border-black/35 pb-1">1. Introduction</h2>
            <p className="text-xs leading-relaxed text-justify indent-8 mb-4 text-neutral-800">
              The paradigm shift towards distributed intelligent services requires persistent coordination between localized edge architectures and central verification databases. As grid complexity increases, physical and digital vulnerability indexes scale dramatically, necessitating real-time threat hunting patterns.
            </p>
            <p className="text-xs leading-relaxed text-justify indent-8 mb-4 text-neutral-800">
              Earlier scholarly works focused primarily on centralized, high-overhead consensus loops. Although resilient, these structures trigger heavy transmission overhead, rendering agricultural telemetries and municipal energy smart-grids sub-optimal. This work provides an elegant, lightweight alternative.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase mb-3 font-serif border-b border-black/35 pb-1">2. Computational Parameters & Benchmarking Table</h2>
            <p className="text-xs leading-relaxed text-justify indent-8 mb-4 text-neutral-800">
              We captured and logged throughput and latency values across our experimental topology under varying standard conditions. These statistics confirm our sovereign protection constraints without degrading standard signal quality.
            </p>
            <table className="w-full border-collapse border border-black my-4 text-[10px] font-sans">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-black p-2 font-bold text-left">Topology Reference Code</th>
                  <th className="border border-black p-2 font-bold text-left">Throughput (Mpps)</th>
                  <th className="border border-black p-2 font-bold text-left">Latency Margin (ms)</th>
                  <th className="border border-black p-2 font-bold text-left">Peer Security Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2">Standard IoT Agri-Telemetry</td>
                  <td className="border border-black p-2">142.5</td>
                  <td className="border border-black p-2">1.22</td>
                  <td className="border border-black p-2">Standard Encryption</td>
                </tr>
                <tr>
                  <td className="border border-black p-2">Quantum-Resistant Edge-Shield</td>
                  <td className="border border-black p-2">498.1</td>
                  <td className="border border-black p-2">0.05</td>
                  <td className="border border-black p-2">Validated Secure Bounds</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase mb-3 font-serif border-b border-black/35 pb-1">3. Concluding Remarks & Board Recommendation</h2>
            <p className="text-xs leading-relaxed text-justify indent-8 mb-4 text-neutral-800">
              In conclusion, the proposed cryptographic pattern satisfies security targets and is fully calibrated to fit standard Springer Nature and IEEE format templates. Development is recommended for immediate industrial pilot rollout.
            </p>
          </div>

          <div className="border-t border-dashed border-black pt-6 text-center mt-12">
            <p className="text-[9px] font-mono text-neutral-500">Official Peer Reprint logged at: http://ritechs.org/submissions/{selectedManuscript.id.toLowerCase()}</p>
            <p className="text-[8px] text-neutral-400 font-sans mt-0.5">Verified by RiTECHS Secretariat. Export compiled dynamically in June 2026.</p>
          </div>
        </div>
      )}

      {/* Visual Print Preview Modal */}
      {printPreviewOpen && selectedManuscript && (
        <div className="fixed inset-0 bg-[#030a17]/90 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-md print:hidden">
          {/* Backdrop Dismiss */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setPrintPreviewOpen(false)} />
          
          <div className="bg-[#1c2331] text-white border border-[#C9A961]/30 w-full max-w-4xl h-[90vh] overflow-hidden relative z-10 shadow-2xl flex flex-col rounded-xs">
            {/* Action Bar Header */}
            <div className="bg-[#0b111e] px-6 py-4 border-b border-[#C9A961]/20 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-accent-gold" />
                <span className="font-serif-display text-xs uppercase tracking-widest font-bold text-accent-gold">High-Fidelity Scholarly Print Preview</span>
              </div>
              <button 
                onClick={() => setPrintPreviewOpen(false)}
                className="w-8 h-8 rounded-full border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Document preview container */}
            <div className="flex-grow p-6 overflow-y-auto bg-stone-105 flex justify-center items-start">
              {/* Paper Layout */}
              <div className="bg-white text-stone-900 border border-stone-200 p-10 sm:p-14 max-w-[21cm] w-full shadow-lg font-serif relative" style={{ minHeight: '29.7cm' }}>
                <div className="text-center mb-8 border-b-2 border-black pb-6">
                  <span className="text-[9px] uppercase tracking-widest font-mono text-neutral-600 block mb-2">
                    RiTECHS High-Security Peer-Rebuttal Scholarly Repository
                  </span>
                  <h1 className="text-lg sm:text-xl font-bold font-serif leading-tight mb-3 text-black">
                    {selectedManuscript.title}
                  </h1>
                  <p className="text-xs italic mb-2 font-serif text-neutral-600">Original Research Document Pre-publication Version — ID: {selectedManuscript.id}</p>
                  <div className="text-[9px] text-neutral-600 font-sans flex justify-center gap-4 mt-3 uppercase tracking-wider font-semibold">
                    <span><strong>Category:</strong> {selectedManuscript.serviceType}</span>
                    <span>·</span>
                    <span><strong>Size:</strong> {selectedManuscript.fileSize}</span>
                    <span>·</span>
                    <span><strong>Indexed:</strong> {selectedManuscript.date}</span>
                  </div>
                </div>

                <div className="mb-6 text-left">
                  <h2 className="text-xs font-bold uppercase mb-2 font-serif border-b border-black/35 pb-1 text-black">Abstract</h2>
                  <p className="text-[11px] leading-relaxed text-justify indent-6 mb-4 text-neutral-850">
                    This research study presents the formal verification, parameter optimizations, and secure peer-vetting bounds for mission-critical technology frameworks under the direction of the RiTECHS Board of Directors. In high-density settings, traditional protection schemes scale sub-optimally. We present a low-resource cryptographic methodology that ensures quantum-resistant security bounds. Experimental captures show robust performance resilience across academic networks.
                  </p>
                </div>

                <div className="mb-6 text-left">
                  <h2 className="text-xs font-bold uppercase mb-2 font-serif border-b border-black/35 pb-1 text-black">1. Introduction</h2>
                  <p className="text-[11px] leading-relaxed text-justify indent-6 mb-3 text-neutral-850">
                    The paradigm shift towards distributed intelligent services requires persistent coordination between localized edge architectures and central verification databases. As grid complexity increases, physical and digital vulnerability indexes scale dramatically, necessitating real-time threat hunting patterns.
                  </p>
                  <p className="text-[11px] leading-relaxed text-justify indent-6 mb-3 text-neutral-850">
                    Earlier scholarly works focused primarily on centralized, high-overhead consensus loops. Although resilient, these structures trigger heavy transmission overhead, rendering agricultural telemetries and municipal energy smart-grids sub-optimal. This work provides an elegant, lightweight alternative.
                  </p>
                </div>

                <div className="mb-6 text-left">
                  <h2 className="text-xs font-bold uppercase mb-2 font-serif border-[#666]/35 border-b pb-1 text-black">2. Computational Parameters & Benchmarking Table</h2>
                  <p className="text-[11px] leading-relaxed text-justify indent-6 mb-3 text-neutral-850">
                    We captured and logged throughput and latency values across our experimental topology under varying standard conditions. These statistics confirm our sovereign protection constraints without degrading standard signal quality.
                  </p>
                  <table className="w-full border-collapse border border-neutral-850 my-3 text-[9px] font-sans">
                    <thead>
                      <tr className="bg-neutral-100">
                        <th className="border border-neutral-700 p-1.5 font-bold text-left">Topology Reference Code</th>
                        <th className="border border-neutral-700 p-1.5 font-bold text-left">Throughput (Mpps)</th>
                        <th className="border border-neutral-700 p-1.5 font-bold text-left">Latency Margin (ms)</th>
                        <th className="border border-neutral-700 p-1.5 font-bold text-left">Peer Security Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-neutral-700 p-1.5 text-stone-900">Standard IoT Agri-Telemetry</td>
                        <td className="border border-neutral-700 p-1.5 text-stone-900">142.5</td>
                        <td className="border border-neutral-700 p-1.5 text-stone-900">1.22</td>
                        <td className="border border-neutral-700 p-1.5 text-stone-900">Standard Encryption</td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-700 p-1.5 text-stone-900">Quantum-Resistant Edge-Shield</td>
                        <td className="border border-neutral-700 p-1.5 text-stone-900">498.1</td>
                        <td className="border border-neutral-700 p-1.5 text-stone-900">0.05</td>
                        <td className="border border-neutral-700 p-1.5 text-stone-900">Validated Secure Bounds</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mb-6 text-left animate-fadeIn">
                  <h2 className="text-xs font-bold uppercase mb-2 font-serif border-[#666]/35 border-b pb-1 text-black">3. Concluding Remarks & Board Recommendation</h2>
                  <p className="text-[11px] leading-relaxed text-justify indent-6 mb-3 text-neutral-850">
                    In conclusion, the proposed cryptographic pattern satisfies security targets and is fully calibrated to fit standard Springer Nature and IEEE format templates. Development is recommended for immediate industrial pilot rollout.
                  </p>
                </div>

                <div className="border-t border-dashed border-stone-400 pt-5 text-center mt-10">
                  <p className="text-[8px] font-mono text-neutral-500">Official Peer Reprint logged at: http://ritechs.org/submissions/{selectedManuscript.id.toLowerCase()}</p>
                  <p className="text-[7px] text-neutral-400 font-sans mt-0.5">Verified by RiTECHS Secretariat. Export compiled dynamically in June 2026.</p>
                </div>
              </div>
            </div>

            {/* Print trigger footer bar */}
            <div className="bg-[#0b111e] py-4 px-6 border-t border-[#C9A961]/20 flex justify-between items-center shrink-0">
              <span className="text-[9px] font-mono text-neutral-400">
                Uses native @media print stylesheets to auto-reformat
              </span>
              <div className="flex gap-2.5">
                <button
                  onClick={() => setPrintPreviewOpen(false)}
                  className="border border-[#C9A961]/30 hover:border-[#C9A961] text-accent-gold font-sans uppercase font-bold text-[9px] tracking-widest px-4 py-2 bg-transparent hover:bg-white/5 transition-all cursor-pointer"
                >
                  Close Preview
                </button>
                <button
                  onClick={() => {
                    setPrintPreviewOpen(false);
                    // trigger actual browser print dialog
                    setTimeout(() => window.print(), 150);
                  }}
                  className="bg-accent-gold hover:bg-[#B3934B] text-[#3d0d14] font-sans uppercase font-black text-[9px] tracking-widest px-5 py-2 transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-[#3d0d14]" /> Trigger System Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
