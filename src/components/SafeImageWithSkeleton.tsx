import React, { useState } from "react";

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
  skeletonClassName = "bg-[#3D0C11]/50",
  onError,
  onLoad,
  ...props
}: SafeImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Premium Pulsing Skeleton */}
      {!loaded && (
        <div className={`absolute inset-0 animate-pulse flex items-center justify-center ${skeletonClassName}`}>
          <div className="w-5 h-5 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        onLoad={(e) => {
          setLoaded(true);
          if (onLoad) onLoad(e);
        }}
        onError={(e) => {
          if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
          } else {
            setLoaded(true); // Stop loading if fallback also fails
          }
          if (onError) onError(e);
        }}
        className={`${className} transition-opacity duration-500 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        {...props}
      />
    </div>
  );
}
