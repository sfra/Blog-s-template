let contents = [];


state.isDeep = true;

state.color = {
    r: 104,
    g: 64,
    b: 5
}
state.currentComment = {};


let $modalWindow = document.getElementById('modalWindow');

let resizeTimer;

let content = null;

window.onload = function () {


    let $menu = document.getElementById('menu');
    let $contents = document.querySelectorAll('.content');

    let $arrowUp = document.getElementById('arrowUp');

    let fullblog = {
        less: function (j, $contents) {


            contents[j] = $contents[j].innerHTML;
            $contents[j].innerHTML = $contents[j].innerHTML.replace(/<img\/?[^>]+(>|$)/g, '[...]').slice(0, 150) + '...';


        },
        more: function (j) {
            debugger;
            $contents[j].innerHTML = contents[j];
            resizeImages(document.querySelectorAll('.sizedependent'));
        }
    };


    run();

    let $mainImages = document.querySelectorAll('.sizedependent');

    //    console.log($mainImages);

    resizeImages($mainImages);






    let $wrapper0 = document.getElementById('wrapper-0');

    if (window.innerWidth > 700) {
        menuObj.showMenu($menu);
        $menu.style.display = '';
    } else {
        $menu.style.display = 'none';
        menuObj.hideMenu();
        $wrapper0.classList.remove('blurred');
        setTimeout(function () {
            $menu.style.display = '';
        }, 1000);
    };



    //   let windowWidth = window.innerWidth;


    menu();




    for (let i = 0, max = $contents.length; i < max; i++) {

        fullblog.less(i, $contents);
    };


    window.addEventListener('resize', function () {



        if (window.innerWidth > 700) {
            menuObj.showMenu($menu);
        } else {

            menuObj.hideMenu();
            $wrapper0.classList.remove('blurred');
        };

        resizeImages();


    }, true);




    $wrapper0.addEventListener('click', function (e) {


        let $target = e.target;

        debugger
        if ($target.classList.contains('forum') || $target.classList.contains('plus')) {

            if ($target.classList.contains('hidden')) {
                $target.classList.remove('hidden');
                $target.querySelector('p').innerHTML = '-';
            } else {
                $target.classList.add('hidden'); //
                $target.querySelector.innerHTML = '*';
            };
        };

        if ($target.classList.contains('loadMore')) {
            $target.classList.remove('loadMore');
            $target.classList.add('loaded');
            getForum($target);

        };
        
//        if (functions.hasClass($target, 'forum') || functions.hasClass($target,'plus')) {
//
//            if ($target.classList.contains('hidden')) {
//                $target.classList.remove('hidden');
//                $target.querySelector('p').innerHTML = '-';
//            } else {
//                $target.classList.add('hidden'); //
//                $target.querySelector.innerHTML = '+';
//            };
//        };
//
//        if (functions.hasClass($target, 'loadMore')) {
//            $target.classList.remove('loadMore');
//            //            debugger;
//            loadChildren($target);
//
//        };

        /** TO DO **/
        


        function getForum($target) {
            let ajax = new __ajax('components/forum/getForum.php', {
                value: 'POST'
            });
             
            let dataId = $target.parentElement.previousSibling.getAttribute('data-id-previous-post');
            
            ajax.setParameters({
                forum_prev_id: $target.getAttribute('data-id')
            });


            ajax.get().then(function (data) {

                let dataJSON = JSON.parse(data);
                let $login = null;
                let $date = null;
                let $content = null;
                let $addComment = null;
                let $plus = null;
                let $commentLevel = document.createElement('div');

                $commentLevel.classList.add('comment');

                for (let i = 0, max = dataJSON.length; i < max; i++) {

                    $login = document.createElement('div');
                    $login.classList.add('login');
                    $login.innerHTML = dataJSON[i]['login'];
                    $date = document.createElement('div');
                    $date.classList.add('date');
                    $date.innerHTML = dataJSON[i]['date'];

                    $content = document.createElement('div');
                    $content.classList.add('content_');
                    $content.innerHTML = dataJSON[i]['content'];


                    $addComment = document.createElement('div');
                    $addComment.classList.add('addComment');
                    $addComment.innerHTML = 'skomentuj';

                    if (typeof canComment == 'undefined') {
                        $addComment.style.display = 'none';
                    }



                    $commentLevel.appendChild($login);
                    $commentLevel.appendChild($date);
                    $commentLevel.appendChild($content);
                    $commentLevel.appendChild($addComment);

                    state.color.r += 14;
                    state.color.g += 9;
                    state.color.b += 1;



                    $commentLevel.style.backgroundColor = `rgba(${state.color.r},${state.color.g},${state.color.b})`;


                    $target.appendChild($comment);
                    $plus = document.createElement('div');

                    if (dataJSON[i]['has_children'] === 1) {

                        $plus.classList.add('plus');
                        $plus.classList.add('loadMore');
                        $plus.innerHTML = '+';

                        $commentLevel.appendChild($plus);
                        $plus.addEventListener('click', () => {


                            if (this.getAttribute('isLoaded') == null) {
                                getForum(this);
                                this.setAttribute('isLoaded', true);

                                this.innerHTML = this.innerHTML.replace('+', '-');

                            } else {

                                if (this.innerText[0] === '-') {
                                    this.innerHTML = this.innerHTML.replace('-', '+');
                                    this.classList.add('hidden');
                                } else if (this.innerText[0] === '+') {
                                    this.innerHTML = this.innerHTML.replace('+', '-');
                                    this.classList.remove('hidden');

                                };

                            };


                        }, false);
                    };

                    $plus.setAttribute('data-id', dataJSON[i]['forum_id']);
                    $commentLevel.appendChild($plus);


                };
            });

        }






        if ($target.classList.contains('addComment')) {

            if ($target.parentElement.querySelector('.login') !== null) {

                $modalWindow.querySelector('.login').innerHTML = $target.parentElement.querySelector('.login').innerHTML;

                $modalWindow.querySelector('.date').innerHTML = $target.parentElement.querySelector('.date').innerHTML;

                $modalWindow.querySelector('.content').innerHTML = $target.parentElement.querySelector('.content_').innerHTML;

            } else {

                content = $target.parentElement.previousElementSibling.children[0].innerHTML;

                $modalWindow.querySelector('.login').innerHTML = 'Komentujesz';

                $modalWindow.querySelector('.date').innerHTML = '';

                $modalWindow.querySelector('.content').innerHTML = content;
            };



            $modalWindow.classList.add('visible');
            //              debugger;
            state.currentComment.post_id = $target.closest('.forum').previousSibling.getAttribute('data-id-posts');

            if ($target.nextElementSibling !== null && $target.nextElementSibling.hasAttribute('data-id')) {
                state.currentComment.prev_forum_id = $target.nextElementSibling.getAttribute('data-id');
            } else {
                state.currentComment.prev_forum_id = 'NULL';
            }


        }

        debugger;
        if ($target.classList.contains('more')) {
            let $sibling = $target.previousElementSibling;// ($target.previousElementSibling.previousElementSibling !== null) ? $target.previousElementSibling.previousElementSibling.previousElementSibling : $target.parentElement.previousElementSibling.previousElementSibling;

            if ($sibling.getAttribute('data-form') === 'shorter') {
                fullblog.more($sibling.getAttribute('x-data'));
                $sibling.setAttribute('data-form', 'longer');
                $target.innerHTML = "mniej";
            } else {




                fullblog.less($sibling.getAttribute('x-data'), $contents);



                $sibling.setAttribute('data-form', 'shorter');
                $target.innerHTML = "więcej";
            };


        };









    }, false);

    document.body.style.overflowX = "visible";


    window.addEventListener('scroll', function (e) {

        let doc = document.documentElement;

        let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

        //        debugge   r;
        if (top > 300) {
            $arrowUp.classList.add('visible');
        } else {
            $arrowUp.classList.remove('visible');
        };

    }, false);

    $arrowUp.addEventListener('click', function () {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, false);








    document.querySelector('aside').addEventListener('click', function (e) {
        let $target = e.target;

        if ($target.tagName !== 'LI') {
            return;
        };

        console.log($target.textContent);

        document.querySelector('#' + $target.getAttribute('x-data')).scrollIntoView({
            behavior: 'smooth'
        });


    }, false);
};




$modalWindow.addEventListener('keyup', function (e) {
    if (e.key === 'Escape') {
        this.classList.remove('visible');
    };
}, false);

document.getElementById('okCancel').children[0].addEventListener('click', function () {

    ajax = new __ajax('components/forum/addComment.php', {
        value: 'POST',

    });

    console.log(state.currentComment);

    ajax.setParameters({
        content: $modalWindow.querySelector('textarea').value,
        post_id: state.currentComment.post_id,
        prev_forum_id: state.currentComment.prev_forum_id

    });


    ajax.get().then(function (data) {
        console.log(data);
    });



}, false);

document.getElementById('okCancel').children[1].addEventListener('click', function () {
    $modalWindow.classList.remove('visible');

}, false);


function addPost(obj, callback) {
    console.log(obj);
    let logins = [];
    let dates = [];
    let contents_ = [];
    let comments = [];
    let pluses = [];
    for (let i = 0, max = obj.length; i < max; i++) {
        logins[i] = document.createElement('div');
        logins[i].classList.add('login');
        logins[i].innerHTML = obj[i].login;

        dates[i] = document.createElement('div');
        dates[i].classList.add('date');
        dates[i].innerHTML = obj[i].date;

        contents_[i] = document.createElement('div');
        contents_[i].classList.add('content');
        contents_[i].innerHTML = obj[i].content;

        comments[i] = document.createElement('div');
        comments[i].classList.add('comment');
        pluses[i] = document.createElement('div');
        pluses[i].setAttribute('data-id', obj[i]['id']);
        pluses[i].innerHTML = '+';


        comments[i].appendChild(logins[i]);
        comments[i].appendChild(dates[i]);
        comments[i].appendChild(contents_[i]);
        comments[i].appendChild(pluses[i]);
        comments[i].style.transform = 'translate(20px)';



    };

    console.log(comments);
    callback(comments);



}