const mongoose = require('mongoose');

module.exports = () =>{
mongoose.connect('mongodb+srv://aaliakinci:ali1234@cluster0.ghznl.mongodb.net/MovieApi?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('open',()=>{
    console.log('MongoDB Connected')
});
mongoose.connection.on('error',(err)=>{
    console.log('MongoDB Not Connected'+err)
});
mongoose.Promise = global.Promise;

};