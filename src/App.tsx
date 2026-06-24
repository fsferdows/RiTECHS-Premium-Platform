/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  INITIAL_CONFERENCES, INITIAL_BLOGS, INITIAL_MANUSCRIPTS, UserState, Manuscript,
  BlogPost, Conference, Mentor
} from './types';
import { INITIAL_MENTORS } from './data';
import { Clock } from 'lucide-react';
import AdminDashboardView from './components/AdminDashboardView';

// Importing beautiful modular pages
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ConferencesView from './components/ConferencesView';
import MentorsView from './components/MentorsView';
import ServicesView from './components/ServicesView';
import DashboardView from './components/DashboardView';
import BlogView from './components/BlogView';
import ContactView from './components/ContactView';
import LoginView from './components/LoginView';
import AIAssistant from './components/AIAssistant';
import ConSearchView from './components/ConSearchView';
import ConferencePlansView from './components/ConferencePlansView';
import MentorCommonView from './components/MentorCommonView';

export default function App() {
  // Session handling using localStorage to keep it persistent across iframe reloads
  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem('ritechs_user_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore fallback
      }
    }
    return {
      isLoggedIn: false,
      role: null,
      name: null,
      email: null
    };
  });

  // Client-stored list of manuscripts to allow dynamic user uploads on the tracker dashboard!
  const [manuscripts, setManuscripts] = useState<Manuscript[]>(() => {
    const saved = localStorage.getItem('ritechs_manuscripts_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_MANUSCRIPTS;
  });

  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.hash || '#/';
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const cached = sessionStorage.getItem('ritechs_cached_blogs');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {}
    }
    const saved = localStorage.getItem('ritechs_blogs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        sessionStorage.setItem('ritechs_cached_blogs', JSON.stringify(parsed));
        return parsed;
      } catch (e) {}
    }
    return INITIAL_BLOGS;
  });

  const [conferences, setConferences] = useState<Conference[]>(() => {
    const cached = sessionStorage.getItem('ritechs_cached_conferences');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {}
    }
    const saved = localStorage.getItem('ritechs_conferences');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        sessionStorage.setItem('ritechs_cached_conferences', JSON.stringify(parsed));
        return parsed;
      } catch (e) {}
    }
    return INITIAL_CONFERENCES;
  });

  const [mentors, setMentors] = useState<Mentor[]>(() => {
    const saved = localStorage.getItem('ritechs_mentors');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasUiAvatars = parsed.some((m: any) => m.image && m.image.includes('ui-avatars.com'));
        if (!hasUiAvatars) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_MENTORS;
  });

  const [fetchingData, setFetchingData] = useState(false);

  const handleUpdateBlogs = (nextBlogs: BlogPost[]) => {
    setBlogs(nextBlogs);
    localStorage.setItem('ritechs_blogs', JSON.stringify(nextBlogs));
    sessionStorage.setItem('ritechs_cached_blogs', JSON.stringify(nextBlogs));
  };

  const handleUpdateConferences = (nextConferences: Conference[]) => {
    setConferences(nextConferences);
    localStorage.setItem('ritechs_conferences', JSON.stringify(nextConferences));
    sessionStorage.setItem('ritechs_cached_conferences', JSON.stringify(nextConferences));
  };

  const handleUpdateMentors = (nextMentors: Mentor[]) => {
    setMentors(nextMentors);
    localStorage.setItem('ritechs_mentors', JSON.stringify(nextMentors));
  };

  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('ritechs_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const [timeThemeSync, setTimeThemeSync] = useState<boolean>(() => {
    return localStorage.getItem('ritechs_time_theme_sync') === 'enabled';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
    } else {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
    }
  }, [theme]);

  // Synchronize site theme with local system hour if enabled
  useEffect(() => {
    if (!timeThemeSync) return;

    const alignThemeWithTime = () => {
      const hours = new Date().getHours();
      const isNight = hours < 6 || hours >= 18; // Night is 6 PM to 6 AM (18:00 - 05:59)
      const targetTheme = isNight ? 'dark' : 'light';
      if (theme !== targetTheme) {
        setTheme(targetTheme);
        localStorage.setItem('ritechs_theme', targetTheme);
      }
    };

    alignThemeWithTime();
    const interval = setInterval(alignThemeWithTime, 30000); // Poll clock state every 30s
    return () => clearInterval(interval);
  }, [timeThemeSync, theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('ritechs_theme', nextTheme);
    // Disable system clock theme overrides on manual override
    if (timeThemeSync) {
      setTimeThemeSync(false);
      localStorage.setItem('ritechs_time_theme_sync', 'disabled');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [wordCount, setWordCount] = useState(1200);

  useEffect(() => {
    const calculateWords = () => {
      const contentEl = document.getElementById('editorial-blog-view') || 
                        document.getElementById('dashboard-portal-view') || 
                        document.getElementById('conferences-directory-view') ||
                        document.getElementById('conferences-detail-view') ||
                        document.body;
      if (contentEl) {
        const text = contentEl.innerText || contentEl.textContent || '';
        const count = text.split(/\s+/).filter(w => w.trim().length > 1).length;
        if (count > 50) {
          setWordCount(count);
          return;
        }
      }
      
      let fallbackCount = 1000;
      if (currentPath === '#/blog') {
        fallbackCount = blogs.reduce((acc, b) => acc + b.title.split(' ').length + b.content.split(' ').length, 0);
      } else if (currentPath === '#/dashboard') {
        fallbackCount = manuscripts.reduce((acc, m) => acc + m.title.split(' ').length, 0) + 800;
      } else if (currentPath.startsWith('#/conferences')) {
        fallbackCount = conferences.reduce((acc, c) => acc + c.fullName.split(' ').length + (c.about?.split(' ').length || 0), 0);
      }
      setWordCount(fallbackCount);
    };

    calculateWords();
    const timer = setTimeout(calculateWords, 400);
    return () => clearTimeout(timer);
  }, [currentPath, blogs, conferences, manuscripts]);

  useEffect(() => {
    const loadDataWithCache = async () => {
      const normalized = currentPath.split('?')[0];
      const isBlogPath = normalized === '#/blog';
      const isConfsPath = normalized === '#/conferences' || normalized.startsWith('#/conferences/');
      
      if (isBlogPath) {
        const cached = sessionStorage.getItem('ritechs_cached_blogs');
        if (!cached) {
          setFetchingData(true);
          await new Promise(resolve => setTimeout(resolve, 550));
          const saved = localStorage.getItem('ritechs_blogs');
          const data = saved ? JSON.parse(saved) : INITIAL_BLOGS;
          sessionStorage.setItem('ritechs_cached_blogs', JSON.stringify(data));
          setBlogs(data);
          setFetchingData(false);
        } else {
          setBlogs(JSON.parse(cached));
        }
      }

      if (isConfsPath) {
        const cached = sessionStorage.getItem('ritechs_cached_conferences');
        if (!cached) {
          setFetchingData(true);
          await new Promise(resolve => setTimeout(resolve, 550));
          const saved = localStorage.getItem('ritechs_conferences');
          const data = saved ? JSON.parse(saved) : INITIAL_CONFERENCES;
          sessionStorage.setItem('ritechs_cached_conferences', JSON.stringify(data));
          setConferences(data);
          setFetchingData(false);
        } else {
          setConferences(JSON.parse(cached));
        }
      }
    };

    loadDataWithCache();
  }, [currentPath]);

  const getBreadcrumbs = () => {
    const normalized = currentPath.split('?')[0];
    if (normalized === '#/' || normalized === '#' || normalized === '') {
      return null;
    }

    const crumbs = [{ label: 'Home', path: '#/' }];

    if (normalized === '#/about') {
      crumbs.push({ label: 'About Us', path: '#/about' });
    } else if (normalized === '#/con_search') {
      crumbs.push({ label: 'Conferences Search', path: '#/con_search' });
    } else if (normalized === '#/conference_plans') {
      crumbs.push({ label: 'Hosting Plans & Registration', path: '#/conference_plans' });
    } else if (normalized === '#/conferences') {
      crumbs.push({ label: 'Conferences Hub', path: '#/conferences' });
    } else if (normalized.startsWith('#/conferences/')) {
      crumbs.push({ label: 'Conferences Hub', path: '#/conferences' });
      const confName = normalized.split('/').pop()?.toUpperCase() || 'DETAILS';
      crumbs.push({ label: confName, path: currentPath });
    } else if (normalized === '#/mentors') {
      crumbs.push({ label: 'Mentors & Scholars', path: '#/mentors' });
    } else if (normalized.startsWith('#/mentor-common-view')) {
      crumbs.push({ label: 'Mentors & Scholars', path: '#/mentors' });
      const segments = normalized.split('/');
      const lastSegment = segments[segments.length - 1];
      const parsed = Number(lastSegment);
      const matchedM = mentors.find(m => m.id === parsed);
      const mentorLabel = matchedM ? matchedM.name.toUpperCase() : 'PROFILE DETAILS';
      crumbs.push({ label: mentorLabel, path: currentPath });
    } else if (normalized === '#/services') {
      crumbs.push({ label: 'Academic Services', path: '#/services' });
    } else if (normalized === '#/blog') {
      crumbs.push({ label: 'Editorial Blogs', path: '#/blog' });
    } else if (normalized === '#/contact') {
      crumbs.push({ label: 'Contact', path: '#/contact' });
    } else if (normalized === '#/login') {
      crumbs.push({ label: 'Scholar Login', path: '#/login' });
    } else if (normalized === '#/dashboard') {
      crumbs.push({ label: 'Student Dashboard', path: '#/dashboard' });
    } else if (normalized === '#/admin') {
      crumbs.push({ label: 'Secretariat Admin Panel', path: '#/admin' });
    } else {
      crumbs.push({ label: 'Academic Ecosystem', path: normalized });
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Save session & data when updated
  const handleLoginSuccess = (loggedInUser: UserState) => {
    setUser(loggedInUser);
    localStorage.setItem('ritechs_user_session', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    const cleanUser: UserState = {
      isLoggedIn: false,
      role: null,
      name: null,
      email: null
    };
    setUser(cleanUser);
    localStorage.removeItem('ritechs_user_session');
    handleNavigate('#/');
  };

  const handleUpdateUser = (updatedInfo: Partial<UserState>) => {
    const nextUser = { ...user, ...updatedInfo };
    setUser(nextUser);
    localStorage.setItem('ritechs_user_session', JSON.stringify(nextUser));
  };

  const handleNavigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // Route mapping resolver
  const renderActiveView = () => {
    const normalized = currentPath.split('?')[0]; // strip query tags

    if (fetchingData) {
      return (
        <div className="flex-grow pt-40 pb-20 flex flex-col items-center justify-center min-h-[60vh] text-center select-none">
          <div className="w-8 h-8 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin mb-4" />
          <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-1">Synchronizing Academic Desk</h3>
          <p className="text-[10px] text-neutral-400 leading-relaxed font-light">Loading secure repository collections into persistent session memory...</p>
        </div>
      );
    }

    if (normalized === '#/' || normalized === '#' || normalized === '') {
      return (
        <HomeView 
          onNavigate={handleNavigate} 
          conferences={conferences} 
          mentors={mentors} 
          blogs={blogs} 
        />
      );
    }
    
    if (normalized === '#/about') {
      return <AboutView />;
    }

    if (normalized === '#/con_search') {
      return (
        <ConSearchView 
          conferences={conferences} 
          onNavigate={handleNavigate} 
        />
      );
    }

    if (normalized === '#/conference_plans') {
      return (
        <ConferencePlansView 
          onNavigate={handleNavigate} 
        />
      );
    }

    if (normalized === '#/conferences' || normalized.startsWith('#/conferences/')) {
      return (
        <ConferencesView 
          currentPath={currentPath} 
          conferences={conferences} 
          onNavigate={handleNavigate} 
        />
      );
    }

    if (normalized === '#/mentors') {
      return (
        <MentorsView 
          mentors={mentors} 
          onNavigate={handleNavigate} 
        />
      );
    }

    if (normalized === '#/mentor-common-view' || normalized.startsWith('#/mentor-common-view')) {
      return (
        <MentorCommonView 
          mentors={mentors}
          currentPath={currentPath}
          onNavigate={handleNavigate}
          theme={theme}
        />
      );
    }

    if (normalized === '#/services') {
      return (
        <ServicesView 
          onNavigate={handleNavigate} 
          isLoggedIn={user.isLoggedIn} 
        />
      );
    }

    if (normalized === '#/blog') {
      return <BlogView blogs={blogs} />;
    }

    if (normalized === '#/contact') {
      return <ContactView />;
    }

    if (normalized === '#/login') {
      return (
        <LoginView 
          currentPath={currentPath} 
          onLoginSuccess={handleLoginSuccess} 
          onNavigate={handleNavigate} 
        />
      );
    }

    if (normalized === '#/admin') {
      if (!user.isLoggedIn || user.role !== 'admin') {
        return (
          <LoginView 
            currentPath="#/login?mode=login" 
            onLoginSuccess={handleLoginSuccess} 
            onNavigate={handleNavigate} 
          />
        );
      }
      return (
        <AdminDashboardView 
          conferences={conferences}
          blogs={blogs}
          mentors={mentors}
          onUpdateConferences={handleUpdateConferences}
          onUpdateBlogs={handleUpdateBlogs}
          onUpdateMentors={handleUpdateMentors}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      );
    }

    if (normalized === '#/dashboard') {
      // Route protection
      if (!user.isLoggedIn) {
        return (
          <LoginView 
            currentPath="#/login?mode=login" 
            onLoginSuccess={handleLoginSuccess} 
            onNavigate={handleNavigate} 
          />
        );
      }
      return (
        <DashboardView 
          user={user} 
          manuscripts={manuscripts} 
          onUpdateUser={handleUpdateUser} 
          onNavigate={handleNavigate} 
          timeThemeSync={timeThemeSync}
          onToggleTimeThemeSync={(enabled) => {
            setTimeThemeSync(enabled);
            localStorage.setItem('ritechs_time_theme_sync', enabled ? 'enabled' : 'disabled');
          }}
        />
      );
    }

    // Default fallback
    return (
      <HomeView 
        onNavigate={handleNavigate} 
        conferences={conferences} 
        mentors={mentors} 
        blogs={blogs} 
      />
    );
  };

  return (
    <div className={`flex flex-col min-h-screen font-sans transition-colors duration-300 ${
      theme === 'light' ? 'bg-[#FCFBF9]' : 'bg-neutral-warm'
    }`}>
      {/* Subtle top-of-page high-end scroll bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-accent-gold z-[9999] transition-all duration-100 ease-out" 
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-bar"
      />

      {/* Real-time reading time overlay for scroll progression */}
      {(currentPath === '#/blog' || currentPath === '#/dashboard') && (
        <div className="fixed top-2.5 right-6 z-[9999] bg-primary-maroon/95 backdrop-blur-md text-accent-gold border border-accent-gold/45 text-[9px] font-mono font-semibold tracking-widest px-3 py-1 uppercase rounded-xs shadow-lg flex items-center gap-1.5 select-none print:hidden">
          <Clock className="w-3 h-3 text-accent-gold animate-pulse" />
          <span>
            EST. READING: {Math.max(1, Math.ceil(Math.max(1, Math.ceil(wordCount / 200)) * (1 - scrollProgress / 100)))} MINS LEFT ({wordCount} WORDS)
          </span>
        </div>
      )}

      {/* Premium Sticky Navigation */}
      <Navigation 
        currentPath={currentPath} 
        onNavigate={handleNavigate} 
        user={user} 
        onLogout={handleLogout} 
        theme={theme}
        onToggleTheme={toggleTheme}
        timeThemeSync={timeThemeSync}
      />

      {/* Subtle, elegant breadcrumb navigation bar */}
      {breadcrumbs && (
        <div 
          className={`border-b border-accent-gold/20 pt-18 sm:pt-20 pb-3.5 px-6 select-none relative z-25 transition-colors duration-300 ${
            theme === 'light' ? 'bg-[#F4F1E8]' : 'bg-[#030a17]'
          }`} 
          id="ritechs-breadcrumbs"
        >
          <div className={`max-w-6xl mx-auto flex items-center gap-2.5 text-[10px] font-mono tracking-wide ${
            theme === 'light' ? 'text-charcoal/60' : 'text-white/50'
          }`}>
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <div key={idx} className="flex items-center gap-2">
                  {idx > 0 && <span className="text-accent-gold/60 font-sans text-xs">/</span>}
                  {isLast ? (
                    <span className="text-accent-gold font-bold uppercase">{crumb.label}</span>
                  ) : (
                    <button 
                      onClick={() => handleNavigate(crumb.path)}
                      className={`hover:text-accent-gold transition-colors focus:outline-none cursor-pointer uppercase ${
                        theme === 'light' ? 'text-charcoal/80' : 'text-white/80'
                      }`}
                    >
                      {crumb.label}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Primary Dynamic Content Node */}
      <div className={`flex-grow ${breadcrumbs ? "-mt-16" : ""}`}>
        {renderActiveView()}
      </div>

      {/* Premium Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Elite Academic Copilot Widget */}
      <AIAssistant />
    </div>
  );
}

