let menuObj = {
    showMenu: ($menu) => {
        document.getElementById('menu').classList.remove('hidden');
        setTimeout(() => {
            $menu.style.display = '';

        }, 1000);
    },
    hideMenu: ($menu) => {
        document.getElementById('menu').classList.add('hidden');
        setTimeout(() => {
            $menu.style.display = '';
        }, 1000);
    }
};


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
    genetareRandomId: (nr) => {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < nr; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;

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


function resizeImages($images) {

    let width = null;

    let currentSrc = null;
    let lastIndex = null;
    let innerWidthLt700 = (window.innerWidth <= 700) ? true : false;


    if ($images === null) {
        $images = document.querySelectorAll('.sizedependent');
    }



    for (let i = 0, max = $images.length; i < max; i++) {

        currentSrc = $images[i].getAttribute('srcc');
        if (innerWidthLt700) {
            lastIndex = currentSrc.lastIndexOf('/');
            currentSrc = currentSrc.substring(0, lastIndex) + '/700/' +
                currentSrc.substring(lastIndex + 1, currentSrc.length);

        };
        
        $images[i].src = currentSrc.replace('[@', '').replace('@]', '');
        $images[i].width = '410';
        $images[i].style.width = '410px';
        $images[i].setAttribute('height', 'auto');
    };


};





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