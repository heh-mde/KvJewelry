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

    let msgInfo = {}
    await getUserById(userId)
        .then(async function (data) {
            let person = data[0];
            let message = `Произведён заказ

Имя: ${person.FirstName};
Фамилия: ${person.LastName};
Почта: ${person.Email};
Телефон: ${person.Phone};
Перезвонить: нет;

Товары:
`
            await sqlconnection.query(`INSERT INTO orders (CustomerID, CallBack)
                                       VALUES (${userId}, false);`)
                .then(async function (res) {
                    await sqlconnection.query('SELECT LAST_INSERT_ID();')
                        .then(async function (res) {
                            let orderID = res[0][0]['LAST_INSERT_ID()'];
                            for (const itemType in orderObject) {
                                for (const itemId in orderObject[itemType]) {
                                    message += `Артикул ${itemId} в количечтве ${orderObject[itemType][itemId]}\n`
                                    await sqlconnection.query(`INSERT INTO order_details (OrderID, VendorCode, Quantity)
                                                               VALUES (${orderID}, ${itemId}, ${orderObject[itemType][itemId]})`)
                                        .catch(err => console.log(err));
                                }
                            }
                            msgInfo.subject = `Авторизованный заказ №${orderID}`;
                            msgInfo.message = message;
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err))

    sqlconnection.end().catch(err => console.log(err));

    return msgInfo;
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

    let msgInfo = {}
    let message = `Произведён заказ

Имя: ${userData.name};
Фамилия: ${userData.surname};
Почта: ${userData.email};
Телефон: ${userData.phone};
Перезвонить: ${userData.call_back ? "да" : "нет"};

Товары:
`
    await sqlconnection.query(`INSERT INTO anonymous_orders (CallBack, LastName, FirstName, Phone, Email)
                               VALUES (${userData.call_back}, '${userData.surname}', '${userData.name}', '${userData.phone}', '${userData.email}');`)
        .then(async function (res) {
            await sqlconnection.query('SELECT LAST_INSERT_ID();')
                .then(async function (res) {
                    let orderID = res[0][0]['LAST_INSERT_ID()'];
                    for (const itemType in orderObject) {
                        for (const itemId in orderObject[itemType]) {
                            message += `Артикул ${itemId} в количечтве ${orderObject[itemType][itemId]}\n`;
                            await sqlconnection.query(`INSERT INTO anonymous_order_details (OrderID, VendorCode, Quantity)
                                                       VALUES (${orderID}, ${itemId}, ${orderObject[itemType][itemId]})`)
                                .catch(err => console.log(err));
                        }
                    }
                    msgInfo.subject = `Неавторизованный заказ №${orderID}`;
                    msgInfo.message = message;
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

    sqlconnection.end().catch(err => console.log(err));

    return msgInfo;
}

module.exports = {makeAuthorizedOrder, makeUnauthorizedOrder};