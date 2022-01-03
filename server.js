const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const connectDb = require("./config/db");
connectDb();

app.get("/",(req,res)=>res.send("app runing"));

//define routs
app.use("/api/users",require("./routes/api/users"));
app.use('/api/auth',require("./routes/api/auth"));
app.use('/api/profile',require("./routes/api/profile"));
app.use('/api/post',require("./routes/api/post"));

app.listen(PORT,()=> console.log(`server running at ${PORT}`));