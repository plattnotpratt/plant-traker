const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const authmw = require('./auth/middlewares');
const boards = require('./api/boards');
const tasks = require('./api/tasks');
const plants = require('./api/plants');

require('dotenv').config();


const middlewares = require('./middlewares');
const auth = require('./auth');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:8080'
}));
app.use(express.json());
app.use(authmw.checkTokenSetUser);


app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    user: req.user,
  });
});

app.use('/auth', auth);
app.use('/api/v1/pla', authmw.isLoggedIn, boards);
app.use('/api/v1/tasks', authmw.isLoggedIn, tasks);
app.use('/api/v1/plants', plants);
app.use('/api/v1/plant-images', plant - images);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;