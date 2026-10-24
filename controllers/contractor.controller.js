const contractorService = require('../services/contractor.service');
const { validateContractorInput } = require('../validators/contractor.validator');

const registerContractor = async (req, res) => {
  const contractorData = validateContractorInput(req.body);
  const contractor = await contractorService.registerContractor(contractorData);
  res.status(201).json(contractor);
};

module.exports = { registerContractor };
