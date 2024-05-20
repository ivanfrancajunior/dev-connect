import express from 'express';
const router = express.Router();
import { createUserValidation } from '../../middlewares/userValidations.js';

import { validate } from '../../middlewares/handleValidations.js';
import { register } from '../../controllers/userController.js';

router.post('/', createUserValidation(), validate, (req, res) => {
  return register(req, res);
});

export default router;
