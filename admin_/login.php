<?php
    
        $config = file_get_contents('../../config/mexico.json');


    $configJSON = json_decode($config, true);


    include_once $configJSON['password_path'];


    include_once 'auth/salting.php';
    $answers = array();

    $mysqli = new mysqli('localhost',$user,$password,$configJSON['db_name']);
    
    if($mysqli->error) {
        echo "MySQL error";
    }

    $login = $_POST['login'];    

    $password = urldecode($_POST['password']);
   

    $mysqli->set_charset('utf8');




    $sql = $mysqli->prepare('SELECT * FROM permissions LEFT JOIN permissions_users ON permissions.id=permissions_users.permissions_id LEFT JOIN users ON users.id=permissions_users.users_id WHERE login=?');
    $sql->bind_param('s',$_POST['login']);
    $sql->execute();
    $result = $sql->get_result();


    if($result->num_rows===0) {
        array_push($answers,'nie takiego użytkownika');
       
        
    } else {


        while($row=$result->fetch_assoc()){
           


                                  
                             
                 if($row['preregistered']!=='registered' && $row['preregistered']!=='removed'){
                    array_push($answers,'Ten użytkownik chce się zarejestrować');
                    echo 'Ten użytkownik chce się zarejestrować';
                    exit; 
                 };

                 if($row['preregistered']==='removed'){
                    array_push($answers,'Ten użytkownik jest usunięty');
                    echo 'Ten użytkownik jest usunięty';
                    exit; 
                 };

                 if($row['preregistered']==='blocked'){
                    array_push($answers,'Ten użytkownik jest zablokowany');
                    echo 'Ten użytkownik jest zablokowany';
                    exit; 
                 };
                 


             // echo "   =======".hash('sha512',$password.$row['salt'])."-----------";
                
                 if( hash('sha512',$password.$row['salt'])===$row['hash_password'] ) {
                    array_push($answers,'hasła pasują');
                    session_start();
                    echo '[OK]';
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

                    exit;
                } else {
                    array_push($answers,'hasła nie pasują');
                    print_r($answers);
                };

        };
        
        
    };

//    print_r($answers);
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