<?php
namespace admin\auth\functions {

    require_once "Mail.php";

  //  $configJSON = json_decode(file_get_contents('../../config/mexico.json'), true);
    require_once $configJSON["password_path"];


    function sendMail($email, $subject, $body) {
      $mail = new PHPMailer;
      $mail->isSMTP();
      //Enable SMTP debugging
      // 0 = off (for production use)
      // 1 = client messages
      // 2 = client and server messages
      $mail->SMTPDebug = 0;
      $mail->Host = 'smtp.poczta.onet.pl';
      $mail->Port = 465;
      $mail->SMTPSecure = 'ssl';
      $mail->SMTPAuth = true;
      $mail->Username = "mlaskacz@onet.eu";
      $mail->Password = 'CJAmili((&997';
      $mail->setFrom('mlaskacz@onet.eu', 'First Last');
      $mail->addReplyTo('mlaskacz@onet.eu', 'First Last');
      $mail->addAddress('janusz.software@wp.pl', 'John Doe');
      $mail->Subject = 'Blog programistyczny';



      if (!$mail->send()) {
          echo "Mailer Error: " . $mail->ErrorInfo;
      } else {
//          echo "[OK]";

        $smtp = \Mail::factory('smtp', array(
            'host' => 'ssl://smtp.googlemail.com',
            'port' => '465',
            'auth' => true,
            'username' => 'sz.frankyy',
            'password' => $gmail
        ));

        $mail = $smtp->send($to, $headers, $body);

        if (\PEAR::isError($mail)) {


    }

};
