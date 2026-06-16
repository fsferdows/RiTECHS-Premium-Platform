import { useState } from 'react';
import { Layout, Check, ShieldAlert, FileCode, Printer, FileText, Phone, Mail, Award, Columns } from 'lucide-react';

export default function PosterPresentationSection() {
  const [selectedTopic, setSelectedTopic] = useState<'tools' | 'sections' | 'design'>('tools');

  // Strategic column map visualization state
  const mockSections = [
    { title: "Summary", col: 1, text: "High-level digest of research findings" },
    { title: "Introduction", col: 1, text: "Context, problem statement & relevance" },
    { title: "Objectives", col: 2, text: "Specific aims & study boundaries" },
    { title: "Theory/Method", col: 2, text: "Mathematical models or workflows" },
    { title: "Results/Charts", col: 3, text: "Clean plots & statistical telemetry" },
    { title: "Conclusion", col: 3, text: "Conclusive impact & future steps" }
  ];

  return (
    <section id="poster-presentation" className="py-16 bg-maroon-dark text-white border-b border-accent-gold/15 premium-noise">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16 text-left md:text-center">
          <span className="text-[10px] font-mono tracking-widest text-accent-gold uppercase font-bold">
            ACADEMIC GRAPHICS & VISUALS
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4.5xl text-white font-bold mt-2">
            Poster Presentation Support
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed mt-3 font-light">
            Academic Posters presentations are excellent ways to showcase the research you have produced in a class in front of an audience. When done correctly, posters will effectively communicate your ideas using compelling scientific visuals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Tips & Core Guidance */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-primary-maroon border border-accent-gold/25 p-8 rounded-xs shadow-xl text-white text-left">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Columns className="w-5 h-5 text-accent-gold" />
                <h3 className="font-serif-display text-xl text-white font-bold">How to Manage the Poster</h3>
              </div>

              {/* Topic Toggles */}
              <div className="grid grid-cols-3 gap-2 mb-8 text-[11px] font-mono tracking-wider font-semibold">
                <button
                  onClick={() => setSelectedTopic('tools')}
                  className={`p-3 border transition-all text-center rounded-xs cursor-pointer ${
                    selectedTopic === 'tools'
                      ? 'bg-accent-gold border-accent-gold text-primary-maroon font-bold'
                      : 'bg-maroon-dark/60 border-accent-gold/20 text-neutral-300 hover:text-white'
                  }`}
                >
                  01. CHOOSE TOOLS
                </button>
                <button
                  onClick={() => setSelectedTopic('sections')}
                  className={`p-3 border transition-all text-center rounded-xs cursor-pointer ${
                    selectedTopic === 'sections'
                      ? 'bg-accent-gold border-accent-gold text-primary-maroon font-bold'
                      : 'bg-maroon-dark/60 border-accent-gold/20 text-neutral-300 hover:text-white'
                  }`}
                >
                  02. ORGANIZE SECTIONS
                </button>
                <button
                  onClick={() => setSelectedTopic('design')}
                  className={`p-3 border transition-all text-center rounded-xs cursor-pointer ${
                    selectedTopic === 'design'
                      ? 'bg-accent-gold border-accent-gold text-primary-maroon font-bold'
                      : 'bg-maroon-dark/60 border-accent-gold/20 text-neutral-300 hover:text-white'
                  }`}
                >
                  03. SIMPLIFY DESIGN
                </button>
              </div>

              {/* Dynamic explanations */}
              <div className="min-h-[160px] flex flex-col justify-center text-left">
                {selectedTopic === 'tools' && (
                  <div className="animate-fade-in flex flex-col gap-3">
                    <span className="font-mono text-[9px] text-accent-gold font-bold">RECOMMENDED SOFTWARE PLATFORMS</span>
                    <h4 className="font-serif-display text-lg text-white font-bold">Choosing the Right Instrument</h4>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                      Out of the various computer programs which can be used to create a poster, <strong>Photoshop</strong>, <strong>Microsoft Publisher</strong> and <strong>PowerPoint</strong> are most commonly used by students and researchers. As a poster needs a lot of editing, it is essential to choose the right tool to work with. Each of these media has their own strengths and weaknesses in terms of technical capabilities.
                    </p>
                  </div>
                )}

                {selectedTopic === 'sections' && (
                  <div className="animate-fade-in flex flex-col gap-3">
                    <span className="font-mono text-[9px] text-accent-gold font-bold">STRUCTURAL GRID DIVISIONS</span>
                    <h4 className="font-serif-display text-lg text-white font-bold">Strategic Sequential Flow</h4>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                      Before starting a poster, it is recommended to break down all the research information you want to present into different sections such as <strong>Summary, Introduction, Objectives, Theory, Results, and Conclusion</strong>, depending on the specifics of your research. 
                    </p>
                    <p className="text-xs sm:text-sm text-white bg-maroon-dark/60 p-2 border-l-2 border-accent-gold font-serif-accent italic">
                      Generally, an ideal poster will have four to eight such sections arranged in three or four columns. As posters are read from left to right and top to bottom, it is essential to lay out all the sections strategically so they can be read in order.
                    </p>
                  </div>
                )}

                {selectedTopic === 'design' && (
                  <div className="animate-fade-in flex flex-col gap-3 text-left">
                    <span className="font-mono text-[9px] text-accent-gold font-bold">VISUAL LEGIBILITY & SYMMETRY</span>
                    <h4 className="font-serif-display text-lg text-white font-bold">Uncluttered Aesthetic Format</h4>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                      Use a simple format for your poster which is easily readable. The background should be pure white or with a subtle gradient/pattern which does not distract the audience. Although universities recommend the ideal font size and style, the text used in your poster must be clear and easily readable. 
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                      While making use of charts or graphics, care should be taken that they are easy to understand and free from unnecessary elements. The charts and graphs must be distributed evenly and kept equally sized.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Strategic Layout Map visualization widget */}
            <div className="border-t border-accent-gold/20 pt-6 mt-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent-gold font-bold block mb-3">
                Strategic Layout Pattern (Flow Sequence: Left to Right, Top to Bottom)
              </span>
              <div className="grid grid-cols-3 gap-2 bg-maroon-dark/50 p-3 border border-accent-gold/20 rounded-xs">
                <div className="flex flex-col gap-2">
                  <div className="text-[8px] font-mono text-neutral-400 uppercase text-center border-b border-accent-gold/10 pb-1 font-bold">Col 1</div>
                  <div className="bg-primary-maroon border border-accent-gold/25 p-2 text-center rounded-xs shadow-md hover:border-accent-gold transition-colors">
                    <div className="font-serif-display text-xs font-bold text-accent-gold leading-none">1. Summary</div>
                  </div>
                  <div className="bg-primary-maroon border border-accent-gold/25 p-2 text-center rounded-xs shadow-md hover:border-accent-gold transition-colors">
                    <div className="font-serif-display text-xs font-bold text-accent-gold leading-none">2. Introduction</div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="text-[8px] font-mono text-neutral-400 uppercase text-center border-b border-accent-gold/10 pb-1 font-bold">Col 2</div>
                  <div className="bg-primary-maroon border border-accent-gold/25 p-2 text-center rounded-xs shadow-md hover:border-accent-gold transition-colors">
                    <div className="font-serif-display text-xs font-bold text-accent-gold leading-none">3. Objectives</div>
                  </div>
                  <div className="bg-primary-maroon border border-accent-gold/25 p-2 text-center rounded-xs shadow-md hover:border-accent-gold transition-colors">
                    <div className="font-serif-display text-xs font-bold text-accent-gold leading-none">4. Theory/Methods</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[8px] font-mono text-neutral-400 uppercase text-center border-b border-accent-gold/10 pb-1 font-bold">Col 3</div>
                  <div className="bg-primary-maroon border border-accent-gold/25 p-2 text-center rounded-xs shadow-md hover:border-accent-gold transition-colors">
                    <div className="font-serif-display text-xs font-bold text-accent-gold leading-none">5. Results/Charts</div>
                  </div>
                  <div className="bg-primary-maroon border border-accent-gold/25 p-2 text-center rounded-xs shadow-md hover:border-accent-gold transition-colors">
                    <div className="font-serif-display text-xs font-bold text-accent-gold leading-none">6. Conclusion</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: "What you get" package & Contacts */}
          <div className="lg:col-span-5 bg-primary-maroon text-white border border-accent-gold/25 p-8 rounded-xs shrink-0 flex flex-col justify-between relative shadow-xl text-left">
            
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[linear-gradient(to_right,#C9A96102_1px,transparent_1px),linear-gradient(to_bottom,#C9A96102_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[9px] font-mono uppercase tracking-widest text-accent-gold font-bold">
                CORE DELIVERABLES
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-white mt-1 mb-6">
                What you get
              </h3>

              <div className="flex flex-col gap-4">
                {[
                  { title: "No Plagiarism", desc: "Rigorous originality checks on content." },
                  { title: "Editable Facilities", desc: "Get raw Photoshop, PowerPoint, or Publisher source files." },
                  { title: "Presentation Speech Notes Included", desc: "Full companion script for the presentation speech." },
                  { title: "Quality Report", desc: "Meticulous verification certificate by PhD editors." }
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 hover:bg-white/5 p-2 rounded-xs transition-colors">
                    <div className="w-5 h-5 rounded-full border border-accent-gold/40 flex items-center justify-center text-accent-gold shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-serif-display text-sm font-bold text-white leading-snug">{item.title}</h4>
                      <p className="text-[11px] text-white/60 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Panel Card */}
            <div className="mt-8 pt-6 border-t border-white/10 relative z-10 bg-white/5 p-4 rounded-xs border border-white/5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#C9A961] block mb-1">
                FOR POSTER PRESENTATIONS
              </span>
              <h4 className="font-serif-display text-sm font-bold text-white">Find Out More</h4>
              <p className="text-[11px] text-white/50 leading-relaxed font-light mt-1">
                Let us construct your next poster layout. Speak to Nadia Refat immediately:
              </p>

              <div className="mt-4 flex flex-col gap-1.5 text-xs font-mono">
                <a href="tel:+4401234678910" className="flex items-center gap-2 text-white/80 hover:text-accent-gold transition-colors">
                  <Phone className="w-3.5 h-3.5 text-accent-gold" />
                  <span>+44 (0) 1234 678910</span>
                </a>
                <a href="mailto:nadia.refat@gmail.com" className="flex items-center gap-2 text-white/80 hover:text-accent-gold transition-colors">
                  <Mail className="w-3.5 h-3.5 text-accent-gold" />
                  <span>nadia.refat@gmail.com</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
