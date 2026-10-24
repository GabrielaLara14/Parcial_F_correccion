const engineerDao = require('../dao/engineer.dao');
const { ENGINEER_STATUS } = require('../constants/engineerConstants');

const registerEngineer = async (engineerData) => {
  const status = ENGINEER_STATUS.ACTIVE;
  const id = await engineerDao.insertEngineer({ ...engineerData, status });
  return { id, ...engineerData, status };
};

module.exports = { registerEngineer };
