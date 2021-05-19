function getParam(param){
	const defaultparam = {"page": 1, "name": 3};
	let info = window.location.search
	let param_value;
    if (info.includes(param)){
        let pagesplited = info.split(param);
        param_value = Number(pagesplited[1][1]);
    }
    else{
    	param_value = defaultparam[param];
    }
	return param_value;
}

function getWithoutParam(param){
	let info = window.location.search
	let noparam = info;
    if (info.includes(param)){
        let pagesplited = info.split(param);
        noparam = pagesplited[0].slice(1, -1) + pagesplited[1].slice(2);
    }
	return noparam;
}