function searchProducts(){
	let search = document.getElementById('search_input').value;
	document.location.href = `/products?sort=0&search=${search}`;
	return true;
}
