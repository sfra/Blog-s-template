<?php require_once 'securimage.php';


    $image = new Securimage();
    

    if ($image->check($_POST['captcha_code']) == true) {
      
        echo "[OK]";
        
    } else {
        
        echo "[WRONG]";
    }

?>
