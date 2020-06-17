const express = require('express');
const router = express.Router();
const withAuth = require('../middleware');
const init = require('../model/init');
const uploadAWS = init.uploadAWS;
const PushNotifications = require('@pusher/push-notifications-server');

let beamsClient = new PushNotifications({
  instanceId: 'f8f723dd-a9e2-4e4a-bbf2-287f01019905',
  secretKey: 'D84F2913E9458347B803D2D8165A6CB137E70574200B582F8862AAADB93F38B4'
});

router.post('/Uploadfile', uploadAWS.any(), withAuth, function (req, res) {
  let responseData = [];
  req.files.forEach((data) => {
    responseData.push(data.location);
  });
  console.log(responseData);

  res.send(responseData)
})

router.post('/pusher', function (req, res) {
  const { title, content } = req.body
  beamsClient.publishToInterests(['hello'], {
    apns: {
      aps: {
        alert: 'Hello!'
      }
    },
    fcm: {
      notification: {
        title: title,
        body: content,
        sound: 'default',
      }
    }
  }).then((publishResponse) => {
    console.log('Just published:', publishResponse.publishId);
    res.send(publishResponse.publishId)
  }).catch((error) => {
    console.error('Error:', error);
    res.send(error)
  });
})

module.exports = router;