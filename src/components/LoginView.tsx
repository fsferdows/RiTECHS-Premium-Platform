import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, Mail, Lock, User, Sparkles, Building, Globe, Award, 
  BookMarked, HelpCircle, CheckCircle2, ShieldAlert, ArrowRight, Phone 
} from 'lucide-react';
import { UserState } from '../types';

interface CountryItem {
  name: string;
  code: string;
  flag: string;
}

const COUNTRIES_DATA: CountryItem[] = [
  { name: "Afghanistan", code: "+93", flag: "🇦🇫" },
  { name: "Albania", code: "+355", flag: "🇦🇱" },
  { name: "Algeria", code: "+213", flag: "🇩🇿" },
  { name: "Andorra", code: "+376", flag: "🇦🇩" },
  { name: "Angola", code: "+244", flag: "🇦🇴" },
  { name: "Argentina", code: "+54", flag: "🇦🇷" },
  { name: "Armenia", code: "+374", flag: "🇦🇲" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Austria", code: "+43", flag: "🇦🇹" },
  { name: "Azerbaijan", code: "+994", flag: "🇦🇿" },
  { name: "Bahamas", code: "+1-242", flag: "🇧🇸" },
  { name: "Bahrain", code: "+973", flag: "🇧🇭" },
  { name: "Bangladesh", code: "+880", flag: "🇧🇩" },
  { name: "Barbados", code: "+1-246", flag: "🇧🇧" },
  { name: "Belarus", code: "+375", flag: "🇧🇾" },
  { name: "Belgium", code: "+32", flag: "🇧🇪" },
  { name: "Belize", code: "+501", flag: "🇧🇿" },
  { name: "Benin", code: "+229", flag: "🇧🇯" },
  { name: "Bhutan", code: "+975", flag: "🇧🇹" },
  { name: "Bolivia", code: "+591", flag: "🇧🇴" },
  { name: "Bosnia and Herzegovina", code: "+387", flag: "🇧🇦" },
  { name: "Botswana", code: "+267", flag: "🇧🇼" },
  { name: "Brazil", code: "+55", flag: "🇧🇷" },
  { name: "Brunei", code: "+673", flag: "🇧🇳" },
  { name: "Bulgaria", code: "+359", flag: "🇧🇬" },
  { name: "Burkina Faso", code: "+226", flag: "🇧🇫" },
  { name: "Burundi", code: "+257", flag: "🇧🇮" },
  { name: "Cambodia", code: "+855", flag: "🇰🇭" },
  { name: "Cameroon", code: "+237", flag: "🇨🇲" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Cape Verde", code: "+238", flag: "🇨🇻" },
  { name: "Central African Republic", code: "+236", flag: "🇨🇫" },
  { name: "Chad", code: "+235", flag: "🇹🇩" },
  { name: "Chile", code: "+56", flag: "🇨🇱" },
  { name: "China", code: "+86", flag: "🇨🇳" },
  { name: "Colombia", code: "+57", flag: "🇨🇴" },
  { name: "Comoros", code: "+269", flag: "🇰🇲" },
  { name: "Congo", code: "+242", flag: "🇨🇬" },
  { name: "Costa Rica", code: "+506", flag: "🇨🇷" },
  { name: "Croatia", code: "+385", flag: "🇭🇷" },
  { name: "Cuba", code: "+53", flag: "🇨🇺" },
  { name: "Cyprus", code: "+357", flag: "🇨🇾" },
  { name: "Czech Republic", code: "+420", flag: "🇨🇿" },
  { name: "Denmark", code: "+45", flag: "🇩🇰" },
  { name: "Djibouti", code: "+253", flag: "🇩🇯" },
  { name: "Dominica", code: "+1-767", flag: "🇩🇲" },
  { name: "Dominican Republic", code: "+1-809", flag: "🇩🇴" },
  { name: "Ecuador", code: "+593", flag: "🇪🇨" },
  { name: "Egypt", code: "+20", flag: "🇪🇬" },
  { name: "El Salvador", code: "+503", flag: "🇸🇻" },
  { name: "Equatorial Guinea", code: "+240", flag: "🇬🇶" },
  { name: "Eritrea", code: "+291", flag: "🇪🇷" },
  { name: "Estonia", code: "+372", flag: "🇪🇪" },
  { name: "Eswatini", code: "+268", flag: "🇸🇿" },
  { name: "Ethiopia", code: "+251", flag: "🇪🇹" },
  { name: "Fiji", code: "+679", flag: "🇫🇯" },
  { name: "Finland", code: "+358", flag: "🇫🇮" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Gabon", code: "+241", flag: "🇬🇦" },
  { name: "Gambia", code: "+220", flag: "🇬🇲" },
  { name: "Georgia", code: "+995", flag: "🇬🇪" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "Ghana", code: "+233", flag: "🇬🇭" },
  { name: "Greece", code: "+30", flag: "🇬🇷" },
  { name: "Grenada", code: "+1-473", flag: "🇬🇩" },
  { name: "Guatemala", code: "+502", flag: "🇬🇹" },
  { name: "Guinea", code: "+224", flag: "🇬🇳" },
  { name: "Guyana", code: "+592", flag: "🇬🇾" },
  { name: "Haiti", code: "+509", flag: "🇭🇹" },
  { name: "Honduras", code: "+504", flag: "🇭🇳" },
  { name: "Hungary", code: "+36", flag: "🇭🇺" },
  { name: "Iceland", code: "+354", flag: "🇮🇸" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Indonesia", code: "+62", flag: "🇮🇩" },
  { name: "Iran", code: "+98", flag: "🇮🇷" },
  { name: "Iraq", code: "+964", flag: "🇮🇶" },
  { name: "Ireland", code: "+353", flag: "🇮🇪" },
  { name: "Israel", code: "+972", flag: "🇮🇱" },
  { name: "Italy", code: "+39", flag: "🇮🇹" },
  { name: "Jamaica", code: "+1-876", flag: "🇯🇲" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "Jordan", code: "+962", flag: "🇯🇴" },
  { name: "Kazakhstan", code: "+7", flag: "🇰🇿" },
  { name: "Kenya", code: "+254", flag: "🇰🇪" },
  { name: "Kiribati", code: "+686", flag: "🇰🇮" },
  { name: "Kuwait", code: "+965", flag: "🇰🇼" },
  { name: "Kyrgyzstan", code: "+996", flag: "🇰🇬" },
  { name: "Laos", code: "+856", flag: "🇱🇦" },
  { name: "Latvia", code: "+371", flag: "🇱🇻" },
  { name: "Lebanon", code: "+961", flag: "🇱🇧" },
  { name: "Lesotho", code: "+266", flag: "🇱🇸" },
  { name: "Liberia", code: "+231", flag: "🇱🇷" },
  { name: "Libya", code: "+218", flag: "🇱🇾" },
  { name: "Liechtenstein", code: "+423", flag: "🇱🇮" },
  { name: "Lithuania", code: "+370", flag: "🇱🇹" },
  { name: "Luxembourg", code: "+352", flag: "🇱🇺" },
  { name: "Madagascar", code: "+261", flag: "🇲🇬" },
  { name: "Malawi", code: "+265", flag: "🇲🇼" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾" },
  { name: "Maldives", code: "+960", flag: "🇲🇻" },
  { name: "Mali", code: "+223", flag: "🇲🇱" },
  { name: "Malta", code: "+356", flag: "🇲🇹" },
  { name: "Mauritius", code: "+230", flag: "🇲🇺" },
  { name: "Mexico", code: "+52", flag: "🇲🇽" },
  { name: "Micronesia", code: "+691", flag: "🇫🇲" },
  { name: "Moldova", code: "+373", flag: "🇲🇩" },
  { name: "Monaco", code: "+377", flag: "🇲🇨" },
  { name: "Mongolia", code: "+976", flag: "🇲🇳" },
  { name: "Montenegro", code: "+382", flag: "🇲🇪" },
  { name: "Morocco", code: "+212", flag: "🇲🇦" },
  { name: "Mozambique", code: "+258", flag: "🇲🇿" },
  { name: "Myanmar", code: "+95", flag: "🇲🇲" },
  { name: "Namibia", code: "+264", flag: "🇳🇦" },
  { name: "Nepal", code: "+977", flag: "🇳🇵" },
  { name: "Netherlands", code: "+31", flag: "🇳🇱" },
  { name: "New Zealand", code: "+64", flag: "🇳🇿" },
  { name: "Nicaragua", code: "+505", flag: "🇳🇮" },
  { name: "Niger", code: "+227", flag: "🇳🇪" },
  { name: "Nigeria", code: "+234", flag: "🇳🇬" },
  { name: "North Korea", code: "+850", flag: "🇰🇵" },
  { name: "North Macedonia", code: "+389", flag: "🇲🇰" },
  { name: "Norway", code: "+47", flag: "🇳🇴" },
  { name: "Oman", code: "+968", flag: "🇴🇲" },
  { name: "Pakistan", code: "+92", flag: "🇵🇰" },
  { name: "Palestine", code: "+970", flag: "🇵🇸" },
  { name: "Panama", code: "+507", flag: "🇵🇦" },
  { name: "Papua New Guinea", code: "+675", flag: "🇵🇬" },
  { name: "Paraguay", code: "+595", flag: "🇵🇾" },
  { name: "Peru", code: "+51", flag: "🇵🇪" },
  { name: "Philippines", code: "+63", flag: "🇵🇭" },
  { name: "Poland", code: "+48", flag: "🇵🇱" },
  { name: "Portugal", code: "+351", flag: "🇵🇹" },
  { name: "Qatar", code: "+974", flag: "🇶🇦" },
  { name: "Romania", code: "+40", flag: "🇷🇴" },
  { name: "Russia", code: "+7", flag: "🇷🇺" },
  { name: "Rwanda", code: "+250", flag: "🇷🇼" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "Senegal", code: "+221", flag: "🇸🇳" },
  { name: "Serbia", code: "+381", flag: "🇷🇸" },
  { name: "Seychelles", code: "+248", flag: "🇸🇨" },
  { name: "Sierra Leone", code: "+232", flag: "🇸🇱" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "Slovakia", code: "+421", flag: "🇸🇰" },
  { name: "Slovenia", code: "+386", flag: "🇸🇮" },
  { name: "Solomon Islands", code: "+677", flag: "🇸🇧" },
  { name: "Somalia", code: "+252", flag: "🇸🇴" },
  { name: "South Africa", code: "+27", flag: "🇿🇦" },
  { name: "South Korea", code: "+82", flag: "🇰🇷" },
  { name: "South Sudan", code: "+211", flag: "🇸🇸" },
  { name: "Spain", code: "+34", flag: "🇪🇸" },
  { name: "Sri Lanka", code: "+94", flag: "🇱🇰" },
  { name: "Sudan", code: "+249", flag: "🇸🇩" },
  { name: "Suriname", code: "+597", flag: "🇸🇷" },
  { name: "Sweden", code: "+46", flag: "🇸🇪" },
  { name: "Switzerland", code: "+41", flag: "🇨🇭" },
  { name: "Syria", code: "+963", flag: "🇸🇾" },
  { name: "Taiwan", code: "+886", flag: "🇹🇼" },
  { name: "Tajikistan", code: "+992", flag: "🇹🇯" },
  { name: "Tanzania", code: "+255", flag: "🇹🇿" },
  { name: "Thailand", code: "+66", flag: "🇹🇭" },
  { name: "Timor-Leste", code: "+670", flag: "🇹🇱" },
  { name: "Togo", code: "+228", flag: "🇹🇬" },
  { name: "Tonga", code: "+676", flag: "🇹🇴" },
  { name: "Trinidad and Tobago", code: "+1-868", flag: "🇹🇹" },
  { name: "Tunisia", code: "+216", flag: "🇹🇳" },
  { name: "Turkey", code: "+90", flag: "🇹🇷" },
  { name: "Turkmenistan", code: "+993", flag: "🇹🇲" },
  { name: "Tuvalu", code: "+688", flag: "🇹🇻" },
  { name: "Uganda", code: "+256", flag: "🇺🇬" },
  { name: "Ukraine", code: "+380", flag: "🇺🇦" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "Uruguay", code: "+598", flag: "🇺🇾" },
  { name: "Uzbekistan", code: "+998", flag: "🇺🇿" },
  { name: "Vanuatu", code: "+678", flag: "🇻🇺" },
  { name: "Venezuela", code: "+58", flag: "🇻🇪" },
  { name: "Vietnam", code: "+84", flag: "🇻🇳" },
  { name: "Yemen", code: "+967", flag: "🇾🇪" },
  { name: "Zambia", code: "+260", flag: "🇿🇲" },
  { name: "Zimbabwe", code: "+263", flag: "🇿🇼" }
];

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
  const [country, setCountry] = useState('United Kingdom');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const selectedCountry = COUNTRIES_DATA.find(c => c.name === country) || { name: 'United Kingdom', code: '+44', flag: '🇬🇧' };
  
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

        if (!country || !phoneNumber) {
          setErrorMessage('Please declare your country/region of residence and phone number.');
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
          className="w-full max-w-md bg-white/95 backdrop-blur-md border border-accent-gold/30 hover:border-accent-gold/60 p-8 flex flex-col shadow-[0_20px_50px_rgba(201,169,97,0.12)] hover:shadow-[0_25px_60px_rgba(201,169,97,0.22)] transition-all duration-500 rounded-xs relative overflow-hidden z-10 group/card"
        >
          {/* Elite top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-gold via-[#E2C785] to-accent-gold opacity-90" />
          
          {/* Subtle background glow circle inside the card that lights up on card hover */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-accent-gold/5 blur-3xl group-hover/card:bg-accent-gold/10 transition-all duration-500 pointer-events-none" />

          {/* Header switch toggler Sign in vs Register */}
          <div className="flex gap-6 border-b border-accent-gold/15 pb-4 mb-6 relative">
            <button
              id="btn-switch-login"
              type="button"
              onClick={() => { setFormMode('login'); setErrorMessage(''); }}
              className={`font-serif-display text-lg font-bold pb-1.5 relative transition-all duration-300 cursor-pointer ${
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
              className={`font-serif-display text-lg font-bold pb-1.5 relative transition-all duration-300 cursor-pointer ${
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

          <p className="text-left text-xs text-neutral-500 font-light mb-5 leading-relaxed">
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
                className="bg-red-50/90 border border-red-200 p-3.5 text-xs text-red-800 font-mono mb-5 flex items-start gap-2.5 rounded-xs"
              >
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                <span className="text-left font-medium">{errorMessage}</span>
              </motion.div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50/90 border border-green-200 p-3.5 text-xs text-green-800 font-mono mb-5 flex items-start gap-2.5 rounded-xs"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-green-700 mt-0.5" />
                <span className="text-left font-medium">Account authorized, routing to matching panels...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-xs text-left">
            
            {/* Scholar Role select buttons */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-widest text-[#9D8F7B] font-bold">Account Designation</label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  id="tab-role-mentee"
                  onClick={() => setRoleType('mentee')}
                  className={`py-2.5 px-3.5 text-xs tracking-wider font-mono uppercase transition-all duration-300 border rounded-xs cursor-pointer ${
                    roleType === 'mentee' 
                      ? 'bg-primary-maroon border-primary-maroon text-accent-gold font-bold shadow-md ring-2 ring-accent-gold/20' 
                      : 'bg-[#FCFBF9]/80 border-accent-gold/20 text-primary-maroon/70 hover:bg-neutral-100 hover:border-accent-gold/45'
                  }`}
                >
                  PhD / Scholar
                </button>
                <button
                  type="button"
                  id="tab-role-mentor"
                  onClick={() => setRoleType('mentor')}
                  className={`py-2.5 px-3.5 text-xs tracking-wider font-mono uppercase transition-all duration-300 border rounded-xs cursor-pointer ${
                    roleType === 'mentor' 
                      ? 'bg-primary-maroon border-primary-maroon text-accent-gold font-bold shadow-md ring-2 ring-accent-gold/20' 
                      : 'bg-[#FCFBF9]/80 border-accent-gold/20 text-primary-maroon/70 hover:bg-neutral-100 hover:border-accent-gold/45'
                  }`}
                >
                  Expert Editor
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Scholar / Mentee Name input (Reg only) */}
              <AnimatePresence initial={false}>
                {formMode === 'register' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-1.5 overflow-hidden group"
                  >
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#9D8F7B] group-hover:text-primary-maroon group-focus-within:text-primary-maroon transition-colors duration-300 font-bold">Scholar Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-accent-gold absolute left-3.5 top-3.5 group-hover:scale-105 group-focus-within:scale-110 transition-transform duration-300" />
                      <input 
                        type="text" 
                        required
                        id="reg-input-name"
                        placeholder="e.g. Alistair J. Evans"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[#FCFBF9]/60 hover:bg-white border border-accent-gold/25 focus:border-accent-gold focus:bg-white focus:ring-4 focus:ring-accent-gold/10 outline-none transition-all duration-300 text-charcoal font-medium text-xs rounded-xs"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email input (Both modes) */}
              <div className="flex flex-col gap-1.5 group">
                <label className="font-mono text-[9px] uppercase tracking-widest text-[#9D8F7B] group-hover:text-primary-maroon group-focus-within:text-primary-maroon transition-colors duration-300 font-bold">Institutional Email address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-accent-gold absolute left-3.5 top-3.5 group-hover:scale-105 group-focus-within:scale-110 transition-transform duration-300" />
                  <input 
                    type="email" 
                    required
                    id="input-login-email"
                    placeholder="e.g. name@university.ac.uk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#FCFBF9]/60 hover:bg-white border border-accent-gold/25 focus:border-accent-gold focus:bg-white focus:ring-4 focus:ring-accent-gold/10 outline-none transition-all duration-300 text-charcoal font-medium text-xs rounded-xs"
                  />
                </div>
              </div>

              {/* University input (Reg only) */}
              <AnimatePresence initial={false}>
                {formMode === 'register' && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-1.5 overflow-hidden group"
                    >
                      <label className="font-mono text-[9px] uppercase tracking-widest text-[#9D8F7B] group-hover:text-primary-maroon group-focus-within:text-primary-maroon transition-colors duration-300 font-bold">Institutional Affiliation</label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-accent-gold absolute left-3.5 top-3.5 group-hover:scale-105 group-focus-within:scale-110 transition-transform duration-300" />
                        <input 
                          type="text" 
                          required
                          id="reg-input-university"
                          placeholder="e.g. University of Wolverhampton"
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-[#FCFBF9]/60 hover:bg-white border border-accent-gold/25 focus:border-accent-gold focus:bg-white focus:ring-4 focus:ring-accent-gold/10 outline-none transition-all duration-300 text-charcoal font-medium text-xs rounded-xs"
                        />
                      </div>
                    </motion.div>

                    {/* Country & Phone Number (Reg only, Premium Layout) */}
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-3.5 overflow-hidden"
                    >
                      <div className="flex flex-col gap-1.5 group">
                        <label className="font-mono text-[9px] uppercase tracking-widest text-[#9D8F7B] group-hover:text-primary-maroon group-focus-within:text-primary-maroon transition-colors duration-300 font-bold">Country / Region</label>
                        <div className="relative">
                          <Globe className="w-4 h-4 text-accent-gold absolute left-3.5 top-3.5 pointer-events-none group-hover:scale-105 group-focus-within:scale-110 transition-transform duration-300" />
                          <select 
                            required
                            id="reg-input-country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full pl-10 pr-8 py-3 bg-[#FCFBF9]/60 hover:bg-white border border-accent-gold/25 focus:border-accent-gold focus:bg-white focus:ring-4 focus:ring-accent-gold/10 outline-none transition-all duration-200 text-charcoal font-medium text-xs rounded-xs appearance-none cursor-pointer"
                          >
                            {COUNTRIES_DATA.map((c) => (
                              <option key={c.name} value={c.name}>
                                {c.name} {c.flag} ({c.code})
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-accent-gold">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 group">
                        <label className="font-mono text-[9px] uppercase tracking-widest text-[#9D8F7B] group-hover:text-primary-maroon group-focus-within:text-primary-maroon transition-colors duration-300 font-bold">Phone Number</label>
                        <div className="relative flex items-center w-full bg-[#FCFBF9]/60 hover:bg-white border border-accent-gold/25 focus-within:border-accent-gold focus-within:bg-white focus-within:ring-4 focus-within:ring-accent-gold/10 outline-none transition-all duration-300 rounded-xs overflow-hidden h-[42px]">
                          
                          {/* Phone Icon */}
                          <Phone className="w-4 h-4 text-accent-gold ml-3.5 shrink-0" />
                          
                          {/* Vertical Divider line */}
                          <div className="h-4 w-[1px] bg-accent-gold/25 mx-2.5 shrink-0" />
                          
                          {/* Dynamic premium calling code badge */}
                          <div className="flex items-center gap-1 pr-2 shrink-0 select-none">
                            <motion.span 
                              key={`flag-${selectedCountry.flag}`}
                              initial={{ y: -6, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: 6, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-sm"
                            >
                              {selectedCountry.flag}
                            </motion.span>
                            <motion.span 
                              key={`code-${selectedCountry.code}`}
                              initial={{ x: -4, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: 4, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="font-mono text-[11px] font-bold text-accent-gold bg-accent-gold/5 px-1 py-0.5 rounded-xs border border-accent-gold/10"
                            >
                              {selectedCountry.code}
                            </motion.span>
                          </div>
                          
                          {/* Custom boundary-free input */}
                          <input 
                            type="tel" 
                            required
                            id="reg-input-phone"
                            placeholder="e.g. 7911 123456"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full h-full bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-charcoal font-medium text-xs pl-1 pr-4"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </>
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
                    className="flex flex-col gap-1.5 overflow-hidden group"
                  >
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#9D8F7B] group-hover:text-primary-maroon group-focus-within:text-primary-maroon transition-colors duration-300 font-bold">ORCID Researcher ID</label>
                    <div className="relative">
                      <Award className="w-4 h-4 text-accent-gold absolute left-3.5 top-3.5 group-hover:scale-105 group-focus-within:scale-110 transition-transform duration-300" />
                      <input 
                        type="text" 
                        required
                        id="reg-input-orcid"
                        placeholder="e.g. 0000-0002-1825-0097"
                        value={orcid}
                        onChange={(e) => setOrcid(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[#FCFBF9]/60 hover:bg-white border border-accent-gold/25 focus:border-accent-gold focus:bg-white focus:ring-4 focus:ring-accent-gold/10 outline-none transition-all duration-300 text-charcoal font-medium text-xs rounded-xs"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Password input (Both modes) */}
              <div className="flex flex-col gap-1.5 group">
                <label className="font-mono text-[9px] uppercase tracking-widest text-[#9D8F7B] group-hover:text-primary-maroon group-focus-within:text-primary-maroon transition-colors duration-300 font-bold">Secret Passphrase</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-accent-gold absolute left-3.5 top-3.5 group-hover:scale-105 group-focus-within:scale-110 transition-transform duration-300" />
                  <input 
                    type="password" 
                    required
                    id="input-login-password"
                    placeholder="•••••••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#FCFBF9]/60 hover:bg-white border border-accent-gold/25 focus:border-accent-gold focus:bg-white focus:ring-4 focus:ring-accent-gold/10 outline-none transition-all duration-300 text-charcoal font-medium text-xs rounded-xs"
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
              className="w-full bg-primary-maroon hover:bg-accent-gold text-white hover:text-primary-maroon py-3.5 font-mono font-bold uppercase tracking-widest mt-2 text-[10px] transition-all duration-300 disabled:opacity-40 flex items-center justify-center gap-2 rounded-xs cursor-pointer shadow-md"
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
              <div className="mt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-px bg-accent-gold/25 flex-grow" />
                  <span className="text-[8px] font-mono tracking-widest text-[#9D8F7B] uppercase font-bold">Or Demo Roles</span>
                  <div className="h-px bg-accent-gold/25 flex-grow" />
                </div>
                <button
                  type="button"
                  onClick={handleAdminBypass}
                  className="w-full bg-white hover:bg-neutral-100 text-[#AA2330] border border-[#AA2330]/30 hover:border-[#AA2330] py-3 font-mono font-bold uppercase tracking-widest text-[9.5px] transition-all duration-300 flex items-center justify-center gap-2 rounded-xs cursor-pointer shadow-sm"
                  id="admin-bypass-login-btn"
                >
                  <Sparkles className="w-4 h-4 text-accent-gold fill-accent-gold/20 animate-pulse" />
                  <span>Access Secretariat Admin Panel</span>
                </button>
              </div>
            )}

            {/* Quick help notice */}
            <p className="text-center text-[10.5px] text-neutral-500 font-sans font-light leading-relaxed mt-1 border-t border-accent-gold/10 pt-3">
              Problems authenticating? Contact the UK Admissions Secretariat at <a href="mailto:info@ritechs.org" className="underline hover:text-accent-gold font-medium">info@ritechs.org</a> for security assistance.
            </p>

          </form>

        </motion.div>
      </div>

    </div>
  );
}
