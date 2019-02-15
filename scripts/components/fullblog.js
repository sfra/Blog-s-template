/*properties attr, src, fn,gal,offset, left, mouseOut, stopPropagation, bubbles, pageX, pageY, X, Y, html, append, css, top, parent, border, trigger, animate, opacity, remove, height, width, data, gal_close, class, on , children, wrap, addClass, find, deepExt, apply, defaults */
/*global state, console, functions, __ajax*/

let contents = [],
    translations = null;

state.isDeep = true;
state.currentComment = {};
state.commentEnlarged = false;



window.onload = () => {

    const $modalWindow = document.getElementById('modalWindow'),
        $menu = document.getElementById('menu'),
        $contents = document.querySelectorAll('.content'),
        $arrowUp = document.getElementById('arrow-up'),
        $changeCategory = document.getElementById('change-category'),
        $mainImages = document.querySelectorAll('.sizedependent'),
        $wrapper0 = document.getElementById('wrapper-0');


    const fullblog = {
        less: (j, $contents) => {
            contents[j] = $contents[j].innerHTML;
            $contents[j].innerHTML = $contents[j].innerHTML.replace(/<img\/?[^>]+(>|$)/g, '[...]').slice(0, 150) + '...';
        },
        less2: ($content) => {
            $content.innerHTML = $content.innerHTML.replace(/<img\/?[^>]+(>|$)/g, '[...]').slice(0, 150) + '...';
        },
        more: (j, $content) => {
            $content.innerHTML = contents[j];
            functions.resizeImages(document.querySelectorAll('.sizedependent'));
        }
    };


    functions.run();
    functions.resizeImages($mainImages);


    if (window.innerWidth > 700) {
        functions.menuObj.showMenu($menu);
        $menu.style.display = '';
    } else {
        $menu.style.display = 'none';
        functions.menuObj.hideMenu($menu);
        $wrapper0.classList.remove('blurred');
        setTimeout(() => {
            $menu.style.display = '';
        }, 1000);
    };


    functions.menu();

    for (let i = 0, max = $contents.length; i < max; i++) {
        fullblog.less(i, $contents);
    };

    window.addEventListener('resize', () => {
        if (window.innerWidth > 700) {
            functions.menuObj.showMenu($menu);
        } else {
            functions.menuObj.hideMenu($menu);
            $wrapper0.classList.remove('blurred');
        };

        functions.resizeImages(document.querySelectorAll('.sizedependent'));


    }, true);

    (new __ajax('config/mexico.json')).get().then(data => {
        (new __ajax(`translations/${JSON.parse(data)['language']}.json`)).get().then(data => {
            translations = JSON.parse(data);
            $wrapper0.addEventListener('click', (e) => {

                let $target = e.target;

                if ($target.classList.contains('plus') && $target.classList.contains('firstone')) {
                    if ($target.innerHTML === '+') {
                        $target.innerHTML = '-';
                        $target.parentElement.classList.remove('hidden');
                    } else if ($target.innerHTML === '-') {

                        $target.parentElement.classList.add('hidden');
                        $target.innerHTML = '+';
                    }
                }

                if ($target.classList.contains('plus') && $target.classList.contains('load-more') && $target.innerText[0] === '-') {
                    $target.innerHTML = $target.innerHTML.replace('-', '+');
                    $target.setAttribute('loaded', 'true');
                    $target.style.height = '20px';
                    return;
                }

                if ($target.classList.contains('plus') && $target.classList.contains('load-more') && $target.innerText[0] === '+' && $target.getAttribute('loaded') !== null) {
                    $target.innerHTML = $target.innerHTML.replace('+', '-');
                    $target.setAttribute('loaded', 'true');
                    $target.style.height = '';
                    return;
                }

                if ($target.classList.contains('plus') && $target.classList.contains('load-more')) {
                    if ($target.getAttribute('status') === 'unloaded') {
                        getForum($target);
                        $target.setAttribute('status', 'unloaded');
                        $target.innerHTML = $target.innerHTML.replace('+', '-');
                    };
                    return;
                }

                let $sibling = null;

                if ($target.classList.contains('more')) {
                    $sibling = $target.previousElementSibling;
                    if ($sibling.getAttribute('data-form') === 'shorter') {
                        $sibling.setAttribute('data-form', 'longer');
                        fullblog.more($sibling.getAttribute('x-data'), $sibling);
                        $target.innerHTML = translations['less'];
                    } else {
                        $sibling.setAttribute('data-form', 'shorter');
                        fullblog.less2($sibling);
                        $target.innerHTML = translations['more'];
                    };
                };

                if ($target.classList.contains('addComment')) {

                    let content = null,
                        fullContent = null,
                        $content = $modalWindow.querySelector('.content');

                    state.currentComment.prev_forum_id = $target.parentElement.getAttribute('x-data-id-comment');

                    if (state.currentComment.prev_forum_id !== null) {
                        $modalWindow.querySelector('.login').innerHTML = $target.parentElement.querySelector('.login').innerHTML;
                        $modalWindow.querySelector('.date').innerHTML = $target.parentElement.querySelector('.date').innerHTML;
                        fullContent = $target.parentElement.querySelector('.content_').innerHTML;
                    } else {
                        $content.innerHTML = 'Komentujesz';
                        $modalWindow.querySelector('.date').innerHTML = '';
                        fullContent = $target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
                    }

                    let $enlarge = document.createElement('div'),
                        arrowHTML = '<img width="20px" style="transform: rotate(90deg);" src="images/arrow.svg" />',
                        arrowHTMLUp = '<img width="20px" style="transform: rotate(270deg);  top: -20px;" src="images/arrow.svg" />'

                    if (fullContent.length > 200) {
                        content = fullContent.substr(0, 200) + ' ...';
                        $enlarge.innerHTML = arrowHTML;

                        $enlarge.addEventListener('click', () => {

                            if (!state.commentEnlarged) {
                                $content.innerHTML = fullContent;
                                $modalWindow.querySelector('.content').appendChild($enlarge);
                                $content.parentElement.style.overflow = 'scroll';
                                $enlarge.innerHTML = arrowHTMLUp;
                            } else {
                                $content.innerHTML = content;
                                $content.appendChild($enlarge);
                                $content.parentElement.style.overflow = '';
                                $enlarge.innerHTML = arrowHTML;
                            }

                            state.commentEnlarged = !state.commentEnlarged;
                        }, false);

                    } else {
                        content = fullContent;
                    }


                    $content.innerHTML = content;
                    $content.appendChild($enlarge);


                    document.querySelector('#modalWindow > div.comment > div.content').addEventListener('copy', (e) => {
                        console.log(e.clipboardData)
                    }, false);

                    state.currentComment.post_id = $target.closest('.forum').previousElementSibling.previousElementSibling.getAttribute('data-id-posts');
                    $modalWindow.classList.add('visible');

                }

            }, false);
        });

    });


    window.addEventListener('scroll', (e) => {

        let doc = document.documentElement,
            top = ((window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)) || document.body.scrollTop;

        if (top > 300) {
            $arrowUp.classList.add('visible');
        } else {
            $arrowUp.classList.remove('visible');
        };

    }, false);

    $arrowUp.addEventListener('click', () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, false);


    document.querySelector('aside').addEventListener('click', (e) => {
        let $target = e.target;

        if ($target.tagName !== 'LI') {
            return;
        };
        
        document.querySelector('#' + $target.getAttribute('x-data')).scrollIntoView({
            behavior: 'smooth'
        });


    }, false);

    $changeCategory.addEventListener('mouseover', () => {
        $changeCategory.children[0].classList.remove('hidden');
    }, false);

    $changeCategory.addEventListener('mouseout', () => {
        $changeCategory.children[0].classList.add('hidden');
    }, false);



    document.getElementById('okCancel').addEventListener('click', function (e) {


        if (e.target.innerHTML === 'OK') {
            ajax = new __ajax('components/forum/addComment.php', {
                value: 'POST',
            });
            ajax.setParameters({
                content: $modalWindow.querySelector('textarea').value,
                post_id: state.currentComment.post_id,
                prev_forum_id: state.currentComment.prev_forum_id,
                post_id: state.currentComment.post_id

            });
            ajax.get().then(function (data) {
                $modalWindow.classList.remove('visible');
            });
        } else if (e.target.innerHTML === 'Cancel') {
            $modalWindow.classList.remove('visible');
        }

    }, false);

    $modalWindow.addEventListener('keyup', function (e) {
        if (e.key === 'Escape') {
            this.classList.remove('visible');
        }
    }, false);

    $modalWindow.querySelector('textarea').addEventListener('focus', (e) => {

        e.target.style.textAlign = 'left';
        e.target.style.lineHeight = 'auto';
        e.target.setAttribute('placeholder', '');
        e.target.style.lineHeight = 'normal';

    });

    $modalWindow.querySelector('textarea').addEventListener('unfocusfocus', (e) => {

        e.target.style.textAlign = 'left';
        e.target.setAttribute('placeholder', '');

    });

};



function getForum($target) {

    let ajax = new __ajax('components/forum/getForum.php', {
        value: 'POST'
    });

    ajax.setParameters({
        forum_prev_id: $target.parentElement.getAttribute('x-data-id-comment')
    });

    ajax.get().then(function (data) {


        let rows = JSON.parse(data),
            $comment = null,
            $login = null,
            $date = null,
            $content = null,
            $plus = null,
            $letComment = null;



        for (let i = 0, max = rows.length; i < max; i++) {
            $comment = document.createElement('div');
            $comment.setAttribute('x-data-id-comment', rows[i]['forum_id']);
            $comment.classList.add('clearfix');
            $comment.classList.add('comment');

            $login = document.createElement('div');
            $login.classList.add('login');
            $login.innerText = rows[i]['login'];

            $date = document.createElement('div');
            $date.classList.add('date');
            $date.innerText = rows[i]['date'];

            $content = document.createElement('div');
            $content.classList.add('content_');
            $content.innerText = rows[i]['content'];

            $comment.appendChild($login);
            $comment.appendChild($date);
            $comment.appendChild($content);

            if (typeof canComment !== 'undefined') {
                $letComment = document.createElement('div');
                $letComment.classList.add('addComment');
                $letComment.innerHTML = translations['fullblog'][4];
                $comment.appendChild($letComment);
            }



            if (rows[i]['has_children'] === 1) {
                $plus = document.createElement('div');
                $plus.classList.add('plus');
                $plus.classList.add('load-more');
                $plus.setAttribute('status', 'unloaded');
                $plus.setAttribute('data-id', rows[i]['forum_id']);
                $plus.innerText = '+';

                $comment.appendChild($plus);

            }

            $target.appendChild($comment);

        };


    });


}
