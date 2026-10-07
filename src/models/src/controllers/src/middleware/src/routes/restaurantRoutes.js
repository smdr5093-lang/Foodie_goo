const express = require('express');
const router = express.Router();
const { createRestaurant, getRestaurants, addMenuItem } = require('../controllers/restaurantController');
const protect = require('../middleware/authMiddleware');

router.get('/', getRestaurants);
router.post('/', protect, createRestaurant);
router.post('/:restaurantId/menu', protect, addMenuItem);

module.exports = router;
