const { projectsPool } = require('../services/mysql.service');
const { PROJECT_STATUS } = require('../constants/projectConstants');

const insertProject = async ({ name, directorEngineerId, supervisorEngineerId, status }) => {
  const [result] = await projectsPool.query(
    `INSERT INTO project (name, director_engineer_id, supervisor_engineer_id, status)
     VALUES (?, ?, ?, ?)`,
    [name, directorEngineerId, supervisorEngineerId, status]
  );
  return result.insertId;
};

const findProjectById = async (projectId) => {
  const [rows] = await projectsPool.query('SELECT id, name, status FROM project WHERE id = ?', [
    projectId
  ]);
  return rows[0] ?? null;
};

const countActiveProjectsByEngineer = async (engineerId) => {
  const [rows] = await projectsPool.query(
    `SELECT COUNT(*) AS activeProjects
     FROM project
     WHERE (director_engineer_id = ? OR supervisor_engineer_id = ?)
       AND status <> ?`,
    [engineerId, engineerId, PROJECT_STATUS.FINISHED]
  );
  return rows[0].activeProjects;
};

const insertProjectContractor = async ({ projectId, contractorId, contractValue }) => {
  await projectsPool.query(
    `INSERT INTO project_contractor (project_id, contractor_id, contract_value)
     VALUES (?, ?, ?)`,
    [projectId, contractorId, contractValue]
  );
};

const countContractorsByProjectStatus = async (status, minimumValue) => {
  const [rows] = await projectsPool.query(
    `SELECT p.id, p.name, COUNT(pc.contractor_id) AS contractorCount
     FROM project p
     LEFT JOIN project_contractor pc
       ON pc.project_id = p.id AND pc.contract_value >= ?
     WHERE p.status = ?
     GROUP BY p.id, p.name
     ORDER BY p.id`,
    [minimumValue, status]
  );
  return rows;
};

module.exports = {
  insertProject,
  findProjectById,
  countActiveProjectsByEngineer,
  insertProjectContractor,
  countContractorsByProjectStatus
};
