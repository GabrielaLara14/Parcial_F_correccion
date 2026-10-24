const HttpError = require('../errors/HttpError');
const { PROJECT_STATUS } = require('../constants/projectConstants');
const { NAME_MAX_LENGTH } = require('../constants/fieldLimits');
const {
  requireObject,
  requireText,
  requirePositiveInteger,
  requireNonNegativeNumber,
  requireOneOf,
  isMissing
} = require('./fieldValidators');

const validateProjectId = (projectId) => requirePositiveInteger(projectId, 'projectId');

const validateProjectInput = (body) => {
  const { name, directorEngineerId, supervisorEngineerId } = requireObject(body);
  const director = requirePositiveInteger(directorEngineerId, 'directorEngineerId');
  const supervisor = isMissing(supervisorEngineerId)
    ? null
    : requirePositiveInteger(supervisorEngineerId, 'supervisorEngineerId');
  if (supervisor === director) {
    throw new HttpError(400, 'The director and the supervisor must be different engineers');
  }
  return {
    name: requireText(name, 'name', NAME_MAX_LENGTH),
    directorEngineerId: director,
    supervisorEngineerId: supervisor
  };
};

const validateContractorAssignmentInput = (body) => {
  const { contractorId, contractValue } = requireObject(body);
  return {
    contractorId: requirePositiveInteger(contractorId, 'contractorId'),
    contractValue: requireNonNegativeNumber(contractValue, 'contractValue')
  };
};

const validateContractorCountQuery = (query) => {
  const { status, minimumValue } = query;
  return {
    status: requireOneOf(status, Object.values(PROJECT_STATUS), 'status'),
    minimumValue: requireNonNegativeNumber(minimumValue, 'minimumValue')
  };
};

module.exports = {
  validateProjectId,
  validateProjectInput,
  validateContractorAssignmentInput,
  validateContractorCountQuery
};
