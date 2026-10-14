import React, { useState } from 'react';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { faqs } from '../data/faqs';

export default function FAQSection() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="faq-section" id="faqs">
      <div className="container">
        {/* Header Row */}
        <div className="section-header-row">
          <div>
            <span className="section-eyebrow">
              <Sparkles size={13} />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </span>
            <h2 className="section-heading">Find Answers to Common Questions</h2>
          </div>
          <a href="#consultation" className="btn-outline-gold">
            <span>View All FAQs</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* 6 FAQs in 2-Column Grid */}
        <div className="faq-grid">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`faq-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={16} className="faq-chevron" />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="faq-answer-panel"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
