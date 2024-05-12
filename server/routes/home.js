var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const db = require('../db');

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
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const name = req.body.name;
    const results = await db.query('SELECT * FROM users WHERE name = $1', [
      name,
    ]);
    if (results.rowCount == 0) {
      res.json('Wrong user name');
    }
    res.json(results.rows); //lets come back to using passport jwt later shall we?
  })
);

// GET route for home page
router.get('/home', (req, res) => {
  res.render('home', { title: 'Home Page' });
});


module.exports = router;
