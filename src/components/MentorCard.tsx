import { Star, ChevronRight } from 'lucide-react';
import { Mentor } from '../types';
import { TiltCard } from './TiltCard';

interface MentorCardProps {
  key?: string | number;
  mentor: Mentor;
  onClick: () => void;
  className?: string;
}

export function MentorCard({ mentor, onClick, className = "" }: MentorCardProps) {
  return (
    <TiltCard 
      id={`mentor-card-${mentor.id}`}
      onClick={onClick}
      className={`bg-white border border-divider-gold/50 flex flex-col cursor-pointer group border-b-2 hover:border-b-accent-gold overflow-hidden h-full rounded-xs transition-all duration-300 shadow-sm hover:shadow-[0_20px_50px_rgba(201,169,97,0.12),0_10px_30px_rgba(10,31,68,0.06)] ${className}`}
    >
      {/* Image panel with zoom scale & custom duotone gradient on hover */}
      <div className="relative aspect-[4/5] overflow-hidden bg-primary-navy/10 border-b border-divider-gold/30">
        <img 
          src={mentor.image} 
          alt={mentor.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[600ms]"
        />
        
        {/* Subtle luxurious color sheen block */}
        <div className="absolute inset-0 bg-primary-navy/10 group-hover:bg-transparent transition-colors duration-500" />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-primary-navy/90 border border-accent-gold/30 text-accent-gold text-[8px] font-mono px-2 py-1 tracking-widest font-semibold uppercase flex items-center gap-1 shadow-md">
          <Star className="w-2.5 h-2.5 text-accent-gold fill-accent-gold" />
          <span>{mentor.rating}</span>
        </div>

        {/* Country Flag overlay */}
        <div className="absolute bottom-2 left-3 bg-black/50 text-white text-[8px] px-1.5 py-0.5 rounded-xs tracking-widest font-mono uppercase font-bold">
          {mentor.country}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow relative text-left">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[8px] font-mono text-[#C9A961]/80 tracking-widest uppercase font-bold">
            ID: EM-{String(mentor.id).padStart(3, '0')}
          </span>
          <span className={`text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 border font-semibold ${
            mentor.role === 'mentor'
              ? 'bg-[#C9A961]/15 text-accent-gold border-accent-gold/25'
              : 'bg-primary-navy/5 text-primary-navy/70 border-primary-navy/15'
          }`}>
            {mentor.role || 'mentor'}
          </span>
        </div>
        
        <h3 className="font-serif-display text-sm font-bold text-primary-navy group-hover:text-accent-gold transition-colors text-left leading-tight min-h-[36px] flex items-center">
          {mentor.name}
        </h3>

        <p className="text-[9px] text-muted-gray uppercase font-mono mt-0.5 font-semibold text-left tracking-wide block max-w-full truncate" title={mentor.university}>
          {mentor.university}
        </p>

        <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-divider-gold/30">
          {mentor.fields.slice(0, 3).map((f, i) => (
            <span 
              key={i} 
              className="text-[8px] font-sans font-medium uppercase tracking-wider bg-neutral-warm/80 border border-divider-gold/50 px-1.5 py-0.5 text-primary-navy font-mono"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Action CTA indicator inside card bottom */}
      <div className="bg-neutral-warm/40 border-t border-divider-gold/25 py-2.5 px-4 flex justify-between items-center text-[9px] font-mono text-primary-navy/60 group-hover:text-accent-gold group-hover:bg-[#C9A961]/5 transition-all duration-300">
        <span>PROPOSE MATCH</span>
        <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
      </div>
    </TiltCard>
  );
}
