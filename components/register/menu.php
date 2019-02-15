

<form>
    <br />
    <input type="text" placeholder="login" /><br />
    <div class="warning arrow_box hidden"><?= $translations["login-exists"]?> </div>
    <input type="password" placeholder="<?=$translations["password"]?>" /><br />
    <div class="warning arrow_box long hidden"><?= $translations["passwords-not-match"]?></div>

    <input type="password" placeholder="<?=$translations["repeat-password"]?>" /><br />
    <input type="email" required placeholder="email" />
    <!-- "": "emails are different", "email-bad-format": "bad email format"  -->
    <div class="warning arrow_box long hidden"><?= $translations["different-emails"]?></div><br />
    <div id="email-form" class="warning arrow_box long hidden"><?=  $translations["email-bad-format"]?></div>

    <input type="email" placeholder="<?=$translations["repeat-email"]?>" /><br />
    <input type="submit" value="<?=$translations["send"]?>" />



    <div id="panel">
     <?php 
        include_once "components/common/metter.php";
     ?>

        <div id="tips">
            <ul>
                <li><?= $translations["digits"]?></li>
                <li><?= $translations["case"]?></li>
                <li><?= $translations["special"]?></li>
            </ul>
        </div>

    </div>
    <div id="warnings">
        <ul></ul>
    </div>
</form>
