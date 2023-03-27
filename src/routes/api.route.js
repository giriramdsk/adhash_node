const express = require('express');
const router = express.Router();
const CarController = require('../controller/api.controller');
const carController = new CarController();

// GET /api/cars/makes
router.get('/makes', (req, res, next) => {
  carController.boot(req, res, next).getMakes();
});

// GET /api/cars/models/:make
router.get('/models/:make', (req, res, next) => {
  carController.boot(req, res, next).getModels();
});

// GET /api/cars/years/:make/:model
router.get('/years/:make/:model', (req, res, next) => {
  carController.boot(req, res, next).getYears();
});

// POST /trims/
router.post('/trims', (req, res, next) => {
  carController.boot(req, res, next).getTrims();
});


module.exports = router;
