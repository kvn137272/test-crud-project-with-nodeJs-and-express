const express = require('express');
const router= express.Router()
const {  getPosts,createPost,getPost,deletePost,updatePost}  = require('../Controllers/postController');
router.route('/').get(getPosts).post(createPost)
router.route('/:id').get(getPost).delete(deletePost).patch(updatePost)
module.exports=router