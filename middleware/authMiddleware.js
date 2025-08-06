import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const key = process.env.KEY;

// middleware to verify it
const verifyToken = async (req,res,next)=> {
   let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    req.user = await User.findById(decoded._id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
}


export default verifyToken;