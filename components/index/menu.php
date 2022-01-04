      <nav id="menu" class="clearfix" style="display: none">
            <ul class="links clearfix">
                <li><a href="index.php">Strona główna</a></li>
                <li><a id="blog-href" href="index.php?page=blog">Blog</a></li>
                <li><a href="elements.html">Słowniczek</a></li>
                <?php if(!isset($_SESSION['login'])) {?>
                <li><a href="index.php?page=login">Zaloguj</a></li>
                <?php
                } elseif($_SESSION['isAdmin']) {
                ?>
                <li><a href="edit/edit.php">Edycja</a></li>
                
                <?php };
                ?>
                
                <li><a id="contacts" href="index.php?page=contacts">Kontakt</a></li>
                <?php if(isset($_SESSION['login'])) { ?>
                <li><a id="logout" href="admin/logout.php">Wyloguj</a></li>
                <?php
                };
                ?>
    
                
            </ul>
        </nav>
       
