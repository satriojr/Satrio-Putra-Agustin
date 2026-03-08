import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { User, Code, Zap } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function About() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && contentRef.current && statsRef.current) {
      anime({
        targets: contentRef.current.children,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(150),
        easing: 'easeOutCubic'
      });

      anime({
        targets: statsRef.current.children,
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(150, { start: 400 }),
        easing: 'easeOutBack'
      });
    }
  }, [isInView]);

  return (
    <section id="about" className="py-24 relative z-10 bg-slate-900/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tentang Saya</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div ref={contentRef} className="space-y-6 text-lg text-slate-300 leading-relaxed">
            <p className="opacity-0">
              Saya adalah mahasiswa yang memiliki ketertarikan mendalam dalam dunia pemrograman dan teknologi.
              Meskipun masih dalam tahap pembelajaran, saya memiliki semangat yang tinggi untuk mengembangkan
              keterampilan dan pengetahuan dalam berbagai bahasa pemrograman.
            </p>
            <p className="opacity-0">
              Saya percaya bahwa teknologi adalah kunci masa depan dan selalu berusaha untuk tetap update
              dengan perkembangan terbaru dalam dunia programming. Dengan kombinasi antara teori yang
              dipelajari di kampus dan praktik yang terus saya kembangkan, saya siap untuk berkontribusi
              dalam proyek-proyek yang menantang.
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800/50 border border-white/5 p-6 rounded-2xl text-center opacity-0 hover:bg-slate-800 transition-colors shadow-lg">
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <User size={24} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">100%</h3>
              <p className="text-slate-400 text-sm uppercase tracking-wider font-medium">Dedikasi</p>
            </div>
            <div className="bg-slate-800/50 border border-white/5 p-6 rounded-2xl text-center opacity-0 hover:bg-slate-800 transition-colors shadow-lg">
              <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Code size={24} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">24/7</h3>
              <p className="text-slate-400 text-sm uppercase tracking-wider font-medium">Belajar</p>
            </div>
            <div className="bg-slate-800/50 border border-white/5 p-6 rounded-2xl text-center opacity-0 hover:bg-slate-800 transition-colors col-span-2 shadow-lg">
              <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">â</h3>
              <p className="text-slate-400 text-sm uppercase tracking-wider font-medium">Potensi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
