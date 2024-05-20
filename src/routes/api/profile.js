import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import {
  getProfile,
  createProfile,
} from '../../controllers/profileController.js';
import { profileValidation } from '../../middlewares/profileValidator.js';
import { validate } from '../../middlewares/handleValidations.js';

const router = express.Router();

router.get('/me', authMiddleware, (req, res) => {
  return getProfile(req, res);
});

router.post('/', authMiddleware, profileValidation(), validate, (req, res) => {
  return createProfile(req, res);
});

export default router;
