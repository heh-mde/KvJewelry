const express = require("express");
const pug = require('pug');
const app = express();	
const getProducts = require("./server_scripts/getProducts.js");	
const products = express.Router();
var productName;
var productId;						
	
app.use(express.static(__dirname + "/public"));


app.get("/", function(req,res){
	res.send(pug.renderFile(__dirname + '/public/home.pug'));
});

app.get("/constructor", function(req,res){
	res.send("Ya pojiloy constructor");
});


app.use("/products", products);

products.get("/:productType/:id", function(req,res){
	productType = req.params["productType"];
	productId = req.params["productId"];
	res.send(pug.renderFile(__dirname + `/public/product.pug`));
});

products.get("/:productType", function(req,res){
	productType = req.params["productType"];
	res.send(pug.renderFile(__dirname + `/public/productList.pug`));
});

app.get("/getAll", async function(req,res){
	let allProducts = await getProducts.getSome(productName, req.query.limit);
	res.send(allProducts);
});

app.get("/getNew", async function(req,res){
	let newProducts = await getProducts.getSome(req.query.productType, 5);
	res.send(newProducts);
});

app.get("/getOne", async function(req,res){
	let oneProducts = await getProducts.getOne(productType, req.query.vendorcode);
	res.send(oneProducts);
});

app.listen(process.env.PORT || 63000);

//91.194.250.154