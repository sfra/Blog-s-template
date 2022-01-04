<header id="header" class="alt">
    <a id="main-title" href="index.php" class="logo"><strong>Kuchnia</strong> <span>meksykańska</span>
            </a>

    <nav>
        <div href="#menu">
            <div id="main-menu-button" class="navTrigger">
                <i></i><i></i><i></i>
            </div>
        </div>
    </nav>
        <img id="eagle" src="images/eagle2.png" />
    <div class="noselect">MENU</div>
    <?php 
            if(isset($_SESSION['login'])) {

                ?>
    <div class="greetings">
        <div>witaj
            <?php echo $_SESSION['login'];?>
        </div>

        <a href="admin/logout.php"><div>wyloguj</div></a>
    </div>

    <?php

            };
               
        ?>


        <?php
        if(isset($_GET['state']) && $_GET['state']==='logout') {
    ?>
            <div class="greetings">
                <div>Wylogowałeś się</div>
    
            </div>

            <script>
            let $greetings = document.querySelector('.greetings');
            $greetings.classList.add('hidden');
            setTimeout(function(){
                $greetings.style.display='none';
            },10000);
    
            </script>

            <?php
            
            
        };
    ?>


</header>