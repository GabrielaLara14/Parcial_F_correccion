const contractorDao = require('../dao/contractor.dao');

const registerContractor = async (contractorData) => {
  const id = await contractorDao.insertContractor(contractorData);
  return { id, ...contractorData };
};

module.exports = { registerContractor };
