const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Post");
//const Profile = require("../../models/Profile");
const User = require("../../models/User");
const multer = require("multer");
const path = require("path");

// setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
//var upload = multer({ storage: storage });
const upload = multer({ storage });

//@route POST /api/post
//@desc test
//@access private

router.post(
  "/",
  upload.single("image"),
  [auth, check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        image: req.file.filename,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
  }
);
// @route   GET /api/posts/me
// @desc    Get all posts each user ****
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const each_user_post = await Post.find({ user: req.user.id });
    if (!each_user_post) {
      return res.status(404).json({ msg: "Posts are not found that's user" });
    }
    res.json(each_user_post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});
//@route PUT /api/post/:post_id
//@desc Update post by post id ****
//@access private
router.put("/:post_id", auth, async (req, res) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(
      req.params.post_id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.json(updatePost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});
// @route   GET /api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});
// @route   GET /api/posts/:id
// @desc    Get a post by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "Post not found by that ID" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found by that ID" });
    }
    res.status(500).send("Internal server error");
  }
});
// @route   DELETE /api/posts/:id
// @desc    Delete a post by ID
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found with that ID" });
    }
    // check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found by that ID" });
    }
    res.status(500).send("Internal server error");
  }
});
// @route   PUT /api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found with that ID" });
    }
    // Check if the post already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found by that ID" });
    }
    res.status(500).send("Internal server error");
  }
});
// @route   PUT /api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found with that ID" });
    }
    // Check if the user likes
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Not liked yet" });
    }
    // Get remove index
    const removeIndex = await post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    if (removeIndex === 0) post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found by that ID" });
    }
    res.status(500).send("Internal server error");
  }
});
// @route   POST /api/posts/comment/:post_id
// @desc    Post a comment
// @access  Private
router.post(
  "/comment/:post_id",
  [auth, check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id);
      const post = await Post.findById(req.params.post_id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
  }
);
// @route   DELETE /api/posts/comment/:post_id/:comment_id
// @desc    Delete a comment
// @access  Private
// router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.post_id);
//     // Get comment
//     const comment = post.comments.find(
//       (comment) => comment.id === req.params.comment_id
//     );
//     // Make sure if comment exists
//     if (!comment) {
//       return res.status(404).json({ msg: "Comment does not exist" });
//     }
//     // check user
//     if (comment.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: "User not authorized" });
//     }
//     // get remove index
//     const removeIndex = post.comments
//       .map((comment) => comment.id)
//       .indexOf(req.params.comment_id);

//     if (removeIndex === 0) post.comments.splice(removeIndex, 1);

//     await post.save();

//     res.json(post.comments);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal server error");
//   }
// });
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Get comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure if comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);

    if (removeIndex === 0) post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("internal server error");
  }
});
module.exports = router;
