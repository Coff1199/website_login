const express = require("express");
const cors = require('cors');

const PORT = 3002;

const app = express();
app.use(express.json())
app.use(cors())

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