<?php include_once 'helpers/functions.php' ?>
<?php include_once '/home/szymon/pass/02a.php' ?>


<?php session_start(); ?>
<!doctype html>
<html lang="">

<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>mexico3</title>
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <!-- Place favicon.ico in the root directory -->
    <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro|Josefin+Sans" rel="stylesheet">
    <!-- build:css styles/vendor.css -->
    <!-- bower:css -->
    <!-- endbower -->

    <!-- endbuild -->

    <!-- build:css styles/main.css -->
    <link rel="stylesheet" href="styles/main.css" />
    <!-- endbuild -->

    <script type="text/javascript">
        let state = {};
        let user_id = <?php echo "{$_SESSION['id_users']}"; ?>;
    </script>
    <script type="text/javascript" src="scripts/helpers/functions.js"></script>
    
    <!--    <link rel="stylesheet" href="styles/main_gt1100.css" media="(min-width: 1100px)" />-->
    <script type="text/javascript" src="scripts/helpers/jsonp.js"></script>
</head>

<body>
    <!--[if IE]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->


    <div id="wrapper-0">
        <!-- Header -->
        <header id="header" class="alt">
            <a id="main-title" href="index.html" class="logo"><span>Witaj</span> <strong><?= $_SESSION['login']?></strong> 
            </a>

        </header>


        <section class="main">
            <article>
                <div id="button-add"><a href="edit/index.php">Dodaj wpis</a></div>
            </article>
            <article>
                Twoje obecne wpisy:
                    <ul id="posts-list">
                        <?php getPosts($_SESSION['id_users'],$user,$password);?>   
                    </ul>
            </article>
        </section>


        <!--<footer>webpage: 2017 <a target="_blank" href="https://github.com/sfra">Szymon Frankowski</a></footer>-->

    </div>









    <!-- build:js scripts/vendor.js -->
    <!-- bower:js -->
<!--    <script src="vendor/scripts/jquery.js"></script>-->
    <!-- endbower -->
    <!-- endbuild -->

    <!-- build:js scripts/main.js -->
        <script type="text/javascript" src="scripts/main.js"></script>
    <!-- endbuild -->
</body>

</html>