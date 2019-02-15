<?php


    function randomGenerator($l){
$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randstring = '';
    for ($i = 0; $i < 10; $i++) {
        $randstring .= $characters[rand(0, strlen($characters)-1)];
    };
    return $randstring;    
    };


    function hashPassword($user,$password,$salt) {
        return hash('sha256',"$user+$password".$salt);
    }




?>