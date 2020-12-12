const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(morgan('combined'))
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;
