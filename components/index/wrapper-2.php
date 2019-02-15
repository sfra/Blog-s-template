<?php
$configJSON = json_decode(file_get_contents("../../config/mexico.json"),true);

$translations = json_decode(file_get_contents("../../translations/{$configJSON["language"]}.json"),true);

?>

<div class="left">
    <cite class="cite">
        <?= $translations["wrapper-2"][0]?>
    </cite>    
</div>



