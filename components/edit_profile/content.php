<article id="content">
    <form class="blocked" autocomplete="off" lang="pl" method="post" action="admin/auth/edit_profile.php">
    <input id="unblock-submit" type="submit"  value="<?= $translations["unblock"]?>"/>
      <input id="main-submit" type="submit" value="<?=$translations["save"]?>" /><br />
    <br/>   
        <input name="imie"  x-default="<?= $translations["not-supplied"]?>"/><label><?= $translations["name"]?></label><br />
        <input name="nazwisko" x-default="<?= $translations["not-supplied"]?>"/><label><?= $translations["surname"]?></label><br />
        <input name="email" x-default="<?= $translations["not-supplied"]?>"/><label>email</label><br />
        <select name="plec" x-default="<?= $translations["not-supplied"]?>" dir="rtl">
            <option style="display: none;"><?= $translations["not-supplied"]?></option>
            <option><?= $translations["men"]?></option>
            <option><?= $translations["woman"]?></option>
        </select><label><?= $translations["sex"]?></label><br />  
        <input name="webpage" x-default="nie podany" /><label><?= $translations["web-page"]?></label><br />


     </form>

        <form enctype="multipart/form-data" method="post" action="upload/upload.php?operation=getphoto">
            <input name="fileToUpload" type="file" value="<?= $translations["not-supplied"]?>" />
            <img id ="userImg" src="" />
            <label><?= $translations["photo"]?></label><br />
            <input id="send-button" type="submit" value="<?= $translations["send"]?>" />
        </form>
    
</article>


<?php

        echo modalWindow('Zdjęcie za duże', 'modal-window-warnings');
    


?>