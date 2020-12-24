const express = require('express');
const router = express.Router();

//bcrypt 
const bcrypt = require('bcryptjs');

//JWT
const jwt = require('jsonwebtoken');

//Model
const User = require('../Models/User');
const { json } = require('body-parser');


router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 8, function (err, hash) {
    const user = new User({
      username,
      password: hash
    });
    const promise = user.save();
    promise.then((data) => {
      res.json(data)
    }).catch((err) => {
      res.json(err)
    });
  });
});




router.post('/authenticate', (req, res) => {
  const { username, password } = req.body;
  User.findOne({
    username
  }, (err, user) => {
    if(err)
    {
      throw err;
    }
    if (!user) 
    {
      res.json({ status: false, message: 'Authentication failed, username not found' });
    }
    else 
    {
      bcrypt.compare(password, user.password).then((result)=>{
        if(!result)
        {
          res.json({status:false,message:'Authentication failed, wrong password'})
        }
        else
        {
          const payload={username};   
          const token = jwt.sign(payload,req.app.get('api_secret_key'),{
            expiresIn:14400
          });      
          res.json(
            {
              status:true,
              token
            }) 
        };
        
      })
    }
  });



})
module.exports = router;
