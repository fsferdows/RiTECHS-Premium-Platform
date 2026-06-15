import React, { useState } from 'react';
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
        
        const loggedUser: UserState = {
          isLoggedIn: true,
          role: roleType,
          name: dummyName,
          email: dummyEmail
        };

        onLoginSuccess(loggedUser);
        onNavigate('#/dashboard');
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

  return (
    <div id="auth-panel-split" className="pt-20 min-h-screen flex flex-col lg:flex-row text-charcoal select-none">
      
      {/* LEFT COLUMN: Luxury Quote Panel (Hidden on small viewports) */}
      <div className="hidden lg:flex w-1/2 bg-primary-navy text-white p-12 flex-col justify-between relative premium-noise overflow-hidden border-r border-accent-gold/15">
        
        {/* Glowing backdrop elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-accent-gold/5 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#1e3b8a]/20 blur-[130px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#C9A96103_1px,transparent_1px),linear-gradient(to_bottom,#C9A96103_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xs border border-accent-gold flex items-center justify-center bg-primary-navy">
            <GraduationCap className="w-6 h-6 text-accent-gold" />
          </div>
          <span className="font-serif-display text-2xl font-bold tracking-tight text-white">RiTECHS</span>
        </div>

        <div className="relative z-10 max-w-lg mb-20">
          <BookMarked className="w-12 h-12 text-[#C9A961]/40 mb-6" />
          
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold leading-normal mb-6">
            Connecting Academic Rigor with Recognition.
          </h2>
          
          <p className="font-serif-accent text-xl italic text-white/80 leading-relaxed font-light mb-8">
            "Your unpublished research represents major intellectual assets. By aligning with credentialed journal peer advisors, we secure maximum acceptance trajectories."
          </p>

          <div className="h-px bg-white/10 w-24 mb-4" />
          <div className="font-serif-display text-sm font-bold text-accent-gold leading-none">
            Dr. Alistair J. Evans
          </div>
          <p className="text-[10px] text-white/55 font-mono mt-1 uppercase tracking-widest leading-none">
            Scientific Chair · RiTECHS Organon
          </p>
        </div>

        {/* Footer meta info */}
        <p className="text-white/45 text-[10px] font-mono relative z-10 uppercase tracking-widest">
          Secured by Wolverhampton Secretariat · © 2026
        </p>
      </div>

      {/* RIGHT COLUMN: Interactive Sign In / Register viewport */}
      <div className="w-full lg:w-1/2 bg-[#FAFAF7] premium-noise p-8 sm:p-16 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-divider-gold/60 p-8 flex flex-col shadow-xs">
          
          {/* Header switch toggler Sign in vs Register */}
          <div className="flex gap-4 border-b border-divider-gold/30 pb-4 mb-8">
            <button
              onClick={() => { setFormMode('login'); setErrorMessage(''); }}
              className={`font-serif-display text-lg font-bold pb-1 relative transition-colors ${
                formMode === 'login' ? 'text-primary-navy' : 'text-muted-gray hover:text-primary-navy'
              }`}
            >
              Scholar Sign In
              {formMode === 'login' && <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-accent-gold" />}
            </button>
            <button
              onClick={() => { setFormMode('register'); setErrorMessage(''); }}
              className={`font-serif-display text-lg font-bold pb-1 relative transition-colors ${
                formMode === 'register' ? 'text-primary-navy' : 'text-muted-gray hover:text-primary-navy'
              }`}
            >
              Create Account
              {formMode === 'register' && <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-accent-gold" />}
            </button>
          </div>

          {/* Error & Success banner triggers */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-300 p-4 text-xs text-red-700 font-mono mb-6 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-300 p-4 text-xs text-green-700 font-mono mb-6 flex items-center gap-2 animate-scale-up">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
              <span>Account authorized, routing to matching panels...</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-xs">
            
            {/* Scholar Role select buttons */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-muted-gray font-bold">Account Designation</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRoleType('mentee')}
                  className={`p-3 text-xs tracking-wider font-mono uppercase transition-colors border ${
                    roleType === 'mentee' 
                      ? 'bg-primary-navy border-primary-navy text-accent-gold font-bold' 
                      : 'bg-white border-divider-gold text-primary-navy/80'
                  }`}
                >
                  PhD / Scholar
                </button>
                <button
                  type="button"
                  onClick={() => setRoleType('mentor')}
                  className={`p-3 text-xs tracking-wider font-mono uppercase transition-colors border ${
                    roleType === 'mentor' 
                      ? 'bg-primary-navy border-primary-navy text-accent-gold font-bold' 
                      : 'bg-white border-divider-gold text-primary-navy/80'
                  }`}
                >
                  Expert Editor
                </button>
              </div>
            </div>

            {/* Scholar / Mentee Name input (Reg only) */}
            {formMode === 'register' && (
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] uppercase tracking-wider text-muted-gray font-bold">Scholar Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-accent-gold absolute left-3 top-3.5" />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Alistair J. Evans"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-neutral-warm/20 border border-divider-gold/80 focus:border-accent-gold outline-none"
                  />
                </div>
              </div>
            )}

            {/* Email input (Both modes) */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-muted-gray font-bold">Institutional Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-accent-gold absolute left-3 top-3.5" />
                <input 
                  type="email" 
                  required
                  placeholder="e.g. name@university.ac.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-neutral-warm/20 border border-divider-gold/80 focus:border-accent-gold outline-none"
                />
              </div>
            </div>

            {/* University input (Reg only) */}
            {formMode === 'register' && (
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] uppercase tracking-wider text-muted-gray font-bold">Institutional Affiliation</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-accent-gold absolute left-3 top-3.5" />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. University of Wolverhampton"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-neutral-warm/20 border border-divider-gold/80 focus:border-accent-gold outline-none"
                  />
                </div>
              </div>
            )}

            {/* ORCID ID (Reg only & mental role type) */}
            {formMode === 'register' && roleType === 'mentor' && (
              <div className="flex flex-col gap-1.5 animate-scale-up">
                <label className="font-mono text-[9px] uppercase tracking-wider text-muted-gray font-bold">ORCID Researcher ID</label>
                <div className="relative">
                  <Award className="w-4 h-4 text-accent-gold absolute left-3 top-3.5" />
                  <input 
                    type="text" 
                    required
                    placeholder="e.0000-0002-1825-0097"
                    value={orcid}
                    onChange={(e) => setOrcid(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-neutral-warm/20 border border-divider-gold/80 focus:border-accent-gold outline-none"
                  />
                </div>
              </div>
            )}

            {/* Password input (Both modes) */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-muted-gray font-bold">Secret Passphrase</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-accent-gold absolute left-3 top-3.5" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-neutral-warm/20 border border-divider-gold/80 focus:border-accent-gold outline-none"
                />
              </div>
            </div>

            {/* Call to action trigger */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary-navy hover:bg-accent-gold text-white hover:text-primary-navy py-4 font-mono font-bold uppercase tracking-widest mt-4 text-[10px] transition-all duration-300 disabled:opacity-40 flex items-center justify-center gap-1.5"
            >
              {submitting ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{formMode === 'login' ? 'Authorize Scholar Credential' : 'Establish Scholar Profile'}</span>
                  <ArrowRight className="w-4 h-4 border-l border-white/20 pl-1 ml-1" />
                </>
              )}
            </button>

            {/* Quick help notice */}
            <p className="text-center text-[10px] text-muted-gray font-sans font-light leading-relaxed mt-2">
              Problems authenticating? Contact the UK Admissions Secretariat at <a href="mailto:info@ritechs.org" className="underline hover:text-accent-gold">info@ritechs.org</a> for security assistance.
            </p>

          </form>

        </div>
      </div>

    </div>
  );
}
