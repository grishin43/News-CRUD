const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    title: {type: String, required: true, max: 100},
    image: {type: String},
    date: {type: Date, default: Date.now},
    description: {type: String, required: true, max: 1000},
    author: {type: String, max: 100}
});

module.exports = mongoose.model('News', ProductSchema);