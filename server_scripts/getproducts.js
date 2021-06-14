/**
 *Get some amount of products from DB
 *
 *@param {String} product - Type of product to get
 *@param {Integer} limit - Limit of products to get
 *@return {Array} List of products
 */

async function getSome(products, limit) {
    const sql = require("mysql2");
    const fs = require('fs');
    let db_password = fs.readFileSync(__dirname + '/password.txt', "utf8");

    const sqlconnection = sql.createConnection({
        host: "localhost",
        user: "root",
        database: "kvjew",
        password: db_password
    }).promise();

    const product_list = products.split(',');
    products = ""
    for (i = 0; i < product_list.length; i++){
        products += `'${product_list[i]}',`
    }
    products = products.slice(0,-1);
    let data;
    const a = await sqlconnection.query(`SELECT * FROM jewelry WHERE type IN (${products}) ORDER BY date DESC LIMIT ${limit}`)
        .then(result => {
            data = result[0];
        }).catch(function (err) {
            console.log(err);
        });

    sqlconnection.end().catch(function (err) {
        console.log(err)
    });

    return data;
}

async function getOne(vendorcode) {
    const sql = require("mysql2");
    const fs = require('fs');
    let db_password = fs.readFileSync(__dirname + '/password.txt', "utf8");

    const sqlconnection = sql.createConnection({
        host: "localhost",
        user: "root",
        database: "kvjew",
        password: db_password
    }).promise();

    let data;
    const a = await sqlconnection.query(`SELECT * FROM jewelry WHERE vendorcode = ${vendorcode};`)
        .then(result => {
            data = result[0];
        }).catch(function (err) {
            console.log(err)
        });

    sqlconnection.end().catch(function (err) {
        console.log(err)
    });
    return data;
}

module.exports = {getOne, getSome};