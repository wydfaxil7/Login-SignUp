const mongoose = require("mongoose");

// was having issue here due to IpV6 and it was not connecting to the database and have to convert it to IpV4. (ChatGPT helped)
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