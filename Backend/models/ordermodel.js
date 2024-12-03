// models/ordermodel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    pizzaFlavor: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
