<?php

    @  session_start();



    $configJSON=json_decode(file_get_contents('../../../config/mexico.json'), true);
    
    include_once $configJSON['password_path'];

    


    $mysqli = new mysqli('localhost', $user, $password, $configJSON['db_name']);
    $sql = $mysqli->prepare('SELECT photo FROM profile WHERE id_users=?');
    
    $id=null;
    

    if (isset($_GET['operation']) && isset($_GET['subject']) && $_GET['operation']==='get') {
        switch ($_GET['subject']) {
            case 'myPhoto':
                $id=$_SESSION['id'];
            break;
            case 'userPhoto':
            if (isset($_SESSION['isAdmin']) && $_SESSION['isAdmin']===1 && isset($_GET['id'])) {
                $id=$mysqli->real_escape_string($_GET['id']);
            }
        }


        $sql->bind_param('i', $id);
        $sql->execute();
    
        $result=$sql->get_result();

        $image = $result->fetch_assoc()['photo'];
      
        $ext = substr($image, 1, 3);
    }



    header("Content-type: image/$ext");
    echo $image;

    exit();
