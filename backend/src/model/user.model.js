const moongose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new moongose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

//hash password before saving the password
UserSchema.pre('save',async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
})

//compare password when user login
UserSchema.methods.comparePassword = function(givenPassword){
    return bcrypt.compare(givenPassword, this.password)
}


const User = moongose.model("User", UserSchema);
module.exports = User;