import React from 'react';
import { ArrowRight, Star, Sparkles, Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        {/* Header Row */}
        <div className="section-header-row">
          <div>
            <span className="section-eyebrow">
              <Sparkles size={13} />
              <span>PLACEMENTS & REVIEWS</span>
            </span>
            <h2 className="section-heading">Success Stories That Inspire</h2>
            <p className="section-subtitle">
              Hear from professionals and employers who have found the right opportunities with us.
            </p>
          </div>
          <a href="#consultation" className="btn-outline-gold">
            <span>View More Reviews</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* 2 Testimonials Grid */}
        <div className="reviews-grid">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-card">
              <img
                src={item.image}
                alt={item.name}
                className="testimonial-card__avatar"
              />
              <div className="testimonial-card__content">
                <div className="testimonial-quote-wrap">
                  <span className="testimonial-quote__mark">“ </span>
                  <span className="testimonial-quote">{item.quote}</span>
                  <span className="testimonial-quote__mark"> ”</span>
                </div>

                <div className="testimonial-meta-row">
                  <div className="testimonial-author">
                    <span className="testimonial-author__name">{item.name}</span>
                    <span className="testimonial-author__role">{item.role}</span>
                  </div>

                  <div className="testimonial-stars" aria-label={`${item.rating} out of 5 stars`}>
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#D9B45E" stroke="#D9B45E" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
