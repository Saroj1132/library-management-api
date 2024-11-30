const express = require('express');
const app = express();
const path = require("path");

const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));


const db = require("./db/models");

app.use('/api/v1', require('./routes/authRoute'));
app.use('/api/v1', require('./routes/bookRoute'));
app.use('/api/v1', require('./routes/borrowingRecordRoute'));
app.use('/api/v1', require('./routes/userRoute'));

const server = app.listen(process.env.PORT, function(error) {
    if(error) return new Error(error)
    console.log("listening on port " +process.env.PORT);
  });