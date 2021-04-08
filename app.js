const express = require("express");
const pug = require('pug');
const app = express();	
const getProducts = require("./server_scripts/getproducts.js");																
	
app.use(express.static(__dirname + "/public"));

app.get("/", async function(req,res){
	res.send(pug.renderFile(__dirname + '/public/home.pug'));
});

app.get("/new", async function(req,res){
	let newProducts = await getProducts.getNew(req.query.productTypet);
	res.send(newProducts);
});

app.listen(process.env.PORT || 63000);

//91.194.250.154