const router = require('express').Router();
const Post = require("../models/Post");
const User = require('../models/User');

//create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedpost = await newPost.save();
        res.status(200).json(savedpost);
    } catch (err) {
        res.status(500).json(err);
    }
})

//update a post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("post has benn updated");
        } else {
            res.status(403).json("you only can update your post")
        }
    } catch (err) {
        res.status(500).json(err);
    }
})
//delete a post
router.put("/update/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            try {
                await post.updateOne({ $set: { isVisible: "no" } })
                res.status(200).json("successfully deleted")
            } catch (err) {
                res.status(500).json(err)
            }
        }
        else res.status(403).json("sorry you cant delete this post")
    } catch (err) {
        res.status(500).json(err);
    }
})
//like a post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("post has been liked")
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("post has been disliked")
        }
    } catch (err) {
        res.status(500).json(err);
    }
})
//get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    } catch (err) {
        res.status(500).json(err);
    }
})
//get timeline post
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const query = {
            userId: currentUser._id,
            isVisible: "true",

        }
        const userPosts = await Post.find(query)
        const followerPosts = await Promise.all(
            currentUser.followers.map((friendId) => {
                return Post.find({ userId: friendId, isVisible: "true" });
            })
        );
        const followingPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId, isVisible: "true" });
            })
        )
        const sumPosts = followerPosts.concat(...followingPosts);
        res.json(userPosts.concat(...sumPosts));
    } catch (err) {
        res.status(500).json(err);
    }
})
//get user's all posts
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const query = {
            userId: user._id,
            isVisible: "true",
        }
        const posts = await Post.find(query)
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;