const jwt = require("jsonwebtoken");;

const generateToken = (username,email)=>{
    return jwt.sign(
        {username,email},
        process.env.SECRET_KEY,
        {expiresIn: "5m"}
    );
}
const verifyToken = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        res.statusCode = 401;
        return next(new Error("Unauthorized: No token provided"));
    }
    try{
        const user = jwt.verify(token,process.env.SECRET_KEY);
        req.user = user;
        next();
    }catch(err){
        res.statusCode = 401;
        return next(new Error("Unauthorized: Invalid token"));
    }
}

module.exports = {
    generateToken,
    verifyToken
}