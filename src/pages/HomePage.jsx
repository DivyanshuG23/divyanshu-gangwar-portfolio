import React from 'react';
import Hero from '../components/hero/Hero';
import ProjectsSection from '../components/projects/ProjectsSection';
import AboutSection from '../components/about/AboutSection';
import EducationSection from '../components/education/EducationSection';
import CertificationsSection from '../components/certifications/CertificationsSection';
import ContactSection from '../components/contact/ContactSection';

/**
 * HomePage
 * Mounts the primary cinematic Hero section, the premium Featured Projects showcase,
 * the Developer Profile Dossier, the Academic Education Dossier, the Professional Certifications,
 * and the Direct Communication Contact section.
 */
export default function HomePage() {
  return (
    <div className="w-full">
      {/* Primary Visual Hero Section */}
      <Hero />

      {/* Featured Projects Showcase Anchored at #work */}
      <ProjectsSection />

      {/* About & Developer Profile Dossier Anchored at #about */}
      <AboutSection />

      {/* Academic Education Dossier Anchored at #education */}
      <EducationSection />

      {/* Professional Certifications & Accreditations Anchored at #certifications */}
      <CertificationsSection />

      {/* Premium Contact & Direct Communication Anchored at #contact */}
      <ContactSection />
    </div>
  );
}
