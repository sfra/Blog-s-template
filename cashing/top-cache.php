<?php

$url = $_SERVER["REQUEST_URI"];




include_once "cash.php";

    get_cache($url, $configJSON['root'], 30);

    ob_start();
