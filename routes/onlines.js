const router = require('express').Router();
const Online=require("../models/Online");

//add

router.post("/all", async (req, res) => {
    
    try {
        const newOnline = new Online({
            userId: req.body.userId,
            username: req.body.username,
            profilePicture: req.body.profilePicture,
        });
        const save = await newOnline.save();
        res.status(200).json(save);
    } catch (err) {
        res.status(500).json("error");
    }
})

router.get("/:userId",async(req,res)=>{
    try{
        const onlineuser=await Online.find({
            userId:req.params.userId
        });
        res.status(200).json(onlineuser);
    }catch(err){
        res.status(500).send(err);
    }
})


module.exports = router;