import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

export default function AboutMissionVision() {
  return (
    <section className="about-section" id="about">
      <div className="container about-grid">
        {/* Left Column: About Us */}
        <div className="about-left">
          <span className="section-eyebrow">
            <Sparkles size={13} />
            <span>ABOUT US</span>
          </span>
          <h2 className="section-heading">Connecting Talent with Opportunity</h2>
          <p className="section-subtitle">
            At Interskill Solutions, we believe that the right talent can drive business
            growth, and the right opportunity can shape a career. Our recruitment
            services focus on understanding employer requirements, identifying relevant
            candidates and supporting the hiring process.
          </p>
          <a href="#consultation" className="link-gold">
            <span>Read More</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Right Column: Mission Card */}
        <div className="mission-vision-cards" style={{ gridTemplateColumns: '1fr' }}>
          {/* Card: Our Mission */}
          <div className="mv-card mv-card--dark" style={{ justifyContent: 'center', minHeight: '180px' }}>
            <div className="mv-card__icon-wrap">
              <Compass size={32} />
            </div>
            <h3 className="mv-card__title" style={{ fontSize: '18px' }}>Our Mission</h3>
            <p className="mv-card__text" style={{ fontSize: '13.5px', lineHeight: '1.6' }}>
              To connect businesses with the right talent while helping individuals move
              forward in their careers through responsible, reliable and people-focused
              recruitment services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
