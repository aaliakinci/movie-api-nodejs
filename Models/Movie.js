const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const MovieSchema = new Schema({
    title:{
        type:String,
        required:true,
        maxlength:[20,'{PATH} alanı ("{VALUE}"),{MAXLENGTH} değerinden az olmalıdır.'],
        minlength:[3,'{PATH} alanı ("{VALUE}"),{MINLENGTH} değerinden az olmalıdır.'],
    },
    category:{
        type:String,
        maxlength:[15,'{PATH} alanı ("{VALUE}"),{MAXLENGTH} değerinden az olmalıdır.'],
        minlength:[3,'{PATH} alanı ("{VALUE}"),{MINLENGTH} değerinden az olmalıdır.'],
    },
    country:{
        type:String,
        maxlength:[10,'{PATH} alanı ("{VALUE}"),{MAXLENGTH} değerinden az olmalıdır.'],
        minlength:[3,'{PATH} alanı ("{VALUE}"),{MINLENGTH} değerinden az olmalıdır.'],
    },
    year:{
        type:Number,
        max:[2050,'{PATH} alanı ("{VALUE}"),{MAX} değerinden az olmalıdır'],
        min:[1900,'{PATH} alanı ("{VALUE}"),{MIN} değerinden az olmalıdır']
    },
    imdb_score:Number,
    director_id:Schema.Types.ObjectId,
    createdAt:{
        type:Date,
        default:Date.now
    },

});

module.exports=mongoose.model('movie',MovieSchema)