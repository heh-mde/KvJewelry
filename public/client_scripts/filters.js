function displayFilterDropdown(num) {
    var dropDown = document.getElementById(`dropDown${num}`);
    var icon = document.getElementById(`filter_icon${num}`);
    if (dropDown.classList.contains('showDrop')) {
        dropDown.className = "hideDrop";
        icon.className = "fa-angle-double-down"
    } else {
        dropDown.className = "showDrop";
        icon.className = "fa-angle-double-up"
    }
}

function getPriceSlider(){
    let products = JSON.parse(sessionStorage.getItem("products"));
    let price;
    let max_price = 0;
    let min_price = 999999;
    for (i=0; i<products.length; i++){
        price = Number(products[i].price);
        if (products[i].stock != null) {
            price = Number(products[i].stock);
        }
        if (price < min_price){
            min_price = price;
        }
        if (price > max_price){
            max_price = price;
        }
    }
    const price_scope = getParam("price").split("-");
    if (price_scope[0] == ""){
        slider_values = [min_price, max_price];
    }
    else{
        slider_values = price_scope;
    }
    $("#price_slider").slider({range:true,min:min_price,max:max_price,values: slider_values,slide:function(event,ui){
        $("#price_min").val(ui.values[0]);
        $("#price_max").val(ui.values[1]);
        // if (!$('.price_button').length) {
        //     $("#price_slider").
        //     append(`<button class='price_button' onclick='filterPrice()'>Применить</button>`);
        // }
    },stop:function(event,ui){
        filterPrice();
    }});
    $("#price_min").val(slider_values[0]);
    $("#price_max").val(slider_values[1]);
}

function changeSlider(){
    min = $("#price_min").val();
    max = $("#price_max").val();
    $("#price_slider").slider({values: [min,max]});
    filterPrice();
}

function filterPrice(){
    without_price = getWithoutParam("price");
    const pathname = window.location.pathname;
    const min = $("#price_min").val();
    const max = $("#price_max").val();
    window.history.pushState("object or string", "Title", `${pathname}${without_price}price=${min}-${max}`);
    getPage(1);
}

function changeSort(num) {
    without_sort = getWithoutParam("sort");
    const pathname = window.location.pathname;
    window.history.pushState("object or string", "Title", `${pathname}${without_sort}sort=${num}`);
    getPage(1);
}

function changeFilter(id, filter){
    let checkBox = document.getElementById(id);
    const pathname = window.location.pathname;
    current_filter = getParam(filter);
    without_filter = getWithoutParam(filter);
    if (checkBox.checked){ 
        current_filter += id + ","
        window.history.pushState("object or string", "Title", `${pathname}${without_filter}${filter}=${current_filter}`);
    }
    else{
        current_filter = current_filter.replace(id+',', '');
        if (current_filter != ""){
            current_filter = filter + "=" + current_filter;
        }
        else{
            without_filter = without_filter.slice(0,-1);
        }
        window.history.pushState("object or string", "Title", `${pathname}${without_filter}${current_filter}`);
    }
    getPage(1);
}

function checkFilter(filter){
    let current_filter = getParam(filter).split(",");
    $(`.${filter}_checkbox`).prop('checked', false);
    for (i=0; i<current_filter.length-1;i++){
        $(`#${current_filter[i]}`).prop('checked', true);
    }
}

function highlightFilter(filter){
    let current_filter = getParam(filter);
    $(`.filter_block`).css({
        'background-color': '#fff6e0'
    }); 
    $(`#${filter}_${current_filter}`).css({
        'background-color': '#f5db9c'
    });
}
