function show(){
	for (var i = 0; i <= (products.length-1); i++) {
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