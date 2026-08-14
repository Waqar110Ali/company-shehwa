const mongoose = require("mongoose");

const uri =
  "mongodb+srv://waqarr:20waqar04@cluster0.6zplkqi.mongodb.net/companysite?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
  });