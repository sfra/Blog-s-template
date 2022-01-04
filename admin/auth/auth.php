<?php

  error_reporting(E_ALL);
  include_once '/home/szymon/pass/02a.php';
  include_once 'salting.php';
  $login_s = $_POST['login'];
  $password_s = $_POST['password'];


//    echo $_POST['login'];
//    echo $_POST['password'];


//  $login_s = $argv[1];
//  $password_s = $argv[2];

  $login_correct = false;
    
    
  //  echo hashPassword($login_s,$password_s,"63mamRtzAm")."\n";

    
//    echo $login_s."\n";
//    echo $password_s."\n";

    
    $mysqli = mysqli_connect('localhost',$user,$password,'mexico');
    
 
    if($mysqli->connect_error) {
        echo "Failed to connect to MySQL ($mysqli->connect_errno) $mysqli->connect_error";
    };
    
    
    $result = $mysqli->query('SELECT * FROM users;');


    while( ($row=$result->fetch_assoc())!==null ) {

        
        if($row['login']===$login_s) {
            
            if(hashPassword($login_s,$password_s,$row['salt'])===$row['hash_password']) { 
                 $login_correct = true;
                 $id_users = $row['id'];
            };
        };
    };
        



        if($login_correct) {
            echo 'login correct';
            session_start();
            var_dump($SESSION);
            header("Location: ../index.php");
            $_SESSION['login']=$login_s;
            $_SESSION['id_users']=$id_users;
            exit;
        } else {
            echo 'login incorrect';
            header("Location: ../../index.php?page=login&login=false");
        };


          
    




    



?>