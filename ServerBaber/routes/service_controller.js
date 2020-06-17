const express = require('express');
const router = express.Router();
const Service = new require('../model/service');
const withAuth = require('../middleware');

router.get('/getService',withAuth, function (req, res) {
    Service.find({}).then((docs) => {
        res.send(docs)
    })
});

router.get("/service", (req, res) => {
    Service.find((err, docs) => {
        res.send(docs)
    })
})

router.post('/postService',withAuth, function (req, res, next) {
    const { nameService, detailService, priceService } = req.body

    const service = new Service({
        nameService: nameService,
        detailService: detailService,
        priceService: priceService,
    });

    service.save();
    res.send(service);
});

router.post('/updateService',withAuth, function (req, res) {
    const { id, nameService, detailService, priceService } = req.body
    Service.findOneAndUpdate({ _id: id }, {
        nameService: nameService,
        detailService: detailService,
        priceService: priceService,
    }, {
        new: true,
        runValidators: true
    }).then(doc => {
        res.send(doc)
    })
});

router.delete('/deleteService', withAuth,function (req, res, next) {
    const { id } = req.body
    const service = new Service({ _id: id });
    service.remove();
    res.send(service)
});

module.exports = router