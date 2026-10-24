const projectService = require('../services/project.service');
const {
  validateProjectId,
  validateProjectInput,
  validateContractorAssignmentInput,
  validateContractorCountQuery
} = require('../validators/project.validator');

const registerProject = async (req, res) => {
  const projectData = validateProjectInput(req.body);
  const project = await projectService.registerProject(projectData);
  res.status(201).json(project);
};

const getProjectStatus = async (req, res) => {
  const projectId = validateProjectId(req.params.projectId);
  const project = await projectService.getProjectStatus(projectId);
  res.json(project);
};

const assignContractor = async (req, res) => {
  const projectId = validateProjectId(req.params.projectId);
  const assignmentData = validateContractorAssignmentInput(req.body);
  const assignment = await projectService.assignContractor(projectId, assignmentData);
  res.status(201).json(assignment);
};

const getContractorCounts = async (req, res) => {
  const filters = validateContractorCountQuery(req.query);
  const counts = await projectService.countContractorsByStatus(filters);
  res.json(counts);
};

module.exports = { registerProject, getProjectStatus, assignContractor, getContractorCounts };
