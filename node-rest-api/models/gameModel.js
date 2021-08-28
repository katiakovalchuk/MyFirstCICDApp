const mongoose = require('mongoose');

const Game = mongoose.model('Game', {
  title: {
    type: String,
    min: 3,
    max: 20,
    unique: true
  },
  price: {
    type: Number,
    min: 0,
    max: 100000
  },
  description: String
});

module.exports = {
  Game
}
