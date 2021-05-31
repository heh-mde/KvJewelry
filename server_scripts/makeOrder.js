const {getUserById} = require("./getuser");

async function makeAuthorizedOrder(orderObject, userId) {
    const sql = require("mysql2");
    const fs = require('fs');
    let db_password = fs.readFileSync(__dirname + '/password.txt', "utf8");

    const sqlconnection = sql.createConnection({
        host: "localhost",
        user: "root",
        database: "userdb",
        password: db_password
    }).promise();

    let r = await getUserById(userId).then(async function (email) {
        const a = await sqlconnection.query(`INSERT INTO \`orders\` (\`CustomerID\`, \`CreatedAt\`, \`CallBack\`) VALUES (${userId}, SYSDATE(), false);`).then(async function (res) {
            const b = await sqlconnection.query('SELECT LAST_INSERT_ID();').then(async function (res) {
                for (const itemType in orderObject) {
                    for (const itemId in orderObject[itemType]) {
                        const c = await sqlconnection.query(`INSERT INTO \`order_details\` (\`OrderID\`, \`VendorCode\`, \`Quantity\`) VALUES (${res[0][0]['LAST_INSERT_ID()']}, ${itemId}, ${orderObject[itemType][itemId]})`).catch(err => console.log(err));
                    }
                }
            }).catch(err => console.log(err))
        });
    }).catch(err => console.log(err))

    sqlconnection.end().catch(function (err) {
        console.log(err)
    });
}

async function makeAuthorizedOrder(orderObject, userId) {
    const sql = require("mysql2");
    const fs = require('fs');
    let db_password = fs.readFileSync(__dirname + '/password.txt', "utf8");

    const sqlconnection = sql.createConnection({
        host: "localhost",
        user: "root",
        database: "userdb",
        password: db_password
    }).promise();

    let r = await getUserById(userId).then(async function (email) {
        const a = await sqlconnection.query(`INSERT INTO \`orders\` (\`CustomerID\`, \`CreatedAt\`, \`CallBack\`) VALUES (${userId}, SYSDATE(), false);`).then(async function (res) {
            const b = await sqlconnection.query('SELECT LAST_INSERT_ID();').then(async function (res) {
                for (const itemType in orderObject) {
                    for (const itemId in orderObject[itemType]) {
                        const c = await sqlconnection.query(`INSERT INTO \`order_details\` (\`OrderID\`, \`VendorCode\`, \`Quantity\`) VALUES (${res[0][0]['LAST_INSERT_ID()']}, ${itemId}, ${orderObject[itemType][itemId]})`).catch(err => console.log(err));
                    }
                }
            }).catch(err => console.log(err))
        });
    }).catch(err => console.log(err))

    sqlconnection.end().catch(function (err) {
        console.log(err)
    });
}

async function makeUnauthorizedOrder(orderObject, userData) {
    const sql = require("mysql2");
    const fs = require('fs');
    let db_password = fs.readFileSync(__dirname + '/password.txt', "utf8");

    const sqlconnection = sql.createConnection({
        host: "localhost",
        user: "root",
        database: "userdb",
        password: db_password
    }).promise();

    const a = await sqlconnection.query(`INSERT INTO \`anonymous_orders\` (\`CreatedAt\`, \`CallBack\`, \`LastName\`, \`FirstName\`, \`Phone\`, \`Email\`) VALUES (SYSDATE(), ${userData.call_back}, '${userData.surname}', '${userData.name}', '${userData.phone}', '${userData.email}');`).then(async function (res) {
        const b = await sqlconnection.query('SELECT LAST_INSERT_ID();').then(async function (res) {
            for (const itemType in orderObject) {
                for (const itemId in orderObject[itemType]) {
                    const c = await sqlconnection.query(`INSERT INTO \`anonymous_order_details\` (\`OrderID\`, \`VendorCode\`, \`Quantity\`) VALUES (${res[0][0]['LAST_INSERT_ID()']}, ${itemId}, ${orderObject[itemType][itemId]})`).catch(err => console.log(err));
                }
            }
        }).catch(err => console.log(err))
    });

    sqlconnection.end().catch(function (err) {
        console.log(err)
    });
}

module.exports = {makeAuthorizedOrder, makeUnauthorizedOrder};