import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { GraduationCap, Calendar } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function Education() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && timelineRef.current) {
      anime({
        targets: '.timeline-item',
        translateX: (el: any, i: number) => i % 2 === 0 ? [-50, 0] : [50, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(200),
        easing: 'easeOutCubic'
      });
      
      anime({
        targets: '.timeline-line',
        height: ['0%', '100%'],
        duration: 1500,
        easing: 'easeInOutSine'
      });
    }
  }, [isInView]);

  const educationData = [
    {
      title: "Mahasiswa Aktif",
      institution: "Universitas Muria Kudus",
      period: "2025 - Sekarang",
      major: "Teknik Informatika",
      points: [
        "Fokus pada pengembangan aplikasi web dan mobile",
        "Aktif dalam organisasi kampus",
        "Mengikuti berbagai workshop dan seminar teknologi"
      ]
    },
    {
      title: "SMA",
      institution: "SMA NEGERI 1 PATI",
      period: "2021 - 2025",
      major: "Jurusan IPA",
      points: [
        "Lulus dengan nilai yang memuaskan",
        "Memiliki hobi programming",
        "Aktif dalam organisasi dalam maupun luar sekolah"
      ]
    }
  ];

  return (
    <section id="education" className="py-24 relative z-10" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pendidikan</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative" ref={timelineRef}>
          {/* Central Line */}
          <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500 transform md:-translate-x-1/2 origin-top"></div>

          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <div key={index} className={`timeline-item relative flex flex-col md:flex-row items-start opacity-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-slate-950 transform -translate-x-1/2 mt-6 md:mt-0 z-10 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                
                {/* Content */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                  <div className="bg-slate-800/40 backdrop-blur-sm border border-white/5 p-6 md:p-8 rounded-2xl hover:bg-slate-800/60 transition-colors group shadow-xl">
                    <div className={`flex items-center gap-2 mb-2 text-indigo-400 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <GraduationCap size={20} />
                      <h3 className="text-xl font-bold text-white">{edu.title}</h3>
                    </div>
                    <h4 className="text-lg text-slate-300 mb-2">{edu.institution}</h4>
                    <div className={`flex items-center gap-2 text-sm text-slate-400 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <Calendar size={14} />
                      <span>{edu.period}</span>
                    </div>
                    <p className="text-indigo-300 font-medium mb-4">{edu.major}</p>
                    <ul className="space-y-2 text-slate-400">
                      {edu.points.map((point, i) => (
                        <li key={i} className={`flex items-start gap-2 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                          <span className="text-indigo-500 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
