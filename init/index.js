const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderInn";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  const modifiedData = initData.data.map((listing) => {
    return {
      ...listing,
      image: listing.image.url, //  Important fix
    };
  });

  await Listing.insertMany(modifiedData);
  console.log(" Data was initialized with correct image URLs");
};

initDB();
