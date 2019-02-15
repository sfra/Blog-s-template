<?php


    function modalWindow($content,$id, $class="modal-window") {
        global $configJSON;
        return <<<EOT
        <div id="{$id}" class="{$class}">
        <div id="cross"><img src="{$configJSON['page_root']}images/cross.svg" alt="cross" /></div>
            <p>{$content}</p>
        </div>
EOT;

    }

?>