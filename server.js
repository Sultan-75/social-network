const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");

// Connect database
connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("App running"));

// Define routes
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/post"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
