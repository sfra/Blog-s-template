let functions = {
    hasClass: (ob, className) => {
        let classes = ob.classList;
        for (let i = 0, max = classes.length; i < max; i++) {
            if (classes[i] === className) {
                return true;
            };
        };
        return false;
    },
    menuObj: {
        showMenu: function ($menu) {
            document.getElementById('menu').classList.remove('hidden');
            setTimeout(() => {
                $menu.style.display = '';

            }, 1000);
        },
        hideMenu: function ($menu) {
            document.getElementById('menu').classList.add('hidden');
            setTimeout(() => {
                $menu.style.display = '';
            }, 1000);
        }
    },
    resizeImages: ($images,size) => {

        let width = null;

        let currentSrc = null;
        let lastIndex = null;
        let innerWidthLt700 = (window.innerWidth <= 700) ? true : false;
        
        
        if(size ===null) { size = 700;};
        if ($images === null) {
            $images = document.querySelectorAll('.sizedependent');
        }



        for (let i = 0, max = $images.length; i < max; i++) {

            currentSrc = $images[i].getAttribute('srcc');

            if (innerWidthLt700) {
                lastIndex = currentSrc.lastIndexOf('/');
                currentSrc = currentSrc.substring(0, lastIndex) + '/500/' +
                    currentSrc.substring(lastIndex + 1, currentSrc.length);

            }

            $images[i].src = currentSrc.replace('[@', '').replace('@]', '');
            $images[i].setAttribute('height', 'auto');
        }


    },



    genetareRandomId: (nr) => {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < nr; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;

    },


    menu: () => {

        let $menu = document.getElementById('menu');
        let $mainMenuButton = document.getElementById('main-menu-button');
        let $h1 = document.querySelector('h1');

        let $wrapper0 = document.getElementById('wrapper-0');


        $mainMenuButton.addEventListener('click', (e) => {

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
    },
    enlarge: (ob) => {
        console.log(ob);
    },
    run: () => {
        window.onload || (() => {})
    },

    translate: ()=>{
        let prom = new Promise((res,rej)=>{
            fetch('data/dictionary.json').then((data)=>{
                return data.json();
            }).then((data)=>{
                res(data);
            });
        });

        return prom;
    },

    setServiceWorker: ()=>{
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('scripts/sw.js').then(function(r) {
              console.log('ServiceWorker zarejestrowany.')
            }).catch(function(e) {
              console.log('Ups! Błąd przy rejestracji ServiceWorkera! '+e)
            });
          }
    }


};


const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};




//var start = null;
//var element = document.getElementById("SomeElementYouWantToAnimate");
//
//function step(timestamp) {
//  if (!start) start = timestamp;
//  var progress = timestamp - start;
//  element.style.left = Math.min(progress/10, 200) + "px";
//  if (progress < 2000) {
//    window.requestAnimationFrame(step);
//  }
//}
//
//window.requestAnimationFrame(step);



//window.moveViewportToWrapper = function (nr,$header,$wrappers,$menu,state) {
//
//        document.querySelector('#wrapper-' + nr).scrollIntoView({
//            behavior: 'smooth'
//        });
//        
//        $header.parentNode.removeChild($header);
//        $wrappers[nr].insertBefore($header, $wrappers[nr].firstChild);
//
//         switch (nr) {
//            case 0:
//                $menu.style.top = '60px';
//                break;
//            case 1:
//                $menu.style.top = window.innerHeight + 60 + 'px';
//                break;
//        };
//
//        state.wrapperNr = nr;
//
//    };