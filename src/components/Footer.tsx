import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-8 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Portfolio Satrio Putra Agustin. Dibuat dengan ❤️ dan semangat belajar.
        </p>
      </div>
    </footer>
  );
}
