function getNew(product="rings"){
	$.get('/getNew', {productType: product}, function(products){
		for (var i = 0; i <= 4; i++) {
			$('.new_list').append(`<div class="product" id=${products[i].vendorcode}_product>
				<a href="/products/${product}/${products[i].vendorcode}" class="product_link">
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
					'width': '50%',
					'color': 'black',
					'font-size': '14px',
					'text-decoration': 'line-through blue',
				});
			}

			$(`#${products[i].vendorcode}_product`).hover(function() {$(".product_body").css({'background':'none'})},function() {});
		}
	});
}