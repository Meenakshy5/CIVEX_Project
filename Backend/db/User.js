
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("mongoose-type-email");

let schema = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.Email,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["recruiter", "applicant","admin"],
      required: true,
    },
  },
  { collation: { locale: "en" } }
);

// Password hashing
schema.pre("save",  async function (next) {
  let user = this;

  // if the data is not modified
  if (!user.isModified("password")) {
    return next();
  }

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (err) {
    next(err); // Pass any error to the next middleware
  }
});

// Password verification upon login
schema.methods.login = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    if (!isMatch) {
      throw new Error("Password is incorrect.");
    }
    return true; // Login successful
  } catch (err) {
    throw new Error(err.message || "Login failed.");
  }
};


module.exports = mongoose.model("UserAuth", schema);
