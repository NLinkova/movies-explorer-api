const Movie = require('../models/movieModel');
const ErrorForbidden = require('../errors/ErrorForbidden');
const ErrorNotFound = require('../errors/ErrorNotFound');

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  Movie.findById({ _id: movieId })
    .orFail(() => {
      throw new ErrorNotFound('Такого фильма не существует');
    })
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        throw new ErrorForbidden('Вы не можете удалять чужие фильмы');
      }
      return Movie.findByIdAndRemove(movie._id);
    })
    .then((movie) => {
      res.status(200).send({ message: 'Успешно удален фильм:', data: movie });
    })
    .catch(next);
};
