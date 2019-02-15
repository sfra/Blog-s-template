<header id="header" class="alt">
    <a id="main-title" href="" class="logo"><strong><?= $translations["edit-profile"][0]?></strong> <span><?= $translations["edit-profile"][1]?></span>
            </a>

    <nav class="back" style="z-index: 700;">
        <a href="index.php">
        <?= $translations["back"]?>
        </a>
    </nav>
    <div class="greetings">
    <div>
        <div><?= $translations["welcome"]?></div>
        <a href="index.php?page=edit_profile"><?=$_SESSION['login'];?></a>
        <div id="edit_profile" class="hidden"><?= $translations["edit-profile"][0]?> <?= $translations["edit-profile"][1]?></div>
    </div>

    <a href="admin/logout.php">
        <div><?= $translations["logout"]?></div>
    </a>
</div>
</header>
