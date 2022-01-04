<?php
    error_reporting(E_ALL);
    include_once '/home/szymon/pass/02a.php';

        $mysqli = mysqli_connect('localhost',$user,$password,'mexico');
        

        //$post_id = 3;
        $post_id = $_GET['post_id'];
        $callback = $_GET['callback'];
        if($mysqli->connect_error) {
            echo "Failed to connect";
        };

        $mysqli->query("SET NAMES utf8");
        $result = $mysqli->query("SELECT * FROM posts where id=$post_id");
        $out = "";
        
        while( ($row = $result->fetch_assoc())!==null) {
                $out = $row['content'];
        };
        

        $out = trim(preg_replace('/\s\s+/', ' ', $out));

        header("Content-type: text/javascript");
        echo "post='$out'; appendPost($post_id,$callback);";


?>