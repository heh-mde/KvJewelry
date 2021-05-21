async function getUserByLogin(login, email) {
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
    const a = await sqlconnection.query(`SELECT Login FROM user WHERE Login = "${login}"`)
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

async function getUserByEmail(email) {
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
    const a = await sqlconnection.query(`SELECT Email FROM user WHERE Email = "${email.toLowerCase()}"`)
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

async function getUserPass(user) {
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
    const a = await sqlconnection.query(`SELECT HEX(PasswordHash) FROM user WHERE Login = "${user}"`)
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

async function addUser(login, email, pass, name, surname) {
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
    const a = await sqlconnection.query(`INSERT INTO \`user\` (\`Email\`, \`Login\`, \`PasswordHash\`, \`LastName\`, \`FirstName\`) VALUES ('${email}', '${login}', UNHEX('${pass}'), '${name}', '${surname}');`)
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

module.exports = {getUserByLogin, getUserByEmail, getUserPass, addUser};