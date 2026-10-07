const express = require('express');
const router = express.Router();
const { createRestaurant, getRestaurants, getNearbyRestaurants, addMenuItem } = require('../controllers/restaurantController');
const protect = require('../middleware/authMiddleware');

router.get('/', getRestaurants);
router.get('/nearby', getNearbyRestaurants);
router.post('/', protect, createRestaurant);
router.post('/:restaurantId/menu', protect, addMenuItem);

module.exports = router;
