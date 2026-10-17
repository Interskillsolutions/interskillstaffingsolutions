import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Users,
  PhoneCall,
  MessageSquare,
  FileText,
  Settings,
  ExternalLink,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import './admin.css';
import {
  getStored,
  setStored,
  STORAGE_KEYS,
  initAdminStore,
} from './adminStore';

import AdminDashboard from './AdminDashboard';
import EmployerLeadsView from './EmployerLeadsView';
import JobBoardView from './JobBoardView';
import ApplicantsView from './ApplicantsView';
import CallbacksView from './CallbacksView';
import ConsultationsView from './ConsultationsView';
import ResumeBankView from './ResumeBankView';
import WebsiteCMSView from './WebsiteCMSView';
import { api } from '../api/apiClient';

export default function AdminLayout({ onNavigate }) {
  // Ensure store is seeded
  useEffect(() => {
    initAdminStore();

    // Fetch live data from MongoDB Atlas backend API if available
    const fetchMongoData = async () => {
      try {
        const [
          remoteLeads,
          remoteCallbacks,
          remoteConsultations,
          remoteJobs,
          remoteApplicants,
          remoteResumes,
          remoteTeam,
          remoteStats,
        ] = await Promise.allSettled([
          api.getLeads(),
          api.getCallbacks(),
          api.getConsultations(),
          api.getJobs(),
          api.getApplicants(),
          api.getResumes(),
          api.getTeam(),
          api.getStats(),
        ]);

        if (remoteLeads.status === 'fulfilled' && remoteLeads.value?.length) {
          const mapped = remoteLeads.value.map((l) => ({
            id: l.leadId || l._id,
            name: l.name,
            company: l.company,
            phone: l.phone,
            email: l.email,
            category: l.category,
            openings: l.openings,
            description: l.description,
            status: l.status,
            date: l.formattedDate || new Date(l.createdAt).toLocaleString(),
          }));
          setLeads(mapped);
          setStored(STORAGE_KEYS.EMPLOYER_LEADS, mapped);
        }

        if (remoteCallbacks.status === 'fulfilled' && remoteCallbacks.value?.length) {
          const mapped = remoteCallbacks.value.map((c) => ({
            id: c.callbackId || c._id,
            name: c.name,
            mobile: c.mobile,
            topic: c.topic,
            source: c.source,
            status: c.status,
            date: c.formattedDate || new Date(c.createdAt).toLocaleString(),
          }));
          setCallbacks(mapped);
          setStored(STORAGE_KEYS.CALLBACKS, mapped);
        }

        if (remoteConsultations.status === 'fulfilled' && remoteConsultations.value?.length) {
          const mapped = remoteConsultations.value.map((con) => ({
            id: con.consultationId || con._id,
            name: con.name,
            phone: con.phone,
            email: con.email,
            requirementType: con.requirementType,
            preferredRole: con.preferredRole,
            status: con.status,
            date: con.formattedDate || new Date(con.createdAt).toLocaleString(),
          }));
          setConsultations(mapped);
          setStored(STORAGE_KEYS.CONSULTATIONS, mapped);
        }

        if (remoteJobs.status === 'fulfilled' && remoteJobs.value?.length) {
          const mapped = remoteJobs.value.map((j) => ({
            id: j.jobId || j._id,
            title: j.title,
            company: j.company,
            experience: j.experience,
            location: j.location,
            type: j.type,
            category: j.category,
            tags: j.tags,
            description: j.description,
            isNew: j.isNew,
            status: j.status,
            applicantsCount: j.applicantsCount,
          }));
          setJobs(mapped);
          setStored(STORAGE_KEYS.JOBS, mapped);
        }

        if (remoteApplicants.status === 'fulfilled' && remoteApplicants.value?.length) {
          const mapped = remoteApplicants.value.map((a) => ({
            id: a.applicantId || a._id,
            jobId: a.jobId,
            jobTitle: a.jobTitle,
            candidateName: a.candidateName,
            email: a.email,
            phone: a.phone,
            experience: a.experience,
            currentCompany: a.currentCompany,
            status: a.status,
            resumeFileName: a.resumeFileName,
            resumeUrl: a.resumeUrl,
            date: a.formattedDate || new Date(a.createdAt).toLocaleString(),
          }));
          setApplicants(mapped);
          setStored(STORAGE_KEYS.APPLICANTS, mapped);
        }

        if (remoteResumes.status === 'fulfilled' && remoteResumes.value?.length) {
          const mapped = remoteResumes.value.map((r) => ({
            id: r.resumeId || r._id,
            candidateName: r.candidateName,
            email: r.email,
            phone: r.phone,
            category: r.category,
            experience: r.experience,
            fileName: r.fileName,
            fileUrl: r.fileUrl,
            date: r.formattedDate || new Date(r.createdAt).toLocaleString(),
          }));
          setResumes(mapped);
          setStored(STORAGE_KEYS.RESUMES, mapped);
        }

        if (remoteTeam.status === 'fulfilled' && remoteTeam.value?.length) {
          const mapped = remoteTeam.value.map((m) => ({
            id: m.memberId || m._id,
            name: m.name,
            role: m.role,
            quote: m.quote,
            image: m.image,
          }));
          setTeam(mapped);
          setStored(STORAGE_KEYS.TEAM, mapped);
        }

        if (remoteStats.status === 'fulfilled' && remoteStats.value) {
          setStats(remoteStats.value);
          setStored(STORAGE_KEYS.STATS, remoteStats.value);
        }
      } catch (err) {
        console.warn('MongoDB sync note:', err.message);
      }
    };

    fetchMongoData();
  }, []);

  // State management backed by localStorage
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tabOptions, setTabOptions] = useState({});

  const [leads, setLeads] = useState(() => getStored(STORAGE_KEYS.EMPLOYER_LEADS, []));
  const [callbacks, setCallbacks] = useState(() => getStored(STORAGE_KEYS.CALLBACKS, []));
  const [consultations, setConsultations] = useState(() => getStored(STORAGE_KEYS.CONSULTATIONS, []));
  const [jobs, setJobs] = useState(() => getStored(STORAGE_KEYS.JOBS, []));
  const [applicants, setApplicants] = useState(() => getStored(STORAGE_KEYS.APPLICANTS, []));
  const [resumes, setResumes] = useState(() => getStored(STORAGE_KEYS.RESUMES, []));
  const [team, setTeam] = useState(() => getStored(STORAGE_KEYS.TEAM, []));
  const [stats, setStats] = useState(() => getStored(STORAGE_KEYS.STATS, {}));

  // Handlers for state updates with MongoDB Atlas synchronization
  const handleUpdateLeadStatus = async (id, newStatus) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
    setLeads(updated);
    setStored(STORAGE_KEYS.EMPLOYER_LEADS, updated);
    try {
      await api.updateLeadStatus(id, newStatus);
    } catch (e) {
      console.warn('Backend sync failed, saved locally:', e.message);
    }
  };

  const handleDeleteLead = async (id) => {
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    setStored(STORAGE_KEYS.EMPLOYER_LEADS, updated);
    try {
      await api.deleteLead(id);
    } catch (e) {
      console.warn('Backend sync failed, saved locally:', e.message);
    }
  };

  const handleUpdateCallbackStatus = async (id, newStatus) => {
    const updated = callbacks.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    setCallbacks(updated);
    setStored(STORAGE_KEYS.CALLBACKS, updated);
    try {
      await api.updateCallbackStatus(id, newStatus);
    } catch (e) {
      console.warn('Backend sync failed, saved locally:', e.message);
    }
  };

  const handleDeleteCallback = async (id) => {
    const updated = callbacks.filter((c) => c.id !== id);
    setCallbacks(updated);
    setStored(STORAGE_KEYS.CALLBACKS, updated);
    try {
      await api.deleteCallback(id);
    } catch (e) {
      console.warn('Backend sync failed, saved locally:', e.message);
    }
  };

  const handleUpdateConsultationStatus = async (id, newStatus) => {
    const updated = consultations.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    setConsultations(updated);
    setStored(STORAGE_KEYS.CONSULTATIONS, updated);
    try {
      await api.updateConsultationStatus(id, newStatus);
    } catch (e) {
      console.warn('Backend sync failed, saved locally:', e.message);
    }
  };

  const handleDeleteConsultation = async (id) => {
    const updated = consultations.filter((c) => c.id !== id);
    setConsultations(updated);
    setStored(STORAGE_KEYS.CONSULTATIONS, updated);
    try {
      await api.deleteConsultation(id);
    } catch (e) {
      console.warn('Backend sync failed, saved locally:', e.message);
    }
  };

  const handleSaveJob = async (job) => {
    const exists = jobs.some((j) => j.id === job.id);
    let updated;
    if (exists) {
      updated = jobs.map((j) => (j.id === job.id ? job : j));
    } else {
      updated = [job, ...jobs];
    }
    setJobs(updated);
    setStored(STORAGE_KEYS.JOBS, updated);
    try {
      if (exists) {
        await api.updateJob(job.id, job);
      } else {
        await api.createJob(job);
      }
    } catch (e) {
      console.warn('Backend sync failed, saved locally:', e.message);
    }
  };

  const handleDeleteJob = async (id) => {
    const updated = jobs.filter((j) => j.id !== id);
    setJobs(updated);
    setStored(STORAGE_KEYS.JOBS, updated);
    try {
      await api.deleteJob(id);
    } catch (e) {
      console.warn('Backend sync failed, saved locally:', e.message);
    }
  };

  const handleUpdateApplicantStatus = async (id, newStatus) => {
    const updated = applicants.map((a) => (a.id === id ? { ...a, status: newStatus } : a));
    setApplicants(updated);
    setStored(STORAGE_KEYS.APPLICANTS, updated);
    try {
      await api.updateApplicantStatus(id, newStatus);
    } catch (e) {
      console.warn('Backend sync failed, saved locally:', e.message);
    }
  };

  const handleDeleteApplicant = async (id) => {
    const updated = applicants.filter((a) => a.id !== id);
    setApplicants(updated);
    setStored(STORAGE_KEYS.APPLICANTS, updated);
    try {
      await api.deleteApplicant(id);
    } catch (e) {
      console.warn('Backend sync failed, saved locally:', e.message);
    }
  };

  const handleDeleteResume = async (id) => {
    const updated = resumes.filter((r) => r.id !== id);
    setResumes(updated);
    setStored(STORAGE_KEYS.RESUMES, updated);
    try {
      await api.deleteResume(id);
    } catch (e) {
      console.warn('Backend sync failed, saved locally:', e.message);
    }
  };

  const handleSaveTeam = async (newTeam) => {
    setTeam(newTeam);
    setStored(STORAGE_KEYS.TEAM, newTeam);
    try {
      await api.saveTeam(newTeam);
    } catch (e) {
      console.warn('Backend sync failed, saved locally:', e.message);
    }
  };

  const handleSaveStats = async (newStats) => {
    setStats(newStats);
    setStored(STORAGE_KEYS.STATS, newStats);
    try {
      await api.saveStats(newStats);
    } catch (e) {
      console.warn('Backend sync failed, saved locally:', e.message);
    }
  };

  const handleNavigateTab = (tab, options = {}) => {
    setActiveTab(tab);
    setTabOptions(options);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Badge calculations
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const pendingCallbacks = callbacks.filter((c) => c.status === 'Pending').length;
  const newApplicants = applicants.filter((a) => a.status === 'New').length;

  // View title helper
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: 'Executive Overview', subtitle: 'Real-time performance and incoming business leads' };
      case 'employer-leads':
        return { title: 'Employer Inquiries', subtitle: 'Manage corporate hiring requirements' };
      case 'callbacks':
        return { title: 'Callback Requests', subtitle: 'High-priority phone assistance queue' };
      case 'job-board':
        return { title: 'Job Postings Manager', subtitle: 'Publish and manage live opportunities' };
      case 'applicants':
        return { title: 'Candidate Pipeline', subtitle: 'Applications for open positions' };
      case 'consultations':
        return { title: 'Free Consultation Leads', subtitle: 'Website advisory requests' };
      case 'resumes':
        return { title: 'Candidate Resume Bank', subtitle: 'General submissions talent pool' };
      case 'cms':
        return { title: 'Website Content & Team', subtitle: 'Manage leadership team and site metrics' };
      default:
        return { title: 'Admin Portal', subtitle: 'Interskill Staffing Solutions' };
    }
  };

  const currentMeta = getTabTitle();

  return (
    <div className="adm-layout">
      {/* Sidebar Navigation */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar__brand">
          <div className="adm-sidebar__logo-title">
            <ShieldCheck size={22} color="#DDB568" />
            <span>INTERSKILL</span>
          </div>
          <span className="adm-sidebar__logo-tag">Admin</span>
        </div>

        <nav className="adm-sidebar__nav">
          <div className="adm-nav-heading">Main Navigation</div>

          <button
            className={`adm-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNavigateTab('dashboard')}
          >
            <div className="adm-nav-item__left">
              <LayoutDashboard size={17} />
              <span>Dashboard</span>
            </div>
          </button>

          <div className="adm-nav-heading">Employer & Lead Inquiries</div>

          <button
            className={`adm-nav-item ${activeTab === 'employer-leads' ? 'active' : ''}`}
            onClick={() => handleNavigateTab('employer-leads')}
          >
            <div className="adm-nav-item__left">
              <Building2 size={17} />
              <span>Employer Leads</span>
            </div>
            {newLeads > 0 && <span className="adm-badge-count">{newLeads}</span>}
          </button>

          <button
            className={`adm-nav-item ${activeTab === 'callbacks' ? 'active' : ''}`}
            onClick={() => handleNavigateTab('callbacks')}
          >
            <div className="adm-nav-item__left">
              <PhoneCall size={17} />
              <span>Callback Queue</span>
            </div>
            {pendingCallbacks > 0 && (
              <span className="adm-badge-count adm-badge-count--alert">{pendingCallbacks}</span>
            )}
          </button>

          <button
            className={`adm-nav-item ${activeTab === 'consultations' ? 'active' : ''}`}
            onClick={() => handleNavigateTab('consultations')}
          >
            <div className="adm-nav-item__left">
              <MessageSquare size={17} />
              <span>Consultations</span>
            </div>
          </button>

          <div className="adm-nav-heading">Recruitment & Candidates</div>

          <button
            className={`adm-nav-item ${activeTab === 'job-board' ? 'active' : ''}`}
            onClick={() => handleNavigateTab('job-board')}
          >
            <div className="adm-nav-item__left">
              <Briefcase size={17} />
              <span>Job Postings</span>
            </div>
            <span style={{ fontSize: '11px', color: '#8899A6' }}>{jobs.length}</span>
          </button>

          <button
            className={`adm-nav-item ${activeTab === 'applicants' ? 'active' : ''}`}
            onClick={() => handleNavigateTab('applicants')}
          >
            <div className="adm-nav-item__left">
              <Users size={17} />
              <span>Applicants</span>
            </div>
            {newApplicants > 0 && <span className="adm-badge-count">{newApplicants}</span>}
          </button>

          <button
            className={`adm-nav-item ${activeTab === 'resumes' ? 'active' : ''}`}
            onClick={() => handleNavigateTab('resumes')}
          >
            <div className="adm-nav-item__left">
              <FileText size={17} />
              <span>Resume Bank</span>
            </div>
            <span style={{ fontSize: '11px', color: '#8899A6' }}>{resumes.length}</span>
          </button>

          <div className="adm-nav-heading">Site Management</div>

          <button
            className={`adm-nav-item ${activeTab === 'cms' ? 'active' : ''}`}
            onClick={() => handleNavigateTab('cms')}
          >
            <div className="adm-nav-item__left">
              <Settings size={17} />
              <span>Team & Metrics</span>
            </div>
          </button>
        </nav>

        <div className="adm-sidebar__footer">
          <button
            className="adm-btn-website"
            onClick={() => onNavigate && onNavigate('home')}
          >
            <ExternalLink size={14} />
            <span>View Public Website</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="adm-main">
        {/* Topbar */}
        <header className="adm-topbar">
          <div className="adm-topbar__title-group">
            <h1>{currentMeta.title}</h1>
            <p>{currentMeta.subtitle}</p>
          </div>

          <div className="adm-topbar__actions">
            <button
              className="adm-btn-action adm-btn-secondary"
              onClick={() => onNavigate && onNavigate('home')}
            >
              <ExternalLink size={13} /> Public Site
            </button>

            <div className="adm-user-profile">
              <div className="adm-user-avatar">IS</div>
              <div className="adm-user-meta">
                <span className="adm-user-meta__name">Interskill Admin</span>
                <span className="adm-user-meta__role">Recruitment Operations</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="adm-content">
          {activeTab === 'dashboard' && (
            <AdminDashboard
              leads={leads}
              jobs={jobs}
              applicants={applicants}
              callbacks={callbacks}
              consultations={consultations}
              onNavigateTab={handleNavigateTab}
              onUpdateLeadStatus={handleUpdateLeadStatus}
              onUpdateCallbackStatus={handleUpdateCallbackStatus}
            />
          )}

          {activeTab === 'employer-leads' && (
            <EmployerLeadsView
              leads={leads}
              onUpdateStatus={handleUpdateLeadStatus}
              onDeleteLead={handleDeleteLead}
            />
          )}

          {activeTab === 'callbacks' && (
            <CallbacksView
              callbacks={callbacks}
              onUpdateStatus={handleUpdateCallbackStatus}
              onDeleteCallback={handleDeleteCallback}
            />
          )}

          {activeTab === 'job-board' && (
            <JobBoardView
              jobs={jobs}
              applicants={applicants}
              onSaveJob={handleSaveJob}
              onDeleteJob={handleDeleteJob}
              initialOpenAdd={tabOptions.openAddModal}
            />
          )}

          {activeTab === 'applicants' && (
            <ApplicantsView
              applicants={applicants}
              jobs={jobs}
              onUpdateStatus={handleUpdateApplicantStatus}
              onDeleteApplicant={handleDeleteApplicant}
            />
          )}

          {activeTab === 'consultations' && (
            <ConsultationsView
              consultations={consultations}
              onUpdateStatus={handleUpdateConsultationStatus}
              onDeleteConsultation={handleDeleteConsultation}
            />
          )}

          {activeTab === 'resumes' && (
            <ResumeBankView
              resumes={resumes}
              onDeleteResume={handleDeleteResume}
            />
          )}

          {activeTab === 'cms' && (
            <WebsiteCMSView
              team={team}
              stats={stats}
              onSaveTeam={handleSaveTeam}
              onSaveStats={handleSaveStats}
            />
          )}
        </main>
      </div>
    </div>
  );
}
