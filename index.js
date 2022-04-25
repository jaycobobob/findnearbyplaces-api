const express = require("express");
const cors = require("cors");
const db = require("./database/db");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const handlers = require("./handlers/handlers");
const bcrypt = require("bcrypt");
const app = express();

require("dotenv").config();

// Begin Middlewares
app.use(cors());
app.use(express.json());

passport.use(
    new LocalStrategy(
        { usernameField: "email" }, // tells passport that the email field in req body means username
        function verify(email, password, cb) {
            const hashed = bcrypt.hashSync(password, 10);
            db.select("customer", null, "email = $1", [email])
                .then((x) => {
                    if (x.rows.length > 0) {
                        let user = x.rows[0];
                        let hashed = x.rows[0].password;
                        if (bcrypt.compareSync(password, hashed)) {
                            return cb(null, x.rows[0]);
                        } else {
                            return cb(null, false, { message: "Invalid credentials" });
                        }
                    } else {
                        return cb(null, false, { message: "Invalid email." });
                    }
                })
                .catch((e) => {
                    console.log(e);
                    return cb("Something went wrong.");
                });
        }
    )
);

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: new SQLiteStore({ db: "sessions.sqlite", dir: "./sessions" }),
    })
);
app.use(passport.authenticate("session"));

// End Middlewares

app.get("/", (req, res) => {
    res.json({ done: true, message: "Hey there!" });
});

app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/login/success",
        failureRedirect: "/login/failure",
    })
);

// adding all routers
for (let handler of Object.values(handlers)) {
    app.use(handler);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
