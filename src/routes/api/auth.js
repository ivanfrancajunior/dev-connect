import express from 'express';
const router = express.Router();
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { validate } from '../../middlewares/handleValidations.js';
import { loginValidation } from '../../middlewares/userValidations.js';
import { getCurrentUser, signUser } from '../../controllers/userController.js';

router.get('/', authMiddleware, (req, res) => {
  return getCurrentUser(req, res);
});
router.post('/signin', loginValidation(), validate, (req, res) => {
  return signUser(req, res);
});

export default router;
