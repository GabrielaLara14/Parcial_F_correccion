const { NAME_MAX_LENGTH, TAX_ID_MAX_LENGTH } = require('../constants/fieldLimits');
const { requireObject, requireText } = require('./fieldValidators');

const validateContractorInput = (body) => {
  const { name, taxId } = requireObject(body);
  return {
    name: requireText(name, 'name', NAME_MAX_LENGTH),
    taxId: requireText(taxId, 'taxId', TAX_ID_MAX_LENGTH)
  };
};

module.exports = { validateContractorInput };
