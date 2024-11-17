import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Create a user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  avataar: {
    type: String,
  },
  school: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  connections: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      status: { type: String, enum: ['pending', 'accepted', 'incomming'], default: 'pending' },
      direction: { type: String, enum: ['sent', 'received'], required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to encrypt password
userSchema.pre('save', async function (next) {
  // Check if the password is modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// Create a model based on the schema
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
