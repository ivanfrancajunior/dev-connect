import express from 'express';
const router = express.Router();
import { createUserValidation } from '../../middlewares/userValidations.js';

import { validate } from '../../middlewares/handleValidations.js';

router.post('/', createUserValidation(), validate, (req, res) => {
  console.log(req.body);

  res.send('users route');
});

export default router;
