let state = {
    uploadActive: false
};



window.onbeforeunload = function() {
        return "";
    };


window.onload =function(e){
    
        

};



document.getElementById('save').addEventListener('click',function(){
    sendPost();
},false);


let $uploadUnwrapp = document.getElementById('upload-unwrapp');
let $upload = document.getElementById('upload');

$uploadUnwrapp.addEventListener('click',function(){
    if(state.uploadActive) {
        $upload.setAttribute('height','0');
        state.uploadActive = false;
    } else {
        $upload.setAttribute('height','400');
        state.uploadActive = true;
    };
    

}, false);

tinymce.init({
    selector: 'textarea',
    height: 500,
    theme: 'modern',
    plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars code fullscreen',
    'insertdatetime media nonbreaking save table contextmenu directionality',
    'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help'
  ],
    toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    toolbar2: 'print preview media | forecolor backcolor emoticons | codesample help',
    image_advtab: true,
    templates: [
        {
            title: 'Test template 1',
            content: 'Test 1'
        },
        {
            title: 'Test template 2',
            content: 'Test 2'
        }
  ],
    content_css: [
    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    '//www.tinymce.com/css/codepen.min.css'
  ],
    
    document_base_url: '../../../../resources/users/root1/images/',

    relative_urls: true
});




function sendPost() {
    let $form = document.createElement('form');
    $form.action = 'index.php';
    $form.method = 'post';
    let $input0 = document.createElement('input');
    let $input1 = document.createElement('input');

    $input0.type = 'hidden';
    $input1.type = 'hidden';
    $input0.name = 'title';
    $input1.name = 'content';
    $input0.value = document.getElementById('title').value;
    $input1.value = tinymce.activeEditor.getContent();

    let reImg=/<img[^>]scr=["'](.*)["']>/g;
//    $input1.value.replace(re,)
    
    
    $form.appendChild($input0);
    $form.appendChild($input1);
    document.body.appendChild($form);
    
    let $button = document.createElement('input');
    $button.type='submit';
    $form.appendChild($button);
    
    let _click = new MouseEvent('click',{});
    $button.dispatchEvent(_click);
    
    
}