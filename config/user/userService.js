import bcrypt from "bcrypt";
import { User } from "./userModel.js";
import { checkMongoIdValidity } from "../../utils/utils.js";

// ==================== userRegister ==========================//
export const userRegister = async (req, res) => {
  const newUser = req.body;

  //find the user - email existence
  const findUserEmail = await User.findOne({ email: newUser.email });
  if (findUserEmail) {
    return res.status(400).send({
      message: "The user with this email already exist in the system.",
    });
  }

  //encrypt the password
  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  newUser.password = hashedPassword;

  //create user
  try {
    await User.create(newUser);
    return res.status(201).send({
      success: true,
      message: "User is created successfully.",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

//================ userDelete ==================/
export const userDelete = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  //Check the mongoId
  const mongoIdCheck = checkMongoIdValidity(userId);
  console.log(mongoIdCheck);
  if (!mongoIdCheck) {
    res
      .status(404)
      .send({ success: false, message: "The given id does not match." });
  }

  //Find the user
  const findUser = await User.findOne({ _id: userId });
  if (!findUser) {
    res
      .status(404)
      .send({ success: false, message: "The given id does not exist." });
  }

  await User.deleteOne({ _id: userId });

  res.status(200).send({ success: true, message: "Delete successful." });
};

//================ userDelete ==================/
export const userEdit = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  //Check the mongoId
  const mongoIdCheck = checkMongoIdValidity(userId);
  console.log(mongoIdCheck);
  if (!mongoIdCheck) {
    res
      .status(404)
      .send({ success: false, message: "The given id does not match." });
  }

  //Find the user
  const findUser = await User.findOne({ _id: userId });
  if (!findUser) {
    res
      .status(404)
      .send({ success: false, message: "The given id does not exist." });
  }

  await User.updateOne(
    { _id: userId },
    {
      $set: {
        fullName: req.body.fullName,
      },
    }
  );

  res.status(200).send({ success: true, message: "Update successful." });
};
