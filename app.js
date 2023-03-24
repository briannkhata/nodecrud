require("dotenv").config();
const expressLayouts = require('express-ejs-layouts');
const express = require("express");
const bodyParser = require('body-parser');

var app = express();

const port = 5000|| process.env.PORT;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("public"));

//Templating engine 
app.use(expressLayouts);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

//home
app.get('/',(req,res) => {
  const locals = {
    title:"NodeJs",
    description:"NodeJs CRUD"
  }
  res.render('index',{locals})
});

app.listen(port,() => {
  console.log(`App running on port : ${port}`)
});


