<?php

    $config = file_get_contents('../config/mexico.json');
    $configJSON = json_decode($config, true);

    include_once $configJSON['password_path'];

    
    $mysqli = mysqli_connect('localhost', $user, $password, $configJSON['db_name']);
    $sql = $mysqli->prepare("SELECT * FROM users WHERE preregistered=?");
    $hash = $mysqli->real_escape_string($_GET['hash']);
    $sql->bind_param('s', $hash);
    $sql->execute();
    
     $result = $sql->get_result();
    if (($row=$result->fetch_assoc())!=null) {
        $mysqli->query("UPDATE users SET preregistered='registered' WHERE id={$row['id']}");
        echo "<div>{$translations["welcome"]} {$row['login']}. {$translations["register-ok"][1]}</div>";
    } else {
        echo "<div>{$translations["register-failed"]}</div>";//.$row['login'];
        echo <<<EOT
         <script>//window.location.replace('index.php');</script>
EOT;
    }
