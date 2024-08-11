const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next)=>{
    try{
        const token = req.cookies.token;

        // const token = req.cookies.token;  // used  with frontend
        // const token = req.headers.authorization?.split(' ')(1); //bearer token

        // const authHeader = req.headers.authorization;
        // const token = authHeader && authHeader.split(' ')[1]; //bearer token
        if(!token){
            return res.status(401).send({
                "messsage":"no token provided"
            })
        }
        const decoded = jwt.verify(token , JWT_SECRET);
        if(!decoded.userId){
            res.status(401).send({
                "messsage":"userId not found / Invalid token "
            })
        }
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    }
    catch(error){
        console.error("error verify token", error);
        res.status(401).send({message:" invalid token"})
    }
}

module.exports = verifyToken;
