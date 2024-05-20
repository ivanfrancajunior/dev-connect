import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErros = [];

    errors.array().map((err) => extractedErros.push(err.msg));

    return res.status(400).json({ errors: extractedErros });
  }

  return next();
};
