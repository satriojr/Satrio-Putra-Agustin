/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Location from './components/Location';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen font-sans selection:bg-indigo-500/30">
      <CustomCursor />
      <BackgroundEffects />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
