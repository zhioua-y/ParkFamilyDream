const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['coffee', 'restaurant']
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
