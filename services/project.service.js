const HttpError = require('../errors/HttpError');
const projectDao = require('../dao/project.dao');
const engineerDao = require('../dao/engineer.dao');
const contractorDao = require('../dao/contractor.dao');
const { ENGINEER_STATUS } = require('../constants/engineerConstants');
const {
  PROJECT_STATUS,
  MAX_ACTIVE_PROJECTS_PER_ENGINEER
} = require('../constants/projectConstants');

// El ingeniero vive en otra base de datos, por eso no hay llave foránea y se valida aquí.
const assertEngineerCanTakeProject = async (engineerId, roleName) => {
  const engineer = await engineerDao.findEngineerById(engineerId);
  if (!engineer) {
    throw new HttpError(404, `The ${roleName} engineer ${engineerId} does not exist`);
  }
  if (engineer.status !== ENGINEER_STATUS.ACTIVE) {
    throw new HttpError(409, `The ${roleName} engineer ${engineerId} is not active in the company`);
  }
  const activeProjects = await projectDao.countActiveProjectsByEngineer(engineerId);
  if (activeProjects >= MAX_ACTIVE_PROJECTS_PER_ENGINEER) {
    throw new HttpError(
      409,
      `The ${roleName} engineer ${engineerId} already has ${MAX_ACTIVE_PROJECTS_PER_ENGINEER} active projects`
    );
  }
};

const assertProjectExists = async (projectId) => {
  const project = await projectDao.findProjectById(projectId);
  if (!project) {
    throw new HttpError(404, `The project ${projectId} does not exist`);
  }
  return project;
};

const registerProject = async (projectData) => {
  const { directorEngineerId, supervisorEngineerId } = projectData;
  await assertEngineerCanTakeProject(directorEngineerId, 'director');
  if (supervisorEngineerId !== null) {
    await assertEngineerCanTakeProject(supervisorEngineerId, 'supervisor');
  }
  const status = PROJECT_STATUS.PLANNED;
  const id = await projectDao.insertProject({ ...projectData, status });
  return { id, ...projectData, status };
};

const getProjectStatus = (projectId) => assertProjectExists(projectId);

const assignContractor = async (projectId, { contractorId, contractValue }) => {
  await assertProjectExists(projectId);
  const contractor = await contractorDao.findContractorById(contractorId);
  if (!contractor) {
    throw new HttpError(404, `The contractor ${contractorId} does not exist`);
  }
  await projectDao.insertProjectContractor({ projectId, contractorId, contractValue });
  return { projectId, contractorId, contractValue };
};

const countContractorsByStatus = ({ status, minimumValue }) =>
  projectDao.countContractorsByProjectStatus(status, minimumValue);

module.exports = {
  registerProject,
  getProjectStatus,
  assignContractor,
  countContractorsByStatus
};
