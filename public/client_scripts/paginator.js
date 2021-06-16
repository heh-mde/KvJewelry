function showPaginator(page, prod_num) {
	$('.pagination_item').remove();
	const params = getWithoutParam("page");
	if (page == 1){
		$('.pagination_block').append('<li class ="pagination_item" id="no_hover"><button>&laquo;</button></li>');
	}
	else{
		$('.pagination_block').append(`<li class ="pagination_item"><button onclick="getPage(${page-1})">&laquo;</button></li>`);
	}

	const prodOnPage = 50;
	const pagenum = Math.ceil(prod_num/prodOnPage);

	for (let i =0; i<pagenum; i++){
		if (i == page-1){
			$('.pagination_block').append(`<li class ="pagination_item" id="on_hover"><button onclick="getPage(${i+1})">${i+1}</button></li>`);
		}
		else{
			$('.pagination_block').append(`<li class ="pagination_item"><button onclick="getPage(${i+1})">${i+1}</button></li>`);
		}
	}

	if (page == pagenum){ 
		$('.pagination_block').append('<li class ="pagination_item" id="no_hover"><button>&raquo;</button></li>');
	}
	else{
		$('.pagination_block').append(`<li class ="pagination_item"><button onclick="getPage(${page+1})">&raquo;</button></li>`);
	}
}

function getPage(num, scroll=true) {
	const params = getWithoutParam("page");
	window.history.pushState("object or string", "Title", `/products${params}page=${num}`);
	if (scroll) {
		$('body,html').animate({scrollTop: 220}, 400);
	}
}