import { useState } from 'react';
import { FileText, Eye, Grid, Phone, Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function AcademicModificationSection() {
  const [activeTab, setActiveTab] = useState<'editing' | 'proofreading' | 'formatting'>('editing');

  const contacts = {
    editing: {
      name: "Nadia Refat",
      phone: "+44 (0) 1234 678910",
      email: "nadia.refat@gmail.com"
    },
    proofreading: {
      name: "Nadia Refat",
      phone: "+44 (0) 1234 678910",
      email: "nadia.refat@gmail.com"
    },
    formatting: {
      name: "Nazmus Sadat",
      phone: "+44 (0) 1234 678910",
      email: "nazmus.sadat@gmail.com"
    }
  };

  return (
    <section id="academic-modification" className="py-20 bg-maroon-dark text-white border-b border-accent-gold/15">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Editorial Message */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-[10px] font-mono tracking-widest text-accent-gold uppercase font-bold bg-accent-gold/10 px-3 py-1 border border-accent-gold/20 rounded-full inline-block self-start">
              RI-TECHS EDITORIAL EXCELLENCE
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4.5xl text-white font-bold leading-tight">
              Academic Modification Service
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              Clear, concise, and flawless writing is essential in all aspects of life, whether you are a student, professional, or creative writer. Editing your own work can be challenging, as errors can diminish the effectiveness of your message. 
            </p>
            <p className="text-xs sm:text-sm text-accent-gold leading-relaxed font-medium">
              Our experts at RiTECHS Academic Modification Service are here to correct any mistakes in your text and ensure that your writing flows coherently and effortlessly.
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-accent-gold/15 pt-6 mt-2">
              <div>
                <div className="font-serif-display text-xl font-bold text-accent-gold">100%</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Academic Rigor</div>
              </div>
              <div>
                <div className="font-serif-display text-xl font-bold text-accent-gold">NDA</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">IP protection</div>
              </div>
              <div>
                <div className="font-serif-display text-xl font-bold text-accent-gold">Q1</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Journal-Ready</div>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Tabs & Content */}
          <div className="lg:col-span-7 bg-primary-maroon border border-accent-gold/25 p-8 rounded-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-gold/5 flex items-center justify-center font-mono text-[9px] font-bold text-accent-gold uppercase tracking-wider">
              Services
            </div>

            {/* Tab Swappers */}
            <div className="flex border-b border-accent-gold/20 mb-8 overflow-x-auto gap-2">
              {[
                { id: 'editing', label: 'EDITING', icon: FileText },
                { id: 'proofreading', label: 'PROOFREADING', icon: Eye },
                { id: 'formatting', label: 'FORMATTING', icon: Grid }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-3.5 px-4 text-xs font-mono uppercase tracking-widest flex items-center gap-2 border-b-2 transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'border-accent-gold text-accent-gold font-bold bg-white/5'
                        : 'border-transparent text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Panes */}
            <div>
              {activeTab === 'editing' && (
                <div className="animate-fade-in flex flex-col gap-6 text-left">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif-display text-xl text-white font-bold">Academic Editing Service</h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                      The editing service will confirm that your writing has the optimal conclusive impact on your audience. In addition to proofreading your document for errors and inconsistencies, we elevate the narrative structure, balance syntax rhythms, tighten focus, and align argument development.
                    </p>
                  </div>

                  <div className="bg-maroon-dark/65 p-4 border border-accent-gold/15 rounded-xs flex flex-col gap-2">
                    <span className="font-mono text-[9px] text-accent-gold font-bold">CORE DELIVERABLES</span>
                    <ul className="text-xs text-neutral-200 space-y-1.5 list-none font-sans font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-accent-gold" /> Comprehensive syntax & flow optimization
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-accent-gold" /> Journal style aligning & structure check
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-accent-gold" /> Technical terminology coherence vetting
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'proofreading' && (
                <div className="animate-fade-in flex flex-col gap-6 text-left">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif-display text-xl text-white font-bold">Academic Proofreading</h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                      We will check over for misspellings, incorrect/missed punctuation, inconsistencies (textual and numerical) in your manuscript, thesis, statement, and creative work.
                    </p>
                  </div>

                  <div className="bg-maroon-dark/65 p-4 border border-accent-gold/15 rounded-xs flex flex-col gap-2">
                    <span className="font-mono text-[9px] text-accent-gold font-bold">CORE DELIVERABLES</span>
                    <ul className="text-xs text-neutral-200 space-y-1.5 list-none font-sans font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-accent-gold" /> Typographical correction & syntax sanity
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-accent-gold" /> Grammars, tense patterns, punctuation sanity
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-accent-gold" /> Reference list format & numbering alignment
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'formatting' && (
                <div className="animate-fade-in flex flex-col gap-6 text-left">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif-display text-xl text-white font-bold">Academic Formatting</h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                      We will check over for misspellings, incorrect/missed punctuation, inconsistencies (textual and numerical) in your manuscript, thesis, statement, and creative work. We guarantee perfect alignment with submission layouts (IEEE, Springer LNCS, ACM, Elsevier, etc.).
                    </p>
                  </div>

                  <div className="bg-maroon-dark/65 p-4 border border-accent-gold/15 rounded-xs flex flex-col gap-2 text-left">
                    <span className="font-mono text-[9px] text-accent-gold font-bold">CORE DELIVERABLES</span>
                    <ul className="text-xs text-neutral-200 space-y-1.5 list-none font-sans font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-accent-gold" /> Perfect alignment of tables, margins, and column spreads
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-accent-gold" /> LaTeX rendering layouts and references layout formatting
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-accent-gold" /> High-DPI figure placement & captioning structures
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Direct Contacts Segment */}
              <div className="mt-8 border-t border-accent-gold/15 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-maroon-dark p-5 border border-accent-gold/15 shadow-md">
                <div className="text-left">
                  <span className="text-[10px] font-mono tracking-wider text-accent-gold font-bold block uppercase mb-1">
                    Direct Coordinator for {activeTab === 'editing' ? 'Editing' : activeTab === 'proofreading' ? 'Proofreading' : 'Formatting'}
                  </span>
                  <div className="font-serif-display text-base font-bold text-white">
                    {contacts[activeTab].name}
                  </div>
                  <p className="text-[11px] text-neutral-300">RiTECHS Senior Vetting Scholar</p>
                </div>
                
                <div className="flex flex-col gap-1.5 text-xs font-mono shrink-0 text-left">
                  <a 
                    href={`tel:${contacts[activeTab].phone.replace(/[^0-9+]/g, '')}`} 
                    className="flex items-center gap-2 text-neutral-300 hover:text-accent-gold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-accent-gold" />
                    <span>{contacts[activeTab].phone}</span>
                  </a>
                  <a 
                    href={`mailto:${contacts[activeTab].email}`} 
                    className="flex items-center gap-2 text-neutral-300 hover:text-accent-gold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-accent-gold" />
                    <span>{contacts[activeTab].email}</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
