const $form = document.querySelector('form#inputs');

let translations = null;







window.onload = () => {
  'use strict';
  const $searchButton = $form.querySelector('button'),
    ajax = new __ajax(),
    $results = document.querySelector('.results');

  let inputs,
    sort,
    fields = [],
    data,
    $login,
    $name,
    $surname,
    $email,
    $sex,
    results,
    ajaxPromise;

  ajax.setMethod('POST');

  window.location.href.replace(/operation=(\w*)/, (match, gr) => {
    ajax.setUrl(`templates/${gr}.tpl`);
    ajaxPromise = ajax.get().then(data => {
      data.replace(
        /([A-Z,a-zęłćź]*):\s@\{\{([^\}]*)\}\}/g,
        (match, gr0, gr1) => {
          fields.push({
            type: 'text',
            name: gr1,
            label: gr0
          });
        }
      );
    });
  });

  ajaxPromise.then(() => {
    inputs = new Vue({
      el: '#inputs',
      data: {
        inputs: JSON.parse(JSON.stringify(fields))
      },
      methods: {
        filter: e => {
          let $target = e.target;
          if (typeof $target.value === 'undefined') {
            edit.filter(ajax);
            return;
          }
          if ($target.value.length > 5) {
            edit.filter(ajax);
          }
        }
      }
    });



    sort = new Vue({
      el: '#sort',
      data: {
        fields: JSON.parse(JSON.stringify(fields)),
        selectedFields: []
      },
      methods: {
        sort: function (event) {
           this.selectedFields.push(event.target.value);

        },
        sendSort: function () {



          let selected = this.selectedFields;
          let list = '';

          for (let i = 0, max = this.selectedFields.length; i < max; i++) {
            list += this.selectedFields[i];
            if (i < this.selectedFields.length - 1) {
              list += '@';
            }

          }

          edit.sort(ajax, list);


        },
        remove($event) {

          let list = this.selectedFields;

          for (let i = 0, max = list.length; i < max; i++) {
            if ($event.target.parentElement.children[0].innerText === list[i]) {
              this.selectedFields.splice(i, 1);
            }

          }

        }
      },

      computed: {
        selected: function () {
          let sel = [];
          if (this.selectedFields.length === 0) {
            return this.fields.map(ob => {
              return ob.name;
            });
          }

          for (let i = 0, max = this.fields.length; i < max; i++) {
            if (!this.selectedFields.includes(this.fields[i].name)) {
              sel.push(this.fields[i].name);
            }
          }
          console.log(sel);
          return sel;
        }
      }
    });




    (new __ajax('../config/mexico.json')).get().then(data=>{
      (new __ajax(`../translations/${JSON.parse(data)['language']}.json`)).get().then(data=>{
      
        translations = JSON.parse(data);
        results = new Vue({
          el: '#results',
          methods: {
    
            changeUserDetails: e => {
              let $target = e.target;
              if ($target.classList.contains('change-permissions')) {
                let permission_id = 0;





                permission_id = prompt(translations['change-permissions-prompt']);

    
                if (permission_id !== '1' && permission_id !== '2') {
                  alert(translations['only-1-2']);
                  return;
                }
    
                ajax.setUrl('runResource.php?get=changePermissions');
                ajax.setParameters({
                  user_id: $target.parentElement.getAttribute('x-data-id'),
                  permission_id
                });
    
                ajax.get().then(data => {
                  console.log(data);
                  if (data === '[OK]') {
                    window.location.href = window.location.href;
                  } else {
                    alert(translations['permissions-not-changed']);
                  }
                });
              }
    
              if ($target.classList.contains('remove-user')) {
                if (prompt(translations['remove-user'])) {
                  ajax.setUrl('runResource.php?get=removeUser');
                  ajax.setParameters({
                    user_id: $target.parentElement.getAttribute('x-data-id')
                  });
    
                  ajax.get().then(data => {
                    if (data === '[OK]') {
                      alert(translations['user-removed']);
                    } else {
                      alert(translations['user-not-removed']);
                    }
                  });
                }
              }
            }
    
    
    
          }
        });     
     
     
     
     
     
      })  ;
    
    
    });





  });




  sortElementsBy('login');

  function sortElementsBy(crit) {
    let list = $results.children[0].children;


    let listArray = [];
    for (let i = 0, max = list.length; i < max; i++) {
      listArray.push(list[i]);
    }

    list = listArray.sort((x, y) => {

      return getItemFieldValue(x, crit) > getItemFieldValue(y, crit);

    });

    $results.children[0].innerHTML = '';

    for (let i = 0, max = list.length; i < max; i++) {
      $results.children[0].appendChild(list[i]);
    }

  }

  function getItemFieldValue($item, field) {

    let $ul = $item.children[0];
    let value = null;

    for (let i = 0, max = $ul.children.length; i < max; i++) {
      value = $ul.children[i].innerText.replace(/([A-Za-ząćęłńóśźż]*):\s([A-Za-ząćęłńóśźż]*)/, (match, key, val) => {


        if (key === field) {
          i = max;
          return val;
        }
      });
    }
    return value;
  }


  document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      edit.filter(ajax);
    }
  });

  $login = document.querySelector('[name="login"]');
  $name = document.querySelector('[name="name"]');
  $surname = document.querySelector('[name="surname"]');
  $email = document.querySelector('[name="email"]');
  $sex = document.querySelector('[name="sex"]');
};