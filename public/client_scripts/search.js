function searchProducts(){
	let search = document.getElementById('search_input').value;
	document.location.href = `/products?&search=${search}`;
	return true;
}
