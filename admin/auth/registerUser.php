<?php
    
    error_reporting(E_ALL);

  //  echo exec('echo $PATH');


//    echo "My public key is: ", $gpg->exportPublicKey('sz.frankyy@gmail.com'), "<br>";

    print_r($_POST);

    echo file_put_contents('/var/www/html/mexico3/template/admin/auth/message.txt',$_POST['userData']);
?>