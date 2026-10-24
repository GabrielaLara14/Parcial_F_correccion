const { projectsPool } = require('../services/mysql.service');

const insertContractor = async ({ name, taxId }) => {
  const [result] = await projectsPool.query('INSERT INTO contractor (name, tax_id) VALUES (?, ?)', [
    name,
    taxId
  ]);
  return result.insertId;
};

const findContractorById = async (contractorId) => {
  const [rows] = await projectsPool.query(
    'SELECT id, name, tax_id AS taxId FROM contractor WHERE id = ?',
    [contractorId]
  );
  return rows[0] ?? null;
};

module.exports = { insertContractor, findContractorById };
