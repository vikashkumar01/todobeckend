const  {Todo}  = require('../model/Todo');
const  User  = require('../model/User');

const createTodo = async (req, res) => {

    try {
        const todo = await Todo.create({
            title: req.body.title,
            description: req.body.description,
            owner: req.user._id,
    
        })

        const user = await User.findById(req.user._id);
     
        user.todos.push(todo._id);

          await user.save();
        
       
          return res.status(200).json(todo);
    }
    catch (err) {
        return  res.status(500).json({success: false,message:err.message});
    }

}

const fetchTodos = async (req, res) => {

    try {
        const user = await User.findById(req.user._id).populate("todos")

        return  res.status(200).json(user);
    }
    catch (err) {
        return  res.status(500).json({success: false,message:err.message});
    }

}

const fetchTodo = async (req, res) => {

    try {
        const todo = await Todo.findById(req.params.id);

       
        return  res.status(200).json({success: true,todo});
    }
    catch (err) {
        return  res.status(500).json({success: false,message:err.message});
    }

}

const updateTodo = async (req, res) => {

    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
        },
            {
                new: true,
                runValidators: true,
            });
            return res.status(200).json({success: true,message:"Todo updated"});
    }
    catch (err) {
        return res.status(500).json({success: false,message:err.message});
    }

}

const deleteTodo = async (req, res) => {

    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        const user = await User.findById(req.user._id);
        const index = user.todos.indexOf(req.params.id);
        user.todos.splice(index, 1);
        await user.save();

        return  res.status(200).json({success: true,message:"Post deleted"});
    }
    catch (err) {
        return  res.status(500).json({success: false,message:err.message});
    }

}

const getMyProfile = async (req, res) => {

    try {
        const user = await User.findById(req.user._id).populate("todos")
        return  res.status(200).json(user);
    }catch (err) {
        return  res.status(500).json({success: false,message:err.message});
    }
}


const logout = async (req, res) => {

    try {
        res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).json({ success: true, message: "Log Out" })
    } catch (err) {
        return  res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = { createTodo, fetchTodos, fetchTodo, updateTodo, deleteTodo, getMyProfile, logout }