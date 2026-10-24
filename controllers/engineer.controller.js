const engineerService = require('../services/engineer.service');
const { validateEngineerInput } = require('../validators/engineer.validator');

const registerEngineer = async (req, res) => {
  const engineerData = validateEngineerInput(req.body);
  const engineer = await engineerService.registerEngineer(engineerData);
  res.status(201).json(engineer);
};

module.exports = { registerEngineer };
