require('dotenv').config();

const REQUIRED_VARIABLES = [
  'PORT',
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'PROFESSIONALS_DB_NAME',
  'PROJECTS_DB_NAME'
];

const missingVariables = REQUIRED_VARIABLES.filter(
  (variableName) => process.env[variableName] === undefined
);

if (missingVariables.length > 0) {
  throw new Error(`Missing environment variables: ${missingVariables.join(', ')}`);
}

const buildDatabaseConfig = (databaseName) => ({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: databaseName
});

module.exports = {
  port: Number(process.env.PORT),
  professionalsDatabase: buildDatabaseConfig(process.env.PROFESSIONALS_DB_NAME),
  projectsDatabase: buildDatabaseConfig(process.env.PROJECTS_DB_NAME)
};
