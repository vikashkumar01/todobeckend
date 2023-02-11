const express = require("express");
const User = require('../model/User');
const auth = express.Router();

auth.post('/register',  async (req,res) => {
    
    try{

     const {username,email,password} = req.body;
     
     let user = await User.findOne({email})

     if(user){
         return res.status(400).json({sucess:false,message:"User already exist"});
     }

     user = await User.create({username,email,password});

     return res.status(200).json({sucess:true,user})

    }
    catch(err){
        return res.status(500).json({sucess:false,message:err.message});
    }
});

auth.post('/login',  async (req,res) => {
    
    try{
       const {email,password} = req.body;

       const user = await User.findOne({ email })

       if(!user){
           return res.status(400).json({sucess:false,message:"User does not exist"});
       }

       const isMatch = user.matchPassword(password);

       if(!isMatch){
           return res.status(400).json({sucess:false,message:"Invalid Credential"});
       }

       const token = await user.generateToken();

       return res.status(200).cookie("token",token,{expires:new Date(Date.now() + 60*60*1000),httpOnly:true}).json({sucess:true,user,token})
    }
    catch(err){
        return  res.status(500).json({sucess:false,message:"err"});
    }
});



module.exports = auth
