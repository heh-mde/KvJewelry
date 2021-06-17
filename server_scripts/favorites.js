async function getFavorites(user_id) {
    const sql = require("mysql2");

    const sqlconnection = sql.createConnection({
        host: "eu-cdbr-west-01.cleardb.com",
        user: "b194910a8a3dea",
        database: "heroku_b667ccd8940ecf1",
        password: "ee9ca0fd"
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

    const sqlconnection = sql.createConnection({
        host: "eu-cdbr-west-01.cleardb.com",
        user: "b194910a8a3dea",
        database: "heroku_b667ccd8940ecf1",
        password: "ee9ca0fd"
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

    const sqlconnection = sql.createConnection({
        host: "eu-cdbr-west-01.cleardb.com",
        user: "b194910a8a3dea",
        database: "heroku_b667ccd8940ecf1",
        password: "ee9ca0fd"
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

async function getFavoritesDetailed(user_id) {
    const sql = require("mysql2");

    const sqlconnection = sql.createConnection({
        host: "eu-cdbr-west-01.cleardb.com",
        user: "b194910a8a3dea",
        database: "heroku_b667ccd8940ecf1",
        password: "ee9ca0fd"
    }).promise();

    const sqlconnection2 = sql.createConnection({
        host: "eu-cdbr-west-01.cleardb.com",
        user: "b39c2afbce962e",
        database: "heroku_05718451e33d4b5",
        password: "7a5611a0"
    }).promise();

    let data = [];

    await sqlconnection.query(`SELECT VendorCode
                               FROM favorites
                               WHERE CustomerID = ${user_id}
                               ORDER BY ID DESC`)
        .then(async (res) => {
            for (const obj of res[0]) {
                let vendorCode = obj.VendorCode;
                await sqlconnection2.query(`SELECT *
                                            FROM jewelry
                                            WHERE vendorcode = ${vendorCode}`)
                    .then((res2) => {
                        data.push(res2[0][0]);
                    }).catch(err => console.log(err));
            }
        })
        .catch(function (err) {
            console.log(err);
        });

    sqlconnection.end().catch(function (err) {
        console.log(err)
    });

    return data;
}

module.exports = {getFavorites, getFavoritesDetailed, addFavorite, removeFavorite}