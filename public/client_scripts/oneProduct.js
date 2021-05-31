async function getOne(product = "rings", vendorcode) {
    $.get('/getOne', {productType: product, vendorcode: vendorcode}, function (products) {
        $('.product_container').append(`
                <div class="product" id="${vendorcode}">
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
                            <button onclick="" id="${product}_${products[0].vendorcode}" class="product_basket">Добавить в корзину</button>
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
        $('.product_basket').on('click', addToCart);
    });
}

function loadProduct() {
    let url = window.location.href;
    let productId = /\/[0-9]+$/g.exec(url)[0].replace("/", "");
    url = url.replace(/\/[0-9]+$/g, "")
    let productType = /\/[A-Za-z]+$/g.exec(url)[0].replace("/", "");
    getOne(productType, productId);
}

function addProduct(product, block) {
    const metal_name = JSON.parse(sessionStorage.getItem("metal_name"));
    const metals = product.metal.replace(' ', '').split(",");
    let metal = ""
    for (let j = 0; j < metals.length; j++){
        metal += metal_name[0][metals[j]] + ", ";
    }
    metal = metal.slice(0,-2);

    $(`.${block}`).append(`<div class="product" id="${product.vendorcode}">
        <a href="/products/rings/${product.vendorcode}" class="product_link">
        <div class="product_availability"></div>
        <div class="product_info_block">
            <p class="product_info_item">Артикул:  ${product.vendorcode}</p>
            <p class="product_info_item">Вес:  ${product.weight}</p>
            <p class="product_info_item" id=product_metal>Метал:  ${metal}</p>
        </div>
        <div class="product_body">
            <img class="product_image" src="/images/product_photo/${product.image}" alt="">
            <div class="product_price" id=${product.vendorcode}_price>${product.price} грн</div>
            <div class="product_name">${product.name}</div>
        </div></a>
        <button onclick="" id="${product.type}_${product.vendorcode}" class="product_basket"></button>
        </div>`);

    if (product.stock != null) {
        $(`#${product.vendorcode}_price`).empty();
        $(`#${product.vendorcode}_price`).append(
            `<div class="old_price" id=${product.vendorcode}_old_price>${product.stock} грн</div>`);
        $(`#${product.vendorcode}_old_price`).css({
                'display':'inline-block',
                'color': 'black',
                'font-size': '14px',
                'text-decoration': 'line-through blue',
                'vertical-align': 'text-bottom',
                'font-family': '"Montserrat", sans-serif',
                'width': '40%'
        });
        $(`#${product.vendorcode}_price`).append(
            `<div class="product_stock" id=${product.vendorcode}_stock>${product.price} грн</div>`);
        $(`#${product.vendorcode}_stock`).css({
                'display':'inline-block',
                'font-family': '"Montserrat", sans-serif',
                'width': '50%',
                'color': 'green'
        });        
        if ($(window).width() <= '1200') {
            $(`#${product.vendorcode}_price`).css({'font-size': '18px', 'line-height': '30px'});
        }
    }
}