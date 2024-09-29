require('dotenv').config();

const express = require("express");
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/AccountModel')

const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json())
app.use(cors())

const options = {
  key: fs.readFileSync(path.resolve(__dirname, process.env.PRIVATE_KEY_PATH)),
  cert: fs.readFileSync(path.resolve(__dirname, process.env.CERTIFICATE_PATH))
};

app.get("/api/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

mongoose.connect(process.env.DB_CONN).then((conn) => {
    console.log("db connection successful");
}).catch((err) => {
  console.log(err)
});

app.post("/api/create-account/", async (req, res) => {
  try {
    // Check if the email or username is already taken
    const existingUser = await User.findOne({
        $or: [
            { email: req.body.email },     // Check for existing email
            { username: req.body.username } // Check for existing username
        ]
    });

    if (existingUser) {
      // If a user with the same email or username exists, return a 400 error
      return res.status(400).json({
          status: 'fail',
          message: 'Username or email already exists'
      });
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => { 
      if (err) throw err;

      let user = new User({
        username: req.body.username,
        email:req.body.email,
        password: hash,
        dateCreated: new Date(),
      });
      user.save();
    });

    res.status(201).json({
      status: 'success',
      message: 'Account successfuly created'
    });
  } catch (err) {
    console.log(err);

    //send fail message
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error"
    })
  }

});

app.post("/api/login", async (req, res) => {
  
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }]
    });

    if (!user) {
      return res.status(404).json({ 
        status: 'fail',
        message: 'Username or email not found' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ 
        status:'fail',
        message: 'Incorrect password' 
      });
    }

    // change lastLogin 
    await User.findByIdAndUpdate(
      user._id,
      { $set: { lastLogin: new Date()}},
      {new: true}
    );

    res.status(200).json(
      { 
        status: 'success',
        message: 'Login successful', user 
      });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ 
      status:'fail',
      message: 'Internal server error' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});