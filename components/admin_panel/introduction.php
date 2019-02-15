
<div class="panel"><?= $translations["welcome"]?> <?= isset($_SESSION['login'])?$_SESSION['login']:"you are logged out" ?>
<section>
    <article>
            <header><?= $translations["admin-panel"]["todo"]?></header>
            <a href="admin/edit.php?operation=users"><?= $translations["admin-panel"]["list"][0]?></a>
            <a href="edit/edit.php"><?= $translations["admin-panel"]["list"][1]?></a>
            <a href="admin/edit.php?operation=moderate"><?= $translations["admin-panel"]["list"][2]?></a>

    </article>


</section>


</div>