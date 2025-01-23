const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require("../db/User");
const authKeys = require("./authKeys");

const filterJson = (obj, unwantedKeys) => {
  const filteredObj = {};
  Object.keys(obj).forEach((key) => {
    if (!unwantedKeys.includes(key)) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
};

// Local Strategy for email/password authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true, // Pass `req` to the callback function
    },
    async (req, email, password, done) => {
      try {
        // Find user by email
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "User does not exist" });
        }

        // Validate user password
        const isPasswordValid = await user.login(password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Password is incorrect." });
        }

        // Filter out unwanted keys before returning the user object
        user["_doc"] = filterJson(user["_doc"], ["password", "__v"]);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// JWT Strategy for token-based authentication
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: authKeys.jwtSecretKey,
    },
    async (jwt_payload, done) => {
      try {
        // Find user by ID from the JWT payload
        const user = await User.findById(jwt_payload._id);
        if (!user) {
          return done(null, false, { message: "JWT Token does not exist" });
        }

        // Filter out unwanted keys before returning the user object
        user["_doc"] = filterJson(user["_doc"], ["password", "__v"]);
        return done(null, user);
      } catch (err) {
        return done(err, false, { message: "Incorrect Token" });
      }
    }
  )
);

module.exports = passport;
