import React, { useState, useEffect, useRef } from "react";

interface SafeImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  skeletonClassName?: string;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export function SafeImageWithSkeleton({
  src,
  alt,
  className = "",
  fallbackSrc = "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1600",
  skeletonClassName = "bg-[#1C0508]/80", // Premium maroon-dark luxury skeleton
  onError,
  onLoad,
  ...props
}: SafeImageWithSkeletonProps) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset state if src changes
    setImgSrc(src);
    setIsLoaded(false);
  }, [src]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "150px", // Prefetch slightly before entering viewport
        threshold: 0.01,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [src]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-neutral-warm-dark/20"
      id={`lazy-image-container-${src.split('/').pop()?.split('?')[0] || 'img'}`}
    >
      {/* 1. Blur-up Low-Res Placeholder / Skeleton Overlay */}
      {!isLoaded && (
        <div 
          className={`absolute inset-0 transition-opacity duration-700 ease-out z-10 select-none pointer-events-none ${skeletonClassName} flex items-center justify-center`}
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite] pointer-events-none" />
          
          {/* Luxury Spinner */}
          <div className="relative w-7 h-7 flex items-center justify-center">
            <span className="absolute w-full h-full border border-accent-gold/10 rounded-full" />
            <span className="absolute w-full h-full border-t-2 border-accent-gold rounded-full animate-spin" />
            <span className="text-[7.5px] font-mono text-accent-gold/40 tracking-widest uppercase">L</span>
          </div>
        </div>
      )}

      {/* 2. Image Element loaded conditionally based on Intersection Observer */}
      {isInView ? (
        <img
          src={imgSrc}
          alt={alt}
          onLoad={(e) => {
            setIsLoaded(true);
            if (onLoad) onLoad(e);
          }}
          onError={(e) => {
            if (imgSrc !== fallbackSrc) {
              setImgSrc(fallbackSrc);
            } else {
              setIsLoaded(true); // Stop loading animation if fallback fails too
            }
            if (onError) onError(e);
          }}
          className={`${className} transition-all duration-1000 ease-in-out ${
            isLoaded 
              ? "opacity-100 scale-100 blur-0" 
              : "opacity-0 scale-105 blur-lg"
          }`}
          loading="lazy"
          referrerPolicy="no-referrer"
          {...props}
        />
      ) : (
        // Render empty placeholder until intersecting to keep DOM lightweight and prevent any early HTTP request
        <div className="absolute inset-0 bg-neutral-warm-dark/10" />
      )}
    </div>
  );
}
