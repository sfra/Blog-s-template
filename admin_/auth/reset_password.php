<?php

include_once "salting.php";
$configJSON = json_decode(file_get_contents("../../../config/mexico.json"), true);

include_once $configJSON["password_path"];
$mysqli = new mysqli('localhost', $user, $password, $configJSON['db_name']);

$salt = randomGenerator(10);

$hash = hash('sha512', urldecode($_POST["password"]) . $salt);

$reset_password = $mysqli->real_escape_string($_POST['hash']);

$sql = $mysqli->prepare("UPDATE users SET hash_password=?, salt=? WHERE reset_password=?");

$sql->bind_param("sss", $hash, $salt, $reset_password);
$result = $sql->execute();

if ($mysqli->affected_rows > 0 && $mysqli->errno == 0) {

    $sql = $mysqli->prepare("UPDATE users SET reset_password=NULL WHERE reset_password=?");
    $sql->bind_param("s", $reset_password);
    $sql->execute();

    if ($mysqli->affected_rows > 0 && $mysqli->errno == 0) {

        echo "[OK]";
    }

}
