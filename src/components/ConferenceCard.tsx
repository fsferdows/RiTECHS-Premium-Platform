import { ArrowRight } from 'lucide-react';
import { Conference } from '../types';
import { TiltCard } from './TiltCard';

interface ConferenceCardProps {
  key?: string | number;
  conf: Conference;
  onNavigate: (path: string) => void;
  className?: string;
  searchTerm?: string;
}

function HighlightText({ text, highlight }: { text: string; highlight?: string }) {
  if (!text) return null;
  if (!highlight || !highlight.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-[#C9A961]/40 text-white px-0.5 rounded-xs font-serif italic font-bold">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

export function ConferenceCard({ conf, onNavigate, className = "", searchTerm = "" }: ConferenceCardProps) {
  return (
    <TiltCard 
      id={`conf-card-${conf.slug}`}
      className={`bg-primary-maroon border border-accent-gold/15 flex flex-col h-full relative group transition-all duration-300 shadow-lg hover:border-accent-gold/40 rounded-xs premium-card-glow ${className}`}
    >
      <div className="h-1 bg-accent-gold/30 group-hover:bg-accent-gold transition-all duration-300 w-full" />

      <div className="p-5 flex flex-col flex-grow text-left">
        <div className="flex justify-between items-start mb-4">
          <div className="font-serif-display text-3.5xl font-extrabold text-accent-gold/10 leading-none select-none">
            {conf.name}
          </div>
          <span className="px-2 py-0.5 bg-maroon-dark/60 border border-accent-gold/15 text-accent-gold text-[8px] uppercase font-mono tracking-[0.12em] font-semibold">
            {conf.format}
          </span>
        </div>

        <h3 className="font-serif-display text-base text-white font-bold mb-2 group-hover:text-accent-gold transition-colors duration-300 leading-snug">
          <HighlightText text={conf.fullName || ""} highlight={searchTerm} />
        </h3>

        <p className="text-[11px] text-neutral-300 leading-relaxed font-light mb-4 line-clamp-3">
          <HighlightText text={conf.description || ""} highlight={searchTerm} />
        </p>

        <div className="flex flex-col gap-1.5 mt-auto text-[9px] font-mono text-neutral-200 border-t border-accent-gold/10 pt-3">
          <div className="flex justify-between">
            <span className="text-neutral-400 uppercase font-sans tracking-widest text-[7.5px]">Location //</span>
            <span className="font-semibold text-accent-gold font-sans text-[9px]">{conf.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400 uppercase font-sans tracking-widest text-[7.5px]">Dates //</span>
            <span className="font-semibold text-accent-gold font-sans text-[9px]">{conf.dates}</span>
          </div>
        </div>
      </div>

      <div className="bg-maroon-dark/40 border-t border-accent-gold/10 grid grid-cols-1 overflow-hidden">
        <button
          onClick={() => onNavigate(`#/conferences/${conf.slug}`)}
          className="p-2.5 bg-transparent hover:bg-accent-gold text-accent-gold hover:text-primary-maroon text-center font-sans uppercase tracking-[0.15em] text-[9px] font-bold transition-all duration-300 w-full cursor-pointer flex items-center justify-center gap-1.5"
        >
          Open Agenda
          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
        </button>
      </div>
    </TiltCard>
  );
}
