const express = require('express');
const router= express.Router()
// ادرس دهی روت های پست و فراخوانی متود آنها از پست کنترلر
const {  getPosts,createPost,getPost,deletePost,updatePost}  = require('../Controllers/postController');

// روت دریافت تمام پست ها و ایجاد پست جدید
router.route('/').get(getPosts).post(createPost)


// روت دریافت یک پست . حذف یگ پست . آپدیت یک پست
router.route('/:id').get(getPost).delete(deletePost).patch(updatePost)
module.exports=router