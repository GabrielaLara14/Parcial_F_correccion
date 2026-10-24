const {
  NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  LICENSE_NUMBER_MAX_LENGTH
} = require('../constants/fieldLimits');
const { requireObject, requireText, requireMatch } = require('./fieldValidators');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEngineerInput = (body) => {
  const { fullName, email, licenseNumber } = requireObject(body);
  return {
    fullName: requireText(fullName, 'fullName', NAME_MAX_LENGTH),
    email: requireMatch(requireText(email, 'email', EMAIL_MAX_LENGTH), EMAIL_PATTERN, 'email'),
    licenseNumber: requireText(licenseNumber, 'licenseNumber', LICENSE_NUMBER_MAX_LENGTH)
  };
};

module.exports = { validateEngineerInput };
