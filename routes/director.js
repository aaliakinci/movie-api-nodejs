const express = require('express');
const router = express.Router();

//Models
const Director = require('../Models/Director');

// get all directors
router.get('/',(req,res)=>{
    const promise =Director.find({});
    promise.then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    });
});


router.post('/',(req,res)=>{
    const director = new Director(req.body);
    const promise = director.save();
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});





module.exports=router;