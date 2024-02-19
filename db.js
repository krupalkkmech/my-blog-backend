// db.js
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_CON, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

module.exports = mongoose.connection;
