import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get('/transactions/:orderId', async (req, res) => {
  try {
      const transactions = await Transaction.findById(req.params.orderId).exec();
      res.status(200).json(transactions);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
});

router.post("/transactions", async (req, res) => {
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await Transaction.create(newDocument);
  res.send(result).status(204);
});

router.post('/transactions/:orderId', async (req, res) => {
  try {
      const transactions = await Transaction.findByIdAndUpdate(req.params.orderId, req.body).exec();
      res.status(200).json(transactions);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
});

router.delete('/transactions/:orderId', async (req, res) => {
  try {
      const transactions = await Transaction.findByIdAndDelete(req.params.orderId).exec();
      res.status(200).json(transactions);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
});

export default router;