state.lastScrollPosition = 0;
state.wrapperNr = 0;
state.sheet = 1;

state.mouseIsUp = false;

state.foldUnfold = {
    fullContents: [],
    briefContents: [],
    isFull: []
};
state.moveBlocked = false;

state.wrapperNr = 1;

let instances = 0;

let $menu = document.getElementById('menu');
let $eagle = document.getElementById('eagle');
let post;

let clickEvent = new Event('click');
window.runIndex = window.onload || (() => {});
let $sizedependent=document.querySelectorAll('.sizedependent');

window.onload = () => {
    //runIndex();

    state.initLoad = 1;


    let $blog = document.getElementById('blog-href');


    let $mainImage = document.querySelector('.img-wrapper').children[0];
    resizeImages([$mainImage]);
    
    $mainImage.removeAttribute('width');
    $mainImage.removeAttribute('height');
    
    $mainImage.style.width='';

    if (window.innerWidth > 700) {
        menuObj.showMenu($menu);
        $menu.style.display = '';
//        $sizedependent.forEach(($img)=>{
//            $img.width='auto'; 
//            $img.height='auto'; 
//            $img.style.width=''; 
//        });
        
    } else {
        $menu.style.display = 'none';
        menuObj.hideMenu($menu);
//        $img.width='700'; 
//        $img.height='auto'; 
//        $img.style.width='auto'; 
        
        
    };

    /* dom element definitions */

    let $header = document.getElementById('header');
    let $mainMenuButton = document.getElementById('main-menu-button');
    let $imgWrapper = document.querySelector('.img-wrapper');
    let $backgroundWrapper = document.getElementById('background-wrapper');
    let $footer = document.querySelector('footer');
    let $categories = document.getElementById('categories');

    let $arrowUp = document.querySelector('.arrowUp');
    let $arrow = document.getElementById('arrow-wrapper').children[0];
    let $arrowRight = document.querySelector('.arrowRight');
    let $imgShadow = document.getElementById('img-shadow');


    let $wrappers = [document.getElementById('wrapper-0'), document.getElementById('wrapper-1'), document.getElementById('wrapper-2'), document.getElementById('wrapper-3')];


    
    
    /* page constans */
    let lastX = window.pageXOffset;
    let lastY = window.pageYOffset;

    const delay = 1000;
    
    
    

    

    /* events move to viewports */
    $arrow.addEventListener('click', () => {
        moveViewportToWrapper(1);
    }, false);


    window.addEventListener('scroll', (e) => {

        if (state.moveBlocked) return; //stop if is already moving

        /* catch wrapper handling */
        (() => {
            /* block under 1 */
            if (window.pageXOffset <= 2 / 3 * window.innerWidth) {
                if (window.pageYOffset > 1.3 * window.innerHeight) {
                    window.scrollTo(lastX, window.innerHeight);
                    moveViewportToWrapper(1);

                    return;
                }
            }


            if (window.pageYOffset > lastY) {
                /* 0->1 */
                if (window.pageXOffset <= 2 / 3 * window.innerWidth) {


                    if (window.pageYOffset > 2 / 3 * window.innerHeight && state.wrapperNr === 0) {
                        // state.moveBlocked = true;
                        moveViewportToWrapper(1);

                        setTimeout(() => {

                            $wrappers[1].scrollIntoView({
                                behavior: 'smooth'
                            });
                        }, delay);

                    };


                };
                /* 3->2 */
                if (window.pageXOffset > 2 / 3 * window.innerWidth && state.wrapperNr === 3) {
                    if (window.pageYOffset > 2 / 3 * window.innerHeight) {
                        moveViewportToWrapper(2);
                        setTimeout(() => {
                            $wrappers[2].scrollIntoView({
                                behavior: 'smooth'
                            });

                        }, delay);

                    };
                };

            };

            if (window.pageYOffset < lastY) {
                /* 1->0 */
                if (window.pageXOffset <= 3 / 4 * window.innerWidth) {

                    if (2 / 3 * window.pageYOffset < window.innerHeight && state.wrapperNr === 1) {

                        moveViewportToWrapper(0);
                        setTimeout(() => {
                            $wrappers[0].scrollIntoView({
                                behavior: 'smooth'
                            });
                        }, delay);

                    };

                };

                /* 2->3 */
                if (window.pageXOffset >= 3 / 4 * window.innerWidth) {
                    if (3 * window.pageYOffset < 2 * window.innerHeight) {
                        moveViewportToWrapper(3);
                        setTimeout(() => {
                            $wrappers[3].scrollIntoView({
                                behavior: 'smooth'
                            });
                        }, delay);
                    };
                }

            };
            //
            if (window.pageXOffset > lastX) {
                /* 1->2 */
                if (window.pageXOffset > 2 / 3 * window.innerWidth) {
                    if (window.pageYOffset >= 2 * window.innerHeight / 3 && state.wrapperNr === 1) {


                        $arrowRight.dispatchEvent(clickEvent);
                        moveViewportToWrapper(2);

                        setTimeout(function () {

                            $wrappers[2].scrollIntoView({
                                behavior: 'smooth'
                            });
                        }, delay);
                    }
                };



            };


            if (window.pageXOffset < lastX) {
                    console.log('aaaaaaa'); 
                if (window.pageXOffset < 2/3*window.innerWidth) {
                    //if (window.pageYOffset < 2 / 3 * window.innerWidth) {
                    if (window.pageYOffset < 2 / 3 * window.innerWidth) {
                            moveViewportToWrapper(0);
                        setTimeout(()=>{
                            $wrappers[0].scrollIntoView({
                                behavior: 'smooth'
                            });
                        },delay);
                    }
                }

            };



        })();


        /*  paralax scrolling */
        
        
        (() => {
        console.log(document.querySelector('#background-wrapper > div > img').style.top);
            
            let stY = window.pageYOffset;
            $imgWrapper.children[0].style.top = -2 * window.pageYOffset + 'px';
            $imgShadow.style.top = -5 * window.pageYOffset + 'px';



        })();




        lastX = window.pageXOffset;
        lastY = window.pageYOffset;

    }, false);







    //    window.addEventListener('scroll', function (e) {
    //        
    //
    //    }, false);



    $arrowUp.addEventListener('click', () => {



        if (state.wrapperNr === 1) {
            moveViewportToWrapper(0);
            return;
        }

        if (state.wrapperNr === 2) {
            moveViewportToWrapper(3);
            return;
        }

        if (state.wrapperNr === 3) {
            moveViewportToWrapper(2);
            return;
        }





    }, false);


    $arrowRight.addEventListener('click', () => {



        if (state.wrapperNr === 1) {
            moveViewportToWrapper(2);
            return;
        };


        if (state.wrapperNr === 2) {
            moveViewportToWrapper(1); //, null, 2);
        };

        if (state.wrapperNr === 3) {
            moveViewportToWrapper(0);
        };

    }, false);


    document.addEventListener('mouseup', () => {
        state.mouseIsUp = false;
    }, true);

    window.addEventListener('resize', (e) => {

        if (state.initLoad === 1) return;

        if (window.innerWidth > 700) {
            menuObj.showMenu();
        } else {
            menuObj.hideMenu($menu);

            $wrappers[1].classList.remove('inactive');
            $sizedependent=document.querySelectorAll('.sizedependent');
            
//            $sizedependent.forEach(($img)=>{
//                debugger;
//                $img.width='auto';
//                $img.height='auto';
//                $img.style.width='';
//          });
            
            

        };


    }, false);

    /* Event for open menu */
    $mainMenuButton.addEventListener('click', (e) => {

        if (config.mainMenu.opened) {
            $mainMenuButton.classList.remove('active');

            if ($imgWrapper !== null) {
                $imgWrapper.classList.remove('inactive');
            };

            if ($backgroundWrapper !== null) {
                $backgroundWrapper.classList.remove('inactive');
            };


            $menu.classList.add('hidden');

            if ($wrappers[1]) {
                $wrappers[1].classList.remove('inactive');

            }


            config.mainMenu.opened = false;


        } else {
            $mainMenuButton.classList.add('active');
            $menu.classList.remove('hidden');

            if ($imgWrapper !== null) {
                $imgWrapper.classList.add('inactive');
            };

            if ($backgroundWrapper !== null) {
                $backgroundWrapper.classList.add('inactive');
            }



            if ($wrappers[1]) {
                $wrappers[1].classList.add('inactive');
            };



            config.mainMenu.opened = true;

        };

        e.preventDefault();

    }, false);


    setTimeout(() => {
            window.scrollTo(0, 0);
            setTimeout(function () {
                state.initLoad = 0
            }, 500);

        },
        0);

    
    window.document.addEventListener('click',function(e){

        console.log(e.target);
            
        if(e.target.parentElement.id!==undefined && e.target.parentElement.id==='menu'){
            return;
        };
        
        if(e.target.id==='main-menu-button') {
            return;
        };
        
        
//       menuObj.hideMenu($menu);
        
    },false);

    


    /* functions */



    window.moveViewportToWrapper = moveViewportToWrapper;

    /* change viewport */
    function moveViewportToWrapper(nr, beh, byScrolling) {

        if (state.moveBlocked) return;


        console.log(instances++);

        state.moveBlocked = true;
        let behavior = beh || 'smooth';
        $arrowRight.style.display = 'block';
        $arrowUp.removeAttribute('up');
        $mainMenuButton.style.right = '';


        if (nr !== 2 && document.querySelector('.pre-left') !== null && !byScrolling) {
            document.querySelector('.pre-left').classList.add('left');
            document.querySelector('.left').classList.remove('pre-left');
            document.querySelector('.pre-right').classList.add('right');
            document.querySelector('.right').classList.remove('pre-right');

        };







        $header.parentNode.removeChild($header);
        $wrappers[nr].insertBefore($header, $wrappers[nr].firstChild);



        switch (nr) {
            case 0:
                document.body.classList = [];
                document.body.classList.add('nr0');
                $categories.classList.remove('loaded');

                break;

            case 1:
                document.body.classList = [];
                document.body.classList.add('nr1');
                $header.style.transform = '';


                if ($arrowUp.getAttribute('down') !== null) {
                    $arrowUp.removeAttribute('down');
                };

                $categories.classList.add('loaded');
                $arrowUp.parentElement.style.display = 'block';

                break;

            case 2:
                document.body.classList = [];
                document.body.classList.add('down');
                document.body.classList.add('nr2');
                $menu.style.transform = '';
                $menu.style.top = '';

                try {
                    document.querySelector('.left').classList.add('pre-left');
                    document.querySelector('.left').classList.remove('left');

                    document.querySelector('.right').classList.add('pre-right');
                    document.querySelector('.right').classList.remove('right');

                } catch (e) {

                }

                break;

            case 3:
                document.body.classList = [];
                document.body.classList.add('nr3');

                $menu.style.top = '';
                $header.style.transform = '';

                $arrowUp.setAttribute('up', 'true');
        };





        document.querySelector('#wrapper-' + nr).scrollIntoView({
            behavior: behavior
        });
        state.wrapperNr = nr;

        setTimeout(function () {
            state.moveBlocked = false;

        }, 3000);

    };

    /* czy to potrzebne ?*/
    window.addEventListener('mousemove', function (e) {
        let $img = $imgWrapper.children[0];
        /* koniec czy to potrzebne ?*/


    }, false);




    document.getElementById('contacts').addEventListener('click', (e)=> {
        //debugger;
        e.preventDefault();
        moveViewportToWrapper(3);
    }, false);

    $blog.addEventListener('click', (e)=> {
        moveViewportToWrapper(1);
        e.preventDefault();
    }, false);
    //   s



};


function appendPost(id, callback) {

    let $button = document.querySelector(`div[x-data="${id}"]`);
    let $buttonGrand = $button.parentElement.parentElement;
    let $buttonCopy = $button.parentElement.removeChild($button);

    console.log($button);
    $buttonCopy.children[0].innerHTML = "-";

    $buttonGrand.innerHTML = post;
    $buttonGrand.appendChild($buttonCopy);




    //state.foldUnfold.fullContents[id] = $be

    //    let $button = document.querySelector(`div[x-data="${id}"]`);
    //    
    //    let $buttonParent = $button.parentElement;
    //    let $buttonGrantParrent = $buttonParent.parentElement;
    //    let $buttonCopy = $buttonParent.removeChild($button);
    //    $buttonParent.parentElement.innerHTML = post;
    //    $buttonGrantParrent.appendChild($buttonCopy);
    //    $buttonCopy.innerHTML = "[-]";
    //    state.foldUnfold.fullContents[id] = $buttonGrantParrent.innerHTML;
    //    document.querySelector(`div[x-data="${id}"]`).parentElement.appendChild($button);

    callback(document.querySelectorAll('.posts'));
}


function renameImages(place) {
    //let $imagesInPosts = $posts
    let $imagesInPosts = (function () {
        let out = [];
        let $images = null;

        for (let i = 0, max = place.length; i < max; i++) {

            $images = place[i].querySelectorAll('img');

            for (let j = 0, max0 = $images.length; j < max0; j++) {
                $images[j].setAttribute('src', 'resources/images/' + $images[j].getAttribute('src'));
            }
        }

    })();
}




function attach(data) {
    //    let re = new RegExp("<[^>]","g");a

    document.getElementById('add-content').innerHTML = data;
}