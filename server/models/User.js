const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // For hashing passwords

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
}, {
  timestamps: true
});

// Hash password before saving the user model
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// Method to check if passwords match
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
