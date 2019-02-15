        <nav id="menu" class="clearfix hidden">
            <ul class="links deactivated clearfix">
                <li><hr /><input type="text" placeholder="login" /><hr /></li>
                <li><hr /><input type="password" placeholder="<?= $translations["password"]?>" /><hr /></li>
                <li id="login-button"><?=$translations["login0"]?></li>
            </ul>
            <ul class="register">
                <li id="register"><a href="index.php?page=register"><?= $translations["register"]?></a></li>
            <li><a href="index.php" id="forgot"><?= $translations["forgot"]?></a></li>
            </ul>

        </nav>
        <div class="loader hidden"></div>

        <div id="wrong-login">
           <div id="cross"><img src="images/cross.svg" /></div>
            <p>Bardzo nam przykro! Złe dane logowania...</p>
        </div>
        <?php
        if (isset($_GET['login'])) {
            if ($_GET['login']==='false') {
                echo <<<NOLOGIN
                <div class="incorrect-login">Błędny login
                    <div>OK</div>
                </div>
NOLOGIN;
            }
        }



        ?>
