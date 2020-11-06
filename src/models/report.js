import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    data: [
      {
        _id: false,

        id: {
          type: Number,
          required: true,
        },
        score: {
          type: Number,
          required: true,
          unique: false,
        },
        feedback: {
          type: String,
          unique: false,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

reportSchema.index({ user: 1 }, { unique: true });

export const Report = mongoose.model('Report', reportSchema);
