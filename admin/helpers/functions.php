<?php 

    
    function getPosts($id_user,$user,$password) {
            
        //echo 'KKKKK';
        
            $mysqli = mysqli_connect('localhost',$user,$password,'mexico');
 
            if($mysqli->connect_error) {
                echo "Failed to connect to MySQL ($mysqli->connect_errno) $mysqli->connect_error";
            };
    

            $mysqli->query('SET CHARSET \'UTF8\'');
            $result = $mysqli->query("SELECT * from users inner join posts where id_users=users.id and users.id=$id_user;");
            
            

        

            while(($row=$result->fetch_assoc())!==null) {
                echo "<li class=\"\" x-data=\"{$row['id']}\"><strong>{$row['title']}, opub:{$row['time']}</strong><p>+</p><div></div></li>";
            };
    
    };

    
?>