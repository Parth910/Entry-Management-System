"use strict";
const mongoose = require("mongoose"),
    express = require("express"),
    app = express(),
    cors = require('cors'),
    path = require('path'),
    publicpath = path.join(__dirname, '..', 'public');

require('dotenv').config();
const PORT = process.env.PORT || 9000;
//localmongoDB connection

var url = "mongodb://localhost:27017/entrymanagement";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },(err) => {
    if(err)
    { console.log("error in connecting MongoDB");
    }else{
        console.log("==> Connected to mongoDB");
        
    }
}

);

app.use(express.static(publicpath));
app.use(cors());
app.use(express.json());



//requires routes

const visitorRouter = require('./routes/visitor');
const hostRouter = require('./routes/host');

//app is using routes

app.use('/visitor', visitorRouter);
app.use('/host', hostRouter);

//frontend calling

app.get('*', (req, res) => {
    res.sendFile(path.join(publicpath, 'index.html'));
})

//server is listening at pot 9000

app.listen(PORT, () => {
    console.log("---------------------------------------");
    console.log("-------------------");
    console.log("----------");
    
    console.log("==> App is Running at http://localhost:9000");

});
