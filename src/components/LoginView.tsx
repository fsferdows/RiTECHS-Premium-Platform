import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, Mail, Lock, User, Sparkles, Building, Globe, Award, 
  BookMarked, HelpCircle, CheckCircle2, ShieldAlert, ArrowRight 
} from 'lucide-react';
import { UserState } from '../types';

interface LoginViewProps {
  currentPath: string; // to parse ?mode=login or register
  onLoginSuccess: (user: UserState) => void;
  onNavigate: (path: string) => void;
}

export default function LoginView({ currentPath, onLoginSuccess, onNavigate }: LoginViewProps) {
  // Parse mode from route query
  const isRegisterMode = currentPath.includes('mode=register');
  const [formMode, setFormMode] = useState<'login' | 'register'>(isRegisterMode ? 'register' : 'login');
  
  // Account type tab selector
  const [roleType, setRoleType] = useState<'mentee' | 'mentor'>('mentee');

  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orcid, setOrcid] = useState('');
  const [university, setUniversity] = useState('University of Wolverhampton');
  
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      
      // Basic login simulator
      if (formMode === 'login') {
        const dummyEmail = email || 'academic@wolverhampton.ac.uk';
        const dummyName = dummyEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase());
        
        const isAdmin = dummyEmail.toLowerCase().includes('admin');
        const loggedUser: UserState = {
          isLoggedIn: true,
          role: isAdmin ? 'admin' : roleType,
          name: isAdmin ? 'Platform Administrator' : dummyName,
          email: dummyEmail
        };

        onLoginSuccess(loggedUser);
        onNavigate(isAdmin ? '#/admin' : '#/dashboard');
      } else {
        // Register simulator
        if (!name || !email) {
          setErrorMessage('Please resolve name and institutional email declarations.');
          return;
        }

        if (roleType === 'mentor' && !orcid) {
          setErrorMessage('Expert mentors require verification via an ORCID ID portfolio.');
          return;
        }

        setSuccess(true);
        setTimeout(() => {
          const newUser: UserState = {
            isLoggedIn: true,
            role: roleType,
            name: name,
            email: email
          };
          onLoginSuccess(newUser);
          setSuccess(false);
          onNavigate('#/dashboard');
        }, 1500);
      }
    }, 1200);
  };

  const handleAdminBypass = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const adminUser: UserState = {
        isLoggedIn: true,
        role: 'admin',
        name: 'Platform Administrator',
        email: 'admin@ritechs.org'
      };
      onLoginSuccess(adminUser);
      onNavigate('#/admin');
    }, 800);
  };

  return (
    <div id="auth-panel-split" className="pt-20 min-h-screen flex flex-col lg:flex-row text-charcoal bg-[#F5F2EB] select-none">
      
      {/* LEFT COLUMN: Luxury Quote Panel (Hidden on small viewports) */}
      <div className="hidden lg:flex w-1/2 bg-maroon-dark text-white p-16 flex-col justify-between relative premium-noise overflow-hidden border-r border-accent-gold/25">
        
        {/* Glowing backdrop elements & gold alignments */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-accent-gold/5 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary-maroon/20 blur-[130px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#C9A96105_1px,transparent_1px),linear-gradient(to_bottom,#C9A96105_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xs border border-accent-gold/40 flex items-center justify-center bg-primary-maroon">
            <GraduationCap className="w-6 h-6 text-accent-gold" />
          </div>
          <span className="font-serif-display text-2.5xl font-bold tracking-tight text-white">RiTECHS</span>
        </div>

        <div className="relative z-10 max-w-lg mb-20 text-left">
          <BookMarked className="w-12 h-12 text-[#C9A961]/40 mb-6" />
          
          <h2 className="font-serif-display text-3xl sm:text-4.5xl font-bold leading-tight mb-6">
            Connecting Academic Rigor with Recognition.
          </h2>
          
          <p className="font-serif-accent text-xl italic text-neutral-200 leading-relaxed font-light mb-8">
            "Your unpublished research represents major intellectual assets. By aligning with credentialed journal peer advisors, we secure maximum acceptance trajectories."
          </p>

          <div className="h-px bg-accent-gold/30 w-24 mb-4" />
          <div className="font-serif-display text-sm font-bold text-accent-gold leading-none">
            Dr. Alistair J. Evans
          </div>
          <p className="text-[10px] text-[#FAFAF7]/60 font-mono mt-1 uppercase tracking-widest leading-none">
            Scientific Chair · RiTECHS Organon
          </p>
        </div>

        {/* Footer meta info */}
        <p className="text-[#FAFAF7]/40 text-[10px] font-mono relative z-10 uppercase tracking-widest text-left">
          Secured by Wolverhampton Secretariat · © 2026
        </p>
      </div>

      {/* RIGHT COLUMN: Interactive Sign In / Register viewport with Premium Classical Layout */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#FAFAF7] to-[#F1EDE2] premium-noise p-6 sm:p-16 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(#C9A96115_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-white border border-accent-gold/30 p-8 flex flex-col shadow-xl rounded-sm z-10"
        >
          {/* Header switch toggler Sign in vs Register */}
          <div className="flex gap-6 border-b border-accent-gold/15 pb-4 mb-8">
            <button
              id="btn-switch-login"
              type="button"
              onClick={() => { setFormMode('login'); setErrorMessage(''); }}
              className={`font-serif-display text-xl font-bold pb-2 relative transition-all duration-300 cursor-pointer ${
                formMode === 'login' ? 'text-primary-maroon' : 'text-neutral-400 hover:text-primary-maroon'
              }`}
            >
              Scholar Sign In
              {formMode === 'login' && (
                <motion.span 
                  layoutId="authTabUnderline"
                  className="absolute bottom-[-17px] left-0 right-0 h-0.75 bg-accent-gold" 
                />
              )}
            </button>
            <button
              id="btn-switch-register"
              type="button"
              onClick={() => { setFormMode('register'); setErrorMessage(''); }}
              className={`font-serif-display text-xl font-bold pb-2 relative transition-all duration-300 cursor-pointer ${
                formMode === 'register' ? 'text-primary-maroon' : 'text-neutral-400 hover:text-primary-maroon'
              }`}
            >
              Create Account
              {formMode === 'register' && (
                <motion.span 
                  layoutId="authTabUnderline"
                  className="absolute bottom-[-17px] left-0 right-0 h-0.75 bg-accent-gold" 
                />
              )}
            </button>
          </div>

          <p className="text-left text-xs text-neutral-500 font-light mb-6">
            {formMode === 'login' 
              ? "Access institutional submissions, track peer feedback logs, and browse customized scholastic guidelines." 
              : "Register your academic affiliations to submit abstracts for IEEE indexing, Springer review, and premium editor routing."
            }
          </p>

          {/* Error & Success banner triggers */}
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border border-red-300 p-4 text-xs text-red-800 font-mono mb-6 flex items-start gap-2.5 rounded-xs"
              >
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                <span className="text-left">{errorMessage}</span>
              </motion.div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-300 p-4 text-xs text-green-800 font-mono mb-6 flex items-start gap-2.5 rounded-xs"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-green-700 mt-0.5" />
                <span className="text-left">Account authorized, routing to matching panels...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-xs text-left">
            
            {/* Scholar Role select buttons */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[9px] uppercase tracking-widest text-[#9D8F7B] font-bold">Account Designation</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id="tab-role-mentee"
                  onClick={() => setRoleType('mentee')}
                  className={`py-3.5 px-4 text-xs tracking-wider font-mono uppercase transition-all duration-300 border rounded-xs cursor-pointer ${
                    roleType === 'mentee' 
                      ? 'bg-primary-maroon border-primary-maroon text-accent-gold font-bold shadow-md' 
                      : 'bg-white border-accent-gold/25 text-primary-maroon/80 hover:bg-neutral-100 hover:border-accent-gold/55'
                  }`}
                >
                  PhD / Scholar
                </button>
                <button
                  type="button"
                  id="tab-role-mentor"
                  onClick={() => setRoleType('mentor')}
                  className={`py-3.5 px-4 text-xs tracking-wider font-mono uppercase transition-all duration-300 border rounded-xs cursor-pointer ${
                    roleType === 'mentor' 
                      ? 'bg-primary-maroon border-primary-maroon text-accent-gold font-bold shadow-md' 
                      : 'bg-white border-accent-gold/25 text-primary-maroon/80 hover:bg-neutral-100 hover:border-accent-gold/55'
                  }`}
                >
                  Expert Editor
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {/* Scholar / Mentee Name input (Reg only) */}
              <AnimatePresence initial={false}>
                {formMode === 'register' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-1.5 overflow-hidden"
                  >
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#9D8F7B] font-bold">Scholar Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-accent-gold absolute left-3.5 top-3.5" />
                      <input 
                        type="text" 
                        required
                        id="reg-input-name"
                        placeholder="e.g. Alistair J. Evans"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-neutral-warm/15 border border-accent-gold/25 focus:border-accent-gold outline-none transition-all duration-200 text-charcoal font-medium text-xs rounded-xs"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email input (Both modes) */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] uppercase tracking-widest text-[#9D8F7B] font-bold">Institutional Email address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-accent-gold absolute left-3.5 top-3.5" />
                  <input 
                    type="email" 
                    required
                    id="input-login-email"
                    placeholder="e.g. name@university.ac.uk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-neutral-warm/15 border border-accent-gold/25 focus:border-accent-gold outline-none transition-all duration-200 text-charcoal font-medium text-xs rounded-xs"
                  />
                </div>
              </div>

              {/* University input (Reg only) */}
              <AnimatePresence initial={false}>
                {formMode === 'register' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-1.5 overflow-hidden"
                  >
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#9D8F7B] font-bold">Institutional Affiliation</label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-accent-gold absolute left-3.5 top-3.5" />
                      <input 
                        type="text" 
                        required
                        id="reg-input-university"
                        placeholder="e.g. University of Wolverhampton"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-neutral-warm/15 border border-accent-gold/25 focus:border-accent-gold outline-none transition-all duration-200 text-charcoal font-medium text-xs rounded-xs"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ORCID ID (Reg only & mental role type) */}
              <AnimatePresence initial={false}>
                {formMode === 'register' && roleType === 'mentor' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-1.5 overflow-hidden"
                  >
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#9D8F7B] font-bold">ORCID Researcher ID</label>
                    <div className="relative">
                      <Award className="w-4 h-4 text-accent-gold absolute left-3.5 top-3.5" />
                      <input 
                        type="text" 
                        required
                        id="reg-input-orcid"
                        placeholder="e.g. 0000-0002-1825-0097"
                        value={orcid}
                        onChange={(e) => setOrcid(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-neutral-warm/15 border border-accent-gold/25 focus:border-accent-gold outline-none transition-all duration-200 text-charcoal font-medium text-xs rounded-xs"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Password input (Both modes) */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] uppercase tracking-widest text-[#9D8F7B] font-bold">Secret Passphrase</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-accent-gold absolute left-3.5 top-3.5" />
                  <input 
                    type="password" 
                    required
                    id="input-login-password"
                    placeholder="•••••••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-neutral-warm/15 border border-accent-gold/25 focus:border-accent-gold outline-none transition-all duration-200 text-charcoal font-medium text-xs rounded-xs"
                  />
                </div>
              </div>
            </div>

            {/* Call to action trigger */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              type="submit"
              id="submit-auth-form"
              disabled={submitting}
              className="w-full bg-primary-maroon hover:bg-accent-gold text-white hover:text-primary-maroon py-4 font-mono font-bold uppercase tracking-widest mt-4 text-[10px] transition-all duration-300 disabled:opacity-40 flex items-center justify-center gap-2 rounded-xs cursor-pointer shadow-md"
            >
              {submitting ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{formMode === 'login' ? 'Authorize Scholar Credentials' : 'Establish Academic Profile'}</span>
                  <ArrowRight className="w-4 h-4 border-l border-white/20 pl-1 ml-1" />
                </>
              )}
            </motion.button>

            {formMode === 'login' && (
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-px bg-accent-gold/25 flex-grow" />
                  <span className="text-[8px] font-mono tracking-widest text-[#9D8F7B] uppercase font-bold">Or Demo Roles</span>
                  <div className="h-px bg-accent-gold/25 flex-grow" />
                </div>
                <button
                  type="button"
                  onClick={handleAdminBypass}
                  className="w-full bg-white hover:bg-neutral-100 text-[#AA2330] border border-[#AA2330]/30 hover:border-[#AA2330] py-3.5 font-mono font-bold uppercase tracking-widest text-[9.5px] transition-all duration-300 flex items-center justify-center gap-2 rounded-xs cursor-pointer shadow-sm"
                  id="admin-bypass-login-btn"
                >
                  <Sparkles className="w-4 h-4 text-accent-gold fill-accent-gold/20 animate-pulse" />
                  <span>Access Secretariat Admin Panel</span>
                </button>
              </div>
            )}

            {/* Quick help notice */}
            <p className="text-center text-[10.5px] text-neutral-500 font-sans font-light leading-relaxed mt-2 border-t border-accent-gold/10 pt-4">
              Problems authenticating? Contact the UK Admissions Secretariat at <a href="mailto:info@ritechs.org" className="underline hover:text-accent-gold font-medium">info@ritechs.org</a> for security assistance.
            </p>

          </form>

        </motion.div>
      </div>

    </div>
  );
}
