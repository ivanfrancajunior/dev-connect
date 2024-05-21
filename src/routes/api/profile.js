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
  deleteEducation,
  getGithubRepos,
} from '../../controllers/profileController.js';
import {
  profileValidation,
  experienceValidation,
  validateEducation,
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
  validateEducation(),
  validate,
  (req, res) => {
    return updateEducation(req, res);
  }
);
router.delete('/education/:education_id', authMiddleware, (req, res) => {
  return deleteEducation(req, res);
});

router.delete('/', authMiddleware, (req, res) => {
  return deleteProfile(req, res);
});
router.get('/github/:username', (req, res) => {
  return getGithubRepos(req, res);
});

export default router;
