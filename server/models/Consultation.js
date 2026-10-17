import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema(
  {
    consultationId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    requirementType: { type: String, default: "I'm looking for a job" },
    preferredRole: { type: String, default: 'General consultation' },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Closed'],
      default: 'New',
    },
    formattedDate: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Consultation', consultationSchema);
