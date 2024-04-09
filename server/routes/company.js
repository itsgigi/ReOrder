import express from "express";
import Company from "../models/Company.js";

const router = express.Router();

router.get("/companies", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(401).json({ message: error.message });
    res.status(404).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
});

router.post("/companies", async (req, res) => {
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await Company.create(newDocument);
  res.send(result).status(204);
});

export default router;