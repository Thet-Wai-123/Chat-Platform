const passport = require('passport');
const db = require('../db');

const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
require('dotenv').config();

//Local Strategy- checking user credentials are correct
passport.use(
  new LocalStrategy(
    {
      usernameField: 'name',
      passwordField: 'password',
    },
    async function (name, password, done) {
      const { rows } = await db.query(
        'SELECT * FROM users WHERE name = $1 AND password = $2',
        [name, password]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: 'Invalid Credientials' });
      }
      return done(null, user, { message: 'Logged In Successfully' });
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
