import express from "express";
import User from "../models/User.js";
//import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        return res.json({message: 'Utente non trovato'})
    }

    /* const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) {
        return res.json({message: 'Password errata'});
    } */

    const token = jwt.sign({username: user.username}, 'jwttokenkey123encrp../$$1%unique.', {expiresIn: '8h'});
    res.cookie('token', token, {httpOnly: true, maxAge: 2880000});

    res.status(200).json({message: 'Login effettuato'});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;