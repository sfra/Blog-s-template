<?php
include_once "autoload.php";
$config = file_get_contents('../../config/mexico.json');
$JSONconfig = json_decode($config, true);
include_once $JSONconfig['password_path'];

$mysqli = new mysqli('localhost', $user, $password, $JSONconfig['db_name']);



if ($_GET['get']==='users' || $_GET['get']==='moderate') {
    $where='';
    
    foreach ($_POST as $key=>$value) {
        if (isset($value) && $value!=='') {
            if ($key==='profileName') {
                $where.="profile.name LIKE \"$value%\" AND ";
            } else {
                $where.="$key LIKE \"$value%\" AND ";
            }
        }
    }
    $where= $where.' 1';
    $resource =new Resource($_GET['get'], $mysqli, $where, $JSONconfig['root'].'admin/templates/');



    if(isset($_GET["sort"])) {
       
     
       $resource->setOrderBy($_GET["sort"]);

    

    

    }
    print_r($resource->get());

    $where='';
    foreach ($_POST as $key=>$value) {
        if (isset($value) && $value!=='') {
            $where.="$key=\"$value\" AND ";
        }
    }
    $where= $where.' 1';
}


if ($_GET['get']==='changePermissions') {
    $user_id = $mysqli->real_escape_string($_POST['user_id']);
    $permission_id = $mysqli->real_escape_string($_POST['permission_id']);
    $sql = $mysqli->prepare('SELECT * FROM permissions_users WHERE users_id=?');
    $sql->bind_param('s', $user_id);
    $sql->execute();
    $results = $sql->get_result();
    $permissions_users_id=null;
 
    while (($row=$results->fetch_assoc())!==null) {
        $permissions_users_id=$row['id'];
    }

    $sql = $mysqli->prepare('UPDATE permissions_users SET permissions_id =? WHERE users_id=?');
    $sql->bind_param('ii', $permission_id, $user_id);


    $sql->execute();
    if ($mysqli->affected_rows!==0) {
        echo "[OK]";
    } else {
        echo "[WRONG]";
    }
}


if ($_GET['get']==='removeUser') {
    @  $sql = $mysqli->prepare("UPDATE `users` SET preregistered='removed' WHERE id=?");
    @  $user_id =$_POST['user_id'];
    @    $sql->bind_param('i', $mysqli->real_escape_string($user_id));
    @   $sql->execute();

    if ($mysqli->errno===0) {
        echo "[OK]";
    } else {
        echo "[WRONG]";
    }
}
