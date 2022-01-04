<?php

error_reporting(E_ALL);
include_once '/home/szymon/pass/02a.php';



$page;




$range_l;
$range_u;

if (isset($_GET['range_l'])) {
  $range_l  = $_GET['range_l'];
} else {
  $range_l = 1;
};

if (isset($_GET['range_u'])) {
  $range_u  = $_GET['range_u'];
} else {
  $range_u = 1;
};




$mysqli =  mysqli_connect('localhost', $user, $password, 'mexico');

if ($mysqli->connect_errno) {
  echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
};



$mysqli->query("SET CHARACTER SET utf8");
$mysqli->query("SET collation_connection = utf8_general_ci");




$result = $mysqli->query("SELECT * FROM categories");



?>

<div>
  <section id="categories">
    <?php
    while ($row = $result->fetch_assoc()) {
      echo <<<ITEM
        <div> 
            <a href="fullblog.php?name={$row['name']}">
                <img src="images/categories/{$row['name']}.jpg" />
                <div class="title">{$row['name']}</div>
                <div class="title2">{$row['subname']}</div>
                <div class="shining"></div>
                <div class="shining2"></div>   
            </a>
        
            
        </div>
   
        
ITEM;
    };


    ?>

  </section>
</div>