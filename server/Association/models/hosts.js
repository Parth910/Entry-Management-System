const mongoose = require("mongoose");

//defining host schema
const hostSchema = new mongoose.Schema({

    name: String,
    email: String,
    phone: String

});

//exporting host schema
module.exports = mongoose.model("host", hostSchema);


