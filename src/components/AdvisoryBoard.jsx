import React from 'react';
import { ArrowRight, Sparkles, UserCheck } from 'lucide-react';
// import { advisors } from '../data/advisors';

export const teamMembers = [
  {
    id: 'team-priya',
    name: "Priya Ma'am",
    role: 'CEO',
    image: '/images/team-priya.jpg',
  },
  {
    id: 'team-shreyash',
    name: 'Shreyash Shirekar',
    role: 'Talent Acquisition & Business Development',
    image: '/images/team-shreyash.jpg',
  },
  {
    id: 'team-sahil',
    name: 'Sahil More',
    role: 'Recruitment Specialist',
    image: '/images/team-sahil.jpg',
  },
  {
    id: 'team-priyanka',
    name: 'Priyanka Guhagarkar',
    role: 'Talent Acquisition Executive',
    image: '/images/team-priyanka.png',
  },
  {
    id: 'team-madhubabu',
    name: 'Madhubabu Gentyala',
    role: 'Operations & Technical Lead',
    image: '/images/team-madhubabu.png',
  },
];

export default function AdvisoryBoard() {
  return (
    <section className="advisory-section" id="advisory-board">
      <div className="container">
        {/* =========================================================================
            NOTE: "Guidance from Industry Experts / Our Advisory Board" is commented
            out below per user request and will be restored whenever requested.
            ========================================================================= */}
        {/*
        <div className="section-header-row">
          <div>
            <span className="section-eyebrow">
              <Sparkles size={13} />
              <span>OUR ADVISORY BOARD</span>
            </span>
            <h2 className="section-heading">Guidance from Industry Experts</h2>
            <p className="section-subtitle">
              Our advisory board comprises experienced professionals who provide valuable insights to help us deliver better opportunities.
            </p>
          </div>
          <a href="#about" className="btn-outline-gold">
            <span>Know Our Advisory Board</span>
            <ArrowRight size={14} />
          </a>
        </div>

        <div className="advisory-grid">
          {advisors.map((advisor) => (
            <div key={advisor.id} className="advisor-card">
              <img
                src={advisor.image}
                alt={advisor.name}
                className="advisor-card__photo"
              />
              <div className="advisor-card__info">
                <span className="advisor-card__name">{advisor.name}</span>
                <span className="advisor-card__role">{advisor.role}</span>
                <span className="advisor-card__domain">{advisor.domain}</span>
              </div>
            </div>
          ))}
        </div>
        */}

        {/* KEY LEADERSHIP & TEAM SECTION */}
        <div className="section-header-row">
          <div>
            <span className="section-eyebrow">
              <Sparkles size={13} />
              <span>KEY LEADERSHIP & TEAM</span>
            </span>
            <h2 className="section-heading">Meet Our Key Leadership & Team</h2>
            <p className="section-subtitle">
              The experienced leadership and passionate professionals driving Interskill Staffing Solutions — Next Gen Hiring.
            </p>
          </div>
          <a href="#consultation" className="btn-outline-gold">
            <span>Connect with Our Team</span>
            <ArrowRight size={14} />
          </a>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '18px',
            marginTop: '28px',
          }}
        >
          {teamMembers.map((member) => (
            <div
              key={member.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg, 12px)',
                padding: '24px 18px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: 'var(--shadow-subtle)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '82px',
                  height: '82px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginBottom: '14px',
                  boxShadow: '0 6px 16px rgba(7, 29, 58, 0.16)',
                  border: '3px solid var(--color-gold)',
                  backgroundColor: '#F0F4F9',
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              <h4
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'var(--color-primary-navy)',
                  margin: '0 0 6px 0',
                  lineHeight: 1.25,
                }}
              >
                {member.name}
              </h4>

              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--color-gold)',
                  lineHeight: 1.35,
                }}
              >
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
