//imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 4000; // if 5000 in evn not found, 4000 will work

// database Connecton
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", (error) => console.log(error)); //if something went wrong
db.once("open", () => console.log("Connected to the database!")); // if database connected print message

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// session middleware
app.use(
    session({
        secret: "my secret key",
        saveUninitialized: true,
        resave: false,
    })
);
// storing session message
app.use((req, res, next) =>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

// set template engine
app.set("view engine", "ejs");

//moddleware
// routes define in routes,js file
// route prefix --> this prefix will take care of routes
app.use("", require("./routes/routes"));
































app.listen(PORT, ()=> {
    console.log(`Server started at http://localhost:${PORT} `);
});