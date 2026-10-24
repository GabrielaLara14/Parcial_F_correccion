const HttpError = require('../errors/HttpError');

const toNumber = (value) =>
  typeof value === 'string' && value.trim() !== '' ? Number(value) : value;

const requireObject = (value) => {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new HttpError(400, 'The request body must be a JSON object');
  }
  return value;
};

const requireText = (value, fieldName, maxLength) => {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new HttpError(400, `${fieldName} is required and must be a non-empty text`);
  }
  const text = value.trim();
  if (text.length > maxLength) {
    throw new HttpError(400, `${fieldName} must have at most ${maxLength} characters`);
  }
  return text;
};

const requireMatch = (text, pattern, fieldName) => {
  if (!pattern.test(text)) {
    throw new HttpError(400, `${fieldName} has an invalid format`);
  }
  return text;
};

const requirePositiveInteger = (value, fieldName) => {
  const number = toNumber(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new HttpError(400, `${fieldName} must be a positive integer`);
  }
  return number;
};

const requireNonNegativeNumber = (value, fieldName) => {
  const number = toNumber(value);
  if (typeof number !== 'number' || !Number.isFinite(number) || number < 0) {
    throw new HttpError(400, `${fieldName} must be a number greater than or equal to 0`);
  }
  return number;
};

const requireOneOf = (value, allowedValues, fieldName) => {
  if (!allowedValues.includes(value)) {
    throw new HttpError(400, `${fieldName} must be one of: ${allowedValues.join(', ')}`);
  }
  return value;
};

const isMissing = (value) => value === undefined || value === null;

module.exports = {
  requireObject,
  requireText,
  requireMatch,
  requirePositiveInteger,
  requireNonNegativeNumber,
  requireOneOf,
  isMissing
};
