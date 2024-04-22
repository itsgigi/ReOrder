import express from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        return res.json({message: 'Utente non trovato', status: 401})
    }

    const isValid = bcrypt.compare(password, user.password, function (err, valid) {
      if (err) {
        console.warn('[Login] err ->', err);
      }
      if (valid) {
        // Send JWT
        const token = jwt.sign({ username: user.username }, 'jwttokenkey123encrp../$$1%unique.', { expiresIn: '8h' })
        res.cookie('token', token, { httpOnly: true, maxAge: 2880000 })

        return res.status(200).json({ status: 200 , message: 'Login effettuato' });
      } else {
        // response is OutgoingMessage object that server response http request
        return res.json({ status: 400, message: 'Password errata' });
      }
    });
    if(!isValid) {
      return res.json({ status: 400, message: 'Password errata' });
    }

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;