const mongoose = require('mongoose');

const User = mongoose.model('User', {
  username: {
    type: String,
    min: 3,
    max: 20,
    unique: true
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    unique: true
  },
  age: {
    type: Number
  },
  friends: {
    type: Array,
    default: []
  },
  games: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    value: Date.now()
  }
});

module.exports = {
  User
}
