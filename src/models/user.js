import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    section: {
      type: String,
    },
    platformName: {
      type: String,
    },
    otherInfo: {
      type: String,
    },
    subRegion: {
      type: String,
    },
    assesmentDate: {
      type: String,
    },
    creationDate: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    oneHealth: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      // required: false,
    },
    region: {
      type: String,
      // required: true,
    },
    countryCode: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['ADMIN', 'NORMAL', 'SA', 'RM'],
      default: 'NORMAL',
    },
    activated: {
      type: Boolean,
      required: true,
      default: false,
    },
    organisation: {
      type: String,
      // required: true,
    },
    // organisation: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: 'org',
    //   required: false,
    // },
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

export const User = mongoose.model('User', userSchema);
