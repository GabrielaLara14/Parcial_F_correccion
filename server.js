const express = require('express');
const { port } = require('./env/appConfig');
const engineerRoutes = require('./routes/engineer.routes');
const projectRoutes = require('./routes/project.routes');
const contractorRoutes = require('./routes/contractor.routes');
const notFoundHandler = require('./middlewares/notFound.middleware');
const errorHandler = require('./middlewares/error.middleware');

const api = express();

api.use(express.json());

api.use('/engineers', engineerRoutes);
api.use('/projects', projectRoutes);
api.use('/contractors', contractorRoutes);

api.use(notFoundHandler);
api.use(errorHandler);

api.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
