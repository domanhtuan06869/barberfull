const express = require('express');
const router = express.Router();
const Menber = new require('../model/menber_cut');
const withAuth = require('../middleware');

router.get('/getMenber', withAuth, function (req, res) {
    Menber.find({}).then((docs) => {
        res.send(docs)
    })
});

router.post('/postMenber',  function (req, res, next) {
    const { nameStylist, ratingStylist, locationStylist } = req.body

    const menber = new Menber({ ratingStylist: ratingStylist, nameStylist: nameStylist, locationStylist: locationStylist });
    menber.save();
    res.send(menber);
});

router.delete('/deleteMenber', withAuth, function (req, res, next) {
    const { id } = req.body
    const menber = new Menber({ _id: id });
    menber.remove();
    res.send(menber)
});


router.get('/getStyList', function (req, res) {
    const { location } = req.query
    Menber.find({ locationStylist: location }).then((docs) => {
        res.send(docs)
    })
});

module.exports = router