const express = require('express');
const router = express.Router();
const User = require('../model/user.model.js');
const generateToken = require('../middleware/generateToken.js');

//register a new user
router.post("/register", async(req, res)=>{
    try{
        const {email,password, username} = req.body;
        const user = new User({email,password,username});
        // console.log(user);
        await user.save();
        res.status(200).send({
            message:"user registration successfull",
            user:user
        })
    }
    catch(error){
        console.error("Failed to register",error);
        res.status(500).json({
            message:"Registration failed..!"
        });
    }
})

//login a user // jwt token 
router.post("/login",async(req,res)=>{
    try{
        // console.log(req.body);
        const {email, password} = req.body;

        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).send({
                message: " User not found"
            })
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(401).send({message:"Invalid Password"})
        }

       // generate token 
        const token = await generateToken(user._id)
        // console.log(token);
        res.cookie("token", token,{
            httpOnly:false, // enable it on https://
            secure:true,
            sameSize:true,
        })

        res.status(200).send({
            message: " Login successfull",
            user: {
                _id:user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                token: token
            }
        })
    }
    catch(error){
        console.error("Failed to register",error);
        res.status(500).json({
            message:"Registration failed..!"
        });
    } 
})

//logout a user
router.post("/logout", async(req,res)=>{
    try{
        res.clearCookie('token');
        res.status(200).send({
            message: " logout successfully"
        })
    }
    catch(error)
    {
        console.error("Failed to log out",error);
        res.status(500).json({
            message: 'Logout failed!'
        });
    }
})

//get all users
router.get('/users', async(req,res)=>{
    try{
        const users = await User.find({},'id email role')
        res.status(200).send({
            message:"Users found successfully",
            users
        })
    }
    catch(error)
    {
        console.error("Failed in fayching users",error);
        res.status(500).json({
            message: 'all users fetching  failed!'
        });
    }
})

//delete a user
router.delete('/users/:id', async(req,res)=>{
    try{
        const userId= req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if(!user){
            res.status(404).send({
                message:" user not found",
            })
        }
        res.status(200).send({
            message:"deletion successfull"
        })
    }
    catch(error)
    {
        console.error("Failed to delete a user",error);
        res.status(500).json({
            message: 'deletion of user failed!'
        });
    }
})

//update a user role
router.put('/update-users/:id', async(req,res)=>{
    try{
        const userId= req.params.id;
        const {role} = req.body;
        const user = await User.findByIdAndUpdate(userId , {role} , {new:true});
        if(!user){
            res.status(404).send({
                message:" user not found",
            })
        }
        res.status(200).send({
            message:"user role changed successfully"
        })
    }
    catch(error)
    {
        console.error("Failed to update a user role",error);
        res.status(500).json({
            message: 'updation of user role failed!'
        });
    }
})


module.exports = router;