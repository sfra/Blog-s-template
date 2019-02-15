let config = {mainMenu:{opened: false}};

state.lastScrollPosition = 0;
state.wrapperNr = 0;
state.sheet = 1;

state.mouseIsUp = false;

setTimeout(() => {
    try {
        document.querySelector('[style*="z-index:9999999"]').style.display='none';
    } catch(e) {
    } 


}, 2000);


let data = null;


let _DOC = document;
_DOC._GEBI = _DOC.getElementById;
_DOC._QS = _DOC.querySelector;
_DOC._QSA = _DOC.querySelectorAll;
document.$_AEL = document.addEventListener;
//HTMLElement.prototype.$_CL = HTMLElement.prototype.classList;
HTMLElement.prototype.$_AEL = HTMLElement.prototype.addEventListener;
window.$_AEL=window.addEventListener;




