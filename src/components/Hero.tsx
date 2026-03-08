import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { ArrowRight, Code2 } from 'lucide-react';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = anime.timeline({
      easing: 'easeOutExpo',
    });

    if (titleRef.current) {
      // Split text for staggered animation
      const text = titleRef.current.innerHTML;
      // We need to be careful not to split HTML tags, so we'll just animate the whole block or words
      // For simplicity and safety with React, we'll animate the container
      tl.add({
        targets: titleRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1200,
      });
    }

    tl.add({
      targets: subtitleRef.current,
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800,
    }, '-=800')
    .add({
      targets: buttonsRef.current?.children,
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(150),
    }, '-=600')
    .add({
      targets: iconRef.current,
      scale: [0.8, 1],
      opacity: [0, 1],
      rotate: [-10, 0],
      duration: 1200,
      easing: 'easeOutElastic(1, .8)'
    }, '-=1000');

    // Continuous floating animation for the icon
    if (iconRef.current) {
      anime({
        targets: iconRef.current,
        translateY: [-15, 15],
        rotate: [-3, 3],
        duration: 4000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    }

  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        <div className="space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            Available for new opportunities
          </div>
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold leading-tight tracking-tight opacity-0">
            Halo, Saya <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Satrio Putra Agustin</span>
          </h1>
          <p ref={subtitleRef} className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed opacity-0">
            Passionate dalam pengembangan teknologi dan selalu bersemangat untuk belajar hal-hal baru. Membangun pengalaman digital yang menarik.
          </p>
          <div ref={buttonsRef} className="flex flex-wrap gap-4">
            <a href="#projects" className="opacity-0 px-8 py-4 rounded-full bg-white text-slate-900 font-semibold hover:bg-indigo-50 transition-colors flex items-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Lihat Proyek
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="opacity-0 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors">
              Hubungi Saya
            </a>
          </div>
        </div>
        
        <div className="hidden md:flex justify-center items-center relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div ref={iconRef} className="relative w-72 h-72 md:w-96 md:h-96 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 opacity-0">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl"></div>
            <Code2 size={120} className="text-indigo-400 drop-shadow-[0_0_30px_rgba(129,140,248,0.6)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
