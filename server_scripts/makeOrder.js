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
        for (const itemType in orderObject) {
            for (const itemId in orderObject[itemType]) {
                const a = await sqlconnection.query(`INSERT INTO \`orders\` (\`CustomerID\`, \`VendorCode\`, \`Quantity\`, \`CreatedAt\`) VALUES (${userId}, ${itemId}, ${orderObject[itemType][itemId]}, SYSDATE())`);
            }
        }
    })

    sqlconnection.end().catch(function (err) {
        console.log(err)
    });
}

module.exports = {makeAuthorizedOrder};