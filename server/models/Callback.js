import mongoose from 'mongoose';

const callbackSchema = new mongoose.Schema(
  {
    callbackId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    topic: { type: String, default: 'General enquiry' },
    source: { type: String, default: 'Website Callback Banner' },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'Closed'],
      default: 'Pending',
    },
    formattedDate: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Callback', callbackSchema);
