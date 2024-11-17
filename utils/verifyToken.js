import jwt from 'jsonwebtoken';

export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};
