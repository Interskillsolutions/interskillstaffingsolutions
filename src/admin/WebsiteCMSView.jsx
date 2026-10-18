import React, { useState } from 'react';
import {
  Settings,
  Users,
  Edit2,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  MessageSquare,
  HelpCircle,
  Star,
  Globe,
  Upload,
} from 'lucide-react';
import { api } from '../api/apiClient';

export default function WebsiteCMSView({
  team = [],
  stats = {},
  testimonials = [],
  faqs = [],
  onSaveTeam,
  onSaveStats,
  onSaveTestimonials,
  onSaveFaqs,
}) {
  const [activeSubTab, setActiveSubTab] = useState('metrics'); // 'metrics' | 'team' | 'testimonials' | 'faqs'
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // 1. Stats & Contact Form state
  const [statsForm, setStatsForm] = useState(stats);

  // 2. Team state
  const [teamList, setTeamList] = useState(team);
  const [editingMember, setEditingMember] = useState(null);
  const [memberForm, setMemberForm] = useState({ name: '', role: '', image: '', quote: '' });
  const [uploadingMemberPhoto, setUploadingMemberPhoto] = useState(false);

  // 3. Testimonials state
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    quote: '',
    rating: 5,
    image: '',
  });
  const [uploadingTestimonialPhoto, setUploadingTestimonialPhoto] = useState(false);

  // 4. FAQs state
  const [faqList, setFaqList] = useState(faqs);
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });

  const triggerFeedback = (msg = 'Website content and metrics successfully updated live!') => {
    setFeedbackMsg(msg);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3500);
  };

  const handleUploadMemberPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingMemberPhoto(true);
    try {
      const res = await api.uploadImage(file);
      if (res.url) {
        setMemberForm((prev) => ({ ...prev, image: res.url }));
        triggerFeedback('Photo uploaded successfully to server!');
      }
    } catch (err) {
      alert('Photo upload failed: ' + err.message);
    } finally {
      setUploadingMemberPhoto(false);
    }
  };

  const handleUploadTestimonialPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingTestimonialPhoto(true);
    try {
      const res = await api.uploadImage(file);
      if (res.url) {
        setTestimonialForm((prev) => ({ ...prev, image: res.url }));
        triggerFeedback('Avatar uploaded successfully to server!');
      }
    } catch (err) {
      alert('Photo upload failed: ' + err.message);
    } finally {
      setUploadingTestimonialPhoto(false);
    }
  };

  // --- Handlers: Metrics ---
  const handleStatsSubmit = (e) => {
    e.preventDefault();
    if (onSaveStats) onSaveStats(statsForm);
    triggerFeedback('Official metrics and contact information updated successfully!');
  };

  // --- Handlers: Team ---
  const openEditMember = (m) => {
    setEditingMember(m);
    setMemberForm({ name: m.name, role: m.role, image: m.image, quote: m.quote || '' });
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    if (!memberForm.name.trim()) return;

    let updated;
    if (editingMember) {
      updated = teamList.map((item) =>
        item.id === editingMember.id ? { ...item, ...memberForm } : item
      );
    } else {
      updated = [
        ...teamList,
        {
          id: `team-${Date.now()}`,
          name: memberForm.name,
          role: memberForm.role,
          image: memberForm.image || '/images/team-priya.jpg',
          quote: memberForm.quote || '',
        },
      ];
    }
    setTeamList(updated);
    if (onSaveTeam) onSaveTeam(updated);
    setEditingMember(null);
    setMemberForm({ name: '', role: '', image: '', quote: '' });
    triggerFeedback('Leadership team updated and synced with database!');
  };

  const handleDeleteMember = (id) => {
    if (window.confirm('Remove this team member from the website?')) {
      const updated = teamList.filter((m) => m.id !== id);
      setTeamList(updated);
      if (onSaveTeam) onSaveTeam(updated);
      triggerFeedback('Team member removed.');
    }
  };

  // --- Handlers: Testimonials ---
  const openEditTestimonial = (t) => {
    setEditingTestimonial(t);
    setTestimonialForm({
      name: t.name || '',
      role: t.role || '',
      quote: t.quote || '',
      rating: t.rating || 5,
      image: t.image || '',
    });
  };

  const handleSaveTestimonial = (e) => {
    e.preventDefault();
    if (!testimonialForm.name.trim() || !testimonialForm.quote.trim()) return;

    let updated;
    if (editingTestimonial) {
      updated = testimonialsList.map((t) =>
        t.id === editingTestimonial.id ? { ...t, ...testimonialForm } : t
      );
    } else {
      updated = [
        ...testimonialsList,
        {
          id: `test-${Date.now()}`,
          ...testimonialForm,
          image: testimonialForm.image || '/images/testimonial-rohit.png',
        },
      ];
    }
    setTestimonialsList(updated);
    if (onSaveTestimonials) onSaveTestimonials(updated);
    setEditingTestimonial(null);
    setTestimonialForm({ name: '', role: '', quote: '', rating: 5, image: '' });
    triggerFeedback('Testimonial saved and updated on homepage!');
  };

  const handleDeleteTestimonial = (id) => {
    if (window.confirm('Remove this review from the public website?')) {
      const updated = testimonialsList.filter((t) => t.id !== id);
      setTestimonialsList(updated);
      if (onSaveTestimonials) onSaveTestimonials(updated);
      triggerFeedback('Testimonial removed.');
    }
  };

  // --- Handlers: FAQs ---
  const openEditFaq = (f) => {
    setEditingFaq(f);
    setFaqForm({ question: f.question, answer: f.answer });
  };

  const handleSaveFaq = (e) => {
    e.preventDefault();
    if (!faqForm.question.trim() || !faqForm.answer.trim()) return;

    let updated;
    if (editingFaq) {
      updated = faqList.map((f) =>
        (f.id || f.faqId) === (editingFaq.id || editingFaq.faqId)
          ? { ...f, question: faqForm.question, answer: faqForm.answer }
          : f
      );
    } else {
      updated = [
        ...faqList,
        {
          id: `faq-${Date.now()}`,
          question: faqForm.question,
          answer: faqForm.answer,
        },
      ];
    }
    setFaqList(updated);
    if (onSaveFaqs) onSaveFaqs(updated);
    setEditingFaq(null);
    setFaqForm({ question: '', answer: '' });
    triggerFeedback('FAQ entry saved and updated live!');
  };

  const handleDeleteFaq = (id) => {
    if (window.confirm('Remove this FAQ item from the website?')) {
      const updated = faqList.filter((f) => (f.id || f.faqId) !== id);
      setFaqList(updated);
      if (onSaveFaqs) onSaveFaqs(updated);
      triggerFeedback('FAQ item removed.');
    }
  };

  return (
    <div>
      {/* Live Feedback Banner */}
      {savedFeedback && (
        <div
          style={{
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            color: '#065F46',
            padding: '12px 18px',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 600,
            fontSize: '13.5px',
          }}
        >
          <CheckCircle2 size={18} />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Sub-navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '12px',
          flexWrap: 'wrap',
        }}
      >
        <button
          className={`adm-btn-action ${activeSubTab === 'metrics' ? 'adm-btn-primary' : 'adm-btn-secondary'}`}
          onClick={() => setActiveSubTab('metrics')}
        >
          <Settings size={14} /> Official Metrics & Contacts
        </button>
        <button
          className={`adm-btn-action ${activeSubTab === 'team' ? 'adm-btn-primary' : 'adm-btn-secondary'}`}
          onClick={() => setActiveSubTab('team')}
        >
          <Users size={14} /> Key Leadership & Team ({teamList.length})
        </button>
        <button
          className={`adm-btn-action ${activeSubTab === 'testimonials' ? 'adm-btn-primary' : 'adm-btn-secondary'}`}
          onClick={() => setActiveSubTab('testimonials')}
        >
          <MessageSquare size={14} /> Client Testimonials ({testimonialsList.length})
        </button>
        <button
          className={`adm-btn-action ${activeSubTab === 'faqs' ? 'adm-btn-primary' : 'adm-btn-secondary'}`}
          onClick={() => setActiveSubTab('faqs')}
        >
          <HelpCircle size={14} /> Website FAQs ({faqList.length})
        </button>
      </div>

      {/* TAB 1: METRICS & CONTACTS */}
      {activeSubTab === 'metrics' && (
        <div className="adm-card">
          <div className="adm-card__header">
            <div>
              <h2 className="adm-card__title">
                <Settings size={18} /> Website Metrics & Official Contact Details
              </h2>
              <p className="adm-card__subtitle">
                Configure hero counters, stats badges, and company contact information across public pages
              </p>
            </div>
          </div>

          <form onSubmit={handleStatsSubmit} style={{ padding: '22px' }}>
            <div className="adm-form-grid-2col" style={{ marginBottom: '18px' }}>
              <div className="adm-form-group">
                <label className="adm-form-label">Industry Focus Areas Metric</label>
                <input
                  type="text"
                  className="adm-form-input"
                  value={statsForm.industryFocus || ''}
                  onChange={(e) =>
                    setStatsForm({ ...statsForm, industryFocus: e.target.value })
                  }
                  placeholder="600+"
                />
              </div>
              <div className="adm-form-group">
                <label className="adm-form-label">Professionals Connected Metric</label>
                <input
                  type="text"
                  className="adm-form-input"
                  value={statsForm.professionalsConnected || ''}
                  onChange={(e) =>
                    setStatsForm({
                      ...statsForm,
                      professionalsConnected: e.target.value,
                    })
                  }
                  placeholder="10000+"
                />
              </div>
            </div>

            <div className="adm-form-grid-2col" style={{ marginBottom: '18px' }}>
              <div className="adm-form-group">
                <label className="adm-form-label">Contact Phone 1</label>
                <input
                  type="text"
                  className="adm-form-input"
                  value={statsForm.phone1 || ''}
                  onChange={(e) =>
                    setStatsForm({ ...statsForm, phone1: e.target.value })
                  }
                  placeholder="9819461050"
                />
              </div>
              <div className="adm-form-group">
                <label className="adm-form-label">Contact Phone 2</label>
                <input
                  type="text"
                  className="adm-form-input"
                  value={statsForm.phone2 || ''}
                  onChange={(e) =>
                    setStatsForm({ ...statsForm, phone2: e.target.value })
                  }
                  placeholder="8591207594"
                />
              </div>
            </div>

            <div className="adm-form-grid-2col" style={{ marginBottom: '18px' }}>
              <div className="adm-form-group">
                <label className="adm-form-label">Primary HR Email</label>
                <input
                  type="text"
                  className="adm-form-input"
                  value={statsForm.email1 || ''}
                  onChange={(e) =>
                    setStatsForm({ ...statsForm, email1: e.target.value })
                  }
                  placeholder="shreyashhrinterskillsolutions@gmail.com"
                />
              </div>
              <div className="adm-form-group">
                <label className="adm-form-label">Corporate Inquiries Email</label>
                <input
                  type="text"
                  className="adm-form-input"
                  value={statsForm.email2 || ''}
                  onChange={(e) =>
                    setStatsForm({ ...statsForm, email2: e.target.value })
                  }
                  placeholder="interskillsolutions@gmail.com"
                />
              </div>
            </div>

            <div className="adm-form-group" style={{ marginBottom: '22px' }}>
              <label className="adm-form-label">Office Address</label>
              <textarea
                className="adm-form-textarea"
                rows={2}
                value={statsForm.address || ''}
                onChange={(e) =>
                  setStatsForm({ ...statsForm, address: e.target.value })
                }
                placeholder="104, Jaganath Tower, above Parijat Sweets, Opp Nerul Railway Station (West), Sector 20."
              />
            </div>

            <button type="submit" className="adm-btn-action adm-btn-primary">
              <Save size={14} /> Save Metrics & Contacts
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: KEY LEADERSHIP & TEAM */}
      {activeSubTab === 'team' && (
        <div className="adm-card">
          <div className="adm-card__header">
            <div>
              <h2 className="adm-card__title">
                <Users size={18} /> Meet Our Key Leadership & Team ({teamList.length})
              </h2>
              <p className="adm-card__subtitle">
                Team members displayed on the Interskill Homepage and About Us page
              </p>
            </div>
            <button
              className="adm-btn-action adm-btn-secondary"
              onClick={() => {
                setEditingMember(null);
                setMemberForm({ name: '', role: '', image: '/images/team-priya.jpg', quote: '' });
              }}
            >
              <Plus size={14} /> Add Team Member
            </button>
          </div>

          <div style={{ padding: '22px' }}>
            <div className="adm-team-grid">
              {teamList.map((m) => (
                <div key={m.id || m._id} className="adm-team-card">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="adm-team-img"
                    onError={(e) => {
                      e.currentTarget.src = '/images/team-priya.jpg';
                    }}
                  />
                  <div className="adm-team-name">{m.name}</div>
                  <div className="adm-team-role">{m.role}</div>
                  {m.quote && (
                    <div
                      style={{
                        fontSize: '11.5px',
                        color: '#64748B',
                        fontStyle: 'italic',
                        margin: '6px 0 10px',
                        lineHeight: 1.4,
                      }}
                    >
                      "{m.quote}"
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    <button
                      className="adm-action-btn"
                      onClick={() => openEditMember(m)}
                    >
                      <Edit2 size={12} /> Edit
                    </button>
                    <button
                      className="adm-action-btn adm-action-btn--delete"
                      onClick={() => handleDeleteMember(m.id || m._id)}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit / Add Member Inline Form */}
            {(editingMember || memberForm.name !== '') && (
              <div
                style={{
                  marginTop: '24px',
                  padding: '18px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  background: '#F8FAFC',
                }}
              >
                <h4 style={{ margin: '0 0 14px', fontSize: '14px', color: '#071D3A' }}>
                  {editingMember ? `Edit Member: ${editingMember.name}` : 'Add New Team Member'}
                </h4>
                <div className="adm-form-grid-2col" style={{ marginBottom: '14px' }}>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Full Name & Title</label>
                    <input
                      type="text"
                      className="adm-form-input"
                      value={memberForm.name}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, name: e.target.value })
                      }
                      placeholder="e.g. Dr Priya Gawade"
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Designation / Role</label>
                    <input
                      type="text"
                      className="adm-form-input"
                      value={memberForm.role}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, role: e.target.value })
                      }
                      placeholder="e.g. CEO of Interskill Solutions & Interskill Staffing Solutions"
                    />
                  </div>
                </div>

                <div className="adm-form-group" style={{ marginBottom: '14px' }}>
                  <label className="adm-form-label">Photo Image (Upload or path)</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      className="adm-form-input"
                      value={memberForm.image}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, image: e.target.value })
                      }
                      placeholder="/images/team-priya.jpg or upload below"
                      style={{ flex: 1 }}
                    />
                    <label
                      className="adm-btn-action adm-btn-secondary"
                      style={{ cursor: 'pointer', margin: 0, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Upload size={13} /> {uploadingMemberPhoto ? 'Uploading...' : 'Upload Photo'}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleUploadMemberPhoto}
                        disabled={uploadingMemberPhoto}
                      />
                    </label>
                  </div>
                  {memberForm.image && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src={api.resolveFileUrl(memberForm.image)}
                        alt="Preview"
                        style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #CBD5E1' }}
                        onError={(e) => { e.currentTarget.src = '/images/team-priya.jpg'; }}
                      />
                      <span style={{ fontSize: '11px', color: '#64748B' }}>Preview: {memberForm.image}</span>
                    </div>
                  )}
                </div>

                <div className="adm-form-group" style={{ marginBottom: '14px' }}>
                  <label className="adm-form-label">Key Quote / Philosophy</label>
                  <textarea
                    className="adm-form-textarea"
                    rows={2}
                    value={memberForm.quote}
                    onChange={(e) =>
                      setMemberForm({ ...memberForm, quote: e.target.value })
                    }
                    placeholder="e.g. People are not just resources; they are the real growth engines of any business."
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="adm-btn-action adm-btn-primary"
                    onClick={handleSaveMember}
                  >
                    <Save size={13} /> {editingMember ? 'Update Member' : 'Add to Team'}
                  </button>
                  <button
                    className="adm-btn-action adm-btn-secondary"
                    onClick={() => {
                      setEditingMember(null);
                      setMemberForm({ name: '', role: '', image: '', quote: '' });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CLIENT TESTIMONIALS */}
      {activeSubTab === 'testimonials' && (
        <div className="adm-card">
          <div className="adm-card__header">
            <div>
              <h2 className="adm-card__title">
                <MessageSquare size={18} /> Client & Candidate Testimonials ({testimonialsList.length})
              </h2>
              <p className="adm-card__subtitle">
                Customer reviews and placement success stories displayed on the homepage
              </p>
            </div>
            <button
              className="adm-btn-action adm-btn-secondary"
              onClick={() => {
                setEditingTestimonial(null);
                setTestimonialForm({ name: '', role: '', quote: '', rating: 5, image: '/images/testimonial-rohit.png' });
              }}
            >
              <Plus size={14} /> Add Testimonial
            </button>
          </div>

          <div style={{ padding: '22px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {testimonialsList.map((t) => (
                <div
                  key={t.id || t._id}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <img
                        src={t.image || '/images/testimonial-rohit.png'}
                        alt={t.name}
                        style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.currentTarget.src = '/images/testimonial-rohit.png';
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#0F172A' }}>{t.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>{t.role}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} size={14} fill="#D9B45E" stroke="#D9B45E" />
                      ))}
                    </div>
                    <p style={{ fontSize: '13px', color: '#334155', fontStyle: 'italic', lineHeight: 1.5, margin: '0 0 14px' }}>
                      "{t.quote}"
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', borderTop: '1px solid #E2E8F0', paddingTop: '10px' }}>
                    <button className="adm-action-btn" onClick={() => openEditTestimonial(t)}>
                      <Edit2 size={12} /> Edit
                    </button>
                    <button className="adm-action-btn adm-action-btn--delete" onClick={() => handleDeleteTestimonial(t.id || t._id)}>
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Inline Testimonial Form */}
            {(editingTestimonial || testimonialForm.name !== '') && (
              <div
                style={{
                  marginTop: '24px',
                  padding: '18px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  background: '#F8FAFC',
                }}
              >
                <h4 style={{ margin: '0 0 14px', fontSize: '14px', color: '#071D3A' }}>
                  {editingTestimonial ? `Edit Testimonial: ${editingTestimonial.name}` : 'Add New Testimonial'}
                </h4>
                <div className="adm-form-grid-2col" style={{ marginBottom: '14px' }}>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Client / Candidate Name</label>
                    <input
                      type="text"
                      className="adm-form-input"
                      value={testimonialForm.name}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                      placeholder="Rohit Patil"
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Designation / Placement Role</label>
                    <input
                      type="text"
                      className="adm-form-input"
                      value={testimonialForm.role}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                      placeholder="Placed as Software Developer"
                    />
                  </div>
                </div>

                <div className="adm-form-grid-2col" style={{ marginBottom: '14px' }}>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Avatar Image (Upload or path)</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        className="adm-form-input"
                        value={testimonialForm.image}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, image: e.target.value })}
                        placeholder="/images/testimonial-rohit.png"
                        style={{ flex: 1 }}
                      />
                      <label
                        className="adm-btn-action adm-btn-secondary"
                        style={{ cursor: 'pointer', margin: 0, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Upload size={13} /> {uploadingTestimonialPhoto ? 'Uploading...' : 'Upload Photo'}
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleUploadTestimonialPhoto}
                          disabled={uploadingTestimonialPhoto}
                        />
                      </label>
                    </div>
                    {testimonialForm.image && (
                      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img
                          src={api.resolveFileUrl(testimonialForm.image)}
                          alt="Preview"
                          style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #CBD5E1' }}
                          onError={(e) => { e.currentTarget.src = '/images/testimonial-rohit.png'; }}
                        />
                        <span style={{ fontSize: '11px', color: '#64748B' }}>Preview: {testimonialForm.image}</span>
                      </div>
                    )}
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Star Rating (1 - 5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="adm-form-input"
                      value={testimonialForm.rating}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value, 10) || 5 })}
                    />
                  </div>
                </div>

                <div className="adm-form-group" style={{ marginBottom: '14px' }}>
                  <label className="adm-form-label">Review Quote</label>
                  <textarea
                    className="adm-form-textarea"
                    rows={3}
                    value={testimonialForm.quote}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                    placeholder="Interskill helped me find the right opportunity..."
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="adm-btn-action adm-btn-primary" onClick={handleSaveTestimonial}>
                    <Save size={13} /> {editingTestimonial ? 'Update Testimonial' : 'Publish Testimonial'}
                  </button>
                  <button
                    className="adm-btn-action adm-btn-secondary"
                    onClick={() => {
                      setEditingTestimonial(null);
                      setTestimonialForm({ name: '', role: '', quote: '', rating: 5, image: '' });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: FAQS */}
      {activeSubTab === 'faqs' && (
        <div className="adm-card">
          <div className="adm-card__header">
            <div>
              <h2 className="adm-card__title">
                <HelpCircle size={18} /> Frequently Asked Questions ({faqList.length})
              </h2>
              <p className="adm-card__subtitle">
                Manage questions and answers displayed in the public FAQ section
              </p>
            </div>
            <button
              className="adm-btn-action adm-btn-secondary"
              onClick={() => {
                setEditingFaq(null);
                setFaqForm({ question: '', answer: '' });
              }}
            >
              <Plus size={14} /> Add FAQ Item
            </button>
          </div>

          <div style={{ padding: '22px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {faqList.map((f, idx) => {
                const key = f.id || f.faqId || idx;
                return (
                  <div
                    key={key}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      padding: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#071D3A', marginBottom: '6px' }}>
                          {f.question}
                        </div>
                        <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                          {f.answer}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="adm-action-btn" onClick={() => openEditFaq(f)}>
                          <Edit2 size={12} /> Edit
                        </button>
                        <button className="adm-action-btn adm-action-btn--delete" onClick={() => handleDeleteFaq(key)}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inline FAQ Form */}
            {(editingFaq || faqForm.question !== '') && (
              <div
                style={{
                  marginTop: '24px',
                  padding: '18px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  background: '#F8FAFC',
                }}
              >
                <h4 style={{ margin: '0 0 14px', fontSize: '14px', color: '#071D3A' }}>
                  {editingFaq ? 'Edit FAQ Item' : 'Add New FAQ Item'}
                </h4>
                <div className="adm-form-group" style={{ marginBottom: '14px' }}>
                  <label className="adm-form-label">Question</label>
                  <input
                    type="text"
                    className="adm-form-input"
                    value={faqForm.question}
                    onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                    placeholder="e.g. 1. What services does Interskill Staffing Solutions offer?"
                  />
                </div>

                <div className="adm-form-group" style={{ marginBottom: '14px' }}>
                  <label className="adm-form-label">Answer</label>
                  <textarea
                    className="adm-form-textarea"
                    rows={3}
                    value={faqForm.answer}
                    onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                    placeholder="Interskill Staffing Solutions provides end-to-end recruitment..."
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="adm-btn-action adm-btn-primary" onClick={handleSaveFaq}>
                    <Save size={13} /> {editingFaq ? 'Update FAQ' : 'Save FAQ'}
                  </button>
                  <button
                    className="adm-btn-action adm-btn-secondary"
                    onClick={() => {
                      setEditingFaq(null);
                      setFaqForm({ question: '', answer: '' });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
