import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();
connectDB();
const server = express();

server.use(express.json());

server.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3011;

server.listen(PORT, () => {
  console.log('server running on port', PORT);
});

server.get('/api', (req, res) => {
  res.json({ message: 'hello world!' });
});
