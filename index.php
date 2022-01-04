<?php 
    session_start();
    $isSetLogin = false;
    if(isset($_SESSION['login'])) {
        $isSetLogin=true;
    } else {
        if (isset($_COOKIE[session_name()])) { 
        setcookie(session_name(), '', time()-42000, '/'); 
        }
        session_destroy();
    };

    if(isset($_GET['page'])) {
        $page = $_GET['page'];
    } else {
        $page = 'index';
    };

    
    if($page==='blog') {
        $page='index';
    };




?>

<!doctype html>
<html lang="pl">

<head>
    <?php include_once "components/head.php" ?>
    <?php 
        include_once "components/$page/head.php";
    ?>
    


</head>

<body>
    <!--[if IE]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->


    <div id="wrapper-0">
        <!-- Header -->
        <?php 
            include_once "components/$page/header.php"
        ?>

        <?php 

        include_once "components/$page/introduction.php";
            

        ?>  
        <?php

            include_once "components/$page/menu.php"; 

        ?>

        <?php
            if($page==='login'){
                include_once "components/$page/login-false.php";
            }
        ?>


    </div>
    <?php 
        
        if($page==='index') {
            include_once "components/$page/wrapper-1.php"; 
            include_once "components/$page/wrapper-2.php"; 
            include_once "components/$page/wrapper-3.php"; 
        };     
        
    ?>



<footer>
   webpage: 
    <a target="_blank" href="https://github.com/sfra">&copy; Szymon Frankowski 2018</a> 
            <?php 
        if($page!=='login') {
            include_once 'components/index/navigation.php';
            
        }
    ?>
</footer>



    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->

    <!-- <script>
      (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
      function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
      e=o.createElement(i);r=o.getElementsByTagName(i)[0];
      e.src='https://www.google-analytics.com/analytics.js';
      r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
      ga('create','UA-XXXXX-X');ga('send','pageview');
    </script> -->


    <!-- build:js scripts/vendor.js -->
    <!-- bower:js -->
<!--    <script src="vendor/scripts/jquery.js"></script>-->
    <!-- endbower -->
    <!-- endbuild -->
    <script src="scripts/components/<?=$page ?>.js"></script>
    <!-- build:js scripts/main.js -->
    <script src="scripts/main.js"></script>
    <!-- endbuild -->
</body>

</html>


<?php
    

    if($_GET['page']==='blog'){
        
    ?>
        <script>
            setTimeout(function(){
                
                window.moveViewportToWrapper(1);
                
            },500);
        </script>
        
        <?php
    };

?>


