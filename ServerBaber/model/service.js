const mongoose = require('mongoose');
const ServiceSchema = new mongoose.Schema({
    nameService: {
      type: String,
      trim:true
    },
    detailService : {
      type: String,
      trim:true
    }, 
    priceService:{
      type:String,
      trim:true
    },

  });
  
  const Service = mongoose.model('service',ServiceSchema);
  
  module.exports =  Service;