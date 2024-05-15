var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passport = require('../authentication/passport.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/log-in');
});

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
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(user, process.env.JWTSecretKey);
        return res.json({ token: token, message: info.message });
      });
    })(req, res);
  })
);

// GET route for home page
router.get('/home', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

module.exports = router;
