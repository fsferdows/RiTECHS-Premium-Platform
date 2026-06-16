import { useState } from 'react';
import { 
  Calculator, GraduationCap, FileCheck, ArrowRight, BookOpen, 
  Settings, CheckCircle2, Shield, Info, FileSpreadsheet 
} from 'lucide-react';
import AcademicModificationSection from './AcademicModificationSection';
import PosterPresentationSection from './PosterPresentationSection';
import TrainingSection from './TrainingSection';
import ITSSIoEGallerySection from './ITSSIoEGallerySection';
import { FadeUpSection } from './FadeUpSection';

interface ServicesViewProps {
  onNavigate: (path: string) => void;
  isLoggedIn: boolean;
}

export default function ServicesView({ onNavigate, isLoggedIn }: ServicesViewProps) {
  // Calculator states
  const [wordCount, setWordCount] = useState(6000);
  const [academicFormat, setAcademicFormat] = useState<'IEEE' | 'Springer' | 'ACM' | 'Elsevier'>('IEEE');
  const [tierOption, setTierOption] = useState<'Standard' | 'Premium_Peer'>('Premium_Peer');
  const [includeFigures, setIncludeFigures] = useState(false);

  // Dynamic cost computations
  const baseRatePerWord = tierOption === 'Premium_Peer' ? 0.045 : 0.025;
  const rawCost = Math.round(wordCount * baseRatePerWord);
  const formattingAddon = academicFormat === 'IEEE' ? 45 : academicFormat === 'Elsevier' ? 60 : 50;
  const illustrationAddon = includeFigures ? 90 : 0;
  const finalEstimate = rawCost + formattingAddon + illustrationAddon;

  const estimatedDays = Math.max(3, Math.round(wordCount / 1800) + (tierOption === 'Premium_Peer' ? 0 : 2));

  return (
    <div id="academic-services-view" className="pt-16 animate-fade-in-up text-charcoal">
      {/* Narrative Header */}
      <section className="bg-gradient-to-b from-primary-navy to-[#0F2954] text-white py-24 px-6 text-center relative premium-noise overflow-hidden border-b border-accent-gold/20">
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden opacity-100">
          <img 
            src="/banner 1.png" 
            alt="Academic Services Backdrop" 
            referrerPolicy="no-referrer"
            onError={(e) => {
              const el = e.currentTarget;
              const bkp = "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1600";
              if (el.src !== bkp) {
                el.src = bkp;
              } else {
                el.onerror = null;
                el.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='100%25' height='100%25' fill='%23000'/%3E%3C/svg%3E";
              }
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-4">ACADEMIC CAPABILITIES</h3>
          <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight mb-8 text-white">
            Academic Services
          </h1>
          <p className="font-serif-accent text-lg sm:text-xl italic text-white/85 max-w-2xl mx-auto leading-relaxed font-light">
            Providing index-linked platforms where cyber defense, advanced IoT grids, and sustainable energy methodologies meet peer recognition.
          </p>
        </div>
      </section>

      {/* Services breakdown section */}
      <FadeUpSection className="py-20 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 border-b border-divider-gold/60">
        
        {/* Pillar 1 */}
        <div className="bg-white border border-divider-gold/50 p-8 flex flex-col justify-between h-full hover:shadow-md transition-all duration-300">
          <div>
            <GraduationCap className="w-10 h-10 text-accent-gold mb-6" />
            <span className="text-[9px] font-mono tracking-widest uppercase text-muted-gray mb-1 block">Courseware</span>
            <h3 className="font-serif-display text-xl text-primary-navy font-bold mb-4">Scholastic E-Learning</h3>
            <p className="text-xs sm:text-sm text-muted-gray leading-relaxed font-light mb-6">
              Access localized instructional catalogs mapping TinyML forecasting, post-quantum cryptography, and academic writing mechanics with clean distraction-free players.
            </p>
          </div>
          <button
            onClick={() => onNavigate('#/dashboard')}
            className="text-xs font-sans font-semibold uppercase tracking-widest text-accent-gold hover:text-primary-navy flex items-center gap-2 group transition-all"
          >
            Launch Course Catalog <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white border border-divider-gold/50 p-8 flex flex-col justify-between h-full hover:shadow-md transition-all duration-300">
          <div>
            <FileCheck className="w-10 h-10 text-accent-gold mb-6" />
            <span className="text-[9px] font-mono tracking-widest uppercase text-muted-gray mb-1 block">Proofreading</span>
            <h3 className="font-serif-display text-xl text-primary-navy font-bold mb-4">Publication Support</h3>
            <p className="text-xs sm:text-sm text-muted-gray leading-relaxed font-light mb-6">
              Our university editors conduct rigorous language polishing, references standardization, and structural flow audits strictly under international journal templates.
            </p>
          </div>
          <button
            onClick={() => onNavigate('#/dashboard')}
            className="text-xs font-sans font-semibold uppercase tracking-widest text-accent-gold hover:text-primary-navy flex items-center gap-2 group transition-all"
          >
            Track Manuscript Workspaces <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white border border-divider-gold/50 p-8 flex flex-col justify-between h-full hover:shadow-md transition-all duration-300">
          <div>
            <Settings className="w-10 h-10 text-accent-gold mb-6" />
            <span className="text-[9px] font-mono tracking-widest uppercase text-muted-gray mb-1 block">Formatting</span>
            <h3 className="font-serif-display text-xl text-primary-navy font-bold mb-4">Academic Modification</h3>
            <p className="text-xs sm:text-sm text-muted-gray leading-relaxed font-light mb-6">
              Align citation patterns, bibliography linkages, math rendering layouts, and high-DPI vector charts with specific IEEE, Springer, or Elsevier guidelines.
            </p>
          </div>
          <button
            onClick={() => onNavigate('#/dashboard')}
            className="text-xs font-sans font-semibold uppercase tracking-widest text-accent-gold hover:text-primary-navy flex items-center gap-2 group transition-all"
          >
            Go to Submissions Portal <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </FadeUpSection>

      {/* Academic Modification Service Segment */}
      <AcademicModificationSection />

      {/* Interactive Price Calculator Panel */}
      <FadeUpSection className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <Calculator className="w-10 h-10 text-accent-gold/60 mx-auto mb-4" />
            <h3 className="text-xs font-mono tracking-widest text-[#6B7280] uppercase mb-2">QUICK ESTIMATIONS</h3>
            <h2 className="font-serif-display text-3xl font-bold text-primary-navy">
              Academic Language Polishing Calculator
            </h2>
            <p className="text-xs sm:text-sm text-muted-gray font-light mt-1 max-w-lg mx-auto">
              Estimate your custom editorial costs and vetting timeline before preparing draft manuscripts.
            </p>
          </div>

          <div className="bg-neutral-warm border border-divider-gold/60 p-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative shadow-xs">
            
            {/* Input sliders */}
            <div className="flex flex-col gap-6 select-none">
              
              {/* Slider count words */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline font-mono text-[10px] text-primary-navy font-bold uppercase">
                  <span>Count Words:</span>
                  <span className="text-accent-gold text-sm">{wordCount.toLocaleString()} words</span>
                </div>
                <input 
                  type="range" 
                  min={1000} 
                  max={25000} 
                  step={500} 
                  value={wordCount}
                  onChange={(e) => setWordCount(Number(e.target.value))}
                  className="w-full accent-accent-gold cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-muted-gray font-mono">
                  <span>1,000 EXP</span>
                  <span>25,000 THESIS</span>
                </div>
              </div>

              {/* Toggle level of editing */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] text-primary-navy font-bold uppercase">Target Tier option:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTierOption('Standard')}
                    className={`p-3 text-xs tracking-wider font-mono transition-colors border ${
                      tierOption === 'Standard' 
                        ? 'bg-primary-navy text-accent-gold border-primary-navy' 
                        : 'bg-white border-divider-gold/80 hover:bg-neutral-warm text-primary-navy'
                    }`}
                  >
                    Language Only
                  </button>
                  <button
                    onClick={() => setTierOption('Premium_Peer')}
                    className={`p-3 text-xs tracking-wider font-mono transition-colors border ${
                      tierOption === 'Premium_Peer' 
                        ? 'bg-primary-navy text-accent-gold border-primary-navy' 
                        : 'bg-white border-divider-gold/80 hover:bg-neutral-warm text-primary-navy'
                    }`}
                  >
                    Premium Peer Vetting
                  </button>
                </div>
              </div>

              {/* Publisher format selection */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] text-primary-navy font-bold uppercase">Academic Format:</span>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono leading-none">
                  {(['IEEE', 'Springer', 'Elsevier', 'ACM'] as const).map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => setAcademicFormat(fmt)}
                      className={`p-2.5 border transition-colors ${
                        academicFormat === fmt 
                          ? 'bg-accent-gold/20 border-accent-gold text-primary-navy font-bold font-sans' 
                          : 'bg-white border-divider-gold/60 text-muted-gray'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Illustory elements add-on */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={includeFigures}
                  onChange={(e) => setIncludeFigures(e.target.checked)}
                  className="w-4 h-4 accent-accent-gold cursor-pointer shrink-0"
                />
                <div className="text-xs">
                  <span className="font-serif-display font-medium text-primary-navy">Figures & Vector Polish (+ $90)</span>
                  <p className="text-[10px] text-muted-gray leading-none">Align high-DPI plotting layouts with target criteria</p>
                </div>
              </label>

            </div>

            {/* Calculations display */}
            <div className="bg-primary-navy text-white p-6 border border-accent-gold/20 relative premium-noise flex flex-col justify-between h-full divide-y divide-white/10">
              
              <div className="pb-4">
                <span className="text-[9px] font-mono uppercase text-[#C9A961] tracking-widest font-bold">TOTAL ESTIMATED EXPENDITURE</span>
                <div className="font-serif-display text-4xl sm:text-5xl font-black text-white mt-1">
                  ${finalEstimate}
                </div>
                <p className="text-[9px] text-[#FAFAF7]/50 font-mono tracking-wider italic mt-1 font-light">
                  *Vat & Sovereign Processing tax included
                </p>
              </div>

              <div className="py-4 font-mono text-[11px] flex flex-col gap-2 text-[#FAFAF7]/80">
                <div className="flex justify-between">
                  <span>Editorial Option:</span>
                  <span className="text-white">{tierOption === 'Premium_Peer' ? 'Premium Peer' : 'Standard'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Format Standards:</span>
                  <span className="text-white">{academicFormat} Blueprint</span>
                </div>
                <div className="flex justify-between">
                  <span>Peer Turnover:</span>
                  <span className="text-accent-gold font-bold">{estimatedDays} Days Delivery</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate(isLoggedIn ? '#/dashboard' : '#/login?mode=login')}
                  className="w-full bg-accent-gold hover:bg-[#B3934B] text-primary-navy py-3 uppercase text-xs tracking-widest font-sans font-bold transition-all duration-300"
                >
                  Upload Draft Manuscript
                </button>
              </div>

            </div>

          </div>
        </div>
      </FadeUpSection>

      {/* Poster Presentation Service Segment */}
      <PosterPresentationSection />

      {/* Accreditated Technical Training Segment */}
      <TrainingSection />

      {/* Conference Historical Gallery Archive */}
      <ITSSIoEGallerySection />

      {/* Educational Forums & Services Section */}
      <FadeUpSection className="py-16 bg-[#FAFAF7] border-t border-[#E5E5E0] premium-noise">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-xs font-mono tracking-widest text-[#6B7280] uppercase mb-2">SCHOLARLY ATMOSPHERE</h3>
            <h2 className="font-serif-display text-3xl sm:text-4.5xl text-primary-navy font-bold">Research Forums & Facilities</h2>
            <p className="text-xs text-muted-gray max-w-lg mx-auto leading-relaxed mt-2 font-light">
              We offer comprehensive publication support alongside peer seminars, intense boot camps, and brainstorming lounges designed to nurture scientific breakthrough.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Publication Support Card */}
            <div className="bg-white border border-divider-gold/30 p-8 rounded-sm hover:border-accent-gold transition-colors duration-300">
              <span className="font-mono text-[10px] text-accent-gold font-bold">01 // INTERNATIONAL JOURNAL PREP</span>
              <h3 className="font-serif-display text-xl text-primary-navy font-bold mt-2 mb-4">Publication Support & Areas</h3>
              <p className="text-xs text-muted-gray leading-relaxed font-light mb-6">
                Our support channels streamline manuscripts targeting top-tier index publications. We cover cutting-edge areas including: Cybersecurity, Machine Learning, Computational Intelligence, Smart Grids, Decentralized Microgrid Load Balancing, Battery Life Cycle Diagnostics, Edge Neural Grids, Piezo-Electric Harvesting, and Satellite Edge-IoT Backhauls.
              </p>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-primary-navy/80">
                <div className="bg-neutral-warm/40 p-2 border border-divider-gold/15">✓ Pre-peer review grammar check</div>
                <div className="bg-neutral-warm/40 p-2 border border-divider-gold/15">✓ Editorial structural remodeling</div>
                <div className="bg-neutral-warm/40 p-2 border border-divider-gold/15">✓ LaTeX templates conversion</div>
                <div className="bg-neutral-warm/40 p-2 border border-divider-gold/15">✓ Springer LNCS / IEEE metadata</div>
              </div>
            </div>

            {/* Seminar Forums Card */}
            <div className="bg-white border border-divider-gold/30 p-8 rounded-sm hover:border-accent-gold transition-colors duration-300 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-accent-gold font-bold">02 // ACADEMIC DIALOGUES</span>
                <h3 className="font-serif-display text-xl text-primary-navy font-bold mt-2 mb-4">Educational Seminars</h3>
                <p className="text-xs text-[#52525B] leading-relaxed font-light mb-4">
                  Participate in monthly online research dialogues, where keynote speakers showcase breakthroughs live, and young researchers practice defend strategies.
                </p>
                <p className="text-xs text-[#52525B] leading-relaxed font-light">
                  We host regular hybrid meetings and physical seminars on-site at our partner institutions, including the University of Genoa lecture rooms in Italy, and Science Park halls in Wolverhampton, UK.
                </p>
              </div>
              <div className="mt-6 border-t border-divider-gold/20 pt-4 flex justify-between items-center text-[10px] font-mono text-accent-gold uppercase tracking-wider font-semibold">
                <span>Monthly dialogues schedule</span>
                <span className="text-primary-navy">2 Seminars/Month</span>
              </div>
            </div>

            {/* Boot Camp Card */}
            <div className="bg-white border border-divider-gold/30 p-8 rounded-sm hover:border-accent-gold transition-colors duration-300 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-accent-gold font-bold">03 // DRAFT POLISHING HACKATHONS</span>
                <h3 className="font-serif-display text-xl text-primary-navy font-bold mt-2 mb-4">Scholarly Boot Camps</h3>
                <p className="text-xs text-muted-gray leading-relaxed font-light">
                  Our immersive boot camps are high-pressure, structural workshops designed to polish drafts from raw text to peer-ready submissions. Participants work side-by-side with senior co-chairs through intensive peer review cycles, culminating in draft recommendations and fast-track submission channels.
                </p>
              </div>
              <div className="mt-6 bg-accent-gold/10 border border-accent-gold/20 p-3 text-[10px] font-mono text-[#B3934B] flex justify-between">
                <span>Fast-track submissions</span>
                <span className="font-bold">Next Camp: Sept 2026</span>
              </div>
            </div>

            {/* Research Adda Lounge Card */}
            <div className="bg-white border border-divider-gold/30 p-8 rounded-sm hover:border-accent-gold transition-colors duration-300 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-accent-gold font-bold">04 // INTERACTIVE DISCOVERY LOUNGES</span>
                <h3 className="font-serif-display text-xl text-primary-navy font-bold mt-2 mb-4">Research Adda</h3>
                <p className="text-xs text-muted-gray leading-relaxed font-light">
                  Derived from classical colloquial meetups, the "Research Adda" provides informal, collaborative brainstorming lounges. It offers a relaxed workspace where academics can debate challenging hypotheses, share raw computational scripts, and spark multi-disciplinary energy solutions over zero-formal coffee boards.
                </p>
              </div>
              <div className="mt-6 border-t border-divider-gold/20 pt-4 flex justify-between items-center text-[10px] font-mono text-muted-gray">
                <span>Featured Lounges:</span>
                <span className="text-accent-gold font-bold uppercase tracking-wider font-sans">Research Adda Cyber4me</span>
              </div>
            </div>
          </div>

          {/* Introduce Cyber4Me Initiative */}
          <div className="bg-primary-navy border border-accent-gold/20 text-white p-10 relative overflow-hidden premium-noise shadow-xl">
            {/* Grid overlay */}
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[linear-gradient(to_right,#C9A96103_1px,transparent_1px),linear-gradient(to_bottom,#C9A96103_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-35" />
            
            <div className="relative z-10 max-w-4xl mx-auto text-center mb-12">
              <span className="text-[9px] font-mono tracking-widest text-accent-gold uppercase font-bold bg-accent-gold/15 px-3 py-1 border border-accent-gold/25 rounded-full inline-block">
                STUDENT-LED SECURITY CHAMPIONSHIP
              </span>
              <h3 className="font-serif-display text-3xl sm:text-4.5xl font-extrabold mt-3 mb-4">
                Introducing 'Cyber4Me'
              </h3>
              <p className="text-white/80 text-xs sm:text-sm font-light max-w-2xl mx-auto leading-relaxed">
                Cyber4Me is our flagship cybersecurity awareness and peer publication initiative. Tailored specifically to expand localized student competencies, it provides an official launchpad for young delegates to secure nodes, scan communities, and fast-track defense papers safely.
              </p>
            </div>

            {/* Crucial 4 Activities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {[
                { step: "01", name: "Peer Security Auditing", body: "Hands-on vulnerability parsing and cryptographic strength evaluations on telemetry datasets." },
                { step: "02", name: "Community Cyber Clinics", body: "Free, student-led network hygiene scanning and zero-trust clinics for local non-profit groups." },
                { step: "03", name: "Fast-Track Publications", body: "Direct, vetted pre-review support to fast-track research drafts for submission to emerging cybersecurity symposia." },
                { step: "04", name: "Hardware Lab Access", body: "Experimentation with physics-informed isolated micro-controllers and hardware-assisted cryptographic rigs." }
              ].map((act, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-xs hover:border-accent-gold/60 transition-colors duration-300">
                  <div className="font-mono text-accent-gold text-xs font-bold mb-2">ACTIVITY_{act.step}</div>
                  <h4 className="font-serif-display text-base font-bold text-white mb-2 leading-tight">{act.name}</h4>
                  <p className="text-[11px] text-[#A1A1AA] leading-relaxed font-light">{act.body}</p>
                </div>
              ))}
            </div>

            {/* Elegant Sponsors Bar */}
            <div className="mt-16 border-t border-white/10 pt-10 text-center relative z-10">
              <p className="text-[9px] font-mono uppercase tracking-widest text-white/40 mb-4">Cyber4Me Vetted Sponsors & Associations</p>
              <div className="flex flex-wrap gap-8 items-center justify-center text-xs text-white/50 font-serif-display tracking-widest uppercase">
                <span className="hover:text-accent-gold transition-colors font-medium">IEEE Sovereign Security & Privacy</span>
                <span className="text-white/20">·</span>
                <span className="hover:text-accent-gold italic transition-colors font-medium">Springer Nature</span>
                <span className="text-white/20">·</span>
                <span className="hover:text-accent-gold transition-colors font-medium">Wolverhampton Corp</span>
                <span className="text-white/20">·</span>
                <span className="hover:text-accent-gold italic transition-colors font-medium">ACM Europe</span>
              </div>
            </div>
          </div>
        </div>
      </FadeUpSection>

      {/* Trust guarantees badge */}
      <FadeUpSection className="py-16 bg-[#FAFAF7] premium-noise border-t border-divider-gold/60 text-center select-none">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <Shield className="w-8 h-8 text-accent-gold/80" />
            <h4 className="font-serif-display text-base text-primary-navy font-bold leading-normal">English NDA Bond</h4>
            <p className="text-xs text-muted-gray font-light max-w-[240px]">All manuscript uploads rest inside protected, expiring containers.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-accent-gold/80" />
            <h4 className="font-serif-display text-base text-primary-navy font-bold leading-normal">Accuracy Guarantee</h4>
            <p className="text-xs text-muted-gray font-light max-w-[240px]">Free revisions if target reviewers highlight formatting failures.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FileSpreadsheet className="w-8 h-8 text-accent-gold/80" />
            <h4 className="font-serif-display text-base text-primary-navy font-bold leading-normal">Plagiarism Auditing</h4>
            <p className="text-xs text-muted-gray font-light max-w-[240px]">Complimentary originality matrix certificate with premium tier.</p>
          </div>
        </div>
      </FadeUpSection>
    </div>
  );
}
