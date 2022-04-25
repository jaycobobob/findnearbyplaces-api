const express = require("express");
const db = require("../database/db");

const router = express();

router.delete("/place", (req, res) => {
    const placeId = req.body.place_id;

    if (!req.isAuthenticated()) {
        res.json({
            done: false,
            message: "You must be logged in in order to manipulate the database.",
        });
        return;
    }

    db.delete("place", "id = $1", [placeId])
        .then(() => {
            res.json({ done: true, message: "Place removed successfully." });
        })
        .catch((e) => {
            console.log(e);
            res.json({ done: false, message: "Could not be removed due to an error." });
        });
});

router.delete("/photo", (req, res) => {
    const photoId = req.body.photo_id;

    if (!req.isAuthenticated()) {
        res.json({
            done: false,
            message: "You must be logged in in order to manipulate the database.",
        });
        return;
    }

    db.delete("photo", "id = $1", [photoId])
        .then(() => {
            res.json({ done: true, message: "Photo removed successfully." });
        })
        .catch((e) => {
            console.log(e);
            res.json({ done: false, message: "Could not be removed due to an error." });
        });
});

router.delete("/review", (req, res) => {
    const reviewId = req.body.review_id;

    if (!req.isAuthenticated()) {
        res.json({
            done: false,
            message: "You must be logged in in order to manipulate the database.",
        });
        return;
    }

    db.delete("review", "id = $1", [reviewId])
        .then(() => {
            res.json({ done: true, message: "Review removed successfully." });
        })
        .catch((e) => {
            console.log(e);
            res.json({ done: false, message: "Could not be removed due to an error." });
        });
});

module.exports = router;
