const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        maxlength:[20,'{MAXLENGTH} karakterden az olmalı'],
        minlength:[5,'{MINLENGTH} karakterden az olmalı']
    },
    password:{
        type:String,
        required:true,
        minlength:[6,'{PATH}alanı en az {MINLENGTH} karakter olmalı'],
    }
});

module.exports=mongoose.model('user',UserSchema);