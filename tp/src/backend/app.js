const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
import mongoose from 'mongoose'
import routes from './routes/routes.js'

mongoose.connect('mongodb://localhost/news')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(routes);


app.listen(3001, () => console.log('SERVER RUNNING ON PORT 3001'));