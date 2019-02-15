
 <form id="security" method="post" action="securimage/index.php">
    <div>
        <?php
            require_once 'securimage.php';
            echo Securimage::getCaptchaHtml();
        ?>
    </div><br /><br />
<div id="send-captcha"><?= $translations['send']?></div>
    </form>

