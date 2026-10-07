const Order = require('../models/Order');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { restaurant, items, totalAmount, deliveryAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items provided' });
    }

    const order = new Order({
      user: req.user.id,
      restaurant,
      items,
      totalAmount,
      deliveryAddress
    });

    await order.save();
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get logged-in user's orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('restaurant', 'name address');
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single order details
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('restaurant', 'name address');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
