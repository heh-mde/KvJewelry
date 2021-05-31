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
                        if (r.isSuccessful) {
                            window.localStorage.removeItem('cart');
                            $('.cart_content_container').html(`<div>Ваш заказ успешно оформлен!</div>`);
                            $('.cart_total_container').remove();
                            $('.basket_counter').html(`0`);
                        } else {
                            $('body').prepend(`
                            <div class="unauthorized_modal_container">
                                <div class="unauthorized_content">
                                    <span class="contact_close">&times;</span>
                                    <form action="/order" method="post" class="contact_form">
                                        <label for="name" class="contact_name_label"><b>Имя</b></label>
                                        <input type="text" placeholder="Введите имя" name="name" autocomplete="off" required>
                                        <label for="surname" class="contact_surname_label"><b>Фамилия</b></label>
                                        <input type="text" placeholder="Введите фамилию" name="surname" autocomplete="off" required>
                                        <label for="email" class="contact_email_label"><b>Почта</b></label>
                                        <input type="text" placeholder="Введите почту" name="email" required>
                                        <label for="phone" class="contact_phone_label"><b>Телефон</b></label>
                                        <input type="text" placeholder="Введите телефон" name="phone" autocomplete="off" required>
                                        <label for="call_back" class="contact_call_back_label"><input type="checkbox" checked class="contact_call_back" name="call_back">Перезвонить мне</label>
                                        <button type="submit">Отправить</button>
                                    </form>
                                </div>
                            </div>
                            `)
                            $('.contact_form').on('submit', async function (e) {
                                e.preventDefault();
                                $('.name_incorrect').remove();
                                $('.surname_incorrect').remove();
                                $('.email_incorrect').remove();
                                $('.phone_incorrect').remove();
                                let data = formCheck()
                                if (data) {
                                    let cart = JSON.parse(window.localStorage.getItem('cart'));
                                    let order = {};
                                    order.order = cart;
                                    order.data = data;
                                    const res2 = await fetch(`/order`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        mode: 'cors',
                                        body: JSON.stringify(order)
                                    }).then(async function (res3) {
                                        let r2 = await res3.json();
                                        if (r2.isSuccessful) {
                                            window.localStorage.removeItem('cart');
                                            $('.unauthorized_modal_container').remove();
                                            $('.cart_content_container').html(`<div>Ваш заказ успешно оформлен!</div>`);
                                            $('.cart_total_container').remove();
                                            $('.basket_counter').html(`0`);
                                        }
                                    })
                                }
                            });

                            $('.contact_close').on('click', function (e) {
                                $('.unauthorized_modal_container').remove();
                            })

                            $('.unauthorized_modal_container').on('click', function (e) {
                                if (e.target === $('.unauthorized_modal_container')[0]) {
                                    $('.unauthorized_modal_container').remove();
                                }
                            });
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

function formCheck() {
    let name = $('.contact_form > input[name="name"]');
    let surname = $('.contact_form > input[name="surname"]');
    let email = $('.contact_form > input[name="email"]');
    let phone = $('.contact_form > input[name="phone"]');
    let call_back = $('.contact_call_back');
    let valid = 1;

    if (name[0].value.replace(/[ A-Za-z-А-Яа-я]/g, "") || name[0].value.length > 255) {
        name.after(`<div class="name_incorrect">Имя может содержать кирилицу либо латиницу, пробелы и символ -.</div>`);
        valid = 0;
    }

    if (surname[0].value.replace(/[ A-Za-z-А-Яа-я]/g, "") || surname[0].value.length > 255) {
        surname.after(`<div class="surname_incorrect">Фамилия может содержать кирилицу либо латиницу, пробелы и символ -.</div>`);
        valid = 0;
    }

    if (!/^[^\s@]+@[^\s@]+$/.test(email[0].value)) {
        email.after(`<div class="email_incorrect">Указана неверная почта.</div>`);
        valid = 0;
    }

    if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone[0].value)) {
        phone.after(`<div class="phone_incorrect">Указан неверный телефон.</div>`);
        valid = 0;
    }

    return valid ? {
        name: name[0].value,
        surname: surname[0].value,
        email: email[0].value,
        phone: phone[0].value,
        call_back: call_back[0].checked
    } : valid;
}

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