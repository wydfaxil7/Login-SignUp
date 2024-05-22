const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const app = express();

// converting data into json method using the middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//set the view engine as ejs
app.set('view engine', 'ejs');
// adding file statically
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// User Registration 
app.post("/signup", async (req, res) => {
    const data  = {
        name: req.body.username,
        password: req.body.password
    }

    const userdata = await collection.insertMany(data);
    console.log(userdata);
})

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
})