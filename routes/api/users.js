const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

//@route Post /api/users
//@desc User Registraion
//@access public

router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("email", "type a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must have 6 char").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    try {
      const { name, email, password } = req.body;
      // if user exsists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: "User already exists with this email" }],
        });
      }
      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });
      // Encrypt password with bcryptjs
      const salt = await bcrypt.genSaltSync(10);
      user.password = await bcrypt.hash(password, salt);
      //   await user.save();
      res.send("User Registration Sussesfully");
      // jwt token
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
