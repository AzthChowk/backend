import express from "express";
import { userDelete, userEdit, userRegister } from "./userService.js";

const router = express.Router();
//POST
router.post("/user/register", userRegister);

//Delete
router.delete("/user/delete/:id", userDelete);

//Edit
router.put("/user/edit/:id", userEdit);

//Login
router.post("/login", (req, res) => {
  const loginCredential = req.body;
  console.log(loginCredential);
  res.status(200).send({ success: true, message: "Login success." });
});

export default router;
