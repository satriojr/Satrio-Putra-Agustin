import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on devices with a fine pointer (like a mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = cursorDotRef.current;
    const outline = cursorOutlineRef.current;
    if (!dot || !outline) return;

    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      // Instant follow for the center dot
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      // Smooth follow for the outline using animejs
      anime({
        targets: outline,
        left: e.clientX,
        top: e.clientY,
        duration: 500,
        easing: 'easeOutExpo'
      });
    };

    const onMouseDown = () => {
      anime({
        targets: outline,
        scale: isHovering ? 1.5 : 0.5,
        duration: 150,
        easing: 'easeOutQuad'
      });
    };

    const onMouseUp = () => {
      anime({
        targets: outline,
        scale: isHovering ? 1.8 : 1,
        duration: 150,
        easing: 'easeOutQuad'
      });
    };

    // Add hover effects for interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, .project-card, .skill-card, .social-link')) {
        isHovering = true;
        anime({
          targets: outline,
          scale: 1.8,
          backgroundColor: 'rgba(99, 102, 241, 0.1)', // indigo-500 with opacity
          borderColor: 'rgba(99, 102, 241, 0.8)',
          duration: 300,
          easing: 'easeOutElastic(1, .6)'
        });
        anime({
          targets: dot,
          scale: 0,
          duration: 200,
          easing: 'easeOutQuad'
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, .project-card, .skill-card, .social-link')) {
        isHovering = false;
        anime({
          targets: outline,
          scale: 1,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(168, 85, 247, 0.5)', // purple-500
          duration: 300,
          easing: 'easeOutQuad'
        });
        anime({
          targets: dot,
          scale: 1,
          duration: 200,
          easing: 'easeOutQuad'
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [isVisible]);

  return (
    <div className="hidden md:block pointer-events-none">
      <div 
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-indigo-400 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: 9999 }}
      />
      <div 
        ref={cursorOutlineRef}
        className={`fixed top-0 left-0 w-8 h-8 border-2 border-purple-500/50 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: 9998 }}
      />
    </div>
  );
}
