<?php
error_reporting(E_ALL);
    session_start();
    include_once 'permissions.php';
?>
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/png" href="../favicon.png" />



        <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro|Josefin+Sans" rel="stylesheet" />
        <link rel="stylesheet" href="../styles/edit.css" />
        <script type="application/javascript" src="../vendor/__ajax.js"></script>
        <script type="application/javascript" src="../scripts/helpers/functions.js"></script>
        <script type="application/javascript" src="tinymce/js/tinymce/tinymce.min.js"></script>
        <script type="application/javascript" src="edit.js"></script>

        <script>
            tinymce.init({
                selector: '#mytextarea',
                plugins: 'image imagetools code media link colorpicker paste table textcolor',
                language: 'pl',
                relative_urls: false,
                remove_script_host: true,
                document_base_url: "/mexico3/template/edit/uploads/",
                convert_urls: true,
                skin: 'mexico'
            });
        </script>

    </head>

    <body>
        <div id='wrapper-0'>
            <p>Edytor postów</p>,

            <?php
    
//        if($_SESSION['isAdmin']) {
//            echo '/<p style="color: red">Edytor postów</p>';
//        };
    

    echo <<<EOT
 <div class="row">
  <p>Dane postu</p>
</div>
<div class="row">
  <span>
    <input class="slide-up" id="title" type="text" placeholder="tytuł postu" /><label for="card">tytuł</label>
  </span>
  <span>
    <input class="slide-up" id="mainImage" type="text" placeholder="Obraz główny postu" /><label for="expires">Obraz główny</label>
  </span>
  <span>
       <select id="category">
        <option>zupy</option>
        <option>przystawki</option>      |
`       <option>drugie dania</option>
        <option>desery</option>
        <option>salsas y salsas</option>
        <option>kolacje</option>
        <option>przekąski</option>
        <option>święta</option>
        <option>inne</option>
        </select>
    </span>
</div>
EOT;
    

    ?>




                <button id="save">zapisz post</button>
                <a href="../index.php" id="back"><button>Wróć</button></a>

                <form method="post">
                    <textarea id="mytextarea">Hello, World!</textarea>
                </form>
                <div class="row">
                    <span>
    <input id="shorter" type="text" placeholder="Skrócona wersja"  class="slide-up" />
<label for="card">skrócona wersja</label>

  </span>
                    <span>
<!--                <input id="shorter" type="text" placeholder="Skrócona wersja" />-->



                <form id="sendImage" action="upload.php" method="post" enctype="multipart/form-data">
                    Wybierz obraz do zapisania:
                    <input type="file" name="fileToUpload" id="fileToUpload">
                    <input type="submit" value="Zapisz obraz" name="submit">
                </form>

                <div id='uploadedFiles'>

                </div>
                    </span>
                </div>
        </div>
    </body>

    </html>