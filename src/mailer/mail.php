<?php

require 'src/mailer/phpMailer/src/PHPMailer.php';
require 'src/mailer/phpMailer/src/SMTP.php';
require 'src/mailer/phpMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function sendEmail($recipient, $subject, $content, $name) {
    $mail = new PHPMailer(true);
    $recipient = $_POST['email'];
    $subject = $_POST['subject'];
    $content  = $_POST['name']. '<br> <br>' .$_POST['message'];
    try {
        // SMTP settings
        $mail->isSMTP();
        $mail->Host = 'smtp-relay.brevo.com';  // SMTP server address
        $mail->SMTPAuth = true;
        $mail->Username = 'pro.dorianm@gmail.com';  // SMTP authentication email address
        $mail->Password = 'JU0gm9OXPkyAMdv5';  // SMTP authentication password
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Recipient and email content
        $mail->setFrom('pro.dorianm@gmail.com', 'Dorian Marechal');
        $mail->addAddress($recipient);
        $mail->Subject = $subject;
        $mail->Body = $content;

        // Send the email
        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}

// Example usage of the function
$recipient = $_POST['email'];
$subject = $_POST['subject'];
$content  = $_POST['name']. '<br> <br>' .$_POST['message'];
$name = $_POST['name'];

if (sendEmail($recipient, $subject, $content, $name)) {
    echo 'Email sent successfully!';
} else {
    echo 'Error sending email.';
}
