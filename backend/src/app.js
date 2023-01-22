const express = require("express");
const app = express();
const parser = require("body-parser");
app.use(parser.json());

// ========================================
//     Main application code
// ========================================
app.get("/", async (req, res) => {
    res.send("Hello world");
    console.log("[INFO](/) returned hello world.")
})

// Start Application
app.listen(60180);
console.log("[INFO] API server started");