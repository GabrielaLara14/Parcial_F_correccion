const HttpError = require('../errors/HttpError');

const DUPLICATE_ENTRY_CODE = 'ER_DUP_ENTRY';
const INVALID_JSON_TYPE = 'entity.parse.failed';

const errorHandler = (error, req, res, _next) => {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  if (error.code === DUPLICATE_ENTRY_CODE) {
    return res.status(409).json({ error: 'The resource already exists' });
  }
  if (error.type === INVALID_JSON_TYPE) {
    return res.status(400).json({ error: 'The request body is not valid JSON' });
  }
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;
