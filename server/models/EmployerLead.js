import mongoose from 'mongoose';

const employerLeadSchema = new mongoose.Schema(
  {
    leadId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    category: { type: String, default: 'General Requirement' },
    openings: { type: String, default: '1-2' },
    description: { type: String, default: '' },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Profiles Shared', 'Closed'],
      default: 'New',
    },
    formattedDate: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('EmployerLead', employerLeadSchema);
