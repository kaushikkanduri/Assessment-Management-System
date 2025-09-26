
/** @type {import("mongoose").Model<import("mongoose").Document>}*/
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../middlewares/tokenHandler");
const path = require("path");
const jwt = require("jsonwebtoken");

const serveLogin = asyncHandler (async(req,res,next)=>{
    const token = req.cookies.token;
    if(token){
        try{
            const user = jwt.verify(token,process.env.SECRET_KEY);
            req.user = user;
            return res.redirect('/api/generate-report');
        }catch(err){
            //console.error("Token verification failed:", err.message);
            res.clearCookie("token",{
                httpOnly: true,
                path: '/'
            });
        }
    }
    res.sendFile(path.join(__dirname,'../public/templates/login.html'));
});

const userLogin = asyncHandler (async(req,res,next)=>{
    const {email, password} = req.body;
    //console.log(email,password);
    if(!email || !password){
        res.statusCode = 400;
        return next(new Error("All fields are necessary"));
    }
   
    const user = await User.findOne({email});
    if(!user){
        res.statusCode = 404;
        return next(new Error("User not found"));
    }

    try{
        const result = await bcrypt.compare(password,user.password);
        if(!result){
            res.statusCode = 401;
            return next(new Error("Invalid credentials"));
        }
    }catch(err){
        res.statusCode = 500;
        return next(new Error("Something went wrong"));
    }

    const token = generateToken(user.username,email);
    res.cookie("token",token,{
        httpOnly:true,
        path: '/',
        maxAge: 1000*60*5
    })

    return res.redirect('/api/generate-report');

});

const serveRegister = (req,res)=>{

    const token = req.cookies.token;
    if (token) {
        try {
            const user = jwt.verify(token, process.env.SECRET_KEY);
            req.user = user;
            return res.redirect('/api/generate-report');  // Redirect if already logged in
        } catch (err) {
            res.clearCookie('token', {
                httpOnly: true,
                path: '/',
            });
        }
    }

    res.sendFile(path.join(__dirname, '../public/templates/register.html'));
}

const userRegister = asyncHandler(async(req,res,next)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.statusCode = 400;
        return next(new Error("All fields are necessary"));
    }

    const existingUser = await User.findOne({username});
    const existingEmail = await User.findOne({email});
    if(existingUser || existingEmail){
        return res.send("Username or Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })
    return res.redirect('/api/login');
})

module.exports = {
    userLogin,
    userRegister,
    serveLogin,
    serveRegister
}