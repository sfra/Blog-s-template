const edit = {};

edit.formToPost = (form) => {
    let $form;

    if (typeof form === 'string') {
        $form = document.querySelector(form);
    } else {
        $form = form;
    }
    let post = {};

    let inputs = $form.querySelectorAll('input.post');
    
    for (let i = 0, max = inputs.length; i < max; i++) {
        post[inputs[i].name] = inputs[i].value;
    }
    return post;
};


edit.filter = (ajax) => {

    ajax.setUrl(`runResource.php?get=${operation}`);
    ajax.setMethod('POST');
    
    ajax.setParameters(edit.formToPost('form#inputs'));
    
    ajax.get().then(appendData);
};

edit.sort = (ajax,sort)=>{
    ajax.setUrl(`runResource.php?get=${operation}&sort=${sort}`);
    ajax.setMethod('POST');
    ajax.setParameters(edit.formToPost('form#inputs'));
    ajax.get().then(appendData);

};

function appendData(data){

  
    let results = data.replace(/registered/g, 'tak').replace(/zarejestrowany: __[^_]*___([0-9]{4})_([0-9]{2})_([0-9]{2})/g, (match, year, month, day) => {

        return `zarejestrowany: ${year}-${month}-${day}`;
    });
    document.querySelector('.results').innerHTML = results;

}

function getSiblingNumber(object){
    let siblings = object.parentElement.children;
    for(let i=0, max=siblings.length; i<max;i++){
        if(siblings[i]===object) {
            return i;
        }
    }

}

