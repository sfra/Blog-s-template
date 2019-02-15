<?php
    
    $images=json_decode($_POST['images'], true);
    $mainImage = json_decode($_POST['mainImage'], true);

    $length = count($images);
    
    print_r($images);

    
    $old = '/var/www/html/mexico/template/edit/uploads/'.$mainImage['old'];
    $new = '/var/www/html/mexico/template/images/usersImages/'.$mainImage['new'];
    $converted = null;
    
    
    try {
        rename("$old", "$new");
    } catch (Exception $ex) {
    }
    print_r(getcwd());
    print_r("\n========\n");
    print_r($old);
    print_r("\n========\n");
    print_r($new);
    
    for ($i=0; $i<$length; $i++) {
        $old = '/var/www/html/mexico/template/edit/uploads/'.$images[$i]['old'];
        $new = '/var/www/html/mexico/template/images/usersImages/'.$images[$i]['new'];
        try {
            rename($old, $new);
        } catch (Exception $ex) {
        };
        $converted = '/var/www/html/mexico/template/images/usersImages/700/'.$images[$i]['new'];
        print_r($i);
        print_r($old);
        print_r($new);
        print_r($converted);
        try {
//       shell_exec("convert {$new} -resize 700 {$converted}");
        } catch (Exception $ex) {
        };
    };
