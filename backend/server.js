const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is working");
});

// Test API
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Frontend and Backend are connected successfully!"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});