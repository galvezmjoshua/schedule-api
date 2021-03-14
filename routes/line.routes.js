let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let line = require('../models/line');

router.route('/').get((req, res) => {
    res.send("Working");
});

router.route('/api/create').post((req, res) => {
    line.create(req.body, (error, data) => {
        if (error) {
            res.json(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

router.route('/api/lunch').get((req, res) => {
    line.find((error, data) => {
        if (error) {
            res.json(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/api/edit/:id').get((req, res) => {
    line.findById(req.params.id, (error, data) => {
        if (error) {
            res.json(error)
        } else {
            res.json(data)
        }
    })
})


router.route('/api/update/:id').put((req, res) => {
    line.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            res.json(error)
            console.log(error)
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    })
})

router.route('/delete/:id').delete((req, res) => {
    line.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            res.json(error)
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;
