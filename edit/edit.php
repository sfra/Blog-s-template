<?php
error_reporting(E_ALL);
    session_start();
    include_once 'permissions.php';
    $config = file_get_contents('../../config/mexico.json');
    $configJSON = json_decode($config, true);
    
    $translations = json_decode(file_get_contents("../translations/{$configJSON['language']}.json"),true);
    $min='';

    if ($configJSON['env']==='prod') {
        $min='.min';
    };

?>
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/png" href="../favicon.png" />



        <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro|Josefin+Sans" rel="stylesheet" />
        <link rel="stylesheet" href="../styles/edit.min.css" />
        <script type="application/javascript" src="../vendor/__ajax<?= $min?>.js"></script>
        <script type="application/javascript" src="../scripts/helpers/functions.js"></script>
        <script type="application/javascript" src="tinymce/js/tinymce/tinymce.min.js"></script>
        <script type="application/javascript" src="edit<?= $min?>.js"></script>

        <script>
            tinymce.init({
                selector: '#mytextarea',
                plugins: 'image imagetools code media link colorpicker paste table textcolor',
                language: '<?= $translations['language-code']?>',
                height: '300px',
                relative_urls: false,
                remove_script_host: true,
                document_base_url: "/mexico/template/edit/uploads/",
                convert_urls: true,
                skin: 'mexico'
            });
        </script>

    </head>

    <body>
        <div id='wrapper-0'>
            <p><?= $translations["posts-editor"]?></p>

            <?php
            include_once $configJSON['password_path'];
            $mysqli = new mysqli('localhost',$user,$password,$configJSON['db_name']);

            $sql = $mysqli->query("SELECT * FROM categories");
         
 
            

        echo <<<EOT
    <div class="row">
        <p class="title">{$translations["posts-data"]}</p>
    </div>
    <div class="post-data">
    <input class="slide-up" id="title" type="text" placeholder="{$translations["posts-title"]}" />
    <input class="slide-up" id="mainImage" type="text" placeholder="{$translations["posts-main-image"]}" />
    
           <select id="category">
EOT;

while(($row=$sql->fetch_assoc())!==null){

    echo "<option>{$row["name"]}</option>";

}

echo <<<EOT

        </select>
</div>
EOT;
    

    ?>


                <button id="save" class="button"><?= $translations["save"]?></button>
                <a href="../index.php" id="back"><button class="button"><?= $translations["back"]?></button></a>

               <div class="row">
                    <span>
                        <textarea  id="shorter" type="text" placeholder="<?= $translations["short-version"]?>"  class="slide-up" ></textarea>
                    </span>
                    <span>

                    <!-- <input type="text" class="slide-up" name="tags" placeholder="tags" /> -->

                <form id="send-image" action="../upload/upload.php?operation=edit" method="post" enctype="multipart/form-data">
                <?= $translations["choose-image"]?>
                    <input type="file" name="fileToUpload" id="fileFileToUpload" />
                    <input class="save" type="submit" value="<?= $translations["save-image"]?>" name="submit" />
                </form>
                    <div id="imgs-list"><?= $translations["images-lists"]?></div>
                    </span>
                </div>
                <form method="post" id="editor">
                    <textarea id="mytextarea"></textarea>
                </form>
 
        </div>

                <div class="hidden" id='uploaded-files'>
                <img class="close" height="20" width="auto" src="../images/cross_b.svg"/>
                </div>
    </body>

    </html>