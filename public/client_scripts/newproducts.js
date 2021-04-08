function getNew(product="Rings"){
	$.get('/new', {productType: product}, function(products){
		for (var i = 0; i <= 4; i++) {
			$('.new_list').append(`<div class="new_product">
				<img class="new_product_image" src="images/product_photo/${products[i].image}">
				<div class="new_product_name">${products[i].name}</div>
				</div>`);
		} 
	});
}