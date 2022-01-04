<?php
    include_once '/home/szymon/pass/02.php';
    session_start();


    $mysqli = mysqli_connect('localhost',$user,$password,'mexico');


    if($mysqli->connect_errno) {
        echo "MySQL error";
    };

    $mysqli->set_charset('utf8');
    $sql = $mysqli->prepare('INSERT INTO `forum` (`id`, `content`, `date`, `users_id`, `posts_id`, `prev_forum_id`) VALUES (NULL, ?, CURRENT_TIMESTAMP, ?, ?, ?)');
//    $prev_forum_id = isset($_POST['prev_forum_id'])?$_POST['prev_forum_id']:null;
    
//    echo '[[[[[[[[[[[[[]]]]]]]]]]]]]';    
//    echo $prev_forum_id;
//    echo '[[[[[[[[[[[[[]]]]]]]]]]]]]';    
    $sql->bind_param('siis',$_POST['content'],$_SESSION['id_users'],$_POST['post_id'],$_POST['prev_forum_id']);
//    $sql->execute();

//    $idPosts = $mysqli->insert_id;
//    $sql = $mysqli->prepare('SELECT * FROM categories WHERE name=?');
//    $sql->bind_param('s',$_POST['category']);
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