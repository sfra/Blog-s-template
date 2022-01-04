<?php

    error_reporting(E_ALL);
    include_once '/home/szymon/pass/02.php';
    include_once 'salting.php';

    //print_r($_POST);
    $ok = true;
    $login = $_POST['login'];

    $mysqli = mysqli_connect('localhost',$user,$password,'mexico');

      //  echo randomGenerator(10);
    if($mysqli->connect_errno) {
        echo "MySQL error";
    };
    
    $mysqli->set_charset('utf8');
    

    if($_POST['run']==='checkLoginExists')  {
        $exists=0;
        $result = $mysqli->query("SELECT * FROM users where login=\"$login\"");
        
        
        
        while ( ($row=$result->fetch_assoc())!=NULL ) {
            
                if($row['login']===$login) {
                    $exists = 1;
                }
        
        };
        
        echo $exists;
    };


    if($_POST['run']==='registerUser') {
        $password = $_POST['password'];
        $email = $_POST['email'];
        
//        echo '<br />'.$password.'<br />';    
//        echo "registerUsenkr\n";
//        echo randomGenerator(10);
        $salt = randomGenerator(10);

        
       // echo '[[[[]]]]';
        //echo $salt;
        
        $hash = hash('sha512',$password.$salt);
        
        try {
                $sql = $mysqli->prepare('INSERT INTO users VALUES(null,?,?,?,?,2)');
                $sql->bind_param('ssss',$login,$email,$hash,$salt);

                $sql -> execute();
                $ok = ($mysqli->affected_rows==1) && $mysqli->errno==0;     
            
                $result = $sql ->get_result();
//                print_r($result);
                $user_id = $mysqli->insert_id;
            
                $sql = $mysqli->prepare('INSERT INTO permissions_users VALUES(null,2,?)');
                $sql->bind_param('s',$user_id);

                $sql -> execute();
            
                $ok = $ok && $mysqli->affected_rows==1 && $mysqli->errno==0;
                $result = $sql ->get_result();
                if($ok){
                    echo '[OK]';
                };

            
            
        } catch (Exception $e){
            
            print_r($e);
        }
        
//        mail($email,'Próba',"Witaj $login",'Content-Type: text/html; charset="UTF-8"');
    }
        


?>