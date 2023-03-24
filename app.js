const express = require("express");
var mongoose = require("mongoose");

const app = express();

app.use(express.static(__dirname));

//const conString = "mongodb://admin:admin@ds038319.mlab.com:38319/mylearning"
const conString = "mongodb://localhost:27017/";
app.use(express.static(__dirname));

const Chats = mongoose.model("Chats", {
  name: String,
  chat: String,
});

mongoose.connect(conString, { useMongoClient: true }, (err) => {
  console.log("Database connection", err);
});

app.post("/chats", async (req, res) => {
  try {
    var chat = new Chats(req.body);
    await chat.save();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

app.listen(3020, () => {
  console.log("Well done, now I am listening...");
});
