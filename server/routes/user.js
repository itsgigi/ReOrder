import express from "express";
import User from "../models/User.js";
var bcrypt = require('bcrypt');

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid Email or Password.')

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Email or Password.')

    const token = user.generateAuthToken();
    res.send(token);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;