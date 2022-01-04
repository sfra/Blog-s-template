<?php
    include_once '/home/szymon/pass/02.php';
    function getForum($post_id) {

    global $user;
    global $password;
    $out = array();
        $errors = array();
        $posts = array();
        $mysqli = new mysqli('localhost',$user,$password,'mexico');
        
        if($mysqli->connect_errno){
            array_push($errors,'Błąd sql');  
        };

        $mysqli->set_charset('utf8');
        //$sql = $mysqli->prepare('SELECT * from forum LEFT JOIN users ON users.id=users_id where posts_id=? ORDER BY date(`date`), hour(`date`), minute(`date`), second(`date`);');
        $sql = $mysqli->prepare('SELECT * FROM forum_has_childrens LEFT JOIN forum ON forum_has_childrens.forum_id = forum.id LEFT JOIN users ON users.id=users_id where posts_id=? ORDER BY date(`date`), hour(`date`), minute(`date`), second(`date`);');


    $sql->bind_param('i',$post_id);
    $sql->execute();
    $result = $sql->get_result();


    if($result->num_rows===0) {
    //    array_push($array, 'Nie ma takiej kategorii');

        return array('Brak komentarzy');
    } else {
        $nrOfComments = 0;
        while($row=$result->fetch_assoc()){
            if(!$row['prev_forum_id']) {
                array_push($out,$row);


            };
            
        $nrOfComments+=1;
        };

        array_unshift($out,$nrOfComments);
        
        
    };
        return $out;
    }


?>

