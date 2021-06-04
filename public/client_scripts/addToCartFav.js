function addToCart(e) {
    let cart = window.localStorage.getItem('cart');
    let product = e.target.id.split("_")[0];
    let id = e.target.id.split("_")[1];
    if (!cart) {
        cart = {}
        cart[product] = {}
        cart[product][id] = 1
        window.localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        cart = JSON.parse(cart);
        if (product in cart) {
            if (id in cart[product]) {
                cart[product][id] += 1;
            } else {
                cart[product][id] = 1;
            }
        } else {
            cart[product] = {};
            cart[product][id] = 1;
        }
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }
    let cartSize = 0;
    for (const product in cart) {
        for (const id in cart[product]) {
            cartSize += cart[product][id];
        }
    }
    $('.basket_counter').html(`${cartSize}`);
}

async function addToFav(btnPressed, favList) {
    let isAdd = !favList.includes(parseInt(btnPressed[0].id))
    await fetch('/favorites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
            isAdd,
            vendorCode: parseInt(btnPressed[0].id)
        })
    }).then(async (res) => {
        await res.json().then((data) => {
            if (data.isSuccessful) {
                if (isAdd) {
                    favList.push(parseInt(btnPressed[0].id));
                } else {
                    let index = favList.indexOf(parseInt(btnPressed[0].id));
                    if (index !== -1) {
                        favList.splice(index, 1);
                    }
                }
                btnPressed.toggleClass('favorited');
            }
        })
    }).catch((err) => console.log(err));
}