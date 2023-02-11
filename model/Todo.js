const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({

    title:{
        type: 'string',
        require:[true, 'please title is required'],
    },

    description: {
        type: 'string',
        require:[true, 'please description is required'],
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},
{
    timestamps: true,
});

const Todo = mongoose.model('Todo',todoSchema)

module.exports = {Todo}