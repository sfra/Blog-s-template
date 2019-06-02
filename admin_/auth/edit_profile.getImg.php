<?php

    @  session_start();

    $configJSON=json_decode(file_get_contents('../../../config/mexico.json'),true);
    
    include_once $configJSON['password_path'];
;   
    $mysqli = new mysqli('localhost',$user,$password, $configJSON['db_name']);
    $sql = $mysqli->prepare('SELECT photo FROM profile WHERE id_users=?');
    $sql->bind_param('i', $_SESSION['id']);
    $sql->execute();

    $result=$sql->get_result();
    
  //  print_r($mysqli); 
    $image = $result->fetch_assoc()['photo'];
  
    $ext = substr($image,1,3);
//    print_r('$_SESSION');

    header("Content-type: image/$ext");
    echo $image;

    exit();
       


?>