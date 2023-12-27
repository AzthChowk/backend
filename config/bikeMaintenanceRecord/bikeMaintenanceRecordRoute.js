import express from "express";

import { checkMongoIdValidity } from "../../utils/utils.js";
import { Bike } from "../bike/bikeModel.js";
import { Bikemaintenancerecord } from "./bikeMaintenanceRecordModel.js";

const router = express.Router();

//POST
router.post("/bike/:id/maintenance-record", async (req, res) => {
  const bikeMaintenanceRecord = req.body;
  const bikeId = req.params.id;
  const mongoIdCheck = checkMongoIdValidity(bikeId);
  if (!mongoIdCheck) {
    return res.status(404).send({
      success: "false",
      message: "The given id is not valid id.",
    });
  }

  const findBike = await Bike.findOne({ _id: bikeId });
  if (!findBike) {
    res.status(404).send({
      success: "false",
      message: "The given id of a bike does not exist.",
    });
  }
  try {
    await Bikemaintenancerecord.create({
      bikeId: bikeId,
      bikeMaintenanceParts: req.body.bikeMaintenanceParts,
      bikeMaintenanceAmount: req.body.bikeMaintenanceAmount,
      bikeMaintenanceInvoiceImg: req.body.bikeMaintenanceInvoiceImg,
    });
    res.status(200).send({
      success: true,
      message: "Bike maintenance record was added successfully.",
    });
  } catch (error) {
    res.status(404).send({
      success: true,
      message:
        error.message ||
        "Something went wrong, Bike maintenance record was unable to add.",
    });
  }
});

//Get

router.post("/bike/:id/maintenance-record-list", async (req, res) => {
  const bikeMaintenanceRecordId = req.params.id;
  console.log(bikeMaintenanceRecordId);
  const mongoIdCheck = checkMongoIdValidity(bikeMaintenanceRecordId);
  if (!mongoIdCheck) {
    return res
      .status(404)
      .send({ success: false, message: "The given is not valid id." });
  }

  const findBikeMaintenanceRecordList = await Bikemaintenancerecord.find({
    bikeId: bikeMaintenanceRecordId,
  });
  if (!findBikeMaintenanceRecordList) {
    return res
      .status(404)
      .send({ success: false, message: "No record found." });
  }

  return res.status(200).send(findBikeMaintenanceRecordList);
});

export default router;
