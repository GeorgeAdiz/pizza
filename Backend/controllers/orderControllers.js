const Order = require('../models/ordermodel');
const mongoose = require('mongoose');

// get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({createdAt: -1});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching orders' });
    }
};

// get a single order
const getOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such order' });
    }

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ error: 'No such order' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching order' });
    }
};

// create order
const createOrder = async (req, res) => {
    try {
        const { fullname, contactNumber, quantity, pizzaFlavor } = req.body;

        // Validate input
        if (!fullname || !contactNumber || !quantity || !pizzaFlavor) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create new order
        const newOrder = new Order({
            fullname,
            contactNumber,
            quantity,
            pizzaFlavor,
            orderDate: new Date(), // Timestamp for order date
        });

        // Save order to database
        await newOrder.save();

        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Failed to create order' });
    }
};

// delete order
const deleteOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such order' });
    }

    try {
        const order = await Order.findOneAndDelete({ _id: id });
        if (!order) {
            return res.status(400).json({ error: 'No such order' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting order' });
    }
};

// update order
const updateOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such order' });
    }

    try {
        const order = await Order.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if (!order) {
            return res.status(400).json({ error: 'No such order' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error updating order' });
    }
};

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder,
};
