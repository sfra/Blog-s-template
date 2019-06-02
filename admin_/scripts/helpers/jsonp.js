/**
 *   @constructor
 *   @param {string} _src - address of appended code
 *   @param {params} _params - the parameters send to the remote script
 *   @param {number} -  the mumber of group to which the current belong
 *   @param {boolean} - is the only one in the group
 */

let jsonp = function (_src, _params, _group, _oneInGroup) {
    let src = _src;
    let group = _group || -1;

    let oneInGroup = _oneInGroup || true;
    let $script = document.createElement('script');

    src += '?';
    for (let key in _params) {
        if (_params.hasOwnProperty(key)) {
            src += key + '=' + _params[key] + '&';
        }
    }


    //console.log(src);   

    //src = src.substring(0, src.length - 1);


    $script.src = src;
    $script.type = 'text/javascript';
    $script.async = 'true';
    if (group > -1) {
        $script.setAttribute('group', group);
    };




    return {

        getSrc: function () {
            return src;
        },

        changeParam: function (name, value) {
            let re = new RegExp(`${name}=(.*)`, 'g');
            $script.src = $script.src.replace(re, `${name}=${value}`);
            console.log(src);
        },

        clear: function () {
            let elements = document.querySelectorAll('head script');
            console.log(elements);
            console.log(elements);
            for (let i = 0, max = elements.length; i < max; i++) {
                if (elements[i].getAttribute('group') !== null && elements[i].getAttribute('group') === group) {
                    elements[i].parentElement.removeChild(elements[i]);
                }
            };

        },

        exec: function () {
            if (group >= 0) {
                this.clear();
                //do           .appendChild($script));
//                return;
            };

            document.querySelector('head').appendChild($script);
        },

        destroy: function () {
            $script.parentElement.removeChild($script);
            destroy(this);
        },
        getSrc: function(){return src; }

    }
};


function destroy(el) {
    el = null;
}