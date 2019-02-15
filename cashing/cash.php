<?php


function read_content($path)
{
    $f = fopen($path, 'r');
    $buffer = '';
    while (!feof($f)) {
        $buffer .= fread($f, 2048);
    }
    fclose($f);
    return $buffer;
}

function get_cache($url, $root, $days)
{
    global $hashed;
    global $file;
    global $url;


    $suffix='';
    if (isset($_COOKIE['PHPSESSID'])) {
        $suffix=$_COOKIE['PHPSESSID'];
    }
    $hashed = hash('sha256', $url.$suffix);
    
    $file = $root.'cache/'.$hashed;

    if (file_exists($file) && (time()-filemtime($file))<3600 *24 * $days) {
        $html = read_content($file);
        echo $html;
        exit;
    }
}

function set_cache($content, $url)
{
    global $hashed;
    global $file;

    $date = getdate();
    $year = $date['year'];
    $month = $date['month'];
    $mday = $date['mday'];
    $hours = $date['hours'];
    $minutes = (strlen($date['minutes'])===2)?$date['minutes']:'0'.$date['minutes'];
    $seconds = (strlen($date['seconds'])===2)?$date['seconds']:'0'.$date['seconds'];


    

    $content="<!-- cached on  $year $month $mday $hours:$minutes:$seconds-->".$content;
    $content="<!-- url $url -->\n".$content;
    print_r($file);


    $f = fopen($file, 'w');
    fwrite($f, $content);
    fclose($f);
    

    return $content;
}
