'use client';

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import FeedbackSection from './components/FeedbackSection';
import BrandsSection from './components/BrandsSection';
import AboutSection from './components/AboutSection';
import CustomProjectForm from './components/CustomProjectForm';
export default function HomePage() {
  return (
    <>
      <main className="space-y-20">
        <Navbar />
        <Hero />
        <Services />
        <Portfolio />
        <FeedbackSection />
        <BrandsSection />
        <AboutSection />
        <CustomProjectForm />
      </main>
      <footer className="w-full mt-20 py-8 bg-[var(--card-bg)] border-t border-[var(--card-border)] flex flex-col items-center gap-4">
        <p className="text-sm text-gray-400 font-mono">
          © {new Date().getFullYear()} Maison Web. Tous droits réservés.
        </p>
      </footer>
    </>
  );
}
