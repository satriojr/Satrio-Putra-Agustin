import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export default function BackgroundEffects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ w: window.innerWidth, h: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (dimensions.w === 0) return;

    const gridEl = gridRef.current;
    if (!gridEl) return;
    
    gridEl.innerHTML = '';
    const dotSize = 50; // Size of each grid cell
    const cols = Math.floor(dimensions.w / dotSize) + 1;
    const rows = Math.floor(dimensions.h / dotSize) + 1;
    const total = cols * rows;

    for (let i = 0; i < total; i++) {
      const cell = document.createElement('div');
      cell.style.width = `${dotSize}px`;
      cell.style.height = `${dotSize}px`;
      cell.style.display = 'flex';
      cell.style.justifyContent = 'center';
      cell.style.alignItems = 'center';

      const dot = document.createElement('div');
      dot.classList.add('grid-dot');
      dot.style.width = '4px';
      dot.style.height = '4px';
      dot.style.borderRadius = '50%';
      dot.style.backgroundColor = '#475569'; // slate-600
      dot.style.opacity = '0.3';
      dot.style.transformOrigin = 'center center';

      cell.appendChild(dot);
      gridEl.appendChild(cell);
    }

    let animation: anime.AnimeInstance | null = null;

    const playRipple = (e?: MouseEvent) => {
      if (animation) animation.pause();
      
      let index = anime.random(0, total - 1);
      if (e) {
        const col = Math.floor(e.clientX / dotSize);
        const row = Math.floor(e.clientY / dotSize);
        index = row * cols + col;
        if (index >= total) index = total - 1;
      }

      animation = anime({
        targets: '.grid-dot',
        scale: [
          { value: 4, easing: 'easeOutSine', duration: 400 },
          { value: 1, easing: 'easeInOutQuad', duration: 900 }
        ],
        translateY: [
          { value: -20, easing: 'easeOutSine', duration: 400 },
          { value: 0, easing: 'easeInOutQuad', duration: 900 }
        ],
        opacity: [
          { value: 1, easing: 'easeOutSine', duration: 400 },
          { value: 0.3, easing: 'easeInOutQuad', duration: 900 }
        ],
        backgroundColor: [
          { value: '#818cf8', easing: 'easeOutSine', duration: 400 }, // indigo-400
          { value: '#c084fc', easing: 'easeInOutQuad', duration: 400 }, // purple-400
          { value: '#475569', easing: 'easeInOutQuad', duration: 500 } // slate-600
        ],
        delay: anime.stagger(40, { grid: [cols, rows], from: index }),
      });
    };

    // Initial ripple
    setTimeout(() => playRipple(), 500);

    window.addEventListener('click', playRipple);
    return () => window.removeEventListener('click', playRipple);
  }, [dimensions]);

  useEffect(() => {
    const shapesEl = shapesRef.current;
    if (!shapesEl) return;
    
    shapesEl.innerHTML = '';
    const colors = ['#6366f1', '#a855f7', '#ec4899', '#38bdf8'];
    const numShapes = 30;

    for (let i = 0; i < numShapes; i++) {
      const shapeWrapper = document.createElement('div');
      shapeWrapper.classList.add('antigravity-wrapper');
      shapeWrapper.style.position = 'absolute';
      shapeWrapper.style.left = `${anime.random(0, 100)}vw`;
      shapeWrapper.style.top = `${anime.random(100, 150)}vh`;
      shapeWrapper.style.pointerEvents = 'none';

      const shape = document.createElement('div');
      shape.classList.add('antigravity-shape');
      const type = Math.random();
      const size = anime.random(15, 60);
      
      shape.style.opacity = '0.5';

      if (type < 0.33) {
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.borderRadius = '50%';
        shape.style.border = `2px solid ${colors[anime.random(0, colors.length - 1)]}`;
      } else if (type < 0.66) {
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.border = `2px solid ${colors[anime.random(0, colors.length - 1)]}`;
        shape.style.borderRadius = '4px';
      } else {
        shape.style.width = '0';
        shape.style.height = '0';
        shape.style.borderLeft = `${size/2}px solid transparent`;
        shape.style.borderRight = `${size/2}px solid transparent`;
        shape.style.borderBottom = `${size}px solid ${colors[anime.random(0, colors.length - 1)]}`;
        shape.style.opacity = '0.3';
      }

      shapeWrapper.appendChild(shape);
      shapesEl.appendChild(shapeWrapper);
    }

    // Antigravity upward floating (wrapper)
    anime({
      targets: '.antigravity-wrapper',
      translateY: () => [0, anime.random(-1500, -3000)],
      translateX: () => anime.random(-400, 400),
      duration: () => anime.random(15000, 30000),
      delay: () => anime.random(0, 10000),
      loop: true,
      easing: 'linear'
    });

    // Continuous rotation (inner shape)
    anime({
      targets: '.antigravity-shape',
      rotate: () => anime.random(-720, 720),
      duration: () => anime.random(5000, 10000),
      loop: true,
      easing: 'linear',
      direction: 'alternate'
    });

  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020617]">
      <div ref={gridRef} className="absolute inset-0 flex flex-wrap" style={{ alignContent: 'flex-start' }}></div>
      <div ref={shapesRef} className="absolute inset-0"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]"></div>
    </div>
  );
}
