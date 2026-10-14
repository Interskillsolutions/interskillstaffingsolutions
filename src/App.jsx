import React from 'react';
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

import './styles/variables.css';
import './styles/global.css';
import './styles/sections.css';

export default function App() {
  return (
    <div className="homepage-root">
      {/* SECTION 1: HEADER / NAVIGATION */}
      <Header />

      <main>
        {/* SECTION 2: HERO BANNER */}
        <Hero />

        {/* SECTION 3: JOB SEEKERS AND EMPLOYERS */}
        <AudienceCards />

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
      <Footer />
    </div>
  );
}
