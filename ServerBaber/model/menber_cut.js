const mongoose = require('mongoose');

const MenberSchema = new mongoose.Schema({
    nameStylist: {
        type: String,
        trim: true,
    },
    ratingStylist: {
        type: String,
        trim: true,
    },
    locationStylist: {
        type: String,
        trim: true,
    },
}, { versionKey: false });
module.exports = mongoose.model('stylist', MenberSchema);