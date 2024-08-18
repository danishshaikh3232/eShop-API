const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //
const crypto = require('crypto'); // Required for generating the reset token


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: { type: String }, // Field to store the password reset token
  resetTokenExpiry: { type: Date } // Field to store the expiration date of the reset token
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare hashed passwords
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate a password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetToken = resetToken;
  this.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
