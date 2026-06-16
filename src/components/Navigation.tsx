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
}

export default function Navigation({ currentPath, onNavigate, user, onLogout, theme, onToggleTheme }: NavigationProps) {
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
    { name: "Mentors", path: "#/mentors" },
    { name: "Services", path: "#/services" },
    { name: "Blog", path: "#/blog" },
    { name: "Contact", path: "#/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "#/" && (currentPath === "" || currentPath === "/")) return true;
    return currentPath === path || currentPath.startsWith(path + '/');
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        theme === 'light'
          ? 'bg-[#FAFAF7]/95 border-b border-accent-gold/20 backdrop-blur-md shadow-xs'
          : isScrolled || currentPath !== "#/"
            ? 'bg-maroon-dark/95 backdrop-blur-md shadow-lg border-b border-accent-gold/10'
            : 'bg-transparent'
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
                src="/logo.png" 
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
              theme === 'light' ? 'text-primary-maroon' : 'text-white'
            }`}>
              RiTECHS
              <span className="text-accent-gold text-xs font-sans font-semibold tracking-widest ml-1 md:inline hidden align-top">
                PLATFORM
              </span>
            </div>
            <p className={`text-[9px] font-mono tracking-widest md:block hidden uppercase ${
              theme === 'light' ? 'text-primary-maroon/70' : 'text-[#C9A961]/80'
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
                    : theme === 'light'
                      ? 'text-charcoal/80 hover:text-accent-gold'
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

          <div className={`h-4 w-px ${theme === 'light' ? 'bg-charcoal/10' : 'bg-white/20'}`} />

          {/* Theme Dynamic Controller */}
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-full border border-accent-gold/20 hover:border-accent-gold hover:rotate-30 transition-all duration-300 flex items-center justify-center cursor-pointer bg-black/5 hover:bg-neutral-100"
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

          <div className={`h-4 w-px ${theme === 'light' ? 'bg-charcoal/10' : 'bg-white/20'}`} />

          {/* User Controls */}
          <div className="flex items-center gap-4">
            {user.isLoggedIn ? (
              <>
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
                <div className="hidden xl:flex flex-col text-right">
                  <span className={`text-[10px] leading-tight ${theme === 'light' ? 'text-charcoal/60' : 'text-white/50'}`}>Logged as</span>
                  <span className="text-[11px] text-accent-gold font-medium leading-none max-w-[100px] truncate">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className={`p-2 transition-colors ${theme === 'light' ? 'text-charcoal/60 hover:text-red-600' : 'text-white/60 hover:text-red-400'}`}
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
                  className={`text-xs font-sans uppercase tracking-widest transition-colors py-2 ${
                    theme === 'light' ? 'text-charcoal/80 hover:text-primary-maroon font-medium' : 'text-white/80 hover:text-white'
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
          className={`lg:hidden p-2 transition-colors focus:outline-none ${theme === 'light' ? 'text-charcoal hover:text-accent-gold' : 'text-white hover:text-accent-gold'}`}
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t border-accent-gold/10 animate-fade-in py-6 px-6 shadow-inner ${
          theme === 'light' ? 'bg-[#FCFBF9] text-charcoal' : 'bg-maroon-dark text-white'
        }`}>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center pb-2 border-b border-accent-gold/10">
              <span className="font-mono text-[9px] uppercase tracking-widest text-accent-gold font-bold">Preferences</span>
              <button
                onClick={onToggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 border border-accent-gold/20 rounded-xs text-xs font-mono uppercase tracking-wider text-accent-gold"
                id="mobile-theme-toggle"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{theme === 'dark' ? 'Classy Light' : 'Classic Dark'}</span>
              </button>
            </div>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNav(item.path)}
                className={`py-3 text-left text-sm uppercase tracking-widest border-b border-accent-gold/10 transition-colors ${
                  isActive(item.path) 
                    ? 'text-accent-gold font-bold' 
                    : theme === 'light' 
                      ? 'text-charcoal hover:text-accent-gold' 
                      : 'text-white/80 hover:text-accent-gold'
                }`}
              >
                {item.name}
              </button>
            ))}

            {user.isLoggedIn ? (
              <div className="flex flex-col gap-3 pt-4">
                <div className={`text-xs font-sans ${theme === 'light' ? 'text-charcoal' : 'text-white/60'}`}>
                  Authenticated: <span className="text-accent-gold font-semibold">{user.name}</span> ({user.role})
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleNav("#/dashboard")}
                    className="flex items-center justify-center gap-2 bg-accent-gold/10 border border-accent-gold text-accent-gold py-3 text-xs uppercase tracking-wider font-semibold"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </button>
                  <button
                    onClick={onLogout}
                    className={`border text-xs uppercase tracking-wider py-3 ${
                      theme === 'light' 
                        ? 'bg-neutral-100 border-charcoal/10 text-charcoal' 
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
                  className={`border py-3 text-xs uppercase tracking-widest text-center ${
                    theme === 'light' ? 'border-charcoal/20 text-charcoal' : 'border-white/30 text-white'
                  }`}
                >
                  Scholar Login
                </button>
                <button
                  onClick={() => handleNav("#/login?mode=register")}
                  className="bg-accent-gold text-primary-maroon py-3 text-xs uppercase tracking-widest text-center font-bold"
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
