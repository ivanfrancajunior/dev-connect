import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { getProfile } from '../../controllers/profileController.js';
const router = express.Router();

router.get('/me', authMiddleware, (req, res) => {
  return getProfile(req, res);
});

export default router;
