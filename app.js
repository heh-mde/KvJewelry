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
let productName;
let productId;
let serverSalt;

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
    res.send(pug.renderFile(__dirname + '/public/home.pug'));
});

app.get("/constructor", function (req, res) {
    res.send("Ya pojiloy constructor");
});

app.get("/login", function (req, res) {
    res.send(pug.renderFile(__dirname + '/public/login.pug'));
});

app.post("/login", async function (req, res) {
    if (!req.body) return res.sendStatus(400);
    if (req.body.getRandNum) {
        serverSalt = await bcrypt.genSalt(5);
        res.json({serverSalt});
    }
    if (req.body.tryLogin) {
        let usrPass = await getUser.getUserPassAndId(req.body.uname);
        if (usrPass.length) {
            let hash = usrPass[0]['HEX(PasswordHash)'];
            if (hash.toLowerCase() + serverSalt + req.body.clientSalt === req.body.sha) {
                req.session.user = req.body.uname;
                req.session.user_id = usrPass[0].UserID;
                return res.json({isSuccessful: true});
            } else {
                res.json({isSuccessful: false});
            }
        } else {
            res.json({isSuccessful: false});
        }
    }
})

app.post("/register", async function (req, res) {
    if (!req.body) return res.sendStatus(400);
    let usrName = await getUser.getUserByLogin(req.body.uname);
    let usrMail = await getUser.getUserByEmail(req.body.email);
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
        let r = await getUser.addUser(req.body.uname, req.body.email, req.body.pass, req.body.name, req.body.surname);
        res.json({created: true});
    }
})

app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
})

app.use("/products", products);

products.get("/:productType/:id", function (req, res) {
    productType = req.params["productType"];
    productId = req.params["productId"];
    res.send(pug.renderFile(__dirname + `/public/product.pug`));
});

products.get("/:productType", function (req, res) {
    productType = req.params["productType"];
    res.send(pug.renderFile(__dirname + `/public/productList.pug`));
});

app.get("/getAll", async function (req, res) {
    productType = req.params["productType"];
    let allProducts = await getProducts.getSome(req.query.productType, req.query.limit);
    res.send(allProducts);
});

app.get("/getNew", async function (req, res) {
    productType = req.params["productType"];
    let newProducts = await getProducts.getSome(req.query.productType, req.query.limit);
    res.send(newProducts);
});

app.get("/getOne", async function (req, res) {
    let oneProducts = await getProducts.getOne(req.query.productType, req.query.vendorcode);
    res.send(oneProducts);
});

app.post("/order", async function (req, res) {
    if (!req.body) return res.sendStatus(400);
    if (req.body.primary) {
        if (req.session.user_id) {
            let order = await makeOrder.makeAuthorizedOrder(req.body.order, req.session.user_id);
            res.json({isSuccessful: true});
        } else {
            res.json({isSuccessful: false})
        }
    } else {
        //Make order with given credits
    }
});


app.listen(process.env.PORT || 63000);

//91.194.250.154