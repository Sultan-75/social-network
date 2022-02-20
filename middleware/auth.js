const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token! Authorization denied." });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("secretToken"));

    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};
