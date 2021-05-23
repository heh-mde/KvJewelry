function getAll(limit = 1000) {
    const product = getProductName();
    let page = Number(getParam("page"));
    if (!Number.isInteger(page)){
        $('.product_block').append(`<div class="no_products">Страница каталога указана некоректно ("${getParam("page")}")<div>`);
        return 1;
    }
    //window.history.pushState("object or string", "Title", `/products/${product}?page=1&sort=0&metall=0&price=500-50000`);
    if (sessionStorage.getItem(product) == null || page == 1){
        $.get('/getAll', {productType:product, limit: limit}, function (products) {
            if (products == ""){
                $('.product_block').append(`<div class="no_products">Нет товара<div>`);
            }
            else{
                sessionStorage.setItem(product, JSON.stringify(products));
            }
        }).done(function(products) {
            if (products != ""){
                show(page);
            }
        });
    }
    else{
        show(page);
    }
}

function show(page) {
    highlightFilter("sort");
    const product = getProductName();
    let products = JSON.parse(sessionStorage.getItem(product));
    products = filterProducts(products, "metal");
    products = filterProductsPrice(products);
    if (products.length == 0){
        $('.product_block').empty();;
        $('.pagination_item').remove();
        $('.product_block').append(`<div class="no_products">Отсутвуют товары по выбраным критериям<div>`);
        return 1;
    }
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
    const page_num = Math.ceil(products.length/prodOnPage);
    if (page == page_num){
        iter_end = products.length;
    }
    else if (page >= page_num){
        $('.product_block').empty();;
        $('.pagination_item').remove();
        $('.product_block').append(`<div class="no_products">Страница ${page} даного каталога не существует<div>`);   
        return 1;     
    }

    $('.product_block').empty();
    for (let i = (page - 1) * prodOnPage; i < iter_end; i++) {
        $('.product_block').append(`<div class="product" id="${products[i].vendorcode}">
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
            <button onclick="" id="${products[i].type}_${products[i].vendorcode}" class="product_basket"></button>
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
    $('.product_basket').on('click', addToCart);
    showPaginator(page, products.length);
    getPriceSlider(product);
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

function filterProducts(products, filter) {

    const current_filter = getParam(filter).replace(" ", "").split(",");
    if (current_filter[0] == "") {
        return products;
    }
    else {
        let filtered_products = [];
        for (i=0; i<products.length; i++) {
            const product_prop = products[i][filter].split(",");
            let add_product = false;
            for (j=0; j<product_prop.length; j++) {
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

function filterProductsPrice(products){
    const price_scope = getParam("price").split("-");
    if (price_scope[0] == ""){
        return products;
    }
    else{
        let filtered_products = [];
        for (i=0; i<products.length; i++) {
            let price = products[i].price
            if (products[i].stock != null){
                price = products[i].stock;
            }
            if (price >= price_scope[0] && price <= price_scope[1]){
                filtered_products.push(products[i]);
            }
        }
        return filtered_products;
    }
}