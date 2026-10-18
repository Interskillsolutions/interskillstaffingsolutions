import React from 'react';
import { Sparkles } from 'lucide-react';

const leadershipMembers = [
  {
    name: 'Dr. Priya Gawade',
    role: 'Founder / Managing Director',
    responsibility: 'Business Strategy & Growth',
    image: '/images/team-priya.jpg',
  },
  {
    name: 'Mr. Rajesh Sharma',
    role: 'Head - Operations',
    responsibility: 'Talent Acquisition & Delivery',
    image: '/images/advisor-rajesh.png',
  },
  {
    name: 'Ms. Neha Kulkarni',
    role: 'Head - Client Relations',
    responsibility: 'Business Development',
    image: '/images/advisor-neha.png',
  },
  {
    name: 'Mr. Amit Deshpande',
    role: 'Head - Strategy',
    responsibility: 'Finance & Administration',
    image: '/images/advisor-amit.png',
  },
];

export default function LeadershipTeam() {
  return (
    <section className="leadership-section" id="leadership-team">
      <div className="container">
        <div className="leadership-header">
          <div className="leadership-eyebrow">
            <Sparkles size={13} style={{ display: 'inline', marginRight: '6px' }} />
            <span>OUR KEY LEADERSHIP & TEAM</span>
          </div>
          <h2 className="leadership-title">Our Key Leadership & Team</h2>
          <p className="leadership-subtitle">
            A team of experienced professionals committed to creating meaningful opportunities
            for candidates and reliable talent solutions for businesses.
          </p>
        </div>

        <div className="leadership-grid">
          {leadershipMembers.map((member, index) => (
            <div key={index} className="leadership-card">
              <div className="leadership-card__img-wrap">
                <img
                  src={member.image}
                  alt={member.name}
                  className="leadership-card__img"
                />
              </div>
              <div className="leadership-card__content">
                <h3 className="leadership-card__name">{member.name}</h3>
                <div className="leadership-card__role">{member.role}</div>
                <div className="leadership-card__resp">
                  <strong>Responsibility:</strong> {member.responsibility}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
