import React, { useState } from 'react';
import {
  Settings,
  Users,
  Edit2,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
} from 'lucide-react';

export default function WebsiteCMSView({
  team,
  stats,
  onSaveTeam,
  onSaveStats,
}) {
  const [statsForm, setStatsForm] = useState(stats);
  const [teamList, setTeamList] = useState(team);
  const [savedFeedback, setSavedFeedback] = useState(false);

  // Edit team member modal / state
  const [editingMember, setEditingMember] = useState(null);
  const [memberForm, setMemberForm] = useState({ name: '', role: '', image: '' });

  const handleStatsSubmit = (e) => {
    e.preventDefault();
    onSaveStats(statsForm);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  const openEditMember = (m) => {
    setEditingMember(m);
    setMemberForm({ name: m.name, role: m.role, image: m.image });
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
        },
      ];
    }
    setTeamList(updated);
    onSaveTeam(updated);
    setEditingMember(null);
    setMemberForm({ name: '', role: '', image: '' });
  };

  const handleDeleteMember = (id) => {
    if (window.confirm('Remove this team member from the website?')) {
      const updated = teamList.filter((m) => m.id !== id);
      setTeamList(updated);
      onSaveTeam(updated);
    }
  };

  return (
    <div>
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
          <span>Website content and metrics successfully updated live!</span>
        </div>
      )}

      {/* Section 1: Live Metrics & Company Info */}
      <div className="adm-card">
        <div className="adm-card__header">
          <div>
            <h2 className="adm-card__title">
              <Settings size={18} /> Website Metrics & Official Contact Details
            </h2>
            <p className="adm-card__subtitle">
              Configure hero counters, stats badges, and company contact information
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
                value={statsForm.industryFocus}
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
                value={statsForm.professionalsConnected}
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
                value={statsForm.phone1}
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
                value={statsForm.phone2}
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
                value={statsForm.email1}
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
                value={statsForm.email2}
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
              value={statsForm.address}
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

      {/* Section 2: Key Leadership & Team Members */}
      <div className="adm-card">
        <div className="adm-card__header">
          <div>
            <h2 className="adm-card__title">
              <Users size={18} /> Meet Our Key Leadership & Team ({teamList.length})
            </h2>
            <p className="adm-card__subtitle">
              Team members displayed on the Interskill Homepage
            </p>
          </div>
          <button
            className="adm-btn-action adm-btn-secondary"
            onClick={() => {
              setEditingMember(null);
              setMemberForm({ name: '', role: '', image: '/images/team-priya.jpg' });
            }}
          >
            <Plus size={14} /> Add Team Member
          </button>
        </div>

        <div style={{ padding: '22px' }}>
          <div className="adm-team-grid">
            {teamList.map((m) => (
              <div key={m.id} className="adm-team-card">
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
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  <button
                    className="adm-action-btn"
                    onClick={() => openEditMember(m)}
                  >
                    <Edit2 size={12} /> Edit
                  </button>
                  <button
                    className="adm-action-btn adm-action-btn--delete"
                    onClick={() => handleDeleteMember(m.id)}
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
                    placeholder="e.g. Priya Ma'am"
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
                    placeholder="e.g. CEO"
                  />
                </div>
              </div>

              <div className="adm-form-group" style={{ marginBottom: '14px' }}>
                <label className="adm-form-label">Photo Image Path</label>
                <input
                  type="text"
                  className="adm-form-input"
                  value={memberForm.image}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, image: e.target.value })
                  }
                  placeholder="/images/team-priya.jpg"
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
                    setMemberForm({ name: '', role: '', image: '' });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
