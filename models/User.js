// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  twoFASecret: { type: String },
  is2FAEnabled: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);

