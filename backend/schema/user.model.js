const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required!"],
    },
    email: {
      type: String,
      required: [true, "email is required!"],
      unique: [true, "email already exist!"],
      lowercase: true,
      match: [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/, "Invalid email!"],
    },
    phone: {
      type: Number,
      match: [/[+][9][1]-[6-9]\d{9}/, "Invalid phone number!"],
      default: null,
    },
    password: {
      type: String,
      required: [true, "password required!"],
    },
    accountType: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    age: {
      type: Number,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female", ""],
      default: "",
    },
    avatar: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    pincode: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
