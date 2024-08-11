const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

//These are trips enpoints
router
    .route('/trips') 
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);

    //These are out REST methods
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;
