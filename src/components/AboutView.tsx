import { useState } from 'react';
import { Award, ShieldCheck, Heart, MapPin, Globe, Compass, Users } from 'lucide-react';
import { FadeUpSection } from './FadeUpSection';

export default function AboutView() {
  const [activeTimeline, setActiveTimeline] = useState(2);

  const team = [
    {
      name: "Dr. Alistair J. Evans",
      role: "Board Director & Scientific Chair",
      affiliation: "Formerly University of Wolverhampton",
      specialty: "Sovereign Cybersecurity & Public Key Frameworks",
      bio: "Dr. Evans has over 20 years supervising doctoral projects in cryptographic assurance, helping establish RiTECHS to elevate low-resource academic representation."
    },
    {
      name: "Prof. Maria Santos",
      role: "Co-Director of Mentorship Matches",
      affiliation: "University of Wolverhampton",
      specialty: "Machine Learning & Kubernetes Auditing",
      bio: "Maria works on connecting international research partners, advocating for gender balance and technology democratization inside the ACM/IEEE sphere."
    },
    {
      name: "Dr. Aisha Okafor",
      role: "African Research Coordinator",
      affiliation: "University of Lagos",
      specialty: "Sustainable Energy & 6G Scheduling",
      bio: "Prof. Okafor structures West African academic meetups, supervising hybrid telecommunication workshops to expand localized spectrum access."
    }
  ];

  const timelineSteps = [
    {
      year: "2018",
      title: "The Wolverhampton Core",
      desc: "Four academic researchers launch an editorial advisory circle to assist international postgraduate applicants with thesis polishing."
    },
    {
      year: "2021",
      title: "Inaugural Cyber Summit",
      desc: "Organized the first peer cyber exchange in Rome (ICETCS), bringing together 90+ papers with digital IEEE library linking."
    },
    {
      year: "2024",
      title: "Global Mentorship Matchmaker",
      desc: "Launched our cloud matchmaking engine, matching over 800 PhD students with Q1 journal peer advisors across Americas, EU, and Africa."
    },
    {
      year: "2026",
      title: "Integrated Premium Platform",
      desc: "A single sovereign portal providing automated proofreading trackers, distraction-free e-Learning modules, and three dynamic hybrid conferences."
    }
  ];

  const globalNodes = [
    { city: "Wolverhampton", country: "United Kingdom", role: "Headquarters & Governance", coords: "top-1/4 left-[46%]" },
    { city: "Rome", country: "Italy", role: "ICETCS Cybersecurity Forum", coords: "top-[38%] left-[50%]" },
    { city: "Lagos", country: "Nigeria", role: "ITSS-IoE Smart Cities Hub", coords: "top-[64%] left-[47%]" },
    { city: "Birmingham", country: "United Kingdom", role: "AIoT-RSE Clean Energy Centre", coords: "top-[26%] left-[43%]" },
    { city: "São Paulo", country: "Brazil", role: "UNICAMP Analytics Node", coords: "top-[78%] left-[30%]" }
  ];

  return (
    <div id="about-view" className="pt-16 animate-fade-in-up text-charcoal">
      {/* Editorial Header */}
      <section className="bg-gradient-to-b from-primary-navy to-[#0F2954] text-white py-24 px-6 text-center relative premium-noise overflow-hidden border-b border-accent-gold/20">
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden opacity-55">
          <img 
            src="/banner 1.0.png" 
            alt="Scholastic Heritage Backdrop" 
            referrerPolicy="no-referrer"
            onError={(e) => {
              const el = e.currentTarget;
              const bkp = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600";
              if (el.src !== bkp) {
                el.src = bkp;
              } else {
                el.onerror = null;
                el.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='100%25' height='100%25' fill='%23000'/%3E%3C/svg%3E";
              }
            }}
            className="w-full h-full object-cover filter brightness-[55%] contrast-[110%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/40 via-primary-navy/70 to-[#0F2954] mix-blend-multiply" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-4">Scholastic Heritage</h3>
          <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight mb-8 text-white">
            RiTECHS Governance
          </h1>
          <p className="font-serif-accent text-xl sm:text-2xl italic text-white/85 max-w-2xl mx-auto leading-relaxed font-light">
            "Fostering continuous research capability, language precision, and global publication strategy."
          </p>
        </div>
      </section>

      {/* Mission & Vision Split Section */}
      <FadeUpSection className="py-20 bg-[#FBFBFA] border-b border-divider-gold/40">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission Card */}
          <div className="bg-white border border-divider-gold/40 p-10 rounded-sm shadow-xs relative overflow-hidden group hover:border-accent-gold transition-colors duration-500">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent-gold" />
            <h3 className="font-mono text-xs text-accent-gold uppercase tracking-widest mb-4 font-bold">Our Mission</h3>
            <h4 className="font-serif-display text-2.5xl font-bold text-primary-navy mb-4 leading-snug">
              To Encourage Global Innovation & Scientific Progress
            </h4>
            <p className="text-sm font-light text-muted-gray leading-relaxed font-sans">
              RiTECHS's mission is to foster an elite global ecosystem where academic precision, deep technological innovation, and world-class scholarly peer review empower researchers to publish high-impact work. We seek to elevate low-represented scholars globally to expand modern scientific reach, ensuring every voice can contribute to world-changing discovery.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white border border-divider-gold/40 p-10 rounded-sm shadow-xs relative overflow-hidden group hover:border-accent-gold transition-colors duration-500">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent-gold" />
            <h3 className="font-mono text-xs text-accent-gold uppercase tracking-widest mb-4 font-bold">Our Vision</h3>
            <h4 className="font-serif-display text-2.5xl font-bold text-primary-navy mb-4 leading-snug">
              Definitive Global Baseline for Peer Vetting
            </h4>
            <p className="text-sm font-light text-muted-gray leading-relaxed font-sans">
              To be the definitive global baseline connecting ambitious academics with credentialed senior editors, accelerating post-quantum technologies, cybersecurity frameworks, and renewable energy solutions. We strive to inspire and engage communities while laying down rigorous foundations for sustainable, decrowded intellectual networks.
            </p>
          </div>
        </div>
      </FadeUpSection>

      {/* Core Values Section */}
      <FadeUpSection className="py-16 max-w-6xl mx-auto px-6 border-b border-divider-gold/60">
        <div className="text-center mb-16">
          <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-3">Foundational Pillars</h3>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-primary-navy font-bold">Core Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Integrity */}
          <div className="flex flex-col gap-4 border border-divider-gold/20 p-6 bg-white hover:shadow-md transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-accent-gold/10 border border-accent-gold flex items-center justify-center text-accent-gold font-mono text-xs font-bold">
              01
            </div>
            <h3 className="font-serif-display text-lg text-primary-navy font-bold">Integrity</h3>
            <p className="text-xs text-muted-gray leading-relaxed font-light">
              We deliver transparent, meticulous, and strictly objective peer-reviews of absolute metric density and academic honesty.
            </p>
          </div>

          {/* Research Advocacy */}
          <div className="flex flex-col gap-4 border border-divider-gold/20 p-6 bg-white hover:shadow-md transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-accent-gold/10 border border-accent-gold flex items-center justify-center text-accent-gold font-mono text-xs font-bold">
              02
            </div>
            <h3 className="font-serif-display text-lg text-primary-navy font-bold">Research Advocacy</h3>
            <p className="text-xs text-muted-gray leading-relaxed font-light">
              We actively work to elevate underrepresented scholars to publish and index in leading Q1 journals globally.
            </p>
          </div>

          {/* Service to Society */}
          <div className="flex flex-col gap-4 border border-divider-gold/20 p-6 bg-white hover:shadow-md transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-accent-gold/10 border border-accent-gold flex items-center justify-center text-accent-gold font-mono text-xs font-bold">
              03
            </div>
            <h3 className="font-serif-display text-lg text-primary-navy font-bold">Service to Society</h3>
            <p className="text-xs text-muted-gray leading-relaxed font-light">
              We commit to translating theoretical models and academic research directly into functional, real-world industrial products.
            </p>
          </div>

          {/* Dependability */}
          <div className="flex flex-col gap-4 border border-divider-gold/20 p-6 bg-white hover:shadow-md transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-accent-gold/10 border border-accent-gold flex items-center justify-center text-accent-gold font-mono text-xs font-bold">
              04
            </div>
            <h3 className="font-serif-display text-lg text-primary-navy font-bold">Dependability</h3>
            <p className="text-xs text-muted-gray leading-relaxed font-light">
              We strictly protect manuscript IP under standard English legal NDAs, serving as a fortress for intellectual assets.
            </p>
          </div>
        </div>
      </FadeUpSection>
      <FadeUpSection className="py-16 bg-neutral-warm/20 border-b border-divider-gold/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-xs font-mono tracking-widest text-[#6B7280] uppercase mb-2">Our Horizon</h3>
            <h2 className="font-serif-display text-3xl font-bold text-primary-navy">Future Goals</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "Encourage Global Innovation", desc: "Build state-wide alliances to seed emerging cryptographic centers." },
              { title: "Increase Public Awareness", desc: "Translate dense scholarly results into accessible civil summaries." },
              { title: "Promote Lifelong Learning", desc: "Sustain post-doc alumni associations with persistent mentorship." },
              { title: "Facilitate Career Advancement", desc: "Map academic credentials directly to top-tier international labs." },
              { title: "Inspire & Engage Communities", desc: "Fund hybrid regional workshops, seminars, and hands-on boot camps." }
            ].map((goal, idx) => (
              <div key={idx} className="bg-white border border-divider-gold/30 p-6 flex flex-col justify-between hover:border-accent-gold transition-colors duration-300">
                <span className="font-mono text-xs text-accent-gold font-bold">GOAL_0{idx + 1}</span>
                <div className="mt-4">
                  <h4 className="font-serif-display text-sm font-bold text-primary-navy mb-2 leading-tight">
                    {goal.title}
                  </h4>
                  <p className="text-[11px] text-muted-gray leading-normal font-light">
                    {goal.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeUpSection>

      {/* Interactive Chronicles Timeline */}
      <FadeUpSection className="py-16 bg-[#FAFAF7] border-b border-divider-gold/60 premium-noise">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-3">Chronicles</h3>
            <h2 className="font-serif-display text-3xl sm:text-4.5xl text-primary-navy font-bold">Our Milestones</h2>
          </div>

          <div className="relative">
            {/* The line */}
            <div className="absolute top-[37px] left-8 right-8 h-0.5 bg-divider-gold md:block hidden" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {timelineSteps.map((step, idx) => (
                <div 
                  key={step.year} 
                  className={`cursor-pointer transition-all duration-300 flex flex-col items-center text-center p-4 border md:border-0 relative ${
                    activeTimeline === idx 
                      ? 'bg-white md:bg-transparent md:translate-y-[-4px] border-accent-gold/30 shadow-xs' 
                      : 'bg-transparent border-transparent'
                  }`}
                  onClick={() => setActiveTimeline(idx)}
                >
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-mono text-xs font-bold transition-all duration-500 mb-4 z-10 ${
                    activeTimeline === idx 
                      ? 'bg-accent-gold border-accent-gold text-primary-navy scale-110 shadow-md' 
                      : 'bg-white border-divider-gold text-muted-gray'
                  }`}>
                    {step.year}
                  </div>
                  <h4 className="font-serif-display text-base font-bold text-primary-navy mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-muted-gray font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeUpSection>

      {/* Global Network Map Card */}
      <FadeUpSection id="network-map" className="py-16 bg-white border-b border-divider-gold/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-3">The Academic Sphere</h3>
            <h2 className="font-serif-display text-3xl sm:text-4.5xl text-primary-navy font-bold">Global Research Nodes</h2>
          </div>

          <div className="bg-primary-navy rounded-xs border border-accent-gold/20 p-8 text-white relative overflow-hidden premium-noise shadow-xl min-h-[460px] flex flex-col md:flex-row gap-12 items-center">
            {/* Virtual Map Backplane (using high-end styled grid nodes representing Earth sphere) */}
            <div className="relative w-full md:w-3/5 h-[320px] bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#C9A96115_2px,transparent_2px)] [background-size:20px_20px]" />
              
              {/* Connection Vectors */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <line x1="46%" y1="25%" x2="50%" y2="38%" stroke="#C9A961" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="46%" y1="25%" x2="47%" y2="64%" stroke="#C9A961" strokeWidth="1.5" strokeDasharray="4 3" />
                <line x1="43%" y1="26%" x2="30%" y2="78%" stroke="#C9A961" strokeWidth="1.5" strokeDasharray="4 2" />
                <line x1="50%" y1="38%" x2="47%" y2="64%" stroke="#C9A961" strokeWidth="1.5" strokeDasharray="2 2" />
              </svg>

              {globalNodes.map((node, i) => (
                <div 
                  key={i} 
                  className={`absolute ${node.coords} group/node flex flex-col items-center`}
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-accent-gold border border-white animate-ping absolute opacity-50" />
                  <div className="w-3.5 h-3.5 rounded-full bg-accent-gold border border-white relative z-10 transition-transform duration-300 group-hover/node:scale-125" />
                  <span className="absolute top-4 bg-primary-navy/90 backdrop-blur-xs border border-accent-gold/30 px-2 py-0.5 rounded-xs text-[9px] font-mono whitespace-nowrap text-white group-hover/node:bg-accent-gold group-hover/node:text-primary-navy transition-colors">
                    {node.city}
                  </span>
                </div>
              ))}
            </div>

            <div className="w-full md:w-2/5 flex flex-col gap-6">
              <h3 className="font-serif-display text-2xl font-semibold text-accent-gold select-none leading-tight">
                Empowering Interconnected Scholarly Hubs
              </h3>
              <p className="text-white/70 text-xs font-light leading-relaxed">
                RiTECHS transcends geographic barriers. Our hybrid model syncs key platforms across Europe, Africa, and Latin America so that peer critique occurs in real-time.
              </p>

              <div className="flex flex-col gap-3 font-mono text-[11px] text-white/80 border-t border-white/10 pt-4">
                {globalNodes.map((node, i) => (
                  <div key={i} className="flex justify-between hover:text-accent-gold transition-colors">
                    <span className="text-white/40">{node.city}, {node.country}:</span>
                    <span>{node.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeUpSection>

      {/* Governance Board section */}
      <FadeUpSection className="py-16 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-3">Founders & Scholars</h3>
          <h2 className="font-serif-display text-3xl sm:text-4.5xl text-primary-navy font-bold">Scientific Board</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div key={i} className="bg-neutral-warm border border-divider-gold/50 p-8 flex flex-col h-full group">
              <span className="text-[10px] font-mono tracking-widest text-accent-gold/80 font-bold uppercase mb-2">
                {member.role}
              </span>
              <h3 className="font-serif-display text-xl text-primary-navy font-bold mb-1">
                {member.name}
              </h3>
              <p className="text-xs text-muted-gray uppercase tracking-wider font-semibold mb-4 leading-none">
                {member.affiliation}
              </p>
              
              <div className="h-px bg-divider-gold/60 w-12 mb-4 group-hover:w-full transition-all duration-500" />
              
              <p className="text-xs text-primary-navy/85 font-mono mb-4 italic">
                Focus: {member.specialty}
              </p>
              
              <p className="text-xs text-muted-gray leading-relaxed font-light font-sans">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </FadeUpSection>
    </div>
  );
}
