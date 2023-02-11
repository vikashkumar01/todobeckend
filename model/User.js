const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    todos:[
        { 
            type:mongoose.Schema.Types.ObjectId,
            ref:"Todo",
        }
    ]
},
    { timestamps: true, }
);

UserSchema.pre("save",async function(next) {
    if(this.isModified("password")) {
        this.password= await bcrypt.hash(this.password,10);
    }
   next();
})

UserSchema.methods.matchPassword = async function (password){
  return await bcrypt.compare(password,this.password);
}

UserSchema.methods.generateToken = function() {

    return jwt.sign({_id:this._id},process.env.JWT_SECRET);
}

module.exports = mongoose.model('User', UserSchema);