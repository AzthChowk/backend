import mongoose, { mongo, now } from "mongoose";

const bikeMaintenanceRecordSchema = new mongoose.Schema({
  bikeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "bike",
  },
  bikeMaintenanceDate: {
    type: Date,
    default: Date.now,
  },
  bikeMaintenanceParts: {
    type: String,
    required: true,
  },
  bikeMaintenanceAmount: {
    type: Number,
    required: true,
  },
  bikeMaintenanceInvoiceImg: {
    type: String,
    required: true,
  },
});

export const Bikemaintenancerecord = mongoose.model(
  "Bikemaintenancerecord",
  bikeMaintenanceRecordSchema
);
