const mongoose = require('mongoose');

const StyleSchema = new mongoose.Schema({
    img_style: {
        type: Array,
    },
},{ versionKey: false });

module.exports = mongoose.model('style', StyleSchema);