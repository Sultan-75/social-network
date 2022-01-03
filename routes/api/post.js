const express = require("express");
const router = express.Router();

//@route get /api/users
//@desc test
//@access public

router.get('/',(req,res)=> res.send("post"));

module.exports = router;