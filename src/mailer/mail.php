<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/PHPMailer-master/src/Exception.php';
require 'phpmailer/PHPMailer-master/src/PHPMailer.php';
require 'phpmailer/PHPMailer-master/src/SMTP.php';

if(isset($_POST['send'])){
    $to = "pro.dorianm@gmail.com";
    $subject = $_POST['subject'];
    $name = $_POST['name'];
    $from = $_POST['email'];
    $msg = $_POST['message'];
    $subMsg = 'address email de l\'expediteur '. $from;

    if(isset($_POST['email']) && isset($_POST['message']) && isset($_POST['name'])) {
        try {
            $mail = new PHPMailer;
            $mail->isSMTP();
            $mail->Host ='smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'pro.dorianm@gmail.com';
            $mail->Password = 'azkccyczbrqywtkl';
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;
            $mail->setFrom($from);
            $mail->addAddress($to);
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $msg. $subMsg . $name;
            $mail->send();
            header('Location: https://dorianmarechal.com/?#contact');
            exit();
        } catch (Exception $e) {
            $error_msg = $e->getMessage();
            // TODO: REDIRIGER VERS UNE PAGE D ERREUR
            exit();
        }

    }
}
