const moongose = require('mongoose');

const DemoUserSchema = new moongose.Schema({
    name:{
        type: String,
        require : true,
    },
    email : {
        type: String,
        require: true,
    }
})

const DemoUser = moongose.model("DemoUser",DemoUserSchema);
module.exports = DemoUser;