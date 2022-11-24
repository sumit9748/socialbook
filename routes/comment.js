const router = require("express").Router();
const Comment = require("../models/Comment");

router.post("/", async (req, res) => {
  try {
    const comm = new Comment(req.body);
    const savedComm = await comm.save();
    res.status(200).json(savedComm);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/allComment/:postId", async (req, res) => {
  try {
    const allComment = await Comment.find({ postId: req.params.postId }).sort(
      1
    );
    res.status(200).json(allComment);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
