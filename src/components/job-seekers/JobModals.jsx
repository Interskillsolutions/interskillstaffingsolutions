import React, { useState } from 'react';
import { X, CheckCircle2, FileUp, ArrowRight } from 'lucide-react';

export function ResumeModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setFile(null);
    onClose();
  };

  return (
    <div className="js-modal-backdrop" onClick={onClose}>
      <div className="js-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="js-modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                color: '#15803d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
              }}
            >
              <CheckCircle2 size={28} />
            </div>
            <h3 className="js-modal-title">Resume Received!</h3>
            <p className="js-modal-subtitle">
              Thank you, <strong>{name}</strong>. Your resume {file ? `(${file.name})` : ''} has
              been submitted to our candidate talent pool. Our HR team will review your profile.
            </p>
            <button
              type="button"
              className="btn-gold"
              onClick={handleReset}
              style={{ marginTop: '14px', fontSize: '13px' }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#F8EED6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#092344',
                }}
              >
                <FileUp size={18} />
              </div>
              <h3 className="js-modal-title" style={{ margin: 0 }}>
                Submit Your Resume
              </h3>
            </div>
            <p className="js-modal-subtitle">
              Join our talent database and get notified when matching openings go live.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Enter your mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Upload Resume (PDF, DOCX)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="form-input"
                  style={{ paddingTop: '7px' }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>

            {error && <p className="form-error-msg" style={{ marginBottom: '12px' }}>{error}</p>}

            <button type="submit" className="btn-navy" style={{ width: '100%', height: '40px' }}>
              <span>Submit Resume</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function ApplyJobModal({ job, isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please provide your name, email, and contact number.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <div className="js-modal-backdrop" onClick={onClose}>
      <div className="js-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="js-modal-close-btn"
          onClick={onClose}
          aria-label="Close application modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                color: '#15803d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
              }}
            >
              <CheckCircle2 size={28} />
            </div>
            <h3 className="js-modal-title">Application Submitted!</h3>
            <p className="js-modal-subtitle">
              Thank you, <strong>{name}</strong>! Your application for{' '}
              <strong>{job.title}</strong> at <strong>{job.company}</strong> has been
              recorded for frontend review.
            </p>
            <button
              type="button"
              className="btn-gold"
              onClick={handleClose}
              style={{ marginTop: '14px', fontSize: '13px' }}
            >
              Back to Openings
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <span className="section-eyebrow">JOB APPLICATION</span>
              <h3 className="js-modal-title" style={{ margin: 0 }}>
                {job.title}
              </h3>
              <p style={{ fontSize: '12px', color: '#657184', marginTop: '2px' }}>
                {job.company} • {job.location} • {job.experience}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Enter your contact number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="form-error-msg" style={{ marginBottom: '12px' }}>{error}</p>}

            <button type="submit" className="btn-gold" style={{ width: '100%', height: '40px' }}>
              <span>Confirm Application</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
