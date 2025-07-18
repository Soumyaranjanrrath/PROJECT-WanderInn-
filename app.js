const  express = require('express');
const app = express();
const mongoose = require('mongoose');
const allListing = require('./models/listing.js');
const path = require('path');
const Listing = require('./models/listing.js');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.send(' Hii, iam root');
});

//Index Route
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
});


//New Route
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs');
});

//Show Route
app.get('/listings/:id', async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

//Create Route
app.post('/listings', async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect(`/listings/${newListing._id}`);
});

//Edit Route
app.get('/listings/:id/edit', async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put('/listings/:id', async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete('/listings/:id', async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(`Deleted Listing: ${deletedListing}`);
    res.redirect('/listings');
    
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