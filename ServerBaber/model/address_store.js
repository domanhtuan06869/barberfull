const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    cityLocation: {
        type: String,
        trim: true
    },
    districtLocation: {
        type: String,
        trim: true
    },
    addressLocation: {
        type: String,
        trim: true,
    },
    districtDetailLocation: {
        type: String,
        trim: true,
    }
}, { versionKey: false });

module.exports = mongoose.model('location', StoreSchema);