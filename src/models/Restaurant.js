const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  cuisine: [{ type: String }],
  rating: { type: Number, default: 0 },
  isOpen: { type: Boolean, default: true },
  menu: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String },
      isVeg: { type: Boolean, default: true },
      isAvailable: { type: Boolean, default: true }
    }
  ]
}, { timestamps: true });

restaurantSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Restaurant', restaurantSchema);
