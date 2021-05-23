function addToCart(e) {
    let cart = window.localStorage.getItem('cart');
    let product = e.target.id.split("_")[0];
    let id = e.target.id.split("_")[1];
    console.log(product, id);
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