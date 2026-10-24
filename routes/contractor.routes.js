const express = require('express');
const contractorController = require('../controllers/contractor.controller');

const router = express.Router();

router.post('/', contractorController.registerContractor);

module.exports = router;
