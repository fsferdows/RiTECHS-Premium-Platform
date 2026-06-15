import React from 'react';
import { motion } from 'motion/react';

interface FadeUpSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export function FadeUpSection({ children, className = '', id, delay = 0 }: FadeUpSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ 
        duration: 0.85, 
        ease: [0.16, 1, 0.3, 1], // Custom academic/museum exponential ease-out
        delay 
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
