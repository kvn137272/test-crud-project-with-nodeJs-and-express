const mongoose = require("mongoose");

//  ضمیمه کردن مدل پست از فولدر مادل
const Post = require("../Model/Post");

// متد دریافت تمام پست ها
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
};

//متد ایجاد یک پست در صورتی که آن پست قبلا وجود نداشته باشه اونو ایجاد میکنه

const createPost = async (req, res, next) => {
  const checkexist = await Post.exists({
    title: req.body.title,
    body: req.body.title,
  });
  // بااین کد چک میکنیم اگه فیلد تایتل و بادی خالی بود و یا وجود نداشت ارور بده که مثلا تایتل یا بادی نباید خالی باشه
  if (
    req.body.title === "" ||
    req.body.title === "" ||
    Object.keys(req.body).length === 0
  ) {
    res.status(400).json({
      msg: "please insert title or body",
    });
  }
  if (checkexist !== null) {
    res.status(400).json({
      msg: "This post is already exists",
    });
  }
  try {
    const newPost = await Post.create(req.body);

    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
};
//دریافت یک پست در صورتی که آیدی که باهاش میخوایم اون پستو دریافت کنیم معتبر باشه و یا اینکه پستی با اون آیدی وجود داشته باشه
const getPost = async (req, res, next) => {
  const { id } = req.params;

  // این خط چک میکنه که آیدی وارد شده آیدی از نوع مونگو دی بی باشه
  const validId = mongoose.Types.ObjectId.isValid(id);
  if (validId) {
    const post = await Post.findById(id);

    // این شرط میگه که اگه پستی با این آیدی وجود نداشت بگو پستی یافت نشد
    if (post === null) {
      return res.status(404).json({
        msg: "this post not found",
      });
    }
    res.status(200).json({ post });
  } else {
    res.status(400).json({
      msg: "please insert valid id ",
    });
  }
};

// این متد هم شبیه متد بالا 
const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const validId = mongoose.Types.ObjectId.isValid(id);
  if (validId) {
    const deletedPost = await Post.findByIdAndDelete(id);
    res.sendStatus(204);
  } else {
    res.status(400).json({
      msg: "please insert valid id ",
    });
  }
};
// آبدیت کردن پست 
// عین قبل چک میکنیم که آیدی معتبر باشه
const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const validId = mongoose.Types.ObjectId.isValid(id);
  if (validId) {
    //اگه آیدی معتبر بود با  متد زیر  با آیدی که وارد کردیم پستو پیدا کن
    const post = await Post.findOneAndUpdate(
      {
        _id: id,
      },

      // و اینجا فیلد های مورد نظرت که میخوای آبدیت شن وارد کن
      { title: title, body: body },
      // گزینه میگه که ابدیت که انجام سد پست آبدیت شده نشون داده بشه یا نه
      { new: true },
    );
    if (post === null) {
      return res.status(404).json({
        msg: "not found",
      });
    }
    res.status(200).json(post);
  } else {
    res.status(400).json({
      msg: "please insert valid id ",
    });
  }
};

module.exports = {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
};
