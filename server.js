require('./config/config');
const express = require('express');
const app= express();
const bodyParser= require('body-parser');
let port=process.env.PORT;

const productsAPIController=require('./controllers/productsAPIController');
const shoppingCardAPIController=require('./controllers/shoppingCardAPIController');

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());


shoppingCardAPIController(app);
productsAPIController(app);




app.listen(port,()=>{
    console.log('Server Started');
})
