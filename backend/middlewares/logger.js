/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
import winston from 'winston';
import expressWinston from 'express-winston';

// Логер запросов
export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

// Логер ошибок
export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});
