const HttpError = require('../errors/HttpError');

const notFoundHandler = (req, res, next) => {
  next(new HttpError(404, 'Route not found'));
};

module.exports = notFoundHandler;
