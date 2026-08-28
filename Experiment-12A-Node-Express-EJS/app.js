const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
    res.render("index", {
        title: "Experiment 12A - Node.js, Express and EJS",
        message: "Welcome to my Backend Development experiment!"
    });
});

// About route
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Experiment 12A"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});