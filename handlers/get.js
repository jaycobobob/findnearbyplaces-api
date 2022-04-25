const express = require("express");
const db = require("../database/db");

const router = express();

router.get("/search", (req, res) => {
    res.json({ done: true, result: "This method is not yet implemented." });
});

module.exports = router;
