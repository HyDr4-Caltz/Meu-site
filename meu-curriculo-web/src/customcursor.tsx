import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NUM_TRAIL_DOTS = 20;

interface ClickRipple {
  id: string;
  x: number;
  y: number;
}

export const Novocursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickRipples, setClickRipples] = useState<ClickRipple[]>([]);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    const handleClick = (ev: MouseEvent) => {
      const newRipple: ClickRipple = {
        id: `click-${Date.now()}-${Math.random()}`,
        x: ev.clientX,
        y: ev.clientY,
      };
      
      setClickRipples(prev => [...prev, newRipple]);
      
      // Remove o ripple após a animação
      setTimeout(() => {
        setClickRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {Array(NUM_TRAIL_DOTS)
        .fill(null)
        .map((_, index) => (
          <motion.div
            key={index}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: `${Math.max(2, 8 - index * 0.3)}px`,
              height: `${Math.max(2, 8 - index * 0.3)}px`,
              backgroundColor: `rgba(0, 229, 255, ${Math.max(0.1, 0.8 - index * 0.04)})`,
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 9990 - index,
              boxShadow: `0 0 ${Math.max(2, 8 - index * 0.3)}px rgba(0, 229, 255, ${Math.max(0.1, 0.6 - index * 0.03)})`,
            }}
            animate={{
              x: mousePosition.x - 4,
              y: mousePosition.y - 4,
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              x: { 
                type: 'tween', 
                duration: 0.1 + (index * 0.02), 
                ease: "easeOut"
              },
              y: { 
                type: 'tween', 
                duration: 0.1 + (index * 0.02), 
                ease: "easeOut"
              },
              scale: { duration: 1.5, repeat: Infinity, delay: index * 0.05, ease: "easeInOut" },
              opacity: { duration: 1.5, repeat: Infinity, delay: index * 0.05, ease: "easeInOut" }
            }}
          />
        ))}

      {/* Efeitos de onda ao clicar */}
      {clickRipples.map((ripple) => (
        <motion.div
          key={ripple.id}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '60px',
            height: '60px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998,
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(0, 229, 255, 0.6)',
          }}
          initial={{
            x: ripple.x - 30,
            y: ripple.y - 30,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            scale: 2,
            opacity: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
        />
      ))}

      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          backgroundColor: '#00E5FF',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 15px rgba(0, 229, 255, 0.8), 0 0 30px rgba(0, 229, 255, 0.4)',
        }}
        animate={{ 
          x: mousePosition.x - 6, 
          y: mousePosition.y - 6,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          x: { type: 'tween', duration: 0.1, ease: "easeOut" },
          y: { type: 'tween', duration: 0.1, ease: "easeOut" },
          scale: {
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }} 
      />
    </>
  );
};