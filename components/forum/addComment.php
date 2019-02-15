<?php
    
    $config = file_get_contents('../../../config/mexico.json');


    $configJSON = json_decode($config, true);


include_once $configJSON['password_path'];
    include_once $configJSON['password_path'];
    session_start();


    $mysqli = mysqli_connect('localhost',$user,$password,$configJSON['db_name']);


    if($mysqli->connect_errno) {
        echo "MySQL error";
    };


    print_r($_POST);

//   $prev_forum_id = isset($_POST['prev_forum_id'])?$_POST['prev_forum_id']:'NULL';

    $mysqli->set_charset('utf8');
    $statement = null;


    if($_POST['prev_forum_id']==='null') {
    $sql = $mysqli->prepare('INSERT INTO `forum` (`id`, `content`, `date`, `users_id`, `posts_id`, `prev_forum_id`) VALUES (NULL, ?, CURRENT_TIMESTAMP, ?, ?, NULL)');
        
    } else {
    $sql = $mysqli->prepare('INSERT INTO `forum` (`id`, `content`, `date`, `users_id`, `posts_id`, `prev_forum_id`) VALUES (NULL, ?, CURRENT_TIMESTAMP, ?, ?, ?)');    
        
    }

    
    if($_POST['prev_forum_id']==='null'){
    $sql->bind_param('sii',$_POST['content'],$_SESSION['id_users'],$_POST['post_id']);
        
    } else {
        
    $sql->bind_param('siis',$_POST['content'],$_SESSION['id_users'],$_POST['post_id'],$_POST['prev_forum_id']);
    };



    $sql->execute();
    $result = $sql->get_result();
    print_r($sql);
    
    
    $forumId = $mysqli->insert_id;
    $sql=$mysqli->prepare('INSERT INTO `forum_has_childrens` VALUES (NULL,0,?)');
    print_r($sql);
    echo '=================';
    print_r($mysqli);
    $sql->bind_param('i',$forumId);
    $sql->execute();
    $result = $sql->get_result();
    print_r($sql);
    echo '----------------';
    echo $_POST['prev_forum_id'];
    echo '----------------';    
    
    if($_POST['prev_forum_id']!=='NULL'){
       echo '[][][]';
        $sql=$mysqli->prepare('UPDATE `forum_has_childrens` SET `has_children`=1 WHERE `forum_id`=?');
    $sql->bind_param('i',$_POST['prev_forum_id']);
    $sql->execute();
    $result = $sql->get_result();
    print_r($sql);

    };

?>