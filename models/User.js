const mongoose = require("mongoose");
const {isEmail} = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true,"Please Enter a Name!"],
    },
    usertype: {
      type: String,
    },
    email: {
      type: String,
      required: [true,"Email cannot be blank!"],
      unique: true,
      validate:[isEmail,"Please Enter a valid Email!"]
    },
    password: {
      type: String,
      required: [true,"Please Enter a Password!"],
      minlength: [4,"Minimum length for password is 4 charactors!"]
    },
    profilepic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
