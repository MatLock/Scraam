const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

import proyectoRouter from './routes/proyectoRoutes.js'
import milestoneRouter from './routes/milestoneRoutes.js'


app.use(express.static(__dirname + "/../../dist/frontend"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(proyectoRouter);
app.use(milestoneRouter);

export default app
