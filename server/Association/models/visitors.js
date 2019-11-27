const mongoose = require("mongoose");

//Defining visitorSchema
const visitorSchema = new mongoose.Schema({
    
    name: String,
    email: String,
    phone:String,
    checkInTime:{
        type:Date
    },
    checkOutTime:{
        type:Date
    },
    address:String,
    status:String,
    uniqId:String,
    hostName:{ type: mongoose.Schema.Types.ObjectId, ref: 'host' },           //reference to host schema
    hostEmail:String,
    hostPhone:String
});
//Exporting visitorSchema
module.exports = mongoose.model("visitor", visitorSchema);


