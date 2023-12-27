import express from "express";
import { Bike } from "./bikeModel.js";
import { User } from "../user/userModel.js";
import { checkMongoIdValidity } from "../../utils/utils.js";

const router = express.Router();

//POST
router.post("/bike/add", async (req, res) => {
  const bikeInfo = req.body;
  const bikeOwner = req.body.bikeOwner;
  const mongoIdCheck = checkMongoIdValidity(bikeOwner);
  if (!mongoIdCheck) {
    res.status(404).send({
      success: "false",
      message: "The given id is not valid id.",
    });
  }

  const findBikeOwner = await User.findOne({ _id: bikeOwner });
  if (!findBikeOwner) {
    res.status(404).send({
      success: "false",
      message: "The given id of an user does not exist.",
    });
  }
  try {
    await Bike.create(bikeInfo);
    res
      .status(200)
      .send({ success: true, message: "Bike was added successfully." });
  } catch (error) {
    res.status(404).send({
      success: true,
      message: error.message || "Something went wrong, Bike was unable to add.",
    });
  }
});

//Get

router.post("/bike/list/:id", async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const mongoIdCheck = checkMongoIdValidity(userId);
  if (!mongoIdCheck) {
    return res
      .status(404)
      .send({ success: false, message: "The given id is not valid id." });
  }
  const findUser = await User.findOne({ _id: userId });
  if (!findUser) {
    res.status(404).send({
      success: "false",
      message: "The given id of an user does not exist.",
    });
  }
  const bikeListOfUser = await Bike.find({ bikeOwner: userId });
  console.log(bikeListOfUser);

  res.status(200).send(bikeListOfUser);
});

export default router;
