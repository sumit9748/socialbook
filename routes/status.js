const router = require("express").Router();
const Status = require("../models/Status");
const User = require("../models/User");

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
router.get("/all/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userStatus = await Status.find({ userId: currentUser._id });
    const allstatus = await Promise.all(
      currentUser.followings.map((cur) => {
        return Status.find({ userId: cur });
      })
    );
    res.status(200).json(userStatus.concat(...allstatus));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
