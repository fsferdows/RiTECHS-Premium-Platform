import React from 'react';
import { Star, ChevronRight, Heart } from 'lucide-react';
import { Mentor } from '../types';
import { TiltCard } from './TiltCard';

interface MentorCardProps {
  key?: string | number;
  mentor: Mentor;
  onClick: () => void;
  className?: string;
  isDark?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

export function MentorCard({ 
  mentor, 
  onClick, 
  className = "", 
  isDark = true,
  isFavorite = false,
  onToggleFavorite
}: MentorCardProps) {
  return (
    <TiltCard 
      id={`mentor-card-${mentor.id}`}
      onClick={onClick}
      className={`flex flex-col cursor-pointer group border-b-2 overflow-hidden h-full rounded-xs transition-all duration-300 shadow-sm ${
        isDark 
          ? 'bg-[#3D0C11] border-accent-gold/25 hover:border-b-accent-gold hover:shadow-[0_20px_50px_rgba(201,169,97,0.2)]'
          : 'bg-[#3D0C11] border-accent-gold/25 hover:border-b-accent-gold hover:shadow-[0_20px_50px_rgba(201,169,97,0.2)]'
      } ${className}`}
    >
      {/* Image panel with zoom scale & custom duotone gradient on hover */}
      <div className={`relative aspect-[1.1/1] overflow-hidden border-b ${
        isDark ? 'bg-black/20 border-accent-gold/15' : 'bg-black/20 border-accent-gold/15'
      }`}>
        <img 
          src={mentor.image} 
          alt={mentor.name}
          referrerPolicy="no-referrer"
          loading="eager"
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[600ms]"
        />

        {/* Tactile Favorite Toggle button in top-left */}
        {onToggleFavorite && (
          <button
            type="button"
            onClick={onToggleFavorite}
            className={`absolute top-2.5 left-2.5 z-10 w-6 h-6 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
              isFavorite 
                ? 'bg-rose-600 border-rose-500 text-white shadow-md scale-110' 
                : 'bg-[#4A0E17]/90 border-accent-gold/20 text-accent-gold/80 hover:text-rose-400 hover:border-rose-400/50 hover:bg-rose-950/40'
            }`}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Rating Badge */}
        <div className="absolute top-2.5 right-2.5 bg-[#4A0E17]/95 border border-accent-gold/30 text-accent-gold text-[7.5px] font-mono px-1.5 py-0.5 tracking-widest font-semibold uppercase flex items-center gap-1 shadow-md">
          <Star className="w-2 h-2 text-accent-gold fill-accent-gold" />
          <span>{mentor.rating}</span>
        </div>

        {/* Country Flag overlay */}
        <div className="absolute bottom-2 left-2.5 bg-black/60 text-white text-[7.5px] px-1.5 py-0.5 rounded-xs tracking-widest font-mono uppercase font-bold">
          {mentor.country}
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-grow relative text-left text-white">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[7.5px] font-mono text-[#C9A961]/80 tracking-widest uppercase font-bold">
            ID: EM-{String(mentor.id).padStart(3, '0')}
          </span>
          <span className={`text-[7.5px] font-mono uppercase tracking-widest px-1.5 py-0.5 border font-semibold bg-[#C9A961]/15 text-accent-gold border-accent-gold/25`}>
            {mentor.role || 'mentor'}
          </span>
        </div>
        
        <h3 className={`font-serif-display text-xs.5 sm:text-sm font-bold group-hover:text-accent-gold transition-colors text-left leading-tight min-h-[32px] flex items-center text-white`}>
          {mentor.name}
        </h3>

        <p className={`text-[8.5px] uppercase font-mono mt-0.5 font-semibold text-left tracking-wide block max-w-full truncate text-neutral-300`} title={mentor.university}>
          {mentor.university}
        </p>

        <div className={`flex flex-wrap gap-1 mt-2.5 pt-2.5 border-t border-accent-gold/15`}>
          {mentor.fields.slice(0, 3).map((f, i) => (
            <span 
              key={i} 
              className={`text-[7.5px] font-sans font-medium uppercase tracking-wider px-1 py-0.5 font-mono bg-maroon-light/40 border border-accent-gold/20 text-accent-gold`}
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Action CTA indicator inside card bottom */}
      <div className={`border-t py-2 px-3.5 flex justify-between items-center text-[8.5px] font-mono transition-all duration-300 bg-maroon-dark/40 border-accent-gold/15 text-accent-gold/80 group-hover:text-white group-hover:bg-[#4A0E17]/40`}>
        <span>PROPOSE MATCH</span>
        <ChevronRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </TiltCard>
  );
}
