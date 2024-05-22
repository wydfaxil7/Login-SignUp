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
// serving static files
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

/* User Registration */
app.post("/signup", async (req, res) => {
    const data  = {
        name: req.body.username,
        password: req.body.password
    }
    
    // check if the user already exists
    const existingUser = await collection.findOne({name: data.name});
    if (existingUser) {
        res.send("User already Exists! Please try with another one.")
    } else {
        // hashing the password in database using bcrypt
        const saltRounds = 10; // Number of salt round for bcrypt
        const hashedpassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedpassword; // now replace the hashed password with the original password

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
});

/* Login User */
app.post("/login" , async(req, res) => {
    try {
        const check = await collection.findOne({name: req.body.username});
        if (!check) {
            res.send("User cannot be found")
        }

        // compare the hash password from database to confirm the correct password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch) { 
            res.render("home");
        } else {
            req.send("Wrong Password!");
        }
    } catch {
        res.send("Wrong Credentials!")
        
    }
})

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});