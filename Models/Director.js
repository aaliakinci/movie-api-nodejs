const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength:[20,'{PATH} alanı ("{VALUE}"),{MAXLENGTH} değerinden az olmalıdır.'],
        minlength:[2,'{PATH} alanı ("{VALUE}"),{MINLENGTH} değerinden az olmalıdır.']
    },
    surname: {
        type: String,
        required: true,
        maxlength:[20,'{PATH} alanı ("{VALUE}"),{MAXLENGTH} değerinden az olmalıdır.'],
        minlength:[2,'{PATH} alanı ("{VALUE}"),{MINLENGTH} değerinden az olmalıdır.']
    },
    bio: {
        type: String,
        maxlength:[250,'{PATH} alanı ("{VALUE}"),{MAXLENGTH} değerinden az olmalıdır.'],
        minlength:[20,'{PATH} alanı ("{VALUE}"),{MINLENGTH} değerinden az olmalıdır.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('director', DirectorSchema);