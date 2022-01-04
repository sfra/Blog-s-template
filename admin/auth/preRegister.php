<?php
    include_once "/home/szymon/pass/02.php";
    include_once "salting.php";
    $mysqli = mysqli_connect('locahost',$user,$password, 'mexico');

?>

    <!DOCTYPE html>
    <html>

    <head>
        <link rel="stylesheet" href="style/main.css" />
        <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro|Josefin+Sans" rel="stylesheet">
        <script type="text/javascript" src="../../vendor/__ajax.js"></script>
        <script type="text/javascript" src="../../vendor/passwordMetter.js"></script>
        <script type="text/javascript" src="../../vendor/openpgp.min.js"></script>

    </head>

    <body>
        <form>
            <input type="text" placeholder="login" /><br />
            <div class="warning arrow_box hidden">Taki login już istnieje </div>
            <input type="password" placeholder="password" /><br />
            <div class="warning arrow_box long hidden">Hasła nie pasują</div>

            <input type="password" placeholder="repeat password" /><br />
            <input type="email" required placeholder="email" />
            <div class="warning arrow_box long hidden">Emaile się różnią</div>
            <div id="email-form" class="warning arrow_box long hidden">Zły format maila</div>

            <input type="email" placeholder="repeat email" /><br />
            <input type="submit" value="Submit" />

            <div>Siła hasła</div>
            <div id="metter">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <br /><br /><br /><br /><br />
            <div id="tips">
                <ul>
                    <li>używaj cyfr</li>
                    <li>używaj liter różnych wielkości</li>
                    <li>nie zapominaj o znakach specjalnych</li>
                </ul>
            </div>
            <div id="warnings">
                <ul></ul>
            </div>
        </form>
    </body>
    <script type="text/javascript" src="../scripts/preRegister.js"></script>

    </html>