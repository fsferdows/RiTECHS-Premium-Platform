/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  INITIAL_CONFERENCES, INITIAL_BLOGS, INITIAL_MANUSCRIPTS, UserState, Manuscript 
} from './types';
import { INITIAL_MENTORS } from './data';

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

  const [scrollProgress, setScrollProgress] = useState(0);

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

  const getBreadcrumbs = () => {
    const normalized = currentPath.split('?')[0];
    if (normalized === '#/' || normalized === '#' || normalized === '') {
      return null;
    }

    const crumbs = [{ label: 'Home', path: '#/' }];

    if (normalized === '#/about') {
      crumbs.push({ label: 'About Us', path: '#/about' });
    } else if (normalized === '#/conferences') {
      crumbs.push({ label: 'Conferences Hub', path: '#/conferences' });
    } else if (normalized.startsWith('#/conferences/')) {
      crumbs.push({ label: 'Conferences Hub', path: '#/conferences' });
      const confName = normalized.split('/').pop()?.toUpperCase() || 'DETAILS';
      crumbs.push({ label: confName, path: currentPath });
    } else if (normalized === '#/mentors') {
      crumbs.push({ label: 'Mentors & Scholars', path: '#/mentors' });
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

    if (normalized === '#/' || normalized === '#' || normalized === '') {
      return (
        <HomeView 
          onNavigate={handleNavigate} 
          conferences={INITIAL_CONFERENCES} 
          mentors={INITIAL_MENTORS} 
          blogs={INITIAL_BLOGS} 
        />
      );
    }
    
    if (normalized === '#/about') {
      return <AboutView />;
    }

    if (normalized === '#/conferences' || normalized.startsWith('#/conferences/')) {
      return (
        <ConferencesView 
          currentPath={currentPath} 
          conferences={INITIAL_CONFERENCES} 
          onNavigate={handleNavigate} 
        />
      );
    }

    if (normalized === '#/mentors') {
      return (
        <MentorsView 
          mentors={INITIAL_MENTORS} 
          onNavigate={handleNavigate} 
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
      return <BlogView blogs={INITIAL_BLOGS} />;
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
        />
      );
    }

    // Default fallback
    return (
      <HomeView 
        onNavigate={handleNavigate} 
        conferences={INITIAL_CONFERENCES} 
        mentors={INITIAL_MENTORS} 
        blogs={INITIAL_BLOGS} 
      />
    );
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-neutral-warm">
      {/* Subtle top-of-page high-end scroll bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-accent-gold z-[9999] transition-all duration-100 ease-out" 
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-bar"
      />

      {/* Premium Sticky Navigation */}
      <Navigation 
        currentPath={currentPath} 
        onNavigate={handleNavigate} 
        user={user} 
        onLogout={handleLogout} 
      />

      {/* Subtle, elegant breadcrumb navigation bar */}
      {breadcrumbs && (
        <div 
          className="bg-[#030a17] border-b border-accent-gold/20 pt-18 sm:pt-20 pb-3.5 px-6 select-none relative z-25" 
          id="ritechs-breadcrumbs"
        >
          <div className="max-w-6xl mx-auto flex items-center gap-2.5 text-[10px] font-mono tracking-wide text-white/50">
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
                      className="hover:text-accent-gold transition-colors focus:outline-none cursor-pointer uppercase"
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

