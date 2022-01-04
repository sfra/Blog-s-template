let post;

let posts = {};


let jsp; // = new jsonp('database/getOnePost.php',{post_id: -1},1,true);
window.onload = function () {
    let $posts = document.querySelector('section.main > article > ul');


    $posts.addEventListener('click', function (e) {

        if (e.target.tagName === 'P') {
            //              let         debugger;
            if (!hasClass(e.target.parentElement, 'wrapped')) {


                jsp = new jsonp('database/getOnePost.php', {
                    post_id: e.target.parentElement.getAttribute('x-data')
                });
                //                jsp.changeParam('post_id', e.target.getAttribute('x-data'));
                console.log(jsp.getSrc());
                jsp.exec();
                e.target.parentElement.classList.add('wrapped');
                e.target.innerHTML='-'; 

            } else {

                e.target.parentElement.classList.remove('wrapped');
                setTimeout(function () {
                    e.target.parentElement.children[2].innerHTML = '';
                    e.target.innerHTML='+';
                }, 1000);

            };
            
        };

    }, false);
    
    
    

};



function appendPost(nr) {
    let $$li = document.querySelectorAll('ul#posts-list > li');
    //      ob.innerHTML = post;
    for (let i = 0, max = $$li.length; i < max; i++) {
        if (parseInt($$li[i].getAttribute('x-data')) === nr) {
            $$li[i].children[2].innerHTML = post;
        }
    }
}

