import jwt from 'jsonwebtoken';

export const generateAccessToken = (user_id) => 
  jwt.sign({ id: user_id}, process.env.NEXT_JWT_ACCESS, { expiresIn: '15s' });

export const generateRefreshToken = (user) => 
  jwt.sign({ id: user._id }, process.env.NEXT_JWT_REFRESH, { expiresIn: '7d' });