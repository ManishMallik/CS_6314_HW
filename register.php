<?php
$servername = "localhost";
$username = "root";
$password = "";
$db = "TravelingDB";

$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$phone = $_POST["phone"];
$password = $_POST["password"];
$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$dob = $_POST["dob"];
$email = $_POST["email"];
$gender = $_POST["gender"];

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO Users (phoneNumber, passwd, firstName, lastName, dateOfBirth, gender, email) VALUES ('$phone', '$hashed_password', '$firstName', '$lastName', '$dob', '$gender', '$email')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>