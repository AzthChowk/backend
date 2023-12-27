import mongoose, { mongo, now } from "mongoose";

const bikeSchema = new mongoose.Schema({
  bikeOwner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  bikeName: {
    type: String,
    minlength: 2,
    maxLength: 60,
    required: true,
    trim: true,
  },
  bikeNumber: {
    type: String,
    minlength: 2,
    maxLength: 60,
    required: true,
    trim: true,
  },
  bikeManufacturer: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  bikeImage: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
});

export const Bike = mongoose.model("Bike", bikeSchema);
