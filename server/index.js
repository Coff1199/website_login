const express = require("express");
const cors = require('cors');

const PORT = 3002;

const app = express();
app.use(express.json())
app.use(cors())

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});