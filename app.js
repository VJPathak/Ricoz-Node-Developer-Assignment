const express = require("express");
var bodyParser = require('body-parser');
const app = express();
let path = require("path");
let routes = require("./routes/userRoutes");

app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => { 
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); 
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); 
  next(); 
});

app.use(express.static('views'))
app.use('/', routes);
app.set('views', path.join(__dirname, 'views'));

//EJS Template
app.set('view engine','ejs');

//Starting the server at port 3000
app.listen(3000, function() { 
  console.log('Server running on port 3000'); 
  console.log("Initiating Our Project :) ");
});

