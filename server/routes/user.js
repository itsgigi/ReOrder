import express from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.find({username})

    if(!user) {
        return res.json({message: 'Utente non trovato'})
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) {
        return res.json({message: 'Password errata'});
    }

    const token = jwt.sign({username: user.username}, process.env.KEY, {expiresIn: '8h'});
    res.cookie('token', token, {httpOnly: true, maxAge: 2880000});

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;