import React, { useEffect, useState } from 'react';
import { useRouter, Link } from './lib/router';
import HeroCanvas from './components/HeroCanvas';
import LeftRail from './components/LeftRail';
import ConnectionIntro from './components/ConnectionIntro';
import AccessibilityMenu from './components/AccessibilityMenu';
import ChatBuddy from './components/ChatBuddy';
import ProjectModal from './components/ProjectModal';
import CertificateModal from './components/CertificateModal';
import ResumeModal from './components/ResumeModal';

import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import LabPage from './pages/LabPage';
import CertificatesPage from './pages/CertificatesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const VIEW_COUNTER_API = 'https://page-views-api.ratneshc.com/api/v1';
const VIEW_COUNTER_SITE = 'earlnis.dev';
const VIEW_COUNTER_PATH = '/';

export default function App() {
  const { path } = useRouter();
  const [visitorCount, setVisitorCount] = useState(null);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeCertIndex, setActiveCertIndex] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const handleOpenResume = () => setIsResumeOpen(true);
    window.addEventListener('open-resume', handleOpenResume);
    return () => window.removeEventListener('open-resume', handleOpenResume);
  }, []);

  useEffect(() => {
    let active = true;
    const host = window.location.hostname.toLowerCase();
    const isLocal =
      import.meta.env.DEV || host === 'localhost' || host === '127.0.0.1' || host === '::1';

    const params = new URLSearchParams({ site: VIEW_COUNTER_SITE, path: VIEW_COUNTER_PATH });
    const query = params.toString();

    const readGlobalViews = async () => {
      try {
        const res = await fetch(`${VIEW_COUNTER_API}/views?${query}`, { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        const views = Number(data.views);
        if (active && Number.isSafeInteger(views) && views >= 0) {
          setVisitorCount(views);
        }
      } catch {
        // Keep fallback label when offline.
      }
    };

    const run = async () => {
      if (!isLocal) {
        try {
          await fetch(`${VIEW_COUNTER_API}/track?${query}`, { cache: 'no-store', keepalive: true });
        } catch {
          // Ignore tracking error and still read total.
        }
      }
      await readGlobalViews();
    };

    run();
    const timer = window.setInterval(readGlobalViews, 60000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const renderPage = () => {
    switch (path) {
      case '/':
        return (
          <HomePage
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenProject={(id) => setActiveProjectId(id)}
          />
        );
      case '/projects':
        return <ProjectsPage onOpenProject={(id) => setActiveProjectId(id)} />;
      case '/services':
        return <ServicesPage />;
      case '/lab':
        return <LabPage onOpenProject={(id) => setActiveProjectId(id)} />;
      case '/certificates':
        return <CertificatesPage onOpenCertificate={(idx) => setActiveCertIndex(idx)} />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage onOpenResume={() => setIsResumeOpen(true)} />;
      default:
        return (
          <section className="page-view page-notfound">
            <div className="sweep-glass notfound-box">
              <span className="view__eyebrow">404</span>
              <h2 className="view__title">Page not found.</h2>
              <p className="view__lede">That route doesn&apos;t exist on this portfolio.</p>
              <Link to="/" className="home__cta">
                <span>Back to Home</span>
              </Link>
            </div>
          </section>
        );
    }
  };

  return (
    <>
      <div className="shell">
        <HeroCanvas />

      <a className="skip-link" href="#shell-panel">
        Skip to main content
      </a>

      <LeftRail
        visitorCount={visitorCount}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <main id="shell-panel" className="shell__panel" tabIndex={-1}>
        <div key={path} className="shell__route">
          {renderPage()}
        </div>
      </main>

      <AccessibilityMenu />

      <ChatBuddy onOpenResume={() => setIsResumeOpen(true)} />

      <ProjectModal
        projectId={activeProjectId}
        onSelectProject={(id) => setActiveProjectId(id)}
        onClose={() => setActiveProjectId(null)}
      />

      <CertificateModal
        certIndex={activeCertIndex}
        onSelectIndex={(idx) => setActiveCertIndex(idx)}
        onClose={() => setActiveCertIndex(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
      </div>

      {showIntro && <ConnectionIntro onDone={() => setShowIntro(false)} />}
    </>
  );
}
