<!-- Translating whatever code is in server.js to php -->
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$requestMethod = $_SERVER["REQUEST_METHOD"];
$requestUri = $_SERVER["REQUEST_URI"];

$servername = "localhost";
$username = "root";
$password = "";
$db = "TravelingDB";

$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "CREATE TABLE IF NOT EXISTS Flights (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    flightNumber VARCHAR(30) NOT NULL,
    departure VARCHAR(30) NOT NULL,
    arrival VARCHAR(30) NOT NULL,
    departureTime VARCHAR(30) NOT NULL,
    arrivalTime VARCHAR(30) NOT NULL,
    price INT(6) NOT NULL
)";
if ($conn->query($sql) === TRUE) {
    echo "Flights Table successfully";
} else {
    echo "Error creating database: " . $conn->error;
}

$conn->close();
?>