const mongoose = require("mongoose");

const games = new mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: true
    }
    
},{timestamps: true});

module.exports = mongoose.model("games", games);