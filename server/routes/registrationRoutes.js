const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const protect = require("../middleware/protect");

const router = express.Router();

router.post("/:eventId", protect, async (req, res) => {
  const existing = await Registration.findOne({
    userId: req.user._id,
    eventId: req.params.eventId,
  });

  if (existing) return res.status(400).json({ msg: "Already registered" });

  await Registration.create({
    userId: req.user._id,
    eventId: req.params.eventId,
  });

  res.json({ msg: "Registered" });
});

router.get("/my/events", protect, async (req, res) => {
  const regs = await Registration.find({ userId: req.user._id }).populate("eventId");
  res.json(regs);
});

module.exports = router;
