let run = window.onload || (()=>{});
//

function menu(){
    
    let $menu = document.getElementById('menu');
    let $mainMenuButton = document.getElementById('main-menu-button');
    let $h1 = document.querySelector('h1');
    
    let $wrapper0 = document.getElementById('wrapper-0');
    
    
    $mainMenuButton.addEventListener('click', (e)=> {

        if (config.mainMenu.opened) {
            $mainMenuButton.classList.remove('active');


            $menu.classList.add('hidden');



            config.mainMenu.opened = false;

                        $wrapper0.classList.remove('blurred');
                        $h1.classList.remove('blurred');
        } else {
            $mainMenuButton.classList.add('active');
            $menu.classList.remove('hidden');

            $wrapper0.classList.add('blurred');

            $h1.classList.add('blurred');

            config.mainMenu.opened = true;

        };

        e.preventDefault();

    }, false);
}




    

