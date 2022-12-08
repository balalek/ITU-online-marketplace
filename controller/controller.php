<?php
require '../model/model.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['register'])) {
    $_SESSION['ID'] = 1;
    $id = $_SESSION['ID'];
    $name = $_POST['name'];
    $last_name = $_POST['lastname'];
    $verification_code = user_form($id, $name, $last_name);
    if ($verification_code === -1)
        echo json_encode(['status' => 'Something went wrong. Try again later!!']);
    else {
        echo json_encode(['status' => 'Thanks for Registring with Us. Your account will be activated once you verify your email']);
    }
    exit();
}