function getNew(product="Rings"){
	$.get('/new', {productType: product}, function(products){
		for (var i = 0; i <= 4; i++) {
			$('.new_list').append(`<a href="" class="new_product_link">
				<div class="new_product_availability"></div>
				<div class="new_product_info_block">
					<p class="new_product_info">Артикул:  ${products[i].vendorcode}</p>
					<p class="new_product_info">Вес:  ${products[i].weight}</p>
					<p class="new_product_info">Метал:  ${products[i].metal}</p>
					<button onclick="" class="new_product_basket"></button>
				</div>
				<div class="new_product_body">
					<img class="new_product_image" src="images/product_photo/${products[i].image}">
					<div class="new_product_price">${products[i].price} грн</div>
					<div class="new_product_name">${products[i].name}</div>
				</div></a>`);		
		} 
	});
}