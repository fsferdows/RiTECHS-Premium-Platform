import { ArrowRight } from 'lucide-react';
import { Conference } from '../types';
import { TiltCard } from './TiltCard';

interface ConferenceCardProps {
  key?: string | number;
  conf: Conference;
  onNavigate: (path: string) => void;
  className?: string;
}

export function ConferenceCard({ conf, onNavigate, className = "" }: ConferenceCardProps) {
  return (
    <TiltCard 
      id={`conf-card-${conf.slug}`}
      className={`bg-white border border-divider-gold/55 flex flex-col h-full relative group transition-colors duration-300 shadow-sm hover:shadow-[0_20px_50px_rgba(201,169,97,0.12),0_10px_30px_rgba(10,31,68,0.06)] rounded-xs ${className}`}
    >
      <div className="h-1 bg-primary-navy group-hover:bg-accent-gold transition-all duration-300 w-full" />

      <div className="p-8 flex flex-col flex-grow text-left">
        <div className="flex justify-between items-start mb-6">
          <div className="font-serif-display text-4.5xl font-extrabold text-primary-navy/10 leading-none select-none">
            {conf.name}
          </div>
          <span className="px-2.5 py-0.5 bg-neutral-warm/60 border border-divider-gold/45 text-primary-navy text-[9px] uppercase font-mono tracking-[0.15em] font-semibold">
            {conf.format}
          </span>
        </div>

        <h3 className="font-serif-display text-lg text-primary-navy font-bold mb-3 group-hover:text-accent-gold transition-colors duration-300 leading-snug">
          {conf.fullName}
        </h3>

        <p className="text-xs text-muted-gray leading-relaxed font-light mb-6 line-clamp-3">
          {conf.description}
        </p>

        <div className="flex flex-col gap-2 mt-auto text-[10px] font-mono text-charcoal border-t border-divider-gold/30 pt-4">
          <div className="flex justify-between">
            <span className="text-muted-gray uppercase font-sans tracking-widest text-[8px]">Location //</span>
            <span className="font-semibold text-primary-navy font-sans">{conf.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-gray uppercase font-sans tracking-widest text-[8px]">Dates //</span>
            <span className="font-semibold text-primary-navy font-sans">{conf.dates}</span>
          </div>
        </div>
      </div>

      <div className="bg-neutral-warm/60 border-t border-divider-gold/30 grid grid-cols-1 overflow-hidden">
        <button
          onClick={() => onNavigate(`#/conferences/${conf.slug}`)}
          className="p-3.5 bg-neutral-warm hover:bg-accent-gold hover:text-primary-navy text-primary-navy text-center font-sans uppercase tracking-[0.18em] text-[10px] font-bold transition-all duration-300 w-full cursor-pointer flex items-center justify-center gap-2"
        >
          Open Plenary Agenda
          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
        </button>
      </div>
    </TiltCard>
  );
}
