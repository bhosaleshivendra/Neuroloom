const express = require("express");

const app = express();

app.use(express.json());

// Your routes...

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Backend is working");
});