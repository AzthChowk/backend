import mongoose, { mongo, now } from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    minlength: 2,
    maxLength: 60,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    minlength: 2,
    maxLength: 60,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  registeredDate: {
    type: Date,
    default: now,
  },
});

export const User = mongoose.model("User", userSchema);
