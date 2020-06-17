const express = require('express');
const router = express.Router();
const Schedules = new require('../model/schedule');
const withAuth = require('../middleware');

router.get('/getSchedules', withAuth, function (req, res) {
    const { dateBook, address } = req.query

    Schedules.find({ locationSchedule: address }).then((docs) => {
        let listBook = docs.filter((item) => item.dateSchedule == dateBook)
        res.send(listBook)
    })
});

router.post('/updateSchedule', withAuth, function (req, res, next) {
    const { id } = req.body
    Schedules.findOneAndUpdate({ _id: id }, {
        statusSchedule: true
    }, {
        new: true,
        runValidators: true
    }).then(doc => {
        res.send(doc)
    })
});

router.delete('/deleteGuestBooked', withAuth, function (req, res, next) {
    const { id } = req.body

    const schedule = new Schedules({ _id: id });
    schedule.remove();
    res.send(schedule)
});

router.get('/getSchedule', withAuth, function (req, res) {
    Schedules.find({ statusSchedule: true }).then((docs) => {
        res.send(docs)
    })
});

router.post('/updateScheduleImage', withAuth, function (req, res, next) {
    const { id, image } = req.body

    Schedules.findOneAndUpdate({ _id: id }, {
        imageSchedule: image
    }, {
        new: true,
        runValidators: true
    }).then(doc => {
        res.send(doc)
    })
});

router.get('/getSchedulePhone', function (req, res) {
    const { phone } = req.query
    Schedules.find({ statusSchedule: true, phoneSchedule: phone }).then((docs) => {
        res.send(docs)
    })
});


router.post('/bookingSchedule', (req, res) => {
    var nameSchedule = req.query.nameSchedule;
    var phoneSchedule = req.query.phoneSchedule;
    var locationSchedule = req.query.locationSchedule;
    var timeSchedule = req.query.timeSchedule;
    var dateSchedule = req.query.dateSchedule;
    var stylistSchedule = req.query.stylistSchedule;
    var serviceSchedule = req.query.serviceSchedule;
    var statusSchedule = req.query.statusSchedule;
    var imageSchedule = req.query.imageSchedule;

    Schedules.create([
        {
            "nameSchedule": nameSchedule,
            "phoneSchedule": phoneSchedule,
            "locationSchedule": locationSchedule,
            "timeSchedule": timeSchedule,
            "dateSchedule": dateSchedule,
            "stylistSchedule": stylistSchedule,
            "serviceSchedule": serviceSchedule,
            "statusSchedule": statusSchedule,
            "imageSchedule": imageSchedule
        }
    ], (err) => {
        if (!err) {
            res.send("thêm thành công")
        } else {
            res.send(err)
        }
    })
})


module.exports = router