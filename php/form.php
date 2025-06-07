<?php
header('Content-Type: application/json');

$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);

if (!$email) {
    echo json_encode(['success' => false]);
    exit;
}

$subject = 'New lead';
$message = "Email: $email\nDate: " . date('Y-m-d H:i:s');
$headers = 'From: noreply@gonrth.com';

$success = mail('bigoleksandr@gmail.com', $subject, $message, $headers);

echo json_encode(['success' => $success]);
?>