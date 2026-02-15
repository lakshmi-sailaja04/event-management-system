const express = require("express");
const Event = require("../models/Event");
const protect = require("../middleware/protect");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const {
      name,
      organizer,
      location,
      date,
      description,
      capacity,
      category,
    } = req.body;

    const newEvent = await Event.create({
      name,
      organizer,
      location,
      date,
      description,
      capacity,
      category,
    });

    res.json(newEvent);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ msg: "Server error creating event" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};

    if (search)
      query.name = { $regex: search, $options: "i" };

    if (category) query.category = category;

    const events = await Event.find(query).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching events" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Not found" });
    res.json(event);
  } catch {
    res.status(404).json({ msg: "Invalid ID" });
  }
});

module.exports = router;
