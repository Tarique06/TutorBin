const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (error, salt) => {
    if (error) return console.log(error);
    bcrypt.hash(this.password, salt, (error, hash) => {
      this.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (error, match) {
    if (error) return cb(false);
    if (match) return cb(true);
    cb(false);
  });
};

module.exports = mongoose.model("User", userSchema);
