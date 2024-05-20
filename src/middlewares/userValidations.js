import { body } from 'express-validator';

export const createUserValidation = () => {
  return [
    body('name')
      .not()
      .isEmpty()
      .withMessage('Name is required.')
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters.'),
    body('email')
      .isString()
      .withMessage('E-mail is required.')
      .isEmail()
      .withMessage('Enter a valid e-mail address.'),
    body('password')
      .isString()
      .withMessage('Password is required.')
      .isLength({ min: 6 })
      .withMessage('The password needs at least 6 characters.'),
  ];
};
