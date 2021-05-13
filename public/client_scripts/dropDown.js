function displayDropdown(num){
	var dropDown = document.getElementById(`dropDown${num}`);
	var icon = document.getElementById(`filter_icon${num}`);
	if (dropDown.classList.contains('showDrop')){
		dropDown.className = "hideDrop";
		icon.className = "fa-angle-double-down"
	}
	else{
		dropDown.className = "showDrop";
		icon.className = "fa-angle-double-up"
	}
}

function changeSort(num){
	sessionStorage.setItem('sort', num);
	show();
}