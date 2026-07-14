const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require('dns');

dns.setServers([
        '1.1.1.1',
    '8.8.8.8'
]);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connected");
    console.log("Connected Database:", mongoose.connection.name);
  })
  .catch((err) => console.log(err));
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT||3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});