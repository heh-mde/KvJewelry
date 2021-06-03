const express = require("express");
const pug = require('pug');
const app = express();
const getProducts = require("./server_scripts/getProducts.js");
const getUser = require("./server_scripts/getuser.js");
const makeOrder = require("./server_scripts/makeOrder.js");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const session = require('express-session');
const redisStorage = require('connect-redis')(session);
const redis = require('redis');
const client = redis.createClient();
const products = express.Router();
let productId;
let serverSalt;

app.set('view engine', 'pug');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(
    session({
        store: new redisStorage({
            host: "localhost",
            port: 6379,
            client: client,
            ttl: 260
        }),
        secret: 'Something secret idk irh134vmqcr241*(%#7846819 )8RCP9m2q329$& Q@V($&q29$&VQ@(EM XMc39',
        resave: true,
        saveUninitialized: true
    })
)

app.get("/", function (req, res) {
    if (req.session.user) {
        res.render(__dirname + '/public/home', {isLogged: true, user: req.session.user});
    } else {
        res.render(__dirname + '/public/home', {isLogged: false});
    }
});

app.get("/constructor", function (req, res) {
    res.send("Ya pojiloy constructor");
});

app.get("/login", function (req, res) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render(__dirname + '/public/login.pug');
    }
});

app.post("/login", async function (req, res) {
    if (!req.body) return res.sendStatus(400);
    if (req.body.getRandNum) {
        serverSalt = await bcrypt.genSalt(5);
        res.json({serverSalt});
    }
    if (req.body.tryLogin) {
        await getUser.getUserPassAndId(req.body.uname)
            .then((usrPass) => {
                if (usrPass.length) {
                    let hash = usrPass[0]['HEX(PasswordHash)'];
                    if (hash.toLowerCase() + serverSalt + req.body.clientSalt === req.body.sha) {
                        req.session.user = {};
                        req.session.user.uname = req.body.uname;
                        req.session.user.user_id = usrPass[0].UserID;
                        return res.json({isSuccessful: true});
                    } else {
                        res.json({isSuccessful: false});
                    }
                } else {
                    res.json({isSuccessful: false});
                }
            })
            .catch(() => res.sendStatus(500));
    }
});

app.post("/register", async function (req, res) {
    if (!req.body) return res.sendStatus(400);
    await getUser.getUserByLogin(req.body.uname)
        .then(async (usrName) => {
                await getUser.getUserByEmail(req.body.email)
                    .then(async (usrMail) => {
                            if (usrName.length) {
                                if (usrMail.length) {
                                    res.json({login_exists: true, mail_exists: true, created: false});
                                    return
                                }
                                res.json({login_exists: true, mail_exists: false, created: false});
                                return
                            }
                            if (usrMail.length) {
                                res.json({login_exists: false, mail_exists: true, created: false});
                            } else {
                                let r = await getUser.addUser(req.body.uname, req.body.email, req.body.pass, req.body.name, req.body.surname, req.body.phone)
                                    .then(() => res.json({created: true}))
                                    .catch(() => res.sendStatus(500));
                            }
                        }
                    ).catch(() => res.sendStatus(500));
            }
        ).catch(() => res.sendStatus(500));
});

app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

app.use("/products", products);

products.get("", function (req, res) {
    res.render(__dirname + `/public/productList.pug`);
});

products.get("/:productId", function (req, res) {
    res.render(__dirname + `/public/product.pug`);
});

app.get("/getOne", async function (req, res) {
    await getProducts.getOne(req.query.vendorcode)
        .then((oneProduct) => res.send(oneProduct))
        .catch(() => res.sendStatus(500));
});

app.get("/getSome", async function (req, res) {
    await getProducts.getSome(req.query.productTypes, req.query.limit)
        .then((someProducts) => res.send(someProducts))
        .catch(() => res.sendStatus(500));
});

app.post("/order", async function (req, res) {
    if (!req.body) return res.sendStatus(400);
    if (req.body.primary) {
        if (req.session.user) {
            await makeOrder.makeAuthorizedOrder(req.body.order, req.session.user.user_id)
                .then(() => res.json({isSuccessful: true}))
                .catch(() => res.sendStatus(500));

        } else {
            res.json({isSuccessful: false})
        }
    } else {
        await makeOrder.makeUnauthorizedOrder(req.body.order, req.body.data)
            .then(() => res.json({isSuccessful: true}))
            .catch(() => res.sendStatus(500));
    }
});


app.listen(process.env.PORT || 63000);