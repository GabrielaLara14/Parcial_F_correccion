const express = require('express');
const engineerController = require('../controllers/engineer.controller');

const router = express.Router();

router.post('/', engineerController.registerEngineer);

module.exports = router;
