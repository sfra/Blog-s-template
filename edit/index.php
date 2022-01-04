<?php
    
    session_start();
    include_once '/home/szymon/pass/02.php';

    $mysqli = new mysqli('localhost',$user, $password,'mexico');


    if(isset($_SESSION['login'])) {
        $sql = $mysqli->prepare('SELECT * FROM permissions_users LEFT JOIN users ON users.id = permissions_users.users_id LEFT JOIN permissions ON permissions.id = permissions_users.permissions_id WHERE user.login=?');

        $sql->bind_param('s',$_SESSION['login']);
        $sql->execute();
        $result = $sql->get_result();
        
        if($result->num_rows===0){
            exit;
        } else {
            while($row=$result->fetch_assoc()) {
              if($row['permissions_id']===1) {
                    include_once 'edit.php';
              } else {
                
              };  
            };
        };
        
        
    } else {
        exit;
    };
?>