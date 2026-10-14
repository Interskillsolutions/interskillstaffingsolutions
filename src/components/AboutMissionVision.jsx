import React from 'react';
import { ArrowRight, Compass, Eye, Sparkles } from 'lucide-react';

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

        {/* Right Column: Mission and Vision Cards */}
        <div className="mission-vision-cards">
          {/* Card 1: Our Mission (Dark Navy) */}
          <div className="mv-card mv-card--dark">
            <div className="mv-card__icon-wrap">
              <Compass size={28} />
            </div>
            <h3 className="mv-card__title">Our Mission</h3>
            <p className="mv-card__text">
              To connect businesses with the right talent while helping individuals move
              forward in their careers.
            </p>
          </div>

          {/* Card 2: Our Vision (Pale Blue-Gray) */}
          <div className="mv-card mv-card--light">
            <div className="mv-card__icon-wrap">
              <Eye size={28} />
            </div>
            <h3 className="mv-card__title">Our Vision</h3>
            <p className="mv-card__text">
              To create meaningful connections between employers and candidates through
              responsible, reliable and people-focused recruitment services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
