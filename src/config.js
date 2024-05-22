const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/Login')
//Check DataBase connection
.then( ()=> {
    console.log("MongoBD connected Succesfully")
})
.catch( (error) => {
    console.log(error)
})

// Creating a Schema
const LoginSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
});

// Creating a model
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;