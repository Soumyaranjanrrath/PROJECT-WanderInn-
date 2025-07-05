const  express = require('express');
const app = express();
const mongoose = require('mongoose');
const allListing = require('./models/listing.js');
const path = require('path');

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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send(' Hii, iam root');
});

//Index Route
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
});

// app.get("/listing", async (req, res) => {
//     let sampleListing = new Listing ({
//         title: "My new Villa",
//         description: "A beautiful villa with a sea view",
//         price: 1250,
//         location: "Goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Successful testing");
        
// });

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});