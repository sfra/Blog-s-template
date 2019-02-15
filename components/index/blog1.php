<?php

  error_reporting(E_ALL);
 
$config = file_get_contents('../../../config/mexico.json');



$configJSON = json_decode($config, true);

print_r($configJSON['password_path']);

include_once $configJSON['password_path'];
print_r($user);
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
	

  $mysqli =  mysqli_connect('localhost',$user,$password,$configJSON['db_name']);

       if ($mysqli->connect_errno) {
            echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
       };



      $mysqli->query("SET CHARACTER SET utf8");
      $mysqli->query("SET collation_connection = utf8_general_ci");

    


      $result = $mysqli->query("SELECT * FROM categories");



?>

    <div class="clearfix">
        <section id="categories" class="clearfix">
            <?php
    while($row=$result->fetch_assoc()){
        echo <<<ITEM
        <div class="clearfix"> 
            <div>
            <a href="fullblog.php?name={$row['name']}"  aria-label="{$row['name']}">
              <div class="category"></div>
                <div class="shining"></div>
                <div class="shining2"></div>
            </a>
        </div>
        <p class="title">{$row['name']}</p>
        <p class="title2">{$row['subname']}</p>
        </div>
   
        
ITEM;
    };

$mysqli->kill($mysqli->thread_id);
$mysqli->close();

        ?>

        </section>
    </div>
