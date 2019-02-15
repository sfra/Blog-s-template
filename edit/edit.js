//let images = [];

let config = {
    contextMenu: false
};

let $form = document.createElement('form'), $contextMenu, translations = null;

$form.method = 'post';
$form.action = 'addPost.php';

let $inputTitle = document.createElement('input');
$inputTitle.name = 'title';
let $inputContent = document.createElement('input');
$inputContent.name = 'content';
let $inputCategory = document.createElement('input');
$inputCategory.name = 'category';
let $inputShorter = document.createElement('input');
$inputShorter.name = 'shorter';
let $tags = document.createElement('input');
let $inputMainImage = document.createElement('input');
$inputMainImage.name = 'mainImage';

$form.appendChild($inputTitle);
$form.appendChild($inputContent);
$form.appendChild($inputCategory);
$form.appendChild($inputShorter);
$form.appendChild($tags);
$form.appendChild($inputMainImage);




(new __ajax('../config/mexico.json')).get().then(data=>{
    (new __ajax(`../translations/${JSON.parse(data)['language']}.json`)).get().then(data=>{
        translations = JSON.parse(data);
            function createContextMenu() {
                $contextMenu = document.createElement('div');
                $contextMenu.setAttribute('id', 'contextMenu');
                $contextMenu.innerHTML = translations['copy-address'];
        
        }
        createContextMenu();

    });

});

window.onload = function () {

    const $uploadedFiles = document.getElementById('uploaded-files');

    tinyMCE.activeEditor.getContent({
        format: 'raw'
    });

    if (sessionStorage.getItem('content') !== null) {
        tinyMCE.activeEditor.setContent(sessionStorage.getItem('content'));

    }


    const $sendImage = document.getElementById('send-image');

    $sendImage.addEventListener('submit', function () {
        tinyMCE.activeEditor.getContent({
            format: 'raw'
        });
        sessionStorage.setItem('content', tinyMCE.activeEditor.getContent({
            format: 'raw'
        }));
  
    }, false);


    document.querySelector('#uploaded-files > img').addEventListener('click', () => {
        $uploadedFiles.classList.add('hidden');
    }, false);

    document.getElementById('save').addEventListener('click', function () {

        document.body.appendChild($form);
        $inputTitle.value = document.getElementById('title').value;

        rawContent = tinyMCE.activeEditor.getContent({
            format: 'raw'
        });

        let newName = null;
        let images = [];

        rawContent = rawContent.replace(/(<img src="([^"]*)"([^>]+)>)/ig, (match, m, gr0, gr1) => {


            newName = `${functions.genetareRandomId(70)}_${gr0}`;

            images.push({
                old: gr0,
                new: newName
            });
            return `<img class="sizedependent" alt="users-image" srcc="[@images/usersImages/${newName}@]"${gr1} />`;
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

            let ajaxAddPost = new __ajax('addPost.php', {
                value: 'POST'
            });

            ajaxAddPost.setParameters({
                title: $inputTitle.value,
                content: rawContent,
                category: document.getElementById('category').value,
                shorter: document.getElementById('shorter').value,
                mainImage: 'images/usersImages/' + mainImageNewValue

            });

            ajaxAddPost.get().then((data) => {
                console.log(data);
            });

            $inputContent.value = rawContent;
            $inputCategory.value = document.getElementById('category').value;
            $inputShorter.value = document.getElementById('shorter').value;
            $inputMainImage.value = mainImageNewValue;
        });



    }, false);





    document.getElementById('wrapper-0').addEventListener('click', function (e) {

        let $target = e.target;
        if (!config.contextMenu) return;
        if ($target.getAttribute('id') == null || $target.getAttribute('id') !== 'imgWrapper') {
            $contextMenu.parentElement.removeChild($contextMenu);

            config.contextMenu = false;
            createContextMenu();

        };
    }, false);

    $uploadedFiles.addEventListener('contextmenu', function (e) {
        let $target = e.target;

        if (config.contextMenu) {
            $contextMenu.parentElement.removeChild($contextMenu);
            config.contextMenu = false;
            createContextMenu();
        }

        if ($target.nodeName !== 'IMG') {
            $contextMenu = document.getElementById('contextMenu');

            if ($contextMenu !== null) {

                $contextMenu.parentElement.removeChild($contextMenu);
                config.contextMenu = false;
                createContextMenu();
            }

            createContextMenu();
            //e.preventDefault(); //usunąć komentarz    
            return;
        }

        if (!config.contextMenu) {

            let style = window.getComputedStyle($target);

            $contextMenu.style.position = 'fixed';
            $contextMenu.style.zIndex = '400';

            $contextMenu.style.top = (e.pageY - 40) + 'px';
            $target.parentElement.appendChild($contextMenu);
            config.contextMenu = true;
            setTimeout(function () {
                $contextMenu.classList.add('visible');

            }, 100);

            $contextMenu.addEventListener('click', function () {
                copyToClipboard($target.parentElement.querySelector('.title').innerText);

                $contextMenu.classList.add('clicked');
                let $parent = $contextMenu.parentElement;
                setTimeout(function () {
                    if (!config.contextMenu) return;
                    $parent.removeChild($contextMenu);
                    config.contextMenu = false;

                    createContextMenu();

                }, 100);

            }, false);

        }
        //e.preventDefault();
    }, false);

    document.getElementById('imgs-list').addEventListener('click', () => {


        let ajaxReaddir = new __ajax('../upload/upload.php?operation=edit&exec=readdir', {
            method: 'post'
        });


        ajaxReaddir.get().then((data) => {


            const images = JSON.parse(data);
            let parrentOfCurrent;
            let currentElement = null;
            let closeButton = null;
            let title = null;
            

            $uploadedFiles.innerHTML='<img class="close" height="20" width="auto" src="../images/cross_b.svg"/>';
            
            document.querySelector('.close').addEventListener('click',()=>{
                $uploadedFiles.classList.add('hidden');
            },false);


            for (let i = 0, max = images.length; i < max; i++) {
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

                closeButton.addEventListener('click', (e) => {






                    document.getElementById('uploaded-files').removeChild(e.target.parentElement);

                    let ajaxRemoveFile = new __ajax('removeFile.php', {
                        method: 'post'
                    });

                    ajaxRemoveFile.setParameters({
                        file: e.target.parentElement.children[1].src.replace(/.*\/([^\/]*)$/, (match, gr) => {
                            return gr;
                        })
                    });

                    ajaxRemoveFile.get().then((data) => {
                        console.log(data);
                    });


                }, false);

            };



        });
        $uploadedFiles.classList.remove('hidden');
    }, false);

   
};