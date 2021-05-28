$(function () {
    let modal = $('.cart');
    let btn = $('.basket');
    let closeModal = $('.close');
    btn.on('click', async function (e) {
        let contentContainer = $('.cart_content_container');
        $('.cart_total_container').remove();
        contentContainer.html('')
        let cart = JSON.parse(window.localStorage.getItem('cart'));
        let total = 0;
        if (Object.keys(cart).length !== 0 && cart) {
            $('.cart_content_container').append(`
            <div class="cart_product_title">
                <div class="cart_product_image_container"></div>
                <div class="cart_product_name">Название</div>
                <div class="cart_product_quantity">Количество</div>
                <div class="cart_product_price">Цена</div>
                <div class="cart_product_space"></div>
            </div>
            `);
            for (const product in cart) {
                for (const id in cart[product]) {
                    let r = await addElementToCart(id, product, cart[product][id], contentContainer).then(function (price) {
                        total += price;
                    });
                }
            }
            $('.cart_content_container').last().after(`
            <div class="cart_total_container">
                <div class="cart_total_price_container">
                    <div class="cart_total_title">К оплате: <div class="total">${total}</div></div>                                                
                    <div class="cart_total_price"></div>    
                </div>
                <div class="cart_order_container">
                    <button class="order_button">Заказать</button>
                </div>                                            
            </div>`);

            $('.cart_product_remove').on('click', function (e) {
                deleteFromCart(e.target, JSON.parse(window.localStorage.getItem('cart')));
            });

            $('.order_button').on('click', async function (e) {
                let cart = JSON.parse(window.localStorage.getItem('cart'));
                let order = {};
                order.order = cart;
                order.primary = true;
                if (Object.keys(order).length !== 0) {
                    const res = await fetch(`/order`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        mode: 'cors',
                        body: JSON.stringify(order)
                    }).then(async function (res) {
                        let r = await res.json();
                        console.log(r);
                        if (r.isSuccessful) {
                            window.localStorage.removeItem('cart');
                            $('.cart_content_container').html(`<div>Ваш заказ успешно оформлен!</div>`);
                            $('.cart_total_container').remove();
                            $('.basket_counter').html(`0`);
                        } else {
                            //TODO
                        }
                    });
                } else {
                    alert("Корзина пуста!"); //TODO
                }
            })
        } else {
            contentContainer.html('<div>Корзина пока пуста!</div>');
        }
        modal.css({'display': 'block'});
    });

    closeModal.on('click', function (e) {
        modal.css({'display': 'none'});
    })

    window.onclick = function (e) {
        if (e.target === modal[0]) {
            modal.css({'display': 'none'});
        }
    }
})

function deleteFromCart(target, cart) {
    let elToRemove = $(target).parent()
    elToRemove.find('.cart_product_remove').unbind('click');
    let product = elToRemove[0].id.split("_")[0];
    let id = elToRemove[0].id.split("_")[1];

    for (const p in cart) {
        if (p === product) {
            for (const i in cart[p]) {
                if (i === id) {
                    delete cart[p][i];
                    if (Object.keys(cart[product]).length === 0) {
                        delete cart[product];
                    }
                }
            }
        }
    }

    window.localStorage.setItem('cart', JSON.stringify(cart));
    let newPrice = $('.total').text() - elToRemove.find('.cart_product_quantity').text() * elToRemove.find('.cart_product_price').text();
    $('.total').html(`${newPrice}`);
    let newQuant = $(`.basket_counter`).text() - elToRemove.find('.cart_product_quantity').text();
    $('.basket_counter').html(`${newQuant}`);
    elToRemove.addClass('item_hidden');
    elToRemove.one('transitionend', function (e) {
        elToRemove.addClass('item_deleted');
        elToRemove.remove();
    });
}

async function addElementToCart(vendorCode, productName, amount, container) {
    return new Promise(resolve => {
        $.get('/getOne', {productType: productName, vendorcode: vendorCode}, function (product) {
            container.append(`
            <div id=${productName}_${vendorCode} class="cart_product_container" id="${productName}_${vendorCode}">
                <div class="cart_product_image_container">
                    <img class="cart_product_image" src="/images/product_photo/${product[0].image}" alt="">
                </div>
                <div class="cart_product_name">${product[0].name}</div>
                <div class="cart_product_quantity">${amount}</div>
                <div class="cart_product_price">${product[0].stock ? product[0].stock : product[0].price}</div>
                <div class="cart_product_remove">&times;</div>
            </div>
        `);
            resolve(product[0].stock ? product[0].stock * amount : product[0].price * amount);
        });
    });
}