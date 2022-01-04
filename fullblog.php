<?php

error_reporting(E_ALL);
$errors = array();
include_once '/home/szymon/pass/02.php';
//include_once 'components/forum/forum.php';

session_start();
$isAdmin = false;
$titles = array();
$mysqli = new mysqli('localhost', $user, $password, 'mexico');
$countNr = 0;

if ($mysqli->connect_errno) {
    array_push($errors, 'Błąd sql');
};

$mysqli->set_charset('utf8');
$sql = $mysqli->prepare('SELECT * FROM posts_categories LEFT JOIN posts ON posts.id=posts_categories.id_posts LEFT JOIN categories ON categories.id=posts_categories.id_categories WHERE name=?');
$sql->bind_param('s', $_GET['name']);
$sql->execute();
$result = $sql->get_result();

if ($result->num_rows === 0) {
    array_push($errors, 'Nie ma takiej kategorii');
} else {
};

?>





<?php


if (isset($_GET['page'])) {
    $page = $_GET['page'];
} else {
    $page = 'index';
};

if (isset($_GET['page']) && $_GET['page'] === 'blog') {
    $page = 'index';
}

if (isset($_SESSION['permissions'])) {
    $length = count($_SESSION['permissions']);
    for ($i = 0; $i < $length; $i++) {
        if ($_SESSION['permissions'][$i] == 'admin' || $_SESSION['permissions'][$i] == 'user') {
            if ($_SESSION['permissions'][$i] == 'admin') {
                $isAdmin = true;
            }
            echo <<<EOT
                    <script>
                    let canComment = true;
                    </script>
EOT;
        };
    };
};

?>

<!doctype html>
<html lang="pl">

<head>
    <?php include_once "components/head.php" ?>
    <?php
    include_once "components/$page/head.php";
    ?>


    <script type="application/javascript" src="vendor/__ajax.js"></script>

    <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,400i|IBM+Plex+Sans+Condensed:400,400i|IBM+Plex+Sans:100,100i,400,400i,700,700i|IBM+Plex+Serif:400,400i" rel="stylesheet">

    <link rel="stylesheet" href="styles/fullblog.css" />

    <link rel="stylesheet" href="styles/fullblog_gt700.css" media="(min-width: 701px)" />
    <link rel="stylesheet" href="styles/fullblog_lt700.css" media="(max-width: 700px)" />
    <script>
        let posts = {};
    </script>


</head>

<body>
    <!--[if IE]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->



    <!-- Header -->
    <div id="wrapper">
        <?php
        include_once "components/$page/header.php"
        ?>

        <?php





        //        include_once "components/$page/introduction.php";


        ?>
        <?php

        include_once "components/$page/menu.php";

        ?>
        <h1>
            <?= $_GET['name'] ?>
        </h1>

        <div id="wrapper-0">



            <?php

            if (count($errors) === 0) {




                while ($row = $result->fetch_assoc()) {




                    array_push($titles, $row['title']);
                    echo <<<EOT
                    <div id="nr{$countNr}" class="image-wrapper">
EOT;
                    //     print_r($row['mainImage']);
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

                    echo "<div class=\"title\">" . $row['title'] . "</div>";
                    //echo $countNr;
                    echo <<<EOT
                    <div class="time">{$row['time']}</div>
                    <div x-data="{$countNr}" data-id-previous-post='NULL' class="content" data-id-posts="{$row['id_posts']}" data-form="shorter">{$row['content']}
                    </div>
                    <div class="more">więcej</div>
EOT;
                    $countNr = $countNr + 1;

                    echo '<div class="forum hidden">Komentarze <p class="plus">+</p>';
                    //                    echo $row['id_posts'];
                    //$forum = getForum($row['id_posts']);

                    // $nrOfComments =array_shift($forum);
                    echo <<<EOT
                    <div class="nrOfComments">Ilość: {$nrOfComments}</div>
EOT;


                    if (isset($_SESSION['id_users'])) {
                        echo "<div class='addComment' id=\"comment\" x-data='{$row['id_categories']}' >skomentuj</div>";
                    };


                    echo "<div class=\"comments\"></div>";


                    //$length = count($forum);
                    //                    print_r($forum);
                    //                    for($k=0; $k<$length; $k++){
                    //  //                          echo 'aaaaaa'.$k.'aaaaaa';
                    //                    echo "<div class=\"comment\">";
                    //                    echo "<div class=\"login\">".$forum[$k]['login']."</div>";
                    //                    echo "<div class=\"date\">".$forum[$k]['date']."</div>";
                    //
                    //
                    //                    echo "<div class=\"content_\">".$forum[$k]['content']."</div>";
                    //                    
                    //                    if(isset($_SESSION['id_users'])) {
                    //                    echo <<<EOT
                    //                    <div class='addComment'>skomentuj</div>
                    //                    <div data-id='{$forum[$k]['forum_id']}'></div>
                    //EOT;
                    //                    };
                    //                        
                    //                        
                    //                        
                    //                    if($forum[$k]['has_children']==1){
                    //                        echo '<div data-id='.$forum[$k]['forum_id'].' class="loadMore">+</div>';
                    //                    };
                    //                        
                    //                        
                    //                    echo "</div>";
                    //                        
                    //                    };



                    echo '</div>';
                };
            };



            ?>


        </div>


        <aside>
            <div>
                &lt;&lt;
                <div id="contents">spis treści</div>
                <div class="arrow-left"></div>
            </div>
            <ul>
                <?php

                $length = count($titles);
                for ($i = 0; $i < $length; $i++) {
                    //                            echo "<li x-data=\"nr$i\">".strtoupper($titles[$i])."</li>";
                    //                            if($isAdmin) {
                    //                                echo "<a>usuń post</a>";
                    //                            }
                    echo "<li x-data=\"nr$i\">" . $titles[$i] . "</li>";
                };
                ?>
            </ul>
        </aside>

        <div id="arrowUp">
            <!--   <img height="40" width="40" src="images/arrowNeg.svg"/></div>-->
            <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" viewBox="0 0 40 40" enable-background="new 0 0 129 129" id="svg2" inkscape:version="0.91 r13725" sodipodi:docname="arrowNeg.svg" width="40" height="40">
                <metadata id="metadata16">
                    <rdf:RDF>
                        <cc:Work rdf:about="">
                            <dc:format>image/svg+xml</dc:format>
                            <!--
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
-->
                            <dc:title></dc:title>
                            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                        </cc:Work>
                    </rdf:RDF>
                </metadata>
                <defs id="defs14" />
                <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" id="view1" showgrid="false" inkscape:zoom="16.968518" inkscape:cx="0.29575168" inkscape:cy="21.710834" inkscape:window-x="0" inkscape:window-y="31" inkscape:window-maximized="1" inkscape:current-layer="g4" inkscape:window-width="1366" inkscape:window-height="664" />
                <g id="g4" transform="matrix(0.34423408,0,0,0.34423408,4.1969019,-8.6031011)">
                    <g id="g6" transform="translate(-18.592,18.592008)" style="fill:#646464;fill-opacity:1">
                        <path d="m 64.5,122.6 c 32,0 58.1,-26 58.1,-58.1 0,-32.1 -26.1,-58.1 -58.1,-58.1 -32,0 -58.1,26.1 -58.1,58.1 0,32 26.1,58.1 58.1,58.1 z m 0,-108 C 92,14.6 114.4,37 114.4,64.5 114.4,92 92,114.4 64.5,114.4 37,114.4 14.6,92 14.6,64.5 14.6,37 37,14.6 64.5,14.6 Z" id="path8" inkscape:connector-curvature="0" style="fill:#646464;fill-opacity:1" />
                        <path d="m 32.512595,93.5 c 1.554017,0.8 3.496539,1.2 5.633312,1.2 1.942522,0 4.079296,-0.4 5.633314,-1.2 L 95.061795,67.1 c 1.554017,-0.8 2.331026,-1.8 2.331026,-2.9 0,-1.1 -0.777009,-2.1 -2.331026,-2.9 L 43.779221,34.9 c -3.108035,-1.6 -8.158591,-1.6 -11.266626,0 -3.108036,1.6 -3.108036,4.2 0,5.8 l 45.64926,23.5 -45.64926,23.5 c -3.108036,1.6 -3.108036,4.2 0,5.8 z" id="path10" inkscape:connector-curvature="0" style="fill:#646464;fill-opacity:1" />
                    </g>
                </g>
            </svg>

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
        <textarea name="comment"></textarea>
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


    <!-- build:js scripts/vendor.js -->
    <!-- bower:js -->
    <!--    <script src="vendor/scripts/jquery.js"></script>-->
    <!-- endbower -->
    <!-- endbuild -->
    <!--    <script src="scripts/components/<?= $page ?>.js"></script>-->
    <!-- build:js scripts/`js -->
    <script src="scripts/main.js"></script>
    <!-- endbuild -->
    <script type="application/javascript" src="scripts/menu.js"></script>
    <script type="application/javascript" src="scripts/components/fullblog.js"></script>
</body>

</html>