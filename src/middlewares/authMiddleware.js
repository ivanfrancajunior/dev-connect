import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
  }

  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded;

    next();

  } catch (err) {

    console.log(err);
    
    return res.status(401).json({ errors: [{ msg: 'Invalid token' }] });
  }
};
