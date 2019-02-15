<?php

    error_reporting(E_ERROR);
  
    require_once "Mail.php";
  
    $config = file_get_contents('../../../config/mexico.json');


    $configJSON = json_decode($config, true);


    include_once $configJSON['password_path'];

    include_once 'salting.php';

    //print_r($_POST);
    $ok = true;
    $login = $_POST['login'];

    $mysqli = mysqli_connect('localhost', $user, $password, $configJSON['db_name']);


    if ($mysqli->connect_errno) {
        echo "MySQL error";
    };
    
    $mysqli->set_charset('utf8');
    

    if ($_POST['run']==='checkLoginExists') {
        $exists=0;
        $result = $mysqli->query("SELECT * FROM users where login=\"$login\"");
        
        
        
        while (($row=$result->fetch_assoc())!=null) {
            if ($row['login']===$login) {
                $exists = 1;
            }
        };
        
        echo $exists;
    };


    if ($_POST['run']==='preregisterUser') {
        $password = $_POST['password'];
        $email = $_POST['email'];

        $salt = randomGenerator(10);
        
        $hash = hash('sha512', $password.$salt);
     
        try {
            $sql = $mysqli->prepare('INSERT INTO users VALUES(null,?,?,?,?,?)');
            $linkHash = '__'.randomGenerator(30).'___'.date('Y_m_d');

            $registerLink = $configJSON['page_root'].'index.php?page=registerUser&hash='.$linkHash;
            $sql->bind_param('sssss', $login, $email, $hash, $salt, $linkHash);

            $sql -> execute();
                
            $ok = $mysqli->affected_rows==1 && $mysqli->errno==0;

            $result = $sql ->get_result();
            $user_id = $mysqli->insert_id;
            
            $sql = $mysqli->prepare('INSERT INTO permissions_users VALUES(null,2,?)');
            $sql->bind_param('s', $user_id);
            $sql -> execute();

            $ok = $ok && $mysqli->affected_rows==1 && $mysqli->errno==0;

            $result = $sql ->get_result();
                
            $sql=$mysqli->prepare('INSERT INTO profile (id,id_users) VALUES (NULL,?)');
            $sql->bind_param('i', $user_id);
            $sql->execute();
            $ok=$ok && $mysqli->affected_rows == 1 && $mysqli->errno == 0;
            
            
            if ($ok) {

                $to = "Recipent <".$email.">";
                $body = file_get_contents("mail.template.php");

                $body = preg_replace("{{login}}",$login,$body);
                $body = preg_replace("{{link}}", $registerLink,$body);

                
                $headers = array(
                      'From' => 'aktywnastronameksyku <sz.frankyy@gmail.com>',
                      'To' => $to,
                      'Subject' => 'link rejestracyjny do serwisu atywnastronameksyku.pl',
                      'MIME-Version' => 1,
                      'Content-type' => 'text/html;charset=utf8'
                );
              
                $smtp = Mail::factory('smtp',array (
                                'host' => 'ssl://smtp.googlemail.com',
                                'port' => '465',
                                'auth' => true,
                                'username' => 'sz.frankyy', //gmail user name
                                'password' => $gmail // gmail password
                            ));
              
                $mail = $smtp->send($to, $headers, $body);
                


                if (PEAR::isError($mail)) {
                     echo(" <p>" . $mail->getMessage() . " </p ");
                } else {
                  echo("[OK]");
                }



          



            };
        } catch (Exception $e) {
            echo "[Error]";
            print_r($e);
        }
        
       
    }
