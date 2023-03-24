
const mongoose = require("../database.js");

// create an schema
var userSchema = new Schema({
  name: String,
  email: String,
});

var userModel = mongoose.model("users", userSchema);

module.exports = mongoose.model("Users", userModel);
