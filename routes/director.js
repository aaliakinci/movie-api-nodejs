const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Models
const Director = require('../Models/Director');
const { NotExtended } = require('http-errors');

// get all directors with movies
router.get('/',(req,res)=>{
    const promise =Director.aggregate([
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'director_id',
                as:'movies'
            }
        },
        {
            $unwind:{
                path:'$movies',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio'
                },
                movies:{
                    $push:'$movies'
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                name:'$_id.name',
                surname:'$_id.surname',
                bio:'$_id.bio',
                movies:'$movies'
            }
        }
    ]);
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});

// add director
router.post('/',(req,res)=>{
    const director = new Director(req.body);
    const promise = director.save();
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});

//get director by id 
router.get('/:director_id',(req,res)=>{
    const promise =Director.aggregate([
        {
            $match:{_id:mongoose.Types.ObjectId(req.params.director_id)}
        },
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'director_id',
                as:'movies'
            }
        },
        {
            $unwind:{
                path:'$movies',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio'
                },
                movies:{
                    $push:'$movies'
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                name:'$_id.name',
                surname:'$_id.surname',
                bio:'$_id.bio',
                movies:'$movies'
            }
        }
    ]);
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});

//director update 
router.put('/:director_id',(req,res,next)=>{
    const promise = Director.findByIdAndUpdate(req.params.director_id,req.body,{new:true});
    promise.then((data)=>{
        if(!data)
        {
            next({message:'The director was not found'});
        }    
        res.json(data);
    }).catch((err)=>{
        res.json(err)
    });
});
//director delete 
router.delete('/:director_id',(req,res,next)=>{
    const promise = Director.findByIdAndDelete(req.params.director_id);
    promise.then((data)=>{
        if(!data)
        {
            next({message:'The director was not found'});
        }    
        res.json(data + "This director deleted");
    }).catch((err)=>{
        res.json(err)
    });
});

module.exports=router;