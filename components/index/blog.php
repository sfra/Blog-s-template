<?php

  error_reporting(E_ALL);
  include_once '/home/szymon/pass/02.php';

  $page;


    

  $range_l;
  $range_u;

  if(isset($_GET['range_l'])) {
    $range_l  = $_GET['range_l'];
  } else {
    $range_l = 1;
  };

  if(isset($_GET['range_u'])) {
    $range_u  = $_GET['range_u'];
  } else {
    $range_u = 1;
  };




  $mysqli =  mysqli_connect('localhost',$user,$password,'mexico');

       if ($mysqli->connect_errno) {
            echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
       };



      $mysqli->query("SET CHARACTER SET utf8");
      $mysqli->query("SET collation_connection = utf8_general_ci");


      $result = $mysqli->query("SELECT * FROM posts");



?>

    <div>
        <section class="posts">
          <?php
            print_r($smtp);

            
              while(($row=$result->fetch_assoc())!=NULL){
                $contains_images = false;
                
                  $content = $row['content'];
                  
                  $content = preg_replace_callback('/<img[^>]*>/',function($matches){
                    global $contains_images;
                    $contains_images = true;
                    return '[...]';
                },$content);
                

            echo <<<"ITEM"

          <header>${date("F",$row["time"])} {$row['title']} </header>
            <article>

                <div>
                    {$content};
                </div>
            </article>
ITEM;
            };
            


                  ?>



        </section>
        </div>