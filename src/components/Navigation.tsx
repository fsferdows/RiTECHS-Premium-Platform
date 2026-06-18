import { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, ChevronRight, LayoutDashboard, LogOut, Award, Sun, Moon } from 'lucide-react';
import { UserState } from '../types';

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  user: UserState;
  onLogout: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  timeThemeSync?: boolean;
}

export default function Navigation({ currentPath, onNavigate, user, onLogout, theme, onToggleTheme, timeThemeSync = false }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigate
  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: "About", path: "#/about" },
    { name: "Conferences", path: "#/conferences" },
    { name: "Search", path: "#/con_search" },
    { name: "Plans", path: "#/conference_plans" },
    { name: "Mentors", path: "#/mentors" },
    { name: "Services", path: "#/services" },
    { name: "Blog", path: "#/blog" },
    { name: "Contact", path: "#/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "#/" && (currentPath === "" || currentPath === "/")) return true;
    return currentPath === path || currentPath.startsWith(path + '/');
  };

  // Determine if the header background is white (for text color selection)
  const isBgWhite = isScrolled || currentPath !== "#/" || theme === 'light';

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden ${
        isBgWhite
          ? 'bg-white border-b border-accent-gold/20 backdrop-blur-md shadow-xs'
          : 'bg-transparent border-b border-transparent text-white'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav("#/")}
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo"
        >
          <div className="w-10 h-10 rounded-sm border border-accent-gold flex items-center justify-center bg-primary-maroon shadow-inner transition-transform duration-500 group-hover:rotate-12 overflow-hidden">
            {!logoError ? (
              <img 
                src={localStorage.getItem('ritechs_logo') ?? '/logo.png'} 
                alt="RiTECHS Logo" 
                onError={() => setLogoError(true)} 
                className="w-full h-full object-cover"
              />
            ) : (
              <GraduationCap className="w-6 h-6 text-accent-gold" />
            )}
          </div>
          <div>
            <div className={`font-serif-display text-xl font-bold tracking-tight flex items-center leading-none ${
              isBgWhite ? 'text-[#000000]' : 'text-white'
            }`}>
              RiTECHS
              <span className="text-accent-gold text-xs font-sans font-semibold tracking-widest ml-1 md:inline hidden align-top">
                PLATFORM
              </span>
            </div>
            <p className={`text-[9px] font-mono tracking-widest md:block hidden uppercase ${
              isBgWhite ? 'text-stone-850/75' : 'text-[#C9A961]/80'
            }`}>
              Global Academic Excellence
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNav(item.path)}
                className={`relative py-2.5 text-xs font-sans uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 group/nav cursor-pointer ${
                  isActive(item.path)
                    ? 'text-accent-gold font-semibold'
                    : isBgWhite
                      ? 'text-[#000000]/80 hover:text-accent-gold'
                      : 'text-white/80 hover:text-accent-gold'
                }`}
              >
                <span>{item.name}</span>
                {item.name === "Mentors" && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-gold animate-pulse"></span>
                  </span>
                )}
                <span className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent-gold transition-transform duration-300 ${
                  isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'
                }`} />
              </button>
            ))}
          </div>

          <div className={`h-4 w-px ${isBgWhite ? 'bg-[#000000]/15' : 'bg-white/20'}`} />

          {/* Theme Dynamic Controller */}
          <div className="flex items-center gap-1.5" id="theme-control-wrapper" title={timeThemeSync ? "Theme auto-synced with system time (18:00 - 06:00 is dark)" : "Theme manually overridden by user"}>
            <button
              onClick={onToggleTheme}
              className={`w-8 h-8 rounded-full border border-accent-gold/20 hover:border-accent-gold hover:rotate-30 transition-all duration-300 flex items-center justify-center cursor-pointer ${
                isBgWhite ? 'bg-black/5 hover:bg-neutral-100' : 'bg-white/5 hover:bg-white/10'
              }`}
              title={theme === 'dark' ? "Toggle Luxurious Light Theme" : "Toggle Classic Dark Theme"}
              id="theme-toggle"
              type="button"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-accent-gold" />
              ) : (
                <Moon className="w-4 h-4 text-[#9E7D3B]" />
              )}
            </button>
            <div className="flex items-center select-none cursor-help">
              <span className={`relative flex h-1.5 w-1.5`}>
                {timeThemeSync && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${timeThemeSync ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              </span>
              <span className={`text-[8px] font-mono tracking-wider ml-1 uppercase font-semibold ${
                isBgWhite
                  ? (timeThemeSync ? 'text-emerald-700' : 'text-amber-800')
                  : (timeThemeSync ? 'text-emerald-400' : 'text-amber-400')
              }`}>
                {timeThemeSync ? 'Auto' : 'Sync'}
              </span>
            </div>
          </div>

          <div className={`h-4 w-px ${isBgWhite ? 'bg-[#000000]/15' : 'bg-white/20'}`} />

          {/* User Controls */}
          <div className="flex items-center gap-4">
            {user.isLoggedIn ? (
              <>
                {user.role === 'admin' ? (
                  <button
                    onClick={() => handleNav("#/admin")}
                    className={`flex items-center gap-2 px-4 py-2 border border-accent-gold rounded-xs text-xs font-sans uppercase tracking-widest transition-all duration-300 ${
                      currentPath === "#/admin"
                        ? 'bg-accent-gold text-primary-maroon font-bold'
                        : isBgWhite
                          ? 'text-[#000000] border-black/50 hover:bg-black/5'
                          : 'text-accent-gold hover:bg-accent-gold/10'
                    }`}
                    id="nav-btn-admin"
                  >
                    <Award className="w-3.5 h-3.5" />
                    Admin CMS Panel
                  </button>
                ) : (
                  <button
                    onClick={() => handleNav("#/dashboard")}
                    className={`flex items-center gap-2 px-4 py-2 border border-accent-gold/30 rounded-xs text-xs font-sans uppercase tracking-widest transition-all duration-300 ${
                      currentPath === "#/dashboard"
                        ? 'bg-accent-gold text-primary-maroon font-bold'
                        : 'text-accent-gold hover:bg-accent-gold/10'
                    }`}
                    id="nav-btn-dashboard"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Dashboard
                  </button>
                )}
                <div className="hidden xl:flex flex-col text-right">
                  <span className={`text-[10px] leading-tight ${isBgWhite ? 'text-[#000000]/60' : 'text-white/50'}`}>Logged as</span>
                  <span className="text-[11px] text-accent-gold font-medium leading-none max-w-[100px] truncate">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className={`p-2 transition-colors ${isBgWhite ? 'text-[#000000]/60 hover:text-red-650' : 'text-white/60 hover:text-red-400'}`}
                  title="Logout"
                  id="nav-btn-logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNav("#/login?mode=login")}
                  className={`text-xs font-sans uppercase tracking-widest transition-colors py-2 cursor-pointer ${
                    isBgWhite ? 'text-[#000000]/80 hover:text-primary-maroon font-medium' : 'text-white/80 hover:text-white'
                  }`}
                  id="nav-btn-login"
                >
                  Scholar Login
                </button>
                <button
                  onClick={() => handleNav("#/login?mode=register")}
                  className="bg-accent-gold hover:bg-[#B3934B] text-primary-maroon px-5 py-2.5 rounded-sm text-xs font-sans uppercase tracking-widest font-semibold transition-all duration-300 shadow-sm cursor-pointer"
                  id="nav-btn-register"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 transition-colors focus:outline-none cursor-pointer ${isBgWhite ? 'text-black hover:text-accent-gold' : 'text-white hover:text-accent-gold'}`}
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t border-accent-gold/10 animate-fade-in py-6 px-6 shadow-inner ${
          isBgWhite ? 'bg-white text-black' : 'bg-maroon-dark text-white'
        }`}>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center pb-2 border-b border-accent-gold/10">
              <span className="font-mono text-[9px] uppercase tracking-widest text-accent-gold font-bold">Preferences</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onToggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 border border-accent-gold/20 rounded-xs text-xs font-mono uppercase tracking-wider text-accent-gold cursor-pointer"
                  id="mobile-theme-toggle"
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{theme === 'dark' ? 'Classy Light' : 'Classic Dark'}</span>
                </button>
                <div 
                  className={`px-2 py-0.5 rounded-full text-[8px] font-mono uppercase tracking-wider font-bold border ${
                    timeThemeSync
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                  }`}
                  title={timeThemeSync ? "Managed by system time" : "Manual override"}
                >
                  {timeThemeSync ? 'Auto-Sync' : 'Manual'}
                </div>
              </div>
            </div>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNav(item.path)}
                className={`py-3 text-left text-sm uppercase tracking-widest border-b border-accent-gold/10 transition-colors cursor-pointer ${
                  isActive(item.path) 
                    ? 'text-accent-gold font-bold' 
                    : isBgWhite 
                      ? 'text-black hover:text-accent-gold' 
                      : 'text-white/80 hover:text-accent-gold'
                }`}
              >
                {item.name}
              </button>
            ))}

            {user.isLoggedIn ? (
              <div className="flex flex-col gap-3 pt-4">
                <div className={`text-xs font-sans ${isBgWhite ? 'text-black' : 'text-white/60'}`}>
                  Authenticated: <span className="text-accent-gold font-semibold">{user.name}</span> ({user.role})
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {user.role === 'admin' ? (
                    <button
                      onClick={() => handleNav("#/admin")}
                      className="flex items-center justify-center gap-2 bg-accent-gold text-primary-maroon py-3 text-xs uppercase tracking-wider font-semibold cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      Admin CMS
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNav("#/dashboard")}
                      className="flex items-center justify-center gap-2 bg-accent-gold/10 border border-accent-gold text-accent-gold py-3 text-xs uppercase tracking-wider font-semibold cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </button>
                  )}
                  <button
                    onClick={onLogout}
                    className={`border text-xs uppercase tracking-wider py-3 cursor-pointer ${
                      isBgWhite 
                        ? 'bg-neutral-100 border-[#000000]/10 text-black' 
                        : 'bg-red-950/40 border-red-500/20 text-red-100'
                    }`}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={() => handleNav("#/login?mode=login")}
                  className={`border py-3 text-xs uppercase tracking-widest text-center cursor-pointer ${
                    isBgWhite ? 'border-black/20 text-black' : 'border-white/30 text-white'
                  }`}
                >
                  Scholar Login
                </button>
                <button
                  onClick={() => handleNav("#/login?mode=register")}
                  className="bg-accent-gold text-primary-maroon py-3 text-xs uppercase tracking-widest text-center font-bold cursor-pointer"
                >
                  Register Account
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
