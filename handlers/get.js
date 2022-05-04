const express = require("express");
const db = require("../database/db");

const router = express();

router.get("/search/:term/:maxResults/:category/:sort", async (req, res) => {
    let { term, maxResults, category, sort } = req.params;
    if (term === "any") term = "";

    let results = await db.query(
        `SELECT place.id, place.name, place.address, category.name AS category FROM place LEFT JOIN category ON place.category_id = category.id WHERE place.name LIKE '${term}%' ;`
    );
    if (results.rows.length === 0) {
        res.json({ done: true, result: [] });
        return;
    } else {
        results = results.rows;
    }

    if (category !== "any") {
        results = results.filter((place) => place.category === category);
    }

    for (let place of results) {
        let ratings = await db.select("review", ["rating"], "location_id=$1", [place.id]);

        ratings = ratings.rows.map((rating) => rating.rating);

        place.rating =
            ratings.length > 0
                ? Object.values(ratings).reduce((total, curr) => total + curr) / ratings.length
                : null;
    }

    if (sort == 1) {
        results.sort(
            (b, a) => (a.rating !== null ? a.rating : -1) - (b.rating !== null ? b.rating : -1)
        );
    }

    res.json({ done: true, result: results });
});

module.exports = router;
