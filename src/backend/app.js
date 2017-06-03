const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
import mongoose from 'mongoose'

import proyectoRouter from './routes/proyectoRoutes.js'
import milestoneRouter from './routes/milestoneRoutes.js'

mongoose.connect('mongodb://localhost/Scraaam')

app.use(express.static(__dirname + "/../../dist/frontend"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(proyectoRouter);
app.use(milestoneRouter);


app.listen(3001, () => console.log('SERVER RUNNING ON PORT 3001'));
