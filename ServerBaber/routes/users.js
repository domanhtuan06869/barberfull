const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const withAuth = require('../middleware');
const User = require('../model/users')
const UserClient = require('../model/userClient')
const secret = 'mysecretsshhh';


router.post('/api/register', function (req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Đăng kí thành công");
    }
  });
});

router.post('/api/authenticate', function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
            });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          if (user.__v === 1 || user.__v === 2) {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: '60h'
            });
            req.session.token = token

            res.sendStatus(200);
          } else {
            res.sendStatus(500);
          }
        }

      });
    }
  });
});

router.get('/logout', withAuth, (req, res) => {
  req.session.destroy();
  res.send('logout sucssecs')
})


router.get('/checkToken', withAuth, function (req, res) {
  res.sendStatus(200);
});

router.get('/getUser', withAuth, function (req, res) {
  User.findOne({ email: req.query.email }).then((docs) => {
    res.send(docs)
  })
});

router.get('/getListUser', withAuth, function (req, res) {
  User.find({}).then((docs) => {
    res.send(docs)
  })
});

router.post('/updateUsers', withAuth, function (req, res) {
  const { role, id } = req.body
  User.findOneAndUpdate({ _id: id }, {
    __v: role
  }, {
    new: true,
    runValidators: true
  }).then(doc => {
    res.send(doc)
  })
});

router.delete('/deleteUser', withAuth, function (req, res, next) {
  const { id } = req.body

  const user = new User({ _id: id });
  user.remove();
  res.send(user)
});


router.post('/updatePassword', function (req, res) {
  const { email, oldPassword, newPassword } = req.body;

  User.findOne({ email }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(oldPassword, function (err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
            });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          const userdelete = new User({ _id: user._id });
          userdelete.remove(function (err) {
            if (err) {
              res.sendStatus(401)
            } else {
              const userNew = new User({ email: email, password: newPassword });
              userNew.save(function (err) {
                if (err) {
                  console.log(err);
                  res.status(500).send("Error registering new user please try again.");
                } else {
                  User.findOneAndUpdate({ _id: userNew._id }, {
                    __v: user.__v
                  }, {
                    new: true,
                    runValidators: true
                  }).then(doc => {
                    res.sendStatus(200)
                  })
                }
              });
            }
          })
        }
      });
    }
  });
});


router.post('/findNameUser', (req, res) => {
  var phoneUser = req.query.phoneUser;
  if (!phoneUser) {
    res.send("Vui lòng nhập đủ thông tin")
  } else {
    UserClient.findOne({ phoneUser: phoneUser }).then((docs) => {
      res.send(docs.nameUser);
    })
  }
})

//Sửa tên người dùng theo SĐT
router.post("/updateUser", (req, res) => {
  let name = req.query.name;
  let phoneUser = req.query.phoneUser;
  UserClient.updateOne({ phoneUser: phoneUser }, { nameUser: name }, (err, docs) => {
    if (!err) {
      res.sendStatus(200)
    } else {
      res.sendStatus(401)
    }
  })
})

router.post('/addUser', (req, res) => {
  let nameUser = req.body.nameUser;
  let phone = req.body.phoneUser;
  UserClient.findOne({ phoneUser: phone }).then((docs) => {
    if (!docs) {
      if (!nameUser || !phone) {
        res.send('Vui lòng nhập đủ thông tin')
      } else {
        UserClient.create([{
          "nameUser": nameUser,
          "phoneUser": phone
        }])
        res.send('Thêm người dùng thành công')
      }
    } else {
      res.send('Người dùng đã tồn tại')
    }

    res.send(docs)
  })
})

module.exports = router
