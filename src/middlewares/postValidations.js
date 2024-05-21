import { body } from 'express-validator';

export const createPostValidation = () => {
  return [
    body('text')
      .not()
      .isEmpty()
      .withMessage('Text field is required.')
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters.'),
  ];
};
