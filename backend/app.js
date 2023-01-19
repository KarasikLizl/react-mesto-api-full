/* eslint-disable no-useless-escape */

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { celebrate, Joi, errors } from 'celebrate';
import usersRoutes from './routes/users.js';
import cardRoutes from './routes/cards.js';
import notFoundRouter from './routes/notFoud.js';
import { createUser, login } from './controllers/users.js';
import { auth } from './middlewares/auth.js';
import { errorHandler } from './middlewares/error-handler.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

const __dirname = path.resolve();
const app = express();
const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
// Request logger
app.use(requestLogger);

//  Not protected
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
      .regex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use(auth);
//  Protected
app.use(usersRoutes);
app.use(cardRoutes);
app.use(notFoundRouter);
// Error logger
app.use(errorLogger);
//  Errors
app.use(errors());
app.use(errorHandler);

async function connect() {
  await mongoose.connect(MONGO_URL, {});
  app.listen(PORT);
}

connect();
