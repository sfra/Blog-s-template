        <?php
        if(isset($_GET['login'])) {
            if($_GET['login']==='false') {
                echo <<<NOLOGIN
                <div class="incorrect-login">Błędny login
                    <div>OK</div>
                </div>
NOLOGIN;
            
            }
    
        }



        ?>
