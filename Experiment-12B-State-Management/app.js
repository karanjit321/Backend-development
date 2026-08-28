const express = require("express");
const session = require("express-session");

const app = express();
const PORT = 3001;

app.use(
    session({
        secret: "backend-lab-secret",
        resave: false,
        saveUninitialized: true
    })
);

app.get("/", (req, res) => {
    if (!req.session.visits) {
        req.session.visits = 0;
    }

    req.session.visits++;

    res.send(`
        <h1>Experiment 12B - State Management</h1>
        <p>Session-based state management using Express.</p>
        <h2>Welcome!</h2>
        <p>You have visited this page ${req.session.visits} time(s).</p>
        <a href="/reset">Reset Session</a>
    `);
});

app.get("/reset", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});