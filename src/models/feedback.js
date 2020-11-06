import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    notes: String,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    reportId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'report',
      required: true,
    },
  },
  { timestamps: true }
);

feedbackSchema.index({ reportId: 1 }, { unique: true });

export const Feedback = mongoose.model('feedback', feedbackSchema);
