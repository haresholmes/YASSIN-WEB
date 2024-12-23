<?php
// Load the PHP Email Form library
if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
    include($php_email_form);
} else {
    die('Unable to load the "PHP Email Form" Library!');
}

$contact = new PHP_Email_Form;
$contact->ajax = true;

// Set the recipient email
$contact->to = 'info@amalak.ae';

// Zoho SMTP configuration
$contact->smtp = array(
    'host' => 'smtp.zoho.com', // Zoho SMTP server
    'username' => 'info@amalak.ae', // Your Zoho email
    'password' => 'your-zoho-password', // Your Zoho email password
    'port' => '587', // Zoho SMTP port for TLS
);

// Form data
$contact->from_name = $_POST['name'];
$contact->from_email = $_POST['email'];
$contact->subject = $_POST['subject'];

// Add form messages
$contact->add_message($_POST['name'], 'From');
$contact->add_message($_POST['email'], 'Email');
$contact->add_message($_POST['message'], 'Message', 10);

// Send the email
echo $contact->send();
?>
