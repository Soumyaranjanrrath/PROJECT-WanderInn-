const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    description : String,
    image : {
        type : String,
        default: "https://i.imgur.com/4Zxj1bH.png",
        set: (v) => v === "" ? "https://i.imgur.com/4Zxj1bH.png" : v,
    },
    price : Number,
    location : String,
    country : String,
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;