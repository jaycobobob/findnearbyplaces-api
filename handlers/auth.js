const express = require("express");
const db = require("../database/db");
const bcrypt = require("bcrypt");

const router = express();

router.get("/login/success", (req, res) => {
    res.json({ done: true, message: "Logged in successfully." });
});

router.get("/login/failure", (req, res) => {
    res.json({ done: false, message: "Invalid credentials." });
});

router.post("/customer", (req, res) => {
    console.log("adding customer");
    const email = req.body.email;
    const password = req.body.password;

    const hashed = bcrypt.hashSync(password, 10);
    db.insert("customer", ["email", "password"], [email, hashed], "id")
        .then((x) => {
            res.json({ done: true, message: "Registered successfully" });
        })
        .catch((e) => {
            console.log(e);
            res.json({
                done: false,
                message: "Could not add user",
            });
        });
});

module.exports = router;
