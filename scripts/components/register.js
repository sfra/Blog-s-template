/*properties attr, src, fn,gal,offset, left, mouseOut, stopPropagation, bubbles, pageX, pageY, X, Y, html, append, css, top, parent, border, trigger, animate, opacity, remove, height, width, data, gal_close, class, on , children, wrap, addClass, find, deepExt, apply, defaults */
/*global __ajax, state, passwordMetter, console */
'use strict';
const $login = document.querySelector('input[placeholder="login"]'),
  $password0 = document.querySelectorAll('input[type="password"]')[0],
  $password1 = document.querySelectorAll('input[type="password"]')[1],
  $email0 = document.querySelectorAll('input[placeholder="email"]')[0],
  $email1 = document.querySelectorAll('input[type="email"]')[1],
  reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  $sendCaptcha = document.getElementById('send-captcha'),
  $securityForm = document.getElementById('security'),
  $loader=document.querySelector('.loader');

let $background = document.createElement('div'),
  $response = document.getElementById('response'),
  register = {},
  translations = null;

let ajax = new __ajax('admin/auth/preregisterUser.php', {
  method: 'post'
});
$background.classList.add('background');

window.onload = () => {

  let $cross = document.getElementById('cross');


  document.body.prepend($background);

  (new __ajax('../config/mexico.json', {
    method: 'post'
  })).get().then(data => {
    (new __ajax(`translations/${JSON.parse(data)['language']}.json`)).get().then(data => {
      translations = JSON.parse(data);

      $securityForm.querySelector('label').innerText = translations['captcha'];
    });


  });






  ajax.setParameters({
    run: 'checkLoginExists',
    login: $login.value,
    password: $password0.value
  });

  let $submit = document.querySelector('input[type="submit"]');


  $submit.addEventListener('click', (e) => {
    e.preventDefault();

    let valid = register.validateForm();
    let isValid = true;



    for (let i = 0, max = valid.length; i < max; i++) {
      isValid = isValid && valid[i];
    }

    if (isValid) {


      //     console.log($password0.value);
      $securityForm.parentElement.classList.remove('hidden');


    }

  }, false);




  $login.addEventListener('keyup', () => {

    let $loginWarning = $login.nextElementSibling.nextElementSibling;
    $login.style.color = '';
    if ($login.value.length > 3) {
      ajax.setParameters({
        login: $login.value,
        run: 'checkLoginExists'
      });

      ajax.get().then((data) => {
        // debugger;
        if (data === '1') {
          $login.style.color = '#ff0000';
          $loginWarning.classList.remove('hidden');
        } else {
          $loginWarning.classList.add('hidden');
        }

      }, () => {});
    }



    //            console.log(e);
  }, false);




  let $metter = document.getElementById('metter');

  let boundValues = [20, 40, 60, 80, 100, 120];

  $password0.addEventListener('keyup', () => {

    let stregth = 2 * passwordMetter($password0.value, 'scoring');

    let $tips = document.getElementById('tips');

    let tipsPresent = false;

    if (passwordMetter($password0.value, 'upperLetters') > 0.8) {
      $tips.children[0].children[1].style.display = 'none';
    } else {
      $tips.children[0].children[1].style.display = '';
      tipsPresent = true;
    }

    if (passwordMetter($password0.value, 'containsNumbers') > 0) {
      $tips.children[0].children[0].style.display = 'none';
    } else {
      $tips.children[0].children[0].style.display = '';
      tipsPresent = true;
    }

    if (passwordMetter($password0.value, 'containsSpecialCharacters') > 0) {
      $tips.children[0].children[2].style.display = 'none';
    } else {
      $tips.children[0].children[2].style.display = '';
      tipsPresent = true;
    }

    if (tipsPresent) {
      $tips.classList.remove('empty');
    } else {
      $tips.classList.add('empty');
    }



    for (let i = 0, max = boundValues.length - 1; i < max; i++) {

      if (boundValues[i] <= stregth) {
        $metter.children[1].children[i].style.backgroundColor = '#00ff00';
      }

      if (boundValues[i] < stregth &&
        stregth <= boundValues[i + 1]
      ) {

        let backgound = `rgb(${255-((stregth-boundValues[i])/(boundValues[i+1]-boundValues[i]))*255},${((stregth-boundValues[i])/(boundValues[i+1]-boundValues[i]))*255},0)`;

        $metter.children[1].children[i].style.backgroundColor = backgound;


      }

      if (stregth < boundValues[i]) {
        $metter.children[1].children[i].style.backgroundColor = '#ff0000';
      }
    }



  }, false);


  $password1.addEventListener('keyup', () => {
    let $passWordWarning = $password0.nextElementSibling.nextElementSibling;
    if (register.testPassword()) {
      $password1.style.color = '';
      $passWordWarning.classList.add('hidden');

    } else {
      $password1.style.color = 'ff0000';
      $passWordWarning.classList.remove('hidden');

    }

  }, false);


  document.querySelector('#wrapper-0 > form').addEventListener('keyup', (e) => {

    if (e.target.tagName === 'INPUT' && e.target.getAttribute("type") === "email") {

      if (!register.testMail('diff')) {
        $email0.nextElementSibling.classList.remove('hidden');
      } else {
        $email0.nextElementSibling.classList.add('hidden');
      }
    }





  }, false);



  $email0.addEventListener('blur', (e) => {

    if (!register.testMail('valid')) {
      e.target.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('hidden');
    } else {
      e.target.nextElementSibling.nextElementSibling.nextElementSibling.classList.add('hidden');
    }

  }, false);



  $cross.addEventListener('click', () => {


    $response.classList.add('hidden');
    setTimeout(() => {
      $response.style.display = 'none';

    }, 1000);


  }, false);


  document.getElementById('cross2').addEventListener('click', () => {
    $securityForm.parentElement.classList.add('hidden');
  }, false);

  $sendCaptcha.addEventListener('click', (e) => {
    e.preventDefault();

    ajax = new __ajax(' securimage/index.php', {
      method: 'post'
    });

    ajax.setParameters({
      'captcha_code': document.getElementById('captcha_code').value
    });

    ajax.get().then((data) => {
      /**check captcha */
      if (data === '[OK]') {
        register.preregisterUser();
      } else {
        if (typeof window.captcha_image_audioObj !== 'undefined') captcha_image_audioObj.refresh();
         document.getElementById('captcha_image').src = '/mexico/template/securimage/securimage_show.php?' + Math.random();
         document.querySelector('#security label').innerHTML = translations['wrong-captcha'];
         document.querySelector('#security label').style.color = '#ff0000';
         // this.blur()
      }


    }, (err) => {
      console.log(err)
    });




  }, false);


};


register.testUser = () => {
  return document.querySelector('#wrapper-0 > form > div:nth-child(4)').classList.contains('hidden');
};


register.testMail = (ar) => {
  if (ar === 'diff') {

    return $email0.value === $email1.value;
  }

  if (ar === 'valid') {
    return reEmail.test($email0.value);
  }

};

register.testPassword = () => {
  if ($password0.value) {
    return $password0.value === $password1.value;
  }
};


register.validateForm = () => {
  return [register.testUser(),
    passwordMetter($password0.value, 'scoring') > 10,
    register.testPassword(), register.testMail('diff'), register.testMail('valid')
  ];
};


register.preregisterUser = () => {

  ajax.setUrl('admin/auth/preregisterUser.php');
  ajax.setParameters({
    run: 'preregisterUser',
    login: encodeURIComponent($login.value),
    password: encodeURIComponent($password0.value),
    email: encodeURIComponent($email0.value)
  });

  $loader.classList.remove('hidden');
  document.body.classList.add('misted');
  ajax.get().then((data) => {
    $loader.classList.add('hidden');
    document.body.classList.remove('misted');
    if (data === '[OK]') {
      $response.classList.remove('hidden');
      $securityForm.parentElement.classList.add('hidden');
      state.registered = true;
      $response.children[1].innerHTML = translations['registering-mail-ok'];
    } else {
      $response.children[1].innerHTML = translations['registering-mail-wrong'];
      state.registered = true;
    }



  });



};
