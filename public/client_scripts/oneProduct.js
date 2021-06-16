function getOne(vendorcode, isLogged, favList) {
    $.get('/getOne', {vendorcode: vendorcode}, function (products) {
        product = products[0];
        metal = getNamesByFilter("metal", product.metal);

        $('.product_container').append(`<div class="product" id="${vendorcode}">
                    <div class="image_container">
                        <img class="product_image" src="/images/product_photo/${product.image}" alt="">
                    </div>
                    <div class="content_box">
                        <div class="product_name">${product.name}</div>
                        <div class="product_info_block">
                            <p class="product_info">Артикул:  ${product.vendorcode}</p>
                            <p class="product_info">Вес:  ${product.weight}</p>
                            <p class="product_info">Метал:  ${metal}</p>
                        </div>
                        <div class="price"></div>
                        <div class="buttons_container">
                            <button onclick="" id="${product.vendorcode}" class="product_favorite"></button>
                        </div>
                    </div>
                </div>`);
        if (product.availability) {
            $('.buttons_container').append(`<button onclick="" id="${product.type}_${product.vendorcode}" class="product_basket">Добавить в корзину</button>`);
        } else {
            $('.buttons_container').append('<div class="out_of_stock">Нет в наличии</div>');
        }
        let favBtn = $('.product_favorite');
        if (!isLogged) {
            favBtn.wrap('<a href="/login"></a>');
            favBtn.css({'height': '100%'});
        } else {
            for (let favItemCode of favList) {
                if (favItemCode === product.vendorcode) {
                    $(`#${product.vendorcode}.product_favorite`).addClass('favorited');
                }
            }
            favBtn.on('click', () => addToFav(favBtn, favList));
        }
        if (product.stock != null) {
            let price = $(`.price`)
            price.append(`<div class="product_price">${product.price} грн</div>`);
            price.append(`<div class="product_discounted_price">${product.stock} грн</div>`);
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
            $(`.price`).append(`<div class="product_price">${product.price} грн</div>`);
            $(`.product_price`).css({
                'padding': '20px',
                'font-size': '32px'
            })
        }
        $('.product_basket').on('click', addToCart);
    });
}

async function loadProduct() {
    const productId = getProductID();
    await fetch(`/isLogged`, {
        method: 'GET'
    }).then(async (res) => {
        await res.json().then(async (data) => {
            if (data.isLogged) {
                await fetch(`/favorites`, {
                    method: 'GET'
                }).then(async (res) => {
                    await res.json().then((data) => {
                        getOne(productId, true, data.data);
                    }).catch((err) => {
                        console.log(err);
                        getOne(productId, true, []);
                    })
                }).catch((err) => {
                    console.log(err);
                    getOne(productId, true, []);
                })
            } else {
                getOne(productId, false);
            }
        }).catch((err) => {
            console.log(err);
            getOne(productId, false);
        })
    }).catch((err) => {
        console.log(err);
        getOne(productId, false);
    });
}

function addProduct(product, block, isLogged, favList) {
    metal = getNamesByFilter("metal", product.metal);
    $(`.${block}`).append(`<div class="product" id="${product.vendorcode}">
            <a href="/products/${product.vendorcode}" class="product_link">
                <div class="product_info_block">
                    <p class="product_info_item">Артикул:  ${product.vendorcode}</p>
                    <p class="product_info_item">Вес:  ${product.weight}</p>
                    <p class="product_info_item" id=product_metal>Метал:  ${metal}</p>
                </div>
                <div class="product_body">
                    <img class="product_image" src="/images/product_photo/${product.image}" alt="">
                    <div class="product_price" id=${product.vendorcode}_price>${product.price} грн</div>
                    <div class="product_name">${product.name}</div>
                </div>
            </a>
            <button onclick="" id="${product.vendorcode}" class="product_favorite"></button>
        </div>`);
    if (product.availability) {
        $(`#${product.vendorcode}.product`).find('.product_favorite').before(`<button onclick="" id="${product.type}_${product.vendorcode}" class="product_basket"></button>`);
    }
    $(`#${product.vendorcode}.product`).find('.product_body').addClass(`${product.availability ? 'available' : 'unavailable'}`)
    let favBtn = $(`#${product.vendorcode}.product`).find('.product_favorite');
    if (!isLogged) {
        favBtn.wrap('<a href="/login"></a>');
    } else {
        for (let favItemCode of favList) {
            if (favItemCode === product.vendorcode) {
                $(`#${product.vendorcode}.product_favorite`).addClass('favorited');
            }
        }
        favBtn.on('click', () => addToFav(favBtn, favList));
    }
    if (product.stock != null) {
        $(`#${product.vendorcode}_price`).empty();
        $(`#${product.vendorcode}_price`).append(
            `<div class="old_price" id=${product.vendorcode}_old_price>${product.price} грн</div>`);
        $(`#${product.vendorcode}_old_price`).css({
            'display': 'inline-block',
            'color': 'black',
            'font-size': '0.95vw',
            'text-decoration': 'line-through blue',
            'vertical-align': 'text-bottom',
            'font-family': '"Montserrat", sans-serif',
        });
        $(`#${product.vendorcode}_price`).append(
            `<div class="product_stock" id=${product.vendorcode}_stock>${product.stock} грн</div>`);
        $(`#${product.vendorcode}_stock`).css({
            'display': 'inline-block',
            'font-family': '"Montserrat", sans-serif',
            'color': 'green'
        });
        if ($(window).width() <= '1200') {
            $(`#${product.vendorcode}_price`).css({'font-size': '18px', 'line-height': '30px'});
        }
    }
}

function getNamesByFilter(filter, prim_names) {
    const filter_names = JSON.parse(sessionStorage.getItem(`${filter}_name`));
    const fliters = prim_names.replace(' ', '').split(",");
    let names = "";
    for (let j = 0; j < fliters.length; j++) {
        names += filter_names[0][fliters[j]] + ", ";
    }
    names = names.slice(0, -2);
    return names;
}