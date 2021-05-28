function getMaps() {
    if (sessionStorage.getItem("metal_name") == null){
        const metal_name = [{"wh_gold":"Белое золото","yl_gold":"Желтое золото","platin":"Платина","silver":"Серебро"}];
        sessionStorage.setItem("metal_name", JSON.stringify(metal_name));
    }
}
