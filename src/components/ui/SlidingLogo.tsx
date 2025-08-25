
import React, { useState, useEffect } from 'react';

const logos = [
  '/lovable-uploads/9ba4ae64-601e-4162-9165-29b1004a73d1.png',
  '/lovable-uploads/3a4a6cc6-a0f7-4d80-831d-5c7bddc9bad0.png',
  '/lovable-uploads/a40ab648-5c25-4e45-8711-428b8042e179.png'
];

interface SlidingLogoProps {
  className?: string;
}

export const SlidingLogo: React.FC<SlidingLogoProps> = ({ className }) => {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo}
          alt="IJ Langa Consulting Logo"
          className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 ${
            index === currentLogoIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
};
