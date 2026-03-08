import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { ExternalLink, Github, Monitor, Calculator, CheckSquare, Gamepad2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function Projects() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && gridRef.current) {
      anime({
        targets: '.project-card',
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(150),
        easing: 'easeOutCubic'
      });
    }
  }, [isInView]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.project-icon');
    
    // Card animation
    anime({
      targets: card,
      scale: 1.03,
      translateY: -10,
      boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.25)',
      duration: 400,
      easing: 'easeOutElastic(1, .8)'
    });

    if (icon) {
      anime({
        targets: icon,
        scale: [1, 1.2],
        rotate: '1turn',
        duration: 800,
        easing: 'easeOutElastic(1, .5)'
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.project-icon');
    
    // Card animation reset
    anime({
      targets: card,
      scale: 1,
      translateY: 0,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', // default shadow-xl
      duration: 600,
      easing: 'easeOutQuad'
    });

    if (icon) {
      anime({
        targets: icon,
        scale: 1,
        rotate: 0,
        duration: 600,
        easing: 'easeOutQuad'
      });
    }
  };

  const projects = [
    {
      title: "Website Portfolio",
      description: "Website portfolio pribadi yang responsif dengan animasi modern menggunakan React, Tailwind CSS, dan Anime.js.",
      icon: <Monitor size={48} />,
      tech: ["React", "Tailwind CSS", "Anime.js"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Kalkulator Web",
      description: "Aplikasi kalkulator sederhana dengan interface yang user-friendly dan fitur perhitungan dasar.",
      icon: <Calculator size={48} />,
      tech: ["HTML", "CSS", "JavaScript"],
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Todo List App",
      description: "Aplikasi todo list dengan fitur CRUD sederhana untuk mengelola tugas harian secara efisien.",
      icon: <CheckSquare size={48} />,
      tech: ["React", "CSS", "LocalStorage"],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Game Tic Tac Toe",
      description: "Game tic tac toe klasik dengan interface yang menarik dan logika permainan yang solid.",
      icon: <Gamepad2 size={48} />,
      tech: ["HTML", "CSS", "JavaScript"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="projects" className="py-24 relative z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Proyek Saya</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8" ref={gridRef}>
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="project-card opacity-0 bg-slate-800/30 border border-white/5 rounded-2xl overflow-hidden group hover:border-indigo-500/30 transition-colors shadow-xl"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="project-icon text-white drop-shadow-lg relative z-10">
                  {project.icon}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                <p className="text-slate-400 mb-6 line-clamp-3 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium bg-slate-900 text-slate-300 rounded-full border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a href="#" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white text-slate-900 rounded-lg font-medium hover:bg-indigo-50 transition-colors shadow-md">
                    <ExternalLink size={16} />
                    Demo
                  </a>
                  <a href="#" className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-white/20 text-white rounded-lg font-medium hover:bg-white/5 transition-colors">
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
