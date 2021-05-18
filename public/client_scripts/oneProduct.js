function getOne(product = "rings", vendorcode) {
    $.get('/getOne', {vendorcode: vendorcode}, function (products) {
        $('.product_container').append(`
                <div class="product">
                    <div class="image_container">
                        <img class="product_image" src="/images/product_photo/${products[0].image}" alt="">
                    </div>
                    <div class="content_box">
                        <div class="product_name">${products[0].name}</div>
                        <div class="product_info_block">
                            <p class="product_info">Артикул:  ${products[0].vendorcode}</p>
                            <p class="product_info">Вес:  ${products[0].weight}</p>
                            <p class="product_info">Метал:  ${products[0].metal}</p>
                        </div>
                        <div class="price"></div>
                        <div class="button_container">
                            <button onclick="" class="product_basket">Добавить в корзину</button>
                        </div>
                    </div>
                </div>`);
        if (products[0].stock != null) {
            let price = $(`.price`)
            price.append(`<div class="product_price">${products[0].price} грн</div>`);
            price.append(`<div class="product_discounted_price">${products[0].stock} грн</div>`);
            $(`.product_price`).css({
                'text-decoration': 'line-through red 2px',
                'padding': '10px 0 20px 20px',
                'font-size': '26px'
            })
            $(`.product_discounted_price`).css({
                'padding': '20px',
                'font-size': '32px',
                'color': 'green'
            })
        } else {
            $(`.price`).append(`<div class="product_price">${products[0].price} грн</div>`);
            $(`.product_price`).css({
                'padding': '20px',
                'font-size': '32px'
            })
        }
    });
}

function loadProduct() {
    let url = window.location.href;
    let productId = /\/[0-9]+$/g.exec(url)[0].replace("/", "");
    url = url.replace(/\/[0-9]+$/g, "")
    let productType = /\/[A-Za-z]+$/g.exec(url)[0].replace("/", "");
    getOne(productType, productId);
}