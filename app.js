const  express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderInn";

main()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error( err);
    });

async function main() {
    await mongoose.connect(MONGO_URL)
}

app.get('/', (req, res) => {
    res.send(' Hii, iam root');
});

app.get("/listing", async (req, res) => {
    let sampleListing = new Listing ({
        title: "My new Villa",
        description: "A beautiful villa with a sea view",
        price: 1250,
        location: "Goa",
        country: "India",
    });

    await sampleListing.save();
    console.log("Sample was saved");
    res.send("Successful testing");
        
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});