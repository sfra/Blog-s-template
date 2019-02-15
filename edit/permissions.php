<?php 
    
    $config = file_get_contents('../../config/mexico.json');


    $configJSON = json_decode($config, true);


    include_once $configJSON['password_path'];    
    //include_once '/home/szymon/pass/02.php';
    $mysqli = new mysqli('localhost',$user,$password,$configJSON['db_name']);
    if($mysqli->error) {
        echo "MySQL error";
    }


    $mysqli->set_charset('utf8');
//
    $result = $mysqli->query('SELECT login, permissions.id FROM permissions_users LEFT JOIN users  ON users.id = permissions_users.users_id LEFT JOIN permissions ON permissions.id=permissions_users.permissions_id;');
//    $result->data_seek(0);
    

    $isAdmin = false;
    while($row=$result->fetch_assoc()){
        if($_SESSION['login']===$row['login'] && $row['id']==1) {
            $isAdmin = true;
        };    
    };



        $_SESSION['isAdmin'] = $isAdmin;



?>