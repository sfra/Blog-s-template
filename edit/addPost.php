
<?php
    
$config = file_get_contents('../../config/mexico.json');


$configJSON = json_decode($config, true);


include_once $configJSON['password_path'];


    session_start();


    $mysqli = mysqli_connect('localhost',$user,$password,$configJSON['db_name']);


    if($mysqli->connect_errno) {
        echo "MySQL error";
    };

//    $content = preg_replace('/<img src="([^"]+)"/');

    $mysqli->set_charset('utf8');
    $sql = $mysqli->prepare('INSERT INTO `posts` (`id`, `title`, `content`, `shorter`, `mainImage`, `time`, `prev_id`, `id_users`) VALUES (NULL, ?,?, ?,?, CURRENT_TIMESTAMP, NULL, ?)');
    
    $sql->bind_param('ssssi',$_POST['title'],$_POST['content'],$_POST['shorter'],$_POST['mainImage'], $_SESSION['id_users']);
    $sql->execute();

    $idPosts = $mysqli->insert_id;
    $sql = $mysqli->prepare('SELECT * FROM categories WHERE name=?');
    $sql->bind_param('s',$_POST['category']);
    $sql->execute();
    $result = $sql->get_result();
//    print_r($result->num_rows);
    
    $categoryId = ($result->fetch_assoc())['id'];

    $sql = $mysqli->prepare('INSERT INTO posts_categories VALUES (null,?,?)');

    $sql->bind_param('ii',$idPosts,$categoryId);
    $sql->execute();
    

//    header('Location: edit.php');


?>