<?php
session_start();
header("Content-Type: application/json");

if(isset($_SESSION["phone"])){
    echo json_encode([
        "loggedIn" => true,
        "phone" => $_SESSION["phone"],
        "firstName" => $_SESSION["firstName"],
        "lastName" => $_SESSION["lastName"],
        "dob" => $_SESSION["dob"],
        "email" => $_SESSION["email"],
        "gender" => $_SESSION["gender"],
    ]);
}
else{
    echo json_encode([
        "loggedIn" => false
    ]);
}

?>