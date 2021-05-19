function getAll(product = "rings", limit = 1000) {
    let page = getParam("page");
    let nopageparams = getWithoutParam("page");
    //window.history.pushState("object or string", "Title", `/products/${product}?page=1&sort=0&metall=0&price=500-50000`);
    if (sessionStorage.getItem("products") == null || page == 1){
        $.get('/getAll', {limit: limit}, function (products) {
            sessionStorage.setItem("products", JSON.stringify(products));
        }).done(function () {
            show(page);
            showPaginator(page);
        });
    }
    else{
        show(page);
        showPaginator(page);
    }
}

function show(page) {
    let products = JSON.parse(sessionStorage.getItem("products"))
    products = sortProducts(products);
    if ($(window).width() >= '1920') {
        sessionStorage.setItem("prodOnPage", 60);
    } else if ($(window).width() >= '1420') {
        sessionStorage.setItem("prodOnPage", 50);
    } else if ($(window).width() >= '1200') {
        sessionStorage.setItem("prodOnPage", 32);
    } else {
        sessionStorage.setItem("prodOnPage", 21);
    }
    const prodOnPage = sessionStorage.getItem("prodOnPage");
    let iter_end = page * prodOnPage;
    if (page == Math.ceil(products.length/prodOnPage)){
        iter_end = products.length;
    }
    $('.product_block').empty();
    for (let i = (page - 1) * prodOnPage; i < iter_end; i++) {
        $('.product_block').append(`<div class="product">
            <a href="/products/rings/${products[i].vendorcode}" class="product_link">
            <div class="product_availability"></div>
            <div class="product_info_block">
                <p class="product_info">Артикул:  ${products[i].vendorcode}</p>
                <p class="product_info">Вес:  ${products[i].weight}</p>
                <p class="product_info">Метал:  ${products[i].metal}</p>
            </div>
            <div class="product_body">
                <img class="product_image" src="/images/product_photo/${products[i].image}" alt="">
                <div class="product_price" id=${products[i].vendorcode}_price>${products[i].price} грн</div>
                <div class="product_name">${products[i].name}</div>
            </div></a>
            <button onclick="" class="product_basket"></button>
            </div>`);

        if (products[i].stock != null) {
            $(`#${products[i].vendorcode}_price`)
                .append(`<div class="product_stock">${products[i].stock} грн</div>`)
                .css({
                    'width': '80%',
                    'margin': 'auto',
                    'text-align': 'left',
                    'color': 'black',
                    'font-size': '14px',
                    'text-decoration': 'line-through blue',
                    'line-height': '30px'
                });
            if ($(window).width() <= '1200') {
                $(`#${products[i].vendorcode}_price`).css({'font-size': '18px', 'line-height': '30px'});
            }
        }
    }
}

function sortProducts(products) {
    if (sessionStorage.getItem('sort') === null) {
        sessionStorage.setItem('sort', "0");
    }
    switch (Number(sessionStorage.getItem('sort'))) {
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
                if (a.stock != null){
                    a = a.stock;
                }
                else{
                    a = a.price;
                }
                if (b.stock != null){
                    b = b.stock;
                }
                else{
                    b = b.price;
                }     
                return b - a;
            });
            break;
        case 4:
            products.sort(function (a, b) {
                if (a.stock != null){
                    a = a.stock;
                }
                else{
                    a = a.price;
                }
                if (b.stock != null){
                    b = b.stock;
                }
                else{
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