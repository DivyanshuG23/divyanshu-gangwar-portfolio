import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { TechnicalBackground } from './components/TechnicalBackground';
import { NeuralMatrixBackground } from './components/NeuralMatrixBackground';
import { useScrollRestoration } from './hooks/useScrollRestoration';

export const App: React.FC = () => {
  useScrollRestoration();

  return (
    <div className="min-h-screen bg-[#090909] text-[#F4F5F0] selection:bg-neutral-800 selection:text-white relative">
      {/* Unified Technical Background System */}
      <TechnicalBackground />
      {/* Interactive Neural Matrix Canvas Layer */}
      <NeuralMatrixBackground />

      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#F4F5F0] focus:text-[#090909] focus:rounded-md focus:text-xs focus:font-mono focus:font-medium focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Content: Exactly 8 Sections */}
      <main id="main-content">
        {/* 1. Home */}
        <Hero />

        {/* 2. About */}
        <About />

        {/* 3. Education */}
        <Education />

        {/* 4. Skills */}
        <Skills />

        {/* 5. Experience */}
        <Experience />

        {/* 6. Projects */}
        <Projects />

        {/* 7. Certifications */}
        <Certifications />

        {/* 8. Contact */}
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;
