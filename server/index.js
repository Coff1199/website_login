const express = require("express");
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');
const PORT = 3002;

const app = express();
app.use(express.json())
app.use(cors())

const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
};

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

let username;
let password;

app.post("/api/login", (req, res) => {
  username = req.body.username;
  password = req.body.password;
  console.log(username, password)
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});