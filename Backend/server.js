const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const fs = require("fs");


const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dnsn0h9rn', 
  api_key: '694692123754412',
  api_secret: 'l4Y5D3LXq-Y5Mof8nUucU8uBT14'
});
// MongoDB
mongoose
  .connect("mongodb+srv://meenakshyjiji2004:EQhuTQpvdxFnL0c2@cluster0.tl8oe.mongodb.net/jobPortal")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

const app = express();
const port = 4444;

// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Body parser replacement
app.use(passportConfig.initialize());

// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));
app.use("/admin", require("./routes/adminroutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});