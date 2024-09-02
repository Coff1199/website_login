require('dotenv').config();

const express = require("express");
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json())
app.use(cors())

const options = {
  key: fs.readFileSync(path.resolve(__dirname, process.env.PRIVATE_KEY_PATH)),
  cert: fs.readFileSync(path.resolve(__dirname, process.env.CERTIFICATE_PATH))
};

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

mongoose.connect(process.env.DB_CONN).then((conn) => {
    console.log("db connection successful");
}).catch((err) => {
  console.log(err)
});

let conn = mongoose.connection;

app.post("/api/create-account", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => { 
    if (err) throw err;
    const User = require('./models/AccountModel')

    let user = new User({
      username: req.body.username,
      email:req.body.email,
      password: hash,
      dateCreated: new Date(),
    });
    user.save();
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});