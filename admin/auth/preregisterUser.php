<?php


set_include_path ('/home/szymon/usrRoot/usr/bin/pear/share/pear') ;

error_reporting(E_ERROR);
    $configJSON = json_decode(file_get_contents('../../../config/mexico.json'), true);

    $translations = json_decode(file_get_contents("../../translations/{$configJSON["language"]}.json"),true);


    require_once "Mail.php";

    require_once "functions.php";
    require_once "salting.php";






    include_once $configJSON['password_path'];




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
        // print_r('ddd');
        // print_r($_POST);


        while (($row=$result->fetch_assoc())!=null) {
            if ($row['login']===$login) {
                $exists = 1;
            }
        };

        echo $exists;
    };


    if ($_POST['run']==='preregisterUser') {
        $password = urldecode($_POST['password']);
        $email = $_POST['email'];


        $sql = $mysqli->prepare("SELECT * from users WHERE login=? OR email=?");
        $sql->bind_param('ss',$login,$email);
        $sql->execute();
        $result=$sql->get_result();

        while($result->fetch_assoc()) {
            echo "[LOGIN OR EMAIL EXISTS]";
            exit();
        }


        $salt = randomGenerator(10);

        $hash = hash('sha512', $password.$salt);

        try {
            $sql = $mysqli->prepare('INSERT INTO users VALUES(null,?,?,?,?,2,?,null)');
            $linkHash = '__'.randomGenerator(30).'___'.date('Y_m_d');

            $registerLink = $configJSON['page_root'].'index.php?page=registerUser&hash='.$linkHash;

            $sql->bind_param('sssss', $login, urldecode($email), $hash, $salt, $linkHash);
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

                $body = file_get_contents("mail.template.php");
                $body = preg_replace("{{content}}", $translations["mail-body"], $body);



                $body = preg_replace("{{login}}",$login,$body);
                $body = preg_replace("{{link}}", $registerLink,$body);
                admin\auth\functions\sendMail(urldecode($email),$translations["register-subject"],$body);

                echo "[OK]";

            };
        } catch (Exception $e) {
            echo "[Error]";
            print_r($e);
        }


    }
