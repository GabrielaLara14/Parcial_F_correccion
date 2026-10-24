const express = require('express');
const projectController = require('../controllers/project.controller');

const router = express.Router();

router.post('/', projectController.registerProject);
router.get('/contractor-counts', projectController.getContractorCounts);
router.get('/:projectId/status', projectController.getProjectStatus);
router.post('/:projectId/contractors', projectController.assignContractor);

module.exports = router;
