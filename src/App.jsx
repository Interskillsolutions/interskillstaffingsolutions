import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AudienceCards from './components/AudienceCards';
import ConsultationSection from './components/ConsultationSection';
import IndustriesSection from './components/IndustriesSection';
import RecruitmentProcess from './components/RecruitmentProcess';
import JobOpenings from './components/JobOpenings';
import AdvisoryBoard from './components/AdvisoryBoard';
import Testimonials from './components/Testimonials';
import AboutMissionVision from './components/AboutMissionVision';
import CallbackSection from './components/CallbackSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

// Pages
import JobSeekers from './pages/JobSeekers';
import Employers from './pages/Employers';
import AdminLayout from './admin/AdminLayout';

import './styles/variables.css';
import './styles/global.css';
import './styles/sections.css';

export default function App() {
  const getInitialPage = () => {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    if (hash.includes('admin') || path.includes('admin')) {
      return 'admin';
    }
    if (hash.includes('job-seeker') || path.includes('job-seeker')) {
      return 'job-seekers';
    }
    if (hash.includes('employer') || path.includes('employer')) {
      return 'employers';
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash.includes('admin') || path.includes('admin')) {
        setCurrentPage('admin');
      } else if (hash.includes('job-seeker') || path.includes('job-seeker')) {
        setCurrentPage('job-seekers');
      } else if (hash.includes('employer') || path.includes('employer')) {
        setCurrentPage('employers');
      } else if (hash === '' || hash === '#home' || hash === '#/' || path === '/') {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    if (page === 'job-seekers') {
      window.location.hash = '#/job-seekers';
    } else if (page === 'employers') {
      window.location.hash = '#/employers';
    } else if (page === 'admin') {
      window.location.hash = '#/admin';
    } else {
      window.location.hash = '#/';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'admin') {
    return <AdminLayout onNavigate={navigateTo} />;
  }

  if (currentPage === 'job-seekers') {
    return <JobSeekers onNavigate={navigateTo} />;
  }

  if (currentPage === 'employers') {
    return <Employers onNavigate={navigateTo} />;
  }

  return (
    <div className="homepage-root">
      {/* SECTION 1: HEADER / NAVIGATION */}
      <Header
        activePage="home"
        ctaLabel="Get Started"
        ctaHref="#consultation"
        onNavigate={navigateTo}
      />

      <main>
        {/* SECTION 2: HERO BANNER */}
        <Hero onNavigate={navigateTo} />

        {/* SECTION 3: JOB SEEKERS AND EMPLOYERS */}
        <AudienceCards onNavigate={navigateTo} />

        {/* SECTION 4: FREE CONSULTATION FORM */}
        <ConsultationSection />

        {/* SECTION 5: INDUSTRIES WE SERVE */}
        <IndustriesSection />

        {/* SECTION 6: OUR RECRUITMENT PROCESS */}
        <RecruitmentProcess />

        {/* SECTION 7: CURRENT JOB OPENINGS */}
        <JobOpenings />

        {/* SECTION 8: ADVISORY BOARD */}
        <AdvisoryBoard />

        {/* SECTION 9: PLACEMENTS AND REVIEWS */}
        <Testimonials />

        {/* SECTION 10: ABOUT US, MISSION AND VISION */}
        <AboutMissionVision />

        {/* SECTION 11: CALLBACK BANNER */}
        <CallbackSection />

        {/* SECTION 12: FREQUENTLY ASKED QUESTIONS */}
        <FAQSection />
      </main>

      {/* SECTION 13: FOOTER */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
