<?php
    
$config = file_get_contents('../../../config/mexico.json');


$configJSON = json_decode($config, true);


include_once $configJSON['password_path'];
    $out = '';
    $errors = array();
    $posts = array();
    $mysqli = new mysqli('localhost',$user,$password,$configJSON['db_name']);
        
        if($mysqli->connect_errno){
            array_push($errors,'Błąd sql');  
        };

        $mysqli->set_charset('utf8');
    
//        $sql = $mysqli->prepare('SELECT * FROM users LEFT JOIN forum on users.id = forum.users_id WHERE prev_forum_id=? ORDER BY date(`date`), hour(`date`), minute(`date`), second(`date`);');
        $sql = $mysqli->prepare('SELECT * FROM users LEFT JOIN forum  on users.id = forum.users_id RIGHT JOIN forum_has_childrens ON forum_id=forum.id WHERE prev_forum_id=? ORDER BY date(`date`), hour(`date`), minute(`date`), second(`date`);');

//    print_r($mysqli);
        $sql->bind_param('i',$_POST['forum_prev_id']);
        $sql->execute();
        $result = $sql->get_result();
        
//    print_r($result);
    if($result->num_rows===0) {
        array_push($errors, 'Nie ma takiej kategorii');

    } else {
        $out= '[';
        while($row=$result->fetch_assoc()){
//            array_push($out,$row);
//￼     
            $out.=json_encode($row);
            $out.=',';     
//
        };
//
        $out = substr($out,0,strlen($out)-1);
        $out.=']';
        print_r($out);    
//        
    };

$mysqli->kill($mysqli->thread_id);
$mysqli->close();


?>