<?php
    error_reporting(E_ALL);
    $errors = array();
    
    $config = file_get_contents('../config/mexico.json');
    $configJSON = json_decode($config, true);
    $translations = json_decode(file_get_contents("translations/{$configJSON["language"]}.json"),true);
 

    $min='';
    $main='';

    

    if ($configJSON['env']==='prod') {
        $min='.min';
        $main='.main';
    };


    include_once $configJSON['password_path'];
    include_once 'components/forum/forum.php';
    
    /* session */
    session_start();
    $isAdmin = false;
    $isSetLogin = isset($_SESSION['login']);
    
    if (!$isSetLogin && $configJSON['env'] === 'prod') {
        include_once 'cashing/top-cache.php';
    }
    
    $titles = array();
    $mysqli = new mysqli('localhost', $user, $password, $configJSON['db_name']);
    
    $countNr=0;
    
    if ($mysqli->connect_errno) {
        array_push($errors, 'Błąd sql');
    };

    $mysqli->set_charset('utf8');
    
    $sql = $mysqli->prepare('SELECT * FROM posts_categories LEFT JOIN posts ON posts.id=posts_categories.id_posts LEFT JOIN categories ON categories.id=posts_categories.id_categories WHERE name=?');
    $sql->bind_param('s', $_GET['name']);
    $sql->execute();
    $result = $sql->get_result();
    
    if ($result->num_rows===0) {
        array_push($errors, 'Nie ma takiej kategorii');
    };

    if (isset($_SESSION['permissions'])) {
        $length = count($_SESSION['permissions']);
        for ($i=0; $i<$length; $i++) {
            if ($_SESSION['permissions'][$i]=='admin' || $_SESSION['permissions'][$i]=='user') {
                if ($_SESSION['permissions'][$i]=='admin') {
                    $isAdmin=true;
                }
                echo "<script>let canComment = true;</script>";
            };
        };
    };
    
?>

<!doctype html>
<html lang="pl">

    <head>
        <?php
            include_once "components/head.php";
            include_once "components/fullblog/head.php";
        

        if ($configJSON['env']==='dev') {
            echo '<script type="application/javascript" src="vendor/__ajax.js"></script>';
        }
        ?>

        <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,400i|IBM+Plex+Sans+Condensed:400,400i|IBM+Plex+Sans:100,100i,400,400i,700,700i|IBM+Plex+Serif:400,400i" rel="stylesheet">

    </head>

    <body>
        <!--[if IE]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
        <div id="wrapper">
            <?php
                include_once "components/fullblog/header.php";
                include_once "components/fullblog/menu.php";
            ?>
            <h1>
                <?= $_GET['name']?>
            </h1>
            <div id="wrapper-0">

                <?php

                    if (count($errors)===0) {
                        while ($row=$result->fetch_assoc()) {
                            array_push($titles, $row['title']);
                            echo <<<EOT
                    <div id="nr{$countNr}" class="image-wrapper">
EOT;
                            if ($row['mainImage']) {
                                echo <<<EOT
                                <img class="mainImage sizedependent" srcc="[@{$row['mainImage']}@]" alt="{$row['title']}" />
EOT;
                            } else {
                                echo <<<EOT
                                <img src="images/21.jpg" alt="{$row['title']}" />
EOT;
                            };
                            echo "</div>";
                            echo "<div class=\"title\">".$row['title']."</div>";
                            echo <<<EOT
                            <div class="time">{$row['time']}</div>
                            <div x-data="{$countNr}" data-id-previous-post='NULL' class="content" data-id-posts="{$row['id_posts']}" data-form="shorter">{$row['content']}
                            </div>
                            <div class="more">{$translations["more"]}</div>
EOT;
                            $countNr=$countNr+1;
                            $forum = getForum($row['id_posts']);
                            $nrOfComments =array_shift($forum);
                            
                            echo "<div class=\"forum hidden\">{$translations["fullblog"][3]}
                            <div class=\"nrOfComments\">{$translations['comments-number']}: {$nrOfComments}</div>
                            <p status=\"unloaded\" class=\"plus firstone\">+</p>";
                            
                            if (isset($_SESSION['id_users'])) {
                                echo "<div class='addComment' id=\"comment\" x-data='{$row['id_categories']}' >{$translations["fullblog"][4]}</div>";
                            };
                            
                            echo "<div class=\"comments\"></div>";
                            
                            $length = count($forum);
                            
                            for ($k=0; $k<$length; $k++) {
                                echo "<div class=\"comment\" x-data-id-comment=\"{$forum[$k]['forum_id']}\">";
                                echo "<div class=\"login\">".$forum[$k]['login']."</div>";
                                echo "<div class=\"date\">".$forum[$k]['date']."</div>";
                                echo "<div class=\"content_\">".$forum[$k]['content']."</div>";
                                
                                if (isset($_SESSION['id_users'])) {
                                    echo "<div class=\"addComment\">{$translations['fullblog'][4]}</div>";
                                    echo "<div x-data-id-comment='{$forum[$k]['forum_id']}' class=\"clearfix\"></div>";
                                };
                            
                                if ($forum[$k]['has_children']==1) {
                                    echo '<div data-id='.$forum[$k]['forum_id'].' status="unloaded" class="plus load-more">+</div>';
                                };
                                echo "</div>";
                            };
                            echo '</div>';
                        };
                    } ;
        ?>

            </div>
            <?php
                $sql = $mysqli->prepare('SELECT name FROM categories WHERE name != ?');
                $sql->bind_param('s', $_GET['name']);
                $sql->execute();
                $result = $sql->get_result();
            
            ?>

                <aside>
                    <div>
                        &lt;&lt;
                        <div id="contents"><?= $translations["fullblog"][0]?></div>
                        <p class="aside-category"><?= $translations["fullblog"][1]?>
                            <?=$_GET['name']?>
                        </p>
                        <div id="change-category"><?= $translations["fullblog"][2]?>
                            <div class="tip clearfix hidden noselect">
                                <div class="clearfix">
                                    <?php
                            while ($row=$result->fetch_assoc()) {
                                
                                echo "<div><a href=\"?name={$row['name']}\">{$row['name']}</a></div>";
                            }
                            ?></div>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <?php

                        $length = count($titles);
                        for ($i=0; $i<$length;$i++) {
                            echo "<li x-data=\"nr$i\">".$titles[$i]."</li>";
                        };
                        ?>
                    </ul>
                </aside>

                <div id="arrow-up">
                    <img src="images/arrowNeg2.svg" alt="arrow" />

                </div>
            </div>
            <footer id="footer">
                webpage:
                <a target="_blank" href="https://github.com/sfra">Szymon Frankowski</a>
            </footer>
            <div id="modalWindow" class="">
            <div class="comment">
                <div class="login">marta</div>
                <div class="date">2018-07-26 14:52:35</div><br />
                <div class="content">Zrobiłam tą zajebiście dobrą zupę. Nienawidzę jej. O kuraw, ale mi odjebało. Zrobiłam tą zajebiście dobrą zupę. Nienawidzę jej. O kuraw, ale mi odjebało.Zrobiłam tą zajebiście dobrą zupę. Nienawidzę jej. O kuraw, ale mi odjebało.</div> <br />
            </div>
            <textarea name="comment" placeholder="tu wpisz komentarz"></textarea>
            <div id="okCancel">
                <div>OK</div>
                <div>Cancel</div>
            </div>
        </div>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->

        <!-- <script>
      (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
      function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
      e=o.createElement(i);r=o.getElementsByTagName(i)[0];
      e.src='https://ww           debugger;
w.google-analytics.com/analytics.js';
      r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
      ga('create','UA-XXXXX-X');ga('send','pageview');
    </script> -->

        <script type="application/javascript" src="scripts/components/fullblog<?= $min?>.js"></script>
    </body>

</html>

<?php
if (!$isSetLogin && $configJSON['env'] === 'prod') {
                            include_once 'cashing/bottom-cache.php';
                        }
