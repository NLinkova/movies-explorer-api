const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate(link) {
      return /http[s]?:\/\/(www.)?[\S]+\.[a-z]+[\S]*/gi.test(link);
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate(link) {
      return /http[s]?:\/\/(www.)?[\S]+\.[a-z]+[\S]*/gi.test(link);
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate(link) {
      return /http[s]?:\/\/(www.)?[\S]+\.[a-z]+[\S]*/gi.test(link);
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
