      <nav id="menu" class="clearfix" style="display: none">
            <ul class="links clearfix">
                <li><a href="index.php"><?= $translations["menu"][0]?></a></li>
                <li><a id="blog-href" href="index.php?wrapper=1"><?= $translations["menu"][1]?></a></li>
                <li><a href="elements.html"><?= $translations["menu"][2]?></a></li>
                <?php if(!isset($_SESSION['login'])) {?>
                <li><a href="index.php?page=login"><?= $translations["menu"][3]?></a></li>
                <?php
                } elseif($_SESSION['isAdmin']) {
                ?>
                <li><a href="edit/edit.php"><?= $translations["menu"][4]?></a></li>
                
                <?php };
                ?>
                
                <li><a id="contacts" href="index.php?wrapper=3"><?= $translations["menu"][5]?></a></li>
                <?php if(isset($_SESSION['login'])) { ?>
                <li><a id="logout" href="admin/logout.php"><?= $translations["menu"][6]?></a></li>
                <?php
                };
                ?>
    
                
            </ul>
        </nav>
       
