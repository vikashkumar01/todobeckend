const express = require('express');
const { createTodo, fetchTodos, fetchTodo, updateTodo, deleteTodo, getMyProfile, deleteMyProfile, logout } = require('../controller/todoCtrl');
const { isAuthenticated } = require('../middlewares/auth');
const route = express.Router();

route.post('/createTodo', isAuthenticated, createTodo);
route.get('/fetchTodos', isAuthenticated, fetchTodos);
route.get('/fetchTodo/:id', isAuthenticated, fetchTodo);
route.put('/updateTodo/:id', isAuthenticated, updateTodo);
route.delete('/deleteTodo/:id', isAuthenticated, deleteTodo);
route.get('/getUser',isAuthenticated, getMyProfile)
route.get('/logout', logout);

module.exports = route