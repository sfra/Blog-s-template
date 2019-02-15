<?php
session_start();

if (!$_SESSION['isAdmin']) {
    header('Location: ../index.php');
}

$config = file_get_contents('../../config/mexico.json');
$JSONconfig = json_decode($config, true);
$translations=json_decode(file_get_contents("../translations/${JSONconfig['language']}.json"),true);
include_once $JSONconfig['password_path'];
include_once 'autoload.php';

$mysqli = new mysqli('localhost', $user, $password, $JSONconfig['db_name']);

?>

<!doctype html>
<html>
<head>
    <meta charset="utf8" />
    <!-- <link rel="stylesheet" href="<?=$JSONconfig['page_root']?>styles/main.min.css" /> -->
    <link rel="stylesheet" href="styles/edit.min.css" />
    <script type="text/javascript" src="../vendor/vue.js"></script>
    <script type="text/javascript" src="../vendor/__ajax.js"></script>
    <script type="text/javascript" src="scripts/edit.functions.js"></script>
    <script>const operation= `<?=$mysqli->real_escape_string($_GET['operation']);?>`</script>
</head>
<body>
<header id="header" class="alt">
    <a id="main-title" href="<?=$JSONconfig['page_root']?>index.php" class="logo"><strong><?= $translations["edit-users"][0]?></strong> <span><?= $translations["edit-users"][1]?></span>
            </a>

    <nav class="back" style="z-index:700;">
        <div >
            <a href="<?=$JSONconfig['page_root']?>index.php?page=admin_panel"><?= $translations["back"]?></a>
        </div>
    </nav>
        <img alt="logo" id="eagle" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBI
WXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH4gwTDBAVPgEKhwAAAOZJREFUaN7tmEkOwzAMAyP+/8/u
qQXaFIl2KwB5j8XxoiXHQVEUtVNSufhaa50CiqTGxNNPgAAEIEAwq3RkrhSA98KVEJ4Y8OxKBYQ3
hkSO9KooWYqYN8btCUQWNrUDxo1QAXSZj0JggvkIBKaY90JgknkPBKaZt0JgonkLBKaa10KUNHMd
k9jnCkWKSIfubgiilXCn+a8sNA1C+zaR1ZPsMP+3Eu+GsGZFZHeHneYvu9FuCG89QlWf3mFeNZFl
TFeaIub9TlWJfxfqGGi0MWAN0DHQWGJIx2OshOavRQIQgKIoigroBXeIzD3X2diiAAAAAElFTkSu
QmCC
" />
</header>

    <form id="inputs">
        <label><?= $translations["filter"]?>:</label>
        <div v-for="input in inputs">
           <input class="post" v-on:keyup="filter" v-bind:type="input.type" v-bind:name="input.name" /><label>{{ input.label }}</label>
        </div>
        <div class="submit" v-on:click="filter"><?= $translations["search"]?></div>



        </form>
        <form id="sort">
         <label><?= $translations["sort"]?>:</label>


           <select id="sort-list" v-on:change="sort($event)">
           <option>
           <?= $translations["choose-category"]?>
           </option>
           <option v-for="field in selected">
               {{field}}
           </option>
           </select>
           <ul>
            <li v-for="field in selectedFields">
                <div>{{field}}</div> <p v-on:click="remove($event)">-</p>
            </li>
           </ul>

        </div>
        <div v-on:click="sendSort" class="submit"><?= $translations["sort"]?></div>


        </form>
<?php
$res = new Resource($mysqli->real_escape_string($_GET['operation']), $mysqli, 1, $JSONconfig['root'] . 'admin/templates/');

echo <<<EOT
    <div id="results" v-on:click="changeUserDetails" class="results">
    {$res->get()}
    </div>
EOT;

?>


</body>
</html>
<script type="text/javascript" src="scripts/edit.js"></script>