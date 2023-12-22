const mongoose = require("mongoose");
const Post = require("../Model/Post");
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
const createPost = async (req, res, next) => {
  const checkexist = await Post.exists({
    title: req.body.title,
    body: req.body.title,
  });

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

const getPost = async (req, res, next) => {
  const { id } = req.params;
  const validId = mongoose.Types.ObjectId.isValid(id);
  if (validId) {
    const post = await Post.findById(id);
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

const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const validId = mongoose.Types.ObjectId.isValid(id);
  if (validId) {
    const post = await Post.findOneAndUpdate(
      {
        _id: id,
      },
      { title: title, body: body },
      { new: true },
      { upsert: true }
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
