<?php
$configJSON = json_decode(file_get_contents("../../../config/mexico.json"),true);

$translations = json_decode(file_get_contents("../../translations/{$configJSON["language"]}.json"),true);
?>
<div id="background-wrapper">
    <div class="img-wrapper">
        <img srcc="[@images/contact.jpg@]" alt="contact" class="sizedependent" />
    </div>
</div>
<section id="introduction2">
<?php print_r($translations["wrapper-3"][0]) ?>

</section>    

