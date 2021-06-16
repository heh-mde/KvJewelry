/**
 *Get some amount of products from DB
 *
 *@param {String} product - Type of product to get
 *@param {Integer} limit - Limit of products to get
 *@return {Array} List of products
 */

async function getSome(products, limit, search="") {
    const sql = require("mysql2");

    const sqlconnection = sql.createConnection({
        host: "eu-cdbr-west-01.cleardb.com",
        user: "b39c2afbce962e",
        database: "heroku_05718451e33d4b5",
        password: "7a5611a0"
    }).promise();

    let regex_search = ""
    search = decodeURI(search);
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
        console.log(regex_search);
    }
    else{
        regex_search = ".+"
    }

    const product_list = products.split(',');
    products = ""
    for (i = 0; i < product_list.length; i++) {
        products += `'${product_list[i]}',`
    }
    products = products.slice(0, -1);
    let data;

    await sqlconnection.query(`SELECT * FROM jewelry WHERE type IN (${products}) AND name RLIKE '${regex_search}' ORDER BY date DESC LIMIT ${limit}`)
        .then(result => {
            data = result[0];
        })
        .catch(err => console.log(err));

    sqlconnection.end().catch(err => console.log(err));

    return data;
}

async function getOne(vendorcode) {
    const sql = require("mysql2");

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