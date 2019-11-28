const router = require('express').Router(),
    uniqid = require('uniqid'),
    moment = require('moment'),
    nodemailer = require("nodemailer"),
    request = require('request'),
    transporter = require('../functions/transporter');

//requiring needed schemas
let visitor = require("../Association/models/visitors");
let host = require("../Association/models/hosts");
require('dotenv').config();


//Handling Get Reaquest for visitors and response with list of visitor
router.route('/').get((req, res) => {
    visitor.find()

        .then(visitors => res.send(visitors))

        .catch(err => res.status(400).json('error:', err))
})

//Handling Get Reaquest for visitors who are In at a particular time and response with list of visitor
router.route('/inVisitor').get((req, res) => {
    visitor.find({ status: "In" })

        .then(visitors => res.send(visitors))

        .catch(err => res.status(400).json('error:', err))
})


//Handling Post Reaquest for adding Visitor
router.route("/addInfo").post((req, res) => {

    //Getting data from request
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const hostName = req.body.hostName;
    const hostPhone = req.body.hostPhone;
    const hostEmail = req.body.hostEmail;
    const address = req.body.address;
    const checkInTime = new Date().getTime();
    const t = new Date().getTime();
    const status = 'In';
    const uniqId = uniqid();

    //Create newVisitor Object
    const newVisitor = new visitor({
        name,
        email,
        phone,
        checkInTime,
        address,
        status,
        uniqId,
        hostName,
        hostEmail,
        hostPhone

    });

    //Saving newVisitor Object
    newVisitor.save()

        .then((err, newVisitor) => {
            host.findById(hostName)

                .then((host) => {





                    // send mail to with defined transport object
                    let info = transporter.sendMail({
                        from: '"Entry Management"<EMS@gmail.com>',                                         // sender address
                        to: host.email,                                                                          // list of receivers
                        subject: name + " checked in!!",                                                         // Subject line
                        html: "<ul> <li>Name: "
                            + name +
                            "</li> <li>Phone: "
                            + phone +
                            "</li> <li>CheckInTime: " +
                            moment(checkInTime).format('MMMM Do YYYY, h:mm:ss a') +
                            "</li><li>Hostname: " +
                            host.name +
                            "</li> <li>Adressvisited: " +
                            address +
                            "</li> <ul>"

                    });


                    //Send Mobile SMS to Hodt through way2sms API
                    request('http://www.way2sms.com/api/v1/sendCampaign?apiKey=XM274RO5RZPM8A1DGO736VVCVDW5U8Q1&secret=ZESXYXSED7T84QD8&usetype=stage&senderid=EMS&phone=' + host.phone + '&message=' + 'Name: ' + name + '%0A' + 'Phone: ' + phone + '%0A' + 'Email: ' + email + '%0A' + 'checkInTime: ' + moment(checkInTime).format('MMMM Do YYYY, h:mm:ss a') + '%0A' + 'Address: ' + address, (error, response, body) => {
                        if (!error && response.statusCode == 200) {

                            console.log(body);
                        }
                    })




                    res.send(uniqId);
                }
                )
                .catch(err => res.send(err))

        })
        .catch((err) => res.send(err));

});

//Handling GET request for finding VisitorById
router.route('/:uniqid').get((req, res) => {

    visitor.findOne({ uniqId: req.params.uniqid })

        .then((currentvisiter) => {

            res.send(currentvisiter)

        })

        .catch((err) => res.status(400).send("Error:", err));
});

//Handling GET request for finding VisitorById
router.route('/:uniqid').post((req, res) => {


    visitor.findOne({ uniqId: req.params.uniqid }).populate('hostName')                                               //populateBy hostname to get host of Visitor

        .then((checkoutVisitor) => {

            visitor.updateOne(checkoutVisitor, { status: 'Out', checkOutTime: new Date().getTime() }, function (err, out) {
                if (err) {
                    res.send("there is an errr");
                }
                else {

                    //Sending Mail to visitor
                    let info = transporter.sendMail({
                        from: '"Entry Management"<EMS@gmail.com>',                                      // sender address
                        to: checkoutVisitor.email,                                                      // list of receivers
                        subject: "Thank you for Visiting!!",                                             // Subject line
                        html: "<h3> Hello " + checkoutVisitor.name
                            + ",</h3><br><h3>Your Details</h3><ul><li>Name: "
                            + checkoutVisitor.name +
                            "</li> <li>Phone: " +
                            checkoutVisitor.phone +
                            "</li> <li>CheckInTime: " +
                            moment(checkoutVisitor.checkInTime).format('MMMM Do YYYY, h:mm:ss a')
                            + "</li><li>CheckOutTime: "
                            + moment().format('MMMM Do YYYY, h:mm:ss a')
                            + "</li><li>Hostname: "
                            + checkoutVisitor.hostName.name
                            + "</li> <li>Adressvisited: "
                            + checkoutVisitor.address
                            + "</li> <ul>"

                    });

                    res.send("Done");
                }
            });
        })

        .catch((err) => res.status(400).send("err: ", err));
});

module.exports = router;    