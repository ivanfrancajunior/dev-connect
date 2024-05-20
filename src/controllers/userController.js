import dotenv from 'dotenv';
dotenv.config();
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const generateUserJwtToken = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: '7d' });
};

const generateAvatar = () => {
  return `https://robohash.org/${uuid()}?set=set3`;
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hasUser = await User.findOne({ email });

    if (hasUser) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    const avatar = generateAvatar();

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      avatar,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ _id: user._id, token: generateUserJwtToken(user._id) });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (user) return res.status(200).json(user);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

export const signUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(422).json({ errors: [{ msg: 'Invalid credentials' }] });

    return res.status(200).json({ token: generateUserJwtToken(user.id) });
  } catch (err) {}
};
