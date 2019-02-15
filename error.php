<?php 
    $translations = json_decode(file_get_contents("translations/".json_decode(file_get_contents("config/mexico.json"),true)["language"].".json"),true);
    
     
?>

<!doctype html>
<html lang="pl">





<head>
   <meta charset="utf-8">
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>mexico - 404</title>

<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="icon" type="image/png" href="favicon.png" />

    <link rel="stylesheet" href="styles/main.min.css" />
    <link rel="stylesheet" href="styles/error.min.css" />

</head>

<body>
    <div id="wrapper-0">
        <header id="header" class="alt">
            <a id="main-title" href="index.php" class="logo"><strong><?= $translations["header"][0]?></strong> <span><?= $translations["header"][1]?></span>
            </a>

        </header>
        <img alt="logo" id="eagle" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBI
WXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH4gwTDBAVPgEKhwAAAOZJREFUaN7tmEkOwzAMAyP+/8/u
qQXaFIl2KwB5j8XxoiXHQVEUtVNSufhaa50CiqTGxNNPgAAEIEAwq3RkrhSA98KVEJ4Y8OxKBYQ3
hkSO9KooWYqYN8btCUQWNrUDxo1QAXSZj0JggvkIBKaY90JgknkPBKaZt0JgonkLBKaa10KUNHMd
k9jnCkWKSIfubgiilXCn+a8sNA1C+zaR1ZPsMP+3Eu+GsGZFZHeHneYvu9FuCG89QlWf3mFeNZFl
TFeaIub9TlWJfxfqGGi0MWAN0DHQWGJIx2OshOavRQIQgKIoigroBXeIzD3X2diiAAAAAElFTkSu
QmCC
" />
        <div id="main-image-wrapper">
            <img id="main-image" width="8192px" src="images/error.png" />

        </div>
        <div class="info-wrapper">
            <div id="info"><?= $translations["404"]?></div>
            <div id="fourzerofour">
                cuatrocientos cuatro
                <div id="fof">

        <div>(404)</div>
                   
<!--
                    <div>(</div>

                    <div>4</div>////

                    <div>0</div>

                    <div>4</div>

                    <div>)</div>

                    <div>!</div>
-->

                </div>

            </div>
        </div>
    </div>
</body>
<audio src="music/music.ogv" autoplay="true"></audio>

</html>