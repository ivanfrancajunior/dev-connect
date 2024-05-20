import express from 'express';
const router = express.Router();
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { getCurrentUser } from '../../controllers/userController.js';

router.get('/', authMiddleware, (req, res) => {
  return getCurrentUser(req, res);
});

export default router;
