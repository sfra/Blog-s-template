window.onload = () => {
    
    let formBlocked = true, dictionary=null;

    const  $form = document.querySelector('form'),
           $select = $form.querySelector('select'),
           $unblockSubmit = document.getElementById('unblock-submit'),
           $mainSubmit = document.getElementById('main-submit'),
           $imie = document.querySelector('[name="imie"]'),
           $nazwisko = document.querySelector('[name="nazwisko"]'),
           $email = document.querySelector('[name="email"]'),
           $plec = document.querySelector('[name="plec"]'),
           $webpage = document.querySelector('[name="webpage"]'),
           $foto = document.querySelector('[name="foto"]'),
           $arrowUp = document.querySelector('.arrow-up'),
           $modalWindowWarnings = document.getElementById('modal-window-warnings'),
           $cross = document.getElementById('cross'),
           edit_profile = {}, problems=[];
    

    
    functions.translate().then((data)=>{
        dictionary = data;
     });


    
    let x=window.location.href.replace(/problem=([A-Za-z]*)/,(match, gr)=>{
        problems.push(gr);
    });

    
    setTimeout(()=>{
    
        if(problems.length!==0) {
            $modalWindowWarnings.querySelector('p').innerHTML = (()=>{
                let out='';
                for(let i=0, max=problems.length; i<max; i++) {
                    out+=dictionary[problems[i]];
                }
                return out;
            })();
            
            $modalWindowWarnings.classList.add('visible');

        }
    },1000);


    (new __ajax('../config/mexico.json')).get().then(data=>{
        
        let language = JSON.parse(data)['language'];
            (new __ajax(`translations/${language}.json`)).get().then(data=>{
        
                let translations = JSON.parse(data);
            edit_profile.setForm = () => {
                $imie.value = JSONprofile['name'] || translations['not-supplied'];
                $nazwisko.value = JSONprofile['surname'] || translations['not-supplied'];
                $email.value = JSONprofile['email'] || translations['not-supplied'];
                $plec.value = JSONprofile['sex'] || translations['not-supplied'];
                $webpage.value = JSONprofile['webpage'] || translations['not-supplied'];
            };
        
            edit_profile.getForm = () => {
                JSONprofile['name'] = ($imie.value !== $imie.getAttribute('x-default')) ? $imie.value : '';
                JSONprofile['surname'] = ($nazwisko.value !== $nazwisko.getAttribute('x-default')) ? $nazwisko.value : '';
                JSONprofile['sex'] = ($plec.value !== $plec.getAttribute('x-default')) ? $plec.value : '';
                JSONprofile['email'] = ($email.value !== $email.getAttribute('x-default')) ? $email.value : '';
                JSONprofile['webpage'] = ($webpage.value !== $webpage.getAttribute('x-default')) ? $webpage.value : '';
            };

            $unblockSubmit.addEventListener('click', (e) => {

                let $target = e.target;
                e.preventDefault();
        
        
                if (formBlocked) {
                    $target.value = translations['block'];
                    $form.classList.remove('blocked');
                } else {
                    $target.value = translations['unblock'];
                    $form.classList.add('blocked');
                };
                formBlocked = !formBlocked;
            });

        });
    
    });


    let ajax = new __ajax('admin/auth/edit_profile.php', {
        method: 'POST'
    });

    let JSONprofile = null;

    ajax.setParameters({
        operation: 'get'
    });

    ajax.get().then((data) => {

        JSONprofile = JSON.parse(data);
        edit_profile.setForm();
        document.getElementById('userImg').setAttribute('src','components/helpers/image.php?operation=get&subject=myPhoto');

    });


    $form.addEventListener('keydown', (e) => {
        const $target = e.target;

        if ($target.tagName === 'INPUT') {
            if (formBlocked) {
                e.preventDefault();
                return;
            }
        }

    });


    $form.addEventListener('focusin', (e) => {
        let $target = e.target;
      
        if ($target.tagName === 'INPUT') {
            if (formBlocked) {
                e.preventDefault();
                return;
            } else {
                if ($target.value.match('nie podan')) {
                    $target.value = '';
                }
            }
        }
    });

    $form.addEventListener('focusout', (e) => {
        let $target = e.target;

        if ($target.tagName === 'INPUT') {
            if (formBlocked) {
                e.preventDefault();
                return;
            } else {
                if ($target.value === '') {
                    $target.value = $target.getAttribute('x-default');
                }
            }
        }
    });


    $form.addEventListener('click', (e) => {
        let $target = e.target;
        if ($target.tagName === 'SELECT' || $target.tagName === 'INPUT') {
            if (formBlocked) {
                e.preventDefault();
                return;
            }
        }
    });

    $mainSubmit.addEventListener('click', (e) => {

        e.preventDefault();
        if (formBlocked) {
            return;
        }

        edit_profile.getForm();
        ajax.setParameters(JSONprofile);
        ajax.addParameters({
            operation: 'set'
        });


        ajax.get().then((data) => {
            console.log(data);
        });
    });

    $arrowUp.addEventListener('click', ()=>{
        document.getElementById('header').scrollIntoView({behavior: 'smooth'});
    });

    $cross.addEventListener('click', ()=>{
        $modalWindowWarnings.classList.remove('visible');
    },false);

};