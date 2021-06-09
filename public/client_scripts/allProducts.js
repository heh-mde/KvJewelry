function getAll(limit = 1000) {
    let productTypes = getParam("product");
    if (productTypes == "") {
        productTypes = "ring,bracelet,chain,earring,signet";
    }
    let page = Number(getParam("page"));
    if (!Number.isInteger(page)) {
        $('.product_block').append(`<div class="no_products">Страница каталога указана некоректно ("${getParam("page")}")<div>`);
        return 1;
    }
    //window.history.pushState("object or string", "Title", `/products/${product}?page=1&sort=0&metall=0&price=500-50000`);
    $.get('/getSome', {productTypes: productTypes, limit: limit}, function (products) {
        if (products == "") {
            $('.product_block').empty();
            $('.pagination_item').remove();
            $('.product_block').append(`<div class="no_products">Нет товара<div>`);
        } else {
            sessionStorage.setItem("products", JSON.stringify(products));
        }
    }).done(function (products) {
        if (products != "") {
            show(page);
        }
    });
}

function getNew() {
    let productTypes = getParam("product");
    if (productTypes == "") {
        productTypes = "ring,bracelet,chain,earring,signet";
    }
    $.get('/getSome', {productTypes: productTypes, limit: 6}, async function (products) {
        await fetch(`/isLogged`, {
            method: 'GET'
        }).then(async (res) => {
            await res.json().then(async (data) => {
                if (data.isLogged) {
                    await fetch(`/favorites`, {
                        method: 'GET'
                    }).then(async (res) => {
                        await res.json().then((data) => {
                            for (let i = 0; i < 6; i++) {
                                addProduct(products[i], "new_list", true, data.data);
                            }
                        }).catch((err) => {
                            console.log(err);
                            for (let i = 0; i < 6; i++) {
                                addProduct(products[i], "new_list", true, []);
                            }
                        })
                    }).catch((err) => {
                        console.log(err);
                        for (let i = 0; i < 6; i++) {
                            addProduct(products[i], "new_list", true, []);
                        }
                    })
                } else {
                    for (let i = 0; i < 6; i++) {
                        addProduct(products[i], "new_list", false);
                    }
                }
            }).catch((err) => {
                console.log(err);
                for (let i = 0; i < 6; i++) {
                    addProduct(products[i], "new_list", false);
                }
            })
        }).catch((err) => {
            console.log(err);
            for (let i = 0; i < 6; i++) {
                addProduct(products[i], "new_list", false);
            }
        })
        $('.product_basket').on('click', addToCart);
    });
}

async function show(page) {
    highlightFilter("sort");
    let products = JSON.parse(sessionStorage.getItem("products"));
    products = filterProducts(products, "metal");
    products = filterProductsPrice(products);
    if (products.length == 0) {
        $('.product_block').empty();
        $('.pagination_item').remove();
        $('.product_block').append(`<div class="no_products">Отсутвуют товары по выбраным критериям<div>`);
        getPriceSlider();
        return 1;
    }
    products = sortProducts(products);
    // if ($(window).width() >= '1920') {
    //     sessionStorage.setItem("prodOnPage", 60);
    // } else if ($(window).width() >= '1420') {
    //     sessionStorage.setItem("prodOnPage", 50);
    // } else if ($(window).width() >= '1200') {
    //     sessionStorage.setItem("prodOnPage", 32);
    // } else {
    //     sessionStorage.setItem("prodOnPage", 21);
    // }
    const prodOnPage = 60;
    let iter_end = page * prodOnPage;
    const page_num = Math.ceil(products.length / prodOnPage);
    if (page == page_num) {
        iter_end = products.length;
    } else if (page > page_num) {
        $('.product_block').empty();
        ;
        $('.pagination_item').remove();
        $('.product_block').append(`<div class="no_products">Страница ${page} даного каталога не существует<div>`);
        return 1;
    }

    $('.product_block').empty();
    const metal_name = JSON.parse(sessionStorage.getItem("metal_name"));
    await fetch(`/isLogged`, {
        method: 'GET'
    }).then(async (res) => {
        await res.json().then(async (data) => {
            if (data.isLogged) {
                await fetch(`/favorites`, {
                    method: 'GET'
                }).then(async (res) => {
                    await res.json().then((data) => {
                        for (let i = (page - 1) * prodOnPage; i < iter_end; i++) {
                            addProduct(products[i], 'product_block', true, data.data);
                        }
                    }).catch((err) => {
                        console.log(err);
                        for (let i = (page - 1) * prodOnPage; i < iter_end; i++) {
                            addProduct(products[i], 'product_block', true, []);
                        }
                    })
                }).catch((err) => {
                    console.log(err);
                    for (let i = (page - 1) * prodOnPage; i < iter_end; i++) {
                        addProduct(products[i], 'product_block', true, []);
                    }
                })
            } else {
                for (let i = (page - 1) * prodOnPage; i < iter_end; i++) {
                    addProduct(products[i], 'product_block', false);
                }
            }
        }).catch((err) => {
            console.log(err);
            for (let i = (page - 1) * prodOnPage; i < iter_end; i++) {
                addProduct(products[i], 'product_block', false);
            }
        })
    }).catch((err) => {
        console.log(err);
        for (let i = (page - 1) * prodOnPage; i < iter_end; i++) {
            addProduct(products[i], 'product_block', false);
        }
    })
    $('.product_basket').on('click', addToCart);
    showPaginator(page, products.length);
    getPriceSlider();
}

function sortProducts(products) {
    const sort = getParam("sort");
    switch (Number(sort)) {
        case 0:
            break;
        case 1:
            products.sort(function (a, b) {
                return b.stock - a.stock;
            });
            break;
        case 2:
            products.sort(function (a, b) {
                return b.availability - a.availability;
            });
            break;
        case 3:
            products.sort(function (a, b) {
                if (a.stock != null) {
                    a = a.stock;
                } else {
                    a = a.price;
                }
                if (b.stock != null) {
                    b = b.stock;
                } else {
                    b = b.price;
                }
                return b - a;
            });
            break;
        case 4:
            products.sort(function (a, b) {
                if (a.stock != null) {
                    a = a.stock;
                } else {
                    a = a.price;
                }
                if (b.stock != null) {
                    b = b.stock;
                } else {
                    b = b.price;
                }
                return a - b;
            });
            break;
        default:
            console.log("Wrong sort num")
    }
    return products;
}

function filterProducts(products, filter) {

    const current_filter = getParam(filter).replace(" ", "").split(",");
    if (current_filter[0] == "") {
        return products;
    } else {
        let filtered_products = [];
        for (i = 0; i < products.length; i++) {
            const product_prop = products[i][filter].replace(" ", "").split(",");
            let add_product = false;
            for (j = 0; j < product_prop.length; j++) {
                if (current_filter.includes(product_prop[j])) {
                    add_product = true;
                }
            }
            if (add_product) {
                filtered_products.push(products[i]);
            }
        }
        return filtered_products;
    }
}

function filterProductsPrice(products) {
    const price_scope = getParam("price").split("-");
    if (price_scope[0] == "") {
        return products;
    } else {
        let filtered_products = [];
        for (i = 0; i < products.length; i++) {
            let price = products[i].price
            if (products[i].stock != null) {
                price = products[i].stock;
            }
            if (price >= price_scope[0] && price <= price_scope[1]) {
                filtered_products.push(products[i]);
            }
        }
        return filtered_products;
    }
}