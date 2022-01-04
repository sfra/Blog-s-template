    (function () {

        let $login = document.querySelector('input[type="text"]');
        let $password0 = document.querySelectorAll('input[type="password"]')[0];
        let $password1 = document.querySelectorAll('input[type="password"]')[1];
        let $email0 = document.querySelectorAll('input[type="email"]')[0];
        let $email1 = document.querySelectorAll('input[type="email"]')[1];


        let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let $response = document.getElementById('response');

        let $cross = document.getElementById('cross');
        let ajax = new __ajax('admin/auth/ajaxRequests.php', {
            method: 'post'
        });
        ajax.setParameters({
            run: 'checkLoginExists',
            login: $login.value,
            password: $password0.value
        });

        let $submit = document.querySelector('input[type="submit"]');
        let errorCodeToName = ['Ten użytkownik już istnieje', 'Hasło jest za słabe', 'Hasła nie pasują', 'Zła postać maila', 'Maile nie pasują'];

        $submit.addEventListener('click', function (e) {
            e.preventDefault();

            let valid = validateForm();
            let isValid = true;
            let response = '';


            for (let i = 0, max = valid.length; i < max; i++) {
                isValid = isValid && valid[i];
            };

            if (isValid) {


                console.log($password0.value);

                ajax.setParameters({
                    run: 'checkIfIsPreregistered',

                    login: encodeURIComponent($login.value),
                    password: encodeURIComponent($password0.value),
                    email: encodeURIComponent($email0.value)
                });

                ajax.get().then(function (data) {

                    let $warnings = document.getElementById('warnings').querySelector('ul');
                    $warnings.innerHTML = '';
                    if (data !== '0') {
                        //                        let li = document.createElement('li');
                        //                        li.innerHTML = 'Ten użytkownik chce się rejestrować';
                        //                        $warnings.appendChild(li);
                        //                        return;
                    };

                    $warnings.innerHTML = '';

                    //                    debugger;

                    ajax.setParameters({
                        run: 'registerUser',
                        login: encodeURIComponent($login.value),
                        password: encodeURIComponent($password0.value),
                        email: encodeURIComponent($email0.value)
                    });
                    ajax.get().then(function (data) {
                        //console.log('[][][]');
                        if (data == '[OK]') {
                            $response.classList.remove('hidden');
                            state.registered = true;
                            $response.innerHTML = 'Rejestracja przebiegła pomyślnie';
                        } else {
                            $response.innerHTML = 'Rejestracja nie powiodła się';
                            state.registered = true;
                        }

                        console.log(data);


                    });



                });


            } else {
                response = '<ul>';
                for (let i = 0, max = valid.length; i < max; i++) {

                    if (!valid[i]) {
                        response += `<li>${errorCodeToName[i]}</li>`;
                    };
                }
                response += '</ul>';

                document.getElementById('warnings').innerHTML = response;


            }

            e.preventDefault();
        }, false);




        $login.addEventListener('keyup', function (e) {
            let $loginWarning = $login.nextElementSibling.nextElementSibling;
            $login.style.color = "";
            if ($login.value.length > 3) {
                ajax.setParameters({
                    login: $login.value,
                    run: 'checkLoginExists'
                });

                ajax.get().then(function (data) {
                    // debugger;
                    if (data === "1") {
                        $login.style.color = "#ff0000";
                        $loginWarning.classList.remove('hidden');
                    } else {
                        $loginWarning.classList.add('hidden');
                    }

                }, function () {});
            }



            console.log(e);
        }, false);




        let $metter = document.getElementById('metter');

        let boundValues = [20, 40, 60, 80, 100, 120];

        $password0.addEventListener('keyup', function (e) {

            let stregth = 2 * passwordMetter($password0.value, 'scorring');

            let $tips = document.getElementById('tips');


            if (passwordMetter($password0.value, 'upperLetters') > .8) {
                $tips.children[0].children[1].style.display = 'none';
            } else {
                $tips.children[0].children[1].style.display = '';
            };

            if (passwordMetter($password0.value, 'containsNumbers') > 0) {
                $tips.children[0].children[0].style.display = 'none';
            } else {
                $tips.children[0].children[0].style.display = '';
            };

            if (passwordMetter($password0.value, 'containsSpecialCharacters') > 0) {
                $tips.children[0].children[2].style.display = 'none';
            } else {
                $tips.children[0].children[2].style.display = '';
            };


            for (let i = 0, max = boundValues.length - 1; i < max; i++) {
                debugger;


                if (boundValues[i] <= stregth) {
                    $metter.children[1].children[i].style.backgroundColor = '#00ff00';
                };

                if (boundValues[i] < stregth &&
                    stregth <= boundValues[i + 1]
                ) {

                    let backgound = `rgb(${255-((stregth-boundValues[i])/(boundValues[i+1]-boundValues[i]))*255},${((stregth-boundValues[i])/(boundValues[i+1]-boundValues[i]))*255},0)`;

                    $metter.children[1].children[i].style.backgroundColor = backgound;


                };

                if (stregth < boundValues[i]) {
                    $metter.children[1].children[i].style.backgroundColor = '#ff0000';
                };
            };



        }, false);


        $password1.addEventListener('keyup', function (e) {
            let $passWordWarning = $password0.nextElementSibling.nextElementSibling;
            if (testPassword()) {
                $password1.style.color = "";
                $passWordWarning.classList.add('hidden');

            } else {
                $password1.style.color = "#ff0000";
                $passWordWarning.classList.remove('hidden');

            }

        }, false);


        document.querySelector('form').addEventListener('keyup', function (e) {

            if (e.target === $email0 || e.target === $email1) {
                if (!testMail('diff')) {
                    $email0.nextElementSibling.classList.remove('hidden');
                } else {
                    $email0.nextElementSibling.classList.add('hidden');
                }

            }

        }, false);



        $email0.addEventListener('blur', function (e) {

            if (!testMail('valid')) {
                e.target.nextElementSibling.nextElementSibling.classList.remove('hidden');
            } else {
                e.target.nextElementSibling.nextElementSibling.classList.add('hidden');
            };

        }, false);


        
        $cross.addEventListener('click',function(){
            if(state.registered = true){
                
            } else {
                $cross.classList.add('hidden');
            };
            
        },false);
        
        
        function testUser() {
            return document.querySelector('#wrapper-0 > form > div:nth-child(4)').classList.contains('hidden');
        }


        function testMail(ar) {
            if (ar === 'diff') {
                return $email0.value === $email1.value;
            }

            if (ar === 'valid') {
                return reEmail.test($email0.value);
            }

        };

        function testPassword() {
            if ($password0.value) {
                return $password0.value === $password1.value;
            }
        }


        function validateForm() {
            debugger
            return [testUser(),
                passwordMetter($password0.value, 'scorring') > 10,
                testPassword(), testMail('diff'), testMail('valid')];
        };



    })();