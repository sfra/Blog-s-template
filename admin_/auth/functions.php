<?php
namespace admin\auth\functions {

//    require_once "Mail.php";
//    echo __DIR__."/../vendor/autoload.php";
//    require __DIR__."/../vendor/autoload.php";
 
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require realpath(__DIR__.'/../vendor/phpmailer/phpmailer/src/Exception.php');
    require realpath(__DIR__.'/../vendor/phpmailer/phpmailer/src/PHPMailer.php');
    require realpath(__DIR__.'/../vendor/phpmailer/phpmailer/src/SMTP.php');

    


    require_once $configJSON["password_path"];


    function sendMail($email, $subject, $body) {
        // echo realpath(__DIR__."/../vendor/autoload.php");
        // exit();
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



      $mail->isHTML(true);                                  // Set email format to HTML
      $mail->Subject = 'Here is the subject';
      $mail->Body    = $body;
      $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
  





      
     $mail->addCC('cc@example.com');
      $mail->addBCC('bcc@example.com');
  

  






      if (!$mail->send()) {
          echo "Mailer Error: " . $mail->ErrorInfo;
      };
};
}
