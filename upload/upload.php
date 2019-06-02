<?php
//print_r($_GET);
//$target_dir = "../uploads/".$_GET['operation'].'/';

$config = file_get_contents('../../config/mexico.json');
$configJSON = json_decode($config, true);

$operation = escapeshellcmd($_GET['operation']);





if ($operation==='getphoto') {
    session_start();

    include_once $configJSON['password_path'];
    
    $file = $_FILES["fileToUpload"]["tmp_name"];
    $httpReferer = preg_replace('/&problem=fileToLarge/', '', $_SERVER['HTTP_REFERER']);
    if ($_FILES["fileToUpload"]["size"] > 115000) {
        header("Location: ".$httpReferer."&problem=fileToLarge");
        exit();
    }

    $imgContent = addslashes(file_get_contents($file));
    $mysqli = new mysqli('localhost', $user, $password, $configJSON['db_name']);
    $sql = $mysqli->query("UPDATE profile SET photo='$imgContent' WHERE id_users=$_SESSION[id_users]");


   
    header("Location: ".$httpReferer);
    exit();
}




$target_dir = $configJSON['root'].$operation.'/uploads/';

if($operation==='edit' && isset($_GET['exec']) && $_GET['exec']==='readdir') {
    

  

    $dir = opendir($target_dir);
    $dirList = array();
    while(  ($file=readdir($dir))!==false ) {
        if($file==='.' || $file==='..') {
            continue;
        }
        array_push($dirList,$file);
    }

    $dirList=array_unique($dirList);
    sort($dirList);
    echo json_encode($dirList,true);
    exit();
}


$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
if (isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    
    if ($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    
    $target_file = $target_dir . date('Y_m_d_h_j_s') .basename($_FILES["fileToUpload"]["name"]);

    $uploadOk = 1;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 1500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif") {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        header('Location: '.$_SERVER['HTTP_REFERER'].'?file='.basename($_FILES["fileToUpload"]["name"]));
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
