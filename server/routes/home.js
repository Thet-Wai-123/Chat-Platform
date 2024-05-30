var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passport = require('../authentication/passport.js');
const createError = require('http-errors');
require('../authentication/bcrypt.js');
const db = require('../db.js');
const { generateHash } = require('../authentication/bcrypt.js');
require('../authentication/bcrypt.js');
require('socket.io')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/log-in');
});

router.post(
  '/sign-up',
  body('name', ' Name must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('password', 'Passwords must be at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('email', 'Passwords must be at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .isEmail(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }
    const hashedPass = await generateHash(req.body.password);
    const result = await db.query(
      `INSERT INTO users(name, password, email) VALUES ($1, $2, $3)`,
      [req.body.name, hashedPass, req.body.email]
    );
    if (result.rowCount === 1) {
      res.json('success in creating new account');
    }
  })
);

router.post(
  '/log-in',
  body('name', ' Name must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('password', 'Wrong Password').trim().isLength({ min: 3 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info.message,
          user: user,
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        } else {
          // generate a signed son web token with the contents of user object and return it in the response
          const token = jwt.sign(user, process.env.JWTSecretKey);
          return res.json({ token: token, message: info.message });
        }
      });
    })(req, res);
  })
);

// GET route for home page
router.get('/home', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

module.exports = router;
