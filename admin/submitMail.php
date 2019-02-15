<?php

    error_reporting(E_ALL);
    


    $configJSON = json_decode(file_get_contents('../../config/mexico.json'), true);

    include_once "auth/functions.php";
    include_once "auth/salting.php";

    include_once $configJSON['password_path'];


    $mysqli = mysqli_connect('localhost', $user, $password, $configJSON['db_name']);
    $mail=$mysqli->real_escape_string($_POST['mail']);

    $mysqli->set_charset('utf8');

    $sql=$mysqli->prepare('SELECT * FROM users WHERE email=?');
    $sql->bind_param('s', $mail);
    $sql->execute();
    $result = $sql->get_result();

    
    if ($mysqli->affected_rows>=1 && $mysqli->errno==0) {
        
        $row = $result->fetch_assoc();
        $reset_hash = randomGenerator(30);
        $reset_password = hash('sha512',$reset_hash.$row['email'].date('Y_m_d'));
        $reset_link = $configJSON['page_root'].'/index.php?page=reset_password&hash='.$reset_password;


        $sql = @$mysqli->query("UPDATE users SET reset_password=\"$reset_password\" WHERE email=\"{$row['email']}\"");


        $body = preg_replace("{{link}}",$reset_link, file_get_contents("auth/mail.template.reset.password.php"));
        $body = preg_replace("{{login}}",$row['login'], $body);

       

        $out = admin\auth\functions\sendMail($row['email'], 'Link resetujący hasło do serwisu aktywnastronameksyku', $body);


        
        echo "[OK]";
    } else {
        echo "[WRONG]";
    };
