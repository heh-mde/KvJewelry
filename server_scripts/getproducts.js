/**
 *Get 5 newest products from DB
 *
 *@param {String} product - Type of product to get
 *@return {Array} List of products
 */
async function getNew(product="Rings"){
	const sql = require("mysql2"); 

	const sqlconnection = sql.createConnection({
		host: "81.90.180.144",
		user: "hehmdetk_hehmde",
		database: "hehmdetk_kvjew",
		password: "aq03092001"
	}).promise();

	/*sqlconnection.connect(function(err){
		if (err) {
		  return console.error("Ошибка: " + err.message);
		}
		else{
		  console.log("kvjew DB connected "+ product);
		}
	 });*/

	const a = await sqlconnection.query(`SELECT * FROM ${product} ORDER BY newid DESC LIMIT 5`)
	.then(result => {
		data = result[0];
	});

	return data;
}

module.exports = {getNew};