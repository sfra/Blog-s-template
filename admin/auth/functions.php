<?php
namespace admin\auth\functions {
    
    require_once "Mail.php";
    
  //  $configJSON = json_decode(file_get_contents('../../config/mexico.json'), true); 
    require_once $configJSON["password_path"];

    
    function sendMail($email, $subject, $body) {
        global $configJSON;
        global $gmail;
        $to = "Recipent <" . $email . ">";

        $headers = array(
            'From' => 'aktywnastronameksyku <sz.frankyy@gmail.com>',
            'To' => $to,
            'Subject' => $subject,
            'MIME-Version' => 1,
            'Content-type' => 'text/html;charset=utf8',
        );




        $smtp = \Mail::factory('smtp', array(
            'host' => 'ssl://smtp.googlemail.com',
            'port' => '465',
            'auth' => true,
            'username' => 'sz.frankyy',
            'password' => $gmail
        ));

        $mail = $smtp->send($to, $headers, $body);

        if (\PEAR::isError($mail)) {

            echo (" <p>" . $mail->getMessage() . " </p ");
        } else {
//            echo ("[OK]");
        }

    }

};
