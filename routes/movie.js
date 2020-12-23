const express = require('express');
const router = express.Router();


const Movie = require('../Models/Movie')

router.post('/',(req, res, next)=> {
  // const {title,imdb_score,category,country,year} = req.body;
  // const movie = new Movie({ 
  //    title:title,
  //    imdb_score:imdb_score,

  //    category:category,
  //    country:country,
  //    year:year
  //  });
  const movie = new Movie(req.body);
  //  movie.save((err,data)=>{
  //   if(err)
  //     console.log(err)
  //     res.json();
  //  });
  const promise = movie.save();
  promise.then((data)=>{
    res.json(data);
  })
  .catch((err)=>{
    res.json(err);
  });

});

module.exports = router;
