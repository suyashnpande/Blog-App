const express = require('express');
const router = express.Router();
// import Comment from '../model/comment.model.js'
const Comment = require('../model/comment.model.js');

//create comment
router.post("/post-comment", async(req,res)=>{
    try{
        // console.log(req.body);

        const newComment = new Comment(req.body);
        await newComment.save()
        res.status(200).send({
            message: "Comment created successfully",
            comment: newComment
        })
    }
    catch(error){
        console.error("An error occured while posting new comment", error);
        res.status(500).send({message:"An error occured while posting new comment"})
    }

})

// get all comments count
router.get("/total-comments", async(req,res)=>{
    try{
        const totalComment = await Comment.countDocuments({});
        res.status({
            message: "Total comments count",
            totalComment
        })
    }
    catch(error){
        console.log("An error occured while getting comments count", error);
        res.status(500).send({
            message: " An error occured in getting comments count"
        })
    }
})
module.exports = router;