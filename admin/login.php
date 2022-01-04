<?php
    include_once '/home/szymon/pass/02a.php';
    include_once 'auth/salting.php';
    $answers = array();

    $mysqli = new mysqli('localhost',$user,$password,'mexico');
    
    if($mysqli->error) {
        echo "MySQL error";
    }
   // print_r($_POST);

    $login = urldecode($_POST['login']);
    $password = urldecode($_POST['password']);


    $mysqli->set_charset('utf8');




    $sql = $mysqli->prepare('SELECT * FROM permissions LEFT JOIN permissions_users ON permissions.id=permissions_users.permissions_id LEFT JOIN users ON users.id=permissions_users.users_id');
    $sql->bind_param('s',$_POST['login']);
    $sql->execute();
    $result = $sql->get_result();



    if($result->num_rows===0) {
        array_push($answers,'nie takiego użytkownika');
        
    } else {


        while($row=$result->fetch_assoc()){
    
        if($row['login']===$login) {
                 $hash = hash('sha512',$password.$row['salt']);
            
                if($hash===$row['hash_password']) {
                    array_push($answers,'hasła pasują');
                    session_start();
                    echo 'ok';
                    $_SESSION['login']=$login;
                    $_SESSION['id_users']=$row['id'];

                    if(!isset($_SESSION['permissions'])) {
                        $_SESSION['permissions'] = array();
                        array_push($_SESSION['permissions'],$row['name']);
                    };
                    
                    
                    if($row['name']==='admin'){
                        $_SESSION['isAdmin']=true;  
                    } else {
                        $_SESSION['isAdmin']=false;
                    };
//                    header("Location:http://localhost/mexico3/template/index.php");
                    exit;
                } else {
                    array_push($answers,'hasła nie pasują');
                };
            } 
        };
        
        
    };

    
//    if(count($answers)>0){
//        $out='[';
//        for($i=0; $i<count($answers)-1;$i++){
//            $out.="$answers[$i],";
//        };
//        
//        $out.=$answers[count($answers)-1]."]";
//        header('Content-Type: application/javascript');
//        echo <<<EOT
//        wrongLogin({$out});
//EOT;
        
//        print_r($answers);
        
//    };


?>