/**
 *Get some amount of products from DB
 *
 *@param {String} product - Type of product to get
 *@param {Integer} limit - Limit of products to get
 *@return {Array} List of products
 */

async function getSome(product="rings", limit){
	const sql = require("mysql2"); 

	const sqlconnection = sql.createConnection({
		host: "localhost",
		user: "root",
		database: "kvjew",
		password: "aq03092001"
	}).promise();

	const a = await sqlconnection.query(`SELECT * FROM ${product} ORDER BY newid DESC LIMIT ${limit}`)
	.then(result => {
		data = result[0];
	});

	sqlconnection.end();
	return data;
}

async function getOne(product="rings", vendorcode){
	const sql = require("mysql2"); 

	const sqlconnection = sql.createConnection({
		host: "81.90.180.144",
		user: "hehmdetk_hehmde",
		database: "hehmdetk_kvjew",
		password: "aq03092001"
	}).promise();

	await sqlconnection.query(`SELECT * FROM ${product} WHERE vendorcode = ${vendorcode}`)
	.then(result => {
		data = result[0];
	});

	sqlconnection.end();
	return data;
}

module.exports = {getOne, getSome};