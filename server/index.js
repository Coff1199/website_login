require('dotenv').config();

const express = require("express");
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');
const accountRoutes = require('./routes/accountRoutes');
const mongoose = require('mongoose');

// set up app
const PORT = process.env.PORT || 5000;
const app = express();

// middleware
app.use(express.json())
app.use(cors())

// database connection
mongoose.connect(process.env.DB_CONN).then((conn) => {
  console.log("db connection successful");
}).catch((err) => {
console.log(err)
});

// SSL options 
const options = {
  key: fs.readFileSync(path.resolve(__dirname, process.env.PRIVATE_KEY_PATH)),
  cert: fs.readFileSync(path.resolve(__dirname, process.env.CERTIFICATE_PATH))
};

// Routes
app.use("/api/", accountRoutes);

// get message from server
app.get("/api/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});