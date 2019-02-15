window.onload = ()=>{
    const $submit = document.querySelector('.submit'),
    $passw0 = document.querySelectorAll('input')[0],
    $passw1 = document.querySelectorAll('input')[1],
    $alert = document.querySelector('.alert'),
    $loader = document.querySelector('.loader');
    let ajax = new __ajax('admin/auth/reset_password.php');
    let passwordOk=false;
    let translations = null;

    (new __ajax('../config/mexico.json')).get().then((data)=>{
        
        (new __ajax(`translations/${JSON.parse(data)['language']}.json`)).get().then(data=>{
            translations=JSON.parse(data);
            
        })
        

    });








    
    let $metter = document.getElementById('metter');

    let boundValues = [20, 40, 60, 80, 100, 120];
  
    $passw0.addEventListener('keyup', () => {
  
      let stregth = 2 * passwordMetter($passw0.value, 'scoring');
  
    
       
      if(stregth>70) {
          passwordOk=true;
      }
  
      for (let i = 0, max = boundValues.length - 1; i < max; i++) {
  
        if (boundValues[i] <= stregth) {
          $metter.children[1].children[i].style.backgroundColor = '#00ff00';
        }
  
        if (boundValues[i] < stregth &&
          stregth <= boundValues[i + 1]
        ) {
  
          let backgound = `rgb(${255-((stregth-boundValues[i])/(boundValues[i+1]-boundValues[i]))*255},${((stregth-boundValues[i])/(boundValues[i+1]-boundValues[i]))*255},0)`;
  
          $metter.children[1].children[i].style.backgroundColor = backgound;
  
  
        }
  
        if (stregth < boundValues[i]) {
          $metter.children[1].children[i].style.backgroundColor = '#ff0000';
        }
      }
  
  
  
    }, false);
    $submit.addEventListener('click' , (e)=>{
       
        if(2 * passwordMetter($passw0.value, 'scoring')<70) {
            $alert.classList.remove('hidden');
            $alert.innerHTML = translations['password-too-weak'];
                return;
        }
        if($passw0.value!==$passw1.value) {
            $alert.classList.remove('hidden');
        } else {
            $alert.classList.add('hidden');
            ajax.setParameters({
                hash: window.location.href.split('hash=')[1],
                password: $passw0.value

            });
         
            ajax.setMethod('POST');
            $loader.classList.remove('hidden');
            ajax.get().then(( data =>{
                $alert.classList.remove('hidden');
                $loader.classList.add('hidden');
                if(data==='[OK]') {
                    
                    $alert.innerHTML='OK';
                    setTimeout(()=>{
                        window.location.href = 'index.php';
                    },1000);
                    
                }
            }));
        }

    },false);
}