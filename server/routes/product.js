import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/products", async (req, res) => {
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await Product.create(newDocument);
  res.send(result).status(204);
});

export default router;