const express = require('express');
const auth = require('../middleware/auth');

const route = express.Router();

const userController = require('../controller/user.controller');

route.post('/signup',userController.signUp);

route.post('/signin',userController.signIn);

route.post('/protect',auth,userController.protect);


module.exports = route; 