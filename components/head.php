<meta charset="utf-8">
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"> 
<meta name="theme-color" content="#AFAFAF"/>
<title>mexico</title>
<script type="text/javascript">
    let state = {wrapper: <?php if (isset($_GET['wrapper'])) {
    echo $_GET['wrapper'];
} else {
    echo 0;
};?>};
</script>
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="icon" type="image/png" href="favicon.png" />
<link rel="manifest" href="manifest.json" /> 

<?php


    if ($configJSON['env']==='dev') {
        echo <<<EOT
        <link rel="stylesheet" href="styles/main.min.css" />
        <script src="vendor/__ajax.js"></script>
        <script src="scripts/helpers/functions.js"></script>
        <script src="scripts/main.js"></script>
EOT;
    }?>
