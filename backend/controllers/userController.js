import User from '../models/User.js';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

const generateToken = (userId) => {
  return sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const user = new User({ username, password, role });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Validate input
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }
  
      // Find user by username
      const user = await User.findOne({ username });
  
      // Check if user exists and password matches
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = generateToken(user._id);
  
      // Exclude password from the response
      const { password: _, ...userWithoutPassword } = user.toObject();
  
      // Send success response
      res.json({ user: userWithoutPassword, token });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during login' });
    }
  };
  

const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }, { username: 1 });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export  { register, login, getAdmins };