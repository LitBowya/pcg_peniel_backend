import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }
        
        // Create new user
        const newUser = new User({
            name,
            email,
            password,
        });
        
        await newUser.save();
        
        res.status(201).json({ message: 'User registered successfully.', userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: `Error registering user: ${error.message}` });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Check if the user has a valid role
        if (!user.role) {
            return res.status(500).json({ message: 'User role not found' });
        }
        
        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role.name }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });
        
        res.json({message: 'User logged in successfully.', token });
    } catch (err) {
        res.status(500).json({ message: `Error authenticating user: ${err.message}` });
    }
};

export { registerUser, loginUser };
