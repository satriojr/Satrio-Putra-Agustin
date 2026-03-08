import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MapPin, ExternalLink, Loader2, Navigation, Map } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import anime from 'animejs';
import ReactMarkdown from 'react-markdown';

export default function Location() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [data, setData] = useState<{ text: string; places: any[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && !data && !loading && !error) {
      fetchLocationData();
    }
  }, [isInView]);

  useEffect(() => {
    if (data && contentRef.current) {
      anime({
        targets: contentRef.current.children,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(200),
        easing: 'easeOutCubic'
      });
    }
  }, [data]);

  const fetchLocationData = async () => {
    setLoading(true);
    setError('');
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API Key tidak ditemukan.');
      }
      
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'Berikan deskripsi singkat dan menarik tentang kota Kudus, Jawa Tengah (kota kretek) sebagai tempat tinggal seorang developer. Sebutkan 3-4 tempat ikonik, wisata, atau kuliner terkenal di sana.',
        config: {
          tools: [{ googleMaps: {} }],
        },
      });

      const text = response.text || '';
      
      // Menggunakan link referensi yang diberikan oleh user
      const places: any[] = [
        {
          title: "Wisata Alam & Sejarah Kudus",
          uri: "https://www.google.com/search?q=tempat+menarik+kudus&oq=tempat+menarik+kudus&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQLhhA0gEINDIyOGowajGoAgCwAgA&sourceid=chrome&ie=UTF-8#",
          type: "web"
        },
        {
          title: "Kuliner Khas Kudus",
          uri: "https://www.google.com/search?q=tempat+menarik+kudus&oq=tempat+menarik+kudus&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQLhhA0gEINDIyOGowajGoAgCwAgA&sourceid=chrome&ie=UTF-8#",
          type: "web"
        },
        {
          title: "Menara Kudus & Sekitarnya",
          uri: "https://www.google.com/search?q=tempat+menarik+kudus&oq=tempat+menarik+kudus&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQLhhA0gEINDIyOGowajGoAgCwAgA&sourceid=chrome&ie=UTF-8#",
          type: "web"
        },
        {
          title: "Pusat Oleh-oleh & Rekreasi",
          uri: "https://www.google.com/search?q=tempat+menarik+kudus&oq=tempat+menarik+kudus&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQLhhA0gEINDIyOGowajGoAgCwAgA&sourceid=chrome&ie=UTF-8#",
          type: "web"
        }
      ];

      setData({ text, places });
    } catch (err: any) {
      console.error(err);
      setError('Gagal memuat data lokasi dari Google Maps.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="location" className="py-24 relative z-10 bg-slate-900/40" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <MapPin className="text-pink-500" size={36} />
            Lokasi Saya: Kudus
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-slate-800/40 border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm min-h-[300px] flex flex-col justify-center">
          {loading && (
            <div className="flex flex-col items-center justify-center text-slate-400 space-y-4 py-12">
              <Loader2 className="animate-spin text-pink-500" size={48} />
              <p className="animate-pulse font-medium">Memuat data dari Google Maps...</p>
            </div>
          )}

          {error && (
            <div className="text-center text-red-400 py-12">
              <p>{error}</p>
              <button 
                onClick={fetchLocationData}
                className="mt-6 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors shadow-lg"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {data && (
            <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="opacity-0 space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Map className="text-pink-500" size={28} />
                  Tentang Kudus
                </h3>
                <div className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed">
                  <ReactMarkdown>{data.text}</ReactMarkdown>
                </div>
              </div>

              <div className="opacity-0 space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Navigation className="text-pink-500" size={28} />
                  Tempat Menarik & Referensi
                </h3>
                
                {data.places.length > 0 ? (
                  <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {data.places.map((place, idx) => (
                      <a 
                        key={idx}
                        href={place.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-5 bg-slate-900/50 rounded-xl border border-white/5 hover:border-pink-500/50 hover:bg-slate-800 transition-all shadow-md"
                        style={{ cursor: 'none' }}
                      >
                        <div className="flex-1 pr-4">
                          <h4 className="text-white font-medium group-hover:text-pink-400 transition-colors line-clamp-2">
                            {place.title}
                          </h4>
                          <span className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                            {place.type === 'maps' ? 'Google Maps' : 'Web Source'}
                          </span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors shrink-0 shadow-inner">
                          <ExternalLink size={20} />
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 bg-slate-900/50 rounded-xl border border-white/5 text-center">
                    <p className="text-slate-400 italic">Tidak ada tautan tempat yang ditemukan.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
