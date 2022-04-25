const express = require("express");
const db = require("../database/db");

const router = express();

router.put("/place", (req, res) => {
    const filtered = Object.fromEntries(
        Object.entries(req.body).filter(([k, v]) => k !== "place_id" && v)
    );
    const placeId = req.body.place_id;

    if (!req.isAuthenticated()) {
        res.json({
            done: false,
            message: "You must be logged in in order to manipulate the database.",
        });
        return;
    }

    db.update(
        "place",
        Object.keys(filtered),
        `id = $1`,
        [placeId].concat(Object.values(filtered)),
        1
    )
        .then(() => {
            res.json({ done: true, message: "Updated the entry successfully." });
        })
        .catch((e) => {
            console.log(e);
            res.json({
                done: false,
                message: "Could not update the place.  Make sure your place_id is correct.",
            });
        });
});

router.put("/review", (req, res) => {
    let filtered = {};
    if (req.body.text) filtered.comment = req.body.comment;
    if (req.body.rating) filtered.rating = req.body.rating;

    if (!req.isAuthenticated()) {
        res.json({
            done: false,
            message: "You must be logged in in order to manipulate the database.",
        });
        return;
    }

    db.update(
        "review",
        Object.keys(filtered),
        `id = $1`,
        [req.body.place_id].concat(Object.values(filtered)),
        1
    )
        .then(() => {
            res.json({ done: true, message: "Updated the entry successfully." });
        })
        .catch((e) => {
            console.log(e);
            res.json({
                done: false,
                message: "Could not update the review.  Make sure your review_id is correct.",
            });
        });
});

router.put("/photo", (req, res) => {
    if (!req.isAuthenticated()) {
        res.json({
            done: false,
            message: "You must be logged in in order to manipulate the database.",
        });
        return;
    }

    db.update("photo", ["file"], `id = $1`, [req.body.photo_id, req.body.photo], 1)
        .then(() => {
            res.json({ done: true, message: "Updated the entry successfully." });
        })
        .catch((e) => {
            console.log(e);
            res.json({
                done: false,
                message: "Could not update the photo.  Make sure your photo_id is correct.",
            });
        });
});

module.exports = router;
