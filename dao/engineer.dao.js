const { professionalsPool, runInTransaction } = require('../services/mysql.service');

const insertEngineer = ({ fullName, email, licenseNumber, status }) =>
  runInTransaction(professionalsPool, async (connection) => {
    const [engineerResult] = await connection.query(
      'INSERT INTO engineer (full_name, email, status) VALUES (?, ?, ?)',
      [fullName, email, status]
    );
    await connection.query(
      'INSERT INTO professional_license (engineer_id, license_number) VALUES (?, ?)',
      [engineerResult.insertId, licenseNumber]
    );
    return engineerResult.insertId;
  });

const findEngineerById = async (engineerId) => {
  const [rows] = await professionalsPool.query(
    'SELECT id, full_name AS fullName, email, status FROM engineer WHERE id = ?',
    [engineerId]
  );
  return rows[0] ?? null;
};

module.exports = { insertEngineer, findEngineerById };
