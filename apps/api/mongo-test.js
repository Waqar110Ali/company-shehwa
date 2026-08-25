const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ MONGODB_URI is not set");
  process.exit(1);
}

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB Connected");
    return mongoose.disconnect();
  })
  .then(() => {
    console.log("✅ Connection closed");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:");
    console.error(err.message);
    process.exit(1);
  });