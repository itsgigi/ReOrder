import express from "express";
import Waiter from "../models/Waiter.js";

const router = express.Router();

router.get("/waiters", async (req, res) => {
  try {
    const waiters = await Waiter.find()
      .limit(50)
      .sort({ createdOn: -1 });

    res.status(200).json(waiters);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;