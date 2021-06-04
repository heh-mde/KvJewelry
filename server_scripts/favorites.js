async function getFavorites(user_id) {
    const sql = require("mysql2");
    const fs = require('fs');
    let db_password = fs.readFileSync(__dirname + '/password.txt', "utf8");

    const sqlconnection = sql.createConnection({
        host: "localhost",
        user: "root",
        database: "userdb",
        password: db_password
    }).promise();

    let data;

    await sqlconnection.query(`SELECT VendorCode
                               FROM favorites
                               WHERE CustomerID = ${user_id}`)
        .then((res) => {
            data = res[0];
        })
        .catch(function (err) {
            console.log(err);
        });

    sqlconnection.end().catch(function (err) {
        console.log(err)
    });

    return data;
}

async function addFavorite(user_id, vendorCode) {
    const sql = require("mysql2");
    const fs = require('fs');
    let db_password = fs.readFileSync(__dirname + '/password.txt', "utf8");

    const sqlconnection = sql.createConnection({
        host: "localhost",
        user: "root",
        database: "userdb",
        password: db_password
    }).promise();

    await sqlconnection.query(`INSERT INTO favorites (VendorCode, CustomerID)
                               VALUES (${vendorCode}, ${user_id})`)
        .catch(function (err) {
            console.log(err);
        });

    sqlconnection.end().catch(function (err) {
        console.log(err)
    });
}

async function removeFavorite(user_id, vendorCode) {
    const sql = require("mysql2");
    const fs = require('fs');
    let db_password = fs.readFileSync(__dirname + '/password.txt', "utf8");

    const sqlconnection = sql.createConnection({
        host: "localhost",
        user: "root",
        database: "userdb",
        password: db_password
    }).promise();

    await sqlconnection.query(`DELETE
                               FROM favorites
                               WHERE CustomerID = ${user_id}
                                 AND VendorCode = ${vendorCode}`)
        .catch(function (err) {
            console.log(err);
        });

    sqlconnection.end().catch(function (err) {
        console.log(err)
    });
}

module.exports = {getFavorites, addFavorite, removeFavorite}