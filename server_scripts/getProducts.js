/**
 *Get some amount of products from DB
 *
 *@param {String} product - Type of product to get
 *@param {Integer} limit - Limit of products to get
 *@return {Array} List of products
 */
const sql = require("mysql2");
require('dotenv').config();

async function getSome(products, limit, search="") {
    const sqlconnection = sql.createPool({
        connectionLimit: process.env.PROD_LIMIT,
        host: process.env.HOST,
        user: process.env.PROD_USER,
        database: process.env.PROD_DB,
        password: process.env.PROD_PW
    }).promise();

    let regex_search = "";
    let search_condition = "";
    search = decodeURI(search);

    const product_list = products.split(',');
    products = ""
    for (i = 0; i < product_list.length; i++) {
        products += `'${product_list[i]}',`
    }
    products = products.slice(0, -1);

    let full_search;

    await sqlconnection.query(`SELECT * FROM jewelry WHERE type IN (${products}) AND LOWER(name) LIKE '%${search.toLowerCase()}%' ${search_condition} ORDER BY date DESC LIMIT ${limit}`)
        .then(result => {
            full_search = result[0];
        })
        .catch(err => console.log(err));

    let keys_search = [];

    if (search != "") {
        const all_types_list = [["золот","серебр","платин","узор"], 
                                ["обруч", "помолв"], 
                                ["кольц", "браслет", "цепоч", "серьг", "печат"],
                                ["дорож", "украш", "комбин"], 
                                ["брил", "цирк", "фианит", "алмаз", "аметист"]];

        search = search.toLowerCase();
        const search_keys = search.split(" ");
        let types_list = [[],[],[],[],[]]
        for (i = 0; i < all_types_list.length; i++) {
            for (j = 0; j < all_types_list[i].length; j++){
                for (k = 0; k < search_keys.length; k ++){
                    if (search_keys[k].includes(all_types_list[i][j])){
                        types_list[i].push(all_types_list[i][j]);
                    }
                }
            }
        }
        for (i = 0; i < types_list.length; i++) {
            if (types_list[i].length != 0) {
                regex_search += "("
                for (j = 0; j < types_list[i].length; j++){
                    regex_search += types_list[i][j] + "|";
                }
                regex_search = regex_search.slice(0,-1);
                regex_search += ").+" 
            }
        }  

        if (regex_search != "") {

            if (full_search.length != 0) {
                search_condition = "AND LOWER(name) NOT LIKE '%" +  search.toLowerCase() + "%'";
            }

            await sqlconnection.query(`SELECT * FROM jewelry WHERE type IN (${products}) AND LOWER(name) RLIKE '${regex_search}' ${search_condition} ORDER BY date DESC LIMIT ${limit}`)
                .then(result => {
                    keys_search = result[0];
                })
                .catch(err => console.log(err));
        } 
    }

    sqlconnection.end().catch(err => console.log(err));

    full_search.push.apply(full_search,keys_search);

    return full_search;
}


async function getOne(vendorcode) {
    const sqlconnection = sql.createConnection({
        host: "eu-cdbr-west-01.cleardb.com",
        user: "b39c2afbce962e",
        database: "heroku_05718451e33d4b5",
        password: "7a5611a0"
    }).promise();

    let data;
    await sqlconnection.query(`SELECT *
                               FROM jewelry
                               WHERE vendorcode = ${vendorcode};`)
        .then(result => {
            data = result[0];
        })
        .catch(err => console.log(err));

    sqlconnection.end().catch(err => console.log(err));

    return data;
}

module.exports = {getOne, getSome};