const express = require("express");
const pug = require('pug')
const app = express();

app.use(express.static(__dirname + "/public"));
app.get("/", function(req,res){
	res.send(pug.renderFile(__dirname + '/public/home.pug'));
});

app.listen(process.env.PORT || 3000)