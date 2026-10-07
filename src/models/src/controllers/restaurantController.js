const Restaurant = require('../models/Restaurant');

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const { name, description, address, coordinates, cuisine } = req.body;

    const restaurant = new Restaurant({
      owner: req.user.id,
      name,
      description,
      address,
      location: {
        type: 'Point',
        coordinates: coordinates // [longitude, latitude]
      },
      cuisine
    });

    await restaurant.save();
    res.status(201).json({ success: true, data: restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all restaurants
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add item to restaurant menu
exports.addMenuItem = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, price, description, isVeg } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    restaurant.menu.push({ name, price, description, isVeg });
    await restaurant.save();

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
