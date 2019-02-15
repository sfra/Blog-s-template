/*properties attr */
/*global state, sessionStorage, config, __ajax */

(() => {

    state.lastScrollPosition = 0;
    state.wrapperNr = 0;
    state.sheet = 1;

    state.mouseIsUp = false;


})();


let $wrongLogin = null;
let translations = null;
let $loader=null; 

window.onload = () => {
    'use strict';

    const $menu = document.getElementById('menu'),
        $mainMenuButton = document.getElementById('main-menu-button'),
        $body = document.querySelector('body'),
        $background = document.createElement('div'),
        $links = document.querySelector('#menu > ul'),
        $forgot = document.getElementById('forgot'),
        $form2 = document.createElement('form');

    let translations = null;
    $loader = document.querySelector('.loader');
    $wrongLogin = document.getElementById('wrong-login');
    $form2.setAttribute('style', '200px');

    (new __ajax('../config/mexico.json').get().then(data => {
        console.log(data);
        (new __ajax(`translations/${JSON.parse(data)['language']}.json`)).get().then(data => {
            translations = JSON.parse(data);
            $form2.innerHTML = translations['reseting-email'];
        });
    }));


    if (navigator.userAgent.search('Firefox') !== -1) {
        document.body.classList.add('ff');
    };

    $background.classList.add('background');
    $body.prepend($background);

    $mainMenuButton.classList.add('active');
    $menu.classList.remove('hidden');

    config.mainMenu.opened = true;

    setTimeout(() => {
        $links.classList.remove('deactivated');
    }, 0);


    /* Event for open menu */
    $mainMenuButton.addEventListener('click', (e) => {

        if (config.mainMenu.opened) {
            $mainMenuButton.classList.remove('active');
            $menu.classList.add('hidden');
            config.mainMenu.opened = false;

        } else {
            $mainMenuButton.classList.add('active');
            $menu.classList.remove('hidden');
            config.mainMenu.opened = true;
        }

        e.preventDefault();

    }, false);

    //    $register.addEventListener('click',function(e){
    //        e.preventDefault();
    //    },false);

    const $form = document.createElement('form'),
        $input0 = document.createElement('input'),
        $input1 = document.createElement('input'),
        $loginButton = document.getElementById('login-button'),
        $closeWindow = document.getElementById('cross').children[0];


    $links.addEventListener('click', (e) => {

        if (typeof window.orientation === 'undefined') {
            return;
        }
        let $target = e.target;

        if ($target.tagName === 'INPUT') {
            if (document.activeElement.getAttribute('type') === 'text' || document.activeElement.getAttribute('type') === 'password') {
                document.querySelector('.register').style.display = 'none';
            }
        } else {
            document.querySelector('.register').style.display = 'block';
        }

    }, false);

    $closeWindow.addEventListener('click', () => {
        document.getElementById('wrong-login').classList.remove('visible');
    }, false);


    document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            document.getElementById('wrong-login').classList.remove('visible');
        };

    }, false);


    $form.setAttribute('action', 'admin/login.php');
    $form.setAttribute('method', 'POST');
    $input0.setAttribute('name', 'login');
    $input1.setAttribute('name', 'password');
    $form.appendChild($input0);
    $form.appendChild($input1);


    $loginButton.addEventListener('click', () => {

        $input0.value = encodeURIComponent(document.getElementById('menu').querySelectorAll('input')[0].value);
        $input1.value = encodeURIComponent(document.getElementById('menu').querySelectorAll('input')[1].value);

        let ajax = new __ajax('admin/login.php', {
            value: 'POST'
        });
        ajax.setParameters({
            login: $input0.value,
            password: $input1.value
        });
        ajax.get().then(function (data) {
            if (data === '[OK]') {
                window.location.replace('index.php?login=true');
            } else {
                try {
                    $wrongLogin.querySelector('p').removeChild($form2);
                } catch (e) {

                }

                $wrongLogin.querySelector('p').innerHTML = translations['wrong-login'];
                $wrongLogin.classList.add('visible');
            };
        });

    }, false);


    if (document.querySelector('.incorrect-login')) {
        let $incorrectOK = document.querySelector('.incorrect-login').children[0];

        $incorrectOK.addEventListener('click', () => {
            $incorrectOK.parentElement.parentElement.removeChild(document.querySelector('.incorrect-login'));
        }, false);
    }


    document.body.addEventListener('keyup', (e) => {
        //  console.log(e);
        if (e.key === 'Enter' && !$wrongLogin.classList.contains('visible')) {
            let event = new Event('click');
            $loginButton.dispatchEvent(event);
        }
    }, false);

    $forgot.addEventListener('click', (e) => {
        e.preventDefault();
        $wrongLogin.querySelector('p').innerHTML = '';
        $wrongLogin.querySelector('p').appendChild($form2);

        $wrongLogin.classList.add('visible');

    }, false);


}




function submitMail(translations) {

    let ajax = new __ajax('admin/submitMail.php', {
        method: 'post'
    });

    ajax.setParameters({
        mail: document.getElementById('mail').value
    });
    $loader.classList.remove('hidden');

    ajax.get().then((data) => {
        $loader.classList.add('hidden');
        if (data == '[OK]') {
            $wrongLogin.querySelector('p').innerHTML = translations[0];
        } else {
            $wrongLogin.querySelector('p').innerHTML = translations[1];
        }

    });
}
