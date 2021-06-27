const { promiseImpl } = require('ejs');
const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please try again with correct email'),
    body('password', 'Please try again with correct password')
      .isLength({ min: 5, max: 16 })
      .isAlphanumeric(),
  ],
  authController.postLogin
);

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'This e-mail already taken, please pick a different one'
            );
          }
        });
      }),
    body(
      'password',
      'Please enter a password with only numbers and text and between 5-16 characters'
    )
      .isLength({ min: 5, max: 16 })
      .isAlphanumeric(),
    body('confirmPassword').custom((value, { req }) => {
      if (!value === req.body.password) {
        throw new Error('Passwords have to match!');
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
