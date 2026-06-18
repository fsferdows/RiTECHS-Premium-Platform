import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, HelpCircle, CheckCircle2, 
  ChevronDown, MessageSquareCode, Clock 
} from 'lucide-react';
import { FadeUpSection } from './FadeUpSection';

export default function ContactView() {
  // Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [journalName, setJournalName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(0);

  const faqs = [
    {
      q: "Does RiTECHS guarantee publication in IEEE or Springer journals?",
      a: "While we do not bypass individual journal peer review bodies (as no legitimate program can), our pre-peer review formatting, advisory matchmaking, and language polishing eliminate over 30% of standard editorial dismissals, optimizing acceptance trajectories."
    },
    {
      q: "Are my draft manuscripts covered under Non-Disclosure Agreements?",
      a: "Yes. All draft papers uploaded to RiTECHS are immediately bound under English law NDAs. Our credentialed editorial board members are legal signatories to strict confidentiality clauses protecting your original methodologies and data rights."
    },
    {
      q: "Can I register as both a Graduate Mentee and an Expert Mentor?",
      a: "Account structures are segregated to preserve scholastic rigor. Mentors require verification via a university ORCID ID, Google Scholar portfolio, and minimum publication thresholds, while Mentees simply register using their standard university emails."
    },
    {
      q: "How does the Stripe payment system compute transaction rates?",
      a: "Our pricing schedules are strictly tied to estimated word counts and required formatting scopes. Student and hybrid rates enjoy a 40% discount, accessible by presenting active university registrar credentials during verification checkpoints."
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setTicketNumber(Math.floor(Math.random() * 800000 + 100000));
      setSubmitted(true);
      setName('');
      setEmail('');
      setJournalName('');
      setMessage('');
    }, 1500);
  };

  return (
    <div id="contact-scholastic-view" className="pt-16 animate-fade-in-up text-white bg-maroon-dark min-h-screen">
      
      {/* Narrative Header */}
      <section className="bg-gradient-to-b from-[#2C0509] to-[#3D0C11] text-white py-12 md:py-20 px-6 text-center relative premium-noise border-b border-accent-gold/25">
        <div className="max-w-4xl mx-auto text-white">
          <h3 className="text-xs font-mono tracking-widest text-[#C9A961] uppercase mb-4">EDITORIAL DESK</h3>
          <h1 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight mb-8 text-white">
            Contact & Support
          </h1>
          <p className="font-serif-accent text-lg sm:text-xl italic text-neutral-200 max-w-2xl mx-auto leading-relaxed font-light">
            Have a question on manuscript templates or matchmaking? Drop a message to our Wolverhampton secretariat or browse our critical FAQs.
          </p>
        </div>
      </section>

      {/* Main split grid contact form / office cards */}
      <FadeUpSection className="py-12 md:py-20 bg-maroon-dark w-full border-b border-accent-gold/15 text-white premium-noise text-left">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Left Form (Col span 7) */}
          <div className="lg:col-span-7 bg-primary-maroon border border-accent-gold/25 p-8 text-white">
          <h3 className="font-serif-display text-xl text-white font-bold mb-6 flex items-center gap-2">
            <MessageSquareCode className="w-5.5 h-5.5 text-accent-gold" /> Academic Inquiry Form
          </h3>

          {!submitted ? (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-neutral-300 font-bold">Your Scholar Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Prof. / Dr. / Scholar Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-accent-gold/20 p-3 bg-maroon-dark/45 text-white placeholder-neutral-400 focus:border-accent-gold outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-neutral-300 font-bold">University Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="e.g. name@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-accent-gold/20 p-3 bg-maroon-dark/45 text-white placeholder-neutral-400 focus:border-accent-gold outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="font-mono text-[9px] uppercase tracking-wider text-neutral-300 font-bold">Target Conference / Journal Venue (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. IEEE S&P Rome, Springer IoT Lagos"
                  value={journalName}
                  onChange={(e) => setJournalName(e.target.value)}
                  className="border border-accent-gold/20 p-3 bg-maroon-dark/45 text-white placeholder-neutral-400 focus:border-accent-gold outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="font-mono text-[9px] uppercase tracking-wider text-neutral-300 font-bold">Detail your Academic Request</label>
                <textarea 
                  rows={5} 
                  required 
                  placeholder="Explain your alignment query, paper word count, or mentor matchmaking requests..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border border-accent-gold/20 p-3 bg-maroon-dark/45 text-white placeholder-neutral-400 focus:border-accent-gold outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-maroon-dark hover:bg-accent-gold border border-accent-gold/20 text-white hover:text-maroon-dark py-3.5 uppercase tracking-widest font-mono font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-40 cursor-pointer"
              >
                {submitting ? (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Routing Ticket to Secretariat
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center p-8 bg-maroon-dark/65 border border-accent-gold/25 flex flex-col items-center gap-4 animate-scale-up text-white">
              <div className="w-14 h-14 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-serif-display text-lg font-bold text-accent-gold">Secretariat Ticket Registered</h4>
                <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mt-1 font-light mx-auto">
                  Your academic inquiry has been cataloged under our security queues. The Wolverhampton admissions desk will respond within 24 working hours.
                </p>
              </div>

              <div className="bg-primary-maroon border border-accent-gold/20 p-4 font-mono text-[10px] text-left w-full flex flex-col gap-1 text-white animate-fade-in">
                <div><span className="text-neutral-300">Ticket ID:</span> RIT-{ticketNumber}</div>
                <div><span className="text-neutral-300">Priority:</span> Academic Evaluation Tier</div>
                <div><span className="text-neutral-300">Routing Cluster:</span> Wolverhampton Office WV1</div>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="w-full bg-maroon-dark border border-accent-gold/20 text-white hover:bg-accent-gold hover:text-primary-maroon py-3 font-mono text-[10px] tracking-widest uppercase transition-colors cursor-pointer"
              >
                Log Secondary Inquiry Ticket
              </button>
            </div>
          )}
        </div>

        {/* Right Info Cards (Col span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Location details card */}
          <div className="bg-[#5c1320] text-white border border-accent-gold/25 p-8 premium-noise">
            <h3 className="font-serif-display text-lg text-accent-gold font-semibold mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent-gold animate-bounce" /> Secretariat Office
            </h3>

            <div className="flex flex-col gap-4 font-sans text-xs">
              <p className="text-white/80 font-light leading-relaxed">
                RiTECHS Secretariat coordinates all publications and matching rosters from our United Kingdom headquarters.
              </p>
              
              <div className="border-t border-white/15 pt-4 flex flex-col gap-3 font-mono text-white/70">
                <div>
                  <span className="text-accent-gold/85 block text-[9px] uppercase font-bold">Physical Address</span>
                  <span className="text-white font-sans text-xs">153, Dunstall Avenue, Wolverhampton, West Midlands, WV6 0NG, United Kingdom</span>
                </div>
                <div>
                  <span className="text-accent-gold/85 block text-[9px] uppercase font-bold">Academic Phone</span>
                  <span className="text-white font-sans text-xs">+44 (0) 745 510 5988</span>
                </div>
                <div>
                  <span className="text-accent-gold/85 block text-[9px] uppercase font-bold">Digital Secretariat</span>
                  <span className="text-white font-sans text-xs underline">info@ritechs.org</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick working hours timeline block */}
          <div className="bg-primary-maroon border border-accent-gold/20 p-6 flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-accent-gold/15 flex items-center justify-center text-accent-gold">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-xs">
              <span className="font-serif-display font-bold text-accent-gold">Admissions Working Hours</span>
              <p className="text-neutral-300 font-light mt-0.5 leading-relaxed">Monday – Friday: 09:00 to 17:30 [GMT / London Time]</p>
            </div>
          </div>

        </div>
      </div>

    </FadeUpSection>      {/* FAQ Accordion Section */}
      <FadeUpSection id="faq-accordions" className="py-12 md:py-20 bg-maroon-dark text-white w-full premium-noise border-b border-accent-gold/15 text-left">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <HelpCircle className="w-10 h-10 text-accent-gold/70 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-2">SCHOLASTIC FAQ</h3>
            <h2 className="font-serif-display text-3xl font-bold text-white">
              Vetting & Policy Details
            </h2>
          </div>

          <div className="flex flex-col gap-4 text-left">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-primary-maroon border border-accent-gold/15 hover:border-accent-gold/35 transition-all duration-300 shadow-lg"
                  id={`faq-${idx}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-6 flex justify-between items-center text-white hover:text-accent-gold font-serif-display text-base font-bold cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-accent-gold transition-transform duration-300 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light border-t border-accent-gold/15 pt-4 animate-fade-in text-left">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </FadeUpSection>
    </div>
  );
}
