const express = require("express");
const db = require("../database/db");

const router = express();

// Not sure how to implement this. Need to get more info on user_location, best-matched sorting
router.get("/search", (req, res) => {
    res.json({ done: true, result: "This method is not yet implemented." });
});

module.exports = router;
