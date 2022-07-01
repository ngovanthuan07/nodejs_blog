const express = require('express');
const router = express.Router();

const listingController = require('../app/controllers/ListingController');

router.use('/courses', listingController.index);
router.use('/users', listingController.index);

module.exports = router;