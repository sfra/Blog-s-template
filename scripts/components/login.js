(function () {
    let config = {
        mainMenu: {
            opened: false
        }
    };

    state.lastScrollPosition = 0;
    state.wrapperNr = 0;
    state.sheet = 1;

    state.mouseIsUp = false;





})();




window.onload = function () {

    let $menu = document.getElementById('menu');
    let $mainMenuButton = document.getElementById('main-menu-button');
    
    let $body = document.querySelector('body');
    let $background = document.createElement('div');
    let $register = document.getElementById('register');
    let $links = document.querySelector('#menu > ul');
    
    
    
    
    if(navigator.userAgent.search('Firefox')!==-1){
        document.body.classList.add('ff');
    };
    
    $background.classList.add('background');
    $body.prepend($background);
    
    $mainMenuButton.classList.add('active');
    $menu.classList.remove('hidden');



    config.mainMenu.opened = true;
    
    setTimeout(function(){
    $links.classList.remove('deactivated');
        
    },0);


    /* Event for open menu */
    $mainMenuButton.addEventListener('click', function (e) {

        if (config.mainMenu.opened) {

            $mainMenuButton.classList.remove('active');
            $menu.classList.add('hidden');
            config.mainMenu.opened = false;

        } else {
            $mainMenuButton.classList.add('active');
            $menu.classList.remove('hidden');



            config.mainMenu.opened = true;

        };

        e.preventDefault();

    }, false);

//    $register.addEventListener('click',function(e){
//        e.preventDefault();
//    },false);

    let $form = document.createElement('form');
    let $input0 = document.createElement('input');
    let $input1 = document.createElement('input');
    let $loginButton = document.getElementById('login-button');
    let $closeWindow = document.getElementById('cross').children[0];
    let $wrongLogin = document.getElementById('wrong-login');
    
    
    $closeWindow.addEventListener('click',function(){
        document.getElementById('wrong-login').classList.remove('visible');
    },false);
    
    
    document.addEventListener('keyup',function(e){
        if(e.key==='Escape') {
                    document.getElementById('wrong-login').classList.remove('visible');
        };

    },false);
    
    
    $form.setAttribute('action', 'admin/login.php');
    $form.setAttribute('method', 'POST');
    $input0.setAttribute('name', 'login');
    $input1.setAttribute('name', 'password');
    $form.appendChild($input0);
    $form.appendChild($input1);

//    document.body.appendChild($form);


    $loginButton.addEventListener('click', function () {
        $input0.value = encodeURIComponent( document.getElementById('menu').querySelectorAll('input')[0].value);
        $input1.value = encodeURIComponent(document.getElementById('menu').querySelectorAll('input')[1].value);
        
        

        let ajax = new __ajax('http://localhost/mexico3/admin/login.php',{value: 'POST'});
        ajax.setParameters({login: $input0.value, password: $input1.value});
        ajax.get().then(function(data){
            if(data==='ok') {
                window.location.replace('http://localhost/mexico3/index.php');
            } else {
                
                $wrongLogin.classList.add('visible');

            };
            

        });
        

    }, false);



    if (document.querySelector('.incorrect-login')) {
        let $incorrectOK = document.querySelector('.incorrect-login').children[0];



        $incorrectOK.addEventListener('click', function () {
            $incorrectOK.parentElement.parentElement.removeChild(document.querySelector('.incorrect-login'));
        }, false);
    };


    document.body.addEventListener('keyup',function(e){
        console.log(e);
        if(e.key==='Enter') {
            let event = new Event('click');
            $loginButton.dispatchEvent(event);
        }
    },false);
    
    


}






function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}