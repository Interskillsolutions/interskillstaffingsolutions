import React from 'react';
import { Briefcase, Users, TrendingUp } from 'lucide-react';

export default function JobSeekerHero() {
  return (
    <section className="js-hero" id="job-seekers-hero">
      <div className="container js-hero__grid">
        {/* Left Content */}
        <div className="js-hero__left">
          <span className="js-hero__eyebrow">FOR JOB SEEKERS</span>

          <h1 className="js-hero__headline">
            Find the Right<br />
            Opportunity for Your<br />
            Next <span className="js-hero__headline-gold">Career Move.</span>
          </h1>

          <p className="js-hero__description">
            Explore exciting job opportunities across leading companies. Submit your
            resume and take the next step towards a brighter future with InterSkill
            Staffing Solutions — Next Gen Hiring.
          </p>

          <div className="js-hero__benefits-row">
            <div className="js-hero__benefit-item">
              <Briefcase size={22} className="js-hero__benefit-icon" />
              <div className="js-hero__benefit-text">
                <span>Opportunities</span>
                <span>Across Industries</span>
              </div>
            </div>

            <div className="js-hero__benefit-item">
              <Users size={22} className="js-hero__benefit-icon" />
              <div className="js-hero__benefit-text">
                <span>For Freshers &</span>
                <span>Experienced Professionals</span>
              </div>
            </div>

            <div className="js-hero__benefit-item">
              <TrendingUp size={22} className="js-hero__benefit-icon" />
              <div className="js-hero__benefit-text">
                <span>Career Support</span>
                <span>at Every Step</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Photo Banner */}
        <div className="js-hero__right">
          <div className="js-hero__image-wrapper">
            <img
              src="/images/jobseeker-hero-photo.png"
              alt="Professional job seeker smiling at career opportunity"
              className="js-hero__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
