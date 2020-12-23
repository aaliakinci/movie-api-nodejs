const express = require('express');
const router = express.Router();


const Movie = require('../Models/Movie')

// get all movies
router.get('/',(req,res)=>{
  const promise = Movie.find({});
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err)
  });
});

// movie add

router.post('/',(req, res)=> {
  const movie = new Movie(req.body);

  const promise = movie.save();
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    
    res.json(err);
  });

});



// movie top 10 

router.get('/top10',(req,res)=>{
  const promise =Movie.find({}).limit(10).sort({imdb_score:-1});
  promise.then((data)=>{
    res.json(data);
  });
  });
//getmoviebyid  

router.get('/:movie_id',(req,res,next)=>{
  const promise = Movie.findById(req.params.movie_id);
  promise.then((data)=>{
    if(!data)
    next({message:'This movie was not found !'})
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});


//movie update
router.put('/:movie_id',(req,res)=>{
  const promise = Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    {
      new:true
    }
    );
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err)
  });
});


//movie delete
router.delete('/:movie_id',(req,res,next)=>{
  const promise = Movie.findByIdAndDelete(req.params.movie_id);
  promise.then((data)=>{
    if(!Movie)
      next({message:'The movie was not found.'})
      res.json({status:1});
  }).catch((err)=>{
    res.json(err);
  });
});

//Between two created year 
router.get('/between/:start_year/:end_year',(req,res)=>{
  const {start_year,end_year} = req.params;
  const promise = Movie.find(
    {
      year:{"$gte": start_year, "$lte":end_year 
    }
  });
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});





module.exports = router;