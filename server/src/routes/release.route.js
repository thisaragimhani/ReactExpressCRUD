//forward the supported requests (and any information encoded in request URLs) to the appropriate controller functions.

const express = require('express');
const router = express.Router();

const releaseController = require('../controllers/release.controller');

//get all releases
router.get('/',releaseController.getReleaseList);

//get release by ID
router.get('/:id', releaseController.getReleaseByID);

//create new release
router.post('/', releaseController.createNewRelease);

//update release by ID
router.put('/:id', releaseController.updateRelease);

//delete release
router.delete('/:id',releaseController.deleteRelease);

module.exports = router;