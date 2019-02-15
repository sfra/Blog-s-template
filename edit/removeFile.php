<?php

    $fileToRemove = $_POST['file'];

    print_r('uploads/'.$fileToRemove);
    unlink('uploads/'.$fileToRemove);

//    header('Location: edit.php');
