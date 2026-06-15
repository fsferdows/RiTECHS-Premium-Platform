import { useState } from 'react';
import { Image, X, ZoomIn, Calendar, MapPin, Sparkles, Filter } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'keycodes' | 'sessions' | 'posters' | 'networking';
  categoryLabel: string;
  imgUrl: string;
  desc: string;
  location: string;
  date: string;
}

export default function ITSSIoEGallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'keycodes' | 'sessions' | 'posters' | 'networking'>('all');

  const galleryItems: GalleryItem[] = [
    {
      id: 'g1',
      title: "ITSS-IoE 2021 Opening Keynote Plenary Session",
      category: 'keycodes',
      categoryLabel: "Keynote Speeches",
      imgUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      desc: "Delivering the initial opening roadmap addressing the security gaps in emerging autonomous IoT neural grids.",
      location: "Genoa Summit Center, Italy",
      date: "September 14, 2021"
    },
    {
      id: 'g2',
      title: "Interactive Poster Presentation & Vetting Boards",
      category: 'posters',
      categoryLabel: "Poster Presentations",
      imgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
      desc: "Scholars showcasing their physical class research posters to reviewers, explaining data visualizations and telemetry charts.",
      location: "University of Genoa Hallways",
      date: "September 15, 2021"
    },
    {
      id: 'g3',
      title: "Technical Parallel Session: IoT Energy Management",
      category: 'sessions',
      categoryLabel: "Technical Sessions",
      imgUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      desc: "In-depth review of computational balancing in battery lifecycles and decentralized network controllers.",
      location: "Science Park Hall II, Wolverhampton",
      date: "September 15, 2021"
    },
    {
      id: 'g4',
      title: "The Historical 'Research Adda' Colloquial Lounge",
      category: 'networking',
      categoryLabel: "Academic Networking",
      imgUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
      desc: "Unstructured research brainstorming and networking coffee boards sparking multi-disciplinary collaborations.",
      location: "Summit Lounges, Genoa",
      date: "September 16, 2021"
    },
    {
      id: 'g5',
      title: "Post-Quantum Cryptography Technical Panel",
      category: 'sessions',
      categoryLabel: "Technical Sessions",
      imgUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
      desc: "Chairs discussing localized student competencies and fast-tracking defense paper validation formats.",
      location: "Main Auditorium, Wolverhampton",
      date: "September 16, 2021"
    },
    {
      id: 'g6',
      title: "Award Ceremony and Final Certificates Distribution",
      category: 'keycodes',
      categoryLabel: "Keynote Speeches",
      imgUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
      desc: "Honoring outstanding student researchers and presenting premium indexing validation certificates.",
      location: "Grand Banqueting Hall, Genoa",
      date: "September 17, 2021"
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="itss-ioe-2021-gallery" className="py-16 bg-neutral-warm/25 border-b border-divider-gold/40 premium-noise">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-accent-gold uppercase font-bold bg-accent-gold/10 px-3 py-1 border border-accent-gold/20 rounded-full inline-block mb-3">
              HISTORICAL SYMPOSIUM RECORDINGS
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4.5xl text-primary-navy font-bold leading-tight">
              ITSS-IoE 2021 Photo Gallery
            </h2>
            <p className="text-xs sm:text-sm text-muted-gray leading-relaxed font-light max-w-xl mt-2">
              Explore the historical photos, academic panels, poster presentations, and interactive Research Adda moments captured live at the ITSS-IoE 2021 conference.
            </p>
          </div>

          {/* Core filters */}
          <div className="flex flex-wrap gap-2 select-none">
            {[
              { id: 'all', label: 'ALL DELEGATES' },
              { id: 'keycodes', label: 'KEYNOTES' },
              { id: 'sessions', label: 'SESSIONS' },
              { id: 'posters', label: 'POSTERS' },
              { id: 'networking', label: 'NETWORKING' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`py-2 px-3 text-[10px] font-mono uppercase tracking-wider rounded-xs border transition-all ${
                  activeFilter === filter.id
                    ? 'bg-accent-gold border-accent-gold text-primary-navy font-bold shadow-2xs'
                    : 'bg-white border-divider-gold/25 text-muted-gray hover:text-primary-navy'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer bg-white border border-divider-gold/30 rounded-xs overflow-hidden hover:border-accent-gold transition-all duration-300 shadow-2xs"
            >
              {/* Image box with overlay */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary-navy/10">
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover select-none transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-110 grayscale group-hover:grayscale-0 group-hover:brightness-95"
                />
                <div className="absolute inset-0 bg-primary-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white backdrop-blur-xs">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-primary-navy/90 border border-accent-gold/35 px-2.5 py-1 text-[9px] font-mono text-accent-gold uppercase tracking-widest font-semibold rounded-xs">
                  {item.categoryLabel}
                </div>
              </div>

              {/* Description box */}
              <div className="p-5 flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#6B7280]">
                  <Calendar className="w-3 h-3 text-accent-gold" />
                  <span>{item.date}</span>
                </div>
                <h4 className="font-serif-display text-sm font-bold text-primary-navy leading-snug group-hover:text-accent-gold transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-muted-gray leading-relaxed font-light line-clamp-2">
                  {item.desc}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-muted-gray border-t border-divider-gold/15 pt-3 mt-1.5">
                  <MapPin className="w-3 h-3 text-accent-gold" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-primary-navy/95 backdrop-blur-md z-55 flex items-center justify-center p-6 animate-fade-in select-text">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/20 hover:border-accent-gold text-white hover:text-accent-gold transition-all"
              title="Close Portal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="bg-white border border-accent-gold/30 max-w-4xl w-full rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90vh] shadow-2xl relative">
              
              {/* Media element column */}
              <div className="md:col-span-7 bg-black min-h-[300px] md:min-h-auto relative">
                <img
                  src={selectedItem.imgUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </div>

              {/* Context column */}
              <div className="md:col-span-5 p-8 flex flex-col justify-between bg-white relative">
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-mono uppercase bg-accent-gold/10 border border-accent-gold/30 px-2.5 py-1 text-accent-gold tracking-widest font-bold self-start rounded-xs">
                    {selectedItem.categoryLabel}
                  </span>
                  <div>
                    <h3 className="font-serif-display text-xl font-bold text-primary-navy leading-tight">
                      {selectedItem.title}
                    </h3>
                    <div className="flex flex-col gap-1 text-[10px] font-mono text-muted-gray mt-2">
                      <div className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-accent-gold" /> {selectedItem.date}</div>
                      <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-accent-gold" /> {selectedItem.location}</div>
                    </div>
                  </div>
                  
                  <div className="h-px bg-divider-gold/20 my-1" />

                  <p className="text-xs sm:text-sm text-muted-gray leading-relaxed font-light">
                    {selectedItem.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-divider-gold/20 flex items-center gap-2 text-xs font-mono text-accent-gold font-bold">
                  <Sparkles className="w-4 h-4 fill-accent-gold" />
                  <span>ITSS-IoE 2021 ARCHIVAL EXCELLENCE</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
