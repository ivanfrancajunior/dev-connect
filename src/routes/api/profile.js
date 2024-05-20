import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import {
  getProfile,
  createProfile,
  getAllProfiles,
  getProfilebyUserId,
} from '../../controllers/profileController.js';
import { profileValidation } from '../../middlewares/profileValidator.js';
import { validate } from '../../middlewares/handleValidations.js';

const router = express.Router();

router.get('/user/:user_id', (req, res) => {
  return getProfilebyUserId(req, res);
});

router.get('/', (req, res) => {
  return getAllProfiles(req, res);
});

router.get('/me', authMiddleware, (req, res) => {
  return getProfile(req, res);
});

router.post('/', authMiddleware, profileValidation(), validate, (req, res) => {
  return createProfile(req, res);
});

export default router;
