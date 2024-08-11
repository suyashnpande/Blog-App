const mongoose = require('mongoose');
const express = require('express');
const Blog = require('../model/blog.model');
const Comment = require('../model/comment.model');
const verifyToken = require('../middleware/verifyToken.js');
const isAdmin = require('../middleware/isAdmin.js');
// const isAdmin = require('../middleware/isAdmin.js');
const router = express.Router();

//create a blog post
router.post("/create-post", verifyToken, async(req,res)=>{
        try{ 
            // console.log(req.body);
            const newPost = new Blog({...req.body, author: req.userId}); //  author : req.userId use this when have token verified
            await newPost.save();
            res.status(201).send({
                message: " Post created successfully",
                post: newPost
            })
        }
        catch(error){
            console.log("Error in creating post: ",error);
            res.status(500).send({message: "Error creating post"})
        }
})

//get all blogs
router.get('/',async (req,res)=>{
    // res.send("i am in blog route..");
    try{
        const {search, category, location} = req.query;
        // console.log(search);

        let query={}

        if(search){
            query ={
                ...query,
                $or:[
                    {title:{$regex: search , $options: "i"}},
                    {content:{$regex: search , $options: "i"}}
                ]
            }
        }

        if(category){
            query={
                ...query,
                category:category,
            }
        }

        if(location){
            query={
                ...query,
                location:location,
            }
        }

        const posts = await Blog.find(query).populate('author', 'email') .sort({createdAt: -1});
        res.status(200).send(posts)
    }
    catch(error){
        console.log("Error in creating post: ",error);
        res.status(500).send({message: "Error in get post"}) ;
    }
})

//get single blog by id
router.get('/:id', async(req,res)=>{
    try{
        // console.log(req.params.id);
        const postId=req.params.id;
        // console.log(postId);
        const post = await Blog.findById(postId);
        if(!post){
            return res.status(404).send({
                message: " Post not found"
            })
        }
        //TODO: will also fetch comment related to the post -- done
        const comments = await Comment.find({postId: postId}).populate('user',"username email")
        res.status(200).send( 
            //changes by me { post: post}
            // message:"post retrievedsuccessfully",
             post, comments
        )
    }
    catch(error){
        console.log("Error in creating post: ",error);
        res.status(500).send({message: "Error in fetching single post"}) ;
    }
})


//update a blog post
router.patch("/update-post/:id",verifyToken,isAdmin, async(req,res)=>{
    try{
        const postId= req.params.id;
        const updatedPost = await Blog.findByIdAndUpdate(postId,{
            ...req.body
        },{new:true});

        if(!updatedPost){
            return res.status(404).send({message:"Post not found..!"})
        }
        res.status(200).send({
            message: "Post updated successfully",
            post: updatedPost
        })
    }
    catch(error){
        console.log("Error in creating post: ",error);
        res.status(500).send({message: "Error in updating post"}) ;
    }
})

//Delete a blog -- delete comments also 
router.delete("/delete-post/:id",verifyToken,isAdmin,async(req,res)=>{
    try{
        const postId=req.params.id;
        const post = await Blog.findByIdAndDelete(postId); 

        if(!post){
            return res.status(404).send({message: " Post not found"});
        }

        //delete comments of this post
        await Comment.deleteMany({postId: postId});

        res.status(200).send({
            message:'post deleted successfully',
        });
    }
    catch(error){
        console.log("Error in deleting post: ",error);
        res.status(500).send({message: "Error in deleting post"}) ;
    }
})

//Related post
router.get("/related/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
            return res.status(400).send({message:"Post id is required"})
        }
        //changes
        // const objectId = mongoose.Types.ObjectId(id);
        const blog = await Blog.findById(id);

        if(!blog){
            return res.status(400).send({message:"Post not found"})
        }

        const titleRegex = new RegExp(blog.title.split(' ').join('|'),'i');

        const relatedQuery ={
            _id:{$ne: id}, //exclude the current blog by id
            title: {$regex: titleRegex}
        }

        const relatedPost = await Blog.find(relatedQuery)
        res.status(200).send( relatedPost)
    }

    catch(error){
        console.error("Error in fetching related post: ",error);
        res.status(500).send({message: "Error fetching related post"})
    }
})
module.exports = router;


// npm run start:dev