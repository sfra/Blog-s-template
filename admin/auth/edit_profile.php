<?php
    $config = file_get_contents('../../../config/mexico.json');
    $JSONconfig = json_decode($config,true);
    session_start();

    include_once $JSONconfig['password_path'];
    $mysqli = new mysqli('localhost',$user, $password,$JSONconfig['db_name']);
    

    if($mysqli->connect_error) {
        echo $mysqli->connect_errno;
        exit;
    }

$mysqli->set_charset('utf8');



if($_POST['operation']==='get') {
     $sql = $mysqli->prepare('SELECT users.id, name, surname, sex, webpage, photo, email FROM users LEFT JOIN profile ON users.id=profile.id_users WHERE login=?');
     $sql->bind_param('s',$_SESSION['login']);
     $sql->execute();
     $result = $sql->get_result();
     $row = $result->fetch_assoc();

     $rowout=array();

    foreach($row as $key=>$value) {
        if($key!=='photo') {
            $rowout[$key]=$value;
        }
    }

     $_SESSION['id']=$row['id'];


     print_r(json_encode($rowout));
    
}


if($_POST['operation']==='set') {
    
    $update = '';
    $imagePresent = false;
    $email = false;
    foreach($_POST as $key=>$value) {
        if($key!=='operation' && $key!=='id' && $value!=='' && $value!=='null') {
            if($key==='email') {
                $email=$value;
                continue;
            }
            
           $update="$update $key=\"".$mysqli->real_escape_string($value)."\",";
    
        }
    }

    $update=rtrim($update,",");
    
    if($email!==false) {
        $mysqli->query("UPDATE users SET email=\"$email\" WHERE id=$_SESSION[id];");
    }


    $mysqli->query("UPDATE profile SET $update WHERE id_users=$_SESSION[id];");
    if($mysqli->errno===0) {
        echo "[OK]";
    } else {
        echo "[WRONG]";
    };
    
}
 

?>