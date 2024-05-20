import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();
connectDB();

import authRouter from './routes/api/auth.js';
import postsRouter from './routes/api/posts.js';
import profileRouter from './routes/api/profile.js';
import usersRouter from './routes/api/users.js';

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

server.use('/api/auth', authRouter);
server.use('/api/posts', postsRouter);
server.use('/api/profile', profileRouter);
server.use('/api/users', usersRouter);
