const express = require('express');
const router = express.Router();
const Nexmo = require('nexmo');
const axios = require('axios')

const ApiKey = '85DB6727B810F285A0B286E5840F5B'
const SecretKey = '030B13A97557D19F1B6EF3E7AE8588'

const nexmo = new Nexmo({
  apiKey: '4588f5e0',
  apiSecret: 'xhzmIbv1QBZZYysS',
});

// router.post('/sendOTP', function (req, res) {
//   const { phone } = req.body
//   console.log(phone)
//   nexmo.verify.request({
//     number: '84' + phone,
//     brand: 'Barber',
//     code_length: '6'
//   }, (err, result) => {
//     console.log(err ? err : result)
//     res.send(result)
//   });
// })

router.post('/checkOTP', function (req, res) {
  nexmo.verify.check({
    request_id: req.body.id,
    code: req.body.code
  }, (err, result) => {
    console.log(err ? err : result)
    res.send(result)
  });
})

router.post('/confirmOTP', async function (req, res) {
  console.log(req.body.id)
  await nexmo.verify.control({
    request_id: req.body.id,
    cmd: 'cancel'
  }, (err, result) => {
    console.log(err ? err : result)
    if (result.status === '0') {
      nexmo.verify.request({
        number: '84' + req.body.phone,
        brand: 'Barber',
        code_length: '6'
      }, (err, result) => {
        console.log(err ? err : result)
        res.send(result)
      });
    } else {
      res.send(result)
    }
  });
})

router.post('/sendOtp', function (req, res) {
  const { otp, phone } = req.body
  axios.get(`http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get?Phone=${phone}&Content=${otp}&ApiKey=${ApiKey}&SecretKey=${SecretKey}&Brandname=Verify&SmsType=2&SandBox=0`)
    .then(function (response) {
      // handle success
      res.send(response.data)
    })
    .catch(function (error) {
      // handle error
      res.send(error)
    })

})

module.exports = router;
