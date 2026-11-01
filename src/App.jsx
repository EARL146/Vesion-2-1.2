import React, { useState, useEffect } from 'react';
import HeroCanvas from './components/HeroCanvas';
import LeftRail from './components/LeftRail';
import BentoGrid from './components/BentoGrid';
import ProjectBarrel from './components/ProjectBarrel';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import SkillsSection from './components/SkillsSection';
import CredentialsSection from './components/CredentialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ChatBuddy from './components/ChatBuddy';
import ResumeModal from './components/ResumeModal';

const VIEW_COUNTER_API = 'https://page-views-api.ratneshc.com/api/v1';
const VIEW_COUNTER_SITE = 'earlnis.dev';
const VIEW_COUNTER_PATH = '/';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [visitorCount, setVisitorCount] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const handleOpenResume = () => setIsResumeOpen(true);
    window.addEventListener('open-resume', handleOpenResume);
    return () => window.removeEventListener('open-resume', handleOpenResume);
  }, []);

  useEffect(() => {
    const host = window.location.hostname.toLowerCase();
    if (import.meta.env.DEV || host === 'localhost' || host === '127.0.0.1' || host === '::1') return undefined;

    let active = true;
    const params = new URLSearchParams({ site: VIEW_COUNTER_SITE, path: VIEW_COUNTER_PATH });
    const query = params.toString();

    const readGlobalViews = async () => {
      try {
        const response = await fetch(`${VIEW_COUNTER_API}/views?${query}`, { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        const views = Number(data.views);
        if (active && Number.isSafeInteger(views) && views >= 0) setVisitorCount(views);
      } catch {
        // Keep the count unavailable if the shared counter cannot be reached.
      }
    };

    const trackPageView = async () => {
      try {
        await fetch(`${VIEW_COUNTER_API}/track?${query}`, { cache: 'no-store', keepalive: true });
      } catch {
        // Still try to read the shared total if only the tracking request failed.
      }
      await readGlobalViews();
    };

    trackPageView();
    const refreshTimer = window.setInterval(readGlobalViews, 60_000);

    return () => {
      active = false;
      window.clearInterval(refreshTimer);
    };
  }, []);

  // Track active section for sidebar highlighting
  useEffect(() => {
    const sectionIds = ['overview', 'versions', 'barrel', 'projects', 'services', 'skills', 'credentials', 'contact'];
    
    const handleScroll = () => {
      const activeLine = Math.min(window.innerHeight * 0.32, 240);
      let current = 'overview';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= activeLine) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="app-container">
      {/* Three.js Generative Noise Background */}
      <HeroCanvas />

      {/* Desktop Sticky Rail / Mobile Navigation */}
      <a className="skip-link" href="#main-content">Skip to content</a>
      <LeftRail 
        activeSection={activeSection} 
        visitorCount={visitorCount} 
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="main-content" id="main-content" tabIndex="-1">
        <BentoGrid />
        <ProjectBarrel />
        <ProjectsSection />
        <ServicesSection />
        <SkillsSection />
        <CredentialsSection />
        <ContactSection />
        <Footer />
      </main>

      {/* Floating Interactive EarlBot Mascot */}
      <ChatBuddy />

      {/* Official Executive Resume Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
    </div>
  );
}
