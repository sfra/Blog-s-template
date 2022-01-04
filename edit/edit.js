//let images = [];

let config = {contextMenu: false};
let $form = document.createElement('form');
$form.method = 'post';
$form.action = 'addPost.php';
let $inputTitle = document.createElement('input');
$inputTitle.name = 'title';
let $inputContent = document.createElement('input');
$inputContent.name = 'content';
let $inputCategory = document.createElement('input');
$inputCategory.name = 'category'
let $inputShorter = document.createElement('input');
$inputShorter.name = 'shorter';

let $inputMainImage = document.createElement('input');
$inputMainImage.name = 'mainImage';

$form.appendChild($inputTitle);
$form.appendChild($inputContent);
$form.appendChild($inputCategory);
$form.appendChild($inputShorter);
$form.appendChild($inputMainImage);


let $contextMenu=null;
createContextMenu();
function createContextMenu(){
            $contextMenu = document.createElement('div');
            $contextMenu.setAttribute('id','contextMenu');
            $contextMenu.innerHTML = 'Kopiuj adres';

};

window.onload = function () {
    
    

    
    let $uploadedFiles = document.getElementById('uploadedFiles');
    
    let clearSession = ()=>{
        for(let prop in sessionStorage){
            delete(sessionStorage['prop']);
        };
    };

    if (window.location.href.indexOf('?') !== -1) {

        sessionStorage.setItem('images', sessionStorage.getItem('images') + '@' + window.location.href.split('?')[1].split('=')[1]);
        window.location.href = 'edit.php';
    };


    tinyMCE.activeEditor.getContent({
        format: 'raw'
    });

    if (sessionStorage.getItem('content') !== null) {
        tinyMCE.activeEditor.setContent(sessionStorage.getItem('content'));

    };


    let $sendImage = document.getElementById('sendImage');

    $sendImage.addEventListener('submit', function () {
        tinyMCE.activeEditor.getContent({
            format: 'raw'
        });
        sessionStorage.setItem('content', tinyMCE.activeEditor.getContent({
            format: 'raw'
        }));
        //        sessionStorage.setItem('images', images);


    }, false);

    if (sessionStorage.getItem('images') !== null) {
        let images = sessionStorage.getItem('images').split('@');
        let parrentOfCurrent;
        let currentElement = null;
        let closeButton = null;
        let title = null;

        for (let i = 1, max = images.length; i < max; i++) {
            parentOfCurrent = document.createElement('div');
            closeButton = document.createElement('img');
            closeButton.src = '../images/cross_b.svg';
            closeButton.classList.add('close');
            parentOfCurrent.appendChild(closeButton);

            currentElement = document.createElement('img');

            currentElement.src = 'uploads/' + images[i];
            parentOfCurrent.appendChild(currentElement);

            title = document.createElement('div');
            title.classList.add('title');
            title.innerHTML = images[i];
            parentOfCurrent.appendChild(title);

            $uploadedFiles.appendChild(parentOfCurrent);

            closeButton.addEventListener('click', function () {
                console.log(this);
                document.getElementById('uploadedFiles').removeChild(this.parentElement);


                (function (image) {
                    sessionStorage.setItem('images', sessionStorage.getItem('images').replace(image + '@', '').replace(image, ''));

                })(images[i]);


                if (sessionStorage.getItem('images')[sessionStorage.getItem('images').length - 1] === '@') {
                    sessionStorage.setItem('images',
                        sessionStorage.getItem('images').substring(0, sessionStorage.getItem('images').length - 1));
                };

                (function (image) {
                    window.location.href = 'removeFile.php?file=' + image;
                })(images[i]);


            }, false);

        };


    };



    document.getElementById('save').addEventListener('click', function () {

        document.body.appendChild($form);
        $inputTitle.value = document.getElementById('title').value;

        rawContent = tinyMCE.activeEditor.getContent({
            format: 'raw'
        });

        let newName = null;
        let images = [];

        rawContent = rawContent.replace(/(<img src="([^"]*)"([^>]+)>)/ig, (match, m, gr0, gr1)=>{
            debugger;
            console.log(arguments);
            
            //newName = `images/usersImages/${functions.genetareRandomId(70)}_${arguments[2]}`;
            newName = `${functions.genetareRandomId(70)}_${gr0}`;

            images.push({
                old: gr0,
                new: newName
            });
            return `<img class="sizedependent" srcc="[@images/usersImages/${newName}@]"${gr1} />`;
        });

        
        let $mainImage = document.getElementById('mainImage').value;

        let mainImageValue = $mainImage;
        let mainImageNewValue;

        mainImageNewValue = functions.genetareRandomId(70) + '_' + mainImageValue;



        let ajax = new __ajax('mvImages.php', {
            value: 'POST'
        });

        ajax.setParameters({
            images: JSON.stringify(images),
            mainImage: JSON.stringify({
                old: mainImageValue,
                new: mainImageNewValue
            })
        });


        ajax.get().then(function (data) {
            
            let ajax2=new __ajax('addPost.php',{
                value: 'POST'
            });
            
            ajax2.setParameters({
                title: $inputTitle.value, 
                content: rawContent,
                category: document.getElementById('category').value,
                shorter: document.getElementById('shorter').value, 
                mainImage: 'images/usersImages/'+mainImageNewValue
                                
            });
            
            ajax2.get().then((data)=>{
                console.log(data);
                
            });
            
            $inputContent.value = rawContent;

            $inputCategory.value = document.getElementById('category').value;
            $inputShorter.value = document.getElementById('shorter').value;
            $inputMainImage.value = mainImageNewValue;

//            $form.submit();



        });



    }, false);



    
    
    document.getElementById('wrapper-0').addEventListener('click',function(e){
  
        let $target = e.target;
        if(!config.contextMenu) return;
        if($target.getAttribute('id')==null || $target.getAttribute('id')!=='imgWrapper'){                       $contextMenu.parentElement.removeChild($contextMenu);

            config.contextMenu=false;
            createContextMenu();                                                                              
                                                                                                
        };   
    },false);
    
    document.getElementById('wrapper-0').addEventListener('contextmenu', function (e) {
        let $target = e.target;
        

        
        
        if(config.contextMenu) {
            $contextMenu.parentElement.removeChild($contextMenu);
  //          $contextMenu.remove();
            config.contextMenu=false;

            createContextMenu();
        }
        
        
        if($target.nodeName!=='IMG'){
            $contextMenu = document.getElementById('contextMenu');
            
            if($contextMenu!==null) {

                $contextMenu.parentElement.removeChild($contextMenu);
                config.contextMenu = false;
                createContextMenu();
            };
            createContextMenu();
            e.preventDefault(); //usunąć komentarz    
            return;
        };
        
        if(!config.contextMenu){

            let style = window.getComputedStyle($target);

            $contextMenu.style =`left: ${e.pageX-window.innerWidth/3}px; top: ${e.pageY-window.innerHeight/1.6}px;`;
            
            
            $target.parentElement.appendChild($contextMenu);
            config.contextMenu = true;
            setTimeout(function(){
                $contextMenu.classList.add('visible');
                
            },100);
            
            $contextMenu.addEventListener('click',function(){
                copyToClipboard($target.parentElement.querySelector('.title').innerText);
                 
                $contextMenu.classList.add('clicked');
                let $parent = $contextMenu.parentElement; 
                setTimeout(function(){
                        if(!config.contextMenu) return;
                        $parent.removeChild($contextMenu);
                        config.contextMenu = false;
            
                        createContextMenu();
                    
                },100);
                
            },false);
            
        };
        e.preventDefault();
    }, false);

//    document.querySelector('input.mce-textbox').addEventListener('blur',function(e){
//        console.dir(e);
//    },false);
};