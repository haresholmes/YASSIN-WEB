<?php
// Replace with your actual receiving email address
$receiving_email_address = 'info@amalak.ae';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize input
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Validate input
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }

    if (empty($name) || empty($subject) || empty($message)) {
        echo "Please fill in all required fields.";
        exit;
    }

    // Email content
    $email_subject = "New Message: $subject";
    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Message:\n$message\n";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    if (mail($receiving_email_address, $email_subject, $email_body, $headers)) {
        echo "Your message has been sent. Thank you!";
    } else {
        echo "There was an error sending your message. Please try again later.";
    }
} else {
    echo "Invalid request method.";
}
?>
