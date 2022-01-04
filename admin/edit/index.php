<?php session_start();
    error_reporting(E_ALL);
    include_once '/home/szymon/pass/02.php';

    if(isset($_POST['title'])) {
        
        $mysqli = mysqli_connect('localhost',$user,$password,'mexico');
        
        if($mysqli->connect_error) {
            echo "MySQL ERROR";
        };

        
          $title = $_POST['title'];
          
          $content = $_POST['content'];
 
          $content = trim(preg_replace('/\s\s+/', ' ', $content));
          $content = str_replace("'","\'",$content);
          $id_users = $_SESSION['id_users'];
         // echo $content;
          $mysqli->set_charset('utf8');      
          $prep = $mysqli->prepare("INSERT INTO posts VALUES (NULL,?,?,NOW(),NULL, ?)");
          $prep->bind_param('ssi',$title,$content,$id_users);
          $prep->execute();
        

        
        
    
    };



?>

<!doctype html>
<html>
    <head>
        <link rel="stylesheet" href="style/main.css" />
        <!-- <script type="text/javascript" src="../../vendor/tinymce/js/tinymce/tinymce.min.js"></script> -->
        <script type="text/javascript" src="https://cdn.tiny.cloud/1/czbdz7f9e00bb0btuqubcg5343htm55d9mapykzezxrza2x6/tinymce/5/tinymce.min.js"></script>
        <script type="text/javascript" src="../scripts/helpers/jsonp.js"></script>
        <script type="text/javascript">
            let title ='';
            let post='';
            let id_users = "<?=$_SESSION['id_users']?>";
        </script>
    </head>
    <body>
<input id ="title" placeholder="title" type="text" name="title"/>        
<button id="save">Zapisz</button> 
<div>
    <iframe id="upload" src="http://localhost:8080/admin/edit/uploadImage.php?login=<?=$_SESSION['login']?>" width="400" height="0"></iframe>        
</div>
<div id="upload-unwrapp">Dodaj obrazy +</div>
<textarea>
    <div>Cześć</div>
</textarea>
        
        
    </body>
    
        <script type="text/javascript" src="edit.js"></script>
</html>