const express= require('express');
const router = express.Router();
const User= require('../model/demo.model.js');

router.post("/login",async(req,res)=>{
    try{
        // console.log(req.body);

        const newUser =  new User({...req.body});
        await newUser.save();
        res.status(200).send({
            message:"Login info saved",
        })
    }
    catch(error){
        console.log(error);
    }
})

module.exports = router;