import React from 'react';
import {
  Building2,
  Briefcase,
  PhoneCall,
  Users,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  ExternalLink,
  Plus,
} from 'lucide-react';

export default function AdminDashboard({
  leads,
  jobs,
  applicants,
  callbacks,
  consultations,
  onNavigateTab,
  onUpdateLeadStatus,
  onUpdateCallbackStatus,
}) {
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const pendingCallbacksCount = callbacks.filter((c) => c.status === 'Pending').length;
  const activeJobsCount = jobs.filter((j) => j.status === 'Active').length;
  const totalApplicantsCount = applicants.length;

  return (
    <div>
      {/* KPI Cards Grid */}
      <div className="adm-kpi-grid">
        <div
          className="adm-kpi-card"
          onClick={() => onNavigateTab('employer-leads')}
          title="Click to view employer leads"
        >
          <div className="adm-kpi-card__info">
            <span className="adm-kpi-card__label">Employer Inquiries</span>
            <span className="adm-kpi-card__value">{leads.length}</span>
            <span className="adm-kpi-card__sub adm-kpi-card__sub--highlight">
              {newLeadsCount} new requires action
            </span>
          </div>
          <div className="adm-kpi-card__icon-box adm-kpi-card__icon-box--navy">
            <Building2 size={22} />
          </div>
        </div>

        <div
          className="adm-kpi-card"
          onClick={() => onNavigateTab('callbacks')}
          title="Click to view callback queue"
        >
          <div className="adm-kpi-card__info">
            <span className="adm-kpi-card__label">Pending Callbacks</span>
            <span className="adm-kpi-card__value">{callbacks.length}</span>
            <span className="adm-kpi-card__sub adm-kpi-card__sub--highlight">
              {pendingCallbacksCount} pending follow-ups
            </span>
          </div>
          <div className="adm-kpi-card__icon-box adm-kpi-card__icon-box--gold">
            <PhoneCall size={22} />
          </div>
        </div>

        <div
          className="adm-kpi-card"
          onClick={() => onNavigateTab('job-board')}
          title="Click to manage job postings"
        >
          <div className="adm-kpi-card__info">
            <span className="adm-kpi-card__label">Active Job Openings</span>
            <span className="adm-kpi-card__value">{activeJobsCount}</span>
            <span className="adm-kpi-card__sub">Across Mumbai & Thane</span>
          </div>
          <div className="adm-kpi-card__icon-box adm-kpi-card__icon-box--blue">
            <Briefcase size={22} />
          </div>
        </div>

        <div
          className="adm-kpi-card"
          onClick={() => onNavigateTab('applicants')}
          title="Click to view job applicants"
        >
          <div className="adm-kpi-card__info">
            <span className="adm-kpi-card__label">Candidate Applicants</span>
            <span className="adm-kpi-card__value">{totalApplicantsCount}</span>
            <span className="adm-kpi-card__sub">Across all live openings</span>
          </div>
          <div className="adm-kpi-card__icon-box adm-kpi-card__icon-box--emerald">
            <Users size={22} />
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          className="adm-btn-action adm-btn-primary"
          onClick={() => onNavigateTab('job-board', { openAddModal: true })}
        >
          <Plus size={15} />
          Post New Job Opening
        </button>
        <button
          className="adm-btn-action adm-btn-secondary"
          onClick={() => onNavigateTab('callbacks')}
        >
          <PhoneCall size={14} />
          View Callback Queue ({pendingCallbacksCount})
        </button>
        <button
          className="adm-btn-action adm-btn-secondary"
          onClick={() => onNavigateTab('employer-leads')}
        >
          <Building2 size={14} />
          All Employer Leads
        </button>
      </div>

      {/* Two Column Grid for Recent Leads & Recent Callbacks */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '22px' }}>
        {/* Card 1: Latest Employer Hiring Inquiries */}
        <div className="adm-card" style={{ margin: 0 }}>
          <div className="adm-card__header">
            <div>
              <h3 className="adm-card__title">
                <Building2 size={16} /> Latest Employer Requirements
              </h3>
              <p className="adm-card__subtitle">Incoming hiring requests submitted by companies</p>
            </div>
            <button
              className="adm-action-btn"
              onClick={() => onNavigateTab('employer-leads')}
            >
              <span>View All</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Company / Contact</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 5).map((l) => (
                  <tr key={l.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{l.company}</div>
                      <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                        {l.name} • {l.phone}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '12px' }}>{l.category || 'General'}</span>
                    </td>
                    <td>
                      <span
                        className={`adm-status-badge adm-status-badge--${
                          l.status === 'New'
                            ? 'new'
                            : l.status === 'Contacted'
                            ? 'contacted'
                            : l.status === 'Closed'
                            ? 'closed'
                            : 'active'
                        }`}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td>
                      <select
                        className="adm-select-filter"
                        style={{ fontSize: '11px', padding: '4px 6px' }}
                        value={l.status}
                        onChange={(e) => onUpdateLeadStatus(l.id, e.target.value)}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Profiles Shared">Profiles Shared</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Card 2: Callback Requests Queue */}
        <div className="adm-card" style={{ margin: 0 }}>
          <div className="adm-card__header">
            <div>
              <h3 className="adm-card__title">
                <PhoneCall size={16} /> Live Callback Queue
              </h3>
              <p className="adm-card__subtitle">Phone assistance requests from visitors</p>
            </div>
            <button
              className="adm-action-btn"
              onClick={() => onNavigateTab('callbacks')}
            >
              <span>Manage Queue</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Visitor</th>
                  <th>Topic</th>
                  <th>Status</th>
                  <th>Quick Action</th>
                </tr>
              </thead>
              <tbody>
                {callbacks.slice(0, 5).map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{c.name}</div>
                      <a
                        href={`tel:${c.mobile}`}
                        style={{ fontSize: '11.5px', color: '#071D3A', textDecoration: 'underline' }}
                      >
                        {c.mobile}
                      </a>
                    </td>
                    <td style={{ fontSize: '12px', color: '#475569' }}>{c.topic}</td>
                    <td>
                      <span
                        className={`adm-status-badge adm-status-badge--${
                          c.status === 'Pending' ? 'pending' : 'active'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td>
                      {c.status === 'Pending' ? (
                        <button
                          className="adm-action-btn"
                          style={{ color: '#059669', borderColor: '#A7F3D0' }}
                          onClick={() => onUpdateCallbackStatus(c.id, 'Contacted')}
                          title="Mark as Contacted"
                        >
                          <CheckCircle2 size={13} />
                          <span>Done</span>
                        </button>
                      ) : (
                        <span style={{ fontSize: '11px', color: '#64748B' }}>Called</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
