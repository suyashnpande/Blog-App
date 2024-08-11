const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const User = require('../model/user.model.js');

const generateToken = async (userId)=>{
    try{
        const user = await User.findById(userId);
        if(!user){
            throw new Error("Usrr not found");
        }

        const token = jwt.sign({userId: user._id , role: user.role}, JWT_SECRET , {expiresIn: '1h'})
        return token;
    }
    catch(error)
    {
        console.error("Error generation token",error);
        throw error;
    }
}

module.exports =generateToken;