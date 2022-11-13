const router = require("express").Router();
const Status = require("../models/Status");

router.post("/", async (req, res) => {
  try {
    const newMessage = new Status(req.body);
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get
router.get("/allStatus", async (req, res) => {
  try {
    const res = await Status.find();

    res.status(200).json(res);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
