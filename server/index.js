require('dotenv').config();

const express = require("express");
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');

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

app.post("/api/create-account", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => { 
    if (err) throw err;
    // Store the hash in your database {username, email, hashedpassword}
    console.log(hash); 
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});