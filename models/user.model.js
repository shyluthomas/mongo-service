const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  userid: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  cache: {
    type: Object,
    required: true
  },
  date: { type: Date, required: true }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;