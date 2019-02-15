<?php 



include_once $configJSON['password_path'];


$mysqli = new mysqli('localhost',$user,$password, $configJSON['db_name']);
$hash = $mysqli->real_escape_string($_GET['hash']);




$sql = $mysqli->query("SELECT * FROM users WHERE reset_password='$hash'");
print_r($sql->num_rows);  
$row = $sql->fetch_assoc();
//print_r($mysqli);

?>
<div class="panel"><?= $translations['welcome']?> <?= $row['login']?>
<section>
    <article>
            <header><?= $translations['new-password']?></header>
            <form> 
                <input type="password" />
                <input type="password" />
                <div class="submit"><?= $translations['reset']?></div>
            </form>
`
    </article>
    <div class="alert hidden"><?= $translations['passwords-not-match']?></div>

    <?php include_once "components/common/metter.php" ?>

</section>


</div>`