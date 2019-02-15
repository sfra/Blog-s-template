<?php 
    
    
   

?>

<header id="header" class="alt">
    <a id="main-title" href="index.php" class="logo"><strong><?=$translations["header"][0]?></strong> <span><?=$translations["header"][1]?></span>
            </a>

    <nav>
        <div href="#menu">
            <div id="main-menu-button" class="nav-trigger">
                <i></i><i></i><i></i>
            </div>
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
    <div class="noselect menu-label">MENU</div>
    <?php
            if (isset($_SESSION['login'])) {
                ?>
    <div class="greetings">
        <div>
            <div><?=$translations["welcome"]?></div>
            <a href="index.php?page=edit_profile"><?php echo $_SESSION['login']; ?></a>

        </div>

        <a href="admin/logout.php">
            <div><?= $translations["logout"]?></div>
        </a>
    </div>

   
               <div id="edit-profile-tip" class="hidden tip"><?= $translations["tip-profile"]?></div>
    <?php
            };
               
        ?>


        <?php
        if (isset($_GET['state']) && $_GET['state']==='logout') {
            ?>
            <div class="greetings">
                <div><?= $translations["logout-you"]?></div>

            </div>

            <script>
                let $greetings = document.querySelector('.greetings');
                $greetings.classList.add('hidden');
                setTimeout(function() {
                    $greetings.style.display = 'none';
                }, 10000);
            </script>

            <?php
        };
    ?>


</header>