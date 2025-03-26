<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../config/database.php';

$response = [];
$action = $_GET['action'] ?? '';

// Signup
if ($action === 'signup') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
        $response = ['status' => 400, 'message' => 'All fields are required'];
    } else {
        $username = htmlspecialchars($data['username']);
        $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
        $password = password_hash($data['password'], PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        if ($stmt->execute([$username, $email, $password])) {
            $response = ['status' => 200, 'message' => 'User registered'];
        } else {
            $response = ['status' => 500, 'message' => 'Registration failed'];
        }
    }
}

// Login
elseif ($action === 'login') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (empty($data['email']) || empty($data['password'])) {
        $response = ['status' => 400, 'message' => 'Email & password required'];
    } else {
        $email = $data['email'];
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($data['password'], $user['password'])) {
            $response = ['status' => 200, 'message' => 'Login successful', 'user' => $user];
        } else {
            $response = ['status' => 401, 'message' => 'Invalid credentials'];
        }
    }
}
file_put_contents('debug.log', print_r($response, true), FILE_APPEND);
echo json_encode($response);
?>