<?php

    if(isset($_FILES['image'])){
          echo "Wysyłanie";
          $errors= array();
          $file_name = $_FILES['image']['name'];
          $file_size =$_FILES['image']['size'];
          $file_tmp =$_FILES['image']['tmp_name'];
          $file_type=$_FILES['image']['type'];
          $file_ext=strtolower(end(explode('.',$_FILES['image']['name'])));
          
          $expensions= array("jpeg","jpg","png","gif");
          
          if(in_array($file_ext,$expensions)=== false){
             $errors[]="extension not allowed, please choose a JPEG or PNG file.";
          }
          
          if($file_size > 2097152){
             $errors[]='File size must be excately 2 MB';
          }
              if(empty($errors)==true){
            $dest = "../../resources/users/{$_GET['login']}/images/".$file_name;
            move_uploaded_file($file_tmp,$dest);
            echo "ln -s {$_SERVER['DOCUMENT_ROOT']}/resources/users/{$_GET['login']}/images/$file_name {$_SERVER['REMOTE_ADDR']}/resources/images/$file_name";      
            exec("ln -s {$_SERVER['DOCUMENT_ROOT']}/resources/users/{$_GET['login']}/images/$file_name {$_SERVER['DOCUMENT_ROOT']}/resources/images/$file_name");      
            echo "Success";
          } else{
             print_r($errors);
          }
    };

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
    </head>
    <body>
        <form action="" method="POST" enctype="multipart/form-data">
         <input type="file" name="image" />
         <input type="submit"/>
      </form>
    </body>
</html>
