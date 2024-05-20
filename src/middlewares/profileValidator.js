import { body } from 'express-validator';

export const profileValidation = () => {
  return [
    body('status')
      .not()
      .isEmpty()
      .withMessage('Status is required.')
      .isLength({
        min: 2,
      })
      .withMessage('Status must be at least 2 characters.'),
    body('skills')
      .not()
      .isEmpty()
      .withMessage('Skills is required.')
      .isLength({
        min: 2,
      })
      .withMessage('Status must be at least 2 characters.'),
  ];
};
