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
export const experienceValidation = () => {
  return [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required.'),
    body('company')
      .not()
      .isEmpty().withMessage('Company is required.'),
    body('from')
      .not()
      .isEmpty()
      .withMessage('From date is required.'),
    

  ];
};
