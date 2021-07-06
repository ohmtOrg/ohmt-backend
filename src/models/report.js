import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    govfeedback: {
      type: String,
      unique: false,
    },
    impfeedback: {
      type: String,
      unique: false,
    },
    impl: [
      {
        id: {
          type: Number,
          required: true,
          unique: false,
        },
        scores: [
          {
            type: String,
            required: true,
            unique: false,
          },
        ],
        // qs: {
        //   type: Number,
        //   required: true,
        //   unique: false,
        // },
        value: {
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
    gov: [
      {
        id: {
          type: Number,
          required: true,
          unique: false,
        },
        scores: [
          {
            type: String,
            required: true,
            unique: false,
          },
        ],
        // qs: {
        //   type: String,
        //   required: true,
        //   unique: false,
        // },
        value: {
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
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// reportSchema.index({ user: 1 }, { unique: true });

export const Report = mongoose.model('Report', reportSchema);
