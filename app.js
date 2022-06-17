const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const helmet = require('helmet');

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { CORS_CONFIG } = require('./helpers/cors-options');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/index');

const limiter = require('./helpers/limiter');

const { DATA_BASE, NODE_ENV } = process.env;

// Слушаем 3000
const { PORT = 3000 } = process.env;

const app = express();

// подключаемся к серверу mongo
mongoose.connect(NODE_ENV === 'production' ? DATA_BASE : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.options('*', cors(CORS_CONFIG));
app.use(cors(CORS_CONFIG));
// app.use(helmet());

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(requestLogger);
app.use(helmet());

// Apply the rate limiting middleware to API calls only
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
