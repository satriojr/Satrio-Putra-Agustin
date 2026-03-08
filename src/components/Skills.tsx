import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { useInView } from '../hooks/useInView';

export default function Skills() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && skillsRef.current) {
      anime({
        targets: '.skill-card',
        scale: [0.8, 1],
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(100),
        easing: 'easeOutElastic(1, .8)'
      });

      anime({
        targets: '.skill-progress',
        width: (el: HTMLElement) => el.getAttribute('data-level') + '%',
        duration: 1500,
        delay: anime.stagger(100, { start: 500 }),
        easing: 'easeOutQuart'
      });
    }
  }, [isInView]);

  const skills = [
    {
      category: "Bahasa Pemrograman",
      items: [
        { name: "HTML5", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "JavaScript", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Python", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Java", level: 65, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" }
      ]
    },
    {
      category: "Framework & Tools",
      items: [
        { name: "React", level: 60, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Node.js", level: 55, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Git", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "Bootstrap", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
        { name: "Tailwind CSS", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 relative z-10 bg-slate-900/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Teknologi</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12" ref={skillsRef}>
          {skills.map((skillGroup, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center md:text-left">{skillGroup.category}</h3>
              <div className="space-y-4">
                {skillGroup.items.map((skill, i) => (
                  <div key={i} className="skill-card bg-slate-800/40 border border-white/5 p-4 rounded-xl opacity-0 flex items-center gap-4 hover:bg-slate-800/60 transition-colors shadow-md">
                    <img src={skill.icon} alt={skill.name} className="w-8 h-8" />
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-slate-200">{skill.name}</span>
                        <span className="text-slate-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div 
                          className="skill-progress h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-0 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                          data-level={skill.level}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
