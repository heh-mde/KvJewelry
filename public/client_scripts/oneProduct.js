 function getOne(product="rings", vendorcode){
	$.get('/getOne', {vendorcode: vendorcode}, function(products){
			$('.new_list').append(`<div class="product">
				<a href="/products/${product}/${products[0].vendorcode}" class="product_link">
				<div class="product_availability"></div>
				<div class="product_info_block">
					<p class="product_info">Артикул:  ${products[0].vendorcode}</p>
					<p class="product_info">Вес:  ${products[0].weight}</p>
					<p class="product_info">Метал:  ${products[0].metal}</p>
				</div>
				<div class="product_body">
					<img class="product_image" src="/images/product_photo/${products[0].image}">
					<div class="product_price" id=${products[0].vendorcode}_price>${products[0].price} грн</div>
					<div class="product_name">${products[0].name}</div>
				</div></a>
				<button onclick="" class="product_basket"></button>
				</div>`);

			if (products[0].stock != null){
				$(`#${products[0].vendorcode}_price`)
				.append(`<div class="product_stock">${products[0].stock} грн</div>`)
				.css({
					'width': '50%',
					'color': 'black',
					'font-size': '14px',
					'text-decoration': 'line-through blue',
				});
			}
	});
}