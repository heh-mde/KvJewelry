function getAll(product="rings", limit=1000){
	$.get('/getAll', {limit: limit}, function(products){
		sessionStorage.setItem('products', JSON.stringify(products));
		console.log(JSON.parse(sessionStorage.getItem('products')));
	}).done(function(){
			sessionStorage.setItem('page', 1);
			show();
			});
}

function show(){
	products = JSON.parse(sessionStorage.getItem('products'))
	products = sortProducts(products);
	page = Number(sessionStorage.getItem('page'))
	if ($(window).width() >= '1920'){
		prodOnPage = 60;
	}
	else if ($(window).width() >= '1420'){
		prodOnPage = 50;
	}
	else if ($(window).width() >= '1200'){
		prodOnPage = 32;
	}
	else{
		prodOnPage = 21;
	}
	for (var i = (page-1)*prodOnPage; i <= page*prodOnPage-1; i++) {
		$('.product_block').append(`<div class="product">
			<a href="/products/rings/${products[i].vendorcode}" class="product_link">
			<div class="product_availability"></div>
			<div class="product_info_block">
 				<p class="product_info">Артикул:  ${products[i].vendorcode}</p>
				<p class="product_info">Вес:  ${products[i].weight}</p>
				<p class="product_info">Метал:  ${products[i].metal}</p>
			</div>
			<div class="product_body">
				<img class="product_image" src="/images/product_photo/${products[i].image}">
				<div class="product_price" id=${products[i].vendorcode}_price>${products[i].price} грн</div>
				<div class="product_name">${products[i].name}</div>
			</div></a>
			<button onclick="" class="product_basket"></button>
			</div>`);

		if (products[i].stock != null){
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
			if ($(window).width() <= '1200'){
				$(`#${products[i].vendorcode}_price`).css({'font-size': '18px', 'line-height': '30px'});
			}
		}
	}
}

function sortProducts(products){
	if (sessionStorage.getItem('sort') === null){
		sessionStorage.setItem('sort', 0)
	}
	$('.product_block').empty();
	switch(Number(sessionStorage.getItem('sort'))){
		case 0:
			break;
		case 1:
			products.sort(function(a,b) {
				return b.stock - a.stock;
			});
			break;
		case 2:
			products.sort(function(a,b) {
				return b.availability - a.availability;
			});
			break;
		case 3:
			products.sort(function(a,b) {
				return b.price - a.price;
			});
			break;
		case 4:
			products.sort(function(a,b) {
				return a.price - b.price;
			});
			break;
		default:
			console.log("Wrong sort num")
	}
	return products;
}