import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import {
  getProfile,
  createProfile,
  getAllProfiles,
  getProfilebyUserId,
  deleteProfile,
  updateExperience,
  deleteExperience,
  updateEducation,
} from '../../controllers/profileController.js';
import {
  profileValidation,
  experienceValidation,
  educationValidation,
} from '../../middlewares/profileValidator.js';
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
router.put(
  '/experience',
  authMiddleware,
  experienceValidation(),
  validate,
  (req, res) => {
    return updateExperience(req, res);
  }
);
router.delete('/experience/:experience_id', authMiddleware, (req, res) => {
  return deleteExperience(req, res);
});

router.put(
  '/education',
  authMiddleware,
  educationValidation(),
  validate,
  (req, res) => {
    return updateEducation(req, res);
  }
);

router.delete('/', authMiddleware, (req, res) => {
  return deleteProfile(req, res);
});

export default router;
