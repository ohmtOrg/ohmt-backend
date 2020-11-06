import mongoose from 'mongoose';

const orgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    description: String,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true }
);

orgSchema.index({ user: 1, name: 1 }, { unique: true });

export const Org = mongoose.model('Org', orgSchema);
