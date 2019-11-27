const router = require('express').Router();                     //create Router
let host = require('../Association/models/hosts');            //requiring hostSchema

//Handling Get Request for host and responsing list of hosts which are registered
router.route('/').get((req, res) => {
    host.find()

        .then(hosts => res.send(hosts))

        .catch(err => res.status(400).json('error:', err))
})

//Handling Get Request for host with give id and responsing Object of host which is asked
router.route('/:id').get((req, res) => {
    host.findById(req.params.id)

        .then(hosts => res.send(hosts))

        .catch(err => res.send('error:', err))
})

//Handling Delete Request for Delete host with given Id
router.route('/:id').delete((req, res) => {
    host.findById(req.params.id).remove()

        .then(hosts => res.send("done"))

        .catch(err => res.status(400).json('error:', err))
})

//Handling Post Request for adding new host
router.route('/addHost').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const newHost = new host({
        name,
        email,
        phone
    });
    newHost.save()

        .then(() => res.send("Host added"))

        .catch((err) => res.send(400).json('Error : ', err))
})


module.exports = router; 