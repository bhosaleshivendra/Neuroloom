const express = require("express");
const dotEnv = require('dotenv')
const mongoose = require('mongoose')

const app = express();

app.use(express.json());
dotEnv.config()
console.log(process.version);
console.log(process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
    res.send("Backend is working");
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});