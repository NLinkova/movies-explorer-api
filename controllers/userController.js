const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorConflict = require('../errors/ErrorConflict');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  User.findOne({ email })
    .then((customer) => {
      if (customer) {
        throw new ErrorConflict(
          'Пользователь с таким email уже существует!',
        );
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      email, password: hash, name,
    })
      .then((user) => res.status(200).send({ data: user }))
      .catch((e) => {
        if (e.name === 'ValidationError') {
          throw new ErrorBadRequest('Невалидный email или имя');
        }
        return next(e);
      }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new ErrorNotFound('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      if (e.code === 11000) {
        const err = new ErrorConflict(
          'Пользователь с таким email уже существует!',
        );
        err.statusCode = 409;
        next(err);
      }
      next(e);
    });
};
