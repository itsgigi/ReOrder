import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

router.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(401).json({ message: error.message });
    res.status(404).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
});

router.get("/events/:eventId", async (req, res) => {
  try {
      const event = await Event.findById(req.params.eventId).exec();
      res.status(200).json(event);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
});


router.post("/events", async (req, res) => {
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await Event.create(newDocument);
  res.send(result).status(204);
});

export default router;