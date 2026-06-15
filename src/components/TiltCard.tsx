import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  key?: React.Key;
}

export function TiltCard({ children, className = '', onClick, id }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  // Standard exquisite dynamic shadow state
  const [shadow, setShadow] = useState('0px 4px 20px rgba(10, 31, 68, 0.04), 0px 10px 30px rgba(10, 31, 68, 0.03)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Subtle premium rotation (max 6 degrees for a delicate, professional feel)
    const rX = -(mouseY / (height / 2)) * 6;
    const rY = (mouseX / (width / 2)) * 6;

    setRotateX(rX);
    setRotateY(rY);

    // Luxuriously calculate a dynamic accent light shadow shifting opposite to mouse
    const sX = -(mouseX / (width / 2)) * 10;
    const sY = -(mouseY / (height / 2)) * 10;
    
    // Smooth hybrid shadow showing gold gleam and soft dark background ambient glow
    setShadow(`${sX}px ${sY}px 30px rgba(201, 169, 97, 0.12), 0px 16px 45px rgba(10, 31, 68, 0.08)`);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShadow('0px 4px 20px rgba(10, 31, 68, 0.04), 0px 10px 30px rgba(10, 31, 68, 0.03)');
  };

  return (
    <motion.div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      animate={{
        rotateX,
        rotateY,
        boxShadow: shadow,
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 25 }}
      className={`relative cursor-pointer select-none overflow-hidden transition-colors duration-300 ${className}`}
    >
      <div 
        style={{ 
          transform: 'translateZ(15px)',
          transformStyle: 'preserve-3d' 
        }} 
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
