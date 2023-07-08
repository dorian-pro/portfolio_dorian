<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Récupérer les données du formulaire
    $nom = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    // Paramètres du message
    $destinataire = 'pro.dorianm@dorianmarechal.com'; // Adresse e-mail du destinataire
    $sujet = $subject;
    $expediteur = $email;
    $headers = "From: $expediteur\r\n";
    $headers .= "Reply-To: $expediteur\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";

    // Construction du corps du message
    $corpsMessage = "<html><body>";
    $corpsMessage .= "<h1>$sujet</h1>";
    $corpsMessage .= "<p><strong>Nom :</strong> $nom</p>";
    $corpsMessage .= "<p><strong>E-mail :</strong> $email</p>";
    $corpsMessage .= "<p><strong>Message :</strong><br>$message</p>";
    $corpsMessage .= "</body></html>";

    // Envoi du message
    if (mail($destinataire, $sujet, $corpsMessage, $headers)) {
        echo "E-mail envoyé avec succès.";
    } else {
        echo "Échec de l'envoi de l'e-mail.";
    }
}

