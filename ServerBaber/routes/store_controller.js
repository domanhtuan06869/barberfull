const express = require('express');
const router = express.Router();
const Store = new require('../model/address_store');
const withAuth = require('../middleware');


router.get('/getStore', withAuth, function (req, res) {
    Store.find({}).then((docs) => {
        res.send(docs)
    })
});

router.post('/postStore', withAuth, function (req, res, next) {
    const { addressLocation, cityLocation, districtLocation, districtDetailLocation } = req.body
    const store = new Store({
        addressLocation: addressLocation,
        cityLocation: cityLocation,
        districtLocation: districtLocation,
        districtDetailLocation: districtDetailLocation
    });
    store.save();
    res.send(store);
});

router.delete('/deleteStore', withAuth, function (req, res, next) {
    const { id } = req.body
    const store = new Store({ _id: id });
    store.remove();
    res.send(store)
});

router.get("/location", (req, res) => {
    Store.find({}).then((docs)=>{
        res.send(docs);
    })
})
module.exports = router;