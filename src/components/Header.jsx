import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';
import '../styles/header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Industries', href: '#industries', id: 'industries' },
    { label: 'For Job Seekers', href: '#job-seekers', id: 'job-seekers' },
    { label: 'For Employers', href: '#employers', id: 'employers' },
    { label: 'Job Openings', href: '#job-openings', id: 'job-openings' },
    { label: 'Advisory Board', href: '#advisory-board', id: 'advisory-board' },
    { label: 'Contact Us', href: '#contact-us', id: 'contact-us' },
  ];

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Logo variant="light" />

        <nav className="site-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`site-nav__link ${activeSection === link.id ? 'is-active' : ''}`}
              onClick={() => setActiveSection(link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header__cta">
          <a href="#consultation" className="btn-gold">
            Get Started
          </a>
        </div>

        <button
          className="mobile-nav-toggle"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer__links">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="mobile-drawer__link"
                onClick={() => {
                  setActiveSection(link.id);
                  setMobileMenuOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#consultation"
            className="btn-gold mobile-drawer__cta"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}
