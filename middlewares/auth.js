const User = require("../model/User");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  
   try{
    const {token} = req.cookies;

    if(!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    const decoded = await jwt.decode(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);

    next();
   }
   catch(err){

    return res.status(500).json({message:err.message});

   }
 }