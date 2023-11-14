const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or Email already in use' });
    }
    const user = new User({ username, email, password });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ username: user.username, userId: user._id }, 'your_secret_key', {
        expiresIn: '1h', // Token validity duration
      });
      res.json({ token, expiresIn: 3600 }); // Respond with the token and its expiration time
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    // if (!token || !token.startsWith('Bearer ')) {
    //   return res.status(401).json({ message: 'Unauthorized' });
    // }
  
    const extractedToken = token.split(' ')[1];
    jwt.verify(extractedToken, 'your_secret_key', (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.userData = { username: decodedToken.username, userId: decodedToken.userId };
      next();
    });
  };
