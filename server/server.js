import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import leadsRouter from './routes/leads.js';
import callbacksRouter from './routes/callbacks.js';
import consultationsRouter from './routes/consultations.js';
import jobsRouter from './routes/jobs.js';
import applicantsRouter from './routes/applicants.js';
import resumesRouter from './routes/resumes.js';
import cmsRouter from './routes/cms.js';
import authRouter from './routes/auth.js';

import Job from './models/Job.js';
import TeamMember from './models/TeamMember.js';
import SiteStats from './models/SiteStats.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Seed helper if DB is fresh
const seedInitialDatabase = async () => {
  try {
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      console.log('[Database Seed]: Seeding default jobs...');
      await Job.insertMany([
        {
          jobId: 'job-1',
          title: 'React Developer',
          isNew: true,
          company: 'TechNova Solutions',
          experience: '1 – 3 Years',
          location: 'Mumbai, Maharashtra',
          type: 'Full-Time',
          category: 'IT & Technology',
          tags: ['React', 'JavaScript', 'HTML'],
          description: 'Looking for an experienced React developer proficient in modern hooks, responsive CSS, and API integration.',
          status: 'Active',
          applicantsCount: 14,
        },
        {
          jobId: 'job-2',
          title: 'HR Executive',
          isNew: false,
          company: 'PeopleFirst HR',
          experience: '0 – 2 Years',
          location: 'Thane, Maharashtra',
          type: 'Full-Time',
          category: 'Human Resources',
          tags: ['HR Operations', 'Recruitment'],
          description: 'Manage full lifecycle talent acquisition, candidate screening, scheduling, and onboarding activities.',
          status: 'Active',
          applicantsCount: 22,
        },
        {
          jobId: 'job-3',
          title: 'Accounts Executive',
          isNew: false,
          company: 'FinEdge Consultancy',
          experience: '1 – 3 Years',
          location: 'Mumbai, Maharashtra',
          type: 'Full-Time',
          category: 'Finance & Accounting',
          tags: ['Tally', 'Accounting', 'Excel'],
          description: 'Handle general ledger, GST filing, reconciliation, and day-to-day accounts operations.',
          status: 'Active',
          applicantsCount: 9,
        },
        {
          jobId: 'job-4',
          title: 'Site Engineer',
          isNew: false,
          company: 'BuildRight Infra',
          experience: '2 – 5 Years',
          location: 'Navi Mumbai, Maharashtra',
          type: 'Full-Time',
          category: 'Engineering & Civil',
          tags: ['Civil', 'AutoCAD', 'Site Execution'],
          description: 'Supervise on-site construction operations, quality verification, and contractor coordination.',
          status: 'Active',
          applicantsCount: 17,
        },
      ]);
    }

    const teamCount = await TeamMember.countDocuments();
    if (teamCount === 0) {
      console.log('[Database Seed]: Seeding default leadership team...');
      await TeamMember.insertMany([
        {
          memberId: 'team-priya',
          name: 'Dr Priya Gawade',
          role: 'CEO of Interskill Solutions & Interskill Staffing Solutions',
          quote: 'People are not just resources; they are the real growth engines of any business.',
          image: '/images/team-priya.jpg',
          order: 0,
        },
        {
          memberId: 'team-shreyash',
          name: 'Shreyash Shirekar',
          role: 'Talent Acquisition & Business Development',
          quote: 'The right talent doesn’t just fill a role; it builds a future.',
          image: '/images/team-shreyash.jpg',
          order: 1,
        },
        {
          memberId: 'team-madhubabu',
          name: 'Madhubabu Gentyala',
          role: 'IT & Technology Talent Specialist',
          quote: 'Connecting the right technical talent with opportunities to grow, innovate and succeed.',
          image: '/images/team-madhubabu.png',
          order: 2,
        },
        {
          memberId: 'team-sahil',
          name: 'Sahil More',
          role: 'Cybersecurity Talent Specialist',
          quote: 'Building stronger digital teams by connecting cybersecurity talent with the right opportunities.',
          image: '/images/team-sahil.jpg',
          order: 3,
        },
        {
          memberId: 'team-yash',
          name: 'Yash Diwate',
          role: 'Digital Marketing & Creative Talent Specialist',
          quote: 'Great ideas begin with great people; connecting creative talent creates meaningful impact.',
          image: '/images/team-yash.jpg',
          order: 4,
        },
        {
          memberId: 'team-priyanka',
          name: 'Priyanka Ghuhagarkar',
          role: 'Branch Operations Manager',
          quote: 'Strong operations, teamwork and trust are the foundation of excellent service.',
          image: '/images/team-priyanka.png',
          order: 5,
        },
      ]);
    }

    const statsExist = await SiteStats.findOne({ key: 'global_stats' });
    if (!statsExist) {
      console.log('[Database Seed]: Initializing default site statistics...');
      await SiteStats.create({
        key: 'global_stats',
        industryFocus: '600+',
        professionalsConnected: '10000+',
        phone1: '9819461050',
        phone2: '8591207594',
        email1: 'shreyashhrinterskillsolutions@gmail.com',
        email2: 'interskillsolutions@gmail.com',
        address: '104, Jaganath Tower, above Parijat Sweets, Opp Nerul Railway Station (West), Sector 20.',
      });
    }
  } catch (err) {
    console.error('[Database Seed Error]:', err.message);
  }
};

// API Routes
app.use('/api/leads', leadsRouter);
app.use('/api/callbacks', callbacksRouter);
app.use('/api/consultations', consultationsRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/applicants', applicantsRouter);
app.use('/api/resumes', resumesRouter);
app.use('/api/cms', cmsRouter);
app.use('/api/auth', authRouter);

// Health check and root endpoints
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Interskill Staffing Solutions Backend API',
    documentation: 'Connected to MongoDB Atlas and Cloudinary',
    endpoints: {
      health: '/api/health',
      jobs: '/api/jobs',
      leads: '/api/leads',
      callbacks: '/api/callbacks',
      consultations: '/api/consultations',
      applicants: '/api/applicants',
      resumes: '/api/resumes',
      cms: '/api/cms',
    },
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', database: 'connected', timestamp: new Date() });
});

// Start Server & Connect MongoDB Atlas
connectDB().then(() => {
  seedInitialDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 [Interskill Backend API running on port ${PORT}]`);
    console.log(`📡 [Connected to MongoDB Atlas: interskillDB]`);
  });
});
