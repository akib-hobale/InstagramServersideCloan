const express = require('express');
const route = express.Router();
const postController = require('../controller/post.controller');
const auth = require('../middleware/auth');
const Image = require('../libs/ImageUpload');

route.post('/createpost',auth,Image.ImageUpload('file'),postController.createPost);

route.get('/allpost',auth,postController.allPosts);

route.get('/mypost',auth,postController.myPosts);

module.exports = route;