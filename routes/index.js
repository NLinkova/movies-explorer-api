const router = require('express').Router();
const userRouter = require('./userRoutes');
const movieRouter = require('./movieRoutes');
const { login, createUser } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const { userValidator, userLoginValidator } = require('../middlewares/userValidator');
const ErrorNotFound = require('../errors/ErrorNotFound');
// routes
router.post('/signup', userValidator, createUser);
router.post('/signin', userLoginValidator, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.all('*', (req, res, next) => {
  next(new ErrorNotFound('Ресурс по указанному адресу не найден'));
});

module.exports = router;
