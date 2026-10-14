import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { advisors } from '../data/advisors';

export default function AdvisoryBoard() {
  return (
    <section className="advisory-section" id="advisory-board">
      <div className="container">
        {/* Header Row */}
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

        {/* 4 Advisors Row */}
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
      </div>
    </section>
  );
}
