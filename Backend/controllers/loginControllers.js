const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const account = require('../models/User');  // Assuming you're using the User model for registration
const SECRET_KEY = 'your_secret_key';

// Login user function
const loginUser = async (req, res) => {
    const { email, password } = req.body;  // Accept email and password

    // Validate if both email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Find the user by email (not username)
        const user = await account.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare password with hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

        // Send the JWT token as a cookie (httpOnly and secure)
        res.cookie('auth_token', token, {
            httpOnly: true,  // This makes the cookie accessible only through HTTP requests, not JavaScript
            secure: process.env.NODE_ENV === 'production',  // Set this to true in production
            maxAge: 3600000,  // Token expires in 1 hour
        });

        // Respond with success message
        res.status(200).json(user);

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    loginUser,
};
