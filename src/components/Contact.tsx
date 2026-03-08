import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, Twitter } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function Contact() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isInView) {
      if (infoRef.current) {
        anime({
          targets: infoRef.current.children,
          translateX: [-30, 0],
          opacity: [0, 1],
          duration: 800,
          delay: anime.stagger(150),
          easing: 'easeOutCubic'
        });
      }
      if (formRef.current) {
        anime({
          targets: formRef.current,
          translateX: [30, 0],
          opacity: [0, 1],
          duration: 800,
          easing: 'easeOutCubic'
        });
      }
    }
  }, [isInView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const btn = e.currentTarget.querySelector('button');
    if (btn) {
      // Complex elastic animation for visual feedback
      anime.timeline({
        easing: 'easeOutElastic(1, .6)'
      })
      .add({
        targets: btn,
        scaleX: [1, 0.95],
        scaleY: [1, 0.85],
        duration: 200,
        easing: 'easeOutQuad',
        begin: () => setIsSubmitting(true)
      })
      .add({
        targets: btn,
        scaleX: 1,
        scaleY: 1,
        duration: 800
      });
    } else {
      setIsSubmitting(true);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      alert('Pesan berhasil dikirim! Terima kasih telah menghubungi saya.');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const handleSocialHover = (e: React.MouseEvent<HTMLAnchorElement>, isHovering: boolean) => {
    anime({
      targets: e.currentTarget,
      scale: isHovering ? 1.15 : 1,
      translateY: isHovering ? -5 : 0,
      backgroundColor: isHovering ? '#6366f1' : '#1e293b', // indigo-500 vs slate-800
      color: isHovering ? '#ffffff' : '#94a3b8', // white vs slate-400
      boxShadow: isHovering ? '0 10px 15px -3px rgba(99, 102, 241, 0.3)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      duration: 400,
      easing: 'easeOutElastic(1, .6)'
    });
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-slate-900/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hubungi Saya</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div ref={infoRef} className="space-y-8">
            <div className="opacity-0">
              <h3 className="text-2xl font-bold text-white mb-4">Mari Berkolaborasi!</h3>
              <p className="text-slate-400 leading-relaxed">
                Saya selalu terbuka untuk kesempatan belajar dan berkolaborasi dalam proyek-proyek menarik.
                Jangan ragu untuk menghubungi saya!
              </p>
            </div>

            <div className="space-y-6 opacity-0">
              <div className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-white/5 hover:bg-slate-800/60 transition-colors shadow-md">
                <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-400">Email</h4>
                  <p className="text-white font-medium">satrioxpz@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-white/5 hover:bg-slate-800/60 transition-colors shadow-md">
                <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-400">Telepon</h4>
                  <p className="text-white font-medium">+62 896-3530-2400</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-white/5 hover:bg-slate-800/60 transition-colors shadow-md">
                <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-400">Lokasi</h4>
                  <p className="text-white font-medium">Kudus, Jawa Tengah, Indonesia</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 opacity-0">
              <a 
                href="https://github.com/satriojr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center shadow-lg"
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/satrio-agustin-5b747a369" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center shadow-lg"
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.instagram.com/satrioxpz_/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center shadow-lg"
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://x.com/satrioxpz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center shadow-lg"
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://www.tiktok.com/@satrioxpz?is_from_webapp=1&sender_device=pc" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center shadow-lg"
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="bg-slate-800/40 p-8 rounded-2xl border border-white/5 opacity-0 shadow-xl">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-400 mb-2">Subjek</label>
                <input 
                  type="text" 
                  id="subject" 
                  required
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  placeholder="Peluang Kerjasama"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Pesan</label>
                <textarea 
                  id="message" 
                  rows={4}
                  required
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-500/20"
              >
                {isSubmitting ? 'Mengirim...' : (
                  <>
                    Kirim Pesan
                    <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
