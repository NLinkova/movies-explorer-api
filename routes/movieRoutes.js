const router = require('express').Router();
const { movieValidator, movieIdValidator } = require('../middlewares/movieValidator');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movieController');

router.get('/', getMovies);
router.delete('/:movieId', movieIdValidator, deleteMovie);
router.post('/', movieValidator, createMovie);

module.exports = router;
