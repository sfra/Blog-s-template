function hasClass(obj,_class){

    let clList = obj.classList;

    for(let i=0, max=clList.length; i<max;i++) {
        if(clList[i]===_class) {
            return true;
        } 
    }
    return false;
};



