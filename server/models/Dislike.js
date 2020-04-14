const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
    
}, { timestamps: true });

const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike }