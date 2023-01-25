// eslint-disable-next-line import/prefer-default-export
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Ошибка на сервере' : err.message;

  // eslint-disable-next-line object-shorthand
  res.status(statusCode).send({ message: message });

  next();
};
