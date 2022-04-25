const express = require("express");
const db = require("../database/db");

const router = express();

router.post("/place", (req, res) => {
    const { name, category_id: categoryId, latitude, longitude, description } = req.body;
    let customerId = -1;

    if (!req.isAuthenticated()) {
        res.json({
            done: false,
            message: "You must be logged in in order to manipulate the database.",
        });
        return;
    } else {
        customerId = req.user.id;
    }

    db.insert(
        "place",
        ["name", "latitude", "longitude", "description", "category_id", "customer_id"],
        [name, latitude, longitude, description, categoryId, customerId],
        "id"
    )
        .then((x) => {
            res.json({ done: true, id: x.rows[0].id, message: "Place added successfully." });
        })
        .catch((e) => {
            console.log(e);
            res.json({
                done: false,
                message:
                    "Place could not be added.  Make sure your category id is valid and you are logged in.",
            });
        });
});

router.post("/category", (req, res) => {
    const { name } = req.body;
    db.insert("category", ["name"], [name], "id")
        .then((x) => {
            res.json({ done: true, id: x.rows[0].id, message: "Category added successfully." });
        })
        .catch((e) => {
            console.log(e);
            res.json({ done: false, message: "Category could not be added" });
        });
});

router.post("/photo", async (req, res) => {
    const photo = req.body.photo;
    const table = req.body.place_id ? "place_photo" : "review_photo";
    const colName = req.body.place_id ? "location_id" : "review_id";
    const id = req.body.place_id ? req.body.place_id : req.body.review_id;

    db.insert("photo", ["file"], [photo], "id")
        .then((x) => {
            const photoId = x.rows[0].id;
            console.log(photoId);
            db.insert(table, [colName, "photo_id"], [id, photoId])
                .then((x) => {
                    res.json({
                        done: true,
                        id: photoId,
                        message: `Photo added to ${table} successfully.`,
                    });
                })
                .catch((e) => {
                    console.log(e);
                    res.json({
                        done: false,
                        message:
                            "Photo could not be added.  Make sure your place or review id is correct.",
                    });
                });
        })
        .catch((e) => {
            console.log(e);
            res.json({
                done: false,
                message: "Photo could not be added.",
            });
        });
});

router.post("/review", (req, res) => {
    const { place_id: placeId, comment, rating } = req.body;

    let customerId = -1;

    if (!req.isAuthenticated()) {
        res.json({
            done: false,
            message: "You must be logged in in order to manipulate the database.",
        });
        return;
    } else {
        customerId = req.user.id;
    }

    db.insert(
        "review",
        ["location_id, customer_id", "text", "rating"],
        [placeId, customerId, comment, rating],
        "id"
    )
        .then((x) => {
            const reviewId = x.rows[0].id;
            res.json({ done: true, id: reviewId, message: "Review added successfully." });
        })
        .catch((e) => {
            console.log(e);
            res.json({
                done: false,
                message: "Could not add review.  Make sure your place id is correct.",
            });
        });
});

module.exports = router;
