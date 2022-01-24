const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route POST /api/post
//@desc test
//@access public

router.post(
  "/",
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
//@route PUT /api/post/:post_id
//@desc test
//@access public
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

module.exports = router;
