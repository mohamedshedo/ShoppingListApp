require('./config/config');
const express = require('express');
const app= express();
const bodyParser= require('body-parser');
let port=process.env.PORT;

const productsAPIController=require('./controllers/productsAPIController');

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
productsAPIController(app);




app.listen(port,()=>{
    console.log('Server Started');
})
