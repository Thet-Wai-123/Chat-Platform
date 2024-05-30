const passport = require('passport');
const db = require('../db');

const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('passport-jwt');
const { compareHash } = require('./bcrypt.js');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
require('dotenv').config();
require('./bcrypt.js');

//Local Strategy- checking user credentials are correct
passport.use(
  new LocalStrategy(
    {
      usernameField: 'name',
      passwordField: 'password',
    },
    async function (name, password, done) {
      const { rows } = await db.query('SELECT * FROM users WHERE name = $1', [
        name,
      ])
      if (!Array.isArray(rows) || !rows.length){
        return done(null, false, {message: 'Username is Invalid'})
      }
      const hashedPass = rows[0].password;
      const result = await compareHash(password, hashedPass);
      if (!result) {
        return done(null, false, { message: 'Invalid Credientials' });
      } else {
        //don't want to pass in the password along as well
        delete rows[0].password;
        return done(null, rows[0], { message: 'Logged In Successfully' });
      }
    }
  )
);

// Setup options for Passport JWT strategy
const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTSecretKey,
};

passport.use(
  new JWTStrategy(opts, async (jwtPayload, done) => {
    try {
      //no need to query db again in this case because the payload include all the necessary info
      //this will add the user info to the req.user
      return done(null, jwtPayload);
    } catch (error) {
      return done(error, false); // Error handling
    }
  })
);

module.exports = passport;
