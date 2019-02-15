<?php

    $configJSON = json_decode(file_get_contents('../config/mexico.json'), true);
    $translations = json_decode(file_get_contents("translations/".json_decode(file_get_contents("config/mexico.json"),true)["language"].".json"),true);
    

    



    
    include_once 'components/helpers/html.php';
    session_start();


    $min='';
    $main='';
    
    if ($configJSON['env']==='prod') {
        $min='.min';
        $main='.main';
    };
    

     $isSetLogin = isset($_SESSION['login']);

    if (!$isSetLogin) {
        if (isset($_COOKIE[session_name()])) {
            setcookie(session_name(), '', time()-42000, '/');
        }
        session_destroy();
    };

  if ($configJSON['env']!=='dev' && !isset($_GET['login'])) {
      include_once 'cashing/top-cache.php';
  }

   
    if (isset($_GET['page'])) {
        $page = $_GET['page'];
    } else {
        $page = 'index';
    };

    
    if ($page==='blog' || $page==='contacts') {
        $page='index';
    };

    if ($page==='edit_profile' && !$isSetLogin) {
        header('Location: index.php');
    }


    ?>

<!doctype html>
<html lang="pl">

<head>
<meta name="description" content="programmer's blog">
<meta http-equiv=”Content-Security-Policy” content=”script-src 'self'; img-src 'self'; style-src 'self'”>


    <?php include_once "components/head.php" ?>
    <?php
        include_once "components/$page/head.php";
        include_once "components/$page/headsa.php";
    ?>
</head>

<body>
    <!--[if IE]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->


    <div id="wrapper-0">
        <!-- Header -->
        <?php
        include_once "components/$page/header.php";
        include_once "components/$page/introduction.php";
        include_once "components/$page/content.php";
        include_once "components/$page/menu.php";
        


        ?>
    </div>
    <?php
        
        if ($page==='index') {
            echo <<<WR
        <div id="wrapper-1" ></div>
        <div id="wrapper-2" ></div>
        <div id="wrapper-3" ></div>          
WR;
        };
        
    ?>



<footer>
   webpage: 
    <a target="_blank" rel="noopener" href="https://github.com/sfra">&copy; Szymon Frankowski 2018</a> 
            <?php
        if ($page!=='login') {
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



    
    <script src="scripts/components/<?=$page ?><?= $min?>.js"></script>
</body>

</html>



        

  

<?php
 if ($configJSON['env'] !== 'dev' && !isset($_GET['login'])) {
     include_once "cashing/bottom-cache.php";
 }

?>
