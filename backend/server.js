const express = require("express");
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const dns = require('dns');
const User = require("./models/User");

dns.setServers([
        '1.1.1.1',
    '8.8.8.8'
]);

const app = express();

app.use(express.json());
dotEnv.config()

mongoose.connect(process.env.MONGODB_URL)
  .then(async () => {
    console.log("MongoDB Connected");

    await User.create({
      name: "Shivendra",
      email: "shivendra@example.com",
    });

    console.log("User inserted");
  })
  .catch((err) => console.error(err));


const PORT =3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});