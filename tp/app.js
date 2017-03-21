const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const server = http.createServer(app);


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/hola',(req,res) => {
	res.json("hola");
});


server.listen(5000);