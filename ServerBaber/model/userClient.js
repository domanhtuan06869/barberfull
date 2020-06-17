const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    nameUser: {
        type: String
    },
    phoneUser: {
        type: String
    }
})

const User = mongoose.model('user', userModel);
  
module.exports =  User;