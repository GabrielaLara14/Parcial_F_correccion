const mysql = require('mysql2/promise');
const { professionalsDatabase, projectsDatabase } = require('../env/appConfig');

const professionalsPool = mysql.createPool(professionalsDatabase);
const projectsPool = mysql.createPool(projectsDatabase);

const runInTransaction = async (pool, work) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await work(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = { professionalsPool, projectsPool, runInTransaction };
