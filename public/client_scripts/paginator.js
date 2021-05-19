function showPaginator(page=1,params="?") {
	if (page == 1){
		$('.pagination_block').append('<li class ="pagination_item" id="no_hover"><a>&laquo;</a></li>');
	}
	else{
		$('.pagination_block').append(`<li class ="pagination_item"><a href="/products/rings${params}&page=${page-1}">&laquo;</a></li>`);
	}

	let pagenum = Math.ceil(JSON.parse(sessionStorage.getItem("products")).length/sessionStorage.getItem("prodOnPage"))
	for (let i =0; i<pagenum; i++){
		if (i == page-1){
			$('.pagination_block').append(`<li class ="pagination_item" id="on_hover"><a href="/products/rings${params}&page=${i+1}">${i+1}</a></li>`);
		}
		else{
			$('.pagination_block').append(`<li class ="pagination_item"><a href="/products/rings${params}&page=${i+1}">${i+1}</a></li>`);
		}
	}

	if (page == pagenum){ 
		$('.pagination_block').append('<li class ="pagination_item" id="no_hover"><a>&raquo;</a></li>');
	}
	else{
		$('.pagination_block').append(`<li class ="pagination_item"><a href="/products/rings${params}&page=${page+1}">&raquo;</a></li>`);
	}

	$('body').append($('.pagination_block').first().clone());
}
