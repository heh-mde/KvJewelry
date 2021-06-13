function getParam(param, info=window.location.search){
    const defaultparam = {"page": "1", "sort": "0", "metal":"", "price":"", "product":""};
    let param_value;
    if (info.includes(param)){
        let pagesplited = info.split(param);
        pagesplited = pagesplited[1].split('&');
        param_value = pagesplited[0].slice(1);
    }
    else{
        param_value = defaultparam[param];
    }
    return param_value;
}

function getWithoutParam(param){
    let info = window.location.search
    let noparam = info + "&";
    if (info.includes(param)){
        let pagesplited = info.split(param);
        const with_param = pagesplited[1].split('&');
        let after_param = with_param[1];
        if (after_param === undefined){
            after_param = "";
        }
        else{
            after_param = "&" + after_param;
        }
        noparam = pagesplited[0].slice(0,-1) + after_param + "&";
    }
    if (info == ""){
        noparam = "?" + noparam;
    }

    return noparam;
}

function getProductID(){
    let pathname = window.location.pathname;
    const id = pathname.split("/")[2];
    return id;
}

function checkURL() {
    if (window.location.search != sessionStorage.getItem("params")){
        old_products = getParam("product");
        new_products = getParam("product", sessionStorage.getItem("params"));
        if (old_products != new_products){
            getAll();
        }
        else{
            show(Number(getParam("page")));
        }
        checkFilter("metal");
        checkFilter("product");
        sessionStorage.setItem("params", window.location.search);
    }
}

// (function(history){
//     var pushState = history.pushState;
//     history.pushState = function(state) {
//         if (typeof history.onpushstate == "function") {
//             history.onpushstate({state: state});
//         }
//         console.log("abs");
//         return pushState.apply(history, arguments);
//     };
// })(window.history);