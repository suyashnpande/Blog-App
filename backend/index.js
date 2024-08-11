const express= require('express') 
const app = express()
const cors= require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

//parse options
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({limit: '10mb', extended:true}))

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}));

//DEMO---------> DELETE IT LATER
//Demo route for login info
// const Login = require("./src/routes/demoUserLogin.route.js");
// app.use("/api/user",Login);
// //demo route testing
// const demoRoute= require("./src/routes/demo.route.js");
// app.use("/api",demoRoute);


//Routes  get all blogs
const blogRoutes = require("./src/routes/blog.route.js");
const commentRoutes = require("./src/routes/comment.route.js");
const userRoutes= require("./src/routes/auth.user.route.js");

app.use("/api/auth",userRoutes);
app.use("/api/blogs",blogRoutes);
app.use("/api/comments",commentRoutes);



//mongoose connection
async function main(){
    await mongoose.connect(process.env.MONGODB_URL);
}
main().then(()=>{console.log ('db connected successfully')}).
catch(err => console.log(err));

//get route
app.get('/',(req,res)=>{
    res.send('Hello world.. Server is running!')
})

//listen on port 
app.listen(port, ()=>{
    console.log(`listening on ...${port}`)
})