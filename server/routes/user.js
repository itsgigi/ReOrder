import express from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { setCookie } from 'cookies-next';

const router = express.Router();

router.post("/users", async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email})

    if(!user) {
      return res.json({message: 'Utente non trovato', status: 401})
    }

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) {
      return res.json({ status: 400, message: 'Password errata'});
    }

    const token = jwt.sign({ username: user.username }, 'jwttokenkey123encrp../$$1%unique.', { expiresIn: '8h' })
    setCookie('token', token, {
      httpOnly: true,
      maxAge: 2880000,
    });
    
    
    return res.json({ status: 200 , message: token});
  } catch (error) {
    res.json({ status: 200 , message: error.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const token = req.cookies.token;

    if(!token) {
        return res.json({message: 'Utente non autorizzato', status: 401})
    }

    const decoded = await jwt.verify(token, 'jwttokenkey123encrp../$$1%unique.')

    if(decoded) {
      return res.json({ status: 200 , message: "Accesso con utenza permesso"});
    } else {
      return res.json({ status: 400 , message: "Errore nell'autenticazione"});
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;